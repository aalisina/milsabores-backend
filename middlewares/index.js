const jwt = require('jsonwebtoken');

module.exports = {
  verifyTokenUser: async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      // Bearer eyJhbGciOiJIUz9.eyJpZCI6IjVmMDN.jNTFkZWUw
      // authorization.split(' '); // -> [ "Bearer", "eyJhbG..." ]
      const token = authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.decoded = decoded;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Auth error' });
    }
  },
  verifyTokenAdmin: async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      // Bearer eyJhbGciOiJIUz9.eyJpZCI6IjVmMDN.jNTFkZWUw
      // authorization.split(' '); // -> [ "Bearer", "eyJhbG..." ]
      const token = authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { role } = decoded;
      if (role === 'ADMIN') {
        req.decoded = decoded;
        next();
      } else {
        res.status(400).json({ message: 'Not authorized as admin' });
      }
    } catch (err) {
      res.status(401).json({ message: 'Auth error' });
    }
  },
  verifySocketAdmin: (socket, next) => {
    try {
      const { token } = socket.handshake.headers;
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { role } = decoded;

      if (role === 'ADMIN') {
        next();
      } else {
        next(new Error('Unauthorized user.'));
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  },
};
