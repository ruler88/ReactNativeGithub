'use strict';
//tabs components

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Component,
  TabBarIOS,
  NavigatorIOS
} = React;

var Feed = require('./Feed');

class AppContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'feed'
    }
  }

  render() {
    return (
      <TabBarIOS style={styles.container}>
        <TabBarIOS.Item
          title="Feed"
          selected={this.state.selectedTab == 'feed'}
          icon={require('image!inbox')}
          onPress={() => this.setState({selectedTab: 'feed'})} >
          <NavigatorIOS
            style={{flex: 1}}
            initialRoute={{
              component: Feed,
              title: 'Feed Title' }}/>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Search"
          selected={this.state.selectedTab == 'search'}
          icon={require('image!search')}
          onPress={() => this.setState({selectedTab: 'search'})} >
          <Text style={styles.welcome}>Tab 2 </Text>
        </TabBarIOS.Item>
      </TabBarIOS>
    )
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 30,
  }
});

module.exports = AppContainer;
