import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  sections,
  allQuestions,
  MAX_ANSWER_LENGTH,
} from "../config/intakeQuestionnaire";
import CourseTopBar from "../components/course/CourseTopBar";
import SuccessCard from "../components/course/SuccessCard";
import { footer } from "../components/Footer";
import styles from "../styles/course.module.scss";

const DRAFT_KEY = "avs-intake-draft";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function IntakeQuestionnaire() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0..sections.length-1 = questions, last = email + submit
  const [answers, setAnswers] = useState({});
  const [email, setEmail] = useState("");
  const [ref, setRef] = useState("");
  const [website, setWebsite] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | submitting | done
  const [error, setError] = useState("");
  const [emailSent, setEmailSent] = useState(true);

  const lastStep = sections.length;
  const section = sections[step];

  // Restore saved draft, then prefill email/ref from checkout.
  useEffect(() => {
    if (!router.isReady) return;
    let draft = {};
    try {
      draft = JSON.parse(localStorage.getItem(DRAFT_KEY) || "{}");
    } catch (e) {
      /* ignore */
    }
    let checkout = {};
    try {
      checkout = JSON.parse(sessionStorage.getItem("avs-checkout") || "{}");
    } catch (e) {
      /* ignore */
    }

    const queryRef =
      typeof router.query.ref === "string" ? router.query.ref : "";
    const useRef = queryRef || checkout.ref || "";
    setRef(useRef);
    setAnswers(draft.answers || {});
    setEmail(
      draft.email || (checkout.ref === useRef ? checkout.email : "") || "",
    );
    setLoaded(true);
  }, [router.isReady, router.query.ref]);

  // Save draft as the person types.
  useEffect(() => {
    if (!loaded || status === "done") return;
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify({ answers, email }));
    } catch (e) {
      /* ignore */
    }
  }, [answers, email, loaded, status]);

  const goTo = (n) => {
    setStep(n);
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ref, email: email.trim(), answers, website }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(
          data.error || "Something went wrong. Please try again.",
        );
      try {
        localStorage.removeItem(DRAFT_KEY);
      } catch (err) {
        /* ignore */
      }
      setEmailSent(data.emailSent !== false);
      setStatus("done");
      window.scrollTo({ top: 0 });
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  };

  const answered = allQuestions.filter((q) =>
    (answers[q.id] || "").trim(),
  ).length;

  return (
    <div className={styles.page}>
      <Head>
        <title>Intake questionnaire | Avese Tokula</title>
        <meta name="robots" content="noindex" />
      </Head>
      <CourseTopBar />

      <main className="container pb-5" style={{ maxWidth: 760 }}>
        {status === "done" ? (
          <SuccessCard title="Questionnaire received">
            <p className={styles.bodyText}>
              {emailSent
                ? `Thank you. We've sent a confirmation to ${email.trim()}.`
                : "Thank you. Your answers are saved, but we couldn't send the confirmation email."}{" "}
              I&rsquo;ll review your answers before our first session.
            </p>
            <Link href="/courses/personal-growth-leadership-business-mentoring">
              <a className="btn btn-primary">Back to home</a>
            </Link>
          </SuccessCard>
        ) : (
          <form onSubmit={onSubmit} className="pt-4">
            <h1 className="h3 mb-1">Intake questionnaire</h1>
            <p className={styles.bodyText}>
              Personal Growth, Leadership &amp; Business Mentoring
            </p>

            <div className={styles.stepper}>
              <p className={styles.stepLabel}>
                Step {step + 1} of {lastStep + 1}
              </p>
              <div
                className="progress"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(((step + 1) / (lastStep + 1)) * 100)}
              >
                <div
                  className="progress-bar"
                  style={{ width: `${((step + 1) / (lastStep + 1)) * 100}%` }}
                />
              </div>
            </div>

            {section ? (
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>
                  {section.id !== "P" ? `${section.id}. ` : ""}
                  {section.title}
                </h2>
                {section.intro && (
                  <p className={styles.bodyText}>{section.intro}</p>
                )}
                {section.questions.map((q) => (
                  <div key={q.id} className={styles.question}>
                    <label htmlFor={q.id} className={styles.questionLabel}>
                      {q.number ? `${q.number}. ` : ""}
                      {q.text}
                    </label>
                    <textarea
                      id={q.id}
                      className="form-control"
                      rows={q.number ? 3 : 2}
                      maxLength={MAX_ANSWER_LENGTH}
                      value={answers[q.id] || ""}
                      onChange={(e) =>
                        setAnswers((a) => ({ ...a, [q.id]: e.target.value }))
                      }
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className={styles.card}>
                <h2 className={styles.cardTitle}>
                  Where should we send your confirmation?
                </h2>
                <p className={styles.bodyText}>
                  You&rsquo;ve answered {answered} of {allQuestions.length}{" "}
                  questions. You can go back and add more before you submit.
                </p>
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  className="form-control"
                  required
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={200}
                />
                <div className={styles.honeypot} aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                  />
                </div>
              </div>
            )}

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-outline-primary"
                onClick={() => goTo(step - 1)}
                disabled={step === 0 || status === "submitting"}
              >
                Back
              </button>
              {step < lastStep ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => goTo(step + 1)}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={status === "submitting"}
                >
                  {status === "submitting"
                    ? "Submitting..."
                    : "Submit questionnaire"}
                </button>
              )}
            </div>
            <p className={`${styles.planNote} mt-3`}>
              Your answers are saved in this browser as you go, so you can come
              back to finish.
            </p>
          </form>
        )}
      </main>

      <footer />
    </div>
  );
}
