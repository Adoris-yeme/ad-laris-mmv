import type { Client, Modele, Tutoriel, Appointment, Order, Workstation } from './types';

export const MOCK_CLIENTS: Client[] = [
  {
    id: '1',
    name: 'Amina Diallo',
    phone: '+221 77 123 45 67',
    email: 'amina.d@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=200&h=200&fit=crop&ixlib=rb-4.0.3',
    measurements: { height: 168, chest: 92, waist: 75, hips: 100, inseam: 80 },
    lastSeen: '2 semaines'
  },
  {
    id: '2',
    name: 'Moussa Traoré',
    phone: '+223 70 98 76 54',
    email: 'm.traore@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop&ixlib=rb-4.0.3',
    measurements: { height: 182, chest: 105, waist: 88, hips: 102, inseam: 85 },
    lastSeen: '1 mois'
  },
  {
    id: '3',
    name: 'Fatou Ndiaye',
    phone: '+221 78 876 54 32',
    email: 'fatou.ndiaye@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1500336624523-d727130c3328?q=80&w=200&h=200&fit=crop&ixlib=rb-4.0.3',
    measurements: { height: 172, chest: 98, waist: 80, hips: 108, inseam: 82 },
    lastSeen: '3 jours'
  },
    {
    id: '4',
    name: 'Oumar Camara',
    phone: '+224 62 111 22 33',
    email: 'oumar.c@example.com',
    avatarUrl: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?q=80&w=200&h=200&fit=crop&ixlib=rb-4.0.3',
    measurements: { height: 179, chest: 102, waist: 85, hips: 99, inseam: 84 },
    lastSeen: '5 jours'
  }
];

export const MOCK_MODELES: Modele[] = [
  {
    id: 'm1',
    title: 'Grand Boubou "Prestige"',
    genre: 'Homme',
    event: 'Cérémonie',
    fabric: 'Bazin Riche',
    difficulty: 'Avancé',
    imageUrls: ['https://images.unsplash.com/photo-1624853512293-448f703534d4?q=80&w=400&h=500&fit=crop&ixlib=rb-4.0.3'],
    description: 'Le Grand Boubou "Prestige" est une pièce maîtresse de l\'élégance masculine africaine. Réalisé en Bazin Riche de première qualité, il se distingue par ses broderies complexes et sa coupe ample, garantissant à la fois confort et majesté. Idéal pour les grandes occasions.',
    patron_pdf_link: '#'
  },
  {
    id: 'm2',
    title: 'Robe en Wax Évasée',
    genre: 'Femme',
    event: 'Quotidien',
    fabric: 'Wax Hollandais',
    difficulty: 'Intermédiaire',
    imageUrls: [
        'https://images.unsplash.com/photo-1617137984838-8e6821e2a874?q=80&w=400&h=500&fit=crop&ixlib=rb-4.0.3',
        'https://images.unsplash.com/photo-1581134086731-c89b3a72d733?q=80&w=400&h=500&fit=crop&ixlib=rb-4.0.3',
        'https://images.unsplash.com/photo-1600375253303-a15f60030588?q=80&w=400&h=500&fit=crop&ixlib=rb-4.0.3',
    ],
    description: 'Une robe vibrante et confortable pour le quotidien. Sa coupe évasée flatte toutes les silhouettes, et le tissu Wax Hollandais assure des couleurs vives et une excellente tenue. Facile à porter et à entretenir.',
  },
  {
    id: 'm3',
    title: 'Ensemble Tunique Enfant',
    genre: 'Enfant',
    event: 'Quotidien',
    fabric: 'Coton léger',
    difficulty: 'Débutant',
    imageUrls: ['https://images.unsplash.com/photo-1599335602120-f55a159f8c68?q=80&w=400&h=500&fit=crop&ixlib=rb-4.0.3'],
    description: 'Un adorable ensemble pour enfant, parfait pour jouer en tout confort. La tunique et le pantalon assorti sont en coton léger et respirant. Un projet idéal pour les couturiers débutants.',
    patron_pdf_link: '#'
  },
  {
    id: 'm4',
    title: 'Kaftan de Soirée Brodé',
    genre: 'Femme',
    event: 'Soirée',
    fabric: 'Soie ou Satin',
    difficulty: 'Avancé',
    imageUrls: ['https://images.unsplash.com/photo-1583387802473-41c1356f7015?q=80&w=400&h=500&fit=crop&ixlib=rb-4.0.3'],
    description: 'Ce kaftan de soirée est l\'incarnation du glamour. Taillé dans un tissu fluide comme la soie ou le satin, il est rehaussé de broderies fines au niveau du col et des manches. Une tenue parfaite pour un événement spécial.',
  },
  {
    id: 'm5',
    title: 'Chemise "Dakar" Col Mao',
    genre: 'Homme',
    event: 'Quotidien',
    fabric: 'Lin ou Coton',
    difficulty: 'Intermédiaire',
    imageUrls: [
        'https://images.unsplash.com/photo-1592188673732-5a1b9b940173?q=80&w=400&h=500&fit=crop&ixlib=rb-4.0.3',
        'https://images.unsplash.com/photo-1611033626936-a8a251da464e?q=80&w=400&h=500&fit=crop&ixlib=rb-4.0.3'
    ],
    description: 'La chemise "Dakar" allie modernité et tradition avec son col Mao épuré et sa coupe ajustée. Confectionnée en lin ou en coton, elle est légère et agréable à porter. Un indispensable du vestiaire masculin.',
    patron_pdf_link: '#'
  },
  {
    id: 'm6',
    title: 'Jupe Crayon Pagne',
    genre: 'Femme',
    event: 'Quotidien',
    fabric: 'Pagne tissé',
    difficulty: 'Débutant',
    imageUrls: ['https://images.unsplash.com/photo-1586739634822-0546516b8a5a?q=80&w=400&h=500&fit=crop&ixlib=rb-4.0.3'],
    description: 'La jupe crayon en pagne tissé est un classique revisité. Elle épouse les formes avec élégance et met en valeur les motifs traditionnels du tissu. Un modèle simple à réaliser pour un effet spectaculaire.',
  }
];


