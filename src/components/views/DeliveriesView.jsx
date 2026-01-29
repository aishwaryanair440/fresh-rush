
import React from 'react';
import { motion } from 'framer-motion';
import { Truck, MapPin, Thermometer, CheckCircle2 } from 'lucide-react';
import { MOCK_DELIVERIES } from '../data/mockData';

const DeliveriesView = () => {
    return (
        <div className="view-container">
            <header>
                <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)' }}>Delivery Fleet Status</h1>
                <p style={{ color: 'var(--text-muted)' }}>Real-time tracking of produce in transit</p>
            </header>

            <div className="stats-grid">
                <div className="glass-panel stat-card" style={{ borderLeft: '4px solid var(--primary)' }}>
                    <div className="stat-label">Active Shipments</div>
                    <div className="stat-value">12</div>
                </div>
                <div className="glass-panel stat-card" style={{ borderLeft: '4px solid var(--secondary)' }}>
                    <div className="stat-label">On-Time Rate</div>
                    <div className="stat-value">98.4%</div>
                </div>
                <div className="glass-panel stat-card" style={{ borderLeft: '4px solid var(--accent)' }}>
                    <div className="stat-label">Avg. Transit Temp</div>
                    <div className="stat-value">6.2°C</div>
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {MOCK_DELIVERIES.map((delivery, index) => (
                    <motion.div
                        key={delivery.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-panel delivery-card"
                    >
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                            <div className="item-icon-box">
                                <Truck size={24} color="var(--primary)" />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.1rem' }}>{delivery.product}</h3>
                                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>To: {delivery.buyer}</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                                <span style={{ color: 'var(--text-muted)' }}>{delivery.status}</span>
                                <span>{delivery.progress}%</span>
                            </div>
                            <div className="progress-bar-container">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${delivery.progress}%` }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="progress-bar-fill"
                                />
                            </div>
                        </div>

                        <div style={{ fontSize: '0.85rem' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin size={14} color="var(--text-dim)" /> {delivery.location}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.75rem' }}>ETA: {delivery.eta}</div>
                        </div>

                        <div style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end', color: delivery.urgency === 'High' ? 'var(--status-critical)' : 'var(--status-fresh)' }}>
                                {delivery.progress === 100 ? <CheckCircle2 size={16} /> : <Thermometer size={16} />}
                                {delivery.temp}
                            </div>
                            <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>Sensor Active</span>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default DeliveriesView;
