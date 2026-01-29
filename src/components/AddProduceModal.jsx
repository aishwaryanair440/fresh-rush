
import React, { useState } from 'react';
import { X, Plus, Clock, Package, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AddProduceModal = ({ isOpen, onClose, onAdd }) => {
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        expiryTimeHours: '24',
        status: 'Active'
    });

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const newProduct = {
            id: Math.random().toString(36).substr(2, 9),
            name: formData.name,
            quantity: formData.quantity,
            harvestTime: new Date().toISOString(),
            expiryTime: new Date(Date.now() + parseInt(formData.expiryTimeHours) * 60 * 60 * 1000).toISOString(),
            status: formData.status,
            type: "Produce",
            primaryBuyer: "Pending Approval"
        };
        onAdd(newProduct);
        onClose();
    };

    return (
        <div className="modal-overlay" style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(8px)', zIndex: 2000,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="glass-panel"
                style={{ width: '450px', padding: '32px', position: 'relative' }}
            >
                <button onClick={onClose} style={{ position: 'absolute', right: '20px', top: '20px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
                    <X size={24} />
                </button>

                <h2 style={{ fontFamily: 'var(--font-display)', marginBottom: '24px' }}>Register Fresh Produce</h2>

                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="input-group">
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Product Name</label>
                        <input
                            required
                            style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }}
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                            placeholder="e.g. Alphonso Mangoes"
                        />
                    </div>

                    <div className="input-group">
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Quantity</label>
                        <input
                            required
                            style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }}
                            value={formData.quantity}
                            onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                            placeholder="e.g. 500 kg"
                        />
                    </div>

                    <div className="input-group">
                        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Estimated Shelf Life (Hours)</label>
                        <input
                            type="number"
                            required
                            style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)', borderRadius: '8px', color: 'white' }}
                            value={formData.expiryTimeHours}
                            onChange={e => setFormData({ ...formData, expiryTimeHours: e.target.value })}
                        />
                    </div>

                    <button type="submit" className="buyer-action-btn" style={{ padding: '16px', marginTop: '12px' }}>
                        List Produce to Network
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AddProduceModal;
