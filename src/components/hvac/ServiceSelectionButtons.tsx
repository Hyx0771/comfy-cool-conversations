import React from 'react';
import { Button } from '@/components/ui/button';

interface ServiceSelectionButtonsProps {
  onServiceSelect: (service: string) => void;
}

const ServiceSelectionButtons: React.FC<ServiceSelectionButtonsProps> = ({ onServiceSelect }) => (
  <div className="p-4 h-full flex flex-col max-h-[60vh] overflow-hidden">
    <h3 className="text-lg font-semibold text-gray-800 text-center mb-4 flex-shrink-0">
      Waarvoor wil je een offerte?
    </h3>
    <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 max-h-[50vh] scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 pr-1">
      <div className="grid gap-3 pb-4 pr-2">
        <Button
          onClick={() => onServiceSelect('new-airco')}
          className="h-auto p-4 justify-start text-left bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 min-h-[70px] flex items-center rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-102 relative z-10 hover:z-20"
        >
          <div className="mr-3 text-2xl">❄️</div>
          <div className="flex-1">
            <div className="font-bold text-base leading-tight mb-1 text-white">
              Nieuwe airco
            </div>
            <div className="text-sm text-blue-100 leading-tight">
              Koelen / verwarmen
            </div>
          </div>
        </Button>

        <Button
          onClick={() => onServiceSelect('heat-pump')}
          className="h-auto p-4 justify-start text-left bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 min-h-[70px] flex items-center rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-102 relative z-10 hover:z-20"
        >
          <div className="mr-3 text-2xl">🔥</div>
          <div className="flex-1">
            <div className="font-bold text-base leading-tight mb-1 text-white">
              Warmtepomp
            </div>
            <div className="text-sm text-orange-100 leading-tight">
              Hybride of volledig elektrisch
            </div>
          </div>
        </Button>

        <Button
          onClick={() => onServiceSelect('maintenance')}
          className="h-auto p-4 justify-start text-left bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 min-h-[70px] flex items-center rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-102 relative z-10 hover:z-20"
        >
          <div className="mr-3 text-2xl">🔧</div>
          <div className="flex-1">
            <div className="font-bold text-base leading-tight mb-1 text-white">
              Onderhoud / Service
            </div>
            <div className="text-sm text-green-100 leading-tight">
              Voor bestaande systemen
            </div>
          </div>
        </Button>

        <Button
          onClick={() => onServiceSelect('repair')}
          className="h-auto p-4 justify-start text-left bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 min-h-[70px] flex items-center rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-102 relative z-10 hover:z-20"
        >
          <div className="mr-3 text-2xl">🚑</div>
          <div className="flex-1">
            <div className="font-bold text-base leading-tight mb-1 text-white">
              Reparatie / Storing
            </div>
            <div className="text-sm text-red-100 leading-tight">
              Spoedgevallen
            </div>
          </div>
        </Button>

        <Button
          onClick={() => onServiceSelect('commissioning')}
          className="h-auto p-4 justify-start text-left bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 min-h-[70px] flex items-center rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-102 relative z-10 hover:z-20"
        >
          <div className="mr-3 text-2xl">✅</div>
          <div className="flex-1">
            <div className="font-bold text-base leading-tight mb-1 text-white">
              Inbedrijfstelling
            </div>
            <div className="text-sm text-purple-100 leading-tight">
              Gekocht systeem
            </div>
          </div>
        </Button>

        <Button
          onClick={() => onServiceSelect('project-advice')}
          className="h-auto p-4 justify-start text-left bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 min-h-[70px] flex items-center rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-102 relative z-10 hover:z-20"
        >
          <div className="mr-3 text-2xl">🏢</div>
          <div className="flex-1">
            <div className="font-bold text-base leading-tight mb-1 text-white">
              Groot project / VvE
            </div>
            <div className="text-sm text-indigo-100 leading-tight">
              Advies op maat
            </div>
          </div>
        </Button>
      </div>
    </div>
  </div>
);

export default ServiceSelectionButtons;