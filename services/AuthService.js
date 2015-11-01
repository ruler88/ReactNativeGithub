var _      = require('lodash');
var buffer = require('buffer');
var AsyncStorage = require('react-native').AsyncStorage;

//Objective-C native code
var encoding = require('NativeModules').Encoding;

const authKey = 'auth';
const userKey = 'user';

class AuthService {
  getAuthInfo(callback) {
    AsyncStorage.multiGet([authKey, userKey], (err, val) => {
      if (err) {
        return callback(err);
      } else if (!val) {
        return callback();
      }

      var zippedObj = _.zipObject(val);
      if (!zippedObj[authKey]) {
        return callback();
      }

      var authInfo = {
        header: {
          Authorization: 'Basic ' + zippedObj[authKey]
        },
        user: JSON.parse(zippedObj[userKey])
      }
      return callback(null, authInfo);
    });
  }

  login(credentials, callback) {
    var authStr = credentials.username + ':' + credentials.password;
    var b = new buffer.Buffer(authStr);
    var encodedAuthDup = b.toString('base64');

    encoding.base64Encode(authStr, (encodedAuth) => {
      console.log(encodedAuthDup);
      console.log(encodedAuth);

      fetch('https://api.github.com/user', {
        headers: {
          'Authorization': 'Basic ' + encodedAuth
        }
      })
      .then((response) => {
        // check if authorization is successful via status code
        if (response.status >= 200 && response.status < 300) {
          return response;
        }

        throw {
          badCredentials: response.status == 401,
          unknownError: response.status != 401
        }
      })
      .then((response) => {
        return response.json();
      })
      .then((results) => {
        AsyncStorage.multiSet([
          [authKey, encodedAuth],
          [userKey, JSON.stringify(results)]
        ], (err) => {
          if (err) throw err;
          callback({success: true});
        });
      })
      .catch((err) => {
        callback(err);
      })
      .finally(() => {
        this.setState({showProgress: false});
      });
    });


  }
}

module.exports = new AuthService();
