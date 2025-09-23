import React from "react";
import Image from "next/image";
import categories from "@/lib/categories";

const HeroSection: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between my-8 gap-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Best Sellers</h1>
        <p className="mb-4">Shop our most popular products</p>
        <button className="bg-black text-white px-4 py-2 rounded">Shop Now</button>
      </div>
      <div className="flex gap-4">
        {categories.map((category) => (
          <div key={category.name} className="text-center">
            <Image
              width={130}
              height={130}
              src={category.image}
              alt={category.name}
              className="w-full h-32 object-cover mb-2"
            />
            <h3 className="font-medium">{category.name}</h3>
            <button className="text-sm text-gray-600 hover:underline">
              Shop Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
