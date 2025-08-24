import { IoPerson } from "react-icons/io5";
import { BsFillTelephoneFill } from "react-icons/bs";
import css from "./Contact.module.css";

const Contact = ({ contact, onDeleteContact }) => {
  return (
    <div className={css.contactItem}>
      <div className={css.contactInfo}>
        <span className={css.contactName}>
          <IoPerson /> {contact.name}
        </span>
        <span className={css.contactNumber}>
          <BsFillTelephoneFill /> {contact.number}
        </span>
      </div>
      <button className={css.deleteButton} onClick={() => onDeleteContact(contact.id)}>Delete</button>
    </div>
  );
};

export default Contact;