import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const AppointmentForm = ({ onNext }) => {
  const [formData, setFormData] = useState({
    mode: "Video",
    height: "",
    weight: "",
    age: "",
    sleepPattern: "",
    concern: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleModeChange = (mode) => {
    setFormData({
      ...formData,
      mode,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext(formData);
  };

  return (
    <div className="min-w-[90%] rounded-xl bg-white p-8">
      <div className="fee my-3 flex w-full items-center justify-between rounded-lg border border-[#e2e2e2] p-4">
        <h1>Appointment Fee</h1>
        <span>₹699.00</span>
      </div>
      <form className="w-full space-y-4" onSubmit={handleSubmit}>
        <div className="my-4 flex justify-between bg-[#F3F3F3]">
          {["In-Clinic", "Video", "Chat"].map((mode) => (
            <button
              type="button"
              key={mode}
              onClick={() => handleModeChange(mode)}
              className={`flex flex-1 items-center justify-center p-2 text-center ${formData.mode === mode ? "border-[--primary] text-[--primary]" : "text-gray-600"} mx-1 rounded border`}
            >
              {mode}
              {formData.mode === mode && (
                // <span className="ml-2 text-[--primary]">&#10003;</span>
                <CheckCircleIcon className="w-6" />
              )}
            </button>
          ))}
        </div>

        <div className="w-full rounded-lg border border-[#e2e2e2] p-2">
          <label htmlFor="">Height</label>
          <input
            className="w-full border-none bg-white outline-none"
            type="text"
            name="height"
            value={formData.height}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full rounded-lg border border-[#e2e2e2] p-2">
          <label htmlFor="">Weight</label>
          <input
            className="w-full border-none bg-white outline-none"
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full rounded-lg border border-[#e2e2e2] p-2">
          <label htmlFor="">Age</label>
          <input
            className="w-full border-none bg-white outline-none"
            type="text"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full rounded-lg border border-[#e2e2e2] p-2">
          <label htmlFor="">Sleep Pattern</label>
          <input
            className="w-full border-none bg-white outline-none"
            type="text"
            name="sleepPattern"
            value={formData.sleepPattern}
            onChange={handleChange}
            required
          />
        </div>
        <div className="w-full rounded-lg border border-[#e2e2e2] p-2">
          <label htmlFor="">Concern</label>

          <textarea
            className="w-full outline-none"
            name="concern"
            value={formData.concern}
            onChange={handleChange}
          />
        </div>

        <button className="w-full bg-[--primary] p-2 text-white" type="submit">
          Proceed
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
