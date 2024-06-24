import { useState } from "react";
import Popup from "../features/Medical-Records/components/Popup";
import PrinterSvg from "../assets/printer.svg?react";
import EyeSvg from "../assets/eye.svg?react";

const getHeaders = (data) => {
  const headers = new Set();
  data.forEach((item) => {
    Object.keys(item).forEach((key) => {
      headers.add(key);
    });
  });
  return Array.from(headers);
};

const TabularData = ({ data }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);
  const headers = getHeaders(data);

  return (
    <div className="w-full overflow-hidden px-2">
      <div className="w-full overflow-x-auto px-4 py-6">
        <table
          className="mx-auto w-full"
          style={{
            borderCollapse: "separate",
            borderSpacing: "0 15px",
          }}
        >
          <thead>
            <tr className="pb-10 text-center shadow-[0_1px_0_0_#EDEDED]">
              {headers.map((header) => (
                <th className="pb-3 text-[16px] font-semibold" key={header}>
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="font-mulish text-[16px] text-[#596169]">
            {data.map((item, index) => (
              <>
                <tr
                  key={index}
                  className="rounded-lg shadow-[0_0_0_1px_#EDEDED]"
                >
                  {item["Invoice No."] && (
                    <td className="whitespace-nowrap px-5 py-4 text-center">
                      {item["Invoice No."]}
                    </td>
                  )}
                  {item.ID && (
                    <td className="whitespace-nowrap px-5 py-4 text-center">
                      {item.ID}
                    </td>
                  )}
                  <td className="px-5 py-4 text-center font-sans text-[15px] text-[#343434]">
                    <div className="flex items-center justify-center gap-2">
                      <img
                        src={item.Doctor.Image || item["Created By"].image}
                        alt={item.Doctor.Name || item["Created By"].image}
                        className="size-8 rounded-full sm:size-11"
                      />
                      <div className="flex flex-col items-start gap-[3px]">
                        <p className="whitespace-nowrap">
                          {item.Doctor.Name || item["Created By"].Name}
                        </p>
                        <p className="whitespace-nowrap text-[#9A9A9A]">
                          {item.Doctor.Specialty ||
                            item["Created By"].Specialty}
                        </p>
                      </div>
                    </div>
                  </td>
                  {item.Amount && (
                    <td className="whitespace-nowrap px-5 py-4 text-center">
                      {item.Amount}
                    </td>
                  )}
                  {item["Paid On"] && (
                    <td className="whitespace-nowrap px-5 py-4 text-center">
                      {item["Paid On"]}
                    </td>
                  )}
                  {item.Duration && (
                    <td className="whitespace-nowrap px-5 py-4 text-center">
                      {item.Duration}
                    </td>
                  )}
                  {item.Type && (
                    <td className="whitespace-nowrap px-5 py-4 text-center">
                      {item.Type}
                    </td>
                  )}
                  {item.Date && (
                    <td className="whitespace-nowrap px-5 py-4 text-center">
                      {item.Date}
                    </td>
                  )}
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-4">
                      <button className="flex items-center justify-center gap-2 rounded-md bg-[#E2F2FE] px-4 py-2 font-nunito text-[16px] font-medium text-[#2196F3] hover:underline">
                        <span>Print</span>

                        <PrinterSvg />
                      </button>
                      <button
                        className="flex items-center justify-center gap-2 rounded-md bg-[#E2F2FE] px-4 py-2 font-nunito text-[16px] font-medium text-[#2CA17E] hover:underline"
                        onClick={handleOpenPopup}
                      >
                        <span>View</span>
                        <EyeSvg />
                      </button>
                    </div>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
        <Popup isOpen={isPopupOpen} onClose={handleClosePopup} />
      </div>
    </div>
  );
};

export default TabularData;
