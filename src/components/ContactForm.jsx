'use client';

import { useRef, useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [formKey, setFormKey] = useState(Date.now());
  const [showThankYou, setShowThankYou] = useState(false);
  const [formState, submit] = useForm('mzdadlpl');
  const formRef = useRef();

  useEffect(() => {
    if (formState.succeeded) {
      setShowThankYou(true);
      formRef.current?.reset();
      setFormKey(Date.now());
    }
  }, [formState.succeeded]);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await submit(e);
  };

  return (
    <form
      key={formKey}
      ref={formRef}
      onSubmit={handleOnSubmit}
      className={styles.contactForm}
    >
      <input id="fname" type="text" name="fname" placeholder="First Name*" required />
      <ValidationError field="fname" prefix="First Name" errors={formState.errors} />

      <input id="lname" type="text" name="lname" placeholder="Last Name*" required />
      <ValidationError field="lname" prefix="Last Name" errors={formState.errors} />

      <input type="email" name="_replyto" placeholder="Email*" required />
      <ValidationError field="_replyto" prefix="Email" errors={formState.errors} />

      <input type="text" name="_subject" placeholder="Subject*" required />
      <ValidationError field="_subject" prefix="Subject" errors={formState.errors} />

      <textarea name="message" placeholder="Scope of Work*" required></textarea>
      <ValidationError field="message" prefix="Message" errors={formState.errors} />

      <label htmlFor="check" className={styles.terms}>
        Terms of Service*
        <span className={styles.terms}>
          I understand this form is for professional inquiries only.
        </span>
      </label>

      <select name="check" required>
        <option value="">Select</option>
        <option value="Yes">Yes, I understand</option>
      </select>

      <button type="submit" className={styles.submit} disabled={formState.submitting}>
        Submit
      </button>

      {showThankYou && (
        <p className={`${styles.thankYouMessage} ${showThankYou ? styles.thankYouMessageActive : ''}`}>
          Thanks for reaching out! <br />
          Please refresh to send a new message.
        </p>
      )}
    </form>
  );
}
