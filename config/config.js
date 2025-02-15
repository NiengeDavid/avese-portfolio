import profile from "./profile.JPG";
import { faWhatsapp, faCcVisa } from "@fortawesome/free-brands-svg-icons";
import {} from "@fortawesome/free-solid-svg-icons";
//import portfolioDoc from "/aveseportfolio.pdf"

export const navigation = {
  name: "Avese",
  links: [
    {
      title: "About",
      link: "#about",
    },
    {
      title: "Courses",
      link: "#projects",
    },
    {
      title: "Contact",
      link: "#contact",
    },
    {
      title: "Links",
      link: "/links",
    },
    {
      title: "LearnMath",
      link: "/learnmath",
    },
  ],
};
export const intro = {
  title: "Hey, I'm Avese!",
  description:
    "Raising fearless, godly leaders of tomorrow who for the love of their society want to impact it for the better.",
  image: profile.src,
  buttons: [
    {
      title: "Contact Me",
      link: "#contact",
      isPrimary: true,
    },
    {
      title: "Resume",
      link: "/aveseportfolioresume.pdf",
      isPrimary: false,
    },
  ],
};

export const about = {
  title: "Who I am",
  description: [
    "Hello! I'm Nguavese J. Tokula, CEO of Wellspring Educational Foundation. As a certified management consultant, educator, and Maxwell Leadership Coach, I'm passionate about transforming education and empowering leaders. With a background in Computer Science and Educational Administration, I've developed innovative systems and curricula that drive growth and impact. I'm dedicated to raising fearless, godly leaders and committed to continuous personal development. Let's connect!",
  ],
};

export const work = {
  title: "Work History",
  cards: [
    {
      title: "Leadership/Personal Development Coach",
      description:
        "Speaking, training, coaching, facilitating and mentoring teachers, teens, and entreprenuers for peak performance.",
      icons: null,
      scope: ["Self", "Abuja, FCT, Nigeria", "07.2018 - Current"],
    },
    {
      title: "C.E.O Wellspring International Learning Center",
      description:
        "Cultivated forward-thinking, inclusive, and performance-oriented business culture to lead industry in innovation and push progress.",
      icons: null,
      scope: [
        "Christ Family Ministry, Nigeria",
        "Abuja, FCT, Nigeria",
        "03.2018 - Current",
      ],
    },
    {
      title: "Director of Churches - Christ Family Ministry",
      description:
        "Overseeing six(6) branches, planning and executing programs, organizing teams, data analysis and reporting to General Overseer of Christ Family Ministries.",
      icons: null,
      scope: [
        "Christ Family Ministry",
        "Abuja, FCT, Nigeria",
        "01.2018 - Current",
      ],
    },
    {
      title: "C.E.O Wellspring Educational Foundation",
      description:
        "Developed Key operational initiatives to drive and maintain sustantial business growth. Built productive relationships with industry partners and competitors to support strategic business objectives.",
      icons: null,
      scope: ["Self", "Abuja, FCT, Nigeria", "03.2012 - Current"],
    },
    {
      title: "Rector - Christian Leadership Academy",
      description:
        "Improved overall student engagement by incorporating relevant real-world examples and multimedia into lectures. Complied with regulatory safety requirements and regulatory environmental requirements",
      icons: null,
      scope: [
        "Christian Leadership Academy",
        "Abuja, FCT, Nigeria",
        "05.2025 - 07.2024",
      ],
    },
    {
      title: "Proprietress at Wellspring International",
      description:
        "Curriculum planning, student/teacher progress monitoring, Researching/upgrading of Educational content with other administrative duties at Wellspring, Student/Staff recruitment.",
      icons: null,
      scope: [
        "Christ Family Ministry",
        "Gboko, Benue State",
        "03.2012 - 07.2021",
      ],
    },
  ],
};

export const education = {
  title: "Education",
  cards: [
    {
      title: "Master of Education - Educational Planning And Administration",
      description: null,
      icons: null,
      scope: [
        "National Open University of Nigeria",
        "Makurdi, Benue State",
        "01.2023",
      ],
    },
    {
      title: "Post Graduate Diploma - Education",
      description: null,
      icons: null,
      scope: [
        "National Open University of Nigeria",
        "Makurdi, Benue State",
        "05.2016",
      ],
    },
    {
      title: "Bachelor of Science - Computer Science",
      description: null,
      icons: null,
      scope: ["University of Jos", "Jos, Plateau State, Nigeria", "05.2006"],
    },
  ],
};

