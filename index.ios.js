/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ActivityIndicatorIOS
} = React;

var Login = require('./iosComponents/Login');
var AppContainer = require('./iosComponents/AppContainer');
var AuthService = require('./services/AuthService');

var ReactNativeGithub = React.createClass({
  getInitialState: function() {
    return {
      isLoggedIn: false,
      checkingAuth: true
    };
  },

  componentDidMount: function() {
    AuthService.getAuthInfo((err, authInfo) => {
      this.setState({
        checkingAuth: false,
        isLoggedIn: authInfo != null
      });
    });
  },

  onLogin: function() {
    this.setState({ isLoggedIn: true });
  },

  render: function() {
    if (this.state.checkingAuth) {
      return (
        <View style={styles.container}>
          <ActivityIndicatorIOS
            animating={true}
            size="large"
            style={styles.loader} />
        </View>
      )
    }

    if (this.state.isLoggedIn) {
      return (
        <AppContainer />
      )
    } else {
      return (
        <Login onLogin={this.onLogin}/>
      );
    }
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ReactNativeGithub', () => ReactNativeGithub);
