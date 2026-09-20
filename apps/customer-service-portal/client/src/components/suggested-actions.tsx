import { motion } from 'framer-motion';
import { memo } from 'react';
import type { UseChatHelpers } from '@ai-sdk/react';
import type { VisibilityType } from './visibility-selector';
import type { ChatMessage } from '@chat-template/core';
import { TargetIcon, StorefrontIcon, SpeechBubbleIcon } from '@/components/icons';
import { softNavigateToChatId } from '@/lib/navigation';
import { useAppConfig } from '@/contexts/AppConfigContext';

interface SuggestedActionsProps {
  chatId: string;
  sendMessage: UseChatHelpers<ChatMessage>['sendMessage'];
  selectedVisibilityType: VisibilityType;
}

function PureSuggestedActions({ chatId, sendMessage }: SuggestedActionsProps) {
  const { chatHistoryEnabled } = useAppConfig();

  const suggestedActions = [
    {
      text: 'Track my order',
      description: 'Check order status & delivery',
      icon: TargetIcon,
      gradient: 'linear-gradient(135deg, #2272b4 0%, #4ba3d6 100%)',
      glow: 'rgba(34, 114, 180, 0.15)',
      hoverBorder: 'rgba(34, 114, 180, 0.4)',
    },
    {
      text: 'Return a product',
      description: 'Start a return or exchange',
      icon: StorefrontIcon,
      gradient: 'linear-gradient(135deg, #2db0a0 0%, #59c47a 100%)',
      glow: 'rgba(45, 176, 160, 0.15)',
      hoverBorder: 'rgba(45, 176, 160, 0.4)',
    },
    {
      text: 'Talk to an agent',
      description: 'Connect with a human representative',
      icon: SpeechBubbleIcon,
      gradient: 'linear-gradient(135deg, #9b6ae8 0%, #7040c8 100%)',
      glow: 'rgba(155, 106, 232, 0.15)',
      hoverBorder: 'rgba(155, 106, 232, 0.4)',
    },
  ];

  return (
    <div
      data-testid="suggested-actions"
      className="grid w-full grid-cols-1 gap-3 mt-2 sm:grid-cols-3"
    >
      {suggestedActions.map((action, index) => {
        const Icon = action.icon;
        return (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.05 * index, duration: 0.4 }}
            key={action.text}
            type="button"
            onClick={() => {
              softNavigateToChatId(chatId, chatHistoryEnabled);
              sendMessage({
                role: 'user',
                parts: [{ type: 'text', text: action.text }],
              });
            }}
            className="group relative flex flex-col items-start gap-3 overflow-hidden rounded-2xl border border-border bg-card p-5 text-left transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-xl"
            style={{
              transition: 'box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = action.hoverBorder;
              e.currentTarget.style.boxShadow = `0 12px 40px ${action.glow}`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '';
              e.currentTarget.style.boxShadow = '';
            }}
          >
            {/* Gradient icon */}
            <div
              className="flex size-11 items-center justify-center rounded-xl shadow-md transition-transform duration-300 group-hover:scale-110"
              style={{ background: action.gradient }}
            >
              <Icon size={22} className="shrink-0 text-white" aria-hidden />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-foreground">
                {action.text}
              </span>
              <span className="text-xs text-muted-foreground">
                {action.description}
              </span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

export const SuggestedActions = memo(
  PureSuggestedActions,
  (prevProps, nextProps) => {
    if (prevProps.chatId !== nextProps.chatId) return false;
    if (prevProps.selectedVisibilityType !== nextProps.selectedVisibilityType)
      return false;

    return true;
  },
);