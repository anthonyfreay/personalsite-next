'use client';

import Image from 'next/image';
import ContactForm from '@/components/ContactForm';
import styles from './ContactClient.module.css';

export default function ContactClient() {
  return (
    <div className="flex flex-col">
      <div className={styles.mainContent}>
        <div className={styles.bioContainer}>
          <div className={styles.leftColumn}>
            <div className={styles.bioImage}>
              <Image
                src="/me/A7406500.jpg"
                alt="Anthony Freay"
                width={400}
                height={400}
                className={styles.profileImage}
                priority
                sizes="(max-width: 470px) 200px, (max-width: 999px) 300px, 400px"
              />
            </div>
          </div>

          <div className={styles.rightColumn}>
            <div className={styles.bioDescription}>
              <p className={styles.intro}>
                <b>Anthony Freay</b> (he/him) is a multi-faceted creative, specializing in: <b>software development, photography,</b> and <b>design</b> based in <b>New York, NY</b>.
              </p>

              <p className={styles.ethos}>
                Anthony&apos;s work focuses on collaboration and attention to detail to create clean, authentic imagery.
              </p>

              <p className={styles.location}>
                Anthony is currently booking for photography sessions. For inquiries, please use the form below or reach out directly via email.
              </p>
            </div>

            <div className={styles.formContainer}>
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
