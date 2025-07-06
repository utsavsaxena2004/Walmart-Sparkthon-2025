import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { useTheme } from '../../contexts/ThemeContext';

interface BreathingExerciseProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BreathingExercise: React.FC<BreathingExerciseProps> = ({ isOpen, onClose }) => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale' | 'pause'>('inhale');
  const [timeLeft, setTimeLeft] = useState(4);
  const [cycle, setCycle] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const { isDimMode } = useTheme();

  const phases = {
    inhale: { duration: 4, next: 'hold', instruction: 'Breathe In' },
    hold: { duration: 7, next: 'exhale', instruction: 'Hold' },
    exhale: { duration: 8, next: 'pause', instruction: 'Breathe Out' },
    pause: { duration: 2, next: 'inhale', instruction: 'Pause' }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
        setTotalTime(total => total + 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      const currentPhase = phases[phase];
      const nextPhase = currentPhase.next as keyof typeof phases;
      
      setPhase(nextPhase);
      setTimeLeft(phases[nextPhase].duration);
      
      if (nextPhase === 'inhale') {
        setCycle(c => c + 1);
      }
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, phase]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setPhase('inhale');
    setTimeLeft(4);
    setCycle(0);
    setTotalTime(0);
  };

  const getCircleScale = () => {
    const progress = (phases[phase].duration - timeLeft) / phases[phase].duration;
    
    switch (phase) {
      case 'inhale':
        return 0.5 + (progress * 0.5);
      case 'hold':
        return 1;
      case 'exhale':
        return 1 - (progress * 0.5);
      case 'pause':
        return 0.5;
      default:
        return 0.5;
    }
  };

  const getCircleColor = () => {
    switch (phase) {
      case 'inhale':
        return 'bg-blue-400';
      case 'hold':
        return 'bg-purple-400';
      case 'exhale':
        return 'bg-green-400';
      case 'pause':
        return 'bg-gray-400';
      default:
        return 'bg-blue-400';
    }
  };

  const modalStyle = isDimMode ? {
    backgroundColor: '#1f2937',
    color: '#f9fafb'
  } : {};

  const cardStyle = isDimMode ? {
    backgroundColor: '#374151',
    color: '#f9fafb'
  } : {
    backgroundColor: '#f9fafb',
    color: '#111827'
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="4-7-8 Breathing Exercise" 
      className="max-w-lg"
      style={modalStyle}
    >
      <div className="text-center space-y-6">
        <div className="text-sm" style={isDimMode ? {color: '#d1d5db'} : {color: '#6b7280'}}>
          <p>Inhale for 4 seconds, hold for 7 seconds, exhale for 8 seconds</p>
          <p className="mt-2">Complete 4 cycles for best results</p>
        </div>

        {/* Breathing Circle */}
        <div className="flex items-center justify-center h-64">
          <div 
            className={`w-32 h-32 rounded-full ${getCircleColor()} transition-all duration-1000 ease-in-out flex items-center justify-center`}
            style={{ transform: `scale(${getCircleScale()})` }}
          >
            <div className="text-white font-bold text-lg">
              {timeLeft}
            </div>
          </div>
        </div>

        {/* Phase Instruction */}
        <div className="space-y-2">
          <h3 className="text-2xl font-bold" style={isDimMode ? {color: '#f9fafb'} : {color: '#111827'}}>
            {phases[phase].instruction}
          </h3>
          <p className="text-lg" style={isDimMode ? {color: '#d1d5db'} : {color: '#6b7280'}}>
            {timeLeft} seconds remaining
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 p-4 rounded-lg" style={cardStyle}>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">{cycle}</div>
            <div className="text-sm opacity-75">Cycles</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.floor(totalTime / 60)}:{(totalTime % 60).toString().padStart(2, '0')}
            </div>
            <div className="text-sm opacity-75">Total Time</div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4">
          {!isActive ? (
            <Button onClick={handleStart} variant="primary" className="flex items-center">
              <Play className="w-4 h-4 mr-2" />
              Start
            </Button>
          ) : (
            <Button onClick={handlePause} variant="outline" className="flex items-center">
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </Button>
          )}
          
          <Button onClick={handleReset} variant="outline" className="flex items-center">
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>

        {cycle >= 4 && (
          <div 
            className="p-4 rounded-lg border"
            style={isDimMode ? {
              backgroundColor: '#065f46',
              borderColor: '#059669',
              color: '#d1fae5'
            } : {
              backgroundColor: '#ecfdf5',
              borderColor: '#10b981',
              color: '#065f46'
            }}
          >
            <p className="font-medium">
              🎉 Great job! You've completed a full breathing session.
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
};