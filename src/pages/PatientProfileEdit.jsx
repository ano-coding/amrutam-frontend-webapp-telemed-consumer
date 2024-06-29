import UploadSvg from "./../assets/upload.svg?react";
import { Controller, useForm } from "react-hook-form";
import PopOverMenu from "../features/PatientProfile/PopOverMenu";
import ContentBoxLayout from "../components/ContentBoxLayout";
import useUpdatePatientProfile from "../hooks/useUpdatePatientProfile";
import { PhoneInputPatient } from "../features/PatientProfile/PhoneInputPatient";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import uploadFileToS3 from "../services/apiUpload";
import SyncLoader from "react-spinners/SyncLoader";
const PatientProfileEdit = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const data = state?.data;
  const token = state.token;
  const { updatePatientProfileMutate, updatePatientProfileStatus } =
    useUpdatePatientProfile();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const isProfileUpdating = updatePatientProfileStatus === "pending";

  const defaultValues = data
    ? {
        dob: data.data?.dob,
        gender: data.data.gender,
        firstName: data.data.first_name,
        lastName: data.data.last_name,
        phoneNumber: data.data.phone,
        email: data.data.email,
        stateName: data.data.state,
        countryName: data.data.country,
        height: data.data?.height?.value,
        weight: data.data?.weight?.value,
        photo: data.data.photo,
      }
    : {};

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  useEffect(() => {
    if (!selectedFile) return;
    setValue("photo", selectedFile);
  }, [selectedFile, setValue]);

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data) => {
    console.log(data);
    console.log(selectedFile);

    try {
      setIsLoading(true);
      if (isProfileUpdating) return;

      const photoData = await uploadFileToS3(selectedFile, token);

      updatePatientProfileMutate(
        {
          token: token,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phoneNumber,
          email: data.email,
          dob: data.dob,
          gender: data.gender,
          state: data.stateName,
          country: data.countryName,
          heightUnit: "cm",
          heightValue: data.height,
          weightUnit: "kg",
          weightValue: data.weight,
          photo: photoData.data,
        },
        {
          onSuccess: (data) => {
            console.log(data);

            console.log("Success, Profile Updated");
            navigate("/profile");
          },
          onError: (error) => {
            console.log("Error Profile Not Updated", error);
          },
        },
      );
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ContentBoxLayout title={"Personal & Contact Details"}>
      <form
        className="relative flex w-full items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        {(isProfileUpdating || isLoading) && (
          <div className="absolute z-10 flex h-full w-full items-center justify-center bg-white bg-opacity-55">
            <SyncLoader color="#3a643b" margin={5} size={20} />
          </div>
        )}
        <div className="my-2 flex w-full flex-col items-center gap-10 p-6 xl:w-11/12 xl:px-10">
          <div className="flex flex-col items-center gap-[15px]">
            <img
              src={
                previewUrl
                  ? previewUrl
                  : watch("photo")
                    ? watch("photo")
                    : "/user-avatar-2.png"
              }
              className="aspect-square h-[113px] rounded-full object-cover"
            />
            <div
              onClick={handleDivClick}
              className="flex cursor-pointer items-center justify-center gap-2 rounded-[29px] border-[1px] border-solid border-[#d0d0d0] bg-[#fcfcff] px-[22px] py-[10px]"
            >
              <UploadSvg className="size-5" />
              <span className="text-[15px] text-[#3a3a3a]">Upload a Photo</span>
            </div>
            <input
              type="file"
              className="hidden"
              ref={fileInputRef}
              onChange={handleFileChange}
            />

            <div className="text-[14px] text-[#5f5f5f]">
              Allowed JPG, GIF or PNG. Max size of 2MB
            </div>
          </div>
          {/* First name & Last Name */}
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-16 xl:gap-28">
            <div className="flex flex-col gap-[10px]">
              <label
                htmlFor="first-name"
                className="font-nunito text-[18px] font-semibold leading-[18px]"
              >
                <span>{`First Name `}</span>
                <span className="font-bold text-[#dd461e]">*</span>
              </label>
              <div className="flex w-full flex-col gap-1">
                <input
                  id="first-name"
                  className={`w-full rounded-[11px] border-[2px] border-solid px-4 py-2.5 focus:outline-none focus:ring-0 ${errors.firstName ? "border-red-500 focus:border-red-500" : `border-[#e5e7eb] focus:border-[#e5e7eb]`}`}
                  {...register("firstName", { required: true })}
                />
                {errors.firstName && <ErrorElement />}
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <label
                htmlFor="last-name"
                className="font-nunito text-[18px] font-semibold leading-[18px]"
              >
                <span>{`Last Name `}</span>
                <span className="font-bold text-[#dd461e]">*</span>
              </label>
              <div className="flex w-full flex-col gap-1">
                <input
                  id="last-name"
                  className={`w-full rounded-[11px] border-[2px] border-solid px-4 py-2.5 focus:outline-none focus:ring-0 ${errors.lastName ? "border-red-500 focus:border-red-500" : `border-[#e5e7eb] focus:border-[#e5e7eb]`}`}
                  {...register("lastName", { required: true })}
                />
                {errors.lastName && <ErrorElement />}
              </div>
            </div>
          </div>
          {/* Mobile & Email */}
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-16 xl:gap-28">
            <PhoneInputPatient control={control} error={errors.phoneNumber} />
            <div className="flex flex-col gap-[10px]">
              <label
                htmlFor="email"
                className="font-nunito text-[18px] font-semibold leading-[18px]"
              >
                <span>{`Email `}</span>
                <span className="font-bold text-[#dd461e]">*</span>
              </label>
              <div className="flex w-full flex-col gap-1">
                <input
                  id="email"
                  className={`w-full rounded-lg border-[2px] border-solid px-4 py-2.5 focus:outline-none focus:ring-0 ${errors.email ? "border-red-500 focus:border-red-500" : `border-[#e5e7eb] focus:border-[#e5e7eb]`}`}
                  {...register("email", {
                    required: "*Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "*Invalid email address",
                    },
                  })}
                />
                {errors.email && (
                  <ErrorElement message={errors.email.message} />
                )}
              </div>
            </div>
          </div>
          {/* DOB & Gender */}
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-16 xl:gap-28">
            <div className="flex flex-col gap-[10px]">
              <label
                htmlFor="dob"
                className="font-nunito text-[18px] font-semibold leading-[18px]"
              >
                <span>{`Date of Birth `}</span>
                <span className="font-bold text-[#dd461e]">*</span>
              </label>
              <div className="flex w-full flex-col gap-1">
                <PopOverMenu
                  setValue={setValue}
                  errors={errors}
                  register={register}
                  watch={watch}
                />

                {!watch("dob") && <ErrorElement />}
              </div>
            </div>
            {/* Gender */}
            <div className="flex flex-col gap-[10px]">
              <label
                htmlFor="gender"
                className="font-nunito text-[18px] font-semibold leading-[18px]"
              >
                <span>{`Gender `}</span>
                <span className="font-bold text-[#dd461e]">*</span>
              </label>
              <div className="mt-1 flex w-full flex-col gap-1 md:mt-3">
                <Controller
                  name="gender"
                  rules={{ required: "*You must select an option" }}
                  control={control}
                  render={({ field }) => {
                    return (
                      <div className="flex items-center gap-[30px]">
                        <label className="inline-flex items-center gap-2">
                          <input
                            {...field}
                            checked={field.value === "Male"}
                            type="radio"
                            value="Male"
                            className="form-radio size-5 rounded-lg border-gray-400 text-[#3a643b] checked:text-[#3a643b] hover:text-[#3a643b] focus:ring-0 focus:ring-offset-0"
                          />
                          <span className="font-nunito text-[17px] font-bold text-[#818181]">{`Male`}</span>
                        </label>
                        <label className="inline-flex items-center gap-2">
                          <input
                            {...field}
                            checked={field.value === "Female"}
                            type="radio"
                            value="Female"
                            className="form-radio size-5 rounded-lg border-gray-400 text-[#3a643b] checked:text-[#3a643b] hover:text-[#3a643b] focus:ring-0 focus:ring-offset-0"
                          />
                          <span className="font-nunito text-[17px] font-bold text-[#818181]">{`Female`}</span>
                        </label>
                        <label className="inline-flex items-center gap-2">
                          <input
                            {...field}
                            checked={field.value === "Others"}
                            type="radio"
                            value="Others"
                            className="form-radio size-5 rounded-lg border-gray-400 text-[#3a643b] checked:text-[#3a643b] hover:text-[#3a643b] focus:ring-0 focus:ring-offset-0"
                          />
                          <span className="font-nunito text-[17px] font-bold text-[#818181]">{`Others`}</span>
                        </label>
                      </div>
                    );
                  }}
                />
              </div>
              {errors.gender && (
                <ErrorElement message={errors.gender.message} />
              )}
            </div>
          </div>
          {/* State & Country */}
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-16 xl:gap-28">
            <div className="flex flex-col gap-[10px]">
              <label
                htmlFor="state-name"
                className="font-nunito text-[18px] font-semibold leading-[18px]"
              >
                <span>{`State `}</span>
              </label>
              <div className="flex w-full flex-col gap-1">
                <input
                  id="state-name"
                  className={`w-full rounded-[11px] border-[2px] border-solid px-4 py-2.5 focus:outline-none focus:ring-0 ${errors.stateName ? "border-red-500 focus:border-red-500" : `border-[#e5e7eb] focus:border-[#e5e7eb]`}`}
                  {...register("stateName", { required: false })}
                />
                {errors.stateName && <ErrorElement />}
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <label
                htmlFor="country-name"
                className="font-nunito text-[18px] font-semibold leading-[18px]"
              >
                <span>{`Country `}</span>
              </label>
              <div className="flex w-full flex-col gap-1">
                <input
                  id="country-name"
                  className={`w-full rounded-[11px] border-[2px] border-solid px-4 py-2.5 focus:outline-none focus:ring-0 ${errors.countryName ? "border-red-500 focus:border-red-500" : `border-[#e5e7eb] focus:border-[#e5e7eb]`}`}
                  {...register("countryName", { required: false })}
                />
                {errors.countryName && <ErrorElement />}
              </div>
            </div>
          </div>
          {/* Height & Weight */}
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 md:gap-16 xl:gap-28">
            <div className="flex flex-col gap-[10px]">
              <label
                htmlFor="height"
                className="font-nunito text-[18px] font-semibold leading-[18px]"
              >
                <span>{`Height (cm) `}</span>
                <span className="font-bold text-[#dd461e]">*</span>
              </label>
              <div className="flex w-full flex-col gap-1">
                <input
                  id="height"
                  type="number"
                  className={`w-full rounded-[11px] border-[2px] border-solid px-4 py-2.5 focus:outline-none focus:ring-0 ${errors.height ? "border-red-500 focus:border-red-500" : `border-[#e5e7eb] focus:border-[#e5e7eb]`}`}
                  {...register("height", {
                    required: true,
                    pattern: /^[0-9]*$/,
                  })}
                />
                {errors.height && <ErrorElement />}
              </div>
            </div>
            <div className="flex flex-col gap-[10px]">
              <label
                htmlFor="weight"
                className="font-nunito text-[18px] font-semibold leading-[18px]"
              >
                <span>{`Weight (kg) `}</span>
                <span className="font-bold text-[#dd461e]">*</span>
              </label>
              <div className="flex w-full flex-col gap-1">
                <input
                  type="number"
                  id="weight"
                  className={`w-full rounded-[11px] border-[2px] border-solid px-4 py-2.5 focus:outline-none focus:ring-0 ${errors.weight ? "border-red-500 focus:border-red-500" : `border-[#e5e7eb] focus:border-[#e5e7eb]`}`}
                  {...register("weight", { required: true })}
                />
                {errors.weight && <ErrorElement />}
              </div>
            </div>
          </div>

          <button className="mt-5 w-[200px] rounded-[10px] bg-[#3a643b] px-10 py-2 font-nunito text-[24px] font-semibold text-white sm:mt-10 sm:w-[254px] sm:py-3">
            Save
          </button>
        </div>
      </form>
    </ContentBoxLayout>
  );
};

export default PatientProfileEdit;

const ErrorElement = ({ message }) => (
  <span className="self-end pr-1 text-[13px] font-medium italic leading-4 text-red-600">
    {message || "*This field is required"}
  </span>
);
