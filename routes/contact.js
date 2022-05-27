const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const { isSignedIn } = require("../controllers/auth");
const {
  addContact,
  getContactById,
  getContact,
  updateContact,
  deleteContact,
  addContacts,
  getContacts,
  pagination,
} = require("../controllers/contact");

router.param("contactId", getContactById);

router.post(
  "/contact/add",
  isSignedIn,
  [
    check("firstname", "enter email in proper format").isLength({ min: 3 }),
    check("lastname", "enter lastname").notEmpty(),
    check(
      "phonenumber",
      "phone number must containg only numbers and length must equal to 10"
    )
      .isNumeric()
      .isLength({ max: 10, min: 10 }),
    check("addressline1", "enter address line 1").notEmpty(),
    check("city", "enter city").notEmpty(),
    check("state", "enter state").notEmpty(),
    check("pincode", "pincode must contain only digits and of length 6")
      .isNumeric()
      .isLength(6),
  ],
  addContact
);
router.post(
  "/contact/addbulk",
  isSignedIn,
  [
    check("contacts.*.firstname", "enter email in proper format").isLength({
      min: 3,
    }),
    check("contacts.*.lastname", "enter lastname").notEmpty(),
    check(
      "contacts.*.phonenumber",
      "phone number must containg only numbers and length must equal to 10"
    )
      .isNumeric()
      .isLength({ max: 10, min: 10 }),
    check("contacts.*.addressline1", "enter address line 1").notEmpty(),
    check("contacts.*.city", "enter city").notEmpty(),
    check("contacts.*.state", "enter state").notEmpty(),
    check(
      "contacts.*.pincode",
      "pincode must contain only digits and of length 6"
    )
      .isNumeric()
      .isLength(6),
  ],
  addContacts
);

router.get("/contact/:contactId", isSignedIn, getContact);
router.get("/contact", isSignedIn, pagination, getContacts);

router.put("/contact/:contactId", isSignedIn, updateContact);

router.delete("/contact/:contactId", isSignedIn, deleteContact);

module.exports = router;
