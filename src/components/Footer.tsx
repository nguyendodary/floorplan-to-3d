import { Sparkles } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-500" />
            <span className="text-lg font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              Roomifi
            </span>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Transform your floor plans with the power of AI
          </p>

          <p className="text-sm text-gray-400 dark:text-gray-500">
            © {new Date().getFullYear()} Roomifi. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
