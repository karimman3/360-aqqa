import React from 'react';
import { GeneratedImage } from '../types';

interface ImageCardProps {
  image: GeneratedImage;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
  const handleDownload = () => {
    if (!image.src) return;
    const link = document.createElement('a');
    link.href = image.src;
    const mimeType = image.src.split(';')[0].split(':')[1];
    const extension = mimeType ? mimeType.split('/')[1] : 'png';
    link.download = `${image.view.toLowerCase().replace(/\s+/g, '-')}-view.${extension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
      <div className="aspect-square w-full bg-gray-700 flex items-center justify-center">
        {image.src ? (
          <img src={image.src} alt={image.view} className="object-cover w-full h-full" />
        ) : (
          <div className="p-4 text-center text-red-400 flex flex-col items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8 mb-2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            Generation Failed
          </div>
        )}
      </div>
      <div className="p-3 bg-gray-800/50 flex justify-between items-center">
        <h3 className="font-semibold text-gray-300">{image.view}</h3>
        {image.src && (
          <button
            onClick={handleDownload}
            title={`Download ${image.view} view`}
            aria-label={`Download ${image.view} view`}
            className="p-2 text-gray-400 bg-gray-700 rounded-full hover:bg-gray-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
          </button>
        )}
      </div>
    </div>
  );
};

const SkeletonCard: React.FC = () => {
    return (
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col">
          <div className="aspect-square w-full bg-gray-700 animate-pulse"></div>
          <div className="p-3 bg-gray-800/50">
            <div className="h-6 w-3/4 mx-auto bg-gray-700 rounded animate-pulse"></div>
          </div>
        </div>
      );
}

interface ImageGridProps {
  images: GeneratedImage[] | null;
  isLoading: boolean;
}

export const ImageGrid: React.FC<ImageGridProps> = ({ images, isLoading }) => {
  if (!isLoading && !images) {
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto mt-12">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-300">Generated Views</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
                Array.from({ length: 6 }).map((_, index) => <SkeletonCard key={index} />)
            ) : (
                images?.map((img) => <ImageCard key={img.view} image={img} />)
            )}
        </div>
    </div>
  );
};