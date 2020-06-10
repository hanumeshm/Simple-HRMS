const jwt = require ("jsonwebtoken");

module.exports = (req, res, next) => {
  try{
  const token = req.headers.authorization.split(' ')[1];
  const payload = jwt.verify(token, process.env.JWT_KEY);

  if(!payload)
    return res.status(401).json({message:'Unauthorized request'})

  //req.email = payload.subject
  next()
  }
  catch{
    return res.status(401).json({message:'Unauthorized request'})
  }
}
