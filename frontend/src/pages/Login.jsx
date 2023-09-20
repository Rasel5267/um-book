import { useLoginMutation } from "../redux/features/auth/authApi";
import toast from "react-hot-toast";
import { setAuth } from "../redux/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../redux/hook";
import { useState } from "react";

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [login, { isLoading }] = useLoginMutation();
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");

	const onFinishHandler = async (e) => {
		e.preventDefault();

		try {
			const response = await login({ id, password });
			if (response.error) {
				toast.error(response.error.data.errorMessages[0].message);
			} else {
				localStorage.clear();
				dispatch(setAuth(response.data?.data));
				toast.success(response.data.message);
				navigate("/");
				window.location.reload();
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
							Login now!
						</h1>
						<form onSubmit={onFinishHandler} className="card p-4">
							<div className="flex flex-col">
								<label
									htmlFor="id"
									className="font-semibold mb-4"
								>
									Your Id
								</label>
								<input
									className="border p-2 focus:outline-none"
									type="text"
									name="id"
									placeholder="Enter Your Id"
									required
									onChange={(e) => setId(e.target.value)}
								/>
							</div>
							<div className="flex flex-col">
								<label
									htmlFor="password"
									className="font-semibold my-4"
								>
									Your Password
								</label>
								<input
									className="border p-2 focus:outline-none"
									type="password"
									name="password"
									placeholder="Enter Your Password"
									required
									onChange={(e) =>
										setPassword(e.target.value)
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
										className="bg-emerald-600 px-4 py-2 text-gray-100 rounded hover:bg-emerald-700 transition-colors duration-300"
										type="submit"
									>
										Login
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

export default Login;
