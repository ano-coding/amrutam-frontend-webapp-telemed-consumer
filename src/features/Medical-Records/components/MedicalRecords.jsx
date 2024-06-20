import ContentBoxLayout from "../../../components/ContentBoxLayout";
import TabularData from "../../../components/TabularData";
import SearchBar from "../../../components/SearchBar";

const data = [
  {
    ID: "#MR-0010",
    Doctor: {
      Name: "Dr. Darren Elder",
      Specialty: "Dental",
      Image: "/doctor-sample.png",
    },
    Amount: "Rs.799",
    "Paid On": "14 Nov 2023",
    Action: {
      Download: "Download URL",
      View: "View URL",
    },
  },
  {
    ID: "#MR-0010",
    Doctor: {
      Name: "Dr. Darren Elder",
      Specialty: "Dental",
      Image: "/doctor-sample.png",
    },
    Amount: "Rs.799",
    "Paid On": "14 Nov 2023",
    Action: {
      Download: "Download URL",
      View: "View URL",
    },
  },
  {
    ID: "#MR-0010",
    Doctor: {
      Name: "Dr. Darren Elder",
      Specialty: "Dental",
      Image: "/doctor-sample.png",
    },
    Amount: "Rs.799",
    "Paid On": "14 Nov 2023",
    Action: {
      Download: "Download URL",
      View: "View URL",
    },
  },
  {
    ID: "#MR-0010",
    Doctor: {
      Name: "Dr. Darren Elder",
      Specialty: "Dental",
      Image: "/doctor-sample.png",
    },
    Amount: "Rs.799",
    "Paid On": "14 Nov 2023",
    Action: {
      Download: "Download URL",
      View: "View URL",
    },
  },
];

const MedicalRecords = () => {
  return (
    <div className="flex flex-col gap-[37px] pt-4">
      <SearchBar />
      <ContentBoxLayout title="Medical Records">
        <TabularData data={data} />
      </ContentBoxLayout>
    </div>
  );
};

export default MedicalRecords;
