
import React from 'react';
import { motion } from 'framer-motion';
import { User, Award, ShieldCheck, Mail, Phone, Calendar } from 'lucide-react';

const ProfileView = () => {
    const user = {
        name: "Aishwariya A Nair",
        role: "Senior Farm Architect",
        joined: "March 2024",
        email: "aish.nair@agrifutures.in",
        phone: "+91 98XXX XXXXX",
        rating: 4.9,
        impact: "Top 1% Waste Reducer"
    };

    return (
        <div className="view-container">
            <div className="profile-grid">
                <aside>
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="profile-avatar"
                    >
                        {user.name.split(' ').map(n => n[0]).join('')}
                    </motion.div>
                    <h2 style={{ fontSize: '1.75rem', marginBottom: '4px' }}>{user.name}</h2>
                    <p style={{ color: 'var(--primary)', fontWeight: 600, marginBottom: '24px' }}>{user.role}</p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <Mail size={16} /> {user.email}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <Phone size={16} /> {user.phone}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                            <Calendar size={16} /> Joined {user.joined}
                        </div>
                    </div>

                    <button className="cta-button" style={{ width: '100%', marginTop: '32px' }}>Edit Farm Details</button>
                </aside>

                <main style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <div className="glass-panel" style={{ padding: '32px' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <Award color="var(--primary)" /> Recognized Achievements
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                            {[
                                { title: "Zero Waste Hero", desc: "10 harvests saved", color: "#10b981" },
                                { title: "Speed Demon", desc: "Avg match < 30 mins", color: "#3b82f6" },
                                { title: "Network King", desc: "Connected to 15+ buyers", color: "#8b5cf6" }
                            ].map((badge, i) => (
                                <div key={i} className="glass-panel" style={{ padding: '20px', background: 'rgba(255,255,255,0.02)', borderTop: `4px solid ${badge.color}` }}>
                                    <h4 style={{ fontSize: '0.9rem', marginBottom: '4px' }}>{badge.title}</h4>
                                    <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{badge.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-panel" style={{ padding: '32px' }}>
                        <h3 style={{ fontSize: '1.25rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <ShieldCheck color="var(--primary)" /> Compliance & Verification
                        </h3>
                        <div style={{ padding: '20px', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
                            <p style={{ fontSize: '0.9rem' }}>
                                Your organic certifications are verified and valid until **Dec 2026**.
                                You are eligible for the **Premium Buyer Network** tier.
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ProfileView;
