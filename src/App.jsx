import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import Login from "./pages/Login";
import Auth from "./features/Auth/components/Auth";
import Signup from "./pages/Signup";


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

import Store from "./pages/Store";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import AppointmentBookingForm from "./features/Appointments/components/AppointmentBookingForm";
import CouponsPage from "./pages/CouponsPage";
import AppointmentSuccessPage from "./pages/AppointmentSuccessPage";

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
				path: "/profile/:id",
				element: <DoctorProfilePage></DoctorProfilePage>
			}, 
			{
				path: "/appointment-booking",
				element: <AppointmentBookingPage />
			},
			{
				path: '/appointment/:doctorId',
				element: <AppointmentBookingForm></AppointmentBookingForm>
			},
			{
				path: '/coupons',
				element: <CouponsPage></CouponsPage>
			},
			{
				path: '/appointment-success',
				element: <AppointmentSuccessPage></AppointmentSuccessPage>
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
			{ path: "/store", element: <Store /> },
			{ path: "prodDetail", element: <ProductDetail /> },
			{ path: "cart", element: <Cart /> },
			{ path: "success", element: <Success /> },
		]
	},
	{
		element: <Auth />,
		children: [
			{
				path: "/login",
				element: <Login />,
			},
			{
				path: "/signup",
				element: <Signup />,
			},
		],
	},
]);

const queryClient = new QueryClient();

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
}

export default App;
