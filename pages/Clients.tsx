import React, { useState, useMemo } from 'react';
import type { Client, Modele, Order, OrderStatus } from '../types';
import ClientDetail from './ClientDetail';
import AddOrderForm from './AddOrderForm';

interface ClientCardProps {
    client: Client;
    onClick: () => void;
}

const ClientCard: React.FC<ClientCardProps> = ({ client, onClick }) => (
  <div onClick={onClick} className="bg-white dark:bg-stone-800 rounded-lg shadow-md p-5 flex items-center space-x-4 transition-all hover:shadow-lg hover:scale-[1.02] cursor-pointer">
    <img className="w-16 h-16 rounded-full object-cover" src={client.avatarUrl} alt={client.name} />
    <div className="flex-1">
      <p className="font-bold text-lg text-stone-800 dark:text-stone-100">{client.name}</p>
      <p className="text-sm text-stone-500 dark:text-stone-400">{client.phone}</p>
      {client.email && <p className="text-sm text-stone-500 dark:text-stone-400">{client.email}</p>}
    </div>
    <div className="text-right">
        <p className="text-xs text-stone-400 dark:text-stone-500">Dernier contact</p>
        <p className="text-sm font-semibold text-orange-800 dark:text-orange-400">{client.lastSeen}</p>
    </div>
  </div>
);

const AddClientForm: React.FC<{ onAddClient: (client: Client) => void; onCancel: () => void; }> = ({ onAddClient, onCancel }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newClient: Client = {
            id: new Date().toISOString(),
            name,
            phone,
            email,
            avatarUrl: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=200&h=200&fit=crop',
            measurements: { height: 0, chest: 0, waist: 0, hips: 0, inseam: 0 },
            lastSeen: 'Aujourd\'hui'
        };
        onAddClient(newClient);
    };

    return (
        <div className="bg-white dark:bg-stone-800 p-8 rounded-lg shadow-xl max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 mb-6">Ajouter un nouveau client</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-stone-700 dark:text-stone-300">Nom complet</label>
                    <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" required/>
                </div>
                 <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-stone-700 dark:text-stone-300">Téléphone</label>
                    <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500" required/>
                </div>
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-stone-700 dark:text-stone-300">Email (facultatif)</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1 block w-full px-3 py-2 bg-white dark:bg-stone-700 border border-stone-300 dark:border-stone-600 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"/>
                </div>
                <div className="flex justify-end space-x-4 pt-4">
                    <button type="button" onClick={onCancel} className="px-4 py-2 text-sm font-medium text-stone-700 dark:text-stone-200 bg-stone-100 dark:bg-stone-700 rounded-md hover:bg-stone-200 dark:hover:bg-stone-600">Annuler</button>
                    <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-orange-900 rounded-md hover:bg-orange-800">Enregistrer Client</button>
                </div>
            </form>
        </div>
    )
}

interface ClientsProps {
    clients: Client[];
    models: Modele[];
    orders: Order[];
    onAddClient: (client: Client) => void;
    onUpdateClient: (client: Client) => void;
    onAddOrder: (orderData: Omit<Order, 'id' | 'ticketId'>) => void;
    onUpdateOrderStatus: (orderId: string, status: OrderStatus) => void;
}

const Clients: React.FC<ClientsProps> = ({ clients, models, orders, onAddClient, onUpdateClient, onAddOrder, onUpdateOrderStatus }) => {
  const [showForm, setShowForm] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddClient = (client: Client) => {
    onAddClient(client);
    setShowForm(false);
  }
  
  const filteredClients = useMemo(() => {
    return clients.filter(client =>
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.replace(/\s/g, '').includes(searchQuery.replace(/\s/g, ''))
    );
  }, [clients, searchQuery]);

  if (showForm) {
      return <AddClientForm onAddClient={handleAddClient} onCancel={() => setShowForm(false)} />
  }

  return (
    <>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-stone-800 dark:text-stone-100">Registre Clients</h1>
            <p className="text-stone-500 dark:text-stone-400 mt-1">Gérez et consultez les informations de vos clients.</p>
          </div>
          <button onClick={() => setShowForm(true)} className="px-5 py-2.5 text-sm font-medium text-white bg-orange-900 rounded-lg hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 transition-transform hover:scale-105">
            Ajouter un client
          </button>
        </div>
        
        <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-stone-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
            </div>
            <input
                type="text"
                placeholder="Rechercher par nom ou téléphone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-stone-300 dark:border-stone-600 rounded-md leading-5 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-400 focus:outline-none focus:placeholder-stone-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
        </div>


        <div className="space-y-4">
          {filteredClients.map(client => (
            <ClientCard key={client.id} client={client} onClick={() => setSelectedClient(client)} />
          ))}
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

export default Clients;