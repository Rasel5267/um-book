import { api } from "../../../api/apiSlice";

const academicFacultyApi = api.injectEndpoints({
	endpoints: (builder) => ({
		createAcademicFaculty: builder.mutation({
			query: (formData) => ({
				url: "/academic-faculties/create-faculty",
				method: "POST",
				body: formData,
			}),
		}),
		getAcademicFaculties: builder.query({
			query: () => "/academic-faculties",
		}),
		getAcademicFaculty: builder.query({
			query: (id) => `/academic-faculties/${id}`,
		}),
		updateAcademicFaculty: builder.mutation({
			query: ({ id, formData }) => ({
				url: `/academic-faculties/${id}`,
				method: "PATCH",
				body: formData,
			}),
		}),
		deleteAcademicFaculty: builder.mutation({
			query: (id) => ({
				url: `/academic-faculties/${id}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useCreateAcademicFacultyMutation,
	useGetAcademicFacultiesQuery,
	useGetAcademicFacultyQuery,
	useUpdateAcademicFacultyMutation,
	useDeleteAcademicFacultyMutation,
} = academicFacultyApi;
