import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ContactMethod } from '@/types/chatbot-types';

interface ContactFormProps {
  contactMethod: ContactMethod;
  onSubmit: (formData: { name: string; email: string; phone: string }) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({ contactMethod, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Naam is verplicht';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-mailadres is verplicht';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Ongeldig e-mailadres';
    }
    
    if (contactMethod === 'call' && !formData.phone.trim()) {
      newErrors.phone = 'Telefoonnummer is verplicht voor belverzoek';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const getMethodText = () => {
    switch (contactMethod) {
      case 'email':
        return 'e-mail';
      case 'call':
        return 'telefonisch';
      default:
        return 'contact';
    }
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-4">
          Vul je gegevens in zodat we {getMethodText()} contact kunnen opnemen:
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
            Naam *
          </Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className={`mt-1 ${errors.name ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#1E88E5]'}`}
            placeholder="Je volledige naam"
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            E-mailadres *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            className={`mt-1 ${errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#1E88E5]'}`}
            placeholder="je@email.nl"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Telefoonnummer {contactMethod === 'call' && '*'}
          </Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            className={`mt-1 ${errors.phone ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-[#1E88E5]'}`}
            placeholder="06 12345678"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-[#1E88E5] hover:bg-[#1976D2] text-white py-3"
        >
          {contactMethod === 'email' ? '📧 Verstuur gegevens' : '📞 Vraag terugbelverzoek aan'}
        </Button>
      </form>
    </div>
  );
};