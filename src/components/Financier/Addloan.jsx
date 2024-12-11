import React, { useState } from 'react';
import './Addloan.css';
import Financierlayout from './Financierlayout';
import axios from 'axios';
import config from '../../config';
import { useNavigate } from 'react-router-dom';

const Addloan = () => {
    const navigate = useNavigate();
    const [loanDetails, setLoanDetails] = useState({
        loantype: '',
        interestrate: '',
        maxamount: '',
        repaymentperiod: '',
        documentsrequired: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoanDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${config.url}/addloan`, loanDetails, {
                withCredentials: true,
            });
            alert('Loan added successfully!');
            setLoanDetails({
                loantype: '',
                interestrate: '',
                maxamount: '',
                repaymentperiod: '',
                documentsrequired: '',
            });
        } catch (error) {
            console.error('Error adding loan:', error);
            alert('Failed to add loan. Please try again.');
        }
    };

    return (
        <Financierlayout>
            <header className="financier-addloan-header">
                <div className="financier-addloan-overlay">
                    <form className="financier-addloan-form" onSubmit={handleSubmit}>
                        <h2>Financier Add Loan</h2>

                        <div className="financier-addloan-input-group">
                            <label htmlFor="loantype">Loan Type</label>
                            <select
                                id="loantype"
                                name="loantype"
                                value={loanDetails.loantype}
                                onChange={handleChange}
                                required
                            >
                                <option value="">Select Loan Type</option>
                                <option value="Crop Production Loan">Crop Production Loan</option>
                                <option value="Farm Equipment Loan">Farm Equipment Loan</option>
                                <option value="Irrigation Loan">Irrigation Loan</option>
                                <option value="Greenhouse Loan">Greenhouse Loan</option>
                                <option value="Soil Improvement Loan">Soil Improvement Loan</option>
                            </select>
                        </div>

                        <div className="financier-addloan-input-group">
                            <label htmlFor="interestrate">Interest Rate (%)</label>
                            <input
                                type="text"
                                id="interestrate"
                                name="interestrate"
                                value={loanDetails.interestrate}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="financier-addloan-input-group">
                            <label htmlFor="maxamount">Max Amount</label>
                            <input
                                type="text"
                                id="maxamount"
                                name="maxamount"
                                value={loanDetails.maxamount}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="financier-addloan-input-group">
                            <label htmlFor="repaymentperiod">Repayment Period (months)</label>
                            <input
                                type="text"
                                id="repaymentperiod"
                                name="repaymentperiod"
                                value={loanDetails.repaymentperiod}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="financier-addloan-input-group">
                            <label htmlFor="documentsrequired">Documents Required</label>
                            <textarea
                                id="documentsrequired"
                                name="documentsrequired"
                                value={loanDetails.documentsrequired}
                                onChange={handleChange}
                                required
                            ></textarea>
                        </div>

                        <span
                            className="financier-addloan-submit-button"
                            onClick={handleSubmit}
                            role="button"
                        >
                            Submit
                        </span>
                    </form>
                </div>
            </header>
        </Financierlayout>
    );
};

export default Addloan;
