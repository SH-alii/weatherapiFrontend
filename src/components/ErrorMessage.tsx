"use client";

import React from "react";

interface ErrorMessageProps {
  message: string;
  onDismiss?: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onDismiss }) => {
  return (
    <div className="mt-6 bg-red-50 border-l-4 border-red-500 rounded-lg p-4 max-w-md w-full animate-in fade-in slide-in-from-top">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 text-red-500 text-2xl">⚠️</div>
        <div className="flex-grow">
          <h3 className="text-red-800 font-semibold">Error</h3>
          <p className="text-red-700 text-sm mt-1">{message}</p>
        </div>
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="text-red-400 hover:text-red-600 font-bold text-xl leading-none"
            aria-label="Dismiss error"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
