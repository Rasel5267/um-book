import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    author: z.string({
      required_error: 'Author is required',
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
    academicDepartment: z.string().optional(),
  }),
});

export const DocumentValidation = {
  create,
  update,
};
