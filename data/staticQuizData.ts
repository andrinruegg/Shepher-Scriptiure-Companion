
import { QuizQuestion } from '../types';

type QuizDifficulty = 'Easy' | 'Medium' | 'Hard';
type QuizData = Record<string, Record<QuizDifficulty, QuizQuestion[]>>;

// Note: To keep the file manageable, we are adding the example questions provided in the request
// and duplicating some structure. In a real production app with massive data, this would come from the database.

export const STATIC_QUIZ_DATA: QuizData = {
  English: {
    Easy: [
      {
        question: "Who built the Ark?",
        options: ["Moses", "Noah", "David", "Abraham"],
        correctIndex: 1,
        explanation: "God instructed Noah to build an ark to save his family and animals from the great flood.",
        reference: "Genesis 6:14"
      },
      {
        question: "Where was Jesus born?",
        options: ["Nazareth", "Jerusalem", "Bethlehem", "Galilee"],
        correctIndex: 2,
        explanation: "Jesus was born in Bethlehem of Judea, fulfilling the prophecy of Micah.",
        reference: "Matthew 2:1"
      },
      {
        question: "What river was Jesus baptized in?",
        options: ["Nile", "Euphrates", "Jordan", "Tigris"],
        correctIndex: 2,
        explanation: "John the Baptist baptized Jesus in the Jordan River.",
        reference: "Mark 1:9"
      }
    ],
    Medium: [
      {
        question: "Who was the oldest man in the Bible?",
        options: ["Noah", "Methuselah", "Adam", "Abraham"],
        correctIndex: 1,
        explanation: "Methuselah lived to be 969 years old.",
        reference: "Genesis 5:27"
      }
    ],
    Hard: [
      {
        question: "Who was the left-handed judge who killed Eglon?",
        options: ["Gideon", "Ehud", "Jephthah", "Shamgar"],
        correctIndex: 1,
        explanation: "Ehud made a double-edged sword and killed Eglon, King of Moab.",
        reference: "Judges 3:15"
      }
    ]
  },
  German: {
    Easy: [
      {
        question: "Wer baute die Arche?",
        options: ["Mose", "Noah", "David", "Abraham"],
        correctIndex: 1,
        explanation: "Gott befahl Noah, eine Arche zu bauen, um seine Familie und die Tiere vor der Sintflut zu retten.",
        reference: "1. Mose 6,14"
      },
      {
        question: "Wo wurde Jesus geboren?",
        options: ["Nazareth", "Jerusalem", "Bethlehem", "Galiläa"],
        correctIndex: 2,
        explanation: "Jesus wurde in Bethlehem in Judäa geboren, womit sich die Prophezeiung von Micha erfüllte.",
        reference: "Matthäus 2,1"
      },
      {
        question: "In welchem Fluss wurde Jesus getauft?",
        options: ["Nil", "Euphrat", "Jordan", "Tigris"],
        correctIndex: 2,
        explanation: "Johannes der Täufer taufte Jesus im Jordan.",
        reference: "Markus 1,9"
      }
    ],
    Medium: [
      {
        question: "Wer war der älteste Mann in der Bibel?",
        options: ["Noah", "Methusalem", "Adam", "Abraham"],
        correctIndex: 1,
        explanation: "Methusalem lebte 969 Jahre.",
        reference: "1. Mose 5,27"
      }
    ],
    Hard: [
      {
        question: "Wer war der linkshändige Richter, der Eglon tötete?",
        options: ["Gideon", "Ehud", "Jephta", "Schamgar"],
        correctIndex: 1,
        explanation: "Ehud machte sich ein zweischneidiges Schwert und tötete Eglon, den König von Moab.",
        reference: "Richter 3,15"
      }
    ]
  },
  Romanian: {
    Easy: [
      {
        question: "Cine a construit Arca?",
        options: ["Moise", "Noe", "David", "Avraam"],
        correctIndex: 1,
        explanation: "Dumnezeu i-a poruncit lui Noe să construiască o arcă pentru a-și salva familia și animalele de potop.",
        reference: "Geneza 6:14"
      },
      {
        question: "Unde s-a născut Isus?",
        options: ["Nazaret", "Ierusalim", "Betleem", "Galileea"],
        correctIndex: 2,
        explanation: "Isus s-a născut în Betleemul din Iudeea, împlinind profeția lui Mica.",
        reference: "Matei 2:1"
      },
      {
        question: "În ce râu a fost botezat Isus?",
        options: ["Nil", "Eufrat", "Iordan", "Tigru"],
        correctIndex: 2,
        explanation: "Ioan Botezătorul l-a botezat pe Isus în râul Iordan.",
        reference: "Marcu 1:9"
      }
    ],
    Medium: [
      {
        question: "Cine a fost cel mai bătrân om din Biblie?",
        options: ["Noe", "Metusala", "Adam", "Avraam"],
        correctIndex: 1,
        explanation: "Metusala a trăit 969 de ani.",
        reference: "Geneza 5:27"
      }
    ],
    Hard: [
      {
        question: "Cine a fost judecătorul stângaci care l-a ucis pe Eglon?",
        options: ["Ghedeon", "Ehud", "Iefta", "Șamgar"],
        correctIndex: 1,
        explanation: "Ehud și-a făcut o sabie cu două tăișuri și l-a ucis pe Eglon, împăratul Moabului.",
        reference: "Judecătorii 3:15"
      }
    ]
  }
};
