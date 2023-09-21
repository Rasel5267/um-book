import BookCard from "../components/BookCard";
import Hero from "../components/Hero";
import BookList from "../components/bookList/BookList";
import { useGetBooksQuery } from "../redux/features/book/bookApi";

const Home = () => {
	const { data, isLoading } = useGetBooksQuery(undefined);

	let Books = [];
	if (data && data.data) {
		Books = data.data.slice(0, 10);
	}

	return (
		<div className="pb-8">
			<Hero />
			<div className="min-h-[50vh] py-16 my-auto flex flex-col justify-center bg-gray-50 mb-16">
				<BookList />
			</div>
			{isLoading ? (
				<div className="flex justify-center w-full h-[50vh]">
					<span className="loading loading-ring loading-lg"></span>
				</div>
			) : (
				<>
					<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-5 mt-8">
						{Books.map((book) => (
							<BookCard key={book._id} {...book} />
						))}
					</div>
					{Books.length === 0 && (
						<div className="flex items-center justify-center">
							<p className="text-2xl text-gray-600">
								No books found!
							</p>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Home;
