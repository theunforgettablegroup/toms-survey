export interface QuestionType {
  id: number;
  text: string;
  questionType: 'single_choice' | 'free_text';
  answers: string[];
}

export interface Profile {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}
