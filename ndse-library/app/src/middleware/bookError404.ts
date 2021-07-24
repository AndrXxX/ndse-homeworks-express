import { NextFunction, Request, Response } from "express";
import container from "../infrastructure/container";
import { BooksService } from "../services/BooksService";

export default async (req: Request, res: Response, next: NextFunction) => {
  const booksService = container.get(BooksService);
  if (!await booksService.hasBook(req.params.id as string)) {
    return res.status(404).redirect('/404');
  }
  return next();
};
