import React, { useState, useEffect, useCallback } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from './icons';

interface ImageLightboxProps {
  imageUrls: string[];
  startIndex: number;
  onClose: () => void;
}

const ImageLightbox: React.FC<ImageLightboxProps> = ({ imageUrls, startIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? imageUrls.length - 1 : prevIndex - 1));
  }, [imageUrls.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === imageUrls.length - 1 ? 0 : prevIndex + 1));
  }, [imageUrls.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (imageUrls.length > 1) {
        if (e.key === 'ArrowLeft') goToPrevious();
        if (e.key === 'ArrowRight') goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, goToPrevious, goToNext, imageUrls.length]);
  
  const hasMultipleImages = imageUrls.length > 1;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 z-[100] flex justify-center items-center p-4 animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white text-4xl hover:text-stone-300 transition-colors z-[110]"
        aria-label="Fermer"
      >
        &times;
      </button>

      {hasMultipleImages && (
        <>
            <button
                onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors z-[110]"
                aria-label="Image précédente"
            >
                <ChevronLeftIcon className="h-8 w-8" />
            </button>

            <button
                onClick={(e) => { e.stopPropagation(); goToNext(); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors z-[110]"
                aria-label="Image suivante"
            >
                <ChevronRightIcon className="h-8 w-8" />
            </button>
        </>
      )}

      <div
        className="relative max-w-full max-h-full flex flex-col items-center justify-center gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={imageUrls[currentIndex]}
          alt={`Vue en grand ${currentIndex + 1}`}
          className="max-w-full max-h-[85vh] w-auto h-auto object-contain animate-slide-up rounded-lg"
        />
        {hasMultipleImages && (
            <div className="text-white bg-black/40 px-3 py-1 rounded-full text-sm">
                {currentIndex + 1} / {imageUrls.length}
            </div>
        )}
      </div>

      <style>{`
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }

        @keyframes slide-up { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        .animate-slide-up { animation: slide-up 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default ImageLightbox;