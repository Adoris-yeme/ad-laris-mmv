
import React, { useState, useRef } from 'react';
import type { Page, Modele, Client, Order, OrderStatus, UserMode } from '../types';
import ImageLightbox from '../components/ImageLightbox';
import { ExpandIcon, ChevronLeftIcon, ChevronRightIcon } from '../components/icons';

interface AccueilProps {
    models: Modele[];
    orders: Order[];
    clients: Client[];
    setCurrentPage: (page: Page) => void;
    userMode: 'client' | 'manager';
}

const OrderStatusBadge: React.FC<{ status: OrderStatus }> = ({ status }) => {
    const statusColors: { [key in OrderStatus]: string } = {
      'En attente de validation': 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300',
      'En cours de couture': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300',
      'En finition': 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/50 dark:text-cyan-300',
      'Prêt à livrer': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
      'Livré': 'bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300',
    };
    return (
        <span className={`px-2 py-1 text-xs font-semibold leading-none rounded-full whitespace-nowrap ${statusColors[status]}`}>
            {status}
        </span>
    );
};


const Accueil: React.FC<AccueilProps> = ({ models, orders, clients, setCurrentPage, userMode }) => {
    const [lightboxData, setLightboxData] = useState<{ images: string[], startIndex: number } | null>(null);
    
    const ceremonieModels = models.filter(m => m.event === 'Cérémonie').slice(0, 5);
    const quotidienModels = models.filter(m => m.event === 'Quotidien').slice(0, 5);
    const soireeModels = models.filter(m => m.event === 'Soirée').slice(0, 5);
    const activeOrders = orders.filter(o => o.status !== 'Livré');

    const handleViewLarger = (model: Modele) => {
        if (model.imageUrls && model.imageUrls.length > 0) {
            setLightboxData({ images: model.imageUrls, startIndex: 0 });
        }
    };

    const ThemeSection: React.FC<{ title: string, models: Modele[] }> = ({ title, models }) => {
        const scrollContainerRef = useRef<HTMLDivElement>(null);
        const [showLeftArrow, setShowLeftArrow] = useState(false);
        const [showRightArrow, setShowRightArrow] = useState(true);


        const scroll = (direction: 'left' | 'right') => {
            if (scrollContainerRef.current) {
                const { current } = scrollContainerRef;
                const scrollAmount = current.offsetWidth * 0.8;
                current.scrollBy({
                    left: direction === 'left' ? -scrollAmount : scrollAmount,
                    behavior: 'smooth'
                });
            }
        };

        const checkArrows = () => {
            if (scrollContainerRef.current) {
                const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
                setShowLeftArrow(scrollLeft > 5); // Add a small buffer
                setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 5);
            }
        }
        
        React.useEffect(() => {
            const container = scrollContainerRef.current;
            if (container) {
                 if (container.scrollWidth <= container.clientWidth) {
                    setShowRightArrow(false);
                }
                checkArrows();
                container.addEventListener('scroll', checkArrows, { passive: true });
                window.addEventListener('resize', checkArrows);
            }
            return () => {
                if (container) {
                    container.removeEventListener('scroll', checkArrows);
                }
                 window.removeEventListener('resize', checkArrows);
            }
        }, [models]);


        return (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 px-1">{title}</h2>
                <div className="relative group">
                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto space-x-6 pb-4 -mx-1 px-1 scroll-smooth"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {models.map(model => (
                            <div 
                                key={model.id}
                                className="group/card relative flex-shrink-0 w-72 h-96 rounded-xl overflow-hidden shadow-lg cursor-pointer transform transition-transform duration-300 hover:scale-105"
                            >
                                <img 
                                    src={model.imageUrls?.[0]} 
                                    alt={model.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                                    onClick={() => setCurrentPage('catalogue')}
                                />
                                 <button
                                    onClick={(e) => { e.stopPropagation(); handleViewLarger(model); }}
                                    className="absolute bottom-3 right-3 z-10 p-2 rounded-full bg-black/30 text-white backdrop-blur-sm hover:bg-black/60 transition-colors"
                                    aria-label="Voir en grand"
                                >
                                    <ExpandIcon className="h-5 w-5" />
                                </button>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none"></div>
                                <div className="absolute bottom-0 left-0 p-5 w-full pointer-events-none">
                                    <h3 className="text-xl font-bold text-white tracking-wide opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 truncate">
                                        {model.title}
                                    </h3>
                                    <p className="text-sm text-white/80 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                                        {model.genre} / {model.fabric}
                                    </p>
                                </div>
                            </div>
                        ))}
                        <div 
                            onClick={() => setCurrentPage('catalogue')}
                            className="flex-shrink-0 w-72 h-96 rounded-xl bg-stone-100 dark:bg-stone-800 flex flex-col items-center justify-center cursor-pointer hover:bg-stone-200 dark:hover:bg-stone-700 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-800 dark:text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            <p className="mt-2 font-semibold text-orange-800 dark:text-orange-400">Voir plus</p>
                        </div>
                    </div>
                    {showLeftArrow && (
                        <button 
                            onClick={() => scroll('left')}
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 dark:bg-black/50 text-stone-800 dark:text-white shadow-md transition-all duration-300 hover:scale-110 md:opacity-0 md:group-hover:opacity-100"
                            aria-label="Précédent"
                        >
                            <ChevronLeftIcon className="h-6 w-6" />
                        </button>
                    )}
                    {showRightArrow && (
                        <button 
                            onClick={() => scroll('right')}
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/80 dark:bg-black/50 text-stone-800 dark:text-white shadow-md transition-all duration-300 hover:scale-110 md:opacity-0 md:group-hover:opacity-100"
                            aria-label="Suivant"
                        >
                            <ChevronRightIcon className="h-6 w-6" />
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-10">
                <div>
                    <h1 className="text-4xl font-bold text-stone-800 dark:text-stone-100">Galerie d'Inspiration</h1>
                    <p className="text-stone-500 dark:text-stone-400 mt-2 text-lg">Découvrez une sélection de nos plus belles créations.</p>
                </div>

                <div className="space-y-12">
                    {ceremonieModels.length > 0 && <ThemeSection title="Pour vos Cérémonies" models={ceremonieModels} />}
                    {quotidienModels.length > 0 && <ThemeSection title="L'Élégance du Quotidien" models={quotidienModels} />}
                    {soireeModels.length > 0 && <ThemeSection title="Tenues de Soirée" models={soireeModels} />}
                </div>

                {userMode === 'manager' && (
                    <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-stone-800 dark:text-stone-100 px-1">Suivi des Commandes Actives</h2>
                    <div className="bg-white dark:bg-stone-800/50 p-4 rounded-lg shadow-sm">
                        {activeOrders.length > 0 ? (
                            <div className="space-y-4">
                                {activeOrders.map(order => {
                                    const client = clients.find(c => c.id === order.clientId);
                                    const model = models.find(m => m.id === order.modelId);
                                    if (!client || !model) return null;
                                    return (
                                        <div key={order.id} className="bg-stone-50 dark:bg-stone-800 p-3 rounded-lg flex items-center justify-between gap-4 flex-wrap">
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
                )}
                <style>{`
                    .overflow-x-auto::-webkit-scrollbar {
                        display: none;
                    }
                `}</style>
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

export default Accueil;