export const skills = {
  title: "Skills",
  skills: [
    "Personal development",
    "Motivation strategies",
    "Task delegation",
    "Goals and performance",
    "Staff management",
    "Business development and planning",
    "Teamwork and collaboration",
    "Problem-solving",
    "Time management",
    "Excellent communication",
  ],
};

export const projects = {
  title: "Courses",
  cards: [
    {
      title: "LearnMath",
      description:
        "Unlock Your Math Potential: Bridge the Gaps and Accelerate Your Success.",
      icons: [
        {
          icon: faCcVisa,
          link: "/learnmath",
        },
        {
          icon: faWhatsapp,
          link: process.env.WhatsappApi || "",
        },
      ],
      scope: null,
    },
    {
      title: "Time Management",
      description:
        "A 2weeks productivity journey that will leave your life planned and productive throughout the month/year.",
      icons: [
        {
          icon: faCcVisa,
          link: "https://selar.co/h7b1",
        },
        {
          icon: faWhatsapp,
          link: process.env.WhatsappApi || "",
        },
      ],
      scope: null,
    },
    {
      title: "Personal Growth",
      description:
        "A 4weeks Mentorship Programme that will take you from dreaming it to actually doing it.",
      icons: [
        {
          icon: faCcVisa,
          link: "https://selar.co/h7b1",
        },
        {
          icon: faWhatsapp,
          link: process.env.WhatsappApi || "",
        },
      ],
      scope: null,
    },
    {
      title: "Goal Setting",
      description:
        "Move from doing everything every time and feeling overwhelmed to doing the right things at the right times.",
      icons: [
        {
          icon: faCcVisa,
          link: "https://selar.co/h7b1",
        },
        {
          icon: faWhatsapp,
          link: process.env.WhatsappApi || "",
        },
      ],
      scope: null,
    },
  ],
};

export const contact = {
  title: "Get in touch",
  description:
    "Coffee Chat! Please do not hesitate to push a DM on WhatsApp. Alternatively, feel free to reach out directly by email at Nguavese@gmail.com.",
  buttons: [
    {
      title: "Email Me",
      link: "mailto:Nguavese@gmail.com",
      isPrimary: true,
    },
    {
      title: "DM on WhatsApp",
      link: process.env.WhatsappApi || "",
      isPrimary: false,
    },
  ],
};

// SEARCH ENGINE
export const SEO = {
  // 50 - 60 char
  title: "Avese Tokula | Personal dev coach | Educator | Leader",
  description:
    "I Raise fearless, godly leaders of tomorrow who for the love of their society want to impact it for the better.",
  image: profile.src,
};

export const links = {
  image: profile.src,
  title: "@avesetokula",
  description: "Avese Tokula | Personal dev coach | Educator | Leader",
  cards: [
    {
      title: "My website",
      link: "https://nguavesetokula.com/",
    },
    {
      title: "LinkedIn",
      link: "https://www.linkedin.com/in/avesetokula/",
    },
    {
      title: "Facebook",
      link: "https://www.facebook.com/share/1Arp5t5Q1c/?mibextid=LQQJ4d",
    },
    {
      title: "Instagram",
      link: "https://www.instagram.com/nguavesetokula?igsh=MnpxMnpsbTRuMTV3",
    },
    {
      title: "X/Twitter",
      link: "https://x.com/nguavesetokula?s=21",
    },
  ],
};

export const learnMath = {
  title: "LearnMath",
  bullet:
    "Unlock Your Math Potential: Bridge the Gaps and Accelerate Your Success",
  description:
    "Did you struggle with math in the past? Do you wish you could go back and fill in the knowledge gaps that have held you back?",
  cta: "Now's your chance! Our personalized math course is designed to help you:",
  curriculum: [
    {
      title: "Identify and bridge knowledge gaps",
      desc: "Take our comprehensive diagnostic test to pinpoint areas where you need improvement.",
    },
    {
      title: "Create a tailored learning plan",
      desc: "Receive a customized curriculum that addresses your specific needs and goals.",
    },
    {
      title: "Accelerate your math understanding",
      desc: "Build confidence and mastery of key skills, from foundational concepts to advanced techniques.",
    },
  ],
  call: "Join our course and discover a more effective, efficient, and enjoyable way to learn math. Take control of your math education and unlock your full potential!",
  plans: [
    // {
    //   title: "one-time registration",
    //   amount: 100,
    //   duration: "one-time",
    // },
    {
      title: "Monthly subscription",
      amount: 70,
      duration: "per month",
      months: 1,
    },
    {
      title: "6months subscription",
      amount: 50,
      duration: "per month for 6months",
      months: 6,
    },
    {
      title: "Yearly subscription",
      amount: 30,
      duration: "per month for 10months",
      months: 12,
    },
  ],
  rates: 1680,
};
