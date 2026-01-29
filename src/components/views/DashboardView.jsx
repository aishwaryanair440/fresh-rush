
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Package, Truck, Plus, Bell, Search, User } from 'lucide-react';
import AddProduceModal from '../AddProduceModal';

const StatCard = ({ label, value, icon: Icon, color }) => (
    <div className="glass-panel stat-card">
        <div className="stat-label">{label}</div>
        <div className="stat-value" style={{ color }}>{value}</div>
        <div style={{ position: 'absolute', right: '20px', bottom: '20px', opacity: 0.1 }}>
            <Icon size={48} />
        </div>
    </div>
);

const DashboardView = ({
    stats,
    sortedProducts,
    setSelectedProduct,
    selectedProduct,
    handleCancel,
    setIsModalOpen,
    notifications,
    isModalOpen,
    handleAddProduce,
    ProductCard,
    MOCK_BUYERS,
    BuyerCard,
    onProfileClick
}) => {
    return (
        <div style={{ display: 'flex', width: '100%', height: '100vh' }}>
            <main className="main-content" style={{ flex: 1 }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                        <h1 style={{ fontSize: '2rem', fontFamily: 'var(--font-display)' }}>Farmer Command Center</h1>
                        <p style={{ color: 'var(--text-muted)' }}>Welcome back, <span style={{ color: 'var(--primary)', fontWeight: 700 }}>AISHWARYA A NAIR</span></p>
                    </div>
                    <div style={{ display: 'flex', gap: '16px' }}>
                        <div className="glass-panel" style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Bell size={18} />
                            <span style={{ fontSize: '0.875rem' }}>{notifications.length} Alerts</span>
                        </div>
                        <div
                            className="glass-panel"
                            style={{ padding: '8px 16px', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                            onClick={onProfileClick}
                        >
                            <User size={18} />
                            <span style={{ fontSize: '0.875rem' }}>Profile</span>
                        </div>
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
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="buyer-action-btn"
                            style={{ width: 'auto', padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                            <Plus size={18} /> Register Produce
                        </button>
                    </div>

                    <div className="product-stack">
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
                    </div>
                </section>

                <AddProduceModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    onAdd={handleAddProduce}
                />
            </main>

            <aside className="buyers-panel" style={{ width: '340px' }}>
                <div className="panel-header">
                    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '8px' }}>Nearby Matches</h2>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        finding buyers for <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{selectedProduct?.name || 'Produce'}</span>
                    </p>
                </div>

                <div className="buyer-list">
                    {MOCK_BUYERS.map(buyer => (
                        <BuyerCard key={buyer.id} buyer={buyer} />
                    ))}
                </div>

                <div style={{ marginTop: '24px', padding: '16px', border: '1px dashed var(--glass-border)', borderRadius: '12px' }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginBottom: '8px' }}>⚡ LIVE MATCHING</div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        AI algorithm optimizes distance, price, and decay window for best matches.
                    </p>
                </div>
            </aside>
        </div>
    );
};

export default DashboardView;
