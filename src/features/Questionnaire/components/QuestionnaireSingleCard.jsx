import {  useParams } from "react-router-dom";
import WhyQuestionnaire from "./WhyQuestionnaire";
import QuestionnaireHero from "./QuestionnaireHero";
import AyurvedaCards from "./AyurvedaCards";

const cards = [
  {
    "id": 1,
    "title": "Ayurvedic Lifestyle and Health",
    "plays": 18,
    "likes": 22,
    "author": "By Amrutam",
    "imgSrc": "https://i.ibb.co/BzjQsYk/cardImg1.png",
    "type": "Trivia"
  },
  {
    "id": 2,
    "title": "Mental Health Self Assessment",
    "plays": 14,
    "likes": 22,
    "author": "By: Aryan Khan",
    "imgSrc": "https://i.ibb.co/k0Frs9v/cardImg2.png",
    "type": "Self Assessment"
  },
  {
    "id": 3,
    "title": "Skin Care Self Assessment",
    "plays": 18,
    "likes": 22,
    "author": "By Amrutam",
    "imgSrc": "https://i.ibb.co/JjBdf3s/cardImg3.png",
    "type": "Self Assessment"
  },
  {
    "id": 4,
    "title": "Skin Care Self Assessment",
    "plays": 18,
    "likes": 22,
    "author": "By Amrutam",
    "imgSrc": "https://i.ibb.co/L1RRTWL/cardImg4.png",
    "type": "Self Assessment"
  },
  {
    "id": 5,
    "title": "Skin Care Self Assessment",
    "plays": 18,
    "likes": 22,
    "author": "By Amrutam",
    "imgSrc": "https://i.ibb.co/BzjQsYk/cardImg1.png",
    "type": "Self Assessment"
  },
  {
    "id": 6,
    "title": "Ayurveda Trivia Challenge",
    "plays": 25,
    "likes": 30,
    "author": "By Amrutam",
    "imgSrc": "https://i.ibb.co/k0Frs9v/cardImg2.png",
    "type": "Trivia"
  },
  {
    "id": 7,
    "title": "Herbal Remedies Trivia",
    "plays": 20,
    "likes": 25,
    "author": "By Amrutam",
    "imgSrc": "https://i.ibb.co/L1RRTWL/cardImg4.png",
    "type": "Trivia"
  },
  {
    "id": 8,
    "title": "Dosha Quiz Self Assessment",
    "plays": 22,
    "likes": 27,
    "author": "By Amrutam",
    "imgSrc": "https://i.ibb.co/BzjQsYk/cardImg1.png",
    "type": "Self Assessment"
  },
  {
    "id": 9,
    "title": "Holistic Wellness Trivia",
    "plays": 19,
    "likes": 21,
    "author": "By Amrutam",
    "imgSrc": "https://i.ibb.co/JjBdf3s/cardImg3.png",
    "type": "Trivia"
  },
  {
    "id": 10,
    "title": "Natural Healing Trivia",
    "plays": 21,
    "likes": 24,
    "author": "By Amrutam",
    "imgSrc": "https://i.ibb.co/L1RRTWL/cardImg4.png",
    "type": "Trivia"
  }
]


const QuestionnaireSingleCard = () => {
  const { id } = useParams();
  const idInt = parseInt(id);
  const cardDetails = cards.find((card) => card?.id === idInt);

  return (
    <div>
      <QuestionnaireHero />
      <WhyQuestionnaire />
      <AyurvedaCards cardDetails={cardDetails} />
    </div>
  );
};

export default QuestionnaireSingleCard;
