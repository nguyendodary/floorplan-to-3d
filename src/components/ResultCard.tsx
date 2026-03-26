import { Download } from 'lucide-react';
import { FloorPlan3D } from './FloorPlan3D';

interface ResultCardProps {
  imageUrl: string;
}

export const ResultCard = ({ imageUrl }: ResultCardProps) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
          Result
        </h2>

        <FloorPlan3D imageUrl={imageUrl} />

        <div className="mt-6 text-center">
          <a
            href={imageUrl}
            download="roomifi.png"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Download
          </a>
        </div>
      </div>
    </section>
  );
};
