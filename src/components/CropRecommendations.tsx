import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Sprout } from 'lucide-react';
import { SoilData, WeatherData } from '../pages/Index';

interface CropRecommendation {
  name: string;
  suitability: 'High' | 'Medium' | 'Low';
  reason: string;
  expectedYield: string;
  growthPeriod: string;
  icon: string;
}

interface CropRecommendationsProps {
  soilData: SoilData;
  weatherData: WeatherData | null;
}

export const CropRecommendations: React.FC<CropRecommendationsProps> = ({ soilData, weatherData }) => {
  const [recommendations, setRecommendations] = useState<CropRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    generateRecommendations();
  }, [soilData, weatherData]);

  const generateRecommendations = () => {
    setLoading(true);
    
    // Simulate AI/ML processing time
    setTimeout(() => {
      const allCrops = [
        {
          name: 'Rice',
          icon: '🌾',
          optimalPH: [5.5, 6.5],
          optimalMoisture: [60, 80],
          nitrogenNeed: 'high',
          expectedYield: '4-6 tons/hectare',
          growthPeriod: '120-150 days'
        },
        {
          name: 'Wheat',
          icon: '🌾',
          optimalPH: [6.0, 7.5],
          optimalMoisture: [40, 60],
          nitrogenNeed: 'medium',
          expectedYield: '3-5 tons/hectare',
          growthPeriod: '110-130 days'
        },
        {
          name: 'Corn',
          icon: '🌽',
          optimalPH: [6.0, 7.0],
          optimalMoisture: [50, 70],
          nitrogenNeed: 'high',
          expectedYield: '8-12 tons/hectare',
          growthPeriod: '90-120 days'
        },
        {
          name: 'Soybeans',
          icon: '🫘',
          optimalPH: [6.0, 7.0],
          optimalMoisture: [45, 65],
          nitrogenNeed: 'low',
          expectedYield: '2-4 tons/hectare',
          growthPeriod: '100-130 days'
        },
        {
          name: 'Tomatoes',
          icon: '🍅',
          optimalPH: [6.0, 6.8],
          optimalMoisture: [60, 80],
          nitrogenNeed: 'medium',
          expectedYield: '40-60 tons/hectare',
          growthPeriod: '70-100 days'
        },
        {
          name: 'Potatoes',
          icon: '🥔',
          optimalPH: [5.0, 6.5],
          optimalMoisture: [50, 70],
          nitrogenNeed: 'medium',
          expectedYield: '20-40 tons/hectare',
          growthPeriod: '80-120 days'
        }
      ];

      const scored = allCrops.map(crop => {
        let score = 0;
        let reasons = [];

        // pH suitability
        if (soilData.ph >= crop.optimalPH[0] && soilData.ph <= crop.optimalPH[1]) {
          score += 3;
          reasons.push('Optimal pH level');
        } else if (Math.abs(soilData.ph - (crop.optimalPH[0] + crop.optimalPH[1]) / 2) <= 1) {
          score += 2;
          reasons.push('Acceptable pH level');
        } else {
          score += 1;
          reasons.push('pH needs adjustment');
        }

        // Moisture suitability
        if (soilData.moisture >= crop.optimalMoisture[0] && soilData.moisture <= crop.optimalMoisture[1]) {
          score += 3;
          reasons.push('Good moisture content');
        } else if (Math.abs(soilData.moisture - (crop.optimalMoisture[0] + crop.optimalMoisture[1]) / 2) <= 15) {
          score += 2;
          reasons.push('Adequate moisture');
        } else {
          score += 1;
          reasons.push('Moisture management needed');
        }

        // Nitrogen requirement match
        const nitrogenLevel = soilData.nitrogen > 30 ? 'high' : soilData.nitrogen > 15 ? 'medium' : 'low';
        if (nitrogenLevel === crop.nitrogenNeed) {
          score += 3;
          reasons.push('Perfect nitrogen match');
        } else {
          score += 1;
          reasons.push('Consider fertilizer application');
        }

        // Weather consideration
        if (weatherData && weatherData.temperature >= 20 && weatherData.temperature <= 35) {
          score += 2;
          reasons.push('Favorable weather conditions');
        }

        const suitability: 'High' | 'Medium' | 'Low' = score >= 8 ? 'High' : score >= 6 ? 'Medium' : 'Low';

        return {
          name: crop.name,
          suitability,
          reason: reasons.join(', '),
          expectedYield: crop.expectedYield,
          growthPeriod: crop.growthPeriod,
          icon: crop.icon,
          score
        };
      });

      // Sort by score and take top 4
      const topRecommendations = scored
        .sort((a, b) => b.score - a.score)
        .slice(0, 4)
        .map(({ score, ...rest }) => rest);

      setRecommendations(topRecommendations);
      setLoading(false);
    }, 1500);
  };

  const getSuitabilityColor = (suitability: string) => {
    switch (suitability) {
      case 'High': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getSuitabilityIcon = (suitability: string) => {
    switch (suitability) {
      case 'High': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'Medium': return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'Low': return <AlertCircle className="w-4 h-4 text-red-600" />;
      default: return <Sprout className="w-4 h-4 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sprout className="w-6 h-6 mr-2 text-green-600" />
            Analyzing Crop Suitability...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-200 h-24 rounded-lg"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="bg-green-50">
        <CardTitle className="flex items-center text-green-700">
          <Sprout className="w-6 h-6 mr-2" />
          Recommended Crops
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {recommendations.map((crop, index) => (
            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{crop.icon}</span>
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">{crop.name}</h3>
                    <p className="text-sm text-gray-600">{crop.reason}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {getSuitabilityIcon(crop.suitability)}
                  <Badge className={getSuitabilityColor(crop.suitability)}>
                    {crop.suitability} Suitability
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Expected Yield: </span>
                  <span className="text-gray-800">{crop.expectedYield}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Growth Period: </span>
                  <span className="text-gray-800">{crop.growthPeriod}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
