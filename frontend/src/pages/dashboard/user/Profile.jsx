import AdminProfile from "./AdminProfile";
import FacultyProfile from "./FacultyProfile";
import StudentProfile from "./StudentProfile";

const Profile = () => {
	const storedUserData = localStorage.getItem("user");
	const user = storedUserData ? JSON.parse(storedUserData).user : null;

	return (
		<div>
			{user && user.role === "student" && (
				<div>
					<StudentProfile />
				</div>
			)}

			{user && user.role === "faculty" && (
				<div>
					<FacultyProfile />
				</div>
			)}

			{user && user.role === "admin" && (
				<div>
					<AdminProfile />
				</div>
			)}
		</div>
	);
};

export default Profile;
