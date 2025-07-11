
import React, { useState, useEffect } from 'react';
import { WeatherCard } from '../components/WeatherCard';
import { SoilDataForm } from '../components/SoilDataForm';
import { CropRecommendations } from '../components/CropRecommendations';
import { SeasonalSuggestions } from '../components/SeasonalSuggestions';
import { CropPriceCards } from '../components/CropPriceCards';
import { Header } from '../components/Header';

export interface SoilData {
  ph: number;
  moisture: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
}

export interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  condition: string;
  location: string;
}

const Index = () => {
  const [soilData, setSoilData] = useState<SoilData | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      // Simulated weather data - replace with real API integration
      setTimeout(() => {
        setWeatherData({
          temperature: 28,
          humidity: 65,
          rainfall: 12.5,
          condition: 'Partly Cloudy',
          location: 'Current Location'
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
    }
  };

  const handleSoilDataSubmit = (data: SoilData) => {
    setSoilData(data);
    console.log('Soil data submitted:', data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Weather Section */}
        <section className="w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">🌤️</span>
            Weather Conditions
          </h2>
          <WeatherCard weatherData={weatherData} loading={loading} />
        </section>

        {/* Soil Data Input Section */}
        <section className="w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">🌱</span>
            Soil Analysis
          </h2>
          <SoilDataForm onSubmit={handleSoilDataSubmit} />
        </section>

        {/* Recommendations Section */}
        {soilData && (
          <div className="grid lg:grid-cols-2 gap-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">🌾</span>
                Crop Recommendations
              </h2>
              <CropRecommendations soilData={soilData} weatherData={weatherData} />
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="mr-2">📅</span>
                Seasonal Suggestions
              </h2>
              <SeasonalSuggestions />
            </section>
          </div>
        )}

        {/* Market Prices Section */}
        <section className="w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">💰</span>
            Live Market Prices
          </h2>
          <CropPriceCards />
        </section>
      </main>
    </div>
  );
};

export default Index;
