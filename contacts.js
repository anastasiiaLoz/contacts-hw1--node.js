const fs = require("fs");
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "./db/contacts.json");
// const contactsData = fs.readFileSync(contactsPath);
// const parsedContacts = JSON.parse(contactsData);
// console.log(parsedContacts);

function listContacts() {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;

    const result = JSON.parse(data);
    console.table(result);
  });
}

function getContactById(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;

    const arrayOfContacts = JSON.parse(data);
    const contactById = arrayOfContacts.find(({ id }) => id === parseInt(contactId));
    console.log(contactById);
  });
}

function removeContact(contactId) {
  fs.readFile(contactsPath, (err, data) => {
    if (err) throw err;

    const arrayOfContacts = JSON.parse(data);
    const contactList = arrayOfContacts.filter(({ id }) => id !== Number(contactId));
    console.table(contactList);
    const removedContactList = JSON.stringify(contactList, null, "\t");
    fs.writeFile(contactsPath, removedContactList, err => {
      if (err) console.error(err);
    });
    console.log(`Contact by ID: '${contactId}' was removed`);
  });
}

function addContact(name, email, phone) {
  fs.readFile(contactsPath, { encoding: "utf8" }, (err, data) => {
    if (err) {
      console.error(err.message);
    }
    let uniqueId = Math.floor(Math.random() * 100);
    const contacts = JSON.parse(data);

    const contactsNew = { id: uniqueId, name: name, email: email, phone: phone };
    const contactsList = JSON.stringify([...contacts, contactsNew], null, "\t");
    fs.writeFile(contactsPath, contactsList, err => {
      if (err) console.error(err);
    });
    console.log(`A new contact '${name}' was added`);
  });
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact
};
