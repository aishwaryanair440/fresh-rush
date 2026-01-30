import React, { useState, useEffect, useMemo } from 'react';
import {
    Package,
    AlertTriangle,
    Truck,
    Leaf,
    Plus,
    Bell,
    User,
    Zap,
    MapPin,
    TrendingUp,
    CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { useCountdown } from '../hooks/useCountdown';
import AddProduceModal from '../components/AddProduceModal';
import { subscribeToUserProduce, cancelProduce, addProduce } from '../services/produceService';
import { getAllBuyers } from '../services/buyerService';
import { seedBuyers } from '../utils/seedData';

// --- Sub-components (Moved from App.jsx) ---

const StatCard = ({ label, value, icon: Icon, color }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, y: -4 }}
        className="glass-panel stat-card"
        style={{ cursor: 'default' }}
    >
        <div className="stat-label">{label}</div>
        <div className="stat-value" style={{ color }}>{value}</div>
        <div style={{ position: 'absolute', right: '20px', bottom: '20px', opacity: 0.1 }}>
            <Icon size={48} />
        </div>
    </motion.div>
);

const ProductCard = ({ product, onSelect, onCancel, isActive }) => {
    const { hours, minutes, seconds, urgency } = useCountdown(product.expiryTime);

    const isCritical = urgency === 'critical' || urgency === 'expired';
    const isCancelled = product.status === 'Cancelled';

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ scale: 1.01 }}
            className={`glass-panel product-card ${urgency} ${isActive ? 'active-match' : ''} ${urgency === 'critical' ? 'animate-pulse-critical' : ''} ${urgency === 'expired' ? 'grayscale' : ''}`}
            onClick={() => onSelect(product)}
            style={{ cursor: 'pointer', borderColor: isActive ? 'var(--primary)' : 'var(--glass-border)' }}
        >
            <div className="item-icon-box">
                <Leaf size={28} color={isCritical ? 'var(--status-critical)' : 'var(--primary)'} />
            </div>

            <div className="product-info">
                <h3 style={{ color: urgency === 'expired' ? 'var(--text-dim)' : 'inherit' }}>{product.name}</h3>
                <div className="product-meta">
                    <span><Package size={14} /> {product.quantity}</span>
                    <span style={{ color: isCancelled ? 'var(--status-critical)' : 'var(--status-fresh)', fontWeight: isCancelled ? 700 : 400 }}>
                        {isCancelled ? <AlertTriangle size={14} /> : <CheckCircle size={14} />}
                        {product.status}
                    </span>
                </div>
            </div>

            <div className="countdown-box">
                <div className="countdown-timer" style={{ color: isCritical ? 'var(--status-critical)' : 'inherit' }}>
                    {hours.toString().padStart(2, '0')}:{minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                </div>
                <div className={`urgency-badge ${urgency}`}>{urgency}</div>
            </div>

            <div className="product-actions" onClick={(e) => e.stopPropagation()}>
                {isCancelled ? (
                    <button className="buyer-action-btn" style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                        Find Buyers
                    </button>
                ) : (
                    <button
                        onClick={() => onCancel(product.id)}
                        className="buyer-action-btn"
                        style={{ background: 'rgba(239, 68, 68, 0.1)', color: 'var(--status-critical)', border: 'none' }}
                    >
                        Cancel Order
                    </button>
                )}
            </div>
        </motion.div>
    );
};

const BuyerCard = ({ buyer, onAccept }) => (
    <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.02 }}
        className="glass-panel buyer-card"
    >
        <div className="buyer-header">
            <div className="buyer-name">{buyer.name}</div>
            {buyer.pickupType === 'Instant Pickup' && (
                <span className="instant-pickup-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Zap size={10} /> INSTANT
                </span>
            )}
        </div>
        <div className="buyer-stats">
            <span><MapPin size={12} /> {buyer.distance} km</span>
            <span><TrendingUp size={12} /> ₹{buyer.pricePerKg}/kg</span>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>
            Slots: {buyer.availableSlots.join(', ')}
        </div>
        <button
            className="buyer-action-btn"
            onClick={() => onAccept(buyer)}
        >
            Accept Offer
        </button>
    </motion.div>
);

