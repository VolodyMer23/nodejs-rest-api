import express from "express";
import ctrl from "../../controllers/contacts.js";
import { isEmptyBody, isValidId } from "../../middlewares/index.js";
import validateBody from "../../decorators/validateBody.js";
import Schema from "../../schema/schema.js";

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:contactId", isValidId, ctrl.getById);

router.post(
  "/",
  isEmptyBody,
  validateBody(Schema.contactSchema),
  ctrl.addContact
);

router.patch(
  "/:contactId/favorite",
  isValidId,
  isEmptyBody,
  validateBody(Schema.updateFavoriteSchema),
  ctrl.updateStatusContact
);

router.put(
  "/:contactId",
  isValidId,
  isEmptyBody,
  validateBody(Schema.contactSchema),
  ctrl.update
);

router.delete("/:contactId", isValidId, ctrl.remove);

export default router;
