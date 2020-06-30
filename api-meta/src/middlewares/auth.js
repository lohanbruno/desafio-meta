const jwt = require('jsonwebtoken');
const { promisify } = require('util');

module.exports = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  try {
    await promisify(jwt.verify)(token, process.env.APP_SECRET);

    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
