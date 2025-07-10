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

export default ContactForm;