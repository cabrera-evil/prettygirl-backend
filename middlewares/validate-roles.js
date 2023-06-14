const { response } = require("express");

// Validate if the user has admin role
const isAdminRole = (req, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: "Require validate token first",
    });
  }

  const { role, name } = req.user;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `User: ${name} is not admin`,
    });
  }

  next();
};

// Validate the role permissions required to perform an action
const hasRole = (...roles) => {
  return (req, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: "Require validate token first",
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `User: ${req.user.name}  do not have permissions to perform this action, required roles: ${roles}`,
      });
    }
    next();
  };
};

module.exports = {
  isAdminRole,
  hasRole,
};
