import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, Phone, Mail, MessageCircle, CheckCircle } from 'lucide-react';
import type { ConversationStep, ContactMethod } from '../../types/conversation-types';

interface HVACQuoteFlowProps {
  serviceType: string | null;
  isCompleted: boolean;
  flowTitle: string;
  currentStep: ConversationStep | null;
  showEnhancedContactSelection: boolean;
  showContactForm: boolean;
  showPersonalDetailsForm: boolean;
  contactMethods: ContactMethod[];
  conversationData: Record<string, any>;
  inputValue: string;
  setInputValue: (value: string) => void;
  selectedFiles: File[];
  setSelectedFiles: (files: File[]) => void;
  isProcessing: boolean;
  onServiceSelect: (service: string) => void;
  onContactMethodSelect: (method: string) => void;
  onContactFormSubmit: (data: { phone: string; email: string }) => void;
  onPersonalDetailsSubmit: (data: { name: string; phone: string; email: string }) => void;
  onStepResponse: (value: any) => void;
}

const ServiceSelectionButtons = ({ onServiceSelect }: { onServiceSelect: (service: string) => void }) => (
  <div className="p-4 space-y-3 h-full flex flex-col">
    <h3 className="text-lg font-semibold text-gray-800 text-center mb-4 flex-shrink-0">
      Waarvoor wil je een offerte?
    </h3>
    <div className="flex-1 overflow-y-auto">
      <div className="grid gap-3 pb-4">
      <Button
        onClick={() => onServiceSelect('new-airco')}
        className="h-auto p-4 justify-start text-left bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 min-h-[70px] flex items-center rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
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
        className="h-auto p-4 justify-start text-left bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 min-h-[70px] flex items-center rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
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
        className="h-auto p-4 justify-start text-left bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 min-h-[70px] flex items-center rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
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
        className="h-auto p-4 justify-start text-left bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 min-h-[70px] flex items-center rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
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
        className="h-auto p-4 justify-start text-left bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 min-h-[70px] flex items-center rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
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
        className="h-auto p-4 justify-start text-left bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 min-h-[70px] flex items-center rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group"
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

const ContactMethodSelector = ({ 
  contactMethods, 
  onContactMethodSelect, 
  isProcessing 
}: { 
  contactMethods: ContactMethod[];
  onContactMethodSelect: (method: string) => void;
  isProcessing: boolean;
}) => (
  <div className="p-4 space-y-4">
    <h3 className="text-lg font-semibold text-gray-800 text-center">
      Hoe wil je contact? 📞
    </h3>
    <div className="grid gap-3">
      {contactMethods.map((method) => (
        <Button
          key={method.id}
          onClick={() => onContactMethodSelect(method.id)}
          disabled={isProcessing}
          className="h-auto p-4 justify-start text-left border-2 border-blue-200 hover:border-blue-300 hover:bg-blue-50 min-h-[60px] flex items-center rounded-xl shadow-md hover:shadow-lg transition-all duration-300 bg-white text-gray-800 hover:text-blue-700"
          variant="outline"
        >
          <div className="mr-3 text-xl">{method.emoji}</div>
          <div className="flex-1">
            <div className="font-bold text-sm leading-tight mb-1">
              {method.label}
            </div>
            <div className="text-xs leading-tight opacity-70">
              {method.description}
            </div>
          </div>
        </Button>
      ))}
    </div>
  </div>
);

const ContactForm = ({ 
  onContactFormSubmit 
}: { 
  onContactFormSubmit: (data: { phone: string; email: string }) => void;
}) => {
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContactFormSubmit({ phone, email });
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">
        Laat je gegevens achter 📋
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Telefoonnummer *
          </label>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="06-12345678"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            E-mailadres *
          </label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jouw@email.nl"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600"
          disabled={!phone || !email}
        >
          Verstuur gegevens
        </Button>
      </form>
    </div>
  );
};

const PersonalDetailsForm = ({ 
  onPersonalDetailsSubmit 
}: { 
  onPersonalDetailsSubmit: (data: { name: string; phone: string; email: string }) => void;
}) => {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPersonalDetailsSubmit({ name, phone, email });
  };

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">
        Persoonlijke gegevens 👤
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Naam *
          </label>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Voor- en achternaam"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Telefoonnummer *
          </label>
          <Input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="06-12345678"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            E-mailadres *
          </label>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jouw@email.nl"
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600"
          disabled={!name || !phone || !email}
        >
          Verder
        </Button>
      </form>
    </div>
  );
};

