// Intake questionnaire content. Question ids (q1..q29, p1..p3) are the keys used by the form and the Google Sheet.

export const sections = [
  {
    id: "A",
    title: "About you & your expectations",
    questions: [
      {
        id: "q1",
        number: 1,
        text: "What would you like me to know about you, your background and your current season of life?",
      },
      {
        id: "q2",
        number: 2,
        text: "What prompted you to seek personal coaching and mentoring at this time?",
      },
      {
        id: "q3",
        number: 3,
        text: "What are the three most important outcomes you hope to achieve over these three months?",
      },
      {
        id: "q4",
        number: 4,
        text: "At the end of the programme, what would make you say, “This was truly worthwhile”?",
      },
      {
        id: "q5",
        number: 5,
        text: "What coaching or mentoring style helps you most (e.g., reflective questions, direct feedback, practical assignments, accountability)?",
      },
    ],
    intro:
      "This questionnaire helps me understand your current situation, what matters most to you and what you hope to gain from our time together. Answer as honestly and specifically as you can. There are no right or wrong answers.",
  },
  {
    id: "B",
    title: "Personal growth & development (Month 1)",
    questions: [
      {
        id: "q6",
        number: 6,
        text: "How would you assess your current level of satisfaction in the following areas: personal growth, health/well-being, relationships, work/business, finances, purpose and contribution?",
      },
      {
        id: "q7",
        number: 7,
        text: "What do you consider your greatest strengths? Which strengths would you like to develop further?",
      },
      {
        id: "q8",
        number: 8,
        text: "What habits, mindsets, fears or recurring challenges may be holding you back?",
      },
      {
        id: "q9",
        number: 9,
        text: "Which areas of your personal life or effectiveness most need attention right now?",
      },
      {
        id: "q10",
        number: 10,
        text: "What values or principles do you want to guide your decisions and the way you live?",
      },
      {
        id: "q11",
        number: 11,
        text: "Have you previously created a personal development plan? If yes, what worked and what did not?",
      },
    ],
  },
  {
    id: "C",
    title: "Goals, time management & five-year plan (Month 2)",
    questions: [
      {
        id: "q12",
        number: 12,
        text: "What are your most important short-term goals for the next 3–12 months?",
      },
      {
        id: "q13",
        number: 13,
        text: "Where would you like to be in five years personally, professionally and financially?",
      },
      {
        id: "q14",
        number: 14,
        text: "What currently takes up most of your time? What activities deserve more or less of your attention?",
      },
      {
        id: "q15",
        number: 15,
        text: "What makes it difficult for you to set goals, stay focused or follow through?",
      },
      {
        id: "q16",
        number: 16,
        text: "Which routines, systems or skills would help you manage your time and responsibilities better?",
      },
      {
        id: "q17",
        number: 17,
        text: "What important goal have you delayed or left unfinished, and what has stood in the way?",
      },
    ],
  },
  {
    id: "D",
    title: "Business development & strategic planning (Month 3)",
    questions: [
      {
        id: "q18",
        number: 18,
        text: "Briefly describe your current business, professional role or business idea. What stage is it at?",
      },
      {
        id: "q19",
        number: 19,
        text: "What are the main products/services, customers or people you serve, and the value you provide?",
      },
      {
        id: "q20",
        number: 20,
        text: "What are your biggest business challenges or questions at present?",
      },
      {
        id: "q21",
        number: 21,
        text: "What growth opportunities would you most like to explore over the next 1–3 years?",
      },
      {
        id: "q22",
        number: 22,
        text: "Do you currently have written business goals or a strategic plan? If yes, what is working and what needs attention?",
      },
      {
        id: "q23",
        number: 23,
        text: "What resources, skills, relationships or support do you believe would help the business grow?",
      },
      {
        id: "q24",
        number: 24,
        text: "What specific business result would you most like to make progress towards during these three months?",
      },
    ],
  },
  {
    id: "E",
    title: "Readiness, accountability & practical arrangements",
    questions: [
      {
        id: "q25",
        number: 25,
        text: "On a scale of 1–10, how ready are you to make changes and consistently act on what we discuss? Why?",
      },
      {
        id: "q26",
        number: 26,
        text: "What might prevent you from attending sessions, completing assignments or making progress?",
      },
      {
        id: "q27",
        number: 27,
        text: "How would you like us to review progress and hold you accountable between sessions?",
      },
      {
        id: "q28",
        number: 28,
        text: "Is there anything you would prefer me to handle sensitively or understand before we begin?",
      },
      {
        id: "q29",
        number: 29,
        text: "Is there anything else you hope we will cover that has not been addressed in this questionnaire?",
      },
    ],
  },
  {
    id: "P",
    title: "Your top priorities",
    intro: "Please complete these three statements.",
    questions: [
      {
        id: "p1",
        text: "The most important change I want to make is…",
      },
      {
        id: "p2",
        text: "The biggest challenge I need help thinking through is…",
      },
      {
        id: "p3",
        text: "The first sign that I am making meaningful progress will be…",
      },
    ],
  },
];

export const allQuestions = sections.flatMap((s) => s.questions);

export const MAX_ANSWER_LENGTH = 4000;
