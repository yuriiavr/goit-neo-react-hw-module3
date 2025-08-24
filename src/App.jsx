import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import SearchBox from "./components/SearchBox/SearchBox";
import Notification from "./components/Notification/Notification";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const getInitialContacts = () => {
    try {
      const savedContacts = localStorage.getItem("contacts");
      if (savedContacts) {
        return JSON.parse(savedContacts);
      }
    } catch (error) {
      console.error(
        "Error loading contacts from local storage:",
        error
      );
    }
    return [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ];
  };

  const [contacts, setContacts] = useState(getInitialContacts);
  const [filter, setFilter] = useState("");
  const [debouncedFilter, setDebouncedFilter] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem("contacts", JSON.stringify(contacts));
    } catch (error) {
      console.error(
        "Error saving contacts to local storage:",
        error
      );
    }
  }, [contacts]);

    useEffect(() => {
    if (deleteMessage) {
      const timerId = setTimeout(() => {
        setDeleteMessage("");
        setNotificationType("");
      }, 3000);
      return () => clearTimeout(timerId);
    }
  }, [deleteMessage]);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedFilter(filter);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [filter]);

  const handleDeleteContact = (contactId) => {
    const contactToDelete = contacts.find((contact) => contact.id === contactId);
    if (contactToDelete) {
      setContacts((prevContacts) =>
        prevContacts.filter((contact) => contact.id !== contactId)
      );
      setDeleteMessage(`Contact "${contactToDelete.name}" successfully deleted!`);
      setNotificationType("success");
    }
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleAddContact = (newContact) => {
    setContacts((prevContacts) => [...prevContacts, newContact]);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = debouncedFilter.toLowerCase();

    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <>
      <Notification message={deleteMessage} type={notificationType} />
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={handleAddContact} contacts={contacts} />
      </div>
      <div>
        <SearchBox value={filter} onChange={handleFilterChange} />
        <ContactList
          contacts={filteredContacts}
          onDeleteContact={handleDeleteContact}
        />
      </div>
    </>
  );
}

export default App;