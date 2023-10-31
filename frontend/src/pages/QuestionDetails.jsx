import DownloadBtn from "../components/DownloadBtn";
import { useParams } from "react-router-dom";
import { IMG_URL } from "../config";
import { useSingleQuestionQuery } from "../redux/features/question/questionApi";

const QuestionDetails = () => {
	const { id } = useParams();

	const { data, isLoading } = useSingleQuestionQuery(id);

	const question = data?.data;

	return (
		<>
			{isLoading ? (
				<div className="flex justify-center h-[100vh]">
					<span className="loading loading-ring loading-lg"></span>
				</div>
			) : (
				<div className="w-[92%] mx-auto py-12">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
						<div className="w-full flex items-center justify-center lg:justify-end mb-12 lg:mb-0">
							<img
								src={`${IMG_URL}/${question?.image}`}
								alt={question?.title}
								className="w-[300px]"
							/>
						</div>
						<div className="w-full flex flex-col items-center md:items-start">
							<p className="text-gray-500">
								<span className="font-semibold text-emerald-600">
									Author:{" "}
								</span>
								{question?.author}
							</p>
							<h2 className="text-3xl font-bold my-2">
								{question?.title}
							</h2>
							<h2 className="text-lg text-emerald-600 font-semibold my-2">
								{question?.academicDepartment.title}
							</h2>
							<div className="flex my-[0.8rem] space-x-10">
								<DownloadBtn filename={question?.pdf} />
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default QuestionDetails;
