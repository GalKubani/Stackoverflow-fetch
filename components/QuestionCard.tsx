import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from 'react-native';

type props = {questionData: any; isDarkMode: boolean};

export default ({questionData, isDarkMode}: props) => {
  const [isVisible, setIsVisible] = useState(false);

  const styles = StyleSheet.create({
    card: {
      width: 240,
      marginTop: 15,
      marginBottom: 10,
      height: 240,
      shadowColor: isDarkMode ? 'white' : 'black',
      shadowOffset: {width: 0, height: 2},
      shadowRadius: 6,
      shadowOpacity: 0.26,
      elevation: 8,
      backgroundColor: isDarkMode ? 'black' : 'white',
      padding: 10,
      borderRadius: 10,
    },
    questionContainer: {
      width: Dimensions.get('screen').width * 0.9,
      margin: 8,
      borderBottomWidth: 1,
      borderColor: '#ccc',
    },
    text: {
      color: isDarkMode ? 'white' : 'black',
    },
    modalText: {
      marginVertical: 4,
    },
    title: {
      fontSize: 13,
      height: 45,
      textAlign: 'center',
      fontWeight: 'bold',
    },
    modal: {
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      backgroundColor: isDarkMode ? 'black' : 'white',
    },
    modalBackIcon: {
      height: 30,
      width: 30,
      backgroundColor: 'white',
      borderRadius: 15,
    },
  });
  return (
    <View>
      <TouchableOpacity
        style={styles.questionContainer}
        onPress={() => {
          setIsVisible(true);
        }}>
        <Text style={{...styles.text, ...styles.title}}>
          {questionData.item.title}
        </Text>
      </TouchableOpacity>
      <Modal visible={isVisible} animationType="slide">
        <View style={styles.modal}>
          <View style={{...styles.card}}>
            <TouchableOpacity
              onPress={() => {
                setIsVisible(false);
              }}>
              <Image
                style={[styles.modalBackIcon]}
                source={
                  isDarkMode
                    ? require('./back-button-dark.png')
                    : require('./back-button.png')
                }
              />
            </TouchableOpacity>
            <Text style={{...styles.text, ...styles.modalText}}>
              Title: {questionData.item.title}
            </Text>
            <Text style={{...styles.text, ...styles.modalText}}>
              Created at:{' '}
              {new Date(questionData.item.creationDate).toDateString()}
            </Text>
            <Text style={{...styles.text, ...styles.modalText}}>
              Total views: {questionData.item.totalViews}
            </Text>
            <Text style={{...styles.text, ...styles.modalText}}>
              Total answers: {questionData.item.answerCount}
            </Text>
            <Text style={{...styles.text, ...styles.modalText}}>
              Link: {questionData.item.link}
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
};
