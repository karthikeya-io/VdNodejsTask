const Contact = require("../models/contact");
const { check, validationResult } = require("express-validator");
const { model } = require("mongoose");

exports.addContact = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const contact = new Contact(req.body);
  contact.save((err, contact) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        err: "NOT able to save contact in DB",
      });
    }
    return res.json(contact);
  });
};

exports.addContacts = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  let myOperations = req.body.contacts.map((contact) => {
    return {
      insertOne: { document: contact },
    };
  });

  Contact.bulkWrite(myOperations, {}, (err, contacts) => {
    if (err) {
      console.log(err);
      return res.status(400).json({
        error: "Bulk insert operation failed",
      });
    }
    res.json(contacts);
  });
};

exports.getContact = (req, res) => {
  return res.json(req.contact);
};

exports.updateContact = (req, res) => {
  Contact.findByIdAndUpdate(
    { _id: req.contact._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, contact) => {
      if (err) {
        return res.status(400).json({
          error: "Updation of contact failed",
        });
      }
      res.json(contact);
    }
  );
};

exports.deleteContact = (req, res) => {
  let contact = req.contact;
  contact.remove((err, deletedContact) => {
    if (err) {
      return res.status(400).json({
        error: `Failed to delete the contact with id ${contact._id}`,
      });
    }
    res.json({
      message: "Deletion was a success",
      deletedContact,
    });
  });
};

exports.getContacts = (req, res) => {
  res.json(req.paginatedResults);
};

// custom middlewares

exports.getContactById = (req, res, next, id) => {
  Contact.findById(id).exec((err, contact) => {
    if (err) {
      return res.status(400).json({
        error: "Contact not found",
      });
    }
    req.contact = contact;
    next();
  });
};

exports.pagination = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const results = {};

  let match;
  if (req.query.match) {
    match = JSON.parse(req.query.match);
  } else {
    match = {};
  }

  if (endIndex < (await Contact.countDocuments(match).exec())) {
    results.next = {
      page: page + 1,
      limit: limit,
      match: match,
    };
  }

  if (startIndex > 0) {
    results.previous = {
      page: page - 1,
      limit: limit,
      match: match,
    };
  }

  try {
    results.results = await Contact.find(match)
      .limit(limit)
      .skip(startIndex)
      .exec();

    req.paginatedResults = results;
    next();
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
