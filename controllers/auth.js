const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  //   const isLoggedIn = req.get("Cookie").split(";")[0].trim().split("=")[1];
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: req.session.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  User.findById("6a3a661b2353f2748a5f9d52")
    .then((user) => {
      if (!user) {
        return res.redirect("/login");
      }

      req.session.isLoggedIn = true;

      // FIX: Store user data by converting the document to a plain object
      // This turns the Mongoose ObjectId into a plain text string
      req.session.user = user;

      req.session.save((err) => {
        if (err) console.log(err);
        res.redirect("/");
      });
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};
exports.postLogout = (req, res, next) => {
  //   res.setHeader("Set-Cookie", "loggedIn=true; Max-age=10;  Secure");

  req.session.destroy(() => {
    res.redirect("/");
  });
};
