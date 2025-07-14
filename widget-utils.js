// Widget utilities
export const formatTime = (date) => {
  return date.toLocaleTimeString('nl-NL', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

export const generateId = () => {
  return Date.now() + Math.random();
};

export const createMessage = (content, isBot = false) => {
  return {
    id: generateId(),
    content,
    isBot,
    timestamp: new Date()
  };
};

export const scrollToBottom = (elementRef) => {
  elementRef.current?.scrollIntoView({ behavior: 'smooth' });
};

export const delay = (ms) => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

// Widget positioning
export const getWidgetPosition = (position) => {
  const positions = {
    'bottom-right': { bottom: '20px', right: '20px' },
    'bottom-left': { bottom: '20px', left: '20px' },
    'top-right': { top: '20px', right: '20px' },
    'top-left': { top: '20px', left: '20px' }
  };
  return positions[position] || positions['bottom-right'];
};

// Message processing
export const processUserMessage = (message) => {
  // Basic message cleaning
  return message.trim();
};

export const findFAQAnswer = (question, faqData) => {
  // Simple keyword matching
  const keywords = question.toLowerCase().split(' ');
  
  for (const faq of faqData) {
    const faqKeywords = faq.question.toLowerCase().split(' ');
    const matchCount = keywords.filter(keyword => 
      faqKeywords.some(faqKeyword => faqKeyword.includes(keyword))
    ).length;
    
    if (matchCount > 2) {
      return faq.answer;
    }
  }
  
  return null;
};