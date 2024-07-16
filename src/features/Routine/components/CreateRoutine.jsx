import { Fragment, useContext, useMemo, useRef, useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import ContentBoxLayout from "../../../components/ContentBoxLayout";
import { Controller, useForm } from "react-hook-form";
import { uploadRoutineFileToAzure } from "../../../services/apiUpload";
import { UserContext } from "../../../context/UserContext";
import useGetCategories from "../../../hooks/routines/useGetCategories";
import RoutineCategoriesDropDown from "./RoutineCategoriesDropDown";
import RoutineDurationDropDown from "./RoutineDurationDropDown";
import useCreateRoutine from "../../../hooks/routines/useCreateRoutine";
import { useLocation, useNavigate } from "react-router-dom";
import useUpdateRoutine from "../../../hooks/routines/useUpdateRoutine";
import ConfirmationModal from "./ConfirmationModal";
import useDeleteWeeklyBenefits from "../../../hooks/routines/useDeleteWeeklyBenefits";
import useGetSingleRoutine from "../../../hooks/routines/useGetSingleRoutine";

const breadCrumbList = [
  {
    name: "Routines",
    link: "routines",
    isActive: false,
  },
  {
    name: "Create Routines",
    link: "routines/create",
    isActive: true,
  },
];

const CreateRoutine = () => {
  const [confirmDurationChangeModal, setConfirmDurationChangeModal] =
    useState(false);
  const { token } = useContext(UserContext);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const { state } = useLocation();
  const isEdit = state?.isEdit;

  const data = state?.routine;

  const routineId = state?.routine?._id;
  const {
    data: routineData,
    error: routineError,
    isFetching: isRoutineFetching,
  } = useGetSingleRoutine(token, routineId);
  console.log(routineData);

  const defaultValues = data
    ? {
        name: data.name,
        photo: data.image,
        category: data.category,
        durationNumber: data.duration.number,
        durationUnit: data.duration.unit,
        description: data.description,
      }
    : {};

  let photoData = data?.image;

  const {
    data: gcData,
    error: gcError,
    isLoading: gcLoading,
  } = useGetCategories(token);

  const { deleteWeeklyBenefitsMutate, deleteWeeklyBenefitsStatus } =
    useDeleteWeeklyBenefits();

  const isDeletingWeeklyBenefit = deleteWeeklyBenefitsStatus === "pending";

  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    watch,

    control,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  // Add Bullet point on Tab key press

  const [selectedFile, setSelectedFile] = useState(null);
  const [disableDuration, setDisableDuration] = useState(() => isEdit);
  const navigate = useNavigate();
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const { createRoutineMutate, createRoutineStatus } = useCreateRoutine();
  const { updateRoutineMutate, updateRoutineStatus } = useUpdateRoutine();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
      setSelectedThumbnail(null);
    }
  };

  const handleDivClick = () => {
    fileInputRef.current.click();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setValue("description", getValues("description") + "\n•   ");
    }
  };

  const onSubmit = async (formData) => {
    try {
      if (selectedFile !== null) {
        const response = await uploadRoutineFileToAzure(selectedFile, token);
        photoData = response.data;
      }

      const routineData = {
        name: formData.name,
        visibility: "Private",
        image: selectedThumbnail || photoData,
        category: formData.category,
        duration: {
          number: formData.durationNumber,
          unit: formData.durationUnit,
        },
        description: formData.description,
        // channel: ["email", "call"],
      };
      if (isEdit) {
        updateRoutineMutate([routineData, token, data._id], {
          onSuccess: () =>
            navigate("create-additionals", {
              state: state,
            }),
        });
      } else {
        createRoutineMutate([routineData, token], {
          onSuccess: (data) => {
            navigate("create-additionals", {
              state: data,
            });
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const category = gcData?.data?.find(
    (category) => category._id === watch("category"),
  );

  const aiThumbnails = useMemo(() => {
    if (!category) return [];

    return category.aiImages?.sort(() => 0.5 - Math.random())?.slice(0, 5);
  }, [category]);

  return (
    <Fragment>
      <div className="flex w-full flex-col gap-[37px]">
        <Breadcrumb list={breadCrumbList} />
        <div className="flex w-full flex-col items-center justify-between rounded-[15px] bg-[#FFF7E2] px-5 py-6 md:flex-row lg:px-12 lg:py-8">
          <div className="flex w-full flex-col gap-2">
            <h1 className="font-nunito text-2xl font-bold text-[#3a643b]">
              {`What's a routine?`}
            </h1>

            <p className="rounded-lg text-justify font-light text-[#484848]">
              {`Reminder items could be products or activities that you want to remember to do at specific times or intervals. They help you stay organized and on track with your routine by prompting you when it's time to complete a particular task.`}
            </p>
          </div>
        </div>
        <ContentBoxLayout title={`${isEdit ? "Update" : `Create`} Routine`}>
          <div className="mt-5 grid w-full grid-cols-2 items-center gap-8 px-6 sm:px-10">
            <div className={`h-[5px] w-full rounded bg-[#3A643B]`} />
            <div className={`h-[5px] w-full rounded bg-[#D9D9D9]`} />
          </div>

          <div className="mb-2 flex w-full flex-col gap-10 rounded-xl px-5 py-10 lg:pr-16">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-10"
            >
              {/* Routine Name Input */}
              <div className="flex flex-col gap-1">
                <div
                  className={`relative rounded-[16px] border-[1.5px] border-[#ced8e0] px-3 py-2 shadow-sm md:w-[400px]`}
                >
                  <label
                    htmlFor="concerns"
                    className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-[12px] leading-[16px] text-neutral-400"
                  >
                    {`Routine Name`}
                  </label>

                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="block w-full border-0 p-0 py-1.5 text-[16px] leading-[24px] text-black placeholder-neutral-400 placeholder:text-sm focus:ring-0"
                    placeholder={"Hair Care Routine"}
                    {...register("name", {
                      required: "*Please Add a Routine Name",
                    })}
                  />
                  {errors?.name && (
                    <p className="absolute bottom-0 right-2 text-[12px] font-medium text-red-500">
                      {errors?.name?.message}
                    </p>
                  )}
                </div>

                <div className="w-full pl-3 text-[12px] leading-[16px] text-neutral-400">
                  {`This will be displayed as your Routine name.`}
                </div>
              </div>
              {/* Category, Duration, Descriptions */}
              <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
                <div className="flex w-full flex-col gap-8 md:w-[300px] lg:w-[400px]">
                  <div className="flex flex-col gap-1">
                    <Controller
                      name="category"
                      control={control}
                      rules={{ required: "*Please Choose a Category" }}
                      render={({ field }) => (
                        <RoutineCategoriesDropDown
                          list={gcData?.data || []}
                          label="Category"
                          mdWidth="w-[400px]"
                          placeholder="Example: Lifestyle, Fitness, etc."
                          value={
                            gcData?.data?.find(
                              (category) => category._id === field.value,
                            )?.name || ""
                          }
                          onChange={field.onChange}
                          error={errors?.category}
                        />
                      )}
                    />
                    <div className="w-full pl-3 text-[12px] leading-[16px] text-neutral-400">
                      Please select the category of your Routine.
                    </div>
                  </div>
                  <div className={`relative grid grid-cols-2 gap-5`}>
                    {isEdit && disableDuration && (
                      <div
                        onClick={(e) => {
                          e.preventDefault();
                          if (!disableDuration) return;
                          if (isEdit && disableDuration) {
                            setConfirmDurationChangeModal(true);
                            return;
                          }
                        }}
                        className="absolute z-10 h-full w-full"
                      />
                    )}
                    <Controller
                      name="durationNumber"
                      control={control}
                      rules={{ required: "*This field is required" }}
                      render={({ field }) => (
                        <RoutineDurationDropDown
                          list={Array.from({ length: 16 }, (_, i) => i + 1)}
                          label="Duration"
                          placeholder="1"
                          value={field.value}
                          onChange={field.onChange}
                          error={errors?.durationNumber}
                          disabled={disableDuration}
                        />
                      )}
                    />
                    <Controller
                      name="durationUnit"
                      control={control}
                      rules={{ required: "*This field is required" }}
                      render={({ field }) => (
                        <RoutineDurationDropDown
                          list={["Week(s)"]}
                          label={`Unit`}
                          placeholder="Weeks"
                          value={field.value}
                          onChange={field.onChange}
                          error={errors?.durationUnit}
                          disabled={disableDuration}
                        />
                      )}
                    />
                  </div>
                </div>
                <div className="mt-4 flex flex-col gap-1 sm:mt-0">
                  <div className="relative w-full rounded-[16px] border-[1.5px] border-[#ced8e0] px-3 py-2 shadow-sm md:w-[300px] lg:w-[400px]">
                    <label
                      htmlFor="description"
                      className="absolute -top-2 left-2 -mt-px inline-block bg-white px-1 text-[12px] leading-[16px] text-neutral-400"
                    >
                      Description
                    </label>

                    <textarea
                      onKeyDown={handleKeyDown}
                      onBeforeInput={() => {
                        if (getValues("description") === "")
                          setValue("description", "•   ");
                      }}
                      rows={6}
                      type="text"
                      name="description"
                      id="description"
                      className="custom-scrollbar block w-full border-0 p-0 py-1.5 pl-1 text-[14px] leading-[24px] text-black placeholder-neutral-400 placeholder:text-sm focus:ring-0"
                      {...register("description", {
                        required: "*Please Add Routine Description",
                        validate: (value) =>
                          (value.match(/•/g) || []).length >= 3 ||
                          "Please add at least 3 pointers about the Routine.",
                      })}
                    />
                    {errors?.description && (
                      <p className="absolute bottom-1 right-8 text-[12px] font-medium text-red-500">
                        {errors?.description?.message}
                      </p>
                    )}
                  </div>
                  <div className="w-full pl-3 text-[12px] leading-[16px] text-neutral-400">
                    Please add at least 3 pointers about the Routine.
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
                  {/* Photo Uploader */}
                  <div className="relative h-[210px] w-[210px] shrink-0 rounded-2xl bg-[url('/uploader.svg')] bg-center bg-no-repeat">
                    {previewUrl && (
                      <span
                        onClick={() => {
                          setPreviewUrl(null);
                          setSelectedFile(null);
                          setSelectedThumbnail(null);
                        }}
                        className="absolute right-0.5 top-0.5 z-20 block h-6 w-6 -translate-y-1/2 translate-x-1/2 transform bg-[url('/red-cross.svg')]"
                      />
                    )}
                    <div
                      onClick={handleDivClick}
                      className="flex h-full w-full flex-col items-center justify-center gap-[8px] text-[14px] text-black"
                    >
                      <img
                        alt="Photo Frame"
                        className={
                          previewUrl || photoData
                            ? `z-10 h-[210px] w-[210px] rounded-2xl object-cover`
                            : ""
                        }
                        src={
                          previewUrl
                            ? previewUrl
                            : photoData
                              ? photoData
                              : "/photo-frame.svg"
                        }
                      />

                      {!(previewUrl || photoData) && <div>Upload Image</div>}
                      <input
                        type="file"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-[8px] text-[14px] sm:flex-col">
                    <div className="h-[0.8px] w-[71px] bg-[#b0c1b1] sm:h-[71px] sm:w-[0.8px]" />
                    <div className="font-medium leading-[24px] tracking-[-0.01em] text-neutral-500">
                      OR
                    </div>
                    <div className="h-[0.8px] w-[71px] bg-[#b0c1b1] sm:h-[71px] sm:w-[0.8px]" />
                  </div>
                  <div className="flex flex-col gap-[14px]">
                    <div className="whitespace-nowrap text-[14px] capitalize leading-[12px] text-neutral-700">
                      Select from our Random picks
                    </div>
                    {aiThumbnails.length === 0 && (
                      <div className="py-5 text-[14px] font-medium capitalize leading-[12px] text-red-500">
                        *Please select Routine Category to view our Picks
                      </div>
                    )}
                    {!!aiThumbnails.length && (
                      <div className="flex flex-wrap gap-3 sm:gap-[15px]">
                        {aiThumbnails.map((thumbnail) => (
                          <span
                            key={thumbnail}
                            onClick={() => {
                              if (selectedThumbnail === thumbnail) {
                                setSelectedThumbnail(null);
                              } else {
                                setSelectedThumbnail(thumbnail);
                                setPreviewUrl(thumbnail);
                              }
                            }}
                            className={`relative z-10 box-border shrink-0 cursor-pointer rounded-lg border-[0.14rem] border-solid hover:border-[#3a643b] ${selectedThumbnail === thumbnail ? `border-[#3a643b]` : "border-transparent"}`}
                          >
                            <img
                              className="h-14 w-14 shrink-0 rounded-lg border object-cover"
                              alt=""
                              src={thumbnail}
                            />
                            {selectedThumbnail === thumbnail && (
                              <span className="absolute right-0 top-0 z-20 block h-[14px] w-[14px] -translate-y-1/2 translate-x-1/2 transform bg-[url(/checked.svg)]" />
                            )}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-3 w-full pl-3 text-[12px] leading-[16px] text-neutral-400 sm:mt-0">
                  This will be displayed as your Routine thumbnail.
                </div>
                {!(photoData || selectedThumbnail) && (
                  <p className="self-end text-[12px] font-medium text-red-500">
                    *Please Add a Routine Thumbnail
                  </p>
                )}
              </div>
              <div className="flex w-full items-center justify-center gap-3 sm:gap-6">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                  }}
                  className={`my-10 box-border rounded-xl border-2 border-[#3A643B] px-5 py-[17px] text-center text-base font-semibold text-[#3A643B] shadow-sm duration-100 hover:bg-[#f4f4f4] active:scale-95 sm:w-[15rem] lg:w-[20rem] xl:w-[23.4rem]`}
                >
                  Cancel
                </button>
                <button className="my-10 box-border rounded-xl border-2 border-[#3A643B] bg-[#3a643b] px-16 py-[17px] text-center text-base font-semibold text-white shadow-[0px_4px_14px_rgba(58,_100,_59,_0.25)] duration-100 hover:bg-[#618a61] active:scale-95 md:w-[23.4rem]">
                  Proceed
                </button>
              </div>
            </form>
          </div>
        </ContentBoxLayout>
      </div>
      <ConfirmationModal
        open={confirmDurationChangeModal}
        setOpen={setConfirmDurationChangeModal}
        render={() => (
          <>
            <h1
              className={
                "font-poppins self-start text-2xl font-semibold text-yellow-400"
              }
            >
              Alert
            </h1>
            <p className="font-poppins text-start text-sm font-medium">
              {`If You Change Routine Duration, All the `}
              <span className="font-semibold">
                Weekly Benefits will be deleted.
              </span>{" "}
              <span className="font-semibold tracking-wide">
                This cannot be undone.
              </span>
            </p>
            <div className="flex w-full justify-end gap-6">
              <button
                disabled={isDeletingWeeklyBenefit}
                onClick={() => setConfirmDurationChangeModal(false)}
                className={`font-poppins font-semibold text-neutral-600 ${
                  isDeletingWeeklyBenefit ? "opacity-55" : ""
                }`}
              >
                Cancel
              </button>
              <button
                disabled={isDeletingWeeklyBenefit}
                onClick={(e) => {
                  e.preventDefault();
                  deleteWeeklyBenefitsMutate(
                    [token, routineData?.data?.benefits?.at(0)?._id],
                    {
                      onSuccess: () => {
                        setDisableDuration(false);
                        setConfirmDurationChangeModal(false);
                      },
                      onError: (res) => {
                        console.log(res?.response?.data?.message);

                        if (
                          res?.response?.data?.message ===
                          "Invalid _id: undefined"
                        ) {
                          setDisableDuration(false);
                          setConfirmDurationChangeModal(false);
                        }
                      },
                    },
                  );
                }}
                className={`font-poppins font-semibold text-yellow-400 ${
                  isDeletingWeeklyBenefit ? "opacity-55" : ""
                }`}
              >
                Confirm
              </button>
            </div>
          </>
        )}
      />
    </Fragment>
  );
};

export default CreateRoutine;
