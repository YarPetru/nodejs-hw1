const { v4: uuidv4 } = require("uuid");

const fs = require("fs").promises;
// const fs = require("fs/promises");

const path = require("path");

const contactsPath = path.join(__dirname, ".", "/db", "contacts.json");

const ENCODING_TYPE = "utf-8";

async function listContacts() {
  const data = await fs.readFile(contactsPath, ENCODING_TYPE);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const [result] = contacts.filter(
    (contact) => contact.id === String(contactId)
  );
  return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (contact) => contact.id === String(contactId)
  );
  if (index !== -1) {
    const [removedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
  } else return null;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  const updatedContactList = [...contacts, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(updatedContactList, null, 2));
  return updatedContactList;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
