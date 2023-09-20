import { api } from "../../api/apiSlice";

const authApi = api.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (values) => {
				return {
					url: "/auth/login",
					method: "POST",
					body: values,
				};
			},
		}),
		user: builder.query({
			query: () => "/users/profile",
		}),
		changePassword: builder.mutation({
			query: (values) => {
				return {
					url: "/auth/change-password",
					method: "POST",
					body: values,
				};
			},
		}),
	}),
});

export const { useLoginMutation, useUserQuery, useChangePasswordMutation } =
	authApi;
