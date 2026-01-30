import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Layers, Info } from 'lucide-react';

const FarmMap = () => {
    const [selectedZone, setSelectedZone] = useState(null);

    const zones = [
        { id: 1, name: 'Orchard A', crop: 'Mango', status: 'Harvesting', color: 'var(--status-fresh)', top: '20%', left: '30%' },
        { id: 2, name: 'Field B', crop: 'Vegetables', status: 'Growing', color: 'var(--primary)', top: '60%', left: '70%' },
        { id: 3, name: 'Greenhouse', crop: 'Herbs', status: 'Maintenance', color: 'var(--status-critical)', top: '40%', left: '50%' },
    ];

    return (
        <main className="main-content" style={{ overflowY: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <header style={{ marginBottom: '16px', flexShrink: 0 }}>
                <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)' }}>Farm Geo-Map</h1>
                <p style={{ color: 'var(--text-muted)' }}>Satellite view and crop zoning</p>
            </header>

            <div style={{ flex: 1, position: 'relative', borderRadius: '24px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
                {/* Simulated Map Background */}
                <div style={{
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle at center, #1a2e1a 0%, #050505 100%)',
                    position: 'absolute'
                }}>
                    {/* Grid Lines */}
                    <div style={{
                        width: '100%', height: '100%',
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                        backgroundSize: '40px 40px'
                    }} />
                </div>

                {/* Map Controls */}
                <div style={{ position: 'absolute', top: '20px', left: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button className="glass-panel" style={{ padding: '8px', cursor: 'pointer' }}><Navigation size={20} /></button>
                    <button className="glass-panel" style={{ padding: '8px', cursor: 'pointer' }}><Layers size={20} /></button>
                </div>

                {/* Zones (Pins) */}
                {zones.map(zone => (
                    <motion.div
                        key={zone.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        whileHover={{ scale: 1.2 }}
                        onClick={() => setSelectedZone(zone)}
                        style={{
                            position: 'absolute',
                            top: zone.top,
                            left: zone.left,
                            cursor: 'pointer',
                            zIndex: 10
                        }}
                    >
                        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <MapPin size={40} color={zone.color} fill={zone.color} fillOpacity={0.3} />
                            <div style={{
                                background: 'rgba(0,0,0,0.8)',
                                padding: '4px 8px',
                                borderRadius: '4px',
                                marginTop: '4px',
                                fontSize: '0.7rem',
                                whiteSpace: 'nowrap'
                            }}>
                                {zone.name}
                            </div>
                        </div>
                    </motion.div>
                ))}

                {/* Selected Zone Detail Card */}
                {selectedZone && (
                    <motion.div
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="glass-panel"
                        style={{
                            position: 'absolute',
                            bottom: '20px',
                            left: '20px',
                            right: '20px',
                            padding: '20px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            zIndex: 20
                        }}
                    >
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{selectedZone.name}</h3>
                            <div style={{ display: 'flex', gap: '16px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                <span>Crop: <span style={{ color: 'white' }}>{selectedZone.crop}</span></span>
                                <span>Status: <span style={{ color: selectedZone.color }}>{selectedZone.status}</span></span>
                            </div>
                        </div>
                        <button
                            className="buyer-action-btn"
                            style={{ width: 'auto' }}
                            onClick={() => setSelectedZone(null)}
                        >
                            Close
                        </button>
                    </motion.div>
                )}
            </div>
        </main>
    );
};

export default FarmMap;
