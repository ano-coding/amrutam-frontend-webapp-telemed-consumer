import ContentBoxLayout from "../../../components/ContentBoxLayout";
import SearchBar from "../../../components/SearchBar";
import TabularData from "../../../components/TabularData";

const data = [
  {
    "Invoice No.": "INV-0010",
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
    "Invoice No.": "INV-0010",
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
    "Invoice No.": "INV-0010",
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
    "Invoice No.": "INV-0010",
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

const Payments = () => {
  return (
    <div className="flex flex-col gap-[37px] pt-4">
      <SearchBar />
      <ContentBoxLayout title="Payments">
        <TabularData data={data} />
      </ContentBoxLayout>
    </div>
  );
};

export default Payments;
