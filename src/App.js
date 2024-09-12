import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });

  const formatCardNumber = (number) => {
    return number
      .replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : 
        name === 'cardNumber' ? formatCardNumber(value) : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
    };
    console.log(dataToSend);

    axios.post('http://localhost:5000/api/payments', dataToSend)
      .then(response => {
        toast.success('Payment successful!',{
          autoClose: 3000,
          className: 'toast-success'
        });
        
        setFormData({
          name: '',
          email: '',
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          saveCard: false
        });
      })
      .catch(error => {
        toast.error('Payment failed. Try Again', {
          autoClose: 3000,
          className: 'toast-error'
        });
      });
  };

  return (
    <div className="form-container">
      <img src="/logo.png" alt="Logo" className="logo" width="160px" />
      <h1>Enter Payment Details</h1>
      <form onSubmit={handleSubmit}>
        <label>Name on card:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Email Address:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

        <label>Card Number:</label>
        <input
          type="text"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          maxLength="19"
          required
        />

        <div className="inline-fields">
          <div>
            <label>Expiry Date:</label>
            <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} required />
          </div>
          <div>
            <label>CVV:</label>
            <input type="text" name="cvv" value={formData.cvv} onChange={handleChange} maxLength="3" required />
          </div>
        </div>

        <div className="checkbox-container">
          <input
            type="checkbox"
            name="saveCard"
            checked={formData.saveCard}
            onChange={handleChange}
          />
          <label htmlFor="saveCard">Save this Card for later payments</label>
        </div>

        <button type="submit">Pay Now</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default App;
