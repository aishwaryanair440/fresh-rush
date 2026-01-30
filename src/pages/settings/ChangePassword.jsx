import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, key, ShieldCheck, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            navigate('/settings');
        }, 1500);
    };

    return (
        <main className="main-content" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-panel"
                style={{ width: '100%', maxWidth: '500px', padding: '40px' }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigate('/settings')}
                        style={{ background: 'none', border: 'none', color: 'var(--text-main)', cursor: 'pointer' }}
                    >
                        <ArrowLeft size={24} />
                    </motion.button>
                    <h1 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', margin: 0 }}>Change Password</h1>
                </div>

                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <div style={{
                        width: '80px', height: '80px',
                        borderRadius: '50%',
                        background: 'rgba(59, 130, 246, 0.1)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        margin: '0 auto 16px',
                        border: '1px solid var(--primary)'
                    }}>
                        <ShieldCheck size={40} color="var(--primary)" />
                    </div>
                    <p style={{ color: 'var(--text-muted)' }}>Secure your account with a strong password.</p>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
                    <PasswordField label="Current Password" show={showPassword} toggle={() => setShowPassword(!showPassword)} />
                    <PasswordField label="New Password" show={showPassword} />
                    <PasswordField label="Confirm New Password" show={showPassword} />

                    <div style={{ marginTop: '12px' }}>
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="buyer-action-btn"
                            disabled={loading}
                        >
                            {loading ? 'Updating...' : 'Update Password'}
                        </motion.button>
                    </div>
                </form>

                <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px dashed var(--glass-border)' }}>
                    <h4 style={{ fontSize: '0.9rem', marginBottom: '8px' }}>Password Requirements:</h4>
                    <ul style={{ fontSize: '0.8rem', color: 'var(--text-dim)', paddingLeft: '20px', lineHeight: '1.6' }}>
                        <li>At least 8 characters long</li>
                        <li>Must contain one uppercase letter</li>
                        <li>Must contain one number or symbol</li>
                    </ul>
                </div>

            </motion.div>
        </main>
    );
};

const PasswordField = ({ label, show, toggle }) => (
    <div className="form-group">
        <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>{label}</label>
        <div style={{ position: 'relative' }}>
            <Lock size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
            <input
                type={show ? "text" : "password"}
                style={{
                    width: '100%',
                    padding: '12px 12px 12px 48px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid var(--glass-border)',
                    borderRadius: '12px',
                    color: 'white',
                    outline: 'none'
                }}
            />
            {toggle && (
                <button
                    type="button"
                    onClick={toggle}
                    style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-dim)' }}
                >
                    {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
            )}
        </div>
    </div>
);

export default ChangePassword;
