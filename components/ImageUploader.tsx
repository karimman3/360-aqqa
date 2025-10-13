
import React, { useState, useCallback } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  previewUrl: string | null;
  disabled: boolean;
}

const UploadIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-10 h-10 mb-4 text-gray-500"
  >
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);


export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, previewUrl, disabled }) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileChange = (files: FileList | null) => {
    if (files && files[0]) {
      onImageUpload(files[0]);
    }
  };

  const onDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  }, [disabled]);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (!disabled) {
       handleFileChange(e.dataTransfer.files);
    }
  }, [disabled]);

  return (
    <div className="w-full max-w-lg mx-auto">
      <label
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        className={`flex justify-center items-center w-full h-64 px-4 transition bg-gray-800 border-2 ${
          isDragOver ? 'border-indigo-400' : 'border-gray-600'
        } border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
      >
        {previewUrl ? (
          <img src={previewUrl} alt="Image preview" className="object-contain h-full w-full rounded-md" />
        ) : (
          <div className="flex flex-col items-center">
            <UploadIcon />
            <span className="flex items-center space-x-2">
              <span className="font-medium text-gray-400">
                Drop files to Attach, or
                <span className="text-indigo-400 underline ml-1">browse</span>
              </span>
            </span>
          </div>
        )}
        <input
          type="file"
          name="file_upload"
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
          onChange={(e) => handleFileChange(e.target.files)}
          disabled={disabled}
        />
      </label>
    </div>
  );
};
