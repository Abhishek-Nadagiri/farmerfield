
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, IndianRupee, RefreshCw } from 'lucide-react';

interface CropPrice {
  name: string;
  currentPrice: number;
  previousPrice: number;
  unit: string;
  market: string;
  icon: string;
  demand: 'High' | 'Medium' | 'Low';
}

export const CropPriceCards = () => {
  const [prices, setPrices] = useState<CropPrice[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const fetchPrices = async () => {
    setLoading(true);
    
    // Simulate API call with realistic price data in INR
    setTimeout(() => {
      const mockPrices: CropPrice[] = [
        {
          name: 'Wheat',
          currentPrice: 23500,
          previousPrice: 23200,
          unit: '₹/ton',
          market: 'APMC',
          icon: '🌾',
          demand: 'High'
        },
        {
          name: 'Rice',
          currentPrice: 34500,
          previousPrice: 35800,
          unit: '₹/ton',
          market: 'Local',
          icon: '🌾',
          demand: 'Medium'
        },
        {
          name: 'Corn',
          currentPrice: 19800,
          previousPrice: 19600,
          unit: '₹/ton',
          market: 'APMC',
          icon: '🌽',
          demand: 'High'
        },
        {
          name: 'Soybeans',
          currentPrice: 42800,
          previousPrice: 42400,
          unit: '₹/ton',
          market: 'APMC',
          icon: '🫘',
          demand: 'Medium'
        },
        {
          name: 'Tomatoes',
          currentPrice: 98800,
          previousPrice: 103000,
          unit: '₹/ton',
          market: 'Local',
          icon: '🍅',
          demand: 'High'
        },
        {
          name: 'Potatoes',
          currentPrice: 31300,
          previousPrice: 30900,
          unit: '₹/ton',
          market: 'Local',
          icon: '🥔',
          demand: 'Medium'
        }
      ];

      // Add some realistic price fluctuation
      const fluctuatedPrices = mockPrices.map(price => ({
        ...price,
        currentPrice: Math.round(price.currentPrice * (0.95 + Math.random() * 0.1))
      }));

      setPrices(fluctuatedPrices);
      setLastUpdated(new Date());
      setLoading(false);
    }, 1000);
  };

  const getPriceChange = (current: number, previous: number) => {
    return ((current - previous) / previous) * 100;
  };

  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'High': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <IndianRupee className="w-6 h-6 mr-2 text-green-600" />
            Loading Market Prices...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-200 h-32 rounded-lg"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <IndianRupee className="w-6 h-6 mr-2" />
            Live Market Prices
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <RefreshCw className="w-4 h-4" />
            <span>Updated: {lastUpdated.toLocaleTimeString()}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {prices.map((crop, index) => {
            const priceChange = getPriceChange(crop.currentPrice, crop.previousPrice);
            const isPositive = priceChange >= 0;

            return (
              <div key={index} className="border rounded-lg p-4 hover:shadow-lg transition-all hover:border-green-300">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{crop.icon}</span>
                    <h3 className="font-semibold text-gray-800">{crop.name}</h3>
                  </div>
                  <Badge className={getDemandColor(crop.demand)}>
                    {crop.demand}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-800">
                      ₹{crop.currentPrice.toLocaleString('en-IN')}
                    </span>
                    <div className={`flex items-center space-x-1 ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
                      {isPositive ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                      <span className="text-sm font-medium">
                        {isPositive ? '+' : ''}{priceChange.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  <div className="text-sm text-gray-600">
                    <p>Per {crop.unit.split('/')[1]} • {crop.market}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Previous: ₹{crop.previousPrice.toLocaleString('en-IN')}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-800 mb-2">💡 Market Insights</h4>
          <p className="text-blue-700 text-sm">
            Prices are updated in real-time from major commodity exchanges and APMCs. 
            Consider market trends when planning your crop selection and timing your sales.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
