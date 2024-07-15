const axios = require('axios');
const Request = require('../models/Request');

exports.createRequest = (req, res) => {
  const { userId, category, comment } = req.body;
  const newRequest = new Request({ userId, category, comment });
  newRequest.save().then(request => {
    axios.post('https://api.intercom.io/messages', {
      from: { type: 'user', id: userId },
      body: comment,
    }, {
      headers: { 'Authorization': `Bearer ${process.env.INTERCOM_ACCESS_TOKEN}` }
    }).then(() => {
      res.status(200).send(request);
    }).catch(err => {
      res.status(500).send(err);
    });
  }).catch(err => {
    res.status(500).send(err);
  });
};

exports.getRequestsByCategory = (req, res) => {
  const { category } = req.params;
  Request.find({ category }).then(requests => {
    res.status(200).send(requests);
  }).catch(err => {
    res.status(500).send(err);
  });
};
