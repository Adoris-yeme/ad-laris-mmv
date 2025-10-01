import React, { useState, useMemo } from 'react';
import type { Client, Modele, Order, OrderStatus, Workstation } from '../types';
import ClientDetail from './ClientDetail';

const getStatusColorClasses = (status: OrderStatus) => {
  switch (status) {
    case 'En attente de validation': return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600';
    case 'En cours de couture': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300 border-yellow-300 dark:border-yellow-700';
    case 'En finition': return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-300 border-cyan-300 dark:border-cyan-700';
    case 'Prêt à livrer': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-300 dark:border-blue-700';
    case 'Livré': return 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300 border-green-300 dark:border-green-700';
    default: return 'bg-stone-100 text-stone-800 dark:bg-stone-700 dark:text-stone-300 border-stone-300 dark:border-stone-600';
  }
};

const statusOptions: OrderStatus[] = ['En attente de validation', 'En cours de couture', 'En finition', 'Prêt à livrer', 'Livré'];

interface GestionCommandeProps {
    clients: Client[];
    models: Modele[];
    orders: Order[];
    workstations: Workstation[];
    onUpdateClient: (client: Client) => void;
    onAddOrder: (orderData: Omit<Order, 'id' | 'ticketId'>) => void;
    onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
    onAssignOrder: (orderId: string, workstationId: string) => void;
}

