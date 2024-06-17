import Filters from "./Filters";
import { useSearchParams } from "react-router-dom";

function SortAndFilter()  {
  const [searchParams, setSearchParams] = useSearchParams();
  const paramsObject = Object.fromEntries(searchParams);
  const paramsArray = Object.entries(paramsObject);

  return (
    <>
      <Filters />
      {/* Filtered Items */}
      <section className="mt-12 flex max-w-full items-center justify-center">
        <div className="flex w-3/4 flex-wrap justify-end">
          {paramsArray.map((choice, i) => (
            <div
              key={i}
              className="mx-2 my-2 flex h-[2.813rem] shrink-0 items-center justify-center gap-1.5 whitespace-nowrap rounded-[31px] bg-primary-tint-2 px-5 py-[0.937rem]  text-center font-inter text-[1rem] tracking-[0.5px] text-black  "
            >
              <span className="capitalize">{choice[1]}</span>
              <button
                onClick={() => {
                  setSearchParams((prevParams) => {
                    const newParams = new URLSearchParams(prevParams);
                    newParams.delete(choice[0]);
                    return newParams.toString();
                  });
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-6 w-6 cursor-pointer text-gray-100 hover:scale-110 hover:text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default SortAndFilter;