export const MOCK_TUTORIELS: Tutoriel[] = [
    {
        id: 't1',
        title: 'Maîtriser la prise de mesures pour femme',
        category: 'Prise de mesures',
        duration: '25 min',
        imageUrl: 'https://images.unsplash.com/photo-1596495761422-52011a2f64f5?q=80&w=400&h=250&fit=crop&ixlib=rb-4.0.3'
    },
    {
        id: 't2',
        title: 'Technique de la coupe à plat pour une jupe',
        category: 'Découpe',
        duration: '45 min',
        imageUrl: 'https://images.unsplash.com/photo-1554995207-c18c203602cb?q=80&w=400&h=250&fit=crop&ixlib=rb-4.0.3'
    },
    {
        id: 't3',
        title: 'Coudre une fermeture éclair invisible',
        category: 'Techniques de couture',
        duration: '30 min',
        imageUrl: 'https://images.unsplash.com/photo-1599421497958-b18a3852654a?q=80&w=400&h=250&fit=crop&ixlib=rb-4.0.3'
    },
    {
        id: 't4',
        title: 'Prendre les mesures pour un pantalon homme',
        category: 'Prise de mesures',
        duration: '20 min',
        imageUrl: 'https://images.unsplash.com/photo-1616645391136-696342807f7c?q=80&w=400&h=250&fit=crop&ixlib=rb-4.0.3'
    }
];

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'a1',
    clientId: '1',
    clientName: 'Amina Diallo',
    clientAvatarUrl: 'https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?q=80&w=200&h=200&fit=crop&ixlib=rb-4.0.3',
    date: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(),
    time: '14:30',
    type: 'Essayage',
    notes: 'Essayage final de la robe de cérémonie.'
  },
  {
    id: 'a2',
    clientId: '3',
    clientName: 'Fatou Ndiaye',
    clientAvatarUrl: 'https://images.unsplash.com/photo-1500336624523-d727130c3328?q=80&w=200&h=200&fit=crop&ixlib=rb-4.0.3',
    date: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
    time: '11:00',
    type: 'Livraison',
  },
  {
    id: 'a3',
    clientId: '2',
    clientName: 'Moussa Traoré',
    clientAvatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop&ixlib=rb-4.0.3',
    date: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
    time: '16:00',
    type: 'Rendez-vous',
    notes: 'Discussion pour un nouveau grand boubou.'
  }
];

export const MOCK_ORDERS: Order[] = [
    {
        id: 'o1',
        clientId: '1',
        modelId: 'm4',
        date: new Date('2023-10-15').toISOString(),
        status: 'Livré',
        price: 165000,
        ticketId: 'CMD-A1B2C3',
        workstationId: 'ws1',
    },
    {
        id: 'o2',
        clientId: '2',
        modelId: 'm1',
        date: new Date('2023-11-20').toISOString(),
        status: 'Prêt à livrer',
        price: 300000,
        ticketId: 'CMD-D4E5F6',
        workstationId: 'ws2',
    },
    {
        id: 'o3',
        clientId: '1',
        modelId: 'm2',
        date: new Date().toISOString(),
        status: 'En finition',
        notes: 'Ajustement de la longueur de la robe.',
        price: 120000,
        ticketId: 'CMD-G7H8I9',
        workstationId: 'ws1',
    },
     {
        id: 'o4',
        clientId: '3',
        modelId: 'm6',
        date: new Date('2023-12-01').toISOString(),
        status: 'En cours de couture',
        price: 80000,
        ticketId: 'CMD-J1K2L3',
        workstationId: 'ws2',
    },
    {
        id: 'o5',
        clientId: '4',
        modelId: 'm5',
        date: new Date().toISOString(),
        status: 'En attente de validation',
        price: 65000,
        ticketId: 'CMD-M4N5P6',
    }
];

export const MOCK_WORKSTATIONS: Workstation[] = [
    {
        id: 'ws1',
        name: 'Poste de Couture 1',
        accessCode: 'POSTE-A4B8',
    },
    {
        id: 'ws2',
        name: 'Atelier Broderie',
        accessCode: 'POSTE-F9C1',
    }
];