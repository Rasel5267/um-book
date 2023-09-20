import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useChangePasswordMutation } from "../../../redux/features/auth/authApi";

const ChangePassword = () => {
	const navigate = useNavigate();
	const [ChangePassword, { isLoading }] = useChangePasswordMutation();
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");

	const onFinishHandler = async (e) => {
		e.preventDefault();

		try {
			const response = await ChangePassword({
				oldPassword,
				newPassword,
			});
			if (response.error) {
				toast.error(response.error.data.errorMessages[0].message);
			} else {
				localStorage.clear();
				toast.success(response.data.message);
				navigate("/login");
			}
		} catch (error) {
			// Handle any unexpected errors here (e.g., network issues)
			console.error("Unexpected error occurred:", error);
			toast.error(
				"An unexpected error occurred. Please try again later."
			);
		}
	};
	return (
		<div className="hero mx-auto mt-16 max-w-[550px]">
			<div className="hero-content w-full flex-col lg:flex-row-reverse">
				<div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
					<div className="card-body">
						<h1 className="text-3xl font-bold text-center">
							Change Password!
						</h1>
						<form onSubmit={onFinishHandler} className="card p-4">
							<div className="flex flex-col">
								<label
									htmlFor="oldPassword"
									className="font-semibold mb-4"
								>
									Old Password
								</label>
								<input
									className="border p-2 focus:outline-none"
									type="password"
									name="oldPassword"
									placeholder="Enter Your Old Password"
									required
									onChange={(e) =>
										setOldPassword(e.target.value)
									}
								/>
							</div>
							<div className="flex flex-col">
								<label
									htmlFor="newPassword"
									className="font-semibold my-4"
								>
									Your Password
								</label>
								<input
									className="border p-2 focus:outline-none"
									type="password"
									name="newPassword"
									placeholder="Enter Your New Password"
									required
									onChange={(e) =>
										setNewPassword(e.target.value)
									}
								/>
							</div>
							<div className="form-control mt-8">
								{isLoading ? (
									<div className="flex justify-center">
										<span className="loading loading-ring loading-lg"></span>
									</div>
								) : (
									<button
										className="bg-gray-800 px-4 py-2 text-gray-100 rounded hover:bg-gray-700 transition-colors duration-300"
										type="submit"
									>
										Change Password
									</button>
								)}
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ChangePassword;
