import express from "express";
import {
  createModule,
  getModules,
  getModuleById,
  updateModule,
  deleteModule,
} from "../controllers/moduleController.js";

const router = express.Router();

// Path: /api/modules
router.route("/")
  .get(getModules)  
  .post(createModule);

// Path: /api/modules/:id
router.route("/:id")
  .get(getModuleById)  
  .put(updateModule) 
  .delete(deleteModule);

export default router;