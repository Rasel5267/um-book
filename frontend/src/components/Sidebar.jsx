import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import SidebarMenu from "./SidebarMenu";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hook";
import { logout } from "../redux/features/auth/authSlice";

const Sidebar = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [sidebar, setSidebar] = useState(false);

	const handleLogout = () => {
		localStorage.removeItem("auth");
		localStorage.removeItem("user");
		dispatch(logout());
		navigate("/");
		window.location.reload();
	};

	const handleSidebar = () => {
		setSidebar(!sidebar);
	};

	return (
		<>
			<div className="bg-white shadow-sm py-2 px-2 flex items-center justify-between md:hidden">
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
					className="flex items-center md:hidden text-3xl cursor-pointer"
					onClick={handleSidebar}
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
			<div
				className={`bg-gray-100 text-gray-700 w-72 md:min-w-[288px] space-y-6 fixed inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out ${
					sidebar ? "translate-x-0" : "-translate-x-full"
				}`}
			>
				<Link to="/" className="flex items-center space-x-2 pt-7 px-4">
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
				<nav>
					<ul className="menu">
						<li
							className="text-[16px] font-semibold my-2"
							onClick={() => setSidebar(false)}
						>
							<NavLink to="/dashboard/profile">Profile</NavLink>
						</li>

						<li
							className="text-[16px] font-semibold my-2"
							onClick={() => setSidebar(false)}
						>
							<NavLink to="/dashboard/change-password">
								Change Password
							</NavLink>
						</li>
						<SidebarMenu />
						<div
							className="flex items-center gap-2 text-gray-700 text-[16px] mt-12 font-semibold cursor-pointer py-3 pr-4 px-1 rounded w-[90%] hover:bg-gray-200 transition duration-300"
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
					</ul>
				</nav>
			</div>
		</>
	);
};

export default Sidebar;
