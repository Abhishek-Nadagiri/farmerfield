
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FlaskConical, Zap, Beaker } from 'lucide-react';
import { SoilData } from '../pages/Index';

interface SoilDataFormProps {
  onSubmit: (data: SoilData) => void;
}

export const SoilDataForm: React.FC<SoilDataFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<SoilData>({
    ph: 7.0,
    moisture: 50,
    nitrogen: 20,
    phosphorus: 15,
    potassium: 25
  });

  const handleInputChange = (field: keyof SoilData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-white shadow-lg">
      <CardHeader className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
        <CardTitle className="flex items-center text-xl">
          <FlaskConical className="w-6 h-6 mr-2" />
          Enter Soil Parameters
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* pH Level */}
            <div className="space-y-2">
              <Label htmlFor="ph" className="flex items-center text-sm font-medium">
                <Beaker className="w-4 h-4 mr-1 text-purple-500" />
                pH Level (0-14)
              </Label>
              <Input
                id="ph"
                type="number"
                step="0.1"
                min="0"
                max="14"
                value={formData.ph}
                onChange={(e) => handleInputChange('ph', e.target.value)}
                className="border-gray-300 focus:border-green-500"
              />
              <p className="text-xs text-gray-500">Optimal: 6.0-7.5</p>
            </div>

            {/* Moisture */}
            <div className="space-y-2">
              <Label htmlFor="moisture" className="flex items-center text-sm font-medium">
                <div className="w-4 h-4 mr-1 bg-blue-500 rounded-full"></div>
                Moisture (%)
              </Label>
              <Input
                id="moisture"
                type="number"
                min="0"
                max="100"
                value={formData.moisture}
                onChange={(e) => handleInputChange('moisture', e.target.value)}
                className="border-gray-300 focus:border-green-500"
              />
              <p className="text-xs text-gray-500">Optimal: 40-70%</p>
            </div>

            {/* Nitrogen */}
            <div className="space-y-2">
              <Label htmlFor="nitrogen" className="flex items-center text-sm font-medium">
                <Zap className="w-4 h-4 mr-1 text-yellow-500" />
                Nitrogen (mg/kg)
              </Label>
              <Input
                id="nitrogen"
                type="number"
                min="0"
                value={formData.nitrogen}
                onChange={(e) => handleInputChange('nitrogen', e.target.value)}
                className="border-gray-300 focus:border-green-500"
              />
              <p className="text-xs text-gray-500">Good: 20-40 mg/kg</p>
            </div>

            {/* Phosphorus */}
            <div className="space-y-2">
              <Label htmlFor="phosphorus" className="flex items-center text-sm font-medium">
                <div className="w-4 h-4 mr-1 bg-orange-500 rounded-full"></div>
                Phosphorus (mg/kg)
              </Label>
              <Input
                id="phosphorus"
                type="number"
                min="0"
                value={formData.phosphorus}
                onChange={(e) => handleInputChange('phosphorus', e.target.value)}
                className="border-gray-300 focus:border-green-500"
              />
              <p className="text-xs text-gray-500">Good: 10-25 mg/kg</p>
            </div>

            {/* Potassium */}
            <div className="space-y-2">
              <Label htmlFor="potassium" className="flex items-center text-sm font-medium">
                <div className="w-4 h-4 mr-1 bg-red-500 rounded-full"></div>
                Potassium (mg/kg)
              </Label>
              <Input
                id="potassium"
                type="number"
                min="0"
                value={formData.potassium}
                onChange={(e) => handleInputChange('potassium', e.target.value)}
                className="border-gray-300 focus:border-green-500"
              />
              <p className="text-xs text-gray-500">Good: 20-40 mg/kg</p>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-medium py-3"
          >
            Analyze Soil & Get Recommendations
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
