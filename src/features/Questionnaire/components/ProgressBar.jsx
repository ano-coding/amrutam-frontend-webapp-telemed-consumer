import PropTypes from "prop-types";
const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
      <div
        className="bg-[#3a643b] h-full rounded-full"
        style={{ width: `${progress}%` }}></div>
    </div>
  );
};
ProgressBar.propTypes = {
  progress: PropTypes.number,
};
export default ProgressBar;
