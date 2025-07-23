import React from "react";

const HeroSection: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between my-8 gap-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">Best Sellers</h1>
        <p className="mb-4">Shop our most popular products</p>
        <button className="bg-black text-white px-4 py-2 rounded">Shop Now</button>
      </div>
      <div className="flex gap-4">
        <img src="/images/bag.jpg" alt="Bag" className="w-40 h-40 object-cover" />
        <img src="/images/clothing.jpg" alt="Clothing" className="w-40 h-40 object-cover" />
        <img src="/images/shoes.jpg" alt="Shoes" className="w-40 h-40 object-cover" />
      </div>
    </section>
  );
};

export default HeroSection;
