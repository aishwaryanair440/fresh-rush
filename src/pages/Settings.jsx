import React from 'react';
import { motion } from 'framer-motion';
import { Bell, Lock, User, Eye, Moon, Volume2, Globe } from 'lucide-react';

const Settings = () => {
    return (
        <main className="main-content" style={{ overflowY: 'auto' }}>
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)' }}>Settings</h1>
                <p style={{ color: 'var(--text-muted)' }}>Configure your preferences and security</p>
            </header>

            <div style={{ display: 'grid', gap: '24px' }}>

                {/* Account Section */}
                <section>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--primary)' }}>Account</h2>
                    <div className="glass-panel" style={{ padding: '0' }}>
                        <SettingItem icon={User} label="Edit Profile" desc="Change name, avatar, and bio" />
                        <SettingItem icon={Lock} label="Change Password" desc="Update your security credentials" />
                        <SettingItem icon={Eye} label="Privacy" desc="Manage who sees your farm details" last />
                    </div>
                </section>

                {/* Notifications Section */}
                <section>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--secondary)' }}>Notifications</h2>
                    <div className="glass-panel" style={{ padding: '0' }}>
                        <SettingItem icon={Bell} label="Push Notifications" desc="Receive alerts for new orders" hasToggle />
                        <SettingItem icon={Volume2} label="Sound Effects" desc="Play sounds on interaction" hasToggle last />
                    </div>
                </section>

                {/* App Section */}
                <section>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-main)' }}>Application</h2>
                    <div className="glass-panel" style={{ padding: '0' }}>
                        <SettingItem icon={Moon} label="Dark Mode" desc="Toggle application theme" hasToggle />
                        <SettingItem icon={Globe} label="Language" desc="English (US)" hasValue="English" last />
                    </div>
                </section>

            </div>
        </main>
    );
};

const SettingItem = ({ icon: Icon, label, desc, hasToggle, hasValue, last }) => (
    <motion.div
        whileHover={{ background: 'rgba(255,255,255,0.03)' }}
        style={{
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: last ? 'none' : '1px solid var(--glass-border)',
            cursor: 'pointer'
        }}
    >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
                padding: '10px',
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '12px'
            }}>
                <Icon size={20} color="var(--text-main)" />
            </div>
            <div>
                <div style={{ fontSize: '1rem', fontWeight: 500 }}>{label}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{desc}</div>
            </div>
        </div>

        <div>
            {hasToggle && (
                <div style={{
                    width: '40px',
                    height: '20px',
                    background: 'var(--primary)',
                    borderRadius: '10px',
                    position: 'relative'
                }}>
                    <div style={{
                        width: '16px',
                        height: '16px',
                        background: 'white',
                        borderRadius: '50%',
                        position: 'absolute',
                        top: '2px',
                        right: '2px'
                    }} />
                </div>
            )}
            {hasValue && (
                <span style={{ color: 'var(--text-muted)' }}>{hasValue}</span>
            )}
        </div>
    </motion.div>
);

export default Settings;
