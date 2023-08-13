import express from "express";
import ctrl from "../../controllers/contacts.js";
import { isEmptyBody, isValidId, authenticate } from "../../middlewares/index.js";
import Schema from "../../schema/schema.js";
import validateBody from "../../helpers/validateBody.js";

const router = express.Router();

router.use(authenticate);

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
