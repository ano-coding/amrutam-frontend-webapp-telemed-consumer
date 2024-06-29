import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Auth from "./features/Auth/components/Auth";
import Signup from "./pages/Signup";
import AppLayout from "./components/AppLayout";
import DashboardLayout from "./components/DashboardLayout";
import Appointments from "./features/Appointments/components/Appointments";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
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

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <div>Home</div>,
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
]);

// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
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
    </UserProvider>
  );
}

export default App;
