import { api } from "../../api/apiSlice";

const questionApi = api.injectEndpoints({
	endpoints: (builder) => ({
		getQuestions: builder.query({
			query: () => "/questions",
		}),
		getUnapprovedQuestions: builder.query({
			query: () => "/questions/unapproved",
		}),
		singleQuestion: builder.query({
			query: (id) => `/questions/${id}`,
		}),
		downloadPdf: builder.mutation({
			query: (filename) => ({
				url: `questions/download-pdf/${filename}`,
				method: "GET",
			}),
		}),
		createQuestion: builder.mutation({
			query: (formData) => ({
				url: "/questions/create",
				method: "POST",
				body: formData,
			}),
		}),
		updateQuestion: builder.mutation({
			query: ({ id, formData }) => ({
				url: `/questions/${id}`,
				method: "PATCH",
				body: formData,
			}),
		}),
		deleteQuestion: builder.mutation({
			query: (id) => ({
				url: `/questions/${id}`,
				method: "DELETE",
			}),
		}),
		approvedQuestion: builder.mutation({
			query: (id) => ({
				url: `/questions/status/${id}`,
				method: "POST",
			}),
		}),
	}),
});

export const {
	useGetQuestionsQuery,
	useGetUnapprovedQuestionsQuery,
	useSingleQuestionQuery,
	useDownloadPdfMutation,
	useCreateQuestionMutation,
	useUpdateQuestionMutation,
	useDeleteQuestionMutation,
	useApprovedQuestionMutation,
} = questionApi;
