import { Link } from "react-router-dom";
import ApproveQuestion from "../../../components/ApproveQuestion";
import { useGetUnapprovedQuestionsQuery } from "../../../redux/features/question/questionApi";

const UnapprovedQuestions = () => {
	const { data, isLoading } = useGetUnapprovedQuestionsQuery(undefined);

	const Questions = data?.data;
	return (
		<>
			{isLoading ? (
				<div className="flex justify-center">
					<span className="loading loading-ring loading-lg"></span>
				</div>
			) : (
				<>
					{Questions && (
						<div className="table-container">
							<div className="table-content">
								<div className="table-header bold-header">
									<div className="cell">Title</div>
									<div className="cell">Department</div>
									<div className="cell">Author</div>
									<div className="cell">Actions</div>
								</div>
								{Questions.map((question) => (
									<div
										className="table-header"
										key={question._id}
									>
										<div className="cell">
											<Link
												to={`/question-details/${question._id}`}
												className="text-emerald-600"
											>
												{question.title}
											</Link>
										</div>
										<div className="cell">
											{question.academicDepartment.title}
										</div>
										<div className="cell">
											{question.author}
										</div>
										<div className="cell">
											<ApproveQuestion
												id={question._id}
											/>
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default UnapprovedQuestions;
