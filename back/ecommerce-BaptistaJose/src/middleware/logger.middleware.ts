import { NextFunction, Request, Response } from 'express';

export function LoggerMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(
    `Se esta ejecutando un metodo: ${req.method} en la ruta: ${req.url} a la fecha: ${new Date().toLocaleString()}`,
  );
  next();
}
