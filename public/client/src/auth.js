import { browserHistory } from 'react-redux';
var Rebase = require('re-base');

var config = {
  apiKey: "AIzaSyAthBCq_uopCnlQn27DbBmQrHQVEJVfKRo",
  authDomain: "outdoors-1380.firebaseapp.com",
  databaseURL: "https://outdoors-1380.firebaseio.com",
  storageBucket: "outdoors-1380.appspot.com",
};

var base = Rebase.createClass(config);

function authenticate(store) {
  base.auth().onAuthStateChanged(function(user) {
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
