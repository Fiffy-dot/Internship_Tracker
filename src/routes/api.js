import { Router } from 'express';
import internshipRouter from './internship/internship.routes.js';

export const routes = Router();

routes.use("/internships", internshipRouter);