const Dashboard = ({ user, onNotification }) => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [buyers, setBuyers] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Local notification state for dashboard-specific alerts (optional to sync with global)
    // For now using the prop passed from parent Layout/App if available, or just local console

    // Subscribe to user's produce
    useEffect(() => {
        if (!user) return;

        const unsubscribe = subscribeToUserProduce(user.uid, (produceData) => {
            setProducts(produceData);
            if (produceData.length > 0 && !selectedProduct) {
                setSelectedProduct(produceData[0]);
            }
        });

        return () => unsubscribe();
    }, [user]);

    // Load buyers
    useEffect(() => {
        if (!user) return;

        const loadBuyers = async () => {
            try {
                await seedBuyers();
                const buyersData = await getAllBuyers();
                setBuyers(buyersData);
            } catch (error) {
                console.error('Error loading buyers:', error);
                onNotification('Failed to load buyers', 'critical');
            }
        };

        loadBuyers();
    }, [user]);

    // Priority Sorting Logic
    const sortedProducts = useMemo(() => {
        return [...products].sort((a, b) => {
            if (a.status === 'Cancelled' && b.status !== 'Cancelled') return -1;
            if (a.status !== 'Cancelled' && b.status === 'Cancelled') return 1;
            return new Date(a.expiryTime) - new Date(b.expiryTime);
        });
    }, [products]);

    const handleCancel = async (id) => {
        try {
            await cancelProduce(id);
            const product = products.find(p => p.id === id);
            onNotification(`ALERT: Order cancelled for ${product.name}! Finding alternatives...`, 'critical');
        } catch (error) {
            console.error('Error cancelling produce:', error);
            onNotification('Failed to cancel order', 'critical');
        }
    };

    const handleAddProduce = async (newProduct) => {
        try {
            await addProduce(newProduct, user.uid);
            onNotification(`Produce registered: ${newProduct.name} is now live in the system.`, 'fresh');
        } catch (error) {
            console.error('Error adding produce:', error);
            onNotification('Failed to add produce', 'critical');
        }
    };

    const handleAcceptOffer = (buyer) => {
        onNotification(`Offer accepted from ${buyer.name}! Preparing for pickup...`, 'fresh');
    };

    const stats = {
        atRisk: products.filter(p => p.status === 'Cancelled').length,
        totalVolume: products.reduce((sum, p) => {
            const qty = parseInt(p.quantity) || 0;
            return sum + qty;
        }, 0) + ' kg',
        activeBuyers: buyers.length
    };

    return (
        <>
            <main className="main-content">
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)' }}>Farmer Command Center</h1>
                        <p style={{ color: 'var(--text-muted)' }}>
                            Welcome back, <span style={{ color: 'var(--primary)', fontWeight: 600 }}>{user.displayName || user.email}</span>
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="glass-panel"
                            style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                        >
                            <Bell size={18} />
                            <span style={{ fontSize: '0.875rem' }}>Alerts</span>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="glass-panel"
                            style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                            onClick={() => navigate('/profile')}
                        >
                            <User size={18} />
                            <span style={{ fontSize: '0.875rem' }}>Profile</span>
                        </motion.div>
                    </div>
                </header>

                <section className="stats-grid">
                    <StatCard label="At Risk Produce" value={stats.atRisk} icon={AlertTriangle} color="var(--status-critical)" />
                    <StatCard label="Total Inventory" value={stats.totalVolume} icon={Package} color="var(--primary)" />
                    <StatCard label="Nearby Buyers" value={stats.activeBuyers} icon={Truck} color="var(--secondary)" />
                </section>

                <section className="product-stack-container">
                    <div className="product-stack-header">
                        <div>
                            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem' }}>Priority Pulse Stack</h2>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>Dynamic AI-sorted urgency queue</p>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsModalOpen(true)}
                            className="buyer-action-btn"
                            style={{ width: 'auto', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                            <Plus size={18} /> Register Produce
                        </motion.button>
                    </div>

                    <div className="product-stack">
                        {sortedProducts.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="glass-panel"
                                style={{ padding: '40px', textAlign: 'center' }}
                            >
                                <Leaf size={48} color="var(--text-dim)" style={{ margin: '0 auto 16px' }} />
                                <h3 style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>No produce registered yet</h3>
                                <p style={{ color: 'var(--text-dim)', fontSize: '0.875rem' }}>
                                    Click "Register Produce" to add your first item
                                </p>
                            </motion.div>
                        ) : (
                            <AnimatePresence mode="popLayout">
                                {sortedProducts.map(product => (
                                    <ProductCard
                                        key={product.id}
                                        product={product}
                                        onSelect={setSelectedProduct}
                                        onCancel={handleCancel}
                                        isActive={selectedProduct?.id === product.id}
                                    />
                                ))}
                            </AnimatePresence>
                        )}
                    </div>
                </section>

                <AddProduceModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAdd={handleAddProduce}
                />
            </main>

            {/* Right Panel: Buyer Match */}
            <aside className="buyers-panel">
                <div className="panel-header">
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '8px' }}>Nearby Matches</h2>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        finding buyers for <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{selectedProduct?.name || 'Produce'}</span>
                    </p>
                </div>

                <div className="buyer-list">
                    {buyers.length === 0 ? (
                        <div className="glass-panel" style={{ padding: '20px', textAlign: 'center' }}>
                            <Truck size={32} color="var(--text-dim)" style={{ margin: '0 auto 12px' }} />
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                                No buyers available
                            </p>
                        </div>
                    ) : (
                        buyers.map(buyer => (
                            <BuyerCard key={buyer.id} buyer={buyer} onAccept={handleAcceptOffer} />
                        ))
                    )}
                </div>

                <div style={{ marginTop: '24px', padding: '16px', border: '1px dashed var(--glass-border)', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px' }}>🔥 LIVE MATCHING</div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        AI algorithm optimizes distance, price, and decay window for best matches.
                    </p>
                </div>
            </aside>
        </>
    );
};

export default Dashboard;
