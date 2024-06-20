import { useState } from "react";
import ContentBoxLayout from "../../../components/ContentBoxLayout";
import ChatList from "./ChatList";
import ChatWindow from "./ChatWindow";

const contacts = [
  {
    name: "Dr. William Stephin",
    image: "/doctor-sample.png",
    message: "Lorem ipsum dolor sit amet...",
    time: "10:22 AM",
    newMessages: 3,
    lastSeen: "3min",
    isActive: true,
  },
  {
    name: "Dr. Mark Hay Smith",
    image: "/doctor-sample.png",
    message: "Lorem ipsum dolor sit amet...",
    time: "2hrs ago",
    newMessages: 0,
    lastSeen: "2hrs",
    isActive: true,
  },
  {
    name: "Dr. kain ",
    image: "/doctor-sample.png",
    message: "Lorem ipsum dolor sit amet...",
    time: "2hrs ago",
    newMessages: 0,
    lastSeen: "2hrs",
    isActive: false,
  },
  {
    name: "Dr. Akash ",
    image: "/doctor-sample.png",
    message: "Lorem ipsum dolor sit amet...",
    time: "2hrs ago",
    newMessages: 0,
    lastSeen: "2hrs",
    isActive: true,
  },
  {
    name: "Dr. Mehmud",
    image: "/doctor-sample.png",
    message: "Lorem ipsum dolor sit amet...",
    time: "2hrs ago",
    newMessages: 0,
    lastSeen: "2hrs",
    isActive: false,
  },
  // Add more contacts here...
];

const messages = [
  {
    text: "How likely are you to recommend this product to your patients?",
    sender: "them",
    time: "06:00 PM, 30 Sep 2022",
  },
  {
    text: "Vivamus sed dictum dictum ligula, cursus blandit risus",
    sender: "me",
    time: "06:00 PM, 30 Sep 2022",
  },
  {
    text: "Vivamus sed dictum dictum ligula, cursus blandit risus",
    sender: "them",
    time: "06:00 PM, 30 Sep 2022",
  },
  {
    text: "Vivamus sed dictum dictum ligula, cursus blandit risus",
    sender: "me",
    time: "06:00 PM, 30 Sep 2022",
  },
  {
    text: "Vivamus sed dictum dictum ligula, cursus blandit risus",
    sender: "them",
    time: "06:00 PM, 30 Sep 2022",
  },
  // Add more messages here...
];

const Chats = () => {
  const [selectedContact, setSelectedContact] = useState(null);

  const handleContactSelect = (contact) => {
    setSelectedContact(contact);
  };

  const handleBackClick = () => {
    setSelectedContact(null);
  };
  return (
    <div className="flex flex-col gap-[37px] pt-4">
      <ContentBoxLayout title="My Chats">
        <div className="flex w-full">
          <ChatList
            contacts={contacts}
            onSelect={handleContactSelect}
            isHidden={selectedContact !== null}
          />
          {selectedContact && (
            <ChatWindow
              selectedContact={selectedContact}
              messages={messages}
              onBack={handleBackClick}
            />
          )}
        </div>
      </ContentBoxLayout>
    </div>
  );
};

export default Chats;
