import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    author: z.string({
      required_error: 'Author is required',
    }),
    publisher: z.string({
      required_error: 'publisher is required',
    }),
    publicationDate: z.string({
      required_error: 'Publication Date is required',
    }),
    description: z.string({
      required_error: 'Description is required',
    }),
    academicDepartment: z.string({
      required_error: 'Academic Department ID is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    publisher: z.string().optional(),
    publicationDate: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    academicDepartment: z.string().optional(),
  }),
});

export const BookValidation = {
  create,
  update,
};
