
import React from 'react';
import { GeneratedImage } from '../types';

interface ImageCardProps {
  image: GeneratedImage;
}

const ImageCard: React.FC<ImageCardProps> = ({ image }) => {
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
      <div className="p-3 bg-gray-800/50">
        <h3 className="text-center font-semibold text-gray-300">{image.view}</h3>
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
