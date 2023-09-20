import { api } from "../../api/apiSlice";

const adminApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getAdminProfile: builder.query({
			query: (id) => `/admins/${id}`,
		}),
		updateAdminProfile: builder.mutation({
			query: ({ id, formData }) => ({
				url: `/admins/${id}`,
				method: "PATCH",
				body: formData,
			}),
		}),
		getAdmins: builder.query({
			query: () => "admins",
		}),
		createAdmin: builder.mutation({
			query: (formData) => ({
				url: "/users/create-admin",
				method: "POST",
				body: formData,
			}),
		}),
		deleteAdmin: builder.mutation({
			query: (id) => ({
				url: `/admins/${id}`,
				method: "DELETE",
			}),
		}),
		getFaculties: builder.query({
			query: () => "/faculties",
		}),
		createFaculty: builder.mutation({
			query: (formData) => ({
				url: "/users/create-faculty",
				method: "POST",
				body: formData,
			}),
		}),
		deleteFaculty: builder.mutation({
			query: (id) => ({
				url: `/faculties/${id}`,
				method: "DELETE",
			}),
		}),
		getStudents: builder.query({
			query: () => "/students",
		}),
		createStudent: builder.mutation({
			query: (formData) => ({
				url: "/users/create-student",
				method: "POST",
				body: formData,
			}),
		}),
		deleteStudent: builder.mutation({
			query: (id) => ({
				url: `/students/${id}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useGetAdminProfileQuery,
	useUpdateAdminProfileMutation,
	useGetAdminsQuery,
	useGetFacultiesQuery,
	useGetStudentsQuery,
	useCreateAdminMutation,
	useCreateFacultyMutation,
	useCreateStudentMutation,
	useDeleteAdminMutation,
	useDeleteFacultyMutation,
	useDeleteStudentMutation,
} = adminApi;
