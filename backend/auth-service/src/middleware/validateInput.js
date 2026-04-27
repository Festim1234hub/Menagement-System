const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ 
      message: 'Të gjitha fushat janë të detyrueshme!' 
    });
  }

  if (password.length < 6) {
    return res.status(400).json({ 
      message: 'Fjalëkalimi duhet të ketë minimum 6 karaktere!' 
    });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      message: 'Email-i nuk është i vlefshëm!' 
    });
  }

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ 
      message: 'Email-i dhe fjalëkalimi janë të detyrueshme!' 
    });
  }

  next();
};

module.exports = { validateRegister, validateLogin };