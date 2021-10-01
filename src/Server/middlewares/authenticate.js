const jwt = require("jsonwebtoken")

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, "masaischool", (err, user) => {
      if (err) return reject(err)

      if (user) return resolve(user)
    })
  })
}

const authenticate = async function (req, res, next) {
  // bearerToken will be given from redux store
  const bearerToken = req?.headers?.authorization

  const token = bearerToken.split(" ")[1]

  const user = await verifyToken(token)

  req.user = user

  next()
}

module.exports = authenticate
