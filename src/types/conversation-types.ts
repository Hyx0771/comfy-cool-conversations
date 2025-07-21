export interface ConversationStep {
  id: string;
  content: string;
  type?: string;
  field?: string;
  options?: string[];
  conditionalOptions?: Record<string, string[]>;
  explanation?: string;
}

export interface ContactMethod {
  id: string;
  label: string;
  emoji: string;
  description: string;
}