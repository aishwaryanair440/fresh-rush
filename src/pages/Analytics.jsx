import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, PieChart, Activity, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const Analytics = () => {
    return (
        <main className="main-content" style={{ overflowY: 'auto' }}>
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)' }}>Farm Analytics</h1>
                <p style={{ color: 'var(--text-muted)' }}>Financial insights and production metrics</p>
            </header>

            {/* Top Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
                {[
                    { label: 'Total Revenue', value: '₹1,24,500', trend: '+12%', isPositive: true, icon: DollarSign },
                    { label: 'Orders Completed', value: '142', trend: '+5%', isPositive: true, icon: Activity },
                    { label: 'Avg. Sell Price', value: '₹42/kg', trend: '-2%', isPositive: false, icon: TrendingUp },
                    { label: 'Wastage Rate', value: '3.2%', trend: '-0.5%', isPositive: true, icon: PieChart },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-panel"
                        style={{ padding: '20px' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                            <stat.icon size={20} color="var(--primary)" />
                            <span style={{
                                fontSize: '0.8rem',
                                color: stat.isPositive ? 'var(--status-fresh)' : 'var(--status-critical)',
                                display: 'flex', alignItems: 'center'
                            }}>
                                {stat.trend} {stat.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                            </span>
                        </div>
                        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '4px' }}>{stat.value}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{stat.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* Charts Section (Simulated with CSS) */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>

                {/* Revenue Graph */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="glass-panel"
                    style={{ minHeight: '300px', display: 'flex', flexDirection: 'column' }}
                >
                    <div style={{ marginBottom: '20px' }}>
                        <h3>Revenue Growth</h3>
                    </div>
                    <div style={{ flex: 1, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', padding: '0 10px' }}>
                        {[40, 60, 45, 70, 55, 80, 65, 90, 75, 95, 85, 100].map((h, i) => (
                            <motion.div
                                key={i}
                                initial={{ height: 0 }}
                                animate={{ height: `${h}%` }}
                                transition={{ duration: 0.8, delay: i * 0.05 }}
                                style={{
                                    width: '6%',
                                    background: `linear-gradient(to top, var(--primary), rgba(59, 130, 246, 0.2))`,
                                    borderRadius: '4px 4px 0 0',
                                    position: 'relative'
                                }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    bottom: '-25px',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    fontSize: '0.7rem',
                                    color: 'var(--text-dim)'
                                }}>
                                    {['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'][i]}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Crop Distribution Pie */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="glass-panel"
                    style={{ minHeight: '300px', padding: '20px' }}
                >
                    <h3>Crop Distribution</h3>
                    <div style={{
                        marginTop: '30px',
                        display: 'flex',
                        justifyContent: 'center',
                        position: 'relative',
                        height: '200px'
                    }}>
                        <svg viewBox="0 0 100 100" style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}>
                            {/* Simple SVG Pie Chart Simulation */}
                            <circle cx="50" cy="50" r="40" fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth="20" />
                            <motion.circle
                                cx="50" cy="50" r="40"
                                fill="transparent"
                                stroke="var(--primary)"
                                strokeWidth="20"
                                strokeDasharray="251.2"
                                strokeDashoffset="100" // 60%
                                initial={{ strokeDashoffset: 251.2 }}
                                animate={{ strokeDashoffset: 100 }}
                                transition={{ duration: 1 }}
                            />
                            <motion.circle
                                cx="50" cy="50" r="40"
                                fill="transparent"
                                stroke="var(--secondary)"
                                strokeWidth="20"
                                strokeDasharray="251.2"
                                strokeDashoffset="200" // 20%
                                strokeDashoffset-origin
                                initial={{ strokeDashoffset: 251.2 }}
                                animate={{ strokeDashoffset: 200 }}
                                transition={{ duration: 1, delay: 0.5 }}
                                style={{ transformOrigin: 'center', transform: 'rotate(216deg)' }}
                            />
                        </svg>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center' }}>
                            <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>60%</div>
                            <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Mangoes</div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </main>
    );
};

export default Analytics;
