import { useState } from "react";
import { useRouter } from "next/router";
import { formatNaira } from "../../config/courses";
import styles from "../../styles/course.module.scss";

export default function PurchaseCard({ course }) {
  const router = useRouter();
  const [plan, setPlan] = useState(
    course.packages[course.packages.length - 1].id,
  );

  return (
    <div id="enrol" className={styles.card}>
      <h2 className={styles.cardTitle}>Enrol in this programme</h2>
      <div role="radiogroup" aria-label="Choose a package">
        {course.packages.map((p) => (
          <label
            key={p.id}
            className={`${styles.planOption} ${plan === p.id ? styles.planActive : ""}`}
          >
            <input
              type="radio"
              className="form-check-input mt-0"
              name="package"
              value={p.id}
              checked={plan === p.id}
              onChange={() => setPlan(p.id)}
            />
            <span className={styles.planText}>
              <strong>{p.label}</strong>
              <span className={styles.planNote}>{p.note}</span>
            </span>
            <span className={styles.planPrice}>{formatNaira(p.amount)}</span>
          </label>
        ))}
      </div>
      <p className={`${styles.planNote} mb-3`}>
        You pay by bank transfer. The account details are on the next step.
      </p>
      <button
        type="button"
        className="btn btn-primary w-100"
        onClick={() =>
          router.push(`/courses/${course.slug}/checkout?plan=${plan}`)
        }
      >
        Buy now
      </button>
    </div>
  );
}
