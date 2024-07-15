import React, { useState } from 'react';
import axios from 'axios';

const CustomerServiceForm = ({ user }) => {
  const [category, setCategory] = useState('General Queries');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('/api/request', {
      userId: user.googleId,
      category,
      comment,
    }).then(response => {
      console.log(response.data);
    }).catch(err => {
      console.error(err);
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="General Queries">General Queries</option>
        <option value="Product Features Queries">Product Features Queries</option>
        <option value="Product Pricing Queries">Product Pricing Queries</option>
        <option value="Product Feature Implementation Requests">Product Feature Implementation Requests</option>
      </select>
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CustomerServiceForm;
