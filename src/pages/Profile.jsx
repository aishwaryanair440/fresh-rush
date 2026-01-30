import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Award, Calendar, Shield } from 'lucide-react';

const Profile = ({ user }) => {
    return (
        <main className="main-content" style={{ overflowY: 'auto' }}>
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)' }}>Farmer Profile</h1>
                <p style={{ color: 'var(--text-muted)' }}>Manage your personal account and farm details</p>
            </header>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px' }}>
                {/* Left Column: Identity Card */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-panel"
                >
                    <div style={{ textAlign: 'center', padding: '20px' }}>
                        <div style={{
                            width: '120px',
                            height: '120px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 20px',
                            border: '4px solid var(--glass-border)'
                        }}>
                            <span style={{ fontSize: '3rem', fontWeight: 'bold', color: 'white' }}>
                                {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}
                            </span>
                        </div>
                        <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>{user?.displayName || 'Farmer User'}</h2>
                        <div style={{
                            display: 'inline-block',
                            padding: '4px 12px',
                            background: 'rgba(52, 211, 153, 0.2)',
                            color: 'var(--status-fresh)',
                            borderRadius: '20px',
                            fontSize: '0.875rem'
                        }}>
                            Verified Grower
                        </div>
                    </div>

                    <div style={{ marginTop: '32px', borderTop: '1px solid var(--glass-border)', paddingTop: '24px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <Mail size={18} color="var(--primary)" />
                            <span style={{ color: 'var(--text-dim)' }}>{user?.email}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                            <Phone size={18} color="var(--primary)" />
                            <span style={{ color: 'var(--text-dim)' }}>+91 98765 43210</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <MapPin size={18} color="var(--primary)" />
                            <span style={{ color: 'var(--text-dim)' }}>Kerala, India</span>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column: Statistics & Details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                    {/* Stats Row */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="glass-panel"
                            style={{ padding: '20px' }}
                        >
                            <Award size={32} color="var(--secondary)" style={{ marginBottom: '12px' }} />
                            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>4.8</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Reputation Score</div>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="glass-panel"
                            style={{ padding: '20px' }}
                        >
                            <Calendar size={32} color="var(--primary)" style={{ marginBottom: '12px' }} />
                            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>2 Years</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Member Since</div>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            className="glass-panel"
                            style={{ padding: '20px' }}
                        >
                            <Shield size={32} color="var(--status-fresh)" style={{ marginBottom: '12px' }} />
                            <div style={{ fontSize: '2rem', fontWeight: 'bold' }}>100%</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Quality Index</div>
                        </motion.div>
                    </div>

                    {/* Bio / Farm Details */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-panel"
                    >
                        <h3 style={{ marginBottom: '16px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '12px' }}>Farm Details</h3>
                        <p style={{ color: 'var(--text-dim)', lineHeight: '1.6' }}>
                            Specializing in organic tropical fruits and vegetables. We use sustainable farming practices with zero chemical pesticides. Our farm "Green Haven" is located in the fertile plains near the river, ensuring constant fresh water supply for our produce.
                        </p>
                        <div style={{ marginTop: '24px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                            {['Organic', 'Eco-Friendly', 'Fast Delivery', 'Wholesale'].map(tag => (
                                <span key={tag} style={{
                                    padding: '6px 16px',
                                    borderRadius: '20px',
                                    border: '1px solid var(--glass-border)',
                                    background: 'rgba(255,255,255,0.05)',
                                    fontSize: '0.85rem'
                                }}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                </div>
            </div>
        </main>
    );
};

export default Profile;
