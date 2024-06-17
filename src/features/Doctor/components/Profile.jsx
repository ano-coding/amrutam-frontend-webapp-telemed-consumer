import Banner from "./Banner";
import ProfileDetails from "./ProfileDetails";

const doctor = {
  name: "Dr. Bruce Willis",
  specialization: "Gynecologist",
  about:
    "Hello, I am Dr. Bruce Willis, a Gynaecologist at Sanjivni Hospital in Surat. I love collaborating with all my hospital staff and senior doctors to provide exceptional care to our patients. I completed my graduation in Gynaecology Medicine, where I gained comprehensive knowledge and skills in women's health. I am dedicated to staying updated with the latest advancements in gynaecological care to ensure that my patients receive the best possible treatments. It's a privilege to serve the community and contribute to women's wellness through my practice at Sanjivni Hospital.",
  ratings: 4.2,
  followers: "850",
  following: "18K",
  posts: "250",
  languages: ["English", "Hindi", "Telugu"],
  socials: {
    facebook: "#",
    instagram: "#",
    youtube: "#",
    twitter: "#",
  },
  specializationList: ["Women's Health", "Skin Care", "Immunity", "Hair Care"],
  treatments: [
    "Skin Treatment",
    "Pregnancy",
    "Period Doubts",
    "Endometriosis",
    "Pelvic Pain",
    "Ovarian Cysts",
    "Menopause Management",
    "Fertility Issues",
    "Pap Smear",
    "Vaginal Infections",
    "Contraception Counseling",
  ],
  workExperience: {
    years: "7+",
    hospitals: [
      {
        name: "Midtown Medical Clinic",
        role: "Senior doctor",
        years: "2016-PRESENT",
      },
      {
        name: "Midtown Medical Clinic",
        role: "Junior doctor",
        years: "2010-2015",
      },
    ],
  },
  featuredReviews: [
    {
      name: "Alicent Hightower",
      picture: "demoprofile.png",
      consultedFor: "Skin care",
      stars: 5,
      description:
        "Might be bit early to confirm but yes I can see noticeable difference in my hairfall. will write again after using it for longer periods",
      date: "25 January 2024",
    },
    {
      name: "Alice Sinek",
      picture: "demoprofile.png",
      consultedFor: "Pregnancy",
      stars: 4,
      description:
        "Might be bit early to confirm but yes I can see noticeable difference in my hairfall. will write again after using it for longer periods",
      date: "20 January 2023",
    },
  ],
  sessionMode: [
    {
      type: "In-Clinic",
      time: "45 Mins",
    },
    {
      type: "Video",
      time: "45 Mins",
    },
    {
      type: "Chat",
      time: "10 Mins",
    },
  ],
  bookingSlots: [
    {
      part: "Morning",
      timing: [
        "09:00 AM",
        "09:30 AM",
        "10:00 AM",
        "10:15 AM",
        "10:45 AM",
        "11:00 AM",
      ],
    },
    {
      part: "evening",
      timing: [
        "04:00 PM",
        "04:15 PM",
        "04:30 PM",
        "04:45 PM",
        "05:00 PM",
        "05:15 PM",
      ],
    },
  ],
};

function Profile() {
  const {
    name,
    specialization,
    ratings,
    followers,
    following,
    posts,
    languages,
    socials,
    about,
    specializationList,
    treatments,
    workExperience,
    featuredReviews,
    sessionMode,
    bookingSlots,
  } = doctor;

  return (
    <main className=" my-16 flex w-full items-center justify-center ">
      <div className="flex w-[85%] flex-col items-center justify-center">
        <Banner
          name={name}
          followers={followers}
          following={following}
          posts={posts}
          specialization={specialization}
          ratings={ratings}
        />
        <ProfileDetails
          specializationList={specializationList}
          about={about}
          languages={languages}
          socials={socials}
          treatments={treatments}
          workExperience={workExperience}
          featuredReviews={featuredReviews}
          sessionMode={sessionMode}
          bookingSlots={bookingSlots}
        />
      </div>
    </main>
  );
}

export default Profile;
