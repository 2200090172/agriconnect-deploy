import React from 'react';
import LanguageSelector from './Languageselector';
import { useTranslation } from 'react-i18next';
import Farmerlayout from './Farmer/Farmerlayout';

const Testmulti = () => {
    const { t } = useTranslation(); 
    const { line1, line2 } = t("description", { 
      name: "Aravind" // This name will not be translated
    });
    return (
        <Farmerlayout>
          <div className="farmer-responses-container">
            <div className="farmer-responses-overlay">
                <LanguageSelector />
              <div className="language-container">
                <h1>{t("greeting")}</h1>
                <p>{line1}</p>
                <span>{line2}</span>
              </div> 
            </div>
          </div>
        </Farmerlayout>
    );
}

export default Testmulti;
