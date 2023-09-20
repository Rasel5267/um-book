import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
	const storedAuthData = localStorage.getItem("auth");
	const token = storedAuthData ? JSON.parse(storedAuthData).token : null;

	return token ? <Outlet /> : <Navigate to="/login" />;
};

const PublicRoute = () => {
	const storedAuthData = localStorage.getItem("auth");
	const token = storedAuthData ? JSON.parse(storedAuthData).token : null;

	return token ? <Navigate to="/" /> : <Outlet />;
};

export { PublicRoute, PrivateRoute };
