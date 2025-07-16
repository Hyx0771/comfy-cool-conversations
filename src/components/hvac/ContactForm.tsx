import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface ContactFormProps {
  onContactFormSubmit: (data: { phone: string; email: string }) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onContactFormSubmit }) => {
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContactFormSubmit({ phone, email });
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex-1 p-3 sm:p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 min-h-0">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 text-center mb-4">
          Laat je gegevens achter 📋
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Telefoonnummer *
            </label>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="06-12345678"
              required
              className="text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              E-mailadres *
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="jouw@email.nl"
              required
              className="text-sm sm:text-base"
            />
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-sm sm:text-base"
            disabled={!phone || !email}
          >
            Verstuur gegevens
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ContactForm;