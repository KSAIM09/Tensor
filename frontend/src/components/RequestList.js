import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RequestList = ({ category }) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get(`/api/requests/${category}`).then(response => {
      setRequests(response.data);
    }).catch(err => {
      console.error(err);
    });
  }, [category]);

  return (
    <div>
      <h2>{category}</h2>
      <ul>
        {requests.map(request => (
          <li key={request._id}>{request.comment}</li>
        ))}
      </ul>
    </div>
  );
};

export default RequestList;
