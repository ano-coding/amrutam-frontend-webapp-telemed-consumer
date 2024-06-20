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
    <div className="w-full overflow-x-auto p-6">
      <table className="w-full min-w-max">
        <thead>
          <tr className="border-b-2 border-slate-100 text-left">
            {headers.map((header) => (
              <th key={header} className="p-2 sm:p-4">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-b border-slate-200">
              {item["Invoice No."] && (
                <td className="p-2 sm:p-4">{item["Invoice No."]}</td>
              )}
              {item.ID && <td className="p-2 sm:p-4">{item.ID}</td>}
              <td className="flex items-center p-2 sm:p-4">
                <img
                  src={item.Doctor.Image || item["Created By"].image}
                  alt={item.Doctor.Name || item["Created By"].image}
                  className="mr-2 h-8 w-8 rounded-full sm:mr-4 sm:h-10 sm:w-10"
                />
                <div>
                  <p className="text-xs sm:text-base">
                    {item.Doctor.Name || item["Created By"].Name}
                  </p>
                  <p className="text-xs text-gray-500 sm:text-sm">
                    {item.Doctor.Specialty || item["Created By"].Specialty}
                  </p>
                </div>
              </td>
              {item.Amount && <td className="p-2 sm:p-4">{item.Amount}</td>}
              {item["Paid On"] && (
                <td className="p-2 sm:p-4">{item["Paid On"]}</td>
              )}
              {item.Duration && <td className="p-2 sm:p-4">{item.Duration}</td>}
              {item.Type && <td className="p-2 sm:p-4">{item.Type}</td>}
              {item.Date && <td className="p-2 sm:p-4">{item.Date}</td>}
              <td className="flex flex-wrap space-x-2 p-2 sm:p-4">
                <button className="flex items-center rounded-sm bg-blue-100 px-2 py-1 text-blue-600 hover:underline sm:px-3 sm:py-2">
                  Print{" "}
                  <span className="mx-2">
                    <PrinterSvg />
                  </span>
                </button>
                <button
                  className="flex items-center rounded-sm bg-blue-100 px-2 py-1 text-green-600 hover:underline sm:px-3 sm:py-2"
                  onClick={handleOpenPopup}
                >
                  View
                  <span className="mx-2">
                    <EyeSvg />
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Popup isOpen={isPopupOpen} onClose={handleClosePopup} />
    </div>
  );
};

export default TabularData;
