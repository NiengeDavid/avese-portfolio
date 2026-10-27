import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCalendarDays,
  faUser,
  faGlobe,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { courses, getCourse } from "../../../config/courses";
import CourseTopBar from "../../../components/course/CourseTopBar";
import PurchaseCard from "../../../components/course/PurchaseCard";
import styles from "../../../styles/course.module.scss";
import { Footer } from "../../../components/Footer";

const includeIcons = {
  clock: faClock,
  calendar: faCalendarDays,
  user: faUser,
  globe: faGlobe,
};
const socialIcons = {
  twitter: faTwitter,
  linkedin: faLinkedinIn,
  instagram: faInstagram,
};

export default function CoursePage({ course }) {
  return (
    <div className={styles.page}>
      <Head>
        <title>{`${course.title} | Avese Tokula`}</title>
        <meta name="description" content={course.subtitle} />
        <meta property="og:title" content={course.title} />
        <meta property="og:description" content={course.subtitle} />
        <meta property="og:image" content={course.image} />
      </Head>

      <CourseTopBar backHref="/" backLabel="Back to home" />

      <main className="container pb-5">
        <section className={styles.heroBanner}>
          <h1 className={styles.heroTitle}>{course.title}</h1>
          <p className={styles.heroSub}>{course.subtitle}</p>
          <a href="#enrol" className="btn btn-primary">
            Enrol now
          </a>
        </section>

        <div className="row g-4">
          <div className="col-lg-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={course.image} alt="" className={styles.heroImage} />

            <h2 className={styles.sectionTitle}>Overview</h2>
            {course.overview.map((p) => (
              <p key={p.slice(0, 24)} className={styles.bodyText}>
                {p}
              </p>
            ))}

            <h2 className={styles.sectionTitle}>What you&rsquo;ll learn</h2>
            <ul className={styles.checkList}>
              {course.learn.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2 className={styles.sectionTitle}>How the programme works</h2>
            <ul className={styles.checkList}>
              {course.howItWorks.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <h2 className={styles.sectionTitle}>Curriculum</h2>
            {course.curriculum.map((chapter) => (
              <section key={chapter.title} className={styles.chapter}>
                <h3 className={styles.chapterTitle}>{chapter.title}</h3>
                <p className={styles.chapterMeta}>
                  {chapter.lessons.length} sessions. {chapter.focus}
                </p>
                <ul className="list-unstyled mb-0 d-grid gap-2">
                  {chapter.lessons.map((lesson) => (
                    <li key={lesson.week} className={styles.lesson}>
                      <span>
                        {lesson.title}
                        <small className={styles.lessonFocus}>
                          {lesson.focus}
                        </small>
                      </span>
                      <span className={styles.lessonWeek}>{lesson.week}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <aside className="col-lg-4">
            <div className={styles.card}>
              <h2 className={styles.cardTitle}>Course includes</h2>
              {course.includes.map((item) => (
                <div key={item.label} className={styles.includeRow}>
                  <span className={styles.includeLabel}>
                    <FontAwesomeIcon
                      icon={includeIcons[item.icon]}
                      className={styles.includeIcon}
                    />
                    {item.label}
                  </span>
                  <span>{item.value}</span>
                </div>
              ))}
            </div>

            <div className={styles.card}>
              <div className={styles.teacher}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={course.teacher.photo}
                  alt=""
                  className={styles.avatar}
                />
                <div>
                  <p className={styles.teacherName}>{course.teacher.name}</p>
                  <p className={styles.teacherRole}>{course.teacher.role}</p>
                  <div className={styles.socials}>
                    {course.teacher.socials.map((s) => (
                      <a
                        key={s.type}
                        href={s.href}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={s.type}
                      >
                        <FontAwesomeIcon icon={socialIcons[s.type]} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <p className={styles.teacherBio}>{course.teacher.bio}</p>
            </div>

            <PurchaseCard course={course} />
          </aside>

          <Footer />
        </div>
      </main>
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
