import React from 'react';
import type { Tutoriel } from '../types';
import { MOCK_TUTORIELS } from '../constants';

const TutorialCard: React.FC<{ tutorial: Tutoriel }> = ({ tutorial }) => (
  <div className="bg-white dark:bg-stone-800 rounded-lg shadow-md overflow-hidden group transition-all hover:shadow-xl">
    <div className="relative">
      <img className="w-full h-48 object-cover" src={tutorial.imageUrl} alt={tutorial.title} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <span className="absolute top-3 right-3 bg-orange-900 text-white text-xs font-bold px-2 py-1 rounded">
        {tutorial.duration}
      </span>
    </div>
    <div className="p-5">
      <p className="text-sm font-semibold text-orange-800 dark:text-orange-400 uppercase tracking-wider">{tutorial.category}</p>
      <h3 className="mt-1 text-lg font-bold text-stone-800 dark:text-stone-100 leading-tight">{tutorial.title}</h3>
    </div>
  </div>
);

const Tutoriels: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-100">Guides & Tutoriels</h1>
        <p className="text-stone-500 dark:text-stone-400 mt-1">Perfectionnez vos techniques avec nos guides pas-à-pas.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {MOCK_TUTORIELS.map(tutorial => (
          <TutorialCard key={tutorial.id} tutorial={tutorial} />
        ))}
      </div>
    </div>
  );
};

export default Tutoriels;