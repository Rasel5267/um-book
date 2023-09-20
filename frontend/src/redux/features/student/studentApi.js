import { api } from "../../api/apiSlice";

const studentApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getStudentProfile: builder.query({
			query: (userId) => `/students/${userId}`,
		}),
		updateStudentProfile: builder.mutation({
			query: ({ id, formData }) => ({
				url: `/students/${id}`,
				method: "PATCH",
				body: formData,
			}),
		}),
	}),
});

export const { useGetStudentProfileQuery, useUpdateStudentProfileMutation } =
	studentApi;
