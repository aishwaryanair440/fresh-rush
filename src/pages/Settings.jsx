import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Lock, User, Eye, Moon, Volume2, Globe, ChevronRight, Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
    const navigate = useNavigate();

    // State for toggles
    const [pushEnabled, setPushEnabled] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [darkMode, setDarkMode] = useState(true);

    // State for language dropdown
    const [langOpen, setLangOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState('English (US)');
    const languages = ['English (US)', 'Malayalam', 'Hindi', 'Spanish'];

    // Effect to apply dark mode (Simulated class toggle)
    useEffect(() => {
        // In a real app, this would toggle a class on the body
        // document.body.classList.toggle('dark-theme', darkMode);
    }, [darkMode]);

    return (
        <main className="main-content" style={{ overflowY: 'auto' }}>
            <header style={{ marginBottom: '32px' }}>
                <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)' }}>Settings</h1>
                <p style={{ color: 'var(--text-muted)' }}>Configure your preferences and security</p>
            </header>

            <div style={{ display: 'grid', gap: '24px' }}>

                {/* Account Section - Navigation Links */}
                <section>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--primary)' }}>Account</h2>
                    <div className="glass-panel" style={{ padding: '0' }}>
                        <SettingLink
                            icon={User}
                            label="Edit Profile"
                            desc="Change name, avatar, and bio"
                            onClick={() => navigate('/settings/edit-profile')}
                        />
                        <SettingLink
                            icon={Lock}
                            label="Change Password"
                            desc="Update your security credentials"
                            onClick={() => navigate('/settings/change-password')}
                        />
                        <SettingLink
                            icon={Eye}
                            label="Privacy"
                            desc="Manage who sees your farm details"
                            onClick={() => navigate('/settings/privacy')}
                            last
                        />
                    </div>
                </section>

                {/* Notifications Section - Functional Toggles */}
                <section>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--secondary)' }}>Notifications</h2>
                    <div className="glass-panel" style={{ padding: '0' }}>
                        <SettingToggle
                            icon={Bell}
                            label="Push Notifications"
                            desc="Receive alerts for new orders"
                            checked={pushEnabled}
                            onChange={setPushEnabled}
                        />
                        <SettingToggle
                            icon={Volume2}
                            label="Sound Effects"
                            desc="Play sounds on interaction"
                            checked={soundEnabled}
                            onChange={setSoundEnabled}
                            last
                        />
                    </div>
                </section>

                {/* App Section - Toggles & Dropdown */}
                <section>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--text-main)' }}>Application</h2>
                    <div className="glass-panel" style={{ padding: '0' }}>
                        <SettingToggle
                            icon={Moon}
                            label="Dark Mode"
                            desc="Toggle application theme"
                            checked={darkMode}
                            onChange={setDarkMode}
                        />

                        {/* Language Dropdown */}
                        <div style={{ position: 'relative' }}>
                            <div
                                onClick={() => setLangOpen(!langOpen)}
                                style={{
                                    padding: '20px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    cursor: 'pointer',
                                    background: langOpen ? 'rgba(255,255,255,0.05)' : 'transparent'
                                }}
                            >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <div style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                                        <Globe size={20} color="var(--text-main)" />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '1rem', fontWeight: 500 }}>Language</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{selectedLang}</div>
                                    </div>
                                </div>
                                <ChevronRight size={18} style={{ transform: langOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} color="var(--text-muted)" />
                            </div>

                            <AnimatePresence>
                                {langOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        style={{ overflow: 'hidden', background: 'rgba(0,0,0,0.2)' }}
                                    >
                                        {languages.map((lang) => (
                                            <div
                                                key={lang}
                                                onClick={() => { setSelectedLang(lang); setLangOpen(false); }}
                                                style={{
                                                    padding: '12px 20px 12px 76px',
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '12px',
                                                    color: selectedLang === lang ? 'var(--primary)' : 'var(--text-dim)',
                                                    background: selectedLang === lang ? 'rgba(52, 211, 153, 0.1)' : 'transparent'
                                                }}
                                            >
                                                {lang}
                                                {selectedLang === lang && <Check size={14} />}
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                    </div>
                </section>

            </div>
        </main>
    );
};

// Component for Navigation Links
const SettingLink = ({ icon: Icon, label, desc, onClick, last }) => (
    <motion.div
        whileHover={{ background: 'rgba(255,255,255,0.03)', x: 4 }}
        onClick={onClick}
        style={{
            padding: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: last ? 'none' : '1px solid var(--glass-border)',
            cursor: 'pointer',
            transition: 'background 0.2s'
        }}
    >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                <Icon size={20} color="var(--text-main)" />
            </div>
            <div>
                <div style={{ fontSize: '1rem', fontWeight: 500 }}>{label}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{desc}</div>
            </div>
        </div>
        <ChevronRight size={18} color="var(--text-muted)" />
    </motion.div>
);

// Component for Toggles
const SettingToggle = ({ icon: Icon, label, desc, checked, onChange, last }) => (
    <div style={{
        padding: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: last ? 'none' : '1px solid var(--glass-border)',
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '12px' }}>
                <Icon size={20} color="var(--text-main)" />
            </div>
            <div>
                <div style={{ fontSize: '1rem', fontWeight: 500 }}>{label}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>{desc}</div>
            </div>
        </div>

        <div
            onClick={() => onChange(!checked)}
            style={{
                width: '46px',
                height: '26px',
                background: checked ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                borderRadius: '13px',
                position: 'relative',
                cursor: 'pointer',
                transition: 'background 0.3s'
            }}
        >
            <motion.div
                initial={false}
                animate={{ x: checked ? 22 : 2 }}
                style={{
                    width: '22px',
                    height: '22px',
                    background: 'white',
                    borderRadius: '50%',
                    position: 'absolute',
                    top: '2px',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
            />
        </div>
    </div>
);

export default Settings;
