import express from "express";
import ctrl from "../../controllers/contacts.js";
import isEmptyBody from "../../middlewars/isEmptyBody.js";
import validateBody from "../../decorators/validateBody.js";
import contactSchema from "../../schema/schema.js";

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", ctrl.getById);

router.post("/", isEmptyBody, validateBody(contactSchema), ctrl.addContact);

router.delete("/:contactId", ctrl.remove);

router.put(
  "/:contactId",
  isEmptyBody,
  validateBody(contactSchema),
  ctrl.update
);

export default router;
