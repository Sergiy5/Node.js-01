const servicesContacts = require("./modules/contacts");
const { Command } = require("commander");
const { listContacts, getContactById, removeContact, addContact } =
  servicesContacts;

const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <string>", "user phone");

// Fetch arguments from command line (input)
program.parse(process.argv);

// Arguments from "program"
const argv = program.opts();

// Standart input and output
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(id);
      break;

    case "add":
      addContact(name, email, phone);
      break;

    case "remove":
      removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
