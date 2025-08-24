import { Formik, Form, Field, ErrorMessage } from "formik";
import Notification from "../Notification/Notification";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import css from './ContactForm.module.css'

const ContactForm = ({ onAddContact, contacts }) => {
    
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name must be at most 50 characters")
      .required("Name is a required field"),
    number: Yup.string()
      .min(3, "Number must be at least 3 characters")
      .max(15, "Number must be at most 15 characters")
      .required("Number is a required field")
      .matches(
        /^[0-9\s\-+()]+$/,
        "Phone number can only contain digits, spaces, hyphens, parentheses, and the plus sign"
      ),
  });

  const [duplicateMessage, setDuplicateMessage] = useState('');
  const [addMessage, setAddMessage] = useState('');

  useEffect(() => {
    if (duplicateMessage) {
      const timerId = setTimeout(() => {
        setDuplicateMessage("");
      }, 3000);
      return () => clearTimeout(timerId);
    }
  }, [duplicateMessage]);

  useEffect(() => {
    if (addMessage) {
      const timerId = setTimeout(() => {
        setAddMessage("");
      }, 3000);
      return () => clearTimeout(timerId);
    }
  }, [addMessage]);

  return (
    <Formik
      initialValues={{ name: "", number: "" }}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        const isDuplicate = contacts.some(
          (contact) => contact.name.toLowerCase() === values.name.toLowerCase()
        );

        if (isDuplicate) {
          setDuplicateMessage(`${values.name} is already in contacts.`);
          actions.setSubmitting(false);
          return;
        }

        onAddContact({
          id: nanoid(),
          name: values.name,
          number: values.number,
        });

        setAddMessage(`${values.name} successfully added!`);

        actions.resetForm();
        setDuplicateMessage('');
      }}
    >
      {({ isSubmitting }) => (
        <Form className={css.form}>
          <Notification message={duplicateMessage} type="error" />
          <Notification message={addMessage} type="success" />
          <div className={css.formField}>
            <label className={css.formLabel} htmlFor="name">Name</label>
            <Field className={css.formInput} type="text" name="name" />
            <ErrorMessage className={css.errorMessage} name="name" component="div" />
          </div>

          <div className={css.formField}>
            <label className={css.formLabel} htmlFor="number">Number</label>
            <Field className={css.formInput} type="tel" name="number" />
            <ErrorMessage className={css.errorMessage} name="number" component="div" />
          </div>

          <button className={css.submitButton} type="submit" disabled={isSubmitting}>
            Add contact
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;