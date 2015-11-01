'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Component
} = React;

var SearchResult = require('./SearchResult');

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>

        <TextInput
          onChangeText={(text)=> this.setState({searchQuery: text})}
          style={styles.input}
          placeholder="Github Search Query" />
        <TouchableHighlight
          style={styles.button}
          onPress={this.onSearchPressed.bind(this)}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableHighlight>
      </View>
    );
  }

  onSearchPressed() {
    this.props.navigator.push({
      title: 'Search Detail Title',
      component: SearchResult,
      passProps: {searchQuery: this.state.searchQuery}
    })
  }
}


var styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 90,
    alignItems: 'center',
    padding: 10
  },
  logo: {
    width: 66,
    height: 55
  },
  heading: {
    fontSize: 30,
    marginTop: 10
  },
  input: {
    height: 50,
    marginTop: 10,
    padding: 4,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#48bbec'
  },
  button: {
    height: 50,
    backgroundColor: '#48BBEC',
    alignSelf: 'stretch',
    marginTop: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 22,
    color: '#FFF',
    alignSelf: 'center'
  }
});

module.exports = Search;
