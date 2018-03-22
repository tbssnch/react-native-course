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
   Image
 } from 'react-native';
 import data from '../data/courses.json';
 import Icon from 'react-native-vector-icons/MaterialIcons';


 const ds = new ListView.DataSource({
   rowHasChanged: (r1, r2) => r1 !== r2

 });

 const toDelete = new Set(['react']);
 const newData = data.filter(obj => !toDelete.has(obj.category));
 const dataSource = ds.cloneWithRows(newData);

type Props = {};
export default class NativeCourses extends Component<Props> {
  static navigationOptions = {
      tabBarLabel: 'React Native Courses',
      tabBarIcon: ({ tintColor }) => (
        <Icon
          name={'settings-cell'}
          size={26}
          style={{ color: tintColor }} />
      )
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>React Native Courses</Text>
        <ListView
          dataSource={dataSource}
          renderRow={(rowData) =>
            <View>
              <Text>{rowData.title}</Text>
              <Text>{rowData.description}</Text>
              <Text>{rowData.views}</Text>
              <Text>{rowData.link}</Text>
              <Image source={{uri: rowData.image}}
                style={{width: 400, height: 200}}
              />
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
    backgroundColor: '#F5FCFF',
    paddingTop: 10,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  icon: {
    width: 26,
    height: 26,
  }
});
