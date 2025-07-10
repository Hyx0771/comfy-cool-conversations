export interface HVACQuoteState {
  currentStep: number;
  data: Record<string, any>;
  isCompleted: boolean;
  progress: number;
  serviceType: string;
}

export interface HVACQuoteData {
  [key: string]: any;
}