import React, { useState } from 'react';
import type { Workstation } from '../types';

interface GestionPostesProps {
    workstations: Workstation[];
    onAddWorkstation: (name: string) => void;
}

const GestionPostes: React.FC<GestionPostesProps> = ({ workstations, onAddWorkstation }) => {
    const [newWorkstationName, setNewWorkstationName] = useState('');

    const handleAddWorkstation = () => {
        if (newWorkstationName.trim()) {
            onAddWorkstation(newWorkstationName.trim());
            setNewWorkstationName('');
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-100">Gestion des Postes de Travail</h1>
                <p className="text-stone-500 dark:text-stone-400 mt-1">Créez et gérez les accès pour vos équipes de couture.</p>
            </div>

            <div className="bg-white dark:bg-stone-800 p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-4">Ajouter un nouveau poste</h2>
                <div className="flex items-center gap-4">
                    <input
                        type="text"
                        value={newWorkstationName}
                        onChange={(e) => setNewWorkstationName(e.target.value)}
                        placeholder="Nom du poste (ex: Atelier Broderie)"
                        className="flex-grow px-3 py-2 bg-white dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                    />
                    <button
                        onClick={handleAddWorkstation}
                        className="px-5 py-2.5 text-sm font-medium text-white bg-orange-900 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 transition-transform hover:scale-105"
                    >
                        Ajouter
                    </button>
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-lg font-semibold">Postes existants</h2>
                {workstations.map(ws => (
                    <div key={ws.id} className="bg-white dark:bg-stone-800 p-4 rounded-lg shadow-md flex justify-between items-center">
                        <div>
                            <p className="font-bold text-stone-800 dark:text-stone-100">{ws.name}</p>
                            <p className="text-sm text-stone-500 dark:text-stone-400">Code d'accès : 
                                <span className="font-mono ml-2 bg-stone-100 dark:bg-stone-700 p-1 rounded text-orange-800 dark:text-orange-400">
                                    {ws.accessCode}
                                </span>
                            </p>
                        </div>
                        {/* Future actions like delete/edit can be added here */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GestionPostes;