import React, { useState, useEffect } from 'react';
import {
  ArrowLeft, Lock, ShoppingBag, ChevronDown, Check,
  ShieldCheck, RotateCcw, Sparkles, ArrowRight, CreditCard,
  Truck, CheckCircle2, Phone, MapPin, Building, Smartphone
} from 'lucide-react';
import { apiService } from '../services/apiService';

export default function SecureCheckoutView({
  onBackToCart,
  onBackToStore,
  onCompleteCheckout
}) {
  const [step, setStep] = useState(1); // 1: Contact, 2: Address, 3: Delivery, 4: Payment, 5: Review
  
  // Step 1: Contact
  const [name, setName] = useState('Ayesha Rahman');
  const [phone, setPhone] = useState('+880 1712-345678');
  const [email, setEmail] = useState('ayesha.rahman@gmail.com');

  // Step 2: Address
  const [division, setDivision] = useState('Dhaka');
  const [district, setDistrict] = useState('Dhaka City');
  const [area, setArea] = useState('Banani');
  const [fullAddress, setFullAddress] = useState('House 42, Road 11, Block D, Banani');
  const [postalCode, setPostalCode] = useState('1213');

  // Step 3: Delivery
  const [deliveryMethod, setDeliveryMethod] = useState('express'); // 'standard' | 'express' | 'free'

  // Step 4: Payment
  const [paymentMethod, setPaymentMethod] = useState('bkash'); // 'cod' | 'bkash' | 'nagad' | 'card'
  const [bkashNumber, setBkashNumber] = useState('01712345678');

  // Cart Data
  const orderItems = [
    {
      id: 'prod_01',
      title: 'Nocturne Jamdani Pure Mulberry Silk Saree',
      size: 'Unstitched (6.5 Yards)',
      color: 'Obsidian Midnight',
      quantity: 1,
      price: 14500,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=600&auto=format&fit=crop'
    }
  ];

  const [calcData, setCalcData] = useState({
    subtotal: 14500,
    discount_amount: 2900,
    shipping_fee: 0,
    total: 11600,
    free_shipping_threshold: 2500,
    amount_to_free_shipping: 0
  });

  useEffect(() => {
    let isMounted = true;
    apiService.calculateCart({
      items: orderItems,
      coupon_code: 'SULTANA20',
      division
    }).then(res => {
      if (isMounted && res) {
        setCalcData(res);
      }
    }).catch(err => console.warn('Server checkout calculation:', err));

    return () => { isMounted = false; };
  }, [division]);

  const subtotal = calcData.subtotal || 14500;
  const discount = calcData.discount_amount || 2900; // 20% off with SULTANA20
  const isFreeDelivery = subtotal >= (calcData.free_shipping_threshold || 2500);
  const shippingFee = isFreeDelivery ? 0 : (calcData.shipping_fee || (division === 'Dhaka' ? 60 : 120));
  const tax = Math.round((subtotal - discount) * 0.05);
  const grandTotal = calcData.total ? (calcData.total + tax) : (subtotal - discount + shippingFee + tax);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  const handlePlaceOrder = async () => {
    setIsSubmitting(true);
    showToast('Securing order with Sultana’s Dream Atelier...');

    const orderNumber = 'SD-' + Math.floor(10000 + Math.random() * 89999);
    const trackingNumber = 'SD-TRK-' + Math.floor(10000 + Math.random() * 89999);

    const orderPayload = {
      order_number: orderNumber,
      tracking_number: trackingNumber,
      client_name: name,
      client_email: email,
      phone,
      shipping_address: `${fullAddress}, ${area}, ${district}, ${division} - ${postalCode}`,
      subtotal,
      discount,
      shipping: shippingFee,
      tax,
      grand_total: grandTotal,
      payment_method: paymentMethod === 'bkash' ? 'bKash Mobile Banking' : paymentMethod === 'cod' ? 'Cash on Delivery (COD)' : 'Credit Card',
      payment_status: 'PENDING_VERIFICATION',
      courier: 'Pathao White-Glove Fleet #04',
      items: orderItems,
      created_at: new Date().toISOString()
    };

    try {
      await apiService.processCheckout(orderPayload);
    } catch (err) {
      console.warn('Backend order recording notice:', err);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      if (onCompleteCheckout) {
        onCompleteCheckout(orderPayload);
      } else {
        window.location.hash = '#shop/confirmation';
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#FBF8F5] text-[#201B1D] font-sans antialiased selection:bg-[#7A3E5D]/20 selection:text-[#7A3E5D]">
      
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 bg-[#201B1D] text-white px-5 py-2.5 rounded-full text-xs font-sans shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#2F7D5A]" />
          <span>{toast}</span>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#FBF8F5]/95 backdrop-blur-md border-b border-[#E8DFE2]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={onBackToCart}
            className="flex items-center gap-2 text-xs font-bold text-[#756B70] hover:text-[#201B1D] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Bag</span>
          </button>

          <div className="flex flex-col items-center">
            <span className="font-serif font-extrabold text-base tracking-wide uppercase text-[#201B1D]">
              SULTANA'S DREAM
            </span>
            <span className="text-[10px] text-[#756B70] font-sans font-semibold flex items-center gap-1">
              <Lock className="w-3 h-3 text-[#2F7D5A]" />
              Frictionless 256-Bit Encrypted Checkout
            </span>
          </div>

          <div className="w-20 text-right text-xs text-[#7A3E5D] font-bold">
            Step {step} of 5
          </div>
        </div>
      </header>

      {/* Main 2-Column Checkout Layout (Section 09) */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column: 4-Step Checkout Form (8 Cols) */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-6">
            
            {/* Step Indicators Header */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-white border border-[#E8DFE2] text-xs font-sans">
              <button 
                onClick={() => setStep(1)} 
                className={`flex items-center gap-1.5 font-bold ${step >= 1 ? 'text-[#7A3E5D]' : 'text-[#756B70]'}`}
              >
                <span className="w-5 h-5 rounded-full bg-[#7A3E5D] text-white flex items-center justify-center text-[10px]">1</span>
                <span>Contact</span>
              </button>
              <div className="w-6 h-px bg-[#E8DFE2]" />
              <button 
                onClick={() => setStep(2)} 
                className={`flex items-center gap-1.5 font-bold ${step >= 2 ? 'text-[#7A3E5D]' : 'text-[#756B70]'}`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 2 ? 'bg-[#7A3E5D] text-white' : 'bg-neutral-200 text-neutral-600'}`}>2</span>
                <span>Address</span>
              </button>
              <div className="w-6 h-px bg-[#E8DFE2]" />
              <button 
                onClick={() => setStep(3)} 
                className={`flex items-center gap-1.5 font-bold ${step >= 3 ? 'text-[#7A3E5D]' : 'text-[#756B70]'}`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 3 ? 'bg-[#7A3E5D] text-white' : 'bg-neutral-200 text-neutral-600'}`}>3</span>
                <span>Delivery</span>
              </button>
              <div className="w-6 h-px bg-[#E8DFE2]" />
              <button 
                onClick={() => setStep(4)} 
                className={`flex items-center gap-1.5 font-bold ${step >= 4 ? 'text-[#7A3E5D]' : 'text-[#756B70]'}`}
              >
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${step >= 4 ? 'bg-[#7A3E5D] text-white' : 'bg-neutral-200 text-neutral-600'}`}>4</span>
                <span>Payment</span>
              </button>
            </div>

            {/* STEP 1: CONTACT INFORMATION */}
            {step === 1 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFE2] shadow-sm space-y-5 animate-fade-in">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#7A3E5D]">Step 1</span>
                  <h2 className="text-xl font-serif font-bold text-[#201B1D]">Client Contact Information</h2>
                </div>

                <div className="space-y-4 text-xs font-sans">
                  <div className="space-y-1.5">
                    <label className="font-bold text-[#201B1D] block">Full Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-12 px-4 rounded-xl bg-[#FBF8F5] border border-[#E8DFE2] text-[#201B1D] focus:border-[#7A3E5D] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-[#201B1D] block">Phone Number (For Courier OTP &amp; SMS)</label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl bg-[#FBF8F5] border border-[#E8DFE2] text-[#201B1D] focus:border-[#7A3E5D] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-bold text-[#201B1D] block">Email Address (Order Confirmation)</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl bg-[#FBF8F5] border border-[#E8DFE2] text-[#201B1D] focus:border-[#7A3E5D] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  className="h-12 px-8 rounded-full bg-[#7A3E5D] hover:bg-[#632E48] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                >
                  <span>Continue to Delivery Address</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

            {/* STEP 2: BANGLADESHI ADDRESS */}
            {step === 2 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFE2] shadow-sm space-y-5 animate-fade-in">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#7A3E5D]">Step 2</span>
                  <h2 className="text-xl font-serif font-bold text-[#201B1D]">Delivery Destination (Bangladesh)</h2>
                </div>

                <div className="space-y-4 text-xs font-sans">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-[#201B1D] block">Division</label>
                      <select
                        value={division}
                        onChange={(e) => setDivision(e.target.value)}
                        className="w-full h-12 px-3 rounded-xl bg-[#FBF8F5] border border-[#E8DFE2] text-[#201B1D] focus:border-[#7A3E5D] focus:outline-none"
                      >
                        <option value="Dhaka">Dhaka Division</option>
                        <option value="Chattogram">Chattogram Division</option>
                        <option value="Sylhet">Sylhet Division</option>
                        <option value="Rajshahi">Rajshahi Division</option>
                        <option value="Khulna">Khulna Division</option>
                        <option value="Barishal">Barishal Division</option>
                        <option value="Rangpur">Rangpur Division</option>
                        <option value="Mymensingh">Mymensingh Division</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-bold text-[#201B1D] block">District / City</label>
                      <input
                        type="text"
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl bg-[#FBF8F5] border border-[#E8DFE2] text-[#201B1D] focus:border-[#7A3E5D] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-bold text-[#201B1D] block">Area / Thana (e.g. Banani, Dhanmondi, Gulshan)</label>
                      <input
                        type="text"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl bg-[#FBF8F5] border border-[#E8DFE2] text-[#201B1D] focus:border-[#7A3E5D] focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="font-bold text-[#201B1D] block">Postal Code</label>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl bg-[#FBF8F5] border border-[#E8DFE2] text-[#201B1D] focus:border-[#7A3E5D] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-bold text-[#201B1D] block">House, Road &amp; Full Apartment Address</label>
                    <textarea
                      rows={2}
                      value={fullAddress}
                      onChange={(e) => setFullAddress(e.target.value)}
                      className="w-full p-3 rounded-xl bg-[#FBF8F5] border border-[#E8DFE2] text-[#201B1D] focus:border-[#7A3E5D] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setStep(1)}
                    className="h-12 px-5 rounded-full border border-[#E8DFE2] text-xs font-bold"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="h-12 px-8 rounded-full bg-[#7A3E5D] hover:bg-[#632E48] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    <span>Continue to Delivery Options</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: DELIVERY OPTIONS */}
            {step === 3 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFE2] shadow-sm space-y-5 animate-fade-in">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#7A3E5D]">Step 3</span>
                  <h2 className="text-xl font-serif font-bold text-[#201B1D]">Select Delivery Method</h2>
                </div>

                <div className="space-y-3 text-xs font-sans">
                  <div
                    onClick={() => setDeliveryMethod('standard')}
                    className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                      deliveryMethod === 'standard' ? 'border-[#7A3E5D] bg-[#7A3E5D]/5 ring-1 ring-[#7A3E5D]' : 'border-[#E8DFE2] hover:bg-[#FBF8F5]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="w-5 h-5 text-[#7A3E5D]" />
                      <div>
                        <strong className="font-bold text-[#201B1D] block">Standard Courier Delivery (2-4 Days)</strong>
                        <span className="text-[#756B70]">Nationwide delivery via Steadfast / Pathao Courier</span>
                      </div>
                    </div>
                    <span className="font-bold text-[#201B1D]">
                      {isFreeDelivery ? 'FREE' : '৳60'}
                    </span>
                  </div>

                  <div
                    onClick={() => setDeliveryMethod('express')}
                    className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                      deliveryMethod === 'express' ? 'border-[#7A3E5D] bg-[#7A3E5D]/5 ring-1 ring-[#7A3E5D]' : 'border-[#E8DFE2] hover:bg-[#FBF8F5]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5 text-[#7A3E5D]" />
                      <div>
                        <strong className="font-bold text-[#201B1D] block">White-Glove Same-Day Express (Dhaka)</strong>
                        <span className="text-[#756B70]">Dedicated atelier vehicle with cedar gift packaging</span>
                      </div>
                    </div>
                    <span className="font-bold text-[#7A3E5D]">
                      {isFreeDelivery ? 'FREE (Over ৳2,500)' : '৳120'}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setStep(2)}
                    className="h-12 px-5 rounded-full border border-[#E8DFE2] text-xs font-bold"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="h-12 px-8 rounded-full bg-[#7A3E5D] hover:bg-[#632E48] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: PAYMENT OPTIONS */}
            {step === 4 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFE2] shadow-sm space-y-5 animate-fade-in">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#7A3E5D]">Step 4</span>
                  <h2 className="text-xl font-serif font-bold text-[#201B1D]">Select Payment Gateway</h2>
                </div>

                <div className="space-y-3 text-xs font-sans">
                  {/* bKash */}
                  <div
                    onClick={() => setPaymentMethod('bkash')}
                    className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                      paymentMethod === 'bkash' ? 'border-[#7A3E5D] bg-[#7A3E5D]/5 ring-1 ring-[#7A3E5D]' : 'border-[#E8DFE2] hover:bg-[#FBF8F5]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#E2136E] text-white flex items-center justify-center font-bold text-xs">
                        bKash
                      </div>
                      <div>
                        <strong className="font-bold text-[#201B1D] block">bKash Instant Mobile Payment</strong>
                        <span className="text-[#756B70]">Instant verification &amp; ৳100 cashback eligible</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-[#2F7D5A]">Recommended</span>
                  </div>

                  {/* Cash on Delivery */}
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                      paymentMethod === 'cod' ? 'border-[#7A3E5D] bg-[#7A3E5D]/5 ring-1 ring-[#7A3E5D]' : 'border-[#E8DFE2] hover:bg-[#FBF8F5]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-[#201B1D] text-white flex items-center justify-center font-bold text-xs">
                        COD
                      </div>
                      <div>
                        <strong className="font-bold text-[#201B1D] block">Cash on Delivery (Pay at Doorstep)</strong>
                        <span className="text-[#756B70]">Inspect your garment before paying the courier</span>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#756B70]">Zero Advance Fee</span>
                  </div>

                  {/* Cards */}
                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                      paymentMethod === 'card' ? 'border-[#7A3E5D] bg-[#7A3E5D]/5 ring-1 ring-[#7A3E5D]' : 'border-[#E8DFE2] hover:bg-[#FBF8F5]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-[#7A3E5D]" />
                      <div>
                        <strong className="font-bold text-[#201B1D] block">Visa / Mastercard / Amex</strong>
                        <span className="text-[#756B70]">Secure 256-Bit SSL payment gateway</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setStep(3)}
                    className="h-12 px-5 rounded-full border border-[#E8DFE2] text-xs font-bold"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(5)}
                    className="h-12 px-8 rounded-full bg-[#7A3E5D] hover:bg-[#632E48] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2"
                  >
                    <span>Review Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: FINAL REVIEW & PLACE ORDER */}
            {step === 5 && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFE2] shadow-sm space-y-6 animate-fade-in">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-widest text-[#2F7D5A]">Step 5 • Ready to Confirm</span>
                  <h2 className="text-2xl font-serif font-bold text-[#201B1D]">Review &amp; Authorize Order</h2>
                </div>

                <div className="p-4 rounded-2xl bg-[#FBF8F5] border border-[#E8DFE2] space-y-3 text-xs">
                  <div className="flex justify-between border-b border-[#E8DFE2] pb-2">
                    <span className="text-[#756B70]">Client:</span>
                    <strong className="text-[#201B1D]">{name} ({phone})</strong>
                  </div>
                  <div className="flex justify-between border-b border-[#E8DFE2] pb-2">
                    <span className="text-[#756B70]">Destination:</span>
                    <strong className="text-[#201B1D] text-right">{fullAddress}, {area}, {district}</strong>
                  </div>
                  <div className="flex justify-between border-b border-[#E8DFE2] pb-2">
                    <span className="text-[#756B70]">Delivery:</span>
                    <strong className="text-[#201B1D]">White-Glove Courier ({isFreeDelivery ? 'FREE' : `৳${shippingFee}`})</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#756B70]">Payment Method:</span>
                    <strong className="text-[#7A3E5D] uppercase">{paymentMethod === 'bkash' ? 'bKash Mobile Banking' : paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit Card'}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => setStep(4)}
                    className="h-13 px-6 rounded-full border border-[#E8DFE2] text-xs font-bold"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={isSubmitting}
                    className="flex-1 h-13 rounded-full bg-[#7A3E5D] hover:bg-[#632E48] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xl shadow-[#7A3E5D]/30 active:scale-98 transition-all disabled:opacity-50"
                  >
                    <Lock className="w-4 h-4" />
                    <span>{isSubmitting ? 'Confirming Order...' : `Place Order — ৳${grandTotal.toLocaleString('en-US')}`}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary Card (4 Cols) */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DFE2] shadow-sm space-y-5">
              <h3 className="font-serif font-bold text-base text-[#201B1D]">Order Details</h3>

              {/* Items Preview */}
              <div className="space-y-3 border-b border-[#E8DFE2] pb-4">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <img src={item.image} alt={item.title} className="w-16 h-20 rounded-xl object-cover border border-[#E8DFE2]" />
                    <div className="space-y-0.5 text-xs">
                      <strong className="font-serif font-bold text-[#201B1D] block">{item.title}</strong>
                      <span className="text-[#756B70] block">{item.size} • Qty: {item.quantity}</span>
                      <span className="text-[#7A3E5D] font-bold block pt-1 font-sans">
                        ৳{Number(item.price * item.quantity).toLocaleString('en-US')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-2 text-xs text-[#756B70] font-sans">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-[#201B1D]">৳{subtotal.toLocaleString('en-US')}</span>
                </div>
                <div className="flex justify-between text-[#2F7D5A]">
                  <span>VIP Promo Code (SULTANA20):</span>
                  <span className="font-bold">-৳{discount.toLocaleString('en-US')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery to {district}:</span>
                  <span className="font-bold text-[#201B1D]">{isFreeDelivery ? 'FREE' : `৳${shippingFee}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated VAT (5%):</span>
                  <span className="font-bold text-[#201B1D]">৳{tax.toLocaleString('en-US')}</span>
                </div>

                <div className="flex justify-between text-base font-bold text-[#201B1D] pt-3 border-t border-[#E8DFE2]">
                  <span>Total Payable:</span>
                  <span className="text-[#7A3E5D] font-serif font-black text-xl">৳{grandTotal.toLocaleString('en-US')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
