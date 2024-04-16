export const verifyUser = async (req, res, next) => {
  const cookie = req.headers.cookie;

  if (cookie) {
    const cookiePairs = cookie.split(";").map((pair) => pair.trim().split("="));

    const cookieObject = Object.fromEntries(cookiePairs);

    const user = cookieObject.user;

    console.log(user);
  } else {
    console.log("No cookie found");
  }

  next();
};
