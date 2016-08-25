'use strict'
const Database = use('Database')

class UserController {
  * index (request, response) {
        const users = yield Database.select().from('users')
        response.json(users)
    }

  * signUp (request, response) {
    response.send('yarrrrr')
  }

   * login (request, response) {
        const email = request.input('email')
        const password = request.input('password')
        const login = yield request.auth.attempt(email, password)

        if (login) {
            response.send('Logged In Successfully')
            return
        }

        response.unauthorized('Invalid credentails')
    }

    * profile (request, response) {
        const user = yield request.auth.getUser()

        if (user) {
            response.ok(user)
            return
        }

        response.unauthorized('You must login to view your profile')
    }
}

module.exports = UserController
