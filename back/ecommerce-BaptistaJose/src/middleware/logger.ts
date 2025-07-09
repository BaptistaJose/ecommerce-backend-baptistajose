import { NextFunction, Request, Response } from "express";

export function LoggerGlobal (req: Request, res: Response, next: NextFunction){
    console.log(`estas ejecutando un metodo ${req.method} en la ruta ${req.url} ${new Date()}`);
    next();
}