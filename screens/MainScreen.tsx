import React, {useState} from 'react';
import {
  StatusBar,
  Text,
  StyleSheet,
  TextInput,
  View,
  Switch,
  Dimensions,
  KeyboardAvoidingView,
  FlatList,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {getQuestionsFromDB} from '../plugin/api';
import {questionType, userDataType} from '../types/types';
import Filters from '../components/Filters';
import QuestionCard from '../components/QuestionCard';
import UserData from '../components/UserData';

export default () => {
  const [userID, onChangeUserId] = useState<string>('');
  const [questions, setQuestions] = useState<questionType[] | []>([]);
  const [sortedQuestions, setSortedQuestions] = useState<questionType[] | []>(
    [],
  );
  const [currentUser, setCurrentUser] = useState<userDataType>({
    avatar: '',
    userName: '',
    reputation: '',
  });
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const toggleSwitch = () => setIsDarkMode(previousState => !previousState);
  const renderQuestion = (questionData: any) => (
    <QuestionCard isDarkMode={isDarkMode} questionData={questionData} />
  );
  const fetchUserData = async () => {
    try {
      const results = await getQuestionsFromDB(
        `https://api.stackexchange.com/2.3/users/${userID}/questions?order=desc&sort=activity&site=stackoverflow`,
      );
      setCurrentUser(results.userData);
      setQuestions(results.questions);
      let sortedArray = results.questions.sort((a: any, b: any) => {
        return a.creationDate - b.creationDate;
      });
      setSortedQuestions(sortedArray);
    } catch (e) {
      console.log(e);
    }
  };

  const styles = StyleSheet.create({
    input: {
      height: 40,
      margin: 12,
      width: 140,
      borderWidth: 1,
      padding: 10,
      borderColor: isDarkMode ? Colors.white : Colors.black,
      color: isDarkMode ? Colors.white : Colors.black,
    },
    inputContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: isDarkMode ? Colors.black : Colors.white,
    },
    title: {
      fontSize: 28,
    },
    container: {
      alignItems: 'center',
      height: Dimensions.get('window').height,
      backgroundColor: isDarkMode ? Colors.black : Colors.white,
    },
    toggle: {
      position: 'absolute',
      top: 20,
      right: 20,
    },
    questionsList: {
      marginTop: 10,
      borderTopWidth: 1,
      marginBottom: 260,
    },
    text: {color: isDarkMode ? Colors.white : Colors.black},
  });
  return (
    <View style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.toggle}>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
          onValueChange={toggleSwitch}
          value={isDarkMode}
        />
        <Text style={styles.text}>
          {isDarkMode ? 'Light mode' : 'Dark Mode'}
        </Text>
      </View>
      <View style={{marginTop: 70}}>
        <Text style={{...styles.title, ...styles.text}}>
          Get stack overflow posts
        </Text>
        <KeyboardAvoidingView style={styles.inputContainer}>
          <TextInput
            placeholder={'User ID'}
            keyboardType={'number-pad'}
            placeholderTextColor={isDarkMode ? Colors.white : Colors.black}
            onChangeText={onChangeUserId}
            value={userID}
            onEndEditing={fetchUserData}
            maxLength={10}
            style={styles.input}
          />
        </KeyboardAvoidingView>
        {questions.length > 0 && (
          <View>
            <UserData
              totalQuestions={questions.length}
              isDarkMode={isDarkMode}
              currentUser={currentUser}
            />
            <Filters
              questions={questions}
              setSortedQuestions={(sortedArray: questionType[]) => {
                setSortedQuestions(sortedArray);
              }}
              isDarkMode={isDarkMode}
            />
            <FlatList
              style={styles.questionsList}
              keyExtractor={(item: any) => item.creationDate}
              data={sortedQuestions}
              renderItem={renderQuestion}
            />
          </View>
        )}
      </View>
    </View>
  );
};
