const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");

// импорт функций из contacts.js
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      console.log("выводим список контактов");
      const fullContactList = await listContacts();
      console.table(fullContactList);
      break;
    case "get":
      console.log("выводим контакт по ид");
      const contact = await getContactById(id);
      console.log(contact);
      if (contact === null) {
        console.warn("контакта с таким ID нет");
      }
      break;
    case "remove":
      console.log("удаляем контакт по ID");
      const removedContact = await removeContact(id);
      console.log(removedContact);
      if (removedContact === null) {
        console.warn("контакта с таким ID нет");
      }
      break;
    case "add":
      console.log("создаем новый контакт");
      const updatedContactList = await addContact(name, email, phone);
      console.table(updatedContactList);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

//  ---обрезает первые два элемента из массива параметров, путь к ноде и путь к файлу index
const argumentsArray = hideBin(process.argv);
//  ---возвращает объект со свойствами argumentsArray
const { argv } = yargs(argumentsArray);

invokeAction(argv);

// ---файл с контактами
// const contacts = require("./db/contacts.json");

// ------------------------ test cases
// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "1" });
// invokeAction({ action: "remove", id: "cc12d768-b5d6-4bc7-bc34-1480ddebe2ee" });
// invokeAction({
//   action: "add",
//   name: "Caroline",
//   email: "caro@mail.com",
//   phone: "0855449978",
// });
