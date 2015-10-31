'use strict';

var React = require('react-native');
var {
  AppRegistry,
  Text,
  View,
  Image,
  ListView,
  Component
} = React;
var moment = require('moment');

class FeedDetail extends Component {
  constructor(props) {
    super(props);

    console.log(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.rowData.payload.commits)
    };
  }

  renderRow(rowData) {
    return (
      <View style={{
          flex: 1,
          justifyContent: 'center',
          borderColor: '#D7D7D7',
          borderBottomWidth: 1,
          paddingTop: 20,
          paddingBottom: 20,
          padding: 10
      }}>
          <Text>{rowData.sha.substring(0, 6)} - {rowData.message}</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={{
        flex: 1,
        paddingTop: 79,
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
        <Image
            source={{uri: this.props.rowData.actor.avatar_url}}
            style={{
                height: 120,
                width: 120,
                borderRadius: 60}} />

        <Text style={{
            paddingTop: 20,
            paddingBottom: 20,
            fontSize: 20
          }}>
          {moment(this.props.rowData.created_at).fromNow()}
        </Text>

        <Text>{this.props.rowData.actor.login} pushed to</Text>
        <Text>{this.props.rowData.payload.ref.replace('refs/heads/', '')} at</Text>
        <Text>{this.props.rowData.repo.name}</Text>
        <Text>{this.props.rowData.payload.commits.length} Commits</Text>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)} />
      </View>
    )
  }
}


module.exports = FeedDetail;
