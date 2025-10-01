export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string;
  avatarUrl: string;
  measurements: {
    height: number;
    chest: number;
    waist: number;
    hips: number;
    inseam: number;
  };
  lastSeen: string;
}

export interface Modele {
  id: string;
  title: string;
  genre: 'Homme' | 'Femme' | 'Enfant';
  event: 'Cérémonie' | 'Quotidien' | 'Soirée';
  fabric: string;
  difficulty: 'Débutant' | 'Intermédiaire' | 'Avancé';
  imageUrls: string[];
  description: string;
  patron_pdf_link?: string;
}

export interface Tutoriel {
  id: string;
  title:string;
  category: 'Prise de mesures' | 'Découpe' | 'Techniques de couture';
  duration: string;
  imageUrl: string;
}

export type AppointmentType = 'Essayage' | 'Livraison' | 'Rendez-vous' | 'Autre';

export interface Appointment {
  id: string;
  clientId: string;
  clientName: string;
  clientAvatarUrl: string;
  date: string; // ISO string format
  time: string; // "HH:mm" format
  type: AppointmentType;
  notes?: string;
}

export type OrderStatus = 
  'En attente de validation' | 
  'En cours de couture' | 
  'En finition' | 
  'Prêt à livrer' | 
  'Livré';

export interface Order {
  id: string;
  clientId: string;
  modelId: string;
  date: string; // ISO String
  status: OrderStatus;
  ticketId: string;
  price?: number;
  notes?: string;
  workstationId?: string;
}


export type Page = 'accueil' | 'commandes' | 'catalogue' | 'tutoriels' | 'agenda' | 'modeleDuMois' | 'gestion' | 'favoris' | 'login' | 'gestionPostes';

export type UserMode = 'client' | 'manager' | 'workstation';


export interface Workstation {
    id: string;
    name: string;
    accessCode: string;
}

export interface Notification {
    id: string;
    message: string;
    date: string; // ISO String
    read: boolean;
    orderId?: string;
}