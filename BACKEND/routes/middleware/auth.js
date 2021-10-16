const Users = require("../../DB/models/users");
const jwt = require("jsonwebtoken");

// const isActivatedUser = (user) => {
//   console.log('meta',user.meta.activation)
//   if (user.meta.activation.isActive) {
//     return true;
//   } else {
//     false;
//   }
// };

//
const auth = async (req, res, next) => {

  let token = req.header("Authorization");

  if (!token) return res.status(401).send({ message: "Unauthorized request" });
  token = token.replace("Bearer ", "");



  try {
    token = jwt.verify(token, process.env.SECRET);

    const id = token._id;

    let user = await Users.findOne({ _id: id });

    // if (!isActivatedUser) {
    //   return res.status(401).send({ message: "User is not activated" });
    // }

    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).send({ message: "Can't verify identity" });
  }
};

module.exports = auth;
