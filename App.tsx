
import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Accueil from './pages/Accueil';
import GestionCommande from './pages/GestionCommande';
import Catalogue from './pages/Catalogue';
import Tutoriels from './pages/Tutoriels';
import Agenda from './pages/Agenda';
import ModeleDuMois from './pages/ModeleDuMois';
import Gestion from './pages/Gestion';
import GestionPostes from './pages/GestionPostes';
import Favoris from './pages/Favoris';
import ClientOrderForm from './pages/ClientOrderForm';
import AccessCodeModal from './pages/AccessCodeModal';
import WorkstationAccessModal from './pages/WorkstationAccessModal';
import WorkstationDashboard from './pages/WorkstationDashboard';
import OrderConfirmationAnimation from './components/OrderConfirmationAnimation';
import type { Page, Client, Modele, Appointment, Order, OrderStatus, UserMode, Workstation, Notification } from './types';
import { MOCK_CLIENTS, MOCK_MODELES, MOCK_APPOINTMENTS, MOCK_ORDERS, MOCK_WORKSTATIONS } from './constants';
import { HamburgerIcon } from './components/icons';

const MANAGER_ACCESS_CODE = 'ADL2024';

const App: React.FC = () => {
  // Core Data State
  const [clients, setClients] = useState<Client[]>(MOCK_CLIENTS);
  const [models, setModels] = useState<Modele[]>(MOCK_MODELES);
  const [appointments, setAppointments] = useState<Appointment[]>(MOCK_APPOINTMENTS);
  const [orders, setOrders] = useState<Order[]>(MOCK_ORDERS);
  const [workstations, setWorkstations] = useState<Workstation[]>(MOCK_WORKSTATIONS);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  
  // UI & Session State
  const [currentPage, setCurrentPage] = useState<Page>('accueil');
  const [modelOfTheMonthId, setModelOfTheMonthId] = useState<string | null>('m2');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userMode, setUserMode] = useState<UserMode>('client');
  const [favoriteIds, setFavoriteIds] = useState<string[]>(['m2', 'm4']);
  
  // Modals & Animation State
  const [orderingModel, setOrderingModel] = useState<Modele | null>(null);
  const [showManagerAccessModal, setShowManagerAccessModal] = useState(false);
  const [showWorkstationAccessModal, setShowWorkstationAccessModal] = useState(false);
  const [showOrderAnimation, setShowOrderAnimation] = useState(false);

  // Authentication State
  const [isManagerAuthenticated, setIsManagerAuthenticated] = useState(false);
  const [authenticatedWorkstation, setAuthenticatedWorkstation] = useState<Workstation | null>(null);

  // Theme effect
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  // --- Authentication & Mode Switching ---

  const handleManagerLogin = (code: string) => {
    if (code === MANAGER_ACCESS_CODE) {
      setIsManagerAuthenticated(true);
      setUserMode('manager');
      setCurrentPage('commandes');
      setShowManagerAccessModal(false);
      return true;
    }
    return false;
  };

  const handleWorkstationLogin = (code: string) => {
    const workstation = workstations.find(ws => ws.accessCode === code);
    if (workstation) {
        setAuthenticatedWorkstation(workstation);
        setUserMode('workstation');
        setCurrentPage('accueil');
        setShowWorkstationAccessModal(false);
        return true;
    }
    return false;
  };
  
  const handleLogout = () => {
      setIsManagerAuthenticated(false);
      setAuthenticatedWorkstation(null);
      setUserMode('client');
      setCurrentPage('accueil');
  };

  const handleToggleMode = (mode: 'manager' | 'workstation') => {
    if (mode === 'manager') {
        if (isManagerAuthenticated) { // If manager is logged in, toggle between manager and client view
            setUserMode(prev => (prev === 'manager' ? 'client' : 'manager'));
        } else { // If not logged in, show login modal
            setShowManagerAccessModal(true);
        }
    } else if (mode === 'workstation') {
        setShowWorkstationAccessModal(true);
    }
  };
  
  // Auto-navigate to safe pages on user mode change
  useEffect(() => {
    const clientPages: Page[] = ['accueil', 'catalogue', 'modeleDuMois', 'favoris'];
    const managerPages: Page[] = [...clientPages, 'commandes', 'gestion', 'gestionPostes', 'agenda', 'tutoriels'];
    
    if (userMode === 'client' && !clientPages.includes(currentPage)) {
        setCurrentPage('accueil');
    } else if (userMode === 'manager' && !managerPages.includes(currentPage)) {
        setCurrentPage('commandes');
    } else if (userMode === 'workstation') {
        setCurrentPage('accueil');
    }
  }, [userMode, currentPage]);


  // --- Data Management Handlers ---

  const handleToggleFavorite = (modelId: string) => {
    setFavoriteIds(prev =>
      prev.includes(modelId)
        ? prev.filter(id => id !== modelId)
        : [...prev, modelId]
    );
  };

  const handleSetModelOfTheMonth = (modelId: string) => {
    setModelOfTheMonthId(prevId => (prevId === modelId ? null : modelId));
  };
  
  const handleAddClient = (client: Client) => setClients(prev => [client, ...prev]);
  const handleUpdateClient = (updatedClient: Client) => setClients(prev => prev.map(c => c.id === updatedClient.id ? updatedClient : c));
  const handleAddModel = (model: Modele) => setModels(prev => [model, ...prev]);
  const handleUpdateModel = (updatedModel: Modele) => setModels(prev => prev.map(m => m.id === updatedModel.id ? updatedModel : m));
  const handleDeleteModel = (modelId: string) => setModels(prev => prev.filter(m => m.id !== modelId));
  const handleAddAppointment = (appointment: Appointment) => setAppointments(prev => [...prev, appointment].sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime()));
  const handleDeleteAppointment = (id: string) => setAppointments(prev => prev.filter(app => app.id !== id));

  const handleAddOrder = (orderData: Omit<Order, 'id' | 'ticketId'>): Order => {
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      ticketId: `CMD-${Date.now().toString().slice(-6)}`,
      ...orderData
    };
    setOrders(prev => [newOrder, ...prev].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
    return newOrder;
  };
  
  const handleAddNotification = (message: string, orderId?: string) => {
      const newNotification: Notification = {
          id: `notif-${Date.now()}`,
          message,
          orderId,
          date: new Date().toISOString(),
          read: false,
      };
      setNotifications(prev => [newNotification, ...prev]);
  };
  
  const handleUpdateOrderStatus = (orderId: string, status: OrderStatus) => {
    let orderToUpdate: Order | undefined;
    setOrders(prevOrders =>
      prevOrders.map(order => {
        if (order.id === orderId) {
            orderToUpdate = order;
            return { ...order, status };
        }
        return order;
      })
    );

    if (orderToUpdate && (status === 'Prêt à livrer' || status === 'En finition')) {
        const model = models.find(m => m.id === orderToUpdate!.modelId);
        handleAddNotification(`La commande ${orderToUpdate.ticketId} (${model?.title}) est passée au statut "${status}".`, orderId);
    }
  };

  const handlePlaceOrder = (modelId: string, clientData: { name: string; phone: string; email?: string }) => {
    setOrderingModel(null);
    setShowOrderAnimation(true);
    
    setTimeout(() => {
        const newClient: Client = {
          id: `client-${Date.now()}`,
          ...clientData,
          avatarUrl: 'https://images.unsplash.com/photo-1544723795-3fb6469f5b39?q=80&w=200&h=200&fit=crop',
          measurements: { height: 0, chest: 0, waist: 0, hips: 0, inseam: 0 },
          lastSeen: 'Aujourd\'hui'
        };
        handleAddClient(newClient);
      
        const newOrderData = {
          clientId: newClient.id,
          modelId: modelId,
          date: new Date().toISOString(),
          status: 'En attente de validation' as OrderStatus,
          price: undefined,
        };
        const newOrder = handleAddOrder(newOrderData);
        
        setShowOrderAnimation(false);
        alert(`Merci ${newClient.name} ! Votre commande a été enregistrée sous le numéro de ticket ${newOrder.ticketId}. Nous vous contacterons bientôt.`);
        handleAddNotification(`Nouvelle commande client: ${newOrder.ticketId} pour le modèle "${models.find(m => m.id === modelId)?.title}".`);
    }, 3500);
  };
  
  const handleAddWorkstation = (name: string) => {
      const newWorkstation: Workstation = {
          id: `ws-${Date.now()}`,
          name,
          accessCode: `POSTE-${Math.random().toString(16).substr(2, 4).toUpperCase()}`
      };
      setWorkstations(prev => [...prev, newWorkstation]);
  };
  
  const handleAssignOrder = (orderId: string, workstationId: string) => {
      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, workstationId } : o));
      const order = orders.find(o => o.id === orderId);
      const ws = workstations.find(w => w.id === workstationId);
      if(order && ws) {
          handleAddNotification(`Commande ${order.ticketId} assignée à ${ws.name}.`);
      }
  };
  
  const handleMarkNotificationsRead = (ids: string[]) => {
      setNotifications(prev => prev.map(n => ids.includes(n.id) ? {...n, read: true} : n));
  };

  // --- Content Rendering ---

  const renderContent = () => {
    if (userMode === 'workstation' && authenticatedWorkstation) {
        return <WorkstationDashboard workstation={authenticatedWorkstation} orders={orders} clients={clients} models={models} onUpdateOrderStatus={handleUpdateOrderStatus} />;
    }

    switch (currentPage) {
      case 'accueil':
        return <Accueil models={models} orders={orders} clients={clients} setCurrentPage={setCurrentPage} userMode={userMode as 'client' | 'manager'} />;
      case 'commandes':
        return <GestionCommande clients={clients} models={models} orders={orders} workstations={workstations} onUpdateClient={handleUpdateClient} onAddOrder={handleAddOrder} onUpdateOrderStatus={handleUpdateOrderStatus} onAssignOrder={handleAssignOrder} />;
      case 'catalogue':
        // FIX: The userMode prop expects 'client' | 'manager'. The type assertion ensures this.
        return <Catalogue models={models} modelOfTheMonthId={modelOfTheMonthId} onSetModelOfTheMonth={handleSetModelOfTheMonth} favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite} userMode={userMode as 'client' | 'manager'} onStartOrder={setOrderingModel} />;
      case 'gestion':
        return <Gestion models={models} onAddModel={handleAddModel} onUpdateModel={handleUpdateModel} onDeleteModel={handleDeleteModel} />;
       case 'gestionPostes':
        return <GestionPostes workstations={workstations} onAddWorkstation={handleAddWorkstation} />;
      case 'tutoriels':
        return <Tutoriels />;
      case 'agenda':
        return <Agenda appointments={appointments} clients={clients} onAddAppointment={handleAddAppointment} onDeleteAppointment={handleDeleteAppointment} />;
      case 'modeleDuMois':
        // FIX: The userMode prop expects 'client' | 'manager'. The type assertion ensures this.
        return <ModeleDuMois models={models} modelOfTheMonthId={modelOfTheMonthId} onSetModelOfTheMonth={handleSetModelOfTheMonth} favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite} userMode={userMode as 'client' | 'manager'} onStartOrder={setOrderingModel} />;
      case 'favoris':
        // FIX: The userMode prop expects 'client' | 'manager'. The type assertion ensures this.
        return <Favoris models={models} favoriteIds={favoriteIds} onToggleFavorite={handleToggleFavorite} userMode={userMode as 'client' | 'manager'} onStartOrder={setOrderingModel} />;
      default:
        return <Accueil models={models} orders={orders} clients={clients} setCurrentPage={setCurrentPage} userMode={userMode as 'client' | 'manager'} />;
    }
  };

  return (
    <div className="flex h-screen text-stone-800 dark:text-stone-200 bg-stone-50 dark:bg-stone-900">
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        theme={theme} 
        toggleTheme={toggleTheme} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        userMode={userMode}
        isManagerAuthenticated={isManagerAuthenticated}
        onToggleMode={handleToggleMode}
        onLogout={handleLogout}
        notifications={notifications}
        onMarkNotificationsRead={handleMarkNotificationsRead}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
         <header className="lg:hidden h-16 bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between px-4 sm:px-6 flex-shrink-0">
            <h1 className="text-lg font-bold text-orange-900 dark:text-orange-400">MMV COUTURE</h1>
            <button onClick={() => setIsSidebarOpen(true)} className="p-2 -mr-2 text-stone-600 dark:text-stone-300 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800">
                <HamburgerIcon className="w-6 h-6" />
            </button>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>

      {orderingModel && userMode === 'client' && (
        <ClientOrderForm
          model={orderingModel}
          onClose={() => setOrderingModel(null)}
          onPlaceOrder={(clientData) => handlePlaceOrder(orderingModel.id, clientData)}
        />
      )}
      {showManagerAccessModal && <AccessCodeModal onClose={() => setShowManagerAccessModal(false)} onLoginAttempt={handleManagerLogin} />}
      {showWorkstationAccessModal && <WorkstationAccessModal onClose={() => setShowWorkstationAccessModal(false)} onLoginAttempt={handleWorkstationLogin} />}
      <OrderConfirmationAnimation isOpen={showOrderAnimation} />
    </div>
  );
};

export default App;
