import express from 'express';
import * as responsor from 'Utils/responsor';
import * as authorization from 'Utils/authorization';

const router = express.Router();

router.get('/public', (req, res) => {
  responsor.sendData(res, { loginUser: req.user });
});

router.get('/private', authorization.requireLogin, (req, res) => {
  responsor.sendData(res, { loginUser: req.user });
});

export default router;
