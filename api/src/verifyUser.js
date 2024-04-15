export const verifyUser = async (req, res, next) => {
    // Extract the cookie from the request headers
    const cookie = req.headers.cookie;

    // Check if the cookie exists
    if (cookie) {
        // Split the cookie string into an array of key-value pairs
        const cookiePairs = cookie.split(';').map(pair => pair.trim().split('='));
        
        // Convert the array of key-value pairs into an object
        const cookieObject = Object.fromEntries(cookiePairs);
        
        // Access the user property from the cookie object
        const user = cookieObject.user;
        
        // Now you have the user from the cookie
        console.log(user);
    } else {
        // If there's no cookie, handle the case accordingly
        console.log('No cookie found');
    }

    // Call the next middleware function
    next();
};
