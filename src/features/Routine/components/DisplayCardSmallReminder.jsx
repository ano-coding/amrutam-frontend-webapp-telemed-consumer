import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import useGetSingleProductFromStore from "../../../hooks/routines/useGetSingleProductFromStore";
import { Link } from "react-router-dom";
import useGetSingleUnit from "../../../hooks/routines/useGetSingleUnit";

const DisplayCardSmallReminder = ({
  title,
  shopifyId,
  tag,
  onClick,
  reminder,
}) => {
  const { token } = useContext(UserContext);
  const { data: productData } = useGetSingleProductFromStore([
    token,
    shopifyId,
  ]);

  const { data: singleUnit } = useGetSingleUnit([token, reminder?.dosageUnit]);

  console.log(singleUnit);

  return (
    <div className="flex gap-3 rounded-2xl border-[1px] border-solid border-neutral-200 px-[10px] py-[10px] hover:shadow-lg hover:shadow-neutral-100 md:w-[380px]">
      <img
        className="h-[100px] w-[100px] rounded-lg object-cover"
        src={productData?.data?.ProductData?.at(0)?.image?.src}
      />
      <div className="flex flex-1 flex-col justify-between">
        <span className="line-clamp-1 text-[16px] font-medium leading-[24px] tracking-[0.15px]">
          {title}
        </span>
        <div>
          <span className="rounded-[64px] bg-[#E9F1E0] p-[10px] py-2 text-[14px] tracking-[-0.02em] text-[#A0A0A0]">
            {tag}
          </span>
        </div>
        <Link
          to="add-reminder"
          state={{
            isEdit: true,
            dosageUnitObject: singleUnit,
            reminderType: "product",
            ...reminder,
          }}
          className="cursor-pointer font-nunito text-[14px] font-bold text-[#3A643B]"
        >
          Edit
        </Link>
      </div>
      <div onClick={onClick}>
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
  );
};

export default DisplayCardSmallReminder;
