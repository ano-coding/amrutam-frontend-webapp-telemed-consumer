import { useContext } from "react";
import ContentBoxLayout from "../components/ContentBoxLayout";
import { UserContext } from "../context/UserContext.jsx";
import useGetPatientProfile from "../hooks/useGetPatientProfile";
import { formatDate, isNotPhotoUrl } from "../helper/helper";
import { formatPhoneNumberIntl } from "react-phone-number-input";
import { Link } from "react-router-dom";

const PatientProfile = () => {
  const { token } = useContext(UserContext);
  const { data, error, isLoading } = useGetPatientProfile(token);
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;
  const { dob, gender, first_name, last_name, phone, photo, weight, height } =
    data.data;

  return (
    <>
      <ContentBoxLayout title={"Personal & Contact Details"}>
        <div className="flex w-full flex-col gap-10 p-6 xl:px-10">
          <div className="flex w-full justify-end">
            <Link
              to={`edit`}
              state={{ data, token }}
              className="rounded-lg border-[1.5px] border-solid border-[#3a643b] px-3 py-1 text-center text-[14px] font-medium leading-[22.5px] text-[#3a643b] active:scale-95"
            >
              Edit Profile
            </Link>
          </div>
          <div className="flex flex-col items-center justify-center gap-10 lg:flex-row lg:gap-5 xl:gap-8">
            <img
              src={isNotPhotoUrl(photo) ? "/avatar-person.svg" : photo}
              className="aspect-square h-[160px] rounded-full xl:h-[174px]"
            />
            <div className="grid w-full grid-cols-1 gap-x-3 gap-y-10 md:grid-cols-3">
              <DetailBox
                title={"Full Name"}
                detail={first_name ? `${first_name} ${last_name}` : "--"}
              />
              <DetailBox title={"DOB"} detail={dob ? formatDate(dob) : "--"} />
              <DetailBox title={"Gender"} detail={gender || "--"} />
              <DetailBox
                title={"Mob No."}
                detail={phone ? formatPhoneNumberIntl(phone) : "--"}
              />
              <DetailBox
                title={"Height"}
                detail={height ? `${height?.value} ${height?.unit}` : "--"}
              />
              <DetailBox
                title={"Weight"}
                detail={weight ? `${weight?.value} ${weight?.unit}` : "--"}
              />
            </div>
          </div>
        </div>
      </ContentBoxLayout>
    </>
  );
};

export default PatientProfile;

const DetailBox = ({ title, detail }) => {
  return (
    <div className="flex flex-col items-center gap-0.5 lg:items-start">
      <div className="whitespace-nowrap text-[14px] text-[#3a643b]">
        {title}
      </div>
      <div className="whitespace-nowrap text-lg font-semibold text-[#3a643b] xl:text-[18px]">
        {detail}
      </div>
    </div>
  );
};
