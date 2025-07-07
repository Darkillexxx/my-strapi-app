import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import globeImage from '../assets/change_language_icon.png';
import './Header.css';

const Header: React.FC = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);

    const [showLangMenu, setShowLangMenu] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const toggleLanguage = (lang: string) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('i18nextLng', lang);
        setShowLangMenu(false);
    };


    return (
        <header className="header">
            <div className="header__welcome">
                {user ? `${t('Welcome')}, ${user.username}` : ''}
            </div>

            <div className="header__right">
                <div className="header__language">
                    <button className="header__lang-button" onClick={() => setShowLangMenu(!showLangMenu)}>
                        <img src={globeImage} alt="Language" className="header__lang-icon" />
                    </button>

                    {showLangMenu && (
                        <div className="header__lang-menu">
                            <div className="header__lang-option" onClick={() => toggleLanguage('en')}>English</div>
                            <div className="header__lang-option" onClick={() => toggleLanguage('de')}>Deutsch</div>
                        </div>
                    )}
                </div>

                {user && (
                    <button className="header__logout" onClick={handleLogout}>
                        {t('Sign Out')}
                    </button>
                )}
            </div>
        </header>
    );
};

export default Header;
