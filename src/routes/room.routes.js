import { Router } from "express";
import {
    createRoom,
    getAllRooms,
    joinRoom,
    getUsersInRoom,
    getRoomByAdmin,
    getRoomNameById,
deleteUserById
} from "../controllers/room.Controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { roomSchema } from "../schemas/room.schema.js";
import { validateSchema } from "../middlewares/validator.middleware.js";

const router = Router();

router.post("/roomct", validateSchema(roomSchema), createRoom);

router.post("/join/:roomId", authRequired, joinRoom);
router.get("/room", getAllRooms);
router.get('/room/:roomId/users', getUsersInRoom);
router.get("/room/byadmin", authRequired, getRoomByAdmin);
router.get('/room/:roomId/name', getRoomNameById);
router.delete('/room/:roomId/users/delete', authRequired, deleteUserById);

export default router;
