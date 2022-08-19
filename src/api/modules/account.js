import axios from 'axios'

const account = {
  login: (username, password) => {
    const request = axios({
      method: 'post',
      data: {
        username: username,
        password: password
      },
      url: '/api-ezbook/account/login/'
    })
    return request
  },
  createAccount: ( obj, jwt ) => {
    const request = axios({
      method: 'post',
      headers: {
        jwt: jwt
      },
      data: {
        newAccountObj: obj
      },
      url: '/api-ezbook/accounts/'
    })
    return request
  },
  testToken: (jwt) => {
    const request = axios({
      method: 'post',
      data: {
        jwt: jwt
      },
      url: '/api-ezbook/account/testtoken/'
    })
    return request
  }
}
export default account
