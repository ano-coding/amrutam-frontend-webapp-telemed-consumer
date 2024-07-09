import Breadcrumb from "../../../components/Breadcrumb";
import ContentBoxLayout from "../../../components/ContentBoxLayout";
import AddReminderChannels from "./AddReminderChannels";

const REMINDER_CHANNELS = [
  { title: "SMS", channel: "Mobile Number", isActive: true },
  { title: "WhatsApp", channel: "WhatsApp Number", isActive: true },
  { title: "Call", channel: "Mobile Number", isActive: true },
  { title: "Email", channel: "Email ID", isActive: true },
  {
    title: "Facebook Messenger",
    channel: "",
    isActive: false,
    btnLabel: "Add Account",
  },
  { title: "Instagram", channel: "", isActive: false, btnLabel: "Add Account" },
  {
    title: "Google Calendar",
    channel: "",
    isActive: false,
    btnLabel: "Add Account",
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
        <div className="flex w-full flex-col gap-10 rounded-xl px-5 py-4 lg:pr-16">
          <div className="flex flex-col gap-7">
            <div className="text-[18px] text-black">Active Channels</div>
            <div className="flex flex-wrap gap-9">
              {REMINDER_CHANNELS.map((item) => (
                <div key={item.title} className="w-full sm:w-fit">
                  {item.isActive && (
                    <div key={item.title} className="w-full sm:w-fit xl:mr-5">
                      <AddReminderChannels
                        title={item.title}
                        channel={item.channel}
                        isActive={item.isActive}
                        btnLabel={item.btnLabel}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-7">
              <div className="text-[18px] text-black">Inactive Channels</div>
              <div className="flex flex-wrap gap-9">
                {REMINDER_CHANNELS.map((item) => (
                  <div
                    key={item.title}
                    className={`w-full sm:w-fit ${!item.isActive ? "" : "hidden"}`}
                  >
                    {!item.isActive && (
                      <div key={item.title} className="w-full sm:w-fit xl:mr-5">
                        <AddReminderChannels
                          title={item.title}
                          channel={item.channel}
                          isActive={item.isActive}
                          btnLabel={item.btnLabel}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ContentBoxLayout>
    </div>
  );
};

export default ReminderChannel;
