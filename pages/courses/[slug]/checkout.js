import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  courses,
  getCourse,
  bankDetails,
  formatNaira,
} from "../../../config/courses";
import CourseTopBar from "../../../components/course/CourseTopBar";
import CopyButton from "../../../components/course/CopyButton";
import SuccessCard from "../../../components/course/SuccessCard";
import { Footer } from "../../../components/Footer";
import styles from "../../../styles/course.module.scss";

const ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // 32 chars, no I/O/0/1

function makeRef() {
  const bytes = new Uint8Array(6);
  window.crypto.getRandomValues(bytes);
  return "AVS-" + Array.from(bytes, (b) => ALPHABET[b % 32]).join("");
}

function CopyRow({ label, value, className = "" }) {
  return (
    <div className={`${styles.copyRow} ${className}`}>
      <div>
        <span className={styles.copyLabel}>{label}</span>
        <span className={styles.copyValue}>{value}</span>
      </div>
      <CopyButton value={value} />
    </div>
  );
}

export default function CheckoutPage({ course }) {
  const router = useRouter();
  const plan = router.isReady
    ? course.packages.find((p) => p.id === router.query.plan)
    : null;

  const [ref, setRef] = useState("");
  const [form, setForm] = useState({
    firstName: "",
    surname: "",
    email: "",
    phone: "",
    website: "",
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | done
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);

  // Keep the same code across refreshes of this tab so the transfer remark stays valid.
  useEffect(() => {
    try {
      let stored = sessionStorage.getItem("avs-ref");
      if (!stored) {
        stored = makeRef();
        sessionStorage.setItem("avs-ref", stored);
      }
      setRef(stored);
    } catch (e) {
      setRef(makeRef());
    }
  }, []);

  // Unknown or missing plan in the URL: send people back to pick one.
  useEffect(() => {
    if (router.isReady && !plan)
      router.replace(`/courses/${course.slug}#enrol`);
  }, [router, plan, course.slug]);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!plan || !ref) return;
    setStatus("submitting");
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          ref,
          plan: plan.id,
          courseSlug: course.slug,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok)
        throw new Error(
          data.error || "Something went wrong. Please try again.",
        );
      try {
        sessionStorage.setItem(
          "avs-checkout",
          JSON.stringify({ ref, email: form.email.trim() }),
        );
      } catch (err) {
        /* private mode: the questionnaire link still carries the ref */
      }
      setResult({ emailSent: data.emailSent !== false });
      setStatus("done");
      window.scrollTo({ top: 0 });
    } catch (err) {
      setError(err.message);
      setStatus("idle");
    }
  };

  const title = `Checkout | ${course.title}`;

  if (status === "done") {
    return (
      <div className={styles.page}>
        <Head>
          <title>{title}</title>
        </Head>
        <CourseTopBar />
        <main className="container">
          <SuccessCard title="Payment details received" confetti>
            <p className={styles.bodyText}>
              {result.emailSent
                ? `Thank you, ${form.firstName.trim()}. We've sent a confirmation email to ${form.email.trim()}.`
                : `Thank you, ${form.firstName.trim()}. Your details are saved, but we couldn't send the confirmation email. Keep your reference below.`}
            </p>
            <p className={styles.bodyText}>
              We&rsquo;ll confirm your payment once the transfer reflects in our
              account. Your reference is <strong>{ref}</strong>.
            </p>
            <Link href={`/intake-questionnaire?ref=${encodeURIComponent(ref)}`}>
              <a className="btn btn-primary">Take Intake Questionnaire</a>
            </Link>
          </SuccessCard>
        </main>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Head>
        <title>{title}</title>
      </Head>
      <CourseTopBar
        backHref={`/courses/${course.slug}`}
        backLabel="Back to course"
      />

      <main className="container pb-5">
        <section className={styles.heroBanner}>
          <h1 className={styles.heroTitle}>Checkout</h1>
          <p className={styles.heroSub}>
            {course.title}
            {plan ? `: ${plan.label}, ${formatNaira(plan.amount)}` : ""}
          </p>
        </section>

        <div className="row g-4">
          <div className="col-lg-6 order-2 order-lg-1">
            <form
              className={styles.card}
              onSubmit={onSubmit}
              noValidate={false}
            >
              <h2 className={styles.cardTitle}>Your details</h2>

              <div className="row g-3">
                <div className="col-sm-6">
                  <label htmlFor="firstName" className="form-label">
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    className="form-control"
                    required
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={onChange}
                    maxLength={120}
                  />
                </div>
                <div className="col-sm-6">
                  <label htmlFor="surname" className="form-label">
                    Surname
                  </label>
                  <input
                    id="surname"
                    name="surname"
                    className="form-control"
                    required
                    autoComplete="family-name"
                    value={form.surname}
                    onChange={onChange}
                    maxLength={120}
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="form-control"
                    required
                    autoComplete="email"
                    value={form.email}
                    onChange={onChange}
                    maxLength={200}
                  />
                </div>
                <div className="col-12">
                  <label htmlFor="phone" className="form-label">
                    Phone number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    className="form-control"
                    required
                    autoComplete="tel"
                    value={form.phone}
                    onChange={onChange}
                    maxLength={30}
                  />
                </div>
              </div>

              {/* Honeypot: hidden from people, tempting to bots */}
              <div className={styles.honeypot} aria-hidden="true">
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={form.website}
                  onChange={onChange}
                />
              </div>

              {error && (
                <div className="alert alert-danger mt-3 mb-0" role="alert">
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary w-100 mt-4"
                disabled={status === "submitting" || !plan || !ref}
              >
                {status === "submitting"
                  ? "Submitting..."
                  : "I have made payment"}
              </button>
              <p className={`${styles.planNote} mt-2 mb-0`}>
                Only submit after you&rsquo;ve completed the transfer.
              </p>
            </form>
          </div>

          <div className="col-lg-6 order-1 order-lg-2">
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Make your transfer</h2>
              <CopyRow label="Bank" value={bankDetails.bankName} />
              <CopyRow label="Account name" value={bankDetails.accountName} />
              <CopyRow
                label="Account number"
                value={bankDetails.accountNumber}
              />
              {plan && (
                <CopyRow label="Amount" value={plan.amount.toFixed(2)} />
              )}
              <CopyRow
                label="Payment remark (required)"
                value={ref || "Generating..."}
                className={styles.refRow}
              />
              <p className={`${styles.planNote} mb-0`}>
                Enter this code as part ofthe remark or narration on your
                transfer so we can match your payment.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticPaths() {
  return {
    paths: courses.map((c) => ({ params: { slug: c.slug } })),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const course = getCourse(params.slug);
  if (!course) return { notFound: true };
  return { props: { course } };
}
