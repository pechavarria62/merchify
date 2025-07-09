'use client';

import Topmenu from '../components/Topmenu';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Topmenu />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className='mt-8'>
            <h1 className="text-3xl font-bold text-gray-900 mt-6">
                Welcome to Merchify
            </h1>
            <p className="text-gray-700">
                Discover the best merchandise and apparel for your favorite brands.
            </p>
        </div>
      </main>
    </div>
  );
};
export default HomePage;
