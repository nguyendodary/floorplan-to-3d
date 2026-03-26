import { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X, Download, Loader2 } from 'lucide-react';
import { usePuter } from '../context/PuterContext';

export const UploadZone = () => {
  const { isAuthenticated, generateImage, saveTransformation, user } = usePuter();
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const processFile = async (file: File) => {
    if (!isAuthenticated) {
      setError('Please sign in to upload floor plans.');
      return;
    }
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('File size must be less than 10MB.');
      return;
    }

    setError(null);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const dataUrl = e.target?.result as string;
      if (dataUrl) {
        setOriginalImage(dataUrl);
        setIsGenerating(true);
        try {
          const generatedUrl = await generateImage(dataUrl);
          if (generatedUrl) {
            setGeneratedImage(generatedUrl);
            if (user) {
              await saveTransformation({
                id: crypto.randomUUID(),
                userId: user.uuid,
                username: user.username,
                originalImageUrl: dataUrl,
                generatedImageUrl: generatedUrl,
                description: 'Photorealistic 3D render generated from floor plan.',
                createdAt: Date.now(),
              });
            }
          } else {
            setError('Failed to generate 3D image.');
          }
        } catch (err) {
          setError('Error generating image.');
        } finally {
          setIsGenerating(false);
        }
      } else {
        setError('Failed to read file.');
      }
    };
    reader.onerror = () => setError('Failed to read file.');
    reader.readAsDataURL(file);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  };

  if (originalImage) {
    return (
      <section id="upload" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center mb-8">
            2D to 3D Transformation
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">2D Original</span>
              </div>
              <div className="p-4">
                <img src={originalImage} alt="Original" className="w-full rounded-lg" />
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-indigo-500/50 bg-white dark:bg-gray-900 shadow-lg shadow-indigo-500/10 flex flex-col">
              <div className="px-4 py-3 bg-indigo-50 dark:bg-indigo-900/30 border-b border-indigo-500/30 transition-colors">
                <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 uppercase">3D Render</span>
              </div>
              <div className="p-4 flex-1 flex flex-col items-center justify-center">
                {isGenerating ? (
                   <div className="flex flex-col items-center justify-center p-12 text-center h-full">
                     <Loader2 className="w-10 h-10 text-indigo-500 animate-spin mb-4" />
                     <p className="text-gray-900 dark:text-white font-medium">Analyzing floor plan and rendering 3D model...</p>
                     <p className="text-sm text-gray-500 mt-2">This may take up to 30 seconds.</p>
                   </div>
                ) : generatedImage ? (
                  <div className="relative w-full">
                    <img
                      src={generatedImage}
                      alt="3D Render"
                      className="w-full rounded-lg"
                    />
                    <span className="absolute bottom-2 left-2 px-2 py-1 bg-indigo-600 rounded text-xs text-white font-bold shadow-lg">
                      3D
                    </span>
                  </div>
                ) : error ? (
                   <div className="text-red-500">{error}</div>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-3">
            {generatedImage && (
              <a
                href={generatedImage}
                download="roomifi-3d.png"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-lg transition-colors shadow-md hover:shadow-lg"
              >
                <Download className="w-4 h-4" />
                Download 3D
              </a>
            )}
            <button
              onClick={() => {
                setOriginalImage(null);
                setGeneratedImage(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors border border-gray-200 dark:border-gray-700"
            >
              <X className="w-4 h-4" />
              New Upload
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="upload" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Upload Your Floor Plan
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Drop your 2D floor plan below and get an instant 3D visualization
          </p>
        </div>

        <div
          onClick={() => fileInputRef.current?.click()}
          className="relative rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-indigo-400 dark:hover:border-indigo-500 p-12 transition-all cursor-pointer bg-white dark:bg-gray-900 shadow-sm hover:shadow-md"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-indigo-500/10 flex items-center justify-center">
              <Upload className="w-8 h-8 text-indigo-500" />
            </div>
            <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">
              Drag & drop your floor plan
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              or click to browse (PNG, JPG, WEBP up to 10MB)
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-4 flex items-center gap-2 text-red-500 justify-center">
            <ImageIcon className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}
      </div>
    </section>
  );
};
