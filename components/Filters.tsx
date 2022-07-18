import React, {useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {questionType} from '../types/types';

type props = {
  isDarkMode: boolean;
  setSortedQuestions: Function;
  questions: questionType[];
};

export default ({isDarkMode, setSortedQuestions, questions}: props) => {
  const [highlightedSortIndex, setHighlightedSortIndex] = useState<number>(0);
  const sortHandler = (option: string) => {
    let sortedArray: questionType[] = [...questions];
    switch (option) {
      case 'views':
        sortedArray.sort((a: any, b: any) => {
          return b.totalViews - a.totalViews;
        });
        setSortedQuestions(sortedArray);
        break;
      case 'answers':
        sortedArray.sort((a: any, b: any) => {
          return b.answerCount - a.answerCount;
        });
        setSortedQuestions(sortedArray);
        break;
      default:
        sortedArray.sort((a: any, b: any) => {
          return b.creationDate - a.creationDate;
        });
        setSortedQuestions(sortedArray);
        break;
    }
  };
  const styles = StyleSheet.create({
    filtersContainer: {
      marginTop: 8,
      marginLeft: 12,
      flexDirection: 'row',
    },
    text: {
      color: isDarkMode ? 'white' : 'black',
      textAlign: 'center',
    },
    button: {
      flex: 1,
      borderWidth: 1,
      borderColor: isDarkMode ? 'white' : 'black',
      margin: 2,
      marginLeft: 14,
      marginRight: 10,
      paddingLeft: 4,
    },
    highlighted: {
      backgroundColor: 'orange',
    },
    regular: {
      backgroundColor: isDarkMode ? 'black' : 'white',
    },
  });
  return (
    <View style={styles.filtersContainer}>
      <Text style={styles.text}>Sort by: </Text>
      <TouchableOpacity
        style={
          highlightedSortIndex === 0
            ? {...styles.highlighted, ...styles.button}
            : {...styles.regular, ...styles.button}
        }
        onPress={() => {
          setHighlightedSortIndex(0);
          sortHandler('');
        }}>
        <Text style={styles.text}>Date</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={highlightedSortIndex === 1 ? styles.highlighted : styles.button}
        onPress={() => {
          setHighlightedSortIndex(1);
          sortHandler('views');
        }}>
        <Text style={styles.text}>Views</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={highlightedSortIndex === 2 ? styles.highlighted : styles.button}
        onPress={() => {
          setHighlightedSortIndex(2);
          sortHandler('answers');
        }}>
        <Text style={styles.text}>Answers</Text>
      </TouchableOpacity>
    </View>
  );
};
