export interface Question {
    question: string;
    options: string[];
    answer: string;
  }
  
  export interface Category {
    name: string;
    questions: Question[];
  }
  
  export const categories: Category[] = [
    {
      name: "История",
      questions: [
        {
          question: "В каком году была подписана Декларация независимости США?",
          options: ["1776", "1789", "1804", "1770"],
          answer: "1776",
        },
        {
          question: "Кто был первым президентом США?",
          options: ["Вашингтон", "Линкольн", "Джефферсон", "Рузвельт"],
          answer: "Вашингтон",
        },
      ],
    },
    {
      name: "Наука",
      questions: [
        {
          question: "Какой химический символ воды?",
          options: ["H2O", "O2", "CO2", "HO"],
          answer: "H2O",
        },
        {
          question: "Какую планету называют Красной планетой?",
          options: ["Марс", "Венера", "Юпитер", "Сатурн"],
          answer: "Марс",
        },
      ],
    },
    {
      name: "Кино",
      questions: [
        {
          question: "Кто снял фильм «Парк юрского периода»?",
          options: ["Стивен Спилберг", "Джеймс Кэмерон", "Квентин Тарантино", "Мартин Скорсезе"],
          answer: "Стивен Спилберг",
        },
        {
          question: "За какой фильм Леонардо ДиКаприо получил первый «Оскар»?",
          options: ["Выживший", "Титаник", "Начало", "Волк с Уолл-Стрит"],
          answer: "Выживший",
        },
      ],
    },
  ];
  