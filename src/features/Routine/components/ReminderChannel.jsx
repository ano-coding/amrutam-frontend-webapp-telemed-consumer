import { useContext } from "react";
import Breadcrumb from "../../../components/Breadcrumb";
import ContentBoxLayout from "../../../components/ContentBoxLayout";
import AddReminderChannels from "./AddReminderChannels";
import { UserContext } from "../../../context/UserContext";
import { FormProvider, useForm } from "react-hook-form";
import useCreateReminderChannel from "../../../hooks/routines/useCreateReminderChannel";
import { useLocation, useNavigate } from "react-router-dom";

const REMINDER_CHANNELS = [
  {
    title: "SMS",
    name: "sms",
    channel: "Mobile Number",
  },
  {
    title: "WhatsApp",
    channel: "WhatsApp Number",
    name: "whatsapp",
  },
  {
    title: "Call",
    channel: "Mobile Number",
    name: "call",
  },
  {
    title: "Email",
    channel: "Email ID",
    name: "email",
  },
  {
    title: "Facebook Messenger",
    channel: "",
    name: "fbMessenger",
  },
  {
    title: "Instagram",
    channel: "",
    name: "instagram",
  },
  {
    title: "Google Calendar",
    channel: "",
    name: "googleCalendar",
  },
];

const breadCrumbList = [
  {
    name: "Routines",
    link: "routines",
    isActive: false,
  },
  {
    name: "Create Routine",
    link: "routines/create",
    isActive: false,
  },
  {
    name: "Add Reminder Channels",
    link: "routines/create/add-reminder-channels",
    isActive: true,
  },
];

const ReminderChannel = () => {
  const navigate = useNavigate();
  const { token } = useContext(UserContext);
  const { state } = useLocation();
  console.log(state);

  const { createReminderChannelMutate, createReminderChannelStatus } =
    useCreateReminderChannel();

  let defaultValues = {};

  if (state) {
    defaultValues = {
      sms: state?.sms?.value,
      smsStatus: state?.sms?.status,
      whatsapp: state?.whatsapp?.value,
      whatsappStatus: state?.whatsapp?.status,
      call: state?.call?.value,
      callStatus: state?.call?.status,
      email: state?.email?.value,
      emailStatus: state?.email?.status,
      // fbMessengerUserId: state?.fbMessenger?.userId,
      // fbMessengerAccessToken: state?.fbMessenger?.accessToken,
      // fbMessengerStatus: state?.fbMessenger?.status,
      // instagramUserId: state?.instagram?.userId,
      // instagramAccessToken: state?.instagram?.accessToken,
      // instagramStatus: state?.instagram?.status,
      // googleCalendarUserId: state?.googleCalendar?.userId,
      // googleCalendarAccessToken: state?.googleCalendar?.accessToken,
      // googleCalendarRefreshToken: state?.googleCalendar?.refreshToken,
      // googleCalendarExpiryDate: state?.googleCalendar?.expiryDate,
      // googleCalendarStatus: state?.googleCalendar?.status,
    };
  }

  const methods = useForm({ defaultValues });

  const onSubmit = (data) => {
    console.log(data);

    const apiData = {
      sms: {
        value: data.sms,
        status: data.smsStatus,
      },
      whatsapp: {
        value: data.whatsapp,
        status: data.whatsappStatus,
      },
      call: {
        value: data.call,
        status: data.callStatus,
      },
      email: {
        value: data.email,
        status: data.emailStatus,
      },
      fbMessenger: {
        userId: data.fbMessengerUserId,
        accessToken: data.fbMessengerAccessToken,
        status: data.fbMessengerStatus,
      },
      instagram: {
        userId: data.instagramUserId,
        accessToken: data.instagramAccessToken,
        status: data.instagramStatus,
      },
      googleCalendar: {
        userId: data.googleCalendarUserId,
        accessToken: data.googleCalendarAccessToken,
        refreshToken: data.googleCalendarRefreshToken,
        expiryDate: data.googleCalendarExpiryDate,
        status: data.googleCalendarStatus,
      },
    };
    createReminderChannelMutate([apiData, token]);
  };

  return (
    <div className="flex w-full flex-col gap-[37px]">
      <Breadcrumb list={breadCrumbList} />
      <div className="flex w-full flex-col items-center justify-between rounded-[15px] bg-[#FFF7E2] px-5 py-6 md:flex-row lg:px-12 lg:py-8">
        <div className="flex w-full flex-col gap-2">
          <h1 className="font-nunito text-2xl font-bold text-[#3a643b]">
            {`what are Reminder Channels?`}
          </h1>

          <p className="rounded-lg text-justify font-light text-[#484848]">
            {`Reminder channels are communication methods through which reminders can be sent, such as SMS, email, Facebook Messenger, Instagram, and more.`}
          </p>
        </div>
      </div>
      <ContentBoxLayout title={`Add Reminder Channels`}>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <div className="flex w-full flex-col gap-10 rounded-xl px-5 py-4 lg:pr-16">
              <div className="flex flex-col gap-7">
                <div className="text-[18px] text-black">Active Channels</div>
                <div className="flex flex-wrap gap-9">
                  {REMINDER_CHANNELS.map((item) => (
                    <div
                      key={item.title}
                      className={`w-full sm:w-fit ${methods.watch(`${item.name}Status`) ? "" : "hidden"}`}
                    >
                      {methods.watch(`${item.name}Status`) && (
                        <div className="w-full sm:w-fit xl:mr-5">
                          <AddReminderChannels {...item} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col gap-7">
                  <div className="text-[18px] text-black">
                    Inactive Channels
                  </div>
                  <div className="flex flex-wrap gap-9">
                    {REMINDER_CHANNELS.map((item) => (
                      <div
                        key={item.title}
                        className={`w-full sm:w-fit ${!methods.watch(`${item.name}Status`) ? "" : "hidden"}`}
                      >
                        {!methods.watch(`${item.name}Status`) && (
                          <div className="w-full sm:w-fit xl:mr-5">
                            <AddReminderChannels {...item} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex w-full items-center justify-center gap-5">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(-1);
                  }}
                  className={`my-10 box-border rounded-xl border-2 border-[#3A643B] px-5 py-[17px] text-center text-base font-semibold text-[#3A643B] shadow-sm duration-100 hover:bg-[#f4f4f4] active:scale-95 sm:w-[15rem] lg:w-[20rem] xl:w-[23.4rem]`}
                >
                  Cancel
                </button>
                <button className="my-10 box-border rounded-xl border-2 border-solid border-[#3A643B] bg-[#3a643b] px-16 py-[17px] text-center text-base font-semibold text-white shadow-[0px_4px_14px_rgba(58,_100,_59,_0.25)] duration-100 hover:bg-[#618a61] active:scale-95 md:w-[23.4rem]">
                  Save
                </button>
              </div>
            </div>
          </form>
        </FormProvider>
      </ContentBoxLayout>
    </div>
  );
};

export default ReminderChannel;
