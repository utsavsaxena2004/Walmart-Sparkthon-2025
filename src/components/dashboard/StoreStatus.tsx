import React from 'react';
import { Users, Volume2, Clock, MapPin } from 'lucide-react';
import { Card } from '../ui/Card';
import { useStore } from '../../contexts/StoreContext';
import { useTheme } from '../../contexts/ThemeContext';

export const StoreStatus: React.FC = () => {
  const { storeData } = useStore();
  const { isCalmMode } = useTheme();

  const getOccupancyColor = (occupancy: number) => {
    if (occupancy < 30) return 'text-green-600 bg-green-100';
    if (occupancy < 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getSoundColor = (soundLevel: number) => {
    if (soundLevel < 40) return 'text-green-600 bg-green-100';
    if (soundLevel < 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getOccupancyLabel = (occupancy: number) => {
    if (occupancy < 30) return 'Quiet';
    if (occupancy < 70) return 'Moderate';
    return 'Busy';
  };

  const getStatusMessage = () => {
    if (isCalmMode) {
      if (storeData.occupancy < 30 && storeData.soundLevel < 40) {
        return 'Perfect calm conditions for shopping!';
      } else if (storeData.occupancy < 50) {
        return 'Good conditions - calm zones available';
      } else {
        return 'Consider using calm zones or waiting for quieter time';
      }
    } else {
      if (storeData.occupancy < 30) return 'Perfect time to shop!';
      if (storeData.occupancy < 70) return 'Good time to shop';
      return 'Consider waiting or using calm zones';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Store Status</h2>
        <div className="text-sm text-gray-500">
          Updated {new Date(storeData.lastUpdated).toLocaleTimeString()}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-2 ${getOccupancyColor(storeData.occupancy)}`}>
            <Users className="w-6 h-6" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{storeData.occupancy}%</div>
          <div className="text-sm text-gray-600">{getOccupancyLabel(storeData.occupancy)}</div>
        </div>

        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full mb-2 ${getSoundColor(storeData.soundLevel)}`}>
            <Volume2 className="w-6 h-6" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{storeData.soundLevel}dB</div>
          <div className="text-sm text-gray-600">Sound Level</div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 mb-2">
            <Clock className="w-6 h-6" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{storeData.avgWaitTime}min</div>
          <div className="text-sm text-gray-600">Wait Time</div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-2">
            <MapPin className="w-6 h-6" />
          </div>
          <div className="text-2xl font-bold text-gray-900">{storeData.calmZones.filter(z => z.available).length}</div>
          <div className="text-sm text-gray-600">Calm Zones</div>
        </div>
      </div>

      <div className={`mt-6 p-4 rounded-lg ${
        isCalmMode 
          ? 'bg-green-50' 
          : storeData.occupancy < 30 
            ? 'bg-green-50' 
            : storeData.occupancy < 70 
              ? 'bg-yellow-50' 
              : 'bg-red-50'
      }`}>
        <div className="flex items-center">
          <div className={`w-2 h-2 rounded-full mr-2 ${
            isCalmMode 
              ? 'bg-green-500' 
              : storeData.occupancy < 30 
                ? 'bg-green-500' 
                : storeData.occupancy < 70 
                  ? 'bg-yellow-500' 
                  : 'bg-red-500'
          }`}></div>
          <span className={`text-sm font-medium ${
            isCalmMode 
              ? 'text-green-800' 
              : storeData.occupancy < 30 
                ? 'text-green-800' 
                : storeData.occupancy < 70 
                  ? 'text-yellow-800' 
                  : 'text-red-800'
          }`}>
            {getStatusMessage()}
          </span>
        </div>
      </div>
    </Card>
  );
};