const Popup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
      <div className="w-full max-w-4xl rounded-lg bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-start justify-between">
          <h2 className="text-xl font-semibold">Payment Receipt</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="max-h-[30rem] overflow-y-auto">
          <div className="text-left">
            <div className="mb-4">
              <h2 className="font-semibold">
                Amrutam Pharmaceuticals Private Limited
              </h2>
              <p>Namaste Apana,</p>
              <p>Amrutam | Payment Receipt</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Receipt No.</h3>
              <p>TRANS-0000-01992</p>
            </div>
            <div className="mb-4">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr>
                    <th className="border-b p-2">SERVICE</th>
                    <th className="border-b p-2">DESCRIPTION</th>
                    <th className="border-b p-2">PRICE</th>
                    <th className="border-b p-2">QTY</th>
                    <th className="border-b p-2">TOTAL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-b p-2">Video Consultation</td>
                    <td className="border-b p-2">
                      Video Consultation with Dr. Jude Apana
                    </td>
                    <td className="border-b p-2">Rs 100 INR</td>
                    <td className="border-b p-2">1</td>
                    <td className="border-b p-2">Rs 100 INR</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colSpan="4" className="p-2 text-right">
                      SUBTOTAL
                    </td>
                    <td className="p-2">Rs 100 INR</td>
                  </tr>
                  <tr>
                    <td colSpan="4" className="p-2 text-right">
                      GRAND TOTAL
                    </td>
                    <td className="p-2">Rs 100 INR</td>
                  </tr>
                </tfoot>
              </table>
            </div>
            <div className="mb-4">
              <p>
                If you have any questions or need further assistance, feel free
                to reach out to us. We look forward to your upcoming
                appointment.
              </p>
              <p>
                Best regards,
                <br />
                Amrutam Pharmaceuticals Private Limited Team
              </p>
            </div>
            <div className="mb-4">
              <p>
                <strong>Our Website:</strong> amrutam.co.in
              </p>
              <p>
                <strong>For Support:</strong> support@amrutam.co.in
              </p>
              <p>
                <strong>Our Address:</strong> Amrutam Pharmaceuticals Pvt Ltd.,
                chitragupt ganj, Nai Sadak, Lashkar, Gwalior - 474001
              </p>
              <p>
                <strong>Contact Us No:</strong> +91 9713719999
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
