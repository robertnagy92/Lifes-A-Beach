const authorize = (req, res, next) => {
  console.log('See I\'m here')
  // check if the user is loggedIn

  // If the session has the 'userInfo' property, it means the user is loggedIn
  if (req.session.user) {
    // Calls the next middleware function 
    next()
  }
  else {
    res.redirect('/signin')
  }
  
}

module.exports = authorize;