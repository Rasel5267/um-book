import { api } from "../../api/apiSlice";

const facultyApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getFacultyProfile: builder.query({
			query: (id) => `/faculties/${id}`,
			providesTags: ["facultyProfile"],
		}),
		updateFacultyProfile: builder.mutation({
			query: ({ id, formData }) => ({
				url: `/faculties/${id}`,
				method: "PATCH",
				body: formData,
			}),
			invalidatesTags: ["facultyProfile"],
		}),
	}),
});

export const { useGetFacultyProfileQuery, useUpdateFacultyProfileMutation } =
	facultyApi;
