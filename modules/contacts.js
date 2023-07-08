const fs = require("fs").promises;
const path = require("path");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");
require("colors");

/**
 * The path to file with contacts
 */
const contactsPath = path.join("db", "contacts.json");

// Get all contacts
async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath);
    const parsedContcts = JSON.parse(contacts);
    if (parsedContcts) {
      return console.table(parsedContcts);
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log("Sorry here is no any contacts".red);
  }
}
// Get contact by id
async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath);

    const parsContacts = JSON.parse(contacts);
    const contactById = (contactId = parsContacts.find(
      ({ id }) => id === contactId
    ));
    if (contactById) {
      console.log(contactById);
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(`The contact doesn't exist`.red);
  }
}

// Remove contact by id
async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath);

    const parsedContacts = JSON.parse(contacts);

    const isContactExsist = parsedContacts.find(({ id }) => id === contactId);
    if (isContactExsist) {
      const filterdContcts = (contactId = parsedContacts.filter(
        ({ id }) => id !== contactId
      ));
      const stringifyContacts = JSON.stringify(filterdContcts);

      await fs.writeFile(contactsPath, stringifyContacts);

      console.log("The contact was remowed".yellow, isContactExsist);
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(`The contact with id ${contactId} was delete`.red);
  }
}

// Add object of contact
async function addContact(name, email, phone) {
  const id = uuidv1();
  try {
    const contacts = await fs.readFile(contactsPath);

    const parsedContacts = JSON.parse(contacts);
    const newContact = { id, name, email, phone };

    const isContactExsist = parsedContacts.find(
      ({ id }) => id === newContact.id
    );

    if (!isContactExsist) {
      parsedContacts.push(newContact);
      const stringifyContacts = JSON.stringify(parsedContacts);

      await fs.writeFile(contactsPath, stringifyContacts);

      console.log("The contact was added".yellow, newContact);
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(`The contact with name ${name} already exist`.red);
  }
}

module.exports = contacts = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
