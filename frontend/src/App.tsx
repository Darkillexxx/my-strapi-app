import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import EventListPage from './pages/EventListPage';
import EventDetailPage from './pages/EventDetailPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { AuthProvider } from './AuthContext';
import PrivateRoute from './components/PrivateRoute';
import './i18n';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <>
                <Header />
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />

                    <Route
                        path="/events"
                        element={
                            <PrivateRoute>
                                <EventListPage />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/event/:id"
                        element={
                            <PrivateRoute>
                                <EventDetailPage />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </>
        </AuthProvider>
    );
};

export default App;
