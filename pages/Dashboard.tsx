import React from 'react';
import type { Client, Modele, Appointment, Order, OrderStatus } from '../types';
import { ClientsIcon, CatalogueIcon, AgendaIcon } from '../components/icons';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white dark:bg-stone-800 p-6 rounded-lg shadow-md flex items-center">
        <div className="p-3 bg-orange-100 dark:bg-orange-900/50 rounded-full">
            {icon}
        </div>
        <div className="ml-4">
            <p className="text-sm font-medium text-stone-500 dark:text-stone-400">{title}</p>
            <p className="text-2xl font-bold text-stone-800 dark:text-stone-100">{value}</p>
        </div>
    </div>
);

// FIX: Updated OrderStatusBadge to use correct status strings from the OrderStatus type and a consistent color scheme.
const OrderStatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
    const statusColors: { [key in OrderStatus]: string } = {
        'En attente de validation': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
        'En cours de couture': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
        'En finition': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-300',
        'Prêt à livrer': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
        'Livré': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    };
    return (
        <span className={`px-2 py-1 text-xs font-semibold leading-none rounded-full ${statusColors[status]}`}>
            {status}
        </span>
    );
};

interface DashboardProps {
    clients: Client[];
    models: Modele[];
    appointments: Appointment[];
    orders: Order[];
}

const Dashboard: React.FC<DashboardProps> = ({ clients, models, appointments, orders }) => {
  const recentClient = clients[0];
  const latestModel = models[0];
  // FIX: Corrected filter logic for active orders to use valid OrderStatus values.
  // "Active orders" are now considered any order that is not 'Livré'.
  const activeOrders = orders.filter(o => o.status !== 'Livré');
  
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-100">Tableau de bord</h1>
        <p className="text-stone-500 dark:text-stone-400 mt-1">Bienvenue dans votre espace de travail, Atelier Adélaris.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard title="Clients Actifs" value={clients.length} icon={<ClientsIcon className="h-6 w-6 text-orange-900 dark:text-orange-400" />} />
        <StatCard title="Modèles au Catalogue" value={models.length} icon={<CatalogueIcon className="h-6 w-6 text-orange-900 dark:text-orange-400" />} />
        <StatCard title="Commandes en cours" value={activeOrders.length} icon={<AgendaIcon className="h-6 w-6 text-orange-900 dark:text-orange-400"/>} />
      </div>

      <div className="bg-white dark:bg-stone-800 p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-stone-800 dark:text-stone-100 mb-4">Suivi des Commandes Actives</h2>
          {activeOrders.length > 0 ? (
              <div className="space-y-4">
                  {activeOrders.map(order => {
                      const client = clients.find(c => c.id === order.clientId);
                      const model = models.find(m => m.id === order.modelId);
                      if (!client || !model) return null;
                      return (
                          <div key={order.id} className="bg-stone-50 dark:bg-stone-800/50 p-3 rounded-lg flex items-center justify-between gap-4 flex-wrap">
                              <div className="flex items-center gap-4">
                                <img src={model.imageUrls?.[0]} alt={model.title} className="w-12 h-16 rounded-md object-cover hidden sm:block"/>
                                <div>
                                    <p className="font-bold text-stone-700 dark:text-stone-200">{model.title}</p>
                                    <p className="text-sm text-stone-500 dark:text-stone-400">Pour: {client.name}</p>
                                </div>
                              </div>
                              <OrderStatusBadge status={order.status} />
                          </div>
                      );
                  })}
              </div>
          ) : (
              <p className="text-sm text-center text-stone-500 dark:text-stone-400 py-4">Aucune commande active pour le moment.</p>
          )}
      </div>
    </div>
  );
};

export default Dashboard;