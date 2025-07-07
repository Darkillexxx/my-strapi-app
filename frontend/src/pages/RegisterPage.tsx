import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './RegisterPage.css';

const RegisterPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        username: '',
        dob: '',
        password: '',
        confirmPassword: '',
        language: '',
        isDisabled: false,
        cardId: '',
        issueDate: '',
        expiryDate: '',
        cardImage: null as File | null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target as HTMLInputElement;
        setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, cardImage: e.target.files[0] });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert(t('Passwords do not match'));
            return;
        }

        try {
            await axios.post('http://localhost:1337/api/auth/local/register', {
                username: formData.username,
                email: formData.email,
                password: formData.password,
            });

            alert(t('Registered successfully!'));
            navigate('/login');
        } catch (error: any) {
            alert(error.response?.data?.error?.message || error.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2>{t('Create account as')}</h2>

                <form onSubmit={handleSubmit} className="auth-form">
                    <input name="firstName" placeholder={t('First Name*')} value={formData.firstName} onChange={handleChange} className="auth-input" required />
                    <input name="lastName" placeholder={t('Last Name*')} value={formData.lastName} onChange={handleChange} className="auth-input" required />
                    <input name="email" type="email" placeholder={t('Email*')} value={formData.email} onChange={handleChange} className="auth-input" required />
                    <input name="username" placeholder={t('Username*')} value={formData.username} onChange={handleChange} className="auth-input" required />
                    <input name="dob" type="date" value={formData.dob} onChange={handleChange} className="auth-input" />

                    <input name="password" type="password" placeholder={t('Password*')} value={formData.password} onChange={handleChange} className="auth-input" required />
                    <input name="confirmPassword" type="password" placeholder={t('Repeat Password*')} value={formData.confirmPassword} onChange={handleChange} className="auth-input" required />

                    <select name="language" value={formData.language} onChange={handleChange} className="auth-input">
                        <option value="">{t('Language')}</option>
                        <option value="en">English</option>
                        <option value="de">Deutsch</option>
                    </select>

                    <div className="checkbox-container">
                        <label>
                            <input type="checkbox" name="isDisabled" checked={formData.isDisabled} onChange={handleChange} /> {t('Is Disabled')}
                        </label>
                    </div>

                    {formData.isDisabled && (
                        <div className="disability-section">
                            <h4>{t('Disability Card Information')}</h4>
                            <input name="cardId" placeholder={t('Card ID*')} value={formData.cardId} onChange={handleChange} className="auth-input" />
                            <label>{t('Date of Issuing')}</label>
                            <input name="issueDate" type="date" value={formData.issueDate} onChange={handleChange} className="auth-input" />
                            <label>{t('Expiry Date')}</label>
                            <input name="expiryDate" type="date" value={formData.expiryDate} onChange={handleChange} className="auth-input" />
                            <label>{t('Upload Disability Card')}</label>
                            <input type="file" accept="image/*" onChange={handleFileChange} style={{ marginTop: '8px' }} />
                        </div>
                    )}

                    <button type="submit" className="auth-button">{t('Sign Up')}</button>
                </form>

                <p className="auth-link">
                    {t('Already have an account?')} <Link to="/login">{t('Sign In')}</Link>
                </p>
            </div>
        </div>
    );
};

export default RegisterPage;
