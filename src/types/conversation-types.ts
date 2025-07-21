
export interface ConversationStep {
  id: string;
  type: 'text' | 'choice' | 'file' | 'contact' | 'personal-details';
  content: string;
  field?: string;
  choices?: string[];
  options?: string[];
  conditionalOptions?: Record<string, string[]>;
  explanation?: string;
  validation?: {
    required?: boolean;
    minLength?: number;
    maxLength?: number;
  };
}

export interface ContactMethod {
  id: string;
  label: string;
  emoji: string;
  description: string;
}

export interface ConversationFlow {
  title: string;
  steps: ConversationStep[];
}
