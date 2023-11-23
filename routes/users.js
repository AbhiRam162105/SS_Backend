import express from "express";
import {
  CREATE_USER,
  DELETE_USER,
  GET_ALL_USER,
  GET_USER,
  UPDATE_USER,
  loginUser,
} from "../controllers/userc.js";

const router = express.Router();

//CREATE
router.post("/", CREATE_USER);
//UPDATE
router.patch("/:id", UPDATE_USER);
//DELETE
router.delete("/:id", DELETE_USER);
//GET
router.get("/:id", GET_USER);
//GET ALL
router.get("/", GET_ALL_USER);
//LOGIN
router.get("/login", loginUser);

export default router;
