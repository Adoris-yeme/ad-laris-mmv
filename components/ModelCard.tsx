import React from 'react';
import type { Modele } from '../types';
import { ExpandIcon } from './icons';

interface ModelCardProps {
    model: Modele;
    onClick: () => void;
    isModelOfTheMonth?: boolean;
    onSetModelOfTheMonth?: (event: React.MouseEvent) => void;
    isFavorite?: boolean;
    onToggleFavorite?: (event: React.MouseEvent) => void;
    onViewLarger?: (event: React.MouseEvent) => void;
    // FIX: Changed userMode from 'stylist' to 'manager' to align with the rest of the application.
    userMode?: 'manager' | 'client';
    onStartOrder?: (event: React.MouseEvent) => void;
}

const ModelCard: React.FC<ModelCardProps> = ({ model, onClick, isModelOfTheMonth, onSetModelOfTheMonth, isFavorite, onToggleFavorite, onViewLarger, userMode, onStartOrder }) => (
  <div className="bg-white dark:bg-stone-800 rounded-lg shadow-md overflow-hidden group transition-all hover:shadow-xl flex flex-col">
    <div onClick={onClick} className="cursor-pointer">
      <div className="aspect-[4/5] overflow-hidden relative">
          {onSetModelOfTheMonth && (
              <button
                  onClick={onSetModelOfTheMonth}
                  className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-colors duration-200 ${isModelOfTheMonth ? 'bg-yellow-100 text-yellow-500 dark:bg-yellow-900/50 dark:text-yellow-400' : 'bg-white/70 text-stone-700 dark:bg-stone-900/50 dark:text-stone-300 backdrop-blur-sm hover:bg-white dark:hover:bg-stone-700'}`}
                  aria-label="Mettre en vedette"
              >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
              </button>
          )}
          {onToggleFavorite && (
              <button
                  onClick={onToggleFavorite}
                  className={`absolute top-3 left-3 z-10 p-2 rounded-full transition-colors duration-200 ${isFavorite ? 'bg-red-100 text-red-500 dark:bg-red-900/50 dark:text-red-400' : 'bg-white/70 text-stone-700 dark:bg-stone-900/50 dark:text-stone-300 backdrop-blur-sm hover:bg-white dark:hover:bg-stone-700'}`}
                  aria-label={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
              >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
              </button>
          )}
          <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" src={model.imageUrls?.[0] || 'https://images.unsplash.com/photo-1549298236-834b6f0e495d?q=80&w=400&h=500&fit=crop'} alt={model.title} />
          {onViewLarger && (
              <button
                  onClick={onViewLarger}
                  className="absolute bottom-3 right-3 z-10 p-2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/60 transition-colors"
                  aria-label="Voir en grand"
              >
                  <ExpandIcon className="h-5 w-5" />
              </button>
          )}
      </div>
      <div className="p-5 flex-grow">
        <h3 className="text-lg font-bold text-stone-800 dark:text-stone-100">{model.title}</h3>
        <p className="text-sm text-stone-500 dark:text-stone-400">{model.genre} / {model.event}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="inline-block bg-orange-100 text-orange-800 dark:bg-orange-900/50 dark:text-orange-300 text-xs font-medium px-2.5 py-0.5 rounded-full">{model.fabric}</span>
          <span className="text-xs font-semibold text-stone-600 dark:text-stone-300">{model.difficulty}</span>
        </div>
      </div>
    </div>
    {userMode === 'client' && onStartOrder && (
        <div className="p-3 bg-white dark:bg-stone-800 border-t border-stone-100 dark:border-stone-700 mt-auto">
            <button
                onClick={onStartOrder}
                className="w-full px-4 py-2 text-sm font-semibold text-white bg-orange-900 rounded-md hover:bg-orange-800 transition-colors"
            >
                Choisir ce modèle
            </button>
        </div>
    )}
  </div>
);

export default ModelCard;
