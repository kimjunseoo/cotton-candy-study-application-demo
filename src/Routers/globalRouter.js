import express from "express";
import { getCreateNewRoom, getError, getHome, getJoinByCode, getJoinRoom, postJoinByCode } from "../Controllers/globalControllers";

const globalRouter = express.Router();


globalRouter.route("/").get(getHome);
globalRouter.route("/error").get(getError);
globalRouter.route("/rooms/create").get(getCreateNewRoom);
globalRouter.route("/rooms/:invitecode").get(getJoinRoom);
globalRouter.route("/joinByCode").get(getJoinByCode).post(postJoinByCode);

export default globalRouter;