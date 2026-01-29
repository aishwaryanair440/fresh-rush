
import React from 'react';
import { motion } from 'framer-motion';
import { Map as MapIcon, Navigation, Target, Filter } from 'lucide-react';

const FarmMapView = () => {
    return (
        <div className="view-container">
            <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)' }}>Agri-Network Topology</h1>
                    <p style={{ color: 'var(--text-muted)' }}>Visualizing farm-buyer proximity and routing efficiency</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="glass-panel" style={{ padding: '10px 16px', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Filter size={16} /> Filters
                    </button>
                    <button className="cta-button" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Navigation size={16} /> Optimize All Routes
                    </button>
                </div>
            </header>

            <div className="map-placeholder">
                {/* Abstract Map Grid */}
                <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'radial-gradient(var(--text-dim) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                {/* Connection Lines (Abstract) */}
                <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                    <motion.path
                        d="M 200 150 Q 400 100 600 250"
                        stroke="var(--primary)"
                        strokeWidth="2"
                        fill="transparent"
                        strokeDasharray="10 5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.4 }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.path
                        d="M 150 400 Q 400 450 700 300"
                        stroke="var(--secondary)"
                        strokeWidth="2"
                        fill="transparent"
                        strokeDasharray="10 5"
                        initial={{ pathLength: 0, opacity: 0 }}
                        animate={{ pathLength: 1, opacity: 0.4 }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                    />
                </svg>

                {/* Pulsing Farm Points */}
                <motion.div
                    className="map-point"
                    style={{ top: '150px', left: '200px' }}
                    whileHover={{ scale: 2 }}
                >
                    <div style={{ position: 'absolute', top: '20px', left: '10px', background: 'var(--bg-card)', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--primary)', fontSize: '0.7rem', whiteSpace: 'nowrap' }}>
                        Green Valley Farm (HQ)
                    </div>
                </motion.div>

                <motion.div
                    className="map-point"
                    style={{ top: '400px', left: '150px', background: 'var(--secondary)', boxShadow: '0 0 15px var(--secondary)' }}
                    whileHover={{ scale: 2 }}
                >
                    <div style={{ position: 'absolute', top: '20px', left: '10px', background: 'var(--bg-card)', padding: '6px 12px', borderRadius: '8px', border: '1px solid var(--secondary)', fontSize: '0.7rem', whiteSpace: 'nowrap' }}>
                        South Cluster Hub
                    </div>
                </motion.div>

                <div style={{ position: 'absolute', bottom: '20px', right: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div className="glass-panel" style={{ padding: '12px', fontSize: '0.8rem', width: '200px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                            <div style={{ width: '8px', height: '8px', background: 'var(--primary)', borderRadius: '50%' }} />
                            Active Cancellation Alert
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '8px', height: '8px', background: 'var(--secondary)', borderRadius: '50%' }} />
                            Buyer Logistics Route
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass-panel" style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Network Proximity Optimization</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '800px' }}>
                    The topology map uses your farm's GPS coordinates to calculate the most carbon-efficient buyer match.
                    Currently, the **Central Bangalore Cluster** is showing the highest absorption rate for perishable tomatoes.
                </p>
            </div>
        </div>
    );
};

export default FarmMapView;
