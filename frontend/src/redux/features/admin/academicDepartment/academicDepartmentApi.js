import { api } from "../../../api/apiSlice";

const academicDepartmentApi = api.injectEndpoints({
	endpoints: (builder) => ({
		createAcademicDepartment: builder.mutation({
			query: (formData) => ({
				url: "/academic-departments/create-department",
				method: "POST",
				body: formData,
			}),
		}),
		getAcademicDepartments: builder.query({
			query: () => "/academic-departments",
		}),
		getAcademicDepartment: builder.query({
			query: (id) => `/academic-departments/${id}`,
		}),
		updateAcademicDepartment: builder.mutation({
			query: ({ id, formData }) => ({
				url: `/academic-departments/${id}`,
				method: "PATCH",
				body: formData,
			}),
		}),
		deleteAcademicDepartment: builder.mutation({
			query: (id) => ({
				url: `/academic-departments/${id}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useCreateAcademicDepartmentMutation,
	useGetAcademicDepartmentsQuery,
	useGetAcademicDepartmentQuery,
	useUpdateAcademicDepartmentMutation,
	useDeleteAcademicDepartmentMutation,
} = academicDepartmentApi;
