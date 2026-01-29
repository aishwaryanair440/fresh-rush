
import React from 'react';
import { Settings as SettingsIcon, Bell, Shield, Database, Trash2, Save } from 'lucide-react';

const SettingsView = () => {
    return (
        <div className="view-container">
            <header>
                <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)' }}>System Configuration</h1>
                <p style={{ color: 'var(--text-muted)' }}>Tailor the FreshRush engine to your farm's throughput</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                <div className="glass-panel" style={{ padding: '32px' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Bell size={20} color="var(--primary)" /> Notification Thresholds
                    </h3>
                    <div className="settings-group">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <p style={{ fontSize: '0.9rem' }}>Critical Warning Milestone</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Alert when decay window < 6 hours</p>
                            </div>
                            <input type="checkbox" defaultChecked />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <p style={{ fontSize: '0.9rem' }}>Buyer Instant-Match Sounds</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Play sonar pulse when match found</p>
                            </div>
                            <input type="checkbox" defaultChecked />
                        </div>
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '32px' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Database size={20} color="var(--primary)" /> Future Database Integration
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '20px' }}>
                        Current mode: **Mock Persistent Store**. Switch to live PostgreSQL when backend is ready.
                    </p>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button className="cta-button" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', flex: 1 }}>Configure Endpoint</button>
                        <button className="cta-button" style={{ flex: 1 }}>Sync Now</button>
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '32px' }}>
                    <h3 style={{ fontSize: '1.25rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <Shield size={20} color="var(--primary)" /> Privacy & Data
                    </h3>
                    <div className="settings-group">
                        <button className="cta-button" style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--status-critical)', border: '1px solid rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                            <Trash2 size={16} /> Reset All Simulation Data
                        </button>
                    </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
                    <button className="cta-button" style={{ width: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', fontSize: '1.1rem' }}>
                        <Save size={20} /> Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsView;
