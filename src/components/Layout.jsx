import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
    Zap,
    LayoutDashboard,
    Truck,
    BarChart3,
    MapPin,
    Settings,
    LogOut
} from 'lucide-react';
import { logOut } from '../services/authService';

const Layout = ({ user, onLogoutNotification }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await logOut();
            onLogoutNotification('Logged out successfully', 'fresh');
            navigate('/login');
        } catch (error) {
            console.error('Error logging out:', error);
            onLogoutNotification('Failed to logout', 'critical');
        }
    };

    return (
        <div className="app-container dashboard">
            {/* Sidebar */}
            <aside className="sidebar">
                <div className="logo-container">
                    <Zap color="var(--primary)" fill="var(--primary)" size={32} />
                    <span className="logo-text">FreshRush</span>
                </div>

                <nav className="nav-links">
                    <NavLink
                        to="/"
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        end
                    >
                        <LayoutDashboard size={20} /> Dashboard
                    </NavLink>
                    <NavLink
                        to="/deliveries"
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <Truck size={20} /> My Deliveries
                    </NavLink>
                    <NavLink
                        to="/analytics"
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <BarChart3 size={20} /> Analytics
                    </NavLink>
                    <NavLink
                        to="/map"
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <MapPin size={20} /> Farm Map
                    </NavLink>

                    <div style={{ marginTop: 'auto' }}>
                        <NavLink
                            to="/settings"
                            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                        >
                            <Settings size={20} /> Settings
                        </NavLink>
                        <div className="nav-item" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                            <LogOut size={20} /> Logout
                        </div>
                    </div>
                </nav>
            </aside>

            {/* Main Content Area */}
            <Outlet />
        </div>
    );
};

export default Layout;
