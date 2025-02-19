import { formatDate } from "../../../helper/formatDate";
const UserReview = ({ title, body, name, date, image, rating }) => {
  return (
    <div className="mb-6 flex w-[calc(100vw_-_168px)] items-center justify-start gap-2 rounded-xl bg-offWhite-100 p-3 max-lg:w-full max-sm:mx-5 max-sm:w-[calc(100%_-_64px)] max-sm:items-start [&_span]:font-nunito [&_span]:text-base [&_span]:leading-4 [&_span]:tracking-tight [&_span]:text-dimgray-100 max-sm:[&_span]:text-xs">
      <img
        src="/badge.png"
        alt="badge"
        className="h-[55px] w-[55px] max-sm:h-[32px] max-sm:w-[32px]"
      />
      <div className="flex flex-col items-start justify-between gap-2">
        <h3 className="m-0 font-nunito text-lg font-medium leading-6 tracking-tight text-darkslategray-300 max-sm:text-base">
          {title}
        </h3>
        <p className="m-0 font-nunito text-[17px] leading-6 tracking-tight text-darkslategray-300 max-sm:text-base">
          {body}
        </p>
        {image?.length > 0 && (
          <img
            src={
              image?.[0]?.urls?.small ||
              image?.[0]?.urls?.compact ||
              image?.[0]?.urls?.original ||
              image?.[0]?.urls?.huge
            }
            alt="product"
          />
        )}

        <div className="flex items-center justify-start gap-3 max-sm:gap-0.5">
          <span>{name}</span>
          <svg
            width="5"
            height="6"
            viewBox="0 0 5 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.56782 5.19532C1.30402 5.19532 0.292973 4.18427 0.292973 2.92047C0.292973 1.65666 1.30402 0.645621 2.56782 0.645621C3.83162 0.645621 4.84267 1.65666 4.84267 2.92047C4.84267 4.18427 3.83162 5.19532 2.56782 5.19532Z"
              fill="#646665"
            />
          </svg>
          <span>{formatDate(date)}</span>
          <svg
            width="5"
            height="6"
            viewBox="0 0 5 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.56782 5.19532C1.30402 5.19532 0.292973 4.18427 0.292973 2.92047C0.292973 1.65666 1.30402 0.645621 2.56782 0.645621C3.83162 0.645621 4.84267 1.65666 4.84267 2.92047C4.84267 4.18427 3.83162 5.19532 2.56782 5.19532Z"
              fill="#646665"
            />
          </svg>
          <div className="flex items-center [&_svg]:mx-0.5 [&_svg]:my-0 max-sm:[&_svg]:mx-0">
            {[...Array(rating)].map((_, index) => {
              return (
                <svg
                  key={index}
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5.30572 0.553604C5.54766 0.0573305 6.25485 0.0573307 6.49679 0.553604L7.78277 3.19143C7.87856 3.38791 8.06509 3.5245 8.28132 3.5565L11.1716 3.98424C11.7123 4.06425 11.929 4.72761 11.5399 5.11138L9.43908 7.18312C9.28513 7.33494 9.21494 7.55233 9.25106 7.76551L9.74528 10.6831C9.83715 11.2255 9.26623 11.6371 8.78066 11.3785L6.21264 10.0112C6.01799 9.90752 5.78452 9.90752 5.58987 10.0112L3.02186 11.3785C2.53629 11.6371 1.96536 11.2255 2.05724 10.6831L2.55146 7.76551C2.58757 7.55233 2.51739 7.33494 2.36344 7.18312L0.262647 5.11138C-0.126504 4.72761 0.0902039 4.06425 0.630867 3.98424L3.52119 3.5565C3.73742 3.5245 3.92395 3.38791 4.01974 3.19143L5.30572 0.553604Z"
                    fill="#F79624"
                  />
                </svg>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserReview;
