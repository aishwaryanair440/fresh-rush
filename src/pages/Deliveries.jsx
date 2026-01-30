import React from 'react';
import { motion } from 'framer-motion';
import { Truck, Package, CheckCircle, Clock, MapPin, ArrowRight } from 'lucide-react';

const Deliveries = () => {
    // Mock delivery data
    const deliveries = [
        {
            id: "ORD-7829",
            buyer: "Metro Mart Logistics",
            items: "500kg Mangoes",
            status: "In Transit",
            time: "2 hours ago",
            destination: "Kochi Hub",
            progress: 65
        },
        {
            id: "ORD-9921",
            buyer: "Fresh World",
            items: "200kg Bananas",
            status: "Delivered",
            time: "Yesterday",
            destination: "Trivandrum Store",
            progress: 100
        },
        {
            id: "ORD-1102",
            buyer: "Green Grocers",
            items: "50kg Chillies",
            status: "Pending Pickup",
            time: "Just now",
            destination: "Calicut Center",
            progress: 10
        }
    ];

    return (
        <main className="main-content" style={{ overflowY: 'auto' }}>
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)' }}>My Deliveries</h1>
                <p style={{ color: 'var(--text-muted)' }}>Track your shipments and pickup schedules</p>
            </header>

            <div style={{ display: 'grid', gap: '24px' }}>
                {deliveries.map((delivery, index) => (
                    <motion.div
                        key={delivery.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-panel"
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '1fr 3fr 1fr',
                            gap: '24px',
                            alignItems: 'center'
                        }}
                    >
                        {/* Left: Icon & ID */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                            <div style={{
                                width: '60px',
                                height: '60px',
                                borderRadius: '16px',
                                background: delivery.status === 'Delivered' ? 'rgba(52, 211, 153, 0.2)' : 'rgba(59, 130, 246, 0.2)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Truck size={32} color={delivery.status === 'Delivered' ? 'var(--status-fresh)' : 'var(--primary)'} />
                            </div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>{delivery.id}</span>
                        </div>

                        {/* Middle: Details & Progress */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                <h3 style={{ fontSize: '1.2rem' }}>{delivery.buyer}</h3>
                                <span style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>{delivery.time}</span>
                            </div>

                            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <Package size={14} /> {delivery.items}
                                </span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                    <MapPin size={14} /> {delivery.destination}
                                </span>
                            </div>

                            {/* Progress Bar */}
                            <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${delivery.progress}%` }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    style={{
                                        height: '100%',
                                        background: delivery.status === 'Delivered' ? 'var(--status-fresh)' : 'linear-gradient(90deg, var(--primary), var(--secondary))',
                                        borderRadius: '4px'
                                    }}
                                />
                            </div>
                        </div>

                        {/* Right: Status */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                            <div style={{
                                padding: '8px 16px',
                                borderRadius: '20px',
                                background: delivery.status === 'Delivered' ? 'rgba(52, 211, 153, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                                border: `1px solid ${delivery.status === 'Delivered' ? 'var(--status-fresh)' : 'var(--glass-border)'}`,
                                color: delivery.status === 'Delivered' ? 'var(--status-fresh)' : 'var(--text-main)',
                                textAlign: 'center'
                            }}>
                                {delivery.status}
                            </div>
                            <button
                                className="buyer-action-btn"
                                style={{ marginTop: '12px', width: 'auto', fontSize: '0.8rem', padding: '6px 12px' }}
                            >
                                View Details <ArrowRight size={14} style={{ marginLeft: '4px' }} />
                            </button>
                        </div>

                    </motion.div>
                ))}
            </div>
        </main>
    );
};

export default Deliveries;
