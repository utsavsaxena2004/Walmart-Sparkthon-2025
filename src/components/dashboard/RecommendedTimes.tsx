import React from 'react';
import { Clock, Star, TrendingDown } from 'lucide-react';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

interface TimeSlot {
  time: string;
  occupancy: number;
  soundLevel: number;
  waitTime: number;
  recommended: boolean;
}

const timeSlots: TimeSlot[] = [
  { time: '9:00 AM', occupancy: 25, soundLevel: 35, waitTime: 2, recommended: true },
  { time: '10:00 AM', occupancy: 40, soundLevel: 45, waitTime: 3, recommended: false },
  { time: '11:00 AM', occupancy: 65, soundLevel: 55, waitTime: 8, recommended: false },
  { time: '2:00 PM', occupancy: 20, soundLevel: 30, waitTime: 1, recommended: true },
  { time: '3:00 PM', occupancy: 35, soundLevel: 40, waitTime: 3, recommended: true },
  { time: '5:00 PM', occupancy: 80, soundLevel: 65, waitTime: 12, recommended: false },
  { time: '7:00 PM', occupancy: 45, soundLevel: 50, waitTime: 5, recommended: false },
  { time: '8:00 PM', occupancy: 30, soundLevel: 35, waitTime: 2, recommended: true }
];

export const RecommendedTimes: React.FC = () => {
  const recommendedSlots = timeSlots.filter(slot => slot.recommended);
  const nextBestTime = recommendedSlots.find(slot => {
    const slotTime = new Date();
    const [hour, period] = slot.time.split(' ');
    const [hourNum] = hour.split(':');
    slotTime.setHours(
      period === 'PM' && hourNum !== '12' ? parseInt(hourNum) + 12 : parseInt(hourNum),
      0, 0, 0
    );
    return slotTime > new Date();
  });

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Recommended Times</h2>
        <div className="flex items-center text-sm text-blue-600">
          <Star className="w-4 h-4 mr-1" />
          AI Optimized
        </div>
      </div>

      {nextBestTime && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-blue-900">Next Best Time</h3>
              <p className="text-2xl font-bold text-blue-900">{nextBestTime.time}</p>
              <p className="text-sm text-blue-700">
                {nextBestTime.occupancy}% occupied • {nextBestTime.waitTime}min wait
              </p>
            </div>
            <div className="text-right">
              <div className="flex items-center text-blue-600 mb-2">
                <TrendingDown className="w-4 h-4 mr-1" />
                <span className="text-sm">Low stress</span>
              </div>
              <Button variant="primary" size="sm">
                Set Reminder
              </Button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-3">
        <h3 className="font-medium text-gray-900">Today's Best Times</h3>
        <div className="grid grid-cols-2 gap-3">
          {recommendedSlots.map((slot, index) => (
            <div
              key={index}
              className="p-3 bg-green-50 rounded-lg border border-green-200"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-green-900">{slot.time}</div>
                  <div className="text-sm text-green-700">
                    {slot.occupancy}% busy
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center text-green-600">
                    <Clock className="w-3 h-3 mr-1" />
                    <span className="text-xs">{slot.waitTime}min</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium text-gray-900 mb-2">Smart Scheduling Tips</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• Early morning (9-10 AM) is typically quietest</li>
          <li>• Avoid lunch hours (12-2 PM) and after work (5-7 PM)</li>
          <li>• Weekday afternoons are often less crowded</li>
        </ul>
      </div>
    </Card>
  );
};