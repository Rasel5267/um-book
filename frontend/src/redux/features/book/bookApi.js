import { api } from "../../api/apiSlice";

const bookApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getBooks: builder.query({
			query: () => "/books",
		}),
		getUnapprovedBooks: builder.query({
			query: () => "/books/unapproved",
		}),
		singleBook: builder.query({
			query: (id) => `/books/${id}`,
		}),
		getSearchBooks: builder.query({
			query: (searchTerm) => `/books?searchTerm=${searchTerm}`,
		}),
		downloadPdf: builder.mutation({
			query: (filename) => ({
				url: `books/download-pdf/${filename}`,
				method: "GET",
			}),
		}),
		createBook: builder.mutation({
			query: (formData) => ({
				url: "/books/create",
				method: "POST",
				body: formData,
			}),
		}),
		updateBook: builder.mutation({
			query: ({ id, formData }) => ({
				url: `/books/${id}`,
				method: "PATCH",
				body: formData,
			}),
		}),
		deleteBook: builder.mutation({
			query: (id) => ({
				url: `/books/${id}`,
				method: "DELETE",
			}),
		}),
		approvedBook: builder.mutation({
			query: (id) => ({
				url: `/books/status/${id}`,
				method: "POST",
			}),
		}),
	}),
});

export const {
	useGetBooksQuery,
	useGetUnapprovedBooksQuery,
	useSingleBookQuery,
	useGetSearchBooksQuery,
	useDownloadPdfMutation,
	useCreateBookMutation,
	useUpdateBookMutation,
	useDeleteBookMutation,
	useApprovedBookMutation,
} = bookApi;
