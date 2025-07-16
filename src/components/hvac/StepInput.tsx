import React from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ImageUpload } from '@/components/ui/image-upload';
import type { ConversationStep } from '../../types/conversation-types';

interface StepInputProps {
  step: ConversationStep;
  inputValue: string;
  setInputValue: (value: string) => void;
  selectedFiles: File[];
  setSelectedFiles: (files: File[]) => void;
  onStepResponse: (value: any, files?: File[]) => void;
  conversationData?: any;
}

const StepInput: React.FC<StepInputProps> = ({ 
  step, 
  inputValue, 
  setInputValue, 
  selectedFiles,
  setSelectedFiles,
  onStepResponse,
  conversationData
}) => {
  const handleSkip = () => {
    onStepResponse(''); // Submit empty response to skip
  };

  if (step.type === 'choice' && step.options) {
    // Check if we need to use conditional options based on previous answers
    let optionsToShow = step.options;
    
    if (step.conditionalOptions && conversationData) {
      // Check if customerType is set to business/institution
      const customerType = conversationData.customerType;
      if (customerType && step.conditionalOptions[customerType]) {
        optionsToShow = step.conditionalOptions[customerType];
      }
    }
    
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 p-3 sm:p-4 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 min-h-0">
          <div className="grid gap-2">
            {optionsToShow.map((option, index) => (
              <Button
                key={index}
                onClick={() => onStepResponse(option)}
                variant="outline"
                className="h-auto p-3 justify-start text-left border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 min-h-[45px] sm:min-h-[50px] rounded-xl transition-all duration-300 bg-white"
              >
                <span className="text-xs sm:text-sm font-medium text-gray-800">{option}</span>
              </Button>
            ))}
          </div>
          {step.explanation && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs sm:text-sm text-blue-800 font-medium">{step.explanation}</p>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (step.type === 'text') {
    const isMediaRequest = step.content?.toLowerCase().includes('foto') || 
                           step.content?.toLowerCase().includes('photo') ||
                           step.content?.toLowerCase().includes('video') ||
                           step.content?.toLowerCase().includes('film');
    
    return (
      <div className="h-full flex flex-col">
        <div className="flex-1 p-3 sm:p-4 space-y-3 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 min-h-0">
          {isMediaRequest ? (
            <ImageUpload
              files={selectedFiles}
              onChange={setSelectedFiles}
              maxFiles={10}
              maxSize={25}
              accept="image/*,video/*"
              allowVideos={true}
            />
          ) : (
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={step.content?.includes('nog iets wat we moeten weten') ? 
                "Typ hier eventuele opmerkingen..." : "Typ hier je antwoord..."}
              className="min-h-[60px] sm:min-h-[80px] resize-none"
            />
          )}
        </div>
        
        <div className="flex-shrink-0 p-3 sm:p-4 bg-white border-t border-gray-100">
          <div className="flex gap-2">
            <Button
              onClick={() => isMediaRequest ? 
                onStepResponse(`${selectedFiles.length} foto${selectedFiles.length > 1 ? "'s" : ''} geselecteerd`, selectedFiles) :
                onStepResponse(inputValue)
              }
              disabled={isMediaRequest ? selectedFiles.length === 0 : !inputValue.trim()}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-sm sm:text-base"
            >
              {isMediaRequest ? `Verstuur (${selectedFiles.length})` : 'Verstuur'}
            </Button>
            <Button
              onClick={handleSkip}
              variant="outline"
              className="flex-shrink-0 text-sm sm:text-base"
            >
              Overslaan
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default StepInput;