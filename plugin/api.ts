import Axios from 'axios';
import {questionType, userDataType} from '../types/types';
type data = {
  questions: questionType[];
  userData: userDataType;
};

export const getQuestionsFromDB = async (URL: string): Promise<data> => {
  try {
    const res = await Axios.get(URL);
    const questions: any[] = [];
    const userData: userDataType = {
      userName: res.data.items[0].owner.display_name,
      reputation: res.data.items[0].owner.reputation,
      avatar: res.data.items[0].owner.profile_image,
    };
    for (let question of res.data.items) {
      questions.push({
        answerCount: question.answer_count,
        creationDate: question.creation_date,
        title: question.title,
        totalViews: question.view_count,
        isAnswered: question.is_answered,
        link: question.link,
      });
    }
    let data: data = {questions, userData};
    return data;
  } catch (err) {
    throw new Error('Unable to fetch data - ' + err);
  }
};
