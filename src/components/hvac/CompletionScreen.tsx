import React from 'react';
import { CheckCircle } from 'lucide-react';

interface CompletionScreenProps {
  flowTitle: string;
}

const CompletionScreen: React.FC<CompletionScreenProps> = ({ flowTitle }) => (
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

export default CompletionScreen;