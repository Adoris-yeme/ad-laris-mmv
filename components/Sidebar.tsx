import React from 'react';
import type { Page, UserMode, Notification } from '../types';
import NotificationBell from './NotificationBell';
import { 
    HomeIcon,
    ClientsIcon, 
    CatalogueIcon, 
    TutorielsIcon, 
    AgendaIcon, 
    StarIcon,
    GestionIcon,
    SunIcon,
    MoonIcon,
    FavorisIcon,
    SwitchUserIcon,
    LockIcon,
    WorkstationIcon,
} from './icons';


interface SidebarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  userMode: UserMode;
  isManagerAuthenticated: boolean;
  onToggleMode: (mode: 'manager' | 'workstation') => void;
  onLogout: () => void;
  notifications: Notification[];
  onMarkNotificationsRead: (ids: string[]) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ icon, label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-lg ${
      isActive
        ? 'bg-orange-900 text-white'
        : 'text-stone-600 dark:text-stone-300 hover:bg-orange-100 hover:text-orange-900 dark:hover:bg-stone-800 dark:hover:text-white'
    }`}
  >
    {icon}
    <span className="ml-3">{label}</span>
  </button>
);

const SidebarContent: React.FC<Omit<SidebarProps, 'isOpen' | 'setIsOpen'>> = ({ currentPage, setCurrentPage, theme, toggleTheme, userMode, isManagerAuthenticated, onToggleMode, onLogout, notifications, onMarkNotificationsRead }) => {
    
    const managerNavItems = [
        { id: 'accueil', label: 'Accueil', icon: <HomeIcon className="w-5 h-5" /> },
        { id: 'commandes', label: 'Gestion Commande', icon: <ClientsIcon className="w-5 h-5" /> },
        { id: 'catalogue', label: 'Catalogue Modèles', icon: <CatalogueIcon className="w-5 h-5" /> },
        { id: 'gestion', label: 'Gestion Catalogue', icon: <GestionIcon className="w-5 h-5" /> },
        { id: 'gestionPostes', label: 'Gestion des Postes', icon: <WorkstationIcon className="w-5 h-5" /> },
        { id: 'modeleDuMois', label: 'Modèle du Mois', icon: <StarIcon className="w-5 h-5" /> },
        { id: 'tutoriels', label: 'Tutoriels', icon: <TutorielsIcon className="w-5 h-5" /> },
        { id: 'agenda', label: 'Agenda', icon: <AgendaIcon className="w-5 h-5" /> },
    ];

    const clientNavItems = [
        { id: 'accueil', label: 'Accueil', icon: <HomeIcon className="w-5 h-5" /> },
        { id: 'catalogue', label: 'Catalogue Modèles', icon: <CatalogueIcon className="w-5 h-5" /> },
        { id: 'modeleDuMois', label: 'Modèle du Mois', icon: <StarIcon className="w-5 h-5" /> },
        { id: 'favoris', label: 'Mes Favoris', icon: <FavorisIcon className="w-5 h-5" /> },
    ];
    
    const workstationNavItems = [
         { id: 'accueil', label: 'Tableau de bord', icon: <HomeIcon className="w-5 h-5" /> },
    ];
    
    const getNavItems = () => {
        switch(userMode) {
            case 'manager': return managerNavItems;
            case 'workstation': return workstationNavItems;
            case 'client':
            default: return clientNavItems;
        }
    }
    
    return (
        <>
            <div className="flex items-center justify-center h-16 lg:h-20 border-b border-stone-200 dark:border-stone-800 flex-shrink-0">
                <h1 className="text-xl font-bold text-orange-900 dark:text-orange-400 tracking-wider">MMV COUTURE</h1>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                {getNavItems().map((item) => (
                <NavItem
                    key={item.id}
                    icon={item.icon}
                    label={item.label}
                    isActive={currentPage === item.id}
                    onClick={() => setCurrentPage(item.id as Page)}
                />
                ))}
            </nav>
            <div className="px-4 py-4 border-t border-stone-200 dark:border-stone-800">
                <div className="mb-4 space-y-2">
                   {isManagerAuthenticated ? (
                       <button onClick={() => userMode === 'manager' ? onToggleMode('manager') : onLogout()} className="flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-orange-100 hover:text-orange-900 dark:hover:bg-stone-800 dark:hover:text-white">
                            <SwitchUserIcon className="w-5 h-5" />
                            <span className="ml-3">{userMode === 'manager' ? 'Vue Client' : 'Se déconnecter'}</span>
                       </button>
                   ) : userMode === 'workstation' ? (
                        <button onClick={onLogout} className="flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-orange-100 hover:text-orange-900 dark:hover:bg-stone-800 dark:hover:text-white">
                             <SwitchUserIcon className="w-5 h-5" />
                             <span className="ml-3">Changer de poste</span>
                        </button>
                   ) : (
                       <>
                           <button onClick={() => onToggleMode('manager')} className="flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-orange-100 hover:text-orange-900 dark:hover:bg-stone-800 dark:hover:text-white">
                               <LockIcon className="w-5 h-5" />
                               <span className="ml-3">Accès Manager</span>
                           </button>
                           <button onClick={() => onToggleMode('workstation')} className="flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-200 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-orange-100 hover:text-orange-900 dark:hover:bg-stone-800 dark:hover:text-white">
                               <WorkstationIcon className="w-5 h-5" />
                               <span className="ml-3">Accès Poste de travail</span>
                           </button>
                       </>
                   )}
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <img className="h-10 w-10 rounded-full object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&h=200&fit=crop" alt="User" />
                        <div className="ml-3">
                            <p className="text-sm font-medium text-stone-700 dark:text-stone-200">
                                {userMode === 'manager' ? 'Atelier Adélaris' : userMode === 'workstation' ? 'Poste de Travail' : 'Espace Client'}
                            </p>
                            <p className="text-xs text-stone-500 dark:text-stone-400">
                                {userMode === 'manager' ? 'Profil Manager' : userMode === 'workstation' ? 'Mode Production' : 'Bienvenue'}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {userMode === 'manager' && <NotificationBell notifications={notifications} onMarkAsRead={onMarkNotificationsRead} />}
                        <button 
                        onClick={toggleTheme} 
                        className="p-2 rounded-full text-stone-500 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                        aria-label="Toggle theme"
                        >
                            {theme === 'light' ? <MoonIcon className="w-5 h-5" /> : <SunIcon className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

const Sidebar: React.FC<Omit<SidebarProps, 'notifications' | 'onMarkNotificationsRead' | 'userMode' | 'isManagerAuthenticated' | 'onToggleMode' | 'onLogout'> & Partial<SidebarProps>> = (props) => {
  const fullProps = {
      notifications: [],
      onMarkNotificationsRead: () => {},
      userMode: 'client' as UserMode,
      isManagerAuthenticated: false,
      onToggleMode: () => {},
      onLogout: () => {},
      ...props
  }
  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col w-64 bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-800 shadow-sm flex-shrink-0">
        <SidebarContent {...fullProps} />
      </div>

      {/* Mobile Sidebar */}
      <div 
        className={`fixed inset-0 z-40 transition-opacity duration-300 lg:hidden ${props.isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        aria-hidden={!props.isOpen}
      >
        <div className="absolute inset-0 bg-black/50" onClick={() => props.setIsOpen(false)}></div>
        
        <div 
          className={`relative flex flex-col w-64 h-full bg-white dark:bg-stone-900 shadow-xl transition-transform duration-300 ease-in-out ${props.isOpen ? 'translate-x-0' : '-translate-x-full'}`}
          onClick={(e) => {
            // Close sidebar when a nav item is clicked
            if ((e.target as HTMLElement).closest('button')) {
              props.setIsOpen(false);
            }
          }}
        >
          <SidebarContent {...fullProps} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;