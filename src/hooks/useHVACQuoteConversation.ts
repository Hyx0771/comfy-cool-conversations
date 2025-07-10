import { useState, useEffect } from 'react';
import { hvacFlowConfigs } from '../data/hvacFlowConfigs';
import type { ConversationStep } from '../types/conversation-types';

export const useHVACQuoteConversation = (serviceType: string | null) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [conversationData, setConversationData] = useState<Record<string, any>>({});
  const [isCompleted, setIsCompleted] = useState(false);

  const flowConfig = serviceType ? hvacFlowConfigs[serviceType as keyof typeof hvacFlowConfigs] : null;
  const currentStep: ConversationStep | null = flowConfig?.steps[currentStepIndex] || null;
  const progress = flowConfig ? Math.round(((currentStepIndex + 1) / flowConfig.steps.length) * 100) : 0;
  const flowTitle = flowConfig?.title || '';

  const handleStepData = (data: any) => {
    if (!currentStep) return;

    const newData = { ...conversationData };
    if (currentStep.field) {
      newData[currentStep.field] = data;
    }
    setConversationData(newData);

    if (flowConfig && currentStepIndex < flowConfig.steps.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const reset = () => {
    setCurrentStepIndex(0);
    setConversationData({});
    setIsCompleted(false);
  };

  useEffect(() => {
    if (serviceType) {
      reset();
    }
  }, [serviceType]);

  return {
    currentStep,
    progress,
    isCompleted,
    conversationData,
    flowTitle,
    handleStepData,
    reset
  };
};