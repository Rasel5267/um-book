import { Link } from "react-router-dom";
import DownloadBtn from "./DownloadBtn";
import { IMG_URL } from "../config";

const QuestionCard = (question) => {
	return (
		<div className="rounded-xl shadow-lg">
			<div className="bg-white rounded-xl shadow-md h-full flex flex-col relative flex-shrink-0">
				<img
					src={`${IMG_URL}/${question.image}`}
					alt={question.title}
					className="absolute w-full h-[60%] rounded-t-xl"
				/>
				<div className="mt-[17rem] px-4 flex-1">
					<h2 className="text-black font-extrabold text-2xl tracking-wide leading-none">
						<Link to={`/question-details/${question._id}`}>
							{question.title}
						</Link>
					</h2>
					<h3 className="text-sm mt-2 text-gray-500">
						{question.author}
					</h3>

					<div className="my-2 flex space-x-8 items-center">
						<p className="">{question.academicDepartment.title}</p>
					</div>
					<div className="flex my-[0.8rem] space-x-10 justify-end">
						<DownloadBtn filename={question?.pdf} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default QuestionCard;
