/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  ListView,
  Image,
  Linking,
  TouchableOpacity
} from 'react-native';
import data from '../data/courses.json';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getTheme } from 'react-native-material-kit';

const theme = getTheme();

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2

});

const toDelete = new Set(['native']);
const newData = data.filter(obj => !toDelete.has(obj.category));
const dataSource = ds.cloneWithRows(newData);

type Props = {};
export default class ReactCourses extends Component<Props> {
  static navigationOptions = {
      tabBarLabel: 'React Courses',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name={'home'}
          size={26}
          style={{ color: tintColor }} />
      )
  }

  handleClick = (link) => {
    Linking.canOpenURL(link).then(supported => {
      if (supported) {
        Linking.openURL(link);
      } else {
        console.log("Cannot open URL: " + link);
      }
    });
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>React Courses</Text>
        <ListView
          dataSource={dataSource}
          renderRow={(rowData) =>
            <View style={[theme.cardStyle, styles.card]}>
              <Image source={{uri: rowData.image}}
                style={theme.cardImageStyle}
                />
              <Text style={[theme.cardTitleStyle, styles.title]}>{rowData.title}</Text>
              <Text style={theme.cardContentStyle}>{rowData.description}</Text>
              <Text style={[theme.cardActionStyle, styles.action]}
                onPress={() => {
                  this.handleClick(rowData.link)
                }}
              >Tap to Course</Text>
            </View>
          }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    backgroundColor: '#F5FCFF',
    paddingTop: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    margin: 10,
  },
  card: {
    marginTop: 10,
  },
  icon: {
    width: 26,
    height: 26,
  },
  list: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  title: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 373,
    left: 0,
    fontSize: 15,
    backgroundColor: 'rgba(245, 252, 255, 0.40)',
  },
  action: {
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#f5fcff',
  },
});
