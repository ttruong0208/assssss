"use client";

import { categoryFilterSidebar } from "@/config/content";

export const CategoryFilterSidebar = () => {
  return (
    <aside className="lg:col-span-1 h-full w-full bg-white rounded-2xl shadow-sm p-5 space-y-6">
      {/* Bộ lọc thương hiệu */}
      <section className="w-full rounded-xl bg-[#F9FBFD] px-4 py-5 space-y-3 mt-3">
        <h3 className="text-base font-semibold text-gray-900">
          {categoryFilterSidebar.selectBrand}
        </h3>
        <div className="flex flex-col gap-2 text-sm text-gray-700">
          {categoryFilterSidebar.brands.map((brand) => (
            <label
              key={brand}
              className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-[#f5fbff]"
            >
              <span className="font-medium text-gray-800">{brand}</span>
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 accent-blue-600"
              />
            </label>
          ))}
        </div>
      </section>

      {/* Giá bán */}
      <section className="w-full rounded-xl bg-[#F9FBFD] px-4 py-5 space-y-3">
        <h3 className="text-base font-semibold text-gray-900">
          {categoryFilterSidebar.price}
        </h3>
        <div className="flex flex-col gap-2 text-sm text-gray-700">
          {categoryFilterSidebar.priceRanges.map((label) => (
            <label
              key={label}
              className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-[#f5fbff]"
            >
              <span className="font-medium text-gray-800">{label}</span>
              <input
                type="radio"
                name="price"
                className="h-4 w-4 border-gray-300 accent-blue-600"
              />
            </label>
          ))}
        </div>
      </section>

      {/* Free ship */}
      <section className="w-full rounded-xl bg-[#F9FBFD] px-4 py-5 space-y-3">
        <h3 className="text-base font-semibold text-gray-900">
          {categoryFilterSidebar.freeShip}
        </h3>
        <label className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-gray-700 hover:bg-[#f5fbff]">
          <span className="font-medium text-gray-800">
            {categoryFilterSidebar.hasFreeShip}
          </span>
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-300 accent-blue-600"
          />
        </label>
      </section>

      {/* Đánh giá */}
      <section className="w-full rounded-xl bg-[#F9FBFD] px-4 py-5 space-y-3">
        <h3 className="text-base font-semibold text-gray-900">
          {categoryFilterSidebar.rating}
        </h3>
        <div className="flex flex-col gap-2 text-sm text-gray-700">
          {[1, 2, 3, 4, 5].map((star) => (
            <label
              key={star}
              className="flex items-center justify-between rounded-lg px-3 py-2 hover:bg-[#f5fbff]"
            >
              <span className="font-medium text-gray-800">
                {star} {categoryFilterSidebar.starIcon}
              </span>
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 accent-blue-600"
              />
            </label>
          ))}
        </div>
      </section>
    </aside>
  );
};
