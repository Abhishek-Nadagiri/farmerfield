
import React from 'react';
import { Cloud, Droplets, Thermometer, Wind } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WeatherData } from '../pages/Index';

interface WeatherCardProps {
  weatherData: WeatherData | null;
  loading: boolean;
}

export const WeatherCard: React.FC<WeatherCardProps> = ({ weatherData, loading }) => {
  if (loading) {
    return (
      <Card className="w-full animate-pulse">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Cloud className="w-6 h-6 mr-2" />
            Loading Weather Data...
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-20 rounded-lg"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!weatherData) {
    return (
      <Card className="w-full border-red-200">
        <CardContent className="p-6">
          <p className="text-center text-red-600">Unable to fetch weather data</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-gradient-to-r from-blue-50 to-green-50 border-green-200">
      <CardHeader>
        <CardTitle className="flex items-center text-green-700">
          <Cloud className="w-6 h-6 mr-2" />
          {weatherData.location} - {weatherData.condition}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              <Thermometer className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-sm font-medium text-gray-600">Temperature</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{weatherData.temperature}°C</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              <Droplets className="w-5 h-5 text-blue-500 mr-2" />
              <span className="text-sm font-medium text-gray-600">Humidity</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{weatherData.humidity}%</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              <Cloud className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-sm font-medium text-gray-600">Rainfall</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">{weatherData.rainfall}mm</p>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              <Wind className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-sm font-medium text-gray-600">Condition</span>
            </div>
            <p className="text-lg font-bold text-gray-800">{weatherData.condition}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
