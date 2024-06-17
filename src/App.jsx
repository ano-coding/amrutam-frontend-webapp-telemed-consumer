import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


import HomePage from "./pages/HomePage";
import MainApp from "./components/MainApp";
import FindDoctorsPage from "./pages/FindDoctorsPage";
import DoctorProfilePage from "./pages/DoctorProfile";
import QuestionnairePage from "./pages/QuestionnairePage";
import QuestionnaireSingleCard from "./features/Questionnaire/components/QuestionnaireSingleCard";
import SelfAssessmentQuestions from "./features/Questionnaire/components/SelfAssessmentQuestions";
import SelfAssessmentResult from "./features/Questionnaire/components/SelfAssessmentResult";
import TriviaQuestions from "./features/Questionnaire/components/TriviaQuestions";
import TriviaResult from "./features/Questionnaire/components/TriviaResult";
import AppointmentBookingPage from "./pages/AppointmentBookingPage";
import ForumPage from "./pages/ForumPage";
import SinglePost from "./features/Forum/components/SinglePost"

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainApp></MainApp>,
		children: [
			{
				path: "/",
				element: <HomePage></HomePage>
			},

			{
				path: "/find-doctors",
				element: <FindDoctorsPage></FindDoctorsPage>
			},
			{
				path: "/profile",
				element: <DoctorProfilePage></DoctorProfilePage>
			}, 
			{
				path: "/appointment-booking",
				element: <AppointmentBookingPage />
			},
			
			{
				path: "/questionnaire",
				element: <QuestionnairePage></QuestionnairePage>
			},
			{
				path: "/questionnaireSingleCard/:id",
				element: <QuestionnaireSingleCard></QuestionnaireSingleCard>
			},
			{
				path: "/selfAssessmentQuestions",
				element: <SelfAssessmentQuestions />,
			},
			{
				path: "/selfAssessmentResult",
				element: <SelfAssessmentResult />,
			},
			{
				path: "/triviaQuestions",
				element: <TriviaQuestions />,
			},
			{
				path: "/triviaResult",
				element: <TriviaResult />,
			},
			
			{
				path: "/commune",
				element: <ForumPage></ForumPage>
			},
			{
				path: "/commune/post/:id",
				element: <SinglePost />,
			},
			{
				path: "/about",
				element: <div>About us</div>
			},
		]


	}
 
]);

function App() {
	return (
		<RouterProvider router={router} />
	);
}

export default App;
