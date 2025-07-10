export interface ConversationStep {
  id: string;
  content: string;
  type?: string;
  field?: string;
  options?: string[];
}

export interface ContactMethod {
  id: string;
  label: string;
  emoji: string;
  description: string;
}