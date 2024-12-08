import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home.jsx';
import Adminsignin from './components/signin/Adminsignin.jsx';
import Farmersignin from './components/signin/Farmersignin.jsx';
import Expertsignin from './components/signin/Expertsignin.jsx';
// import Adminhome from './components/admin/Adminhome.jsx';
import Adminhome from './components/admin/NewAdminhome.jsx';
import Addfarmer from './components/admin/Addfarmer.jsx';
import Addexpert from './components/admin/Addexpert.jsx';
import Viewallfarmers from './components/admin/Viewallfarmers.jsx';
import ViewallExperts from './components/admin/Viewallexperts.jsx';
import Viewallsectors from './components/admin/Viewallsectors.jsx';
// import FarmerLogin from './components/Farmer/Farmerlogin.jsx'; 
import Aboutfarmer from './components/Farmer/Aboutfarmer.jsx'; 
import Farmerhome from './components/Farmer/Farmerhome.jsx';
import Experthome from './components/Experts/Experthome.jsx';
import Expertinrequest from './components/Experts/Expertinrequest.jsx';
import Expertweather from './components/Experts/Expertweather.jsx';
// import LanguageSelector from './components/multilingual/languageselector.jsx';
// import Test from './components/multilingual/test.jsx';
import './i18n.js'; // Ensure this is correctly imported
import FarmerRequest from './components/Farmer/Farmerrequest.jsx';
// import Adminlogin from './components/admin/Adminlogin.jsx';
import Signinlayout from './components/signin/Signinlayout.jsx';
import Farmersignup from './components/signin/Farmersignup.jsx';
import Expertsignup from './components/signin/Expertsignup.jsx';
import Approveexpert from './components/admin/Approveexpert.jsx';
import Farmerresponses from './components/Farmer/Farmerresponses.jsx';
import Testmulti from './components/Testmulti';
import './i18n'; // Import i18n configuration
import RequestsChart from './components/admin/Requestschart.jsx';
import Expertresponses from './components/Experts/Expertresponses.jsx';
import Expertcontent from './components/Experts/Expertcontent.jsx';
import Farmerexplorecontent from './components/Farmer/Farmerexplorecontent.jsx';
import FarmerContentDetail from './components/Farmer/FarmerContentDetail.jsx';
import Signin from './components/signin/Signin.jsx';
import Userhome from './components/user/Userhome.jsx';
import Tempsignin from './components/signin/Tempsignin.jsx';
import Expertgemini from './components/Experts/Expertgemini.jsx';
import Financierhome from './components/Financier/Financierhome.jsx';
import AddFinancier from './components/admin/Addfinancier.jsx';
import Addloan from './components/Financier/Addloan.jsx';
import Viewallloans from './components/Financier/Viewallloans.jsx';
import Farmerviewallloans from './components/Farmer/Farmerviewallloans.jsx';
import ApplyLoan from './components/Farmer/Applyloan.jsx';
import Forgotpassword from './components/signin/Forgotpassword.jsx';
import Resetpassword from './components/signin/Resetpassword.jsx';
import { Viewallloanrequests } from './components/Financier/Viewallloanrequests.jsx';
import InteractiveMap from './components/Experts/Interactivemap.jsx';


function App() {
  return (
    <div>
     
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signinlayout" element={<Signinlayout />}/> 
        <Route path="/signin" element={<Signin />}/> 
        <Route path="/forgotpassword" element={<Forgotpassword />}/> 
        <Route path="/resetpassword" element={<Resetpassword />}/> 


        <Route path="/adminsignin" element={<Adminsignin />} />
        <Route path="/farmersignin" element={<Farmersignin />} />
        <Route path="/farmersignup" element={<Farmersignup />} />
        <Route path="/expertsignin" element={<Expertsignin />} />
        <Route path="/expertsignup" element={<Expertsignup />} />


        <Route path="/adminhome" element={<Adminhome />} />
        <Route path='/addfarmer' element={<Addfarmer />} />
        <Route path='/addexpert' element={<Addexpert />} />
        <Route path='/addfinancier' element={<AddFinancier />} />
        <Route path='/viewallfarmers' element={<Viewallfarmers />} />
        <Route path='/viewallexperts' element={<ViewallExperts />} />
        <Route path='/viewallfinanciers' element={<Viewallsectors />} />
        <Route path='/approveexpert' element={<Approveexpert />} />
        <Route path='/admindashboard' element={<RequestsChart />} />





       <Route path="/aboutfarmer" element={<Aboutfarmer/>}/> 
       <Route path="/sendrequest" element={<FarmerRequest/>}/> 
       <Route path="/farmerresponses" element={<Farmerresponses/>}/> 
       <Route path="/farmerhome" element={<Farmerhome />}/> 
       <Route path="/farmerexplorecontent" element={<Farmerexplorecontent />}/> 
       <Route path="/content/:contentid" element={<FarmerContentDetail />} />
       <Route path="/farmer-viewallloans" element={<Farmerviewallloans />}/> 
       <Route path="/applyloan/:loanid" element={<ApplyLoan />} />






       <Route path="/experthome" element={<Experthome />}/> 
       <Route path="/expertinrequests" element={<Expertinrequest />}/> 
       <Route path="/expertweather/:location" element={<Expertweather />} />
       <Route path="/expertresponses" element={<Expertresponses />}/> 
       <Route path='/expertcontent' element={<Expertcontent />} />
       <Route path='/expertgemini' element={<Expertgemini />} />
       <Route path='/interactivemap' element={<InteractiveMap />} />





       <Route path='/financierhome' element={<Financierhome />} />
       <Route path='/addloan' element={<Addloan />} />
       <Route path='/viewallloans' element={<Viewallloans />} />
       <Route path='/viewallloanrequests' element={<Viewallloanrequests />} />





       <Route path="/userhome" element={<Userhome />}/> 

       


       <Route path="/tempsignin" element={<Tempsignin/>}/> 

       <Route path="/test" element={<Testmulti/>}/> 

      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
