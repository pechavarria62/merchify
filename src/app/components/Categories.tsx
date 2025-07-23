import React from "react";

const categories = [
  { name: "Clothing", image: "/images/clothing.jpg" },
  { name: "Bags", image: "/images/bag.jpg" },
  { name: "Shoes", image: "/images/shoes.jpg" },
  { name: "Electronics", image: "/images/watch.jpg" },
];

const Categories: React.FC = () => {
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div key={category.name} className="text-center">
            <img
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

export default Categories;
