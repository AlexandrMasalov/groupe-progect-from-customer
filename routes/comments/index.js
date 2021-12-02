const router = require('express').Router();
const { Comment } = require('../../db/models');

router
  .route('/')
  .post(async (req, res) => {
    const { body, orderId, clientId } = req.body;
    const newComment = await Comment.create({
      body, order_id: Number(orderId), client_id: Number(clientId), author: req.session.user,
    });
    if (newComment) {
      res.json(newComment);
    }
  });

module.exports = router;
