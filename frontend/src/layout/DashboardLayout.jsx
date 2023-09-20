import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
	return (
		<div className="relative min-h-screen md:flex">
			<Sidebar />
			<div className="overflow-x-auto flex-1">
				<div className="p-10">
					<Outlet />
				</div>
			</div>
		</div>
	);
}
