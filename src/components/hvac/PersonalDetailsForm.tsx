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
    <div className="h-full flex flex-col">
      <div className="flex-1 p-3 sm:p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 min-h-0">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 text-center mb-4">
          Persoonlijke gegevens 👤
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
              Naam *
            </label>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Voor- en achternaam"
              required
              className="text-sm sm:text-base"
            />
          </div>
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
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Postcode *
              </label>
              <Input
                type="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="1234 AB"
                required
                className="text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                Huisnummer *
              </label>
              <Input
                type="text"
                value={huisnummer}
                onChange={(e) => setHuisnummer(e.target.value)}
                placeholder="123"
                required
                className="text-sm sm:text-base"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-sm sm:text-base"
            disabled={!name || !phone || !email || !postcode || !huisnummer}
          >
            Verder
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;