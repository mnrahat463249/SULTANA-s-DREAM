import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, Check, RotateCcw, SlidersHorizontal } from 'lucide-react';
import { CATEGORIES } from '../data/mockProducts';

const SIZES = ['All Sizes', '36', '38', '40', '42', 'XS', 'S', 'M', 'L'];
const SORT_OPTIONS = [
  { id: 'featured', label: 'Featured & Editorial' },
  { id: 'price_asc', label: 'Price: Low to High' },
  { id: 'price_desc', label: 'Price: High to Low' },
  { id: 'rating', label: 'Highest Rated' }
];

export default function FilterBottomSheet({
  isOpen,
  onClose,
  selectedCategory,
  onSelectCategory,
  selectedSize,
  onSelectSize,
  sortBy,
  onSelectSort,
  onResetFilters
}) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        {/* Backdrop Tint */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-neutral-950/80 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="fixed inset-x-0 bottom-0 max-w-lg mx-auto flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-out duration-300"
              enterFrom="translate-y-full"
              enterTo="translate-y-0"
              leave="transform transition ease-in duration-200"
              leaveFrom="translate-y-0"
              leaveTo="translate-y-full"
            >
              <Dialog.Panel className="w-full bg-neutral-900 border-t border-neutral-800 rounded-t-[28px] shadow-2xl p-5 sm:p-6 text-neutral-100 max-h-[85vh] flex flex-col justify-between">
                {/* Grabber Handle */}
                <div className="w-full flex justify-center -mt-2 pb-3">
                  <div className="w-10 h-1.5 rounded-full bg-neutral-700/80" />
                </div>

                {/* Modal Title & Close */}
                <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-amber-400" />
                    <Dialog.Title className="text-base sm:text-lg font-bold tracking-tight text-white font-serif">
                      Refine Wardrobe
                    </Dialog.Title>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1 rounded-full text-neutral-400 hover:text-white hover:bg-neutral-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Scrollable Filter Options */}
                <div className="flex-1 overflow-y-auto py-4 space-y-5 no-scrollbar">
                  {/* Category Filter */}
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-2.5">
                      Collection
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => onSelectCategory(cat)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                            selectedCategory === cat
                              ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                              : 'bg-neutral-800/70 border border-neutral-700/60 text-neutral-300 hover:border-neutral-500'
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Size Filter */}
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-2.5">
                      Atelier Sizing
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {SIZES.map((size) => (
                        <button
                          key={size}
                          onClick={() => onSelectSize(size)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                            selectedSize === size
                              ? 'bg-amber-500 text-neutral-950 font-bold'
                              : 'bg-neutral-800/70 border border-neutral-700/60 text-neutral-300 hover:border-neutral-500'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sort By Filter */}
                  <div>
                    <label className="text-xs font-mono uppercase tracking-wider text-neutral-400 font-bold block mb-2.5">
                      Sort By
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {SORT_OPTIONS.map((opt) => (
                        <button
                          key={opt.id}
                          onClick={() => onSelectSort(opt.id)}
                          className={`flex items-center justify-between p-2.5 rounded-xl text-xs font-medium text-left transition-all ${
                            sortBy === opt.id
                              ? 'bg-amber-500/15 border border-amber-500/80 text-amber-300 font-semibold'
                              : 'bg-neutral-800/50 border border-neutral-800 text-neutral-300 hover:bg-neutral-800'
                          }`}
                        >
                          <span>{opt.label}</span>
                          {sortBy === opt.id && <Check className="w-3.5 h-3.5 text-amber-400" />}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action Bar */}
                <div className="pt-3 border-t border-neutral-800 flex items-center gap-3">
                  <button
                    onClick={onResetFilters}
                    className="flex items-center justify-center gap-1.5 px-4 py-3 rounded-full border border-neutral-700 text-neutral-300 hover:text-white hover:bg-neutral-800 text-xs font-semibold active:scale-95 transition-all"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                  <button
                    onClick={onClose}
                    className="flex-1 py-3 px-4 rounded-full bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs tracking-wider uppercase shadow-lg shadow-amber-500/25 active:scale-98 transition-all text-center"
                  >
                    Apply Filters
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
