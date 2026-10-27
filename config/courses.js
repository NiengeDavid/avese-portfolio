// Course content + bank details. Edit placeholders here; pages read from this file.

export const bankDetails = {
  bankName: "UNITED BANK OF AFRICA (UBA)", // TODO
  accountName: "TOKULA JENNIFER NGUAVESE", // TODO
  accountNumber: "2372104454", // TODO
};

export function formatNaira(amount) {
  return (
    "₦" +
    Number(amount)
      .toFixed(2)
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  );
}

export const courses = [
  {
    slug: "personal-growth-leadership-business-mentoring",
    title: "Personal Growth, Leadership & Business Mentoring",
    subtitle:
      "A three-month, one-to-one coaching and mentoring programme for intentional growth in personal effectiveness, goal achievement and business development.",
    image: "/demo.jpg",
    overview: [
      "This personalised three-month programme is designed to support intentional growth in personal effectiveness, goal achievement and business development. Through focused weekly conversations, practical exercises and agreed action steps, you will gain greater clarity about where you are now, where you want to go and the steps required to make meaningful progress.",
      "The programme combines coaching, mentoring, reflection and practical planning. Sessions are tailored to your priorities and circumstances, while keeping a clear structure and measurable actions between sessions.",
    ],
    learn: [
      "Greater self-awareness and clarity about your values, strengths, growth areas and priorities",
      "A practical Individual Development Plan (IDP) with specific actions and review points",
      "Meaningful goals, plus stronger time management, focus, discipline and follow-through",
      "A clear five-year personal and professional vision with a realistic action roadmap",
      "Clarity on business opportunities, priorities and strategic direction",
      "An actionable business development and strategic plan with key next steps",
    ],
    howItWorks: [
      "One private session every Thursday for 12 weeks. Session length and start date are agreed before you begin.",
      "Each session includes a check-in, a focused discussion or coaching exercise, practical planning and agreed action steps.",
      "You complete reflection exercises and action items between sessions.",
      "Progress is reviewed regularly, and the programme can be adapted to your most important needs while keeping the three-month structure.",
    ],
    includes: [
      { icon: "clock", label: "Duration", value: "3 months" },
      { icon: "calendar", label: "Sessions", value: "12 weekly sessions" },
      { icon: "calendar", label: "Schedule", value: "Every Thursday" },
      { icon: "user", label: "Format", value: "One-to-one" },
      { icon: "globe", label: "Language", value: "English" },
    ],
    teacher: {
      name: "Avese Tokula", // TODO confirm
      role: "Coach & Mentor", // TODO
      photo: "/profile.JPG",
      bio: "Raising fearless, godly leaders of tomorrow who for the love of their society want to impact it for the better.",
      socials: [
        { type: "twitter", href: "https://x.com/nguavesetokula" },
        { type: "linkedin", href: "https://www.linkedin.com/in/avesetokula" },
        { type: "instagram", href: "https://www.instagram.com/nguavesetokula" },
      ],
    },
    packages: [
      {
        id: "monthly",
        label: "Monthly package",
        note: "Pay monthly",
        amount: 1000000,
      },
      {
        id: "full",
        label: "Full package",
        note: "Special family rate, all 12 sessions",
        amount: 1500000,
      },
    ],
    curriculum: [
      {
        title: "Month 1: Personal Growth & Individual Development",
        focus:
          "Self-awareness, personal effectiveness and a clear development pathway.",
        lessons: [
          {
            week: "Week 1",
            title: "Starting Point & Personal Audit",
            focus:
              "Review current circumstances, aspirations, strengths, challenges and key life priorities.",
          },
          {
            week: "Week 2",
            title: "Self-Awareness, Values & Mindset",
            focus:
              "Explore values, beliefs, habits, strengths and areas requiring growth.",
          },
          {
            week: "Week 3",
            title: "Personal Growth & Development",
            focus:
              "Identify development needs across life, work, relationships and leadership.",
          },
          {
            week: "Week 4",
            title: "Individual Development Plan (IDP)",
            focus:
              "Build a practical plan with priorities, actions, timelines and measures of progress.",
          },
        ],
      },
      {
        title: "Month 2: Goal Setting, Time Management & Five-Year Planning",
        focus:
          "Turning aspirations into priorities, routines and a realistic longer-term plan.",
        lessons: [
          {
            week: "Week 5",
            title: "Vision, Priorities & Goal Setting",
            focus:
              "Translate key aspirations into clear, specific and achievable goals.",
          },
          {
            week: "Week 6",
            title: "Time Management & Personal Productivity",
            focus:
              "Review how time is used and develop a practical system for priorities, planning and focus.",
          },
          {
            week: "Week 7",
            title: "Habits, Execution & Accountability",
            focus:
              "Identify obstacles to consistency and establish routines and accountability practices.",
          },
          {
            week: "Week 8",
            title: "The Five-Year Plan",
            focus:
              "Create a five-year vision and map milestones across personal, professional and business priorities.",
          },
        ],
      },
      {
        title: "Month 3: Business Development & Strategic Planning",
        focus:
          "Business clarity, opportunity assessment and translating strategy into action.",
        lessons: [
          {
            week: "Week 9",
            title: "Business Review & Opportunity Mapping",
            focus:
              "Review the current business position, opportunities, challenges, customers and value proposition.",
          },
          {
            week: "Week 10",
            title: "Business Development & Growth",
            focus:
              "Identify priority growth opportunities, relationships, customers and practical actions.",
          },
          {
            week: "Week 11",
            title: "Strategic Planning",
            focus:
              "Define strategic objectives, priorities, resources, risks, measures and implementation steps.",
          },
          {
            week: "Week 12",
            title: "Integration, Review & Next-Step Roadmap",
            focus:
              "Review progress and finalise a practical 90-day action plan beyond the programme.",
          },
        ],
      },
    ],
  },
];

export const getCourse = (slug) => courses.find((c) => c.slug === slug);
