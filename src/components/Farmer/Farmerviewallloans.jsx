import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Farmerlayout from './Farmerlayout';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './Farmerviewallloans.css';
import config from '../../config';

const Farmerviewallloans = () => {
    const [sessionStatus, setSessionStatus] = useState(null);
    const [error, setError] = useState(null);
    const [loans, setLoans] = useState([]);
    const [filteredLoans, setFilteredLoans] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortType, setSortType] = useState('loanType');
    const { t } = useTranslation();
    const navigate = useNavigate();

    useEffect(() => {
        const checkSession = async () => {
            try {
                const response = await axios.get(`${config.url}/checkfarmersession`, {
                    withCredentials: true,
                });
                setSessionStatus(response.data);
                if (response.data === 0) {
                    alert(t('sessionExpired'));
                    navigate('/signin');
                }
            } catch (error) {
                console.error('Error checking session status:', error);
                setError(t('sessionCheckError'));
            }
        };
        checkSession();
    }, [navigate, t]);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await axios.get(`${config.url}/viewallloans`);
                setLoans(response.data);
                setFilteredLoans(response.data);
            } catch (error) {
                console.error('Error fetching loans:', error);
            }
        };
        if (sessionStatus === 1) {
            fetchLoans();
        }
    }, [sessionStatus]);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = loans.filter((loan) =>
            loan.loantype.toLowerCase().includes(query)
        );
        setFilteredLoans(filtered);
    };

    const handleSort = (criteria) => {
        setSortType(criteria);

        const sorted = [...filteredLoans].sort((a, b) => {
            if (criteria === 'loanType') {
                return a.loantype.localeCompare(b.loantype);
            } else if (criteria === 'maxAmount') {
                return b.maxamount - a.maxamount;
            } else if (criteria === 'interestRate') {
                return b.interestrate - a.interestrate;
            }
            return 0;
        });

        setFilteredLoans(sorted);
    };

    const handleApplyLoan = (loan) => {
        navigate(`/applyloan/${loan.loanid}`, { state: { loan } });
    };

    if (sessionStatus === null) {
        return <div>{t('loading')}</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Farmerlayout>
            <header className="farmer-viewallloans-header">
                <div className="farmer-viewallloans-overlay">
                    <div className="farmer-viewallloans-controls">
                        <input
                            type="text"
                            placeholder={t('searchByLoanType')}
                            value={searchQuery}
                            onChange={handleSearch}
                            className="farmer-viewallloans-search-bar"
                        />
                        <select
                            onChange={(e) => handleSort(e.target.value)}
                            className="farmer-viewallloans-sort-dropdown"
                            value={sortType}
                        >
                            <option value="loanType">{t('sortByLoanType')}</option>
                            <option value="maxAmount">{t('sortByMaxAmount')}</option>
                            <option value="interestRate">{t('sortByInterestRate')}</option>
                        </select>
                    </div>

                    <div className="farmer-viewallloans-loans-container">
                        {filteredLoans.map((loan) => (
                            <div key={loan.loanid} className="farmer-viewallloans-loan-card">
                                <h3>{loan.loantype}</h3>
                                <p>
                                    <strong>{t('loanID')}:</strong> {loan.loanid}
                                </p>
                                <p>
                                    <strong>{t('interestRate')}:</strong> {loan.interestrate}%
                                </p>
                                <p>
                                    <strong>{t('maxAmount')}:</strong> ${loan.maxamount}
                                </p>
                                <p>
                                    <strong>{t('repaymentPeriod')}:</strong> {loan.repaymentperiod} {t('months')}
                                </p>
                                <span
                                    className="farmer-viewallloans-apply-button"
                                    onClick={() => handleApplyLoan(loan)}
                                >
                                    {t('applyLoan')}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </header>
        </Farmerlayout>
    );
};

export default Farmerviewallloans;
