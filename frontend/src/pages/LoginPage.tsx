import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AuthContext } from '../AuthContext';
import './LoginPage.css';

const LoginPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const [formData, setFormData] = useState({ identifier: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const res = await axios.post('http://localhost:1337/api/auth/local', {
                identifier: formData.identifier,
                password: formData.password,
            });

            login(res.data.user, res.data.jwt);
            navigate('/events');
        } catch (err: any) {
            setError(err.response?.data?.error?.message || 'Login failed');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>{t('Sign In')}</h2>

                <form onSubmit={handleSubmit} className="auth-form">
                    <input
                        type="text"
                        name="identifier"
                        placeholder={t('Email or Username')}
                        value={formData.identifier}
                        onChange={handleChange}
                        required
                        className="auth-input"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder={t('Password')}
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="auth-input"
                    />

                    {error && <p className="auth-error">{error}</p>}

                    <button type="submit" className="auth-button">
                        {t('Sign In')}
                    </button>
                </form>

                <p className="auth-link">
                    {t("Don't have an account?")} <Link to="/register">{t('Sign Up')}</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginPage;
