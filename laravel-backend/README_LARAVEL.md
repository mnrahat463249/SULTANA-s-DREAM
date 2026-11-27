# Laravel Backend Guide: Intervention Image (WebP) & Cursor Pagination

এই গাইডে Laravel ব্যাকএন্ডে **Intervention Image** দিয়ে ছোট সাইজের WebP ইমেজ অপ্টিমাইজেশন এবং **`cursorPaginate()`** দিয়ে মোবাইলে মসৃণ ইনফিনিট স্ক্রল API তৈরির সম্পূর্ণ নিয়ম দেওয়া হলো।

---

## ১. Intervention Image v3 ইনস্টলেশন ও সেটআপ

### ধাপ ১: Composer দিয়ে প্যাকেজ ইনস্টল
আপনার Laravel প্রোজেক্টের টার্মিনালে রান করুন:
```bash
composer require intervention/image
```

### ধাপ ২: PHP Extension চেক করুন
Intervention Image চালানোর জন্য আপনার `php.ini` ফাইলে **GD** অথবা **Imagick** এনাবল থাকতে হবে:
- `extension=gd` (Windows-এ সাধারণত `xampp/php/php.ini` ফাইলে সেমিকোলন `;` তুলে দিয়ে রিস্টার্ট দিতে হয়)

### ধাপ ৩: Storage Link তৈরি
ছবিগুলো যাতে ব্রাউজার থেকে সরাসরি দেখা যায়:
```bash
php artisan storage:link
```

### ধাপ ৪: সার্ভিস ফাইল ব্যবহার
`laravel-backend/app/Services/ImageOptimizationService.php` ফাইলটি আপনার Laravel প্রোজেক্টের `app/Services/` ফোল্ডারে পেস্ট করুন।

#### কন্ট্রোলারে ইমেজ আপলোড ও WebP কনভার্সন উদাহরণ:
```php
use App\Services\ImageOptimizationService;
use Illuminate\Http\Request;

public function uploadProductImage(Request $request, ImageOptimizationService $imageService)
{
    $request->validate([
        'image' => 'required|image|mimes:jpeg,png,jpg,webp|max:8192'
    ]);

    // এটি অটোমেটিকালি thumb (300px), catalog (600px), hero (1200px) তৈরি করে 80% কোয়ালিটিতে WebP করবে
    $imageUrls = $imageService->optimizeAndStore($request->file('image'), 'products');

    return response()->json([
        'message' => 'Image optimized to WebP successfully',
        'urls'    => $imageUrls
    ]);
}
```

---

## ২. Laravel API Pagination (`cursorPaginate()`)

### কেন সাধারণ `paginate()`-এর চেয়ে `cursorPaginate()` মোবাইলে বেশি উপযোগী?

1. **কনস্ট্যান্ট $O(1)$ ডাটাবেজ স্পিড**:
   - সাধারণ `paginate(10)` ডাটাবেজে `OFFSET 1000` ব্যবহার করে, যার ফলে ইউজার যত নিচে স্ক্রল করে ডাটাবেজ কোয়েরি তত ধীরগতির হয়ে যায়।
   - `cursorPaginate(10)` সরাসরি ইনডেক্স করা আইডি ও টাইমস্ট্যাম্প পয়েন্টার (`WHERE id < ?`) দিয়ে কোয়েরি করে। ফলে ১ লক্ষ প্রোডাক্ট থাকলেও প্রতি পেইজ রিট্রিভ করতে মাত্র কয়েক মিলি-সেকেন্ড লাগে।
2. **ডুপ্লিকেট ডাটা লোড হওয়ার সমস্যা দূর হয়**:
   - ইউজার যখন মোবাইলে নিচে স্ক্রল করতে থাকে, ওই সময় ডাটাবেজে নতুন কোনো প্রোডাক্ট অ্যাড হলে সাধারণ `paginate()`-এ পেইজ অফসেট উল্টাপাল্টা হয়ে একই প্রোডাক্ট স্ক্রিনে দুইবার চলে আসে।
   - `cursorPaginate()` পয়েন্টার দিয়ে ডাটা আনে, তাই ইনফিনিট স্ক্রলে কখনো ডুপ্লিকেট আসে না বা কোনো আইটেম মিস হয় না।

### কন্ট্রোলার ব্যবহার:
`laravel-backend/app/Http/Controllers/Api/ProductController.php` দেখুন:
```php
$products = Product::where('is_active', true)
    ->orderBy('id', 'desc')
    ->cursorPaginate(10);

return ProductResource::collection($products);
```

### Laravel API রেসপন্স ফরম্যাট:
```json
{
  "data": [
    {
      "id": "prod_01",
      "title": "Structured Obsidian Wool Blazer",
      "price": 890,
      "images": [
        "https://domain.com/storage/products/uuid_catalog.webp"
      ]
    }
  ],
  "links": {
    "first": null,
    "last": null,
    "prev": null,
    "next": "https://api.domain.com/v1/products?cursor=eyJpZCI6MTAsIl9wb2ludHNUb05leHRJdGVtcyI6dHJ1ZX0"
  },
  "meta": {
    "path": "https://api.domain.com/v1/products",
    "per_page": 10,
    "next_cursor": "eyJpZCI6MTAsIl9wb2ludHNUb05leHRJdGVtcyI6dHJ1ZX0",
    "prev_cursor": null
  }
}
```

React ফ্রন্টএন্ডে স্ক্রল ট্রিগার হওয়ার সাথে সাথে `next_cursor` এর মান নিয়ে পরবর্তী রিকোয়েস্ট পাঠানো হয়:
`GET /api/v1/products?cursor={next_cursor}`
