import React from 'react';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Home from './components/home';
import SignIn from './components/sign';
import Customer from './components/customerpage';
import SignUp from './components/signup';
import Admin from './components/adminpage';
import AddProduct from './components/addproduct';
import Payment from './components/paymentgateway';
 
import Result from './components/resultpage';
import Profile from './components/profile';
import Tracking from './components/tracking';
import Contact from './components/contact';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/user" element={<Customer />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/payment" element={<Payment />} />
          
          <Route path="/result" element={<Result />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path='/contact' element={<Contact/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
