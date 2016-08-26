function authenticate(store) {
  firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    store.dispatch({
      type: 'SET_USER',
      user: user
    });
  } else {
    // No user is signed in.
    store.dispatch({
      type: 'SET_USER',
      user: {}
    });
    browserHistory.push('/')
  }
});


}

export { authenticate };
