import { api } from "../../api/apiSlice";

const documentApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getDocuments: builder.query({
			query: () => "/documents",
		}),
		getUnapprovedDocuments: builder.query({
			query: () => "/documents/unapproved",
		}),
		singleDocument: builder.query({
			query: (id) => `/documents/${id}`,
		}),
		downloadPdf: builder.mutation({
			query: (filename) => ({
				url: `documents/download-pdf/${filename}`,
				method: "GET",
			}),
		}),
		createDocument: builder.mutation({
			query: (formData) => ({
				url: "/documents/create",
				method: "POST",
				body: formData,
			}),
		}),
		updateDocument: builder.mutation({
			query: ({ id, formData }) => ({
				url: `/documents/${id}`,
				method: "PATCH",
				body: formData,
			}),
		}),
		deleteDocument: builder.mutation({
			query: (id) => ({
				url: `/documents/${id}`,
				method: "DELETE",
			}),
		}),
		approvedDocument: builder.mutation({
			query: (id) => ({
				url: `/documents/status/${id}`,
				method: "POST",
			}),
		}),
	}),
});

export const {
	useGetDocumentsQuery,
	useGetUnapprovedDocumentsQuery,
	useSingleDocumentQuery,
	useDownloadPdfMutation,
	useCreateDocumentMutation,
	useUpdateDocumentMutation,
	useDeleteDocumentMutation,
	useApprovedDocumentMutation,
} = documentApi;