const StepInput = ({ 
  step, 
  inputValue, 
  setInputValue, 
  selectedFiles,
  setSelectedFiles,
  onStepResponse 
}: { 
  step: ConversationStep;
  inputValue: string;
  setInputValue: (value: string) => void;
  selectedFiles: File[];
  setSelectedFiles: (files: File[]) => void;
  onStepResponse: (value: any) => void;
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setSelectedFiles([...selectedFiles, ...files]);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleSkip = () => {
    onStepResponse(''); // Submit empty response to skip
  };

  if (step.type === 'choice' && step.options) {
    return (
      <div className="p-4 space-y-3">
        <div className="grid gap-2">
          {step.options.map((option, index) => (
            <Button
              key={index}
              onClick={() => onStepResponse(option)}
              variant="outline"
              className="h-auto p-3 justify-start text-left border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 min-h-[50px] rounded-xl transition-all duration-300 bg-white"
            >
              <span className="text-sm font-medium text-gray-800">{option}</span>
            </Button>
          ))}
        </div>
      </div>
    );
  }

  if (step.type === 'text') {
    const isPhotoRequest = step.content?.toLowerCase().includes('foto') || step.content?.toLowerCase().includes('photo');
    
    return (
      <div className="p-4 space-y-3">
        {isPhotoRequest ? (
          <>
            <div className="space-y-2">
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="w-full h-auto p-3 border-2 border-dashed border-gray-300 hover:border-blue-300 rounded-xl transition-all duration-300"
              >
                <Upload className="w-4 h-4 mr-2" />
                Foto's/Video's uploaden
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {selectedFiles.length > 0 && (
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Geselecteerde bestanden:</p>
                {selectedFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                    <span className="text-sm truncate">{file.name}</span>
                    <Button
                      onClick={() => removeFile(index)}
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <Button
                onClick={() => onStepResponse(selectedFiles)}
                disabled={selectedFiles.length === 0}
                className="flex-1 bg-blue-500 hover:bg-blue-600"
              >
                Verstuur ({selectedFiles.length})
              </Button>
              <Button
                onClick={handleSkip}
                variant="outline"
                className="flex-shrink-0"
              >
                Overslaan
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
              className="min-h-[80px]"
            />
            <div className="flex gap-2">
              <Button
                onClick={() => onStepResponse(inputValue)}
                disabled={!inputValue.trim()}
                className="flex-1 bg-blue-500 hover:bg-blue-600"
              >
                Verstuur
              </Button>
              <Button
                onClick={handleSkip}
                variant="outline"
                className="flex-shrink-0"
              >
                Overslaan
              </Button>
            </div>
          </>
        )}
      </div>
    );
  }

  return null;
};

const CompletionScreen = ({ flowTitle }: { flowTitle: string }) => (
  <div className="p-6 text-center space-y-4">
    <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
      <CheckCircle className="w-8 h-8 text-green-600" />
    </div>
    <h3 className="text-xl font-bold text-gray-800">Bedankt!</h3>
    <p className="text-sm text-gray-600 leading-relaxed">
      Je aanvraag voor <strong>{flowTitle}</strong> is ontvangen. 
      We nemen binnen 24 uur contact met je op! 🎉
    </p>
    <div className="bg-blue-50 p-4 rounded-lg">
      <p className="text-xs text-blue-700">
        <strong>Tip:</strong> Houd je telefoon bij de hand. 
        Onze monteurs bellen vaak dezelfde dag nog!
      </p>
    </div>
  </div>
);

const HVACQuoteFlow: React.FC<HVACQuoteFlowProps> = ({
  serviceType,
  isCompleted,
  flowTitle,
  currentStep,
  showEnhancedContactSelection,
  showContactForm,
  showPersonalDetailsForm,
  contactMethods,
  inputValue,
  setInputValue,
  selectedFiles,
  setSelectedFiles,
  isProcessing,
  onServiceSelect,
  onContactMethodSelect,
  onContactFormSubmit,
  onPersonalDetailsSubmit,
  onStepResponse
}) => {
  if (isCompleted) {
    return <CompletionScreen flowTitle={flowTitle} />;
  }

  if (!serviceType) {
    return <ServiceSelectionButtons onServiceSelect={onServiceSelect} />;
  }

  if (showPersonalDetailsForm) {
    return <PersonalDetailsForm onPersonalDetailsSubmit={onPersonalDetailsSubmit} />;
  }

  if (showEnhancedContactSelection) {
    return (
      <ContactMethodSelector
        contactMethods={contactMethods}
        onContactMethodSelect={onContactMethodSelect}
        isProcessing={isProcessing}
      />
    );
  }

  if (showContactForm) {
    return <ContactForm onContactFormSubmit={onContactFormSubmit} />;
  }

  if (currentStep && currentStep.type !== 'contact') {
    return (
      <StepInput
        step={currentStep}
        inputValue={inputValue}
        setInputValue={setInputValue}
        selectedFiles={selectedFiles}
        setSelectedFiles={setSelectedFiles}
        onStepResponse={onStepResponse}
      />
    );
  }

  return null;
};

export default HVACQuoteFlow;