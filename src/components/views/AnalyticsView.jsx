
import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Leaf, DollarSign, Activity } from 'lucide-react';
import { MOCK_ANALYTICS } from '../../data/mockData';

const AnalyticsView = () => {
    return (
        <div className="view-container">
            <header>
                <h1 style={{ fontSize: '2.5rem', fontFamily: 'var(--font-display)' }}>Harvest Analytics</h1>
                <p style={{ color: 'var(--text-muted)' }}>Data-driven insights to minimize waste and maximize recovery</p>
            </header>

            <div className="analytics-grid">
                <div className="glass-panel" style={{ padding: '32px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px' }}>
                        <h3 style={{ fontFamily: 'var(--font-display)' }}>Price Trajectory (Market Index)</h3>
                        <TrendingUp color="var(--primary)" />
                    </div>
                    <div className="chart-placeholder">
                        {MOCK_ANALYTICS.priceTrends.map((data, i) => (
                            <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${data.price * 2}px` }}
                                    transition={{ delay: i * 0.1, duration: 1 }}
                                    className="chart-bar"
                                />
                                <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)' }}>{data.month}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <h3 style={{ fontFamily: 'var(--font-display)' }}>Efficiency Overview</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.02)' }}>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                                <Leaf size={16} color="var(--primary)" />
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Waste Prevented</span>
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{MOCK_ANALYTICS.wasteReduced}</div>
                        </div>
                        <div className="glass-panel" style={{ padding: '16px', background: 'rgba(255,255,255,0.02)' }}>
                            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                                <DollarSign size={16} color="var(--status-approaching)" />
                                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Losses Recovered</span>
                            </div>
                            <div style={{ fontSize: '1.5rem', fontWeight: 700 }}>{MOCK_ANALYTICS.revenueSaved}</div>
                        </div>
                    </div>

                    <div style={{ marginTop: 'auto' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                            <span style={{ fontSize: '0.9rem' }}>Sustainability Score</span>
                            <span style={{ fontSize: '0.9rem', color: 'var(--primary)' }}>{MOCK_ANALYTICS.efficiencyScore}%</span>
                        </div>
                        <div className="progress-bar-container">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${MOCK_ANALYTICS.efficiencyScore}%` }}
                                className="progress-bar-fill"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="glass-panel" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '24px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Activity color="var(--accent)" />
                </div>
                <div>
                    <h4 style={{ fontSize: '1rem' }}>AI Forecast: High demand for Tomatoes expected in 48h</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Match probability increasing in the North-West cluster.</p>
                </div>
                <button className="cta-button" style={{ marginLeft: 'auto', background: 'var(--accent)' }}>View Forecast</button>
            </div>
        </div>
    );
};

export default AnalyticsView;
