import contactSchema from "../schema/schema.js";
import contactsService from "../models/contacts.js";
import createHttpError from "http-errors";

const addContact = async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw createHttpError(404, `Not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw createHttpError(404, `Not found`);
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

export default { getAll, getById, addContact, remove, update };
