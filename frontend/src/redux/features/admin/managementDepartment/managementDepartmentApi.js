import { api } from "../../../api/apiSlice";

const managementDepartmentApi = api.injectEndpoints({
	endpoints: (builder) => ({
		createManagementDepartment: builder.mutation({
			query: (formData) => ({
				url: "/management-departments/create-department",
				method: "POST",
				body: formData,
			}),
		}),
		getManagementDepartments: builder.query({
			query: () => "/management-departments",
		}),
		getManagementDepartment: builder.query({
			query: (id) => `/management-departments/${id}`,
		}),
		updateManagementDepartment: builder.mutation({
			query: ({ id, formData }) => ({
				url: `/management-departments/${id}`,
				method: "PATCH",
				body: formData,
			}),
		}),
		deleteManagementDepartment: builder.mutation({
			query: (id) => ({
				url: `/management-departments/${id}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useCreateManagementDepartmentMutation,
	useGetManagementDepartmentsQuery,
	useGetManagementDepartmentQuery,
	useUpdateManagementDepartmentMutation,
	useDeleteManagementDepartmentMutation,
} = managementDepartmentApi;
