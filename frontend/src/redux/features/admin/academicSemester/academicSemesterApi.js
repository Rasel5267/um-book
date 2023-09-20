import { api } from "../../../api/apiSlice";

const academicSemesterApi = api.injectEndpoints({
	endpoints: (builder) => ({
		createAcademicSemester: builder.mutation({
			query: (formData) => ({
				url: "/academic-semesters/create-semester",
				method: "POST",
				body: formData,
			}),
		}),
		getAcademicSemesters: builder.query({
			query: () => "/academic-semesters",
		}),
		getAcademicSemester: builder.query({
			query: (id) => `/academic-semesters/${id}`,
		}),
		updateAcademicSemester: builder.mutation({
			query: ({ id, formData }) => ({
				url: `/academic-semesters/${id}`,
				method: "PATCH",
				body: formData,
			}),
		}),
		deleteAcademicSemester: builder.mutation({
			query: (id) => ({
				url: `/academic-semesters/${id}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useCreateAcademicSemesterMutation,
	useGetAcademicSemestersQuery,
	useGetAcademicSemesterQuery,
	useUpdateAcademicSemesterMutation,
	useDeleteAcademicSemesterMutation,
} = academicSemesterApi;
