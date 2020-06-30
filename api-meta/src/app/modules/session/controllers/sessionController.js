const jwt = require('jsonwebtoken');

class SessionController {
  async generateToken(req, res) {
    const id = 1; //gerando token e abstraindo login de usuario
    const token = jwt.sign({ id }, process.env.APP_SECRET, {
      expiresIn: '1d'
    });

    return res.json({ token });
  }
}

module.exports = new SessionController();
