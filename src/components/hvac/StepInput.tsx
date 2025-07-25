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
      <div className="p-4 space-y-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 touch-manipulation">
        <div className="grid gap-3">
          {optionsToShow.map((option, index) => (
            <Button
              key={index}
              onClick={() => onStepResponse(option)}
              variant="outline"
              className="h-auto p-4 justify-start text-left border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 min-h-[52px] rounded-xl transition-all duration-300 bg-white touch-manipulation text-base"
            >
              <span className="font-medium text-gray-800 leading-relaxed">{option}</span>
            </Button>
          ))}
        </div>
        {step.explanation && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800 font-medium leading-relaxed">{step.explanation}</p>
          </div>
        )}
      </div>
    );
  }

  if (step.type === 'text') {
    const isMediaRequest = step.content?.toLowerCase().includes('foto') || 
                           step.content?.toLowerCase().includes('photo') ||
                           step.content?.toLowerCase().includes('video') ||
                           step.content?.toLowerCase().includes('film');
    
    return (
      <div className="p-4 space-y-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {isMediaRequest ? (
          <>
            <ImageUpload
              files={selectedFiles}
              onChange={setSelectedFiles}
              maxFiles={10}
              maxSize={25}
              accept="image/*,video/*"
              allowVideos={true}
            />

            <div className="flex gap-3 sticky bottom-0 bg-white p-3 border-t shadow-lg rounded-t-lg">
              <Button
                onClick={() => onStepResponse(`${selectedFiles.length} foto${selectedFiles.length > 1 ? "'s" : ''} geselecteerd`, selectedFiles)}
                disabled={selectedFiles.length === 0}
                className="flex-1 bg-blue-500 hover:bg-blue-600 min-h-[52px] touch-manipulation text-base"
              >
                Verstuur ({selectedFiles.length})
              </Button>
              <Button
                onClick={handleSkip}
                variant="outline"
                className="flex-shrink-0 min-h-[52px] px-6 touch-manipulation text-base"
              >
                Skip
              </Button>
            </div>
          </>
        ) : (
          <>
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={step.content?.includes('nog iets wat we moeten weten') ? 
                "Typ hier eventuele opmerkingen..." : "Typ hier je antwoord..."}
              className="min-h-[100px] text-base touch-manipulation resize-none"
            />
            <div className="flex gap-3 pt-2">
              <Button
                onClick={() => onStepResponse(inputValue)}
                disabled={!inputValue.trim()}
                className="flex-1 bg-blue-500 hover:bg-blue-600 min-h-[52px] touch-manipulation text-base"
              >
                Verstuur
              </Button>
              <Button
                onClick={handleSkip}
                variant="outline"
                className="flex-shrink-0 min-h-[52px] px-6 touch-manipulation text-base"
              >
                Skip
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }

  return null;
};

export default StepInput;