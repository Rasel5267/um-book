import { Link } from "react-router-dom";
import ApproveDocument from "../../../components/ApproveDocument";
import { useGetUnapprovedDocumentsQuery } from "../../../redux/features/document/documentApi";

const UnapprovedDocuments = () => {
	const { data, isLoading } = useGetUnapprovedDocumentsQuery(undefined);

	const Documents = data?.data;
	return (
		<>
			{isLoading ? (
				<div className="flex justify-center">
					<span className="loading loading-ring loading-lg"></span>
				</div>
			) : (
				<>
					{Documents && (
						<div className="table-container">
							<div className="table-content">
								<div className="table-header bold-header">
									<div className="cell">Title</div>
									<div className="cell">Department</div>
									<div className="cell">Author</div>
									<div className="cell">Actions</div>
								</div>
								{Documents.map((document) => (
									<div
										className="table-header"
										key={document._id}
									>
										<div className="cell">
											<Link
												to={`/document-details/${document._id}`}
												className="text-emerald-600"
											>
												{document.title}
											</Link>
										</div>
										<div className="cell">
											{document.academicDepartment.title}
										</div>
										<div className="cell">
											{document.author}
										</div>
										<div className="cell">
											<ApproveDocument
												id={document._id}
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

export default UnapprovedDocuments;
