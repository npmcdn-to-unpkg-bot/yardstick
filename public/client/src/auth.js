function authenticate(store) {
  if(Meteor.user()){
    console.log('found a user yayyyyy')
    store.dispatch({
      type: 'SET_USER',
      user: Meteor.user()
    });
  } else {
     console.log('no user...')
     let token = localStorage.getItem('Meteor.loginToken');
     let id = localStorage.getItem('Meteor.userId');
     let expired = localStorage.getItem('Meteor.loginTokenExpires');
     //expire token
     if(token) {
       console.log('finding...', id)
       let user = Meteor.users.find({ _id: id}).fetch()
       console.log('did we find? ', user)
       store.dispatch({
         type: 'SET_USER',
         user: user
       });
     } else {
       //do something
       browserHistory.push('/')
     }
  }
}

export { authenticate };
