import ContentBoxLayout from "../../../components/ContentBoxLayout";
import SearchBar from "../../../components/SearchBar";
import TabularData from "../../../components/TabularData";

const data = [
  {
    Doctor: {
      Name: "Dr. Darren Elder",
      Specialty: "Dental",
      Image: "/doctor-sample.png",
    },
    Duration: "30 Min",
    Type: "Video",
    Date: "14 Nov 2023",
    Action: {
      Download: "Download URL",
      View: "View URL",
    },
  },
  {
    Doctor: {
      Name: "Dr. Darren Elder",
      Specialty: "Dental",
      Image: "/doctor-sample.png",
    },
    Duration: "30 Min",
    Type: "Video",
    Date: "14 Nov 2023",
    Action: {
      Download: "Download URL",
      View: "View URL",
    },
  },
  {
    Doctor: {
      Name: "Dr. Darren Elder",
      Specialty: "Dental",
      Image: "/doctor-sample.png",
    },
    Duration: "30 Min",
    Type: "Video",
    Date: "14 Nov 2023",
    Action: {
      Download: "Download URL",
      View: "View URL",
    },
  },
  {
    Doctor: {
      Name: "Dr. Darren Elder",
      Specialty: "Dental",
      Image: "/doctor-sample.png",
    },
    Duration: "30 Min",
    Type: "Video",
    Date: "14 Nov 2023",
    Action: {
      Download: "Download URL",
      View: "View URL",
    },
  },
];
const CallRecordings = () => {
  return (
    <div className="flex flex-col gap-[37px] pt-4">
      <SearchBar />
      <ContentBoxLayout title="Call Recordings">
        <TabularData data={data} />
      </ContentBoxLayout>
    </div>
  );
};

export default CallRecordings;
