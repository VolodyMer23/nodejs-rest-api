import express from "express";
import ctrl from '../../controllers/contacts.js'
const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", ctrl.addContact);

router.delete("/:contactId", ctrl.remove);

router.put("/:contactId", ctrl.update);

export default router;
