
import React, { useState, useEffect, useMemo } from 'react';
import {
  BarChart3,
  MapPin,
  Clock,
  AlertTriangle,
  Leaf,
  LayoutDashboard,
  Truck,
  Settings,
  LogOut,
  Bell,
  Search,
  CheckCircle,
  XCircle,
  TrendingUp,
  Package,
  Zap,
  ArrowRight,
  Plus,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_PRODUCE, MOCK_BUYERS } from './data/mockData';
import { useCountdown } from './hooks/useCountdown';
import './App.css';

// Views
import DashboardView from './components/views/DashboardView';
import DeliveriesView from './components/views/DeliveriesView';
import AnalyticsView from './components/views/AnalyticsView';
import FarmMapView from './components/views/FarmMapView';
import ProfileView from './components/views/ProfileView';
import SettingsView from './components/views/SettingsView';

// --- Sub-components used across views ---

const ProductCard = ({ product, onSelect, onCancel, isActive }) => {
  const { hours, minutes, seconds, urgency } = useCountdown(product.expiryTime);
  const isCritical = urgency === 'critical' || urgency === 'expired';
  const isCancelled = product.status === 'Cancelled';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
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

const BuyerCard = ({ buyer }) => (
  <motion.div
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
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
    <button className="buyer-action-btn">Accept Offer</button>
  </motion.div>
);

// --- Main App Component ---

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [products, setProducts] = useState(MOCK_PRODUCE);
  const [selectedProduct, setSelectedProduct] = useState(MOCK_PRODUCE[0] || null);
  const [notifications, setNotifications] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Priority Sorting Logic
  const sortedProducts = useMemo(() => {
    return [...products].sort((a, b) => {
      if (a.status === 'Cancelled' && b.status !== 'Cancelled') return -1;
      if (a.status !== 'Cancelled' && b.status === 'Cancelled') return 1;
      return new Date(a.expiryTime) - new Date(b.expiryTime);
    });
  }, [products]);

  const handleCancel = (id) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status: 'Cancelled' } : p));
    const product = products.find(p => p.id === id);
    addNotification(`ALERT: Primary buyer cancelled for ${product.name}! Finding alternatives...`, 'critical');
  };

  const handleAddProduce = (newProduct) => {
    setProducts(prev => [newProduct, ...prev]);
    addNotification(`Produce registered: ${newProduct.name} is now live in the system.`, 'fresh');
  };

  const addNotification = (message, type) => {
    const id = Date.now();
    setNotifications(prev => [{ id, message, type }, ...prev].slice(0, 3));
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const stats = {
    atRisk: products.filter(p => p.status === 'Cancelled').length,
    totalVolume: `${products.reduce((acc, p) => acc + parseInt(p.quantity.replace(/,/g, '')), 0)} kg`,
    activeBuyers: MOCK_BUYERS.length
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <DashboardView
            stats={stats}
            sortedProducts={sortedProducts}
            setSelectedProduct={setSelectedProduct}
            selectedProduct={selectedProduct}
            handleCancel={handleCancel}
            setIsModalOpen={setIsModalOpen}
            notifications={notifications}
            isModalOpen={isModalOpen}
            handleAddProduce={handleAddProduce}
            ProductCard={ProductCard}
            MOCK_BUYERS={MOCK_BUYERS}
            BuyerCard={BuyerCard}
            onProfileClick={() => setCurrentView('profile')}
          />
        );
      case 'deliveries': return <DeliveriesView />;
      case 'analytics': return <AnalyticsView />;
      case 'map': return <FarmMapView />;
      case 'profile': return <ProfileView />;
      case 'settings': return <SettingsView />;
      default: return <DashboardView />;
    }
  };

  const handleLogout = () => {
    addNotification("Logging out of Secure Session...", "critical");
    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  return (
    <div className="app-container dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo-container" onClick={() => setCurrentView('dashboard')} style={{ cursor: 'pointer' }}>
          <Zap color="var(--primary)" fill="var(--primary)" size={32} />
          <span className="logo-text">FreshRush</span>
        </div>

        <nav className="nav-links">
          <div className={`nav-item ${currentView === 'dashboard' ? 'active' : ''}`} onClick={() => setCurrentView('dashboard')}>
            <LayoutDashboard size={20} /> Dashboard
          </div>
          <div className={`nav-item ${currentView === 'deliveries' ? 'active' : ''}`} onClick={() => setCurrentView('deliveries')}>
            <Truck size={20} /> My Deliveries
          </div>
          <div className={`nav-item ${currentView === 'analytics' ? 'active' : ''}`} onClick={() => setCurrentView('analytics')}>
            <BarChart3 size={20} /> Analytics
          </div>
          <div className={`nav-item ${currentView === 'map' ? 'active' : ''}`} onClick={() => setCurrentView('map')}>
            <MapPin size={20} /> Farm Map
          </div>
          <div style={{ marginTop: 'auto' }} className={`nav-item ${currentView === 'settings' ? 'active' : ''}`} onClick={() => setCurrentView('settings')}>
            <Settings size={20} /> Settings
          </div>
          <div className="nav-item" onClick={handleLogout} style={{ color: 'var(--status-critical)' }}>
            <LogOut size={20} /> Logout
          </div>
        </nav>
      </aside>

      {/* Main Viewport */}
      {renderView()}

      {/* Notification Toast */}
      <div className="notification-container">
        <AnimatePresence>
          {notifications.map(n => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className={`glass-panel toast ${n.type}`}
              style={{ borderLeftColor: n.type === 'critical' ? 'var(--status-critical)' : 'var(--primary)' }}
            >
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <AlertTriangle size={20} color={n.type === 'critical' ? 'var(--status-critical)' : 'var(--primary)'} />
                <span style={{ fontSize: '0.9rem' }}>{n.message}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
