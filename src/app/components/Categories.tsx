import React from 'react';
import Image from 'next/image';
import categories from '@/lib/categories';

const Categories: React.FC = () => {
  return (
    <section className="flex flex-col md:flex-row items-center justify-between my-8 gap-6">
      <h2 className="text-2xl font-bold mb-4">
        Categories
      </h2>
      <div className="flex gap-4">
        {categories.map((category) => (
          <div
            key={category.name}
            className="text-center"
          >
            <Image
              width={130}
              height={130}
              src={category.image}
              alt={category.name}
              className="w-full h-32 object-cover mb-2"
            />
            <h3 className="font-medium">
              {category.name}
            </h3>
            <button className="text-sm text-gray-600 hover:underline">
              Shop Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;
