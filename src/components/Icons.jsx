'use client';

import { FaRegEnvelope, FaInstagram, FaLinkedinIn, FaGithub, FaRegFileAlt } from 'react-icons/fa';

/*
  `showResume` drops the résumé icon for callers that already carry a résumé
  text link beside it - SiteRule does. Defaults on, so the home navbar keeps
  all five.
*/
export default function Icons({ iconSize = 25, className = '', gap = 'gap-6', showResume = true }) {
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
        rel="me noopener noreferrer"
      >
        <FaInstagram size={iconSize} />
      </a>
      <a
        href="https://www.linkedin.com/in/anthonyfreay"
        aria-label="Visit LinkedIn Profile"
        title="LinkedIn"
        className="hover:text-accent-1 transition-colors"
        target="_blank"
        rel="me noopener noreferrer"
      >
        <FaLinkedinIn size={iconSize} />
      </a>
      {showResume && (
        <a
          href="/resume"
          aria-label="View Résumé"
          title="Résumé"
          className="hover:text-accent-1 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaRegFileAlt size={iconSize} />
        </a>
      )}
      <a
        href="https://github.com/anthonyfreay"
        aria-label="Visit GitHub Profile"
        title="GitHub"
        className="hover:text-accent-1 transition-colors"
        target="_blank"
        rel="me noopener noreferrer"
      >
        <FaGithub size={iconSize} />
      </a>
    </div>
  );
}
