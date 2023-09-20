import PropTypes from "prop-types";

const DownloadBtn = ({ filename }) => {
	const storedUserData = localStorage.getItem("user");
	const user = storedUserData ? JSON.parse(storedUserData).user : null;
	const data = user?.role === "student";
	const filePath = `http://localhost:5000/api/v1/books/download-pdf/${filename}`;

	return (
		<>
			{data ? (
				<div className="border rounded-full flex items-center px-2 py-1 bg-emerald-600 text-gray-100 transition-colors duration-300">
					<a
						href={filePath}
						download={filename}
						target="_blank"
						rel="noreferrer"
						className="px-4 py-2"
					>
						Download PDF
					</a>
				</div>
			) : (
				<div className="border rounded-full flex items-center px-2 py-1 bg-emerald-600 text-gray-100 transition-colors duration-300">
					<button disabled className="px-4 py-2">
						Download PDF
					</button>
				</div>
			)}
		</>
	);
};

DownloadBtn.propTypes = {
	filename: PropTypes.string.isRequired,
};

export default DownloadBtn;
