import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Send, ArrowLeft } from 'lucide-react';
import professionalAvatar from '@/assets/hvac-professional-avatar.jpg';

interface SupportAssistantProps {
  initialMode: 'support' | 'question';
}

interface Message {
  id: string;
  content: string;
  isBot: boolean;
  timestamp: Date;
}

const SupportAssistant: React.FC<SupportAssistantProps> = ({ initialMode }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    // Add initial welcome message
    const welcomeMessage: Message = {
      id: '1',
      content: 'Hoi! Waar kan ik je mee helpen? Stel gerust je vraag over onze diensten of prijzen. 😊',
      isBot: true,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: botResponse,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 300); // Much faster response - was 1500ms
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('prijs') || input.includes('kosten') || input.includes('tarief')) {
      return 'Onze prijzen zijn afhankelijk van verschillende factoren zoals het type installatie en de grootte van je woning. Voor een nauwkeurige prijsopgave kan ik je doorverwijzen naar onze offerte-tool. Wil je daar gebruik van maken? 💰';
    }
    
    if (input.includes('airco') || input.includes('koeling')) {
      return 'We installeren verschillende types airconditioners! Van split-units tot complete klimaatsystemen. Wat voor ruimte wil je koelen en wat is je budget ongeveer? Dan kan ik je beter adviseren! ❄️';
    }
    
    if (input.includes('verwarming') || input.includes('cv') || input.includes('ketel')) {
      return 'Voor verwarmingsproblemen kunnen we je snel helpen! We doen reparaties, onderhoud en installaties van cv-ketels, warmtepompen en meer. Is het urgent of kun je nog wel even wachten? 🔥';
    }
    
    if (input.includes('onderhoud') || input.includes('service')) {
      return 'Regelmatig onderhoud is belangrijk voor een goed werkend systeem! We bieden onderhoudscontracten en eenmalige servicebeurt aan. Hoe oud is je systeem en wanneer is het voor het laatst onderhouden? 🔧';
    }
    
    if (input.includes('spoedgeval') || input.includes('urgent') || input.includes('kapot')) {
      return 'Voor spoedgevallen proberen we binnen 24 uur langs te komen! Bel ons direct op 020-1234567 of laat je gegevens achter via de offerte-tool voor snelle hulp. Wat is er precies aan de hand? 🚨';
    }
    
    return 'Dank je voor je vraag! Voor meer specifieke informatie raad ik je aan om gebruik te maken van onze offerte-tool. Daar kunnen we je beter en sneller helpen met een passend advies. Heb je nog andere vragen? 😊';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col bg-transparent">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in`}
          >
            {message.isBot && (
              <Avatar className="w-8 h-8 mr-2 flex-shrink-0">
                <AvatarImage src={professionalAvatar} alt="HVAC Professional" className="object-cover w-full h-full" />
                <AvatarFallback className="bg-blue-500 text-white text-xs">N</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-[85%] p-3 rounded-2xl ${
                message.isBot
                  ? 'bg-white/10 backdrop-blur-sm border border-white/20 text-gray-800 rounded-tl-md'
                  : 'bg-blue-500 text-white rounded-tr-md'
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
              <p className="text-xs opacity-70 mt-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start animate-fade-in">
            <Avatar className="w-8 h-8 mr-2 flex-shrink-0">
              <AvatarImage src={professionalAvatar} alt="HVAC Professional" className="object-cover w-full h-full" />
              <AvatarFallback className="bg-blue-500 text-white text-xs">N</AvatarFallback>
            </Avatar>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-3 rounded-2xl rounded-tl-md">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-white/20 p-4 bg-transparent">
        <div className="flex space-x-2">
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Typ je vraag hier..."
            className="flex-1 min-h-[40px] max-h-[100px] resize-none"
            rows={1}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isTyping}
            className="bg-blue-500 hover:bg-blue-600 h-10 w-10 p-0"
            size="sm"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Druk op Enter om te verzenden
        </p>
      </div>
    </div>
  );
};

export default SupportAssistant;