import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Login from "./pages/Login";
import Auth from "./features/Auth/components/Auth";
import Signup from "./pages/Signup";
import AppLayout from "./components/AppLayout";
import DashboardLayout from "./components/DashboardLayout";
import Appointments from "./features/Appointments/components/Appointments";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppointmentDetails from "./features/Appointments/components/AppointmentDetails";
import MedicalRecords from "./features/Medical-Records/components/MedicalRecords";
import Payments from "./features/Payments/components/Payments";
import Chats from "./features/Chats/components/Chats";
import CallRecordings from "./features/Call-Recordings/components/CallRecordings";
import WeeklyBenefits from "./features/Routine/components/WeeklyBenefits";
import AddReminder from "./features/Routine/components/AddReminder";
import ProductDetails from "./features/Routine/components/ProductDetails";
import ReminderChannel from "./features/Routine/components/ReminderChannel";
import AssignCaregiver from "./features/Routine/components/AssignCaregiver";
import RoutineDashboard from "./features/Routine/components/RoutineDashboard";
import CreateRoutine from "./features/Routine/components/CreateRoutine";
import ConsumerDashboard from "./pages/ConsumerDashboard";
import PatientProfile from "./pages/PatientProfile";
import { UserProvider } from "./context/UserContext";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PatientProfileEdit from "./pages/PatientProfileEdit";

import HomePage from "./pages/HomePage";
// import MainApp from "./components/MainApp";
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
import SinglePost from "./features/Forum/components/SinglePost";

import Store from "./pages/Store";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import AppointmentBookingForm from "./features/Appointments/components/AppointmentBookingForm";
import CouponsPage from "./pages/CouponsPage";
import AppointmentSuccessPage from "./pages/AppointmentSuccessPage";
import CancelRedirect from "./pages/CancelRedirect";
import { ShopifyProvider } from "./context/ShopifyContext";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <HomePage></HomePage>,
      },

      {
        path: "/find-doctors",
        element: <FindDoctorsPage></FindDoctorsPage>,
      },
      {
        path: "/profile/:id",
        element: <DoctorProfilePage></DoctorProfilePage>,
      },
      {
        path: "/appointment-booking",
        element: <AppointmentBookingPage />,
      },
      {
        path: "/appointment/:doctorId",
        element: <AppointmentBookingForm></AppointmentBookingForm>,
      },
      {
        path: "/coupons",
        element: <CouponsPage></CouponsPage>,
      },
      {
        path: "/appointment-success",
        element: <AppointmentSuccessPage></AppointmentSuccessPage>,
      },
      {
        path: "/questionnaire",
        element: <QuestionnairePage></QuestionnairePage>,
      },
      {
        path: "/questionnaireSingleCard/:id",
        element: <QuestionnaireSingleCard></QuestionnaireSingleCard>,
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
        element: <ForumPage></ForumPage>,
      },
      {
        path: "/commune/post/:id",
        element: <SinglePost />,
      },
      {
        path: "/about",
        element: <div>About us</div>,
      },
      { path: "/store", element: <Store /> },
      { path: "prodDetail/:id", element: <ProductDetail /> },
      { path: "cart", element: <Cart /> },
      { path: "success-page", element: <Success /> },
      {
        path: "/cancel-page",
        element: <CancelRedirect />,
      },
    ],
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

  {
    element: <DashboardLayout />,
    children: [
      {
        path: "/dashboard",
        element: <ConsumerDashboard />,
      },
      {
        path: "/appointments",
        element: <Appointments />,
      },
      {
        path: "/appointments/:id",
        element: <AppointmentDetails />,
      },
      {
        path: "/routines",
        element: <RoutineDashboard />,
      },
      {
        path: "/routines/create",
        element: <CreateRoutine />,
      },
      {
        path: "/medical-records",
        element: <MedicalRecords />,
      },
      {
        path: "/payments",
        element: <Payments />,
      },
      {
        path: "/chats",
        element: <Chats />,
      },
      {
        path: "/call-recordings",
        element: <CallRecordings />,
      },
      {
        path: "/routines/create/weekly-benefits",
        element: <WeeklyBenefits />,
      },
      {
        path: "/routines/create/add-reminder",
        element: <AddReminder />,
      },
      {
        path: "/routines/create/add-reminder/product-details",
        element: <ProductDetails />,
      },
      {
        path: "/routines/create/add-reminder-channels",
        element: <ReminderChannel />,
      },
      {
        path: "/routines/create/assign-caregiver",
        element: <AssignCaregiver />,
      },
      {
        path: "/profile",
        element: <PatientProfile />,
      },
      {
        path: "/profile/edit",
        element: <PatientProfileEdit />,
      },
    ],
  },
]);

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <UserProvider>
      <ShopifyProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={true}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ShopifyProvider>
    </UserProvider>
  );
}

export default App;
