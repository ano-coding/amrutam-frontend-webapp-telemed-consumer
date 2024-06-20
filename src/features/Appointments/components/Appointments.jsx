import AppointmentTabs from "./AppointmentTabs";
import BookAppointmentBanner from "./BookAppointmentBanner";
import SearchBar from "./SearchBar";

const Appointments = () => {
  return (
    <div className="flex flex-col gap-[37px] pt-4">
      <BookAppointmentBanner />
      <SearchBar />
      <AppointmentTabs />
    </div>
  );
};

export default Appointments;
