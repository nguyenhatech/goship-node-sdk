import {compareArray} from '../Helpers'
function ValidateAuthException (message) {
  this.message = message
  this.name = "Validate authentication exception"
}

class ValidateAuth {
  constructor () {
    this.defaultAuth = {
      username: null,
      password: null,
      client_id: null,
      client_secret: null,
    }
  }
  valid (auth) {
    let checkAuth = compareArray(Object.keys(this.defaultAuth), Object.keys(auth))
    if (!checkAuth.status) {
      throw new ValidateAuthException(`Missing ${checkAuth.value}`)
    } else {
      for (const key of Object.keys(auth)) {
        if (this.defaultAuth.hasOwnProperty(key) && (auth[key] === null || auth[key] === '')) {
          throw new ValidateAuthException(`Value of ${key} can't empty`)
        }
      }
    }
    return true
  }
}
export default new ValidateAuth()