const GestionCommande: React.FC<GestionCommandeProps> = ({ clients, models, orders, workstations, onUpdateClient, onAddOrder, onUpdateOrderStatus, onAssignOrder }) => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<OrderStatus | 'Tous'>('Tous');
  const [workstationFilter, setWorkstationFilter] = useState('Tous');

  const sortedOrders = useMemo(() => orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()), [orders]);

  const filteredOrders = useMemo(() => {
    return sortedOrders.filter(order => {
      const client = clients.find(c => c.id === order.clientId);
      const model = models.find(m => m.id === order.modelId);

      if (statusFilter !== 'Tous' && order.status !== statusFilter) return false;

      if (workstationFilter !== 'Tous') {
        if (workstationFilter === 'unassigned' && order.workstationId) return false;
        if (workstationFilter !== 'unassigned' && order.workstationId !== workstationFilter) return false;
      }
      
      const searchLower = searchQuery.toLowerCase();
      if (searchQuery &&
        !client?.name.toLowerCase().includes(searchLower) &&
        !model?.title.toLowerCase().includes(searchLower) &&
        !order.ticketId.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
      
      return true;
    });
  }, [sortedOrders, clients, models, searchQuery, statusFilter, workstationFilter]);

  const handleClientClick = (clientId: string) => {
    const client = clients.find(c => c.id === clientId);
    if (client) setSelectedClient(client);
  };

  return (
    <>
      <div className="space-y-6 h-full flex flex-col">
        <div>
          <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-100">Gestion des Commandes</h1>
          <p className="text-stone-500 dark:text-stone-400 mt-1">Suivez, filtrez et gérez toutes les commandes en un seul endroit.</p>
        </div>

        {/* Filter Bar */}
        <div className="bg-white dark:bg-stone-800/50 p-4 rounded-lg shadow-sm flex flex-col sm:flex-row gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-stone-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" /></svg>
            </div>
            <input
              type="text"
              placeholder="Rechercher ticket, client, modèle..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-stone-300 dark:border-stone-700 rounded-md bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          <div className="flex-shrink-0 flex gap-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="block w-full sm:w-auto px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-md bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-orange-500"
            >
              <option value="Tous">Tous les statuts</option>
              {statusOptions.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select
              value={workstationFilter}
              onChange={(e) => setWorkstationFilter(e.target.value)}
              className="block w-full sm:w-auto px-3 py-2 border border-stone-300 dark:border-stone-700 rounded-md bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-1 focus:ring-orange-500"
            >
              <option value="Tous">Tous les postes</option>
              <option value="unassigned">Non assignées</option>
              {workstations.map(ws => <option key={ws.id} value={ws.id}>{ws.name}</option>)}
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div className="flex-1 overflow-y-auto pr-2 -mr-2">
            <div className="space-y-4">
            {filteredOrders.map(order => {
                const client = clients.find(c => c.id === order.clientId);
                const model = models.find(m => m.id === order.modelId);
                const workstation = workstations.find(w => w.id === order.workstationId);

                return (
                    <div key={order.id} className="bg-white dark:bg-stone-800 p-4 rounded-lg shadow-md flex flex-col lg:flex-row lg:items-center gap-4">
                        <div className="flex items-center gap-4 flex-1">
                            <img src={model?.imageUrls?.[0]} alt={model?.title} className="w-14 h-20 object-cover rounded-md flex-shrink-0" />
                            <div className="min-w-0">
                                <p className="font-bold text-stone-800 dark:text-stone-100 truncate">{model?.title}</p>
                                <p className="text-sm text-stone-500 dark:text-stone-400">Pour: <span className="font-semibold">{client?.name}</span></p>
                                <p className="text-xs font-mono text-orange-800 dark:text-orange-400 mt-1">{order.ticketId}</p>
                            </div>
                        </div>

                        <div className="w-full lg:w-auto flex flex-col sm:flex-row sm:items-center gap-4 pt-4 lg:pt-0 border-t lg:border-t-0 border-stone-100 dark:border-stone-700">
                            <p className="text-sm text-stone-500 dark:text-stone-400 w-full sm:w-28 flex-shrink-0">
                                {new Date(order.date).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })}
                            </p>
                            <div className="relative w-full sm:w-48 flex-shrink-0">
                                <select
                                    value={order.status}
                                    onChange={(e) => onUpdateOrderStatus(order.id, e.target.value as OrderStatus)}
                                    className={`w-full appearance-none text-xs font-semibold leading-none rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-stone-800 focus:ring-orange-500 transition-colors cursor-pointer ${getStatusColorClasses(order.status)}`}
                                >
                                    {statusOptions.map(option => <option key={option} value={option}>{option}</option>)}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-current"><svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg></div>
                            </div>
                            <div className="relative w-full sm:w-48 flex-shrink-0">
                                <select
                                    value={order.workstationId || 'unassigned'}
                                    onChange={(e) => onAssignOrder(order.id, e.target.value)}
                                    className={`w-full appearance-none text-xs font-semibold leading-none rounded-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-stone-800 focus:ring-orange-500 transition-colors cursor-pointer ${workstation ? 'bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200' : 'bg-red-100 dark:bg-red-900/50 text-red-800 dark:text-red-300'}`}
                                >
                                    <option value="unassigned">Assigner un poste</option>
                                    {workstations.map(ws => <option key={ws.id} value={ws.id}>{ws.name}</option>)}
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-current"><svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg></div>
                            </div>
                             <button
                                onClick={() => handleClientClick(order.clientId)}
                                className="px-3 py-1.5 text-xs font-medium text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-700 rounded-md hover:bg-stone-200 dark:hover:bg-stone-600 flex-shrink-0"
                            >
                                Voir Détails
                            </button>
                        </div>
                    </div>
                );
            })}
             {filteredOrders.length === 0 && (
                <div className="text-center py-12 bg-white dark:bg-stone-800 rounded-lg shadow-md">
                    <svg className="mx-auto h-12 w-12 text-stone-400 dark:text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <h3 className="mt-2 text-sm font-medium text-stone-900 dark:text-stone-100">Aucune commande trouvée</h3>
                    <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">Essayez d'ajuster vos filtres de recherche.</p>
                </div>
            )}
            </div>
        </div>
      </div>

      {selectedClient && (
        <ClientDetail
            client={selectedClient}
            orders={orders.filter(o => o.clientId === selectedClient.id)}
            models={models}
            onClose={() => setSelectedClient(null)}
            onUpdateClient={onUpdateClient}
            onAddOrder={onAddOrder}
            onUpdateOrderStatus={onUpdateOrderStatus}
        />
      )}
    </>
  );
};

export default GestionCommande;
