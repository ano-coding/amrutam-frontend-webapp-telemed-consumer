const RoutineCard = ({ image, title, reminders, progress }) => {
  return (
    <div className="mx-1 mb-4 w-[auto] rounded-2xl border p-3 sm:p-4 md:mx-2">
      <img
        src={image}
        alt={title}
        className="mb-2 aspect-square w-full rounded-xl object-cover"
      />

      <div className="flex w-full items-center justify-between gap-1 font-nunito text-sm font-bold md:text-lg">
        <h4 className="line-clamp-1 overflow-ellipsis">{title}</h4>
        <span className="whitespace-nowrap">{progress} 🌻</span>
      </div>

      <p className="text-xs font-medium text-[#a0a0a0] sm:text-base">
        {reminders} Reminder Items
      </p>

      <div className="mt-2 flex w-full items-center justify-between">
        <div className="my-1 h-1.5 w-full rounded-full bg-gray-200">
          <div
            className={`h-1.5 rounded-full bg-[#3a643b]`}
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
      <span className="text-[10px] font-medium text-[#a0a0a0] sm:text-sm">
        {progress}% Finished
      </span>
    </div>
  );
};

export default RoutineCard;
