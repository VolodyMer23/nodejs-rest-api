import contactSchema from "../schema/schema.js";
import contactsService from "../models/contacts.js";
import createHttpError from "http-errors";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const addContact = async (req, res, next) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const getAll = async (req, res, next) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsService.getContactById(contactId);
  if (!result) {
    throw createHttpError(404, `Not found`);
  }
  res.json(result);
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsService.removeContact(contactId);
  if (!result) {
    throw createHttpError(404, `Not found`);
  }
  res.json({ message: "Contact deleted" });
};

const update = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsService.updateById(contactId, req.body);
  const { length } = Object.keys(req.body);
  console.log(length);
  if (length === 0) {
    throw createHttpError(400, "missing fields");
  }
  if (!result) {
    throw createHttpError(404, `Not found`);
  }
  const { error } = contactSchema.validate(req.body);
  if (error) {
    error.status = 400;
    throw error;
  }
  res.json(result);
};

export default {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  remove: ctrlWrapper(remove),
  update: ctrlWrapper(update),
};
