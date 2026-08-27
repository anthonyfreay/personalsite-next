'use client';

import { useEffect, useRef, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import styles from './ContactForm.module.css';

export default function ContactForm() {
  const [formState, submit] = useForm('mzdadlpl');
  const formRef = useRef();
  const budgetOutRef = useRef();
  const lastBudgetRef = useRef('');
  const [dismissedResult, setDismissedResult] = useState(null);

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    await submit(e);
  };

  // useForm's submit() resolves to undefined, so success is only observable
  // through formState. Key off `result` rather than `succeeded`: succeeded
  // stays true after the first send, so a second one would never reset.
  // reset() is a DOM call, not setState, so it is fine in an effect.
  useEffect(() => {
    if (formState.result) {
      formRef.current?.reset();
      lastBudgetRef.current = '';
      if (budgetOutRef.current) budgetOutRef.current.value = '';
    }
  }, [formState.result]);

  // The budget field is uncontrolled so the native form.reset() on success
  // clears it along with everything else. Sanitizing mutates the input in
  // place; the hidden sibling carries the USD-formatted value to Formspree.
  const syncBudgetOutput = (amount) => {
    if (!budgetOutRef.current) return;
    const parsed = Number(amount);
    budgetOutRef.current.value =
      amount === '' || Number.isNaN(parsed) ? '' : `USD $${parsed.toFixed(2)}`;
  };

  // Digits with at most two decimal places; anything else never lands. A
  // second decimal point is rejected outright rather than reflowed, which
  // would quietly turn 1000.00 into 1.00 on one stray keystroke.
  const handleBudgetChange = (e) => {
    const cleaned = e.target.value.replace(/[^\d.]/g, '');
    const [whole, ...rest] = cleaned.split('.');
    let next;
    if (rest.length > 1) {
      next = lastBudgetRef.current;
    } else {
      next = rest.length ? `${whole}.${rest[0].slice(0, 2)}` : whole;
    }
    lastBudgetRef.current = next;
    e.target.value = next;
    syncBudgetOutput(next);
  };

  const handleBudgetBlur = (e) => {
    const parsed = Number(e.target.value);
    e.target.value =
      e.target.value === '' || Number.isNaN(parsed) ? '' : parsed.toFixed(2);
    lastBudgetRef.current = e.target.value;
    syncBudgetOutput(e.target.value);
  };

  // formState.result is a fresh object per success, so comparing against the
  // one already acknowledged lets the banner reappear on a second send and
  // clear as soon as the visitor starts typing again.
  const showSuccess = Boolean(formState.result) && formState.result !== dismissedResult;

  const handleFormInput = () => {
    if (formState.result) setDismissedResult(formState.result);
  };

  const formErrors = formState.errors?.getFormErrors?.() ?? [];

  return (
    <form
      ref={formRef}
      onSubmit={handleOnSubmit}
      onInput={handleFormInput}
      className={styles.contactForm}
    >
      <label htmlFor="fname" className="sr-only">First Name</label>
      <input
        id="fname"
        type="text"
        name="fname"
        placeholder="First Name*"
        autoComplete="given-name"
        required
      />
      <ValidationError field="fname" prefix="First Name" errors={formState.errors} />

      <label htmlFor="lname" className="sr-only">Last Name</label>
      <input
        id="lname"
        type="text"
        name="lname"
        placeholder="Last Name*"
        autoComplete="family-name"
        required
      />
      <ValidationError field="lname" prefix="Last Name" errors={formState.errors} />

      <label htmlFor="email" className="sr-only">Email</label>
      <input
        id="email"
        type="email"
        name="_replyto"
        placeholder="Email*"
        autoComplete="email"
        required
      />
      <ValidationError field="_replyto" prefix="Email" errors={formState.errors} />

      <label htmlFor="subject" className="sr-only">Subject</label>
      <input
        id="subject"
        type="text"
        name="_subject"
        placeholder="Subject*"
        required
      />
      <ValidationError field="_subject" prefix="Subject" errors={formState.errors} />

      <label htmlFor="message" className="sr-only">Scope of Work</label>
      <textarea
        id="message"
        name="message"
        placeholder="Scope of Work*"
        required
      ></textarea>
      <ValidationError field="message" prefix="Message" errors={formState.errors} />

      <label htmlFor="budget">Budget (optional)</label>
      <div className={styles.budgetField}>
        <span aria-hidden="true">$</span>
        <input
          id="budget"
          type="text"
          inputMode="decimal"
          defaultValue=""
          onChange={handleBudgetChange}
          onBlur={handleBudgetBlur}
          placeholder="1000.00"
          title="Enter an amount in US dollars, e.g. 1000.00"
          aria-describedby="budget-hint"
        />
      </div>
      <p id="budget-hint" className={styles.hint}>
        US dollars, numbers only, up to two decimal places.
      </p>
      <input type="hidden" name="budget" ref={budgetOutRef} defaultValue="" />
      <ValidationError field="budget" prefix="Budget" errors={formState.errors} />

      <label htmlFor="check" className={styles.terms}>
        Terms of Service*
        <span className={styles.terms}>
          I understand this form is for professional inquiries only.
        </span>
      </label>

      <select id="check" name="check" required>
        <option value="">Select</option>
        <option value="Yes">Yes, I understand</option>
      </select>

      <button type="submit" className={styles.submit} disabled={formState.submitting}>
        Submit
      </button>

      {formErrors.length > 0 && (
        <p role="alert" className={styles.formError}>
          Sorry, your message could not be sent. Please try again, or email me
          directly.
        </p>
      )}

      <p aria-live="polite" className="sr-only">
        {showSuccess ? 'Your message was sent.' : ''}
      </p>

      {showSuccess && (
        <p className={`${styles.thankYouMessage} ${styles.thankYouMessageActive}`}>
          Thanks for reaching out! <br />
          I&apos;ll be in touch soon.
        </p>
      )}
    </form>
  );
}
