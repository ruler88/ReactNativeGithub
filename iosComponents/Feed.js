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
  TouchableHighlight
} = React;
var moment = require('moment');

var FeedDetail = require('./FeedDetail');
var AuthService = require('../services/AuthService');

class Feed extends Component {
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([]),
      loading: true
    };
  }

  componentDidMount() {
    this.fetchFeed();
  }

  fetchFeed() {
    AuthService.getAuthInfo((err, authInfo) => {
      var url = 'https://api.github.com/users/'
        + authInfo.user.login
        + '/received_events';

      fetch(url, {
        headers: authInfo.header
      })
      .then((res) => res.json())
      .then((resData) => {
        var feedItems = resData.filter((ev) => {
          return ev.type == 'PushEvent';
        });
        this.setState({
          dataSource: this.state.dataSource.cloneWithRows(feedItems),
          loading: false
        })
      });
    });
  }

  clickRow(rowData) {
    this.props.navigator.push({
      title: 'Feed Details Title',
      component: FeedDetail,
      passProps: {rowData: rowData}
    });
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight
        onPress={() => this.clickRow(rowData)}
        underlayColor='#ddd'>
      <View style={{
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        alignItems: 'center',
        borderColor: '#D7D7D7',
        borderBottomWidth: 1
      }}>
        <Image
            source={{uri: rowData.actor.avatar_url}}
            style={{
                height: 36,
                width: 36,
                borderRadius: 18
            }} />
        <View style={{paddingLeft: 20}}>
        <Text style={{backgroundColor: '#fff'}}>
            {moment(rowData.created_at).fromNow()}
        </Text>
        <Text style={{backgroundColor: '#fff'}}>
            <Text style={{fontWeight: "600"}}>{rowData.actor.login}
            </Text> pushed to
        </Text>
        <Text style={{backgroundColor: '#fff'}}>
            {rowData.payload.ref.replace('refs/heads/', '')}
        </Text>
        <Text style={{backgroundColor: '#fff'}}>
            at <Text style={{fontWeight: "600"}}>{rowData.repo.name}</Text>
        </Text>
        </View>
      </View>
      </TouchableHighlight>
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


module.exports = Feed;
