import Link from "next/link";
import styles from "../../styles/course.module.scss";

export default function CourseTopBar({ backHref, backLabel }) {
  return (
    <header className={styles.topBar}>
      <div className="container d-flex justify-content-between align-items-center">
        <Link href="/">
          <a className={styles.brand}>Avese Tokula</a>
        </Link>
        {backHref && (
          <Link href={backHref}>
            <a className={styles.backLink}>{backLabel}</a>
          </Link>
        )}
      </div>
    </header>
  );
}
