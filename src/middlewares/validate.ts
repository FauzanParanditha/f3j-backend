import { RequestHandler } from "express";
import { ZodSchema } from "zod";

export const validate = (schema: ZodSchema): RequestHandler => {
  return (req, res, next) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        message: "Validasi gagal",
        errors: result.error.flatten().fieldErrors,
      });
      return;
    }

    req.body = result.data;
    return next();
  };
};
