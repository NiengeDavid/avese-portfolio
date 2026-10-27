import { useState } from "react";
import styles from "../../styles/course.module.scss";

export default function CopyButton({ value, label = "Copy" }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
      } else {
        const el = document.createElement("textarea");
        el.value = value;
        el.style.position = "fixed";
        el.style.opacity = "0";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch (e) {
      /* clipboard unavailable: the value is still visible to copy by hand */
    }
  };

  return (
    <button
      type="button"
      className={`btn btn-sm btn-outline-primary ${styles.copyBtn}`}
      onClick={onCopy}
      aria-label={`${label} ${value}`}
    >
      {copied ? "Copied" : label}
    </button>
  );
}
