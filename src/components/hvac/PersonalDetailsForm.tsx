import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface PersonalDetailsFormProps {
  onPersonalDetailsSubmit: (data: { name: string; phone: string; email: string; postcode: string; huisnummer: string }) => void;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ onPersonalDetailsSubmit }) => {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [postcode, setPostcode] = React.useState('');
  const [huisnummer, setHuisnummer] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPersonalDetailsSubmit({ name, phone, email, postcode, huisnummer });
  };

  return (
    <div className="p-4 max-h-96 overflow-y-auto chat-scroll">
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
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Postcode *
            </label>
            <Input
              type="text"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              placeholder="1234 AB"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Huisnummer *
            </label>
            <Input
              type="text"
              value={huisnummer}
              onChange={(e) => setHuisnummer(e.target.value)}
              placeholder="123"
              required
            />
          </div>
        </div>
        <Button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600"
          disabled={!name || !phone || !email || !postcode || !huisnummer}
        >
          Verder
        </Button>
      </form>
    </div>
  );
};

export default PersonalDetailsForm;