import ListOfCards from "./ListOfCards";
import QuestionnaireHero from "./QuestionnaireHero";
import WhyQuestionnaire from "./WhyQuestionnaire";

function Questionnaire() {
	return (
		<div>
			<QuestionnaireHero />
			<WhyQuestionnaire />
			<ListOfCards />
		</div>
	);
}

export default Questionnaire;
