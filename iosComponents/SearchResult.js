'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Text,
  View,
  Image,
  ListView,
  Component,
  ActivityIndicatorIOS,
  TouchableHighlight,
  StyleSheet
} = React;

class SearchResult extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      loading: true
    };
  }

  componentDidMount() {
    this.doSearch();
  }

  doSearch() {
    var url = 'https://api.github.com/search/repositories?q=' +
      encodeURIComponent(this.props.searchQuery);

    fetch(url)
    .then((res) => res.json())
    .then((resJson) => {
      this.setState({
        repositories: resJson.repositories,
        dataSource: this.state.dataSource.cloneWithRows(resJson.items)
      });
    })
    .finally(() => {
      this.setState({loading: false});
    })
  }

  renderRow(rowData) {
    console.log(rowData);
    return (
      <View style={{
        padding: 20,
        borderColor: '#D7D7D7',
        borderBottomWidth: 1,
        backgroundColor: '#fff'
      }}>
        <Text style={{
          fontSize: 20,
          fontWeight: '600'
        }}>{rowData.full_name}</Text>

        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
          marginBottom: 20
        }}>
          {/* Star Count */}
          <View style={styles.repoCell}>
            <Image source={require('image!star')}
              style={styles.repoCellIcon}></Image>
            <Text style={styles.repoCellLabel}>
              {rowData.stargazers_count}
            </Text>
          </View>

          {/* Fork Count */}
          <View style={styles.repoCell}>
            <Image source={require('image!fork')}
              style={styles.repoCellIcon}></Image>
            <Text style={styles.repoCellLabel}>
              {rowData.forks}
            </Text>
          </View>

          {/* Issues Count */}
          <View style={styles.repoCell}>
            <Image source={require('image!issues2')}
              style={styles.repoCellIcon}></Image>
            <Text style={styles.repoCellLabel}>
              {rowData.forks}
            </Text>
          </View>

        </View>
      </View>
    )
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={{
          flex: 1,
          justifyContent: 'center'
        }}>
          <ActivityIndicatorIOS
            animating={true}
            size="large" />
        </View>
      )
    }
    return (
      <View style={{
        flex: 1,
        justifyContent: 'flex-start',
        marginTop: 50
      }}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
      </View>
    )
  }
}

var styles = StyleSheet.create({
  repoCell: {
    width: 50,
    alignItems: 'center'
  },

  repoCellIcon: {
    width: 20,
    height: 20
  },

  repoCellLabel: {
    textAlign: 'center'
  }
});


module.exports = SearchResult;
