import { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import ContentBoxLayout from "../../../components/ContentBoxLayout";
import AddConvenience from "./AddConvenience";
import DisplayCardSmall from "./DisplayCardSmall";
import SimpleDropDownComponent from "./DropDownComponent";
import SingleLineInput from "./SingleLineInput";
import PhotoUploader from "./PhotoUploader";

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

const THUMBNAILS = [
  "hair-care-1.jpg",
  "hair-care-2.jpg",
  "hair-care-3.jpg",
  "hair-care-4.jpg",
  "hair-care-5.jpg",
];

const REMINDER_CHANNELS = ["SMS", "WhatsApp", "Email"];

const CreateRoutine = () => {
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);

  // Add Bullet point on Tab key press
  const [value, setValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setValue(value + "\n•   ");
    }
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };
  return (
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
      <ContentBoxLayout title={`Create Routine`}>
        <div className="mb-2 flex w-full flex-col gap-10 rounded-xl px-5 py-10 lg:pr-16">
          <SingleLineInput
            label={`Routine Name`}
            placeholder={"Hair Care Routine"}
            helpText={`This will be displayed as your Routine name.`}
            mdWidth={"400"}
          />
          <div className="flex flex-col gap-1">
            <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
              <PhotoUploader />
              <div className="flex items-center gap-[8px] text-[14px] sm:flex-col">
                <div className="h-[0.8px] w-[71px] bg-[#b0c1b1] sm:h-[71px] sm:w-[0.8px]" />
                <div className="font-medium leading-[24px] tracking-[-0.01em] text-neutral-500">
                  OR
                </div>
                <div className="h-[0.8px] w-[71px] bg-[#b0c1b1] sm:h-[71px] sm:w-[0.8px]" />
              </div>
              <div className="flex flex-col gap-[14px]">
                <div className="whitespace-nowrap text-[14px] leading-[12px] text-neutral-700">
                  Select from our picks
                </div>
                <div className="flex flex-wrap gap-3 sm:gap-[15px]">
                  {THUMBNAILS.map((thumbnail) => (
                    <span
                      key={thumbnail}
                      onClick={() => {
                        if (selectedThumbnail === thumbnail) {
                          setSelectedThumbnail(null);
                        } else {
                          setSelectedThumbnail(thumbnail);
                        }
                      }}
                      className={`relative z-10 box-border shrink-0 cursor-pointer rounded-lg border-[0.14rem] border-solid hover:border-[#3a643b] ${selectedThumbnail === thumbnail ? `border-[#3a643b]` : "border-transparent"}`}
                    >
                      <img
                        className="h-14 w-14 shrink-0 rounded-lg object-cover"
                        alt=""
                        src={`/${thumbnail}`}
                      />
                      {selectedThumbnail === thumbnail && (
                        <span className="absolute right-0 top-0 z-50 block h-[14px] w-[14px] -translate-y-1/2 translate-x-1/2 transform bg-[url(/checked.svg)]" />
                      )}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-3 w-full pl-3 text-[12px] leading-[16px] text-neutral-400 sm:mt-0">
              This will be displayed as your Routine thumbnail.
            </div>
          </div>
          {/* Section 3 */}
          <div className="flex flex-col items-center justify-between gap-5 sm:flex-row">
            <div className="flex w-full flex-col gap-8 md:w-[300px] lg:w-[400px]">
              <div className="flex flex-col gap-1">
                <SimpleDropDownComponent
                  list={[
                    "Lifestyle",
                    "Fitness",
                    "Health",
                    "Beauty",
                    "Meditation",
                  ]}
                  label="Category"
                  mdWidth={"w-[400px]"}
                  placeholder={"Example: Lifestyle, Fitness, etc."}
                />
                <div className="w-full pl-3 text-[12px] leading-[16px] text-neutral-400">
                  Please select the category of your Routine.
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <SimpleDropDownComponent
                  label={`Duration`}
                  list={Array.from({ length: 7 }, (_, i) => i + 1)}
                  placeholder={"1"}
                />
                <SimpleDropDownComponent
                  label={`Unit`}
                  list={["Days", "Weeks", "Months"]}
                  placeholder={"Weeks"}
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
                  onChange={handleChange}
                  onBeforeInput={() => {
                    if (value === "") setValue("•   ");
                  }}
                  value={value}
                  rows={6}
                  type="text"
                  name="description"
                  id="description"
                  className="custom-scrollbar block w-full border-0 p-0 py-1.5 pl-1 text-[14px] leading-[24px] text-black placeholder-neutral-400 placeholder:text-sm focus:ring-0"
                />
              </div>
              <div className="w-full pl-3 text-[12px] leading-[16px] text-neutral-400">
                Please add at least 3 pointers about the Routine.
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <AddConvenience
              link={"add-reminder"}
              title="Add Reminder Items"
              subtitle="Add Items for your Routine"
            />
            <div className="flex flex-col flex-wrap gap-4 sm:flex-row sm:gap-10 md:gap-16">
              <DisplayCardSmall
                title="Amrutam Kuntal Hair Care Oil"
                img="product1.png"
                tag="Consumable"
              />
              <DisplayCardSmall
                title="Amrutam Kuntal Hair Care Oil"
                img="product1.png"
                tag="Consumable"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <AddConvenience
              title="Add Weekly Benefits"
              subtitle="Add weekly benefits of this Routine so that users can tally the progress"
              link="weekly-benefits"
            />
          </div>
          <div className="flex flex-col gap-4">
            <AddConvenience
              link="add-reminder-channels"
              title="Add Reminder Channels"
              subtitle="We will notify you about your Routine using channels."
            />
            <div className="ml-10 flex gap-3">
              {REMINDER_CHANNELS.map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between gap-2 rounded-lg bg-[#3a643b] py-[6px] pl-3 pr-2 text-white"
                >
                  <span className="text-[14px] font-medium leading-[20px] tracking-[0.1px]">
                    {item}
                  </span>
                  <img className="h-[18px]" src="/cross-icon.svg" />
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <AddConvenience
              link="assign-caregiver"
              title="Assign a Caregiver"
              subtitle="We will keep updating caregiver about your Routine."
            />
            <div className="flex flex-col flex-wrap gap-4 sm:flex-row sm:gap-10 md:gap-16">
              <div className="flex gap-2 rounded-2xl border-[1px] border-solid border-neutral-200 px-[10px] py-[10px] hover:shadow-md hover:shadow-neutral-100 md:w-[342px]">
                <img
                  className="h-[100px] w-[100px] rounded-lg object-cover"
                  src="/person4.png"
                />
                <div className="flex flex-1 flex-col justify-between">
                  <span className="text-[16px] font-medium leading-[24px] tracking-[0.15px]">
                    Pema Leilani
                  </span>
                  <div>
                    <span className="rounded-[64px] bg-[#E9F1E0] p-[10px] text-[14px] tracking-[-0.02em] text-[#A0A0A0]">
                      Personal Contact
                    </span>
                  </div>
                  <span className="font-nunito text-[14px] font-semibold text-[#3a643b]">
                    View Details
                  </span>
                </div>

                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g id="cross-icon">
                    <path
                      id="icon"
                      d="M14.25 4.8075L13.1925 3.75L9 7.9425L4.8075 3.75L3.75 4.8075L7.9425 9L3.75 13.1925L4.8075 14.25L9 10.0575L13.1925 14.25L14.25 13.1925L10.0575 9L14.25 4.8075Z"
                      fill="#3A643B"
                    />
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <button className="mx-auto my-10 box-border rounded-xl bg-[#3a643b] px-16 py-[17px] text-center text-base font-semibold text-white shadow-[0px_4px_14px_rgba(58,_100,_59,_0.25)] duration-100 hover:bg-[#618a61] active:scale-95 md:w-[23.4rem]">
            Proceed
          </button>
        </div>
      </ContentBoxLayout>
    </div>
  );
};

export default CreateRoutine;
