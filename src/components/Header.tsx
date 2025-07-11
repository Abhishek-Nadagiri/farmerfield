
import React from 'react';
import { Sprout, Users, TrendingUp } from 'lucide-react';

export const Header = () => {
  return (
    <header className="bg-white shadow-sm border-b-2 border-green-200">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Farmfield</h1>
              <p className="text-green-600 font-medium">Smart Agriculture Dashboard</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-gray-600">
              <Users className="w-5 h-5" />
              <span className="text-sm">Helping 10K+ Farmers</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <TrendingUp className="w-5 h-5" />
              <span className="text-sm">95% Success Rate</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
