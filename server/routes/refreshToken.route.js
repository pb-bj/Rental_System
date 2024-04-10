import { Router } from "express";
import { generateRefreshToken } from "../controller/refreshToken.controller.js";

const route = Router();

route.post('/refresh', generateRefreshToken);

export default route;