import React, { useState, useEffect } from 'react';
import Financierlayout from './Financierlayout';
import './Viewallloans.css';
import axios from 'axios';
import config from '../../config';

const ViewAllLoans = () => {
  const [loans, setLoans] = useState([]); // Full loan data
  const [filteredLoans, setFilteredLoans] = useState([]); // Loans displayed after filtering or sorting
  const [searchQuery, setSearchQuery] = useState(''); // Search query
  const [sortType, setSortType] = useState('loanType'); // Default sort by loan type

  // Fetch loans from the API
  const fetchLoans = async () => {
    try {
      const response = await axios.get(`${config.url}/viewallloans`);
      setLoans(response.data);
      setFilteredLoans(response.data);
    } catch (error) {
      console.error('Error fetching loans:', error);
    }
  };

  // Handle search functionality
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = loans.filter((loan) =>
      loan.loantype.toLowerCase().includes(query)
    );
    setFilteredLoans(filtered);
  };

  // Handle sorting functionality
  const handleSort = (criteria) => {
    setSortType(criteria);

    const sorted = [...filteredLoans].sort((a, b) => {
      if (criteria === 'loanType') {
        return a.loantype.localeCompare(b.loantype);
      } else if (criteria === 'maxAmount') {
        return b.maxamount - a.maxamount; // Sort by max amount in descending order
      } else if (criteria === 'interestRate') {
        return b.interestrate - a.interestrate; // Sort by interest rate in descending order
      }
      return 0;
    });

    setFilteredLoans(sorted);
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <Financierlayout>
      <header className="financier-viewallloans-header">
        <div className="financier-viewallloans-overlay">
          <div className="controls">
            <input
              type="text"
              placeholder="Search by loan type..."
              value={searchQuery}
              onChange={handleSearch}
              className="search-bar"
            />
            <select
              onChange={(e) => handleSort(e.target.value)}
              className="sort-dropdown"
              value={sortType}
            >
              <option value="loanType">Sort by Loan Type</option>
              <option value="maxAmount">Sort by Max Amount</option>
              <option value="interestRate">Sort by Interest Rate</option>
            </select>
          </div>

          <div className="loans-container">
            {filteredLoans.map((loan) => (
              <div key={loan.loanid} className="loan-card">
                <h3>{loan.loantype}</h3>
                <p>
                  <strong>Loan ID:</strong> {loan.loanid}
                </p>
                <p>
                  <strong>Interest Rate:</strong> {loan.interestrate}%
                </p>
                <p>
                  <strong>Max Amount:</strong> ${loan.maxamount}
                </p>
                <p>
                  <strong>Repayment Period:</strong> {loan.repaymentperiod} months
                </p>
              </div>
            ))}
          </div>
        </div>
      </header>
    </Financierlayout>
  );
};

export default ViewAllLoans;
