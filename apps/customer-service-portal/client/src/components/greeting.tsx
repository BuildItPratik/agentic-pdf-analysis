import { motion } from 'framer-motion';
import { useAppConfig } from '@/contexts/AppConfigContext';

export const Greeting = () => {
  const { greeting } = useAppConfig();
  return (
    <div
      key="overview"
      className="relative mx-auto flex size-full max-w-3xl flex-col items-center justify-center px-4 mb-6 gap-6 overflow-hidden"
    >
      {/* Decorative gradient blobs */}
      <div
        className="pointer-events-none absolute -top-20 -left-10 size-64 rounded-full opacity-20 blur-3xl"
        style={{ background: 'radial-gradient(circle, #2272b4, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-10 -right-10 size-72 rounded-full opacity-15 blur-3xl"
        style={{ background: 'radial-gradient(circle, #9b6ae8, transparent 70%)' }}
      />

      {/* Gradient headset icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.6 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="relative flex size-20 items-center justify-center rounded-2xl shadow-lg"
        style={{
          background: 'linear-gradient(135deg, #2272b4 0%, #2db0a0 50%, #9b6ae8 100%)',
          boxShadow: '0 8px 32px rgba(34, 114, 180, 0.25)',
        }}
      >
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden
        >
          <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
          <path d="M21 19a2 2 0 0 1-2 2h-1v-7h3z" />
          <path d="M3 19a2 2 0 0 0 2 2h1v-7H3z" />
        </svg>
      </motion.div>

      {/* Greeting text with gradient */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.15 }}
        className="relative z-10 text-center"
      >
        <h1
          className="font-bold text-3xl md:text-4xl mb-3"
          style={{
            background: 'linear-gradient(135deg, #2272b4 0%, #2db0a0 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          {greeting}
        </h1>
        <p className="text-base text-muted-foreground max-w-md mx-auto">
          Our AI assistant is here to help with your orders, returns, and questions 24/7.
        </p>
      </motion.div>
    </div>
  );
};
