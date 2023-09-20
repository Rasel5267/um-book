import { Link } from "react-router-dom";

const Hero = () => {
	return (
		<div className="flex w-[92%] mt-12 lg:mt-0 min-h-screen items-center justify-between mx-auto">
			<div className="flex w-full flex-wrap lg:flex-nowrap justify-between">
				<div className="order-last lg:order-first mb-12 max-w-md">
					<p className="text-emerald-600 font-semibold text-lg mb-6">
						Read Your favorite books
					</p>
					<h2 className="text-4xl font-semibold text-slate-800 mb-12">
						Now learning from anywhere, and build your{" "}
						<span className="text-emerald-600">bright career.</span>
					</h2>
					<p className="text-slate-500 text-lg font-light mb-6">
						It has survived not only five centuries but also the
						leap into electronic typesetting
					</p>
					<button className="bg-emerald-600 px-4 py-2 text-gray-100 rounded hover:bg-emerald-700 transition-colors duration-300">
						<Link to="/books">Start Reading</Link>
					</button>
				</div>
				<div className="flex justify-center mb-12 lg:mb-0 lg:order-last order-first lg:max-w-lg md:max-w-[90%]">
					<img
						src="https://res.cloudinary.com/mahadiul5267/image/upload/v1689676053/Books/pngwing.com_dhoq4m.png"
						className="w-fill m-auto"
					/>
				</div>
			</div>
		</div>
	);
};

export default Hero;
