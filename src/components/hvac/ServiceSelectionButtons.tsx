import React from 'react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface ServiceSelectionButtonsProps {
  onServiceSelect: (service: string) => void;
}

const ServiceSelectionButtons: React.FC<ServiceSelectionButtonsProps> = ({ onServiceSelect }) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="h-full flex flex-col overflow-hidden">
      <h3 className="text-base sm:text-lg font-semibold text-gray-800 text-center mb-2 sm:mb-3 px-3 py-2 flex-shrink-0">
        Waarvoor wil je een offerte?
      </h3>
      <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 px-2 pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="grid gap-2 sm:gap-3">
          <Button
            onClick={() => onServiceSelect('new-airco')}
            className={`w-full h-auto ${isMobile ? 'p-3' : 'p-4'} justify-start text-left bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 ${isMobile ? 'min-h-[60px]' : 'min-h-[70px]'} flex items-center rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.01] touch-manipulation`}
          >
            <div className={`${isMobile ? 'mr-2 text-xl' : 'mr-3 text-2xl'}`}>❄️</div>
            <div className="flex-1">
              <div className={`font-bold ${isMobile ? 'text-sm' : 'text-base'} leading-tight mb-1 text-white`}>
                Nieuwe airco
              </div>
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-blue-100 leading-tight`}>
                Koelen / verwarmen
              </div>
            </div>
          </Button>

          <Button
            onClick={() => onServiceSelect('heat-pump')}
            className={`w-full h-auto ${isMobile ? 'p-3' : 'p-4'} justify-start text-left bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 ${isMobile ? 'min-h-[60px]' : 'min-h-[70px]'} flex items-center rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.01] touch-manipulation`}
          >
            <div className={`${isMobile ? 'mr-2 text-xl' : 'mr-3 text-2xl'}`}>🔥</div>
            <div className="flex-1">
              <div className={`font-bold ${isMobile ? 'text-sm' : 'text-base'} leading-tight mb-1 text-white`}>
                Warmtepomp
              </div>
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-orange-100 leading-tight`}>
                Hybride of volledig elektrisch
              </div>
            </div>
          </Button>

          <Button
            onClick={() => onServiceSelect('maintenance')}
            className={`w-full h-auto ${isMobile ? 'p-3' : 'p-4'} justify-start text-left bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 ${isMobile ? 'min-h-[60px]' : 'min-h-[70px]'} flex items-center rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.01] touch-manipulation`}
          >
            <div className={`${isMobile ? 'mr-2 text-xl' : 'mr-3 text-2xl'}`}>🔧</div>
            <div className="flex-1">
              <div className={`font-bold ${isMobile ? 'text-sm' : 'text-base'} leading-tight mb-1 text-white`}>
                Onderhoud / Service
              </div>
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-green-100 leading-tight`}>
                Voor bestaande systemen
              </div>
            </div>
          </Button>

          <Button
            onClick={() => onServiceSelect('repair')}
            className={`w-full h-auto ${isMobile ? 'p-3' : 'p-4'} justify-start text-left bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 ${isMobile ? 'min-h-[60px]' : 'min-h-[70px]'} flex items-center rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.01] touch-manipulation`}
          >
            <div className={`${isMobile ? 'mr-2 text-xl' : 'mr-3 text-2xl'}`}>🚑</div>
            <div className="flex-1">
              <div className={`font-bold ${isMobile ? 'text-sm' : 'text-base'} leading-tight mb-1 text-white`}>
                Reparatie / Storing
              </div>
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-red-100 leading-tight`}>
                Spoedgevallen
              </div>
            </div>
          </Button>

          <Button
            onClick={() => onServiceSelect('commissioning')}
            className={`w-full h-auto ${isMobile ? 'p-3' : 'p-4'} justify-start text-left bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 ${isMobile ? 'min-h-[60px]' : 'min-h-[70px]'} flex items-center rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.01] touch-manipulation`}
          >
            <div className={`${isMobile ? 'mr-2 text-xl' : 'mr-3 text-2xl'}`}>✅</div>
            <div className="flex-1">
              <div className={`font-bold ${isMobile ? 'text-sm' : 'text-base'} leading-tight mb-1 text-white`}>
                Inbedrijfstelling
              </div>
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-purple-100 leading-tight`}>
                Gekocht systeem
              </div>
            </div>
          </Button>

          <Button
            onClick={() => onServiceSelect('project-advice')}
            className={`w-full h-auto ${isMobile ? 'p-3' : 'p-4'} justify-start text-left bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 ${isMobile ? 'min-h-[60px]' : 'min-h-[70px]'} flex items-center rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.01] touch-manipulation`}
          >
            <div className={`${isMobile ? 'mr-2 text-xl' : 'mr-3 text-2xl'}`}>🏢</div>
            <div className="flex-1">
              <div className={`font-bold ${isMobile ? 'text-sm' : 'text-base'} leading-tight mb-1 text-white`}>
                Groot project / VvE
              </div>
              <div className={`${isMobile ? 'text-xs' : 'text-sm'} text-indigo-100 leading-tight`}>
                Advies op maat
              </div>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ServiceSelectionButtons;