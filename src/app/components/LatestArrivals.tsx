import React from "react";

const LatestArrivals: React.FC = () => {
  return (
    <section className="my-12">
      <h2 className="text-2xl font-bold mb-2">Latest Arrivals</h2>
      <p className="mb-4">Check out our new products</p>
      <div className="flex flex-col md:flex-row items-center gap-6">
        <img src="/images/tote.jpg" alt="Tote" className="w-40 h-40 object-cover" />
        <img src="/images/heels.jpg" alt="Heels" className="w-40 h-40 object-cover" />
      </div>
      <button className="mt-4 bg-black text-white px-4 py-2 rounded">Shop Now</button>
    </section>
  );
};

export default LatestArrivals;
