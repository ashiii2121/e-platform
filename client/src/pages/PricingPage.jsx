import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PaymentPage.css';

function PaymentPage() {
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const handlePayment = async (plan) => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    if (!userInfo || !userInfo.token) {
      navigate('/login');
      return;
    }

    try {
      // Simulate payment success
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.post('/api/payment', { userId: userInfo._id, amount: plan === 'Monthly' ? 9.99 : plan === 'Yearly' ? 99.99 : 299.99 }, config);

      if (data.success) {
        // Update user info in local storage (simulating payment success)
        const updatedUserInfo = { ...userInfo, isPaid: true, isTrialActive: false };
        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
        alert(`Payment for ${plan} successful!`);
        navigate('/dashboard');
      } else {
        setError('Payment failed. Please try again.');
      }
    } catch (err) {
      setError(err.response && err.response.data.message
        ? err.response.data.message
        : err.message);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2>Choose Your Plan</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="pricing-plans">
          <div className="plan-item">
            <h3>Monthly Plan</h3>
            <p className="price">$9.99/month</p>
            <ul>
              <li>Full access to all videos</li>
              <li>All previous year questions</li>
              <li>All model questions</li>
            </ul>
            <button className="btn primary" onClick={() => handlePayment('Monthly')}>Subscribe Monthly</button>
          </div>
          <div className="plan-item featured">
            <h3>Yearly Plan</h3>
            <p className="price">$99.99/year</p>
            <ul>
              <li>Full access to all videos</li>
              <li>All previous year questions</li>
              <li>All model questions</li>
              <li>2 months free!</li>
            </ul>
            <button className="btn primary" onClick={() => handlePayment('Yearly')}>Subscribe Yearly</button>
          </div>
          <div className="plan-item">
            <h3>Lifetime Access</h3>
            <p className="price">$299.99 (One-time)</p>
            <ul>
              <li>Lifetime access to all content</li>
              <li>Future updates included</li>
              <li>Premium support</li>
            </ul>
            <button className="btn primary" onClick={() => handlePayment('Lifetime')}>Get Lifetime Access</button>
          </div>
        </div>
        <p className="payment-note">
          Your 7-day free trial has ended. Please choose a plan to continue accessing premium content.
        </p>
      </div>
    </div>
  );
}

export default PaymentPage;