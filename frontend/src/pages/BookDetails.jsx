import DownloadBtn from "../components/DownloadBtn";
import { useParams } from "react-router-dom";
import { useSingleBookQuery } from "../redux/features/book/bookApi";
import { IMG_URL } from "../config";

const BookDetails = () => {
	const { id } = useParams();

	const { data, isLoading } = useSingleBookQuery(id);

	const book = data?.data;

	return (
		<>
			{isLoading ? (
				<div className="flex justify-center h-[100vh]">
					<span className="loading loading-ring loading-lg"></span>
				</div>
			) : (
				<div className="w-[92%] mx-auto py-12">
					<div className="flex w-full flex-wrap md:flex-nowrap justify-between">
						<div className="w-[40%] mx-auto mb-12 lg:mb-0">
							<img
								src={`${IMG_URL}/${book?.image}`}
								alt={book?.title}
								className="w-full h-full "
							/>
						</div>
						<div className="md:ml-4 lg:ml-16">
							<p className="text-gray-500">
								<span className="font-semibold text-emerald-600">
									Author:{" "}
								</span>
								{book?.author}
							</p>
							<h2 className="text-3xl font-bold my-2">
								{book?.title}
							</h2>
							<h2 className="text-lg text-emerald-600 font-semibold my-2">
								{book?.academicDepartment.title}
							</h2>
							<div className="py-1">
								<b>Publisher:</b> {book?.publisher}
							</div>
							<div className="py-1">
								<b>Publish On: </b>
								{book?.publicationDate.toString()}
							</div>
							<div className="py-4">
								<b>Posted By: </b>
								{`${book?.faculty.name.firstName} ${book?.faculty.name.lastName}`}
							</div>
							<div className="my-4">
								<span className="text-gray-500">
									{book?.description}
								</span>
							</div>
							<div className="flex my-[0.8rem] space-x-10">
								<DownloadBtn filename={book?.pdf} />
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default BookDetails;
