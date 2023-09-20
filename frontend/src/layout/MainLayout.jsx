import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useUserQuery } from "../redux/features/auth/authApi";

export default function MainLayout() {
	const { data } = useUserQuery(undefined);
	localStorage.setItem(
		"user",
		JSON.stringify({
			user: data?.data,
		})
	);

	return (
		<div>
			<Navbar />
			<div className="flex flex-col min-h-screen">
				<Outlet />
			</div>
			<Footer />
		</div>
	);
}
