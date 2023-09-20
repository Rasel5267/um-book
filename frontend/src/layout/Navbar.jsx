import { logout } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hook";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
	const [isMenuOpen, setMenuOpen] = useState(false);
	const [isSearchOpen, setSearchOpen] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const storedAuthData = localStorage.getItem("auth");
	const storedUserData = localStorage.getItem("user");
	const token = storedAuthData ? JSON.parse(storedAuthData).token : null;
	const user = storedUserData ? JSON.parse(storedUserData).user : null;

	let profileImage = "";

	if (user && user.role === "student") {
		profileImage = user.student.profileImage;
	}
	if (user && user.role === "admin") {
		profileImage = user.admin.profileImage;
	}
	if (user && user.role === "faculty") {
		profileImage = user.faculty.profileImage;
	}
	if (!user) {
		profileImage =
			"https://res.cloudinary.com/mahadiul5267/image/upload/v1689428765/pngwing.com_mpq78k.png";
	}

	const onFinishHandler = (e) => {
		e.preventDefault();
		navigate(`/search/${encodeURIComponent(searchTerm)}`);
	};

	const handleSearch = () => {
		setSearchOpen(!isSearchOpen);
		setMenuOpen(false);
	};

	const handleMenuToggle = () => {
		setMenuOpen(!isMenuOpen);
		setSearchOpen(false);
	};

	const handleLogout = () => {
		localStorage.removeItem("auth");
		localStorage.removeItem("user");
		dispatch(logout());
		navigate("/");
		window.location.reload();
	};

	return (
		<div className="bg-white shadow-sm py-2 z-50">
			<nav className="flex justify-between items-center w-[92%] mx-auto">
				<Link to="/" className="flex items-center space-x-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						strokeWidth="2"
						stroke="currentColor"
						className="w-6 h-6"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
						/>
					</svg>
					<span className="text-2xl font-extrabold">
						Book Library
					</span>
				</Link>
				<div
					className={`flex-1 md:static md:ml-8 absolute bg-white shadow-sm md:shadow-none w-[50%] md:min-h-fit min-h-[88vh] z-48 left-0 md:w-auto flex pt-32 md:pt-0 px-8 md:px-0 ${
						isMenuOpen ? "top-[10%]" : "top-[-400%]"
					}`}
				>
					<ul className="flex md:flex-row flex-col md:items-center md:gap-[2vw] gap-8">
						<li onClick={() => setMenuOpen(false)}>
							<NavLink to="/" className="hover:text-gray-500">
								Home
							</NavLink>
						</li>
						<li onClick={() => setMenuOpen(false)}>
							<NavLink
								to="/books"
								className="hover:text-gray-500"
							>
								All Books
							</NavLink>
						</li>
					</ul>
				</div>
				<div className="flex items-center gap-2">
					<div
						className={`form-control absolute p-4 md:p-0 bg-[#fbfbfb] md:bg-white md:static top-16 sm:top-16 right-[4%] w-[70vw] md:top-0 md:right-0 md:w-[27vw] md:scale-x-100 md:scale-y-100 z-50 ${
							isSearchOpen
								? "scale-x-100 scale-y-100"
								: "scale-x-0 scale-y-0"
						}`}
					>
						<form onSubmit={onFinishHandler} className="card">
							<input
								type="search"
								placeholder="Search Book"
								required
								className="p-2 border outline-none"
								onChange={(e) => setSearchTerm(e.target.value)}
							/>
						</form>
					</div>
					<div
						className="md:hidden flex items-center cursor-pointer btn btn-ghost btn-circle"
						onClick={handleSearch}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							strokeWidth="1.5"
							stroke="currentColor"
							className="w-5 h-5"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
							/>
						</svg>
					</div>
					<div className="dropdown dropdown-end">
						<label
							tabIndex={0}
							className="btn btn-ghost btn-circle avatar"
						>
							<div className="w-10 rounded-full">
								<img src={profileImage} />
							</div>
						</label>
						<ul
							tabIndex={0}
							className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
						>
							{token ? (
								<>
									<NavLink
										to="/dashboard/profile"
										className="flex items-center gap-3 text-xl mb-3"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="w-5 h-5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125"
											/>
										</svg>

										<span>Dashboard</span>
									</NavLink>
									<div
										className="flex items-center gap-3 text-xl cursor-pointer"
										onClick={handleLogout}
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											fill="none"
											viewBox="0 0 24 24"
											strokeWidth="1.5"
											stroke="currentColor"
											className="w-5 h-5"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"
											/>
										</svg>

										<span>Logout</span>
									</div>
								</>
							) : (
								<>
									<NavLink
										to="/login"
										className="flex items-center gap-3 text-xl"
									>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 24 24"
											fill="currentColor"
											className="w-5 h-5"
										>
											<path
												fillRule="evenodd"
												d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
												clipRule="evenodd"
											/>
										</svg>

										<span>Login</span>
									</NavLink>
								</>
							)}
						</ul>
					</div>
					<div
						className=" flex items-center md:hidden text-3xl cursor-pointer"
						onClick={handleMenuToggle}
					>
						<label className="btn btn-ghost btn-circle">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h7"
								/>
							</svg>
						</label>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
