import React, { useState } from 'react';
import type { Order, Client, Modele, OrderStatus, Workstation } from '../types';
import ImageLightbox from '../components/ImageLightbox';

interface WorkstationDashboardProps {
    workstation: Workstation;
    orders: Order[];
    clients: Client[];
    models: Modele[];
    onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

const statusOptions: OrderStatus[] = [
  'En cours de couture',
  'En finition',
  'Prêt à livrer',
];

const getStatusColorClasses = (status: OrderStatus) => {
  switch (status) {
    case 'En attente de validation': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    case 'En cours de couture': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300';
    case 'En finition': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-300';
    case 'Prêt à livrer': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300';
    case 'Livré': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300';
    default: return 'bg-stone-100 text-stone-800 dark:bg-stone-700 dark:text-stone-300';
  }
};

const WorkstationDashboard: React.FC<WorkstationDashboardProps> = ({ workstation, orders, clients, models, onUpdateOrderStatus }) => {
    const [lightboxData, setLightboxData] = useState<{ images: string[], startIndex: number } | null>(null);
    const assignedOrders = orders.filter(o => o.workstationId === workstation.id && o.status !== 'Livré');

    return (
        <>
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-100">Tableau de Bord - {workstation.name}</h1>
                <p className="text-stone-500 dark:text-stone-400 mt-1">Voici la liste des commandes qui vous sont assignées.</p>
            </div>

            <div className="space-y-4">
                {assignedOrders.length > 0 ? assignedOrders.map(order => {
                    const client = clients.find(c => c.id === order.clientId);
                    const model = models.find(m => m.id === order.modelId);
                    if (!client || !model) return null;

                    return (
                        <div key={order.id} className="bg-white dark:bg-stone-800 rounded-lg shadow-md p-5 flex flex-col md:flex-row gap-5">
                            <div className="flex-shrink-0">
                                <img 
                                    src={model.imageUrls?.[0]} 
                                    alt={model.title} 
                                    className="w-32 h-40 rounded-md object-cover cursor-pointer hover:opacity-80 transition-opacity"
                                    onClick={() => setLightboxData({ images: model.imageUrls, startIndex: 0 })}
                                />
                            </div>
                            <div className="flex-grow">
                                <p className="font-mono text-xs text-orange-800 dark:text-orange-400">{order.ticketId}</p>
                                <h3 className="text-xl font-bold text-stone-800 dark:text-stone-100">{model.title}</h3>
                                <p className="text-sm text-stone-500 dark:text-stone-400">Pour: <span className="font-semibold">{client.name}</span></p>

                                <div className="mt-4 bg-stone-50 dark:bg-stone-800/50 p-3 rounded-lg">
                                    <h4 className="text-sm font-semibold mb-2">Mesures du client</h4>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                                        <p>Taille: <span className="font-medium">{client.measurements.height} cm</span></p>
                                        <p>Poitrine: <span className="font-medium">{client.measurements.chest} cm</span></p>
                                        <p>Taille: <span className="font-medium">{client.measurements.waist} cm</span></p>
                                        <p>Hanches: <span className="font-medium">{client.measurements.hips} cm</span></p>
                                        <p>Entrejambe: <span className="font-medium">{client.measurements.inseam} cm</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-shrink-0 md:w-48">
                                <label htmlFor={`status-${order.id}`} className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">Changer le statut</label>
                                <select
                                    id={`status-${order.id}`}
                                    value={order.status}
                                    onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                                    className={`w-full appearance-none text-sm font-semibold leading-none rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-stone-800 focus:ring-orange-500 transition-colors cursor-pointer ${getStatusColorClasses(order.status)}`}
                                >
                                    {statusOptions.map(option => (
                                        <option key={option} value={option}>{option}</option>
                                    ))}
                                </select>
                                {order.notes && <p className="mt-4 text-xs text-stone-500 dark:text-stone-400 bg-stone-50 dark:bg-stone-700/50 p-2 rounded">Note: {order.notes}</p>}
                            </div>
                        </div>
                    );
                }) : (
                    <div className="text-center py-12 bg-white dark:bg-stone-800 rounded-lg shadow-md">
                        <svg className="mx-auto h-12 w-12 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        <h3 className="mt-2 text-sm font-medium text-stone-900 dark:text-stone-100">Aucune commande assignée</h3>
                        <p className="mt-1 text-sm text-stone-500">De nouvelles commandes apparaîtront ici lorsqu'elles vous seront attribuées.</p>
                    </div>
                )}
            </div>
        </div>
        {lightboxData && (
            <ImageLightbox 
                imageUrls={lightboxData.images} 
                startIndex={lightboxData.startIndex} 
                onClose={() => setLightboxData(null)} 
            />
        )}
        </>
    );
};

export default WorkstationDashboard;