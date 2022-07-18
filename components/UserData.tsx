import React from 'react';
import {View, StyleSheet, Image, Text, Dimensions} from 'react-native';
import {userDataType} from '../types/types';

type props = {
  isDarkMode: boolean;
  totalQuestions: number;
  currentUser: userDataType;
};
export default ({isDarkMode, totalQuestions, currentUser}: props) => {
  const styles = StyleSheet.create({
    imageContainer: {
      width: Dimensions.get('screen').width * 0.2,
      height: Dimensions.get('screen').height * 0.1,
      overflow: 'hidden',
    },
    image: {
      width: Dimensions.get('screen').width * 0.2,
      height: Dimensions.get('screen').height * 0.1,
    },
    text: {
      color: isDarkMode ? 'white' : 'black',
      marginLeft: 10,
    },
    container: {
      justifyContent: 'center',
      flexDirection: 'row',
      padding: 8,
    },
  });
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri: currentUser.avatar}} />
      </View>
      <View>
        <Text style={styles.text}>Username- {currentUser.userName}</Text>
        <Text style={styles.text}>Reputation- {currentUser.reputation}</Text>
        <Text style={styles.text}>
          Total of {totalQuestions} questions found
        </Text>
      </View>
    </View>
  );
};
