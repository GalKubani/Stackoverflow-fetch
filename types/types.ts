export type userDataType = {
  avatar: string;
  userName: string;
  reputation: string;
};
export type questionType = {
  item: {
    title: string;
    creationDate: Date;
    totalViews: number;
    answerCount: number;
    isAnswered: boolean;
    link: string;
  };
};
