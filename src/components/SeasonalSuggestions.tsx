
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Sun, Cloud, Snowflake } from 'lucide-react';

export const SeasonalSuggestions = () => {
  const getCurrentSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) return 'Spring';
    if (month >= 5 && month <= 7) return 'Summer';
    if (month >= 8 && month <= 10) return 'Autumn';
    return 'Winter';
  };

  const seasonalData = {
    Spring: {
      icon: <Sun className="w-6 h-6 text-yellow-500" />,
      color: 'from-green-400 to-blue-400',
      crops: ['Tomatoes', 'Peppers', 'Lettuce', 'Spinach'],
      tips: [
        'Perfect time for seed germination',
        'Prepare soil with organic matter',
        'Start pest control measures',
        'Plan irrigation systems'
      ]
    },
    Summer: {
      icon: <Sun className="w-6 h-6 text-orange-500" />,
      color: 'from-yellow-400 to-red-400',
      crops: ['Corn', 'Beans', 'Squash', 'Melons'],
      tips: [
        'Ensure adequate water supply',
        'Mulch to retain moisture',
        'Monitor for heat stress',
        'Harvest early crops'
      ]
    },
    Autumn: {
      icon: <Cloud className="w-6 h-6 text-orange-600" />,
      color: 'from-orange-400 to-red-500',
      crops: ['Wheat', 'Barley', 'Carrots', 'Cabbage'],
      tips: [
        'Plant winter crops',
        'Harvest summer produce',
        'Prepare for storage',
        'Soil preparation for next season'
      ]
    },
    Winter: {
      icon: <Snowflake className="w-6 h-6 text-blue-500" />,
      color: 'from-blue-400 to-purple-500',
      crops: ['Peas', 'Broad Beans', 'Onions', 'Garlic'],
      tips: [
        'Focus on greenhouse cultivation',
        'Plan next year\'s crop rotation',
        'Maintain equipment',
        'Study market trends'
      ]
    }
  };

  const currentSeason = getCurrentSeason();
  const seasonInfo = seasonalData[currentSeason as keyof typeof seasonalData];

  return (
    <Card className="w-full">
      <CardHeader className={`bg-gradient-to-r ${seasonInfo.color} text-white`}>
        <CardTitle className="flex items-center">
          <Calendar className="w-6 h-6 mr-2" />
          {currentSeason} Growing Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Recommended Crops */}
          <div>
            <h3 className="font-semibold text-lg mb-3 flex items-center">
              {seasonInfo.icon}
              <span className="ml-2">Recommended Crops</span>
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {seasonInfo.crops.map((crop, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg border">
                  <span className="font-medium text-gray-800">{crop}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Seasonal Tips */}
          <div>
            <h3 className="font-semibold text-lg mb-3">Seasonal Tips</h3>
            <ul className="space-y-2">
              {seasonInfo.tips.map((tip, index) => (
                <li key={index} className="flex items-start">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  <span className="text-gray-700">{tip}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Weather Alert */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-medium text-blue-800 mb-2">Weather Advisory</h4>
            <p className="text-blue-700 text-sm">
              Monitor local weather forecasts for optimal planting and harvesting times. 
              Consider climate variations in your specific region.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
