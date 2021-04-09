import {environment} from "../environment";

export const apiUrls = {

  // login: 'http://192.168.1.185:7000/login',
  login: environment.baseUrl + '/login',
  // delete: 'http://192.168.1.185:7000/deleteLogs',
  delete: environment.baseUrl + '/deleteLogs',
  // signout: 'http://192.168.1.185:7000/logout',
  signout: environment.baseUrl + '/logout',

  // signup: 'http://127.0.0.1:8000/accounts/api/auth/register',
  // check:'http://127.0.0.1:8000/products/'

}
