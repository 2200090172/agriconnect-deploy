import React, { useState } from 'react';
import globeImage from '../assets/images/globe.jpg';
import { useTranslation } from 'react-i18next';
import "./language.css";

const languages = [
  { code: 'en', lang: 'English' },
  { code: 'te', lang: 'Telugu' },
  { code: 'hi', lang: 'Hindi' },
  { code: 'fr', lang: 'French' },
];

const LanguageSelector = () => {
  const { i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setDropdownOpen(false); // Close the dropdown after selection
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className='language-translation-btn-container'>
      <img
        src={globeImage}
        alt='Globe'
        className='language-translation-globe-image'
        onClick={toggleDropdown}
        style={{ cursor: 'pointer' }}
      />
      
      {dropdownOpen && (
        <div className='language-translation-dropdown'>
          {languages.map((lng) => (
            <button
              key={lng.code}
              className={lng.code === i18n.language ? 'language-translation-selected' : ''}
              onClick={() => changeLanguage(lng.code)}
            >
              {lng.lang}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
