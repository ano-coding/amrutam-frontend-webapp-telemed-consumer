import PropTypes from "prop-types";
const ProgressBar = ({ progress }) => {
	return (
		<div className="w-full bg-[#C9C9C980] rounded-full h-2 mb-4">
			<div
				className="bg-[#3a643b] h-full rounded-full duration-500"
				style={{ width: `${progress}%` }}>
			</div>
			<p
				className="mt-4 duration-500"
				style={{paddingLeft: `${progress}%`}}
			>
				{Math.round(progress)}% 
			</p>
		</div>
	);
};
ProgressBar.propTypes = {
	progress: PropTypes.number,
};
export default ProgressBar;
