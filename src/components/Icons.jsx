'use client';

import Link from 'next/link';
import { FaRegEnvelope, FaInstagram, FaLinkedinIn, FaGithub, FaRegFileAlt } from 'react-icons/fa';

export default function Icons({ iconSize = 25, className = '', gap = 'gap-6' }) {
  const emailSubject = encodeURIComponent('Website Inquiry - Anthony Freay');

  return (
    <div className={`flex justify-center items-center text-brand-light ${gap} ${className}`}>
      <a
        href={`mailto:anthonyfreay@gmail.com?subject=${emailSubject}`}
        aria-label="Email"
        title="Email"
        className="hover:text-accent-1 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaRegEnvelope size={iconSize} />
      </a>
      <a
        href="https://www.instagram.com/anthonyfreay"
        aria-label="Visit Instagram Profile"
        title="Instagram"
        className="hover:text-accent-1 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaInstagram size={iconSize} />
      </a>
      <a
        href="https://www.linkedin.com/in/anthonyfreay"
        aria-label="Visit LinkedIn Profile"
        title="LinkedIn"
        className="hover:text-accent-1 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaLinkedinIn size={iconSize} />
      </a>
      <a
        href="/resume_anthony_freay.pdf"
        aria-label="View Résumé"
        title="Résumé"
        className="hover:text-accent-1 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaRegFileAlt size={iconSize} />
      </a>
      <a
        href="https://github.com/anthonyfreay"
        aria-label="Visit GitHub Profile"
        title="GitHub"
        className="hover:text-accent-1 transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaGithub size={iconSize} />
      </a>
    </div>
  );
}
