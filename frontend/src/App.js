import React, { useState } from 'react';
import GoogleLoginComponent from './components/GoogleLogin';
import CustomerServiceForm from './components/CustomerServiceForm';
import RequestList from './components/RequestList';

function App() {
  const [user, setUser] = useState(null);
  const [category, setCategory] = useState('General Queries');

  const handleLoginSuccess = (response) => {
    setUser(response.profileObj);
  };

  const handleLoginFailure = (response) => {
    console.log('Login failed:', response);
  };

  return (
    <div>
      {!user ? (
        <GoogleLoginComponent
          onLoginSuccess={handleLoginSuccess}
          onLoginFailure={handleLoginFailure}
        />
      ) : (
        <div>
          <h2>Welcome, {user.name}</h2>
          <CustomerServiceForm user={user} />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="General Queries">General Queries</option>
            <option value="Product Features Queries">Product Features Queries</option>
            <option value="Product Pricing Queries">Product Pricing Queries</option>
            <option value="Product Feature Implementation Requests">Product Feature Implementation Requests</option>
          </select>
          <RequestList category={category} />
        </div>
      )}
    </div>
  );
}

export default App;
