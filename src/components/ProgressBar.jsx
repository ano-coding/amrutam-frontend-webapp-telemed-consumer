const ProgressBar = ({ step }) => {
  const steps = [
    { id: 1, name: "Basic Info" },
    { id: 2, name: "Attach Reports" },
    { id: 3, name: "Pick A Timeslot" },
    { id: 4, name: "Make Payment" },
  ];

  return (
    <div className="my-4 flex w-full items-center justify-between">
      {steps.map((item) => (
        <div key={item.id} className="flex flex-1 flex-col items-center">
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${step >= item.id ? "bg-[--primary] text-white" : "border border-[#676767] text-gray-600"}`}
          >
            {item.id}
          </div>

          <span
            className={`md:text-md xl:text-md mt-2 hidden text-sm sm:inline ${step >= item.id ? "text-[--primary]" : "text-gray-600"}`}
          >
            {item.name}
          </span>
          {item.id !== steps.length && (
            <div
              className={`h-0.5 flex-1 ${step >= item.id + 1 ? "bg-[--primary]" : ""}`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
