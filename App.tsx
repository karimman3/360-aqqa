
import React, { useState, useEffect, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ImageGrid } from './components/ImageGrid';
import { GeneratedImage } from './types';
import { generateSixViews } from './services/geminiService';

const fileToBase64 = (file: File): Promise<{ base64: string; mimeType: string }> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      const [header, base64] = result.split(',');
      if (!header || !base64) {
          reject(new Error("Invalid file format."));
          return;
      }
      const mimeTypeMatch = header.match(/:(.*?);/);
      const mimeType = mimeTypeMatch ? mimeTypeMatch[1] : 'application/octet-stream';
      resolve({ base64, mimeType });
    };
    reader.onerror = (error) => reject(error);
  });
};

const App: React.FC = () => {
  const [referenceFile, setReferenceFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!referenceFile) {
      setPreviewUrl(null);
      return;
    }
    const objectUrl = URL.createObjectURL(referenceFile);
    setPreviewUrl(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [referenceFile]);

  const handleImageUpload = useCallback((file: File) => {
    setReferenceFile(file);
    setGeneratedImages(null);
    setError(null);
  }, []);

  const handleGenerate = async () => {
    if (!referenceFile) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImages(null);

    try {
      const { base64, mimeType } = await fileToBase64(referenceFile);
      const images = await generateSixViews(base64, mimeType);
      setGeneratedImages(images);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred during generation.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans p-4 sm:p-6 lg:p-8">
      <main className="max-w-7xl mx-auto flex flex-col items-center">
        <header className="text-center my-8">
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                karim banaqqa
                </span>
            </h1>
            <p className="mt-4 text-lg text-gray-400">Upload a reference image to generate six photographic views with aqqa.</p>
        </header>

        <section className="w-full flex flex-col items-center gap-6 mt-6">
          <ImageUploader 
            onImageUpload={handleImageUpload} 
            previewUrl={previewUrl}
            disabled={isLoading}
          />
          
          <button
            onClick={handleGenerate}
            disabled={!referenceFile || isLoading}
            className="px-8 py-3 text-lg font-semibold text-white rounded-lg transition-all duration-300 ease-in-out
                       bg-gradient-to-r from-brand-blue to-brand-purple
                       disabled:opacity-50 disabled:cursor-not-allowed
                       hover:shadow-lg hover:shadow-purple-500/50
                       focus:outline-none focus:ring-4 focus:ring-purple-500/50
                       animate-gradient-x"
          >
            {isLoading ? 'Generating...' : 'Generate 360° Views'}
          </button>
        </section>

        {error && (
          <div className="mt-8 p-4 text-center bg-red-900/50 border border-red-700 text-red-300 rounded-lg max-w-2xl">
            <strong>Error:</strong> {error}
          </div>
        )}

        <ImageGrid images={generatedImages} isLoading={isLoading} />
      </main>

      <footer className="text-center text-gray-500 mt-16 pb-8">
        <p>Powered by aqqa</p>
      </footer>
    </div>
  );
};

export default App;
