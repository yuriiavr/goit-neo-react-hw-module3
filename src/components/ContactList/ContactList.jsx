import Contact from "./Contact/Contact";
import css from "./ContactList.module.css";

const ContactList = ({ contacts, onDeleteContact }) => {
  return (
    <>
      <ul className={css.contactsList}>
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <li key={contact.id}>
              <Contact contact={contact} onDeleteContact={onDeleteContact} />
            </li>
          ))
        ) : (
          <p className={css.noContactsMessage}>No contacts matching your search.</p>
        )}
      </ul>
    </>
  );
};

export default ContactList;