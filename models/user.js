// using factory method design pattern
const User = (email, hashedPassword, role = "member") => {
  const isAdmin = role === "admin";
  return {
    email: email,
    hashedPassword: hashedPassword,
    role: role,
    since: new Date().toUTCString(),
    isAdmin: isAdmin,
  };
};
module.exports = User;
