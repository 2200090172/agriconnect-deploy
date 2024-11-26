import React from 'react';
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home.jsx';
import Adminsignin from './components/signin/Adminsignin.jsx';
import Farmersignin from './components/signin/Farmersignin.jsx';
import Publicsignin from './components/signin/Publicsignin.jsx';
import Expertsignin from './components/signin/Expertsignin.jsx';
// import Adminhome from './components/admin/Adminhome.jsx';
import Adminhome from './components/admin/NewAdminhome.jsx';
import Addfarmer from './components/admin/Addfarmer.jsx';
import Addexpert from './components/admin/Addexpert.jsx';
import AddSector from './components/admin/Addsector.jsx';
import Viewallfarmers from './components/admin/Viewallfarmers.jsx';
import ViewallExperts from './components/admin/Viewallexperts.jsx';
import Viewallsectors from './components/admin/Viewallsectors.jsx';
import About from './components/Public/About.jsx'; 
// import FarmerLogin from './components/Farmer/Farmerlogin.jsx'; 
import Aboutfarmer from './components/Farmer/Aboutfarmer.jsx'; 
import PublicLogin from './components/Public/PublicLogin.jsx'; 
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


function App() {
  return (
    <div>
     
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signinlayout" element={<Signinlayout />}/> 


        <Route path="/adminsignin" element={<Adminsignin />} />
        <Route path="/farmersignin" element={<Farmersignin />} />
        <Route path="/farmersignup" element={<Farmersignup />} />
        <Route path="/publicsignin" element={<Publicsignin />} />
        <Route path="/expertsignin" element={<Expertsignin />} />
        <Route path="/expertsignup" element={<Expertsignup />} />


        <Route path="/adminhome" element={<Adminhome />} />
        <Route path='/addfarmer' element={<Addfarmer />} />
        <Route path='/addexpert' element={<Addexpert />} />
        <Route path='/addsector' element={<AddSector />} />
        <Route path='/viewallfarmers' element={<Viewallfarmers />} />
        <Route path='/viewallexperts' element={<ViewallExperts />} />
        <Route path='/viewallsectors' element={<Viewallsectors />} />
        <Route path='/approveexpert' element={<Approveexpert />} />
        <Route path='/admindashboard' element={<RequestsChart />} />





       <Route path="/aboutfarmer" element={<Aboutfarmer/>}/> 
       <Route path="/sendrequest" element={<FarmerRequest/>}/> 
       <Route path="/farmerresponses" element={<Farmerresponses/>}/> 
       <Route path="/farmerhome" element={<Farmerhome />}/> 




       <Route path="/experthome" element={<Experthome />}/> 
       <Route path="/expertinrequests" element={<Expertinrequest />}/> 
       <Route path="/expertweather/:location" element={<Expertweather />} />
       <Route path="/expertresponses" element={<Expertresponses />}/> 



        {/* <Route path='/multilingual' element={<Test />} /> */}
       <Route path="/publicsignin" element={<PublicLogin/>}/> 
       

       <Route path="/test" element={<Testmulti/>}/> 

      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
