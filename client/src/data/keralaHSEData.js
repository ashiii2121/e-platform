// Kerala HSE Subjects and Exam Papers Data
export const keralaHSESubjects = {
  class10: {
    name: "Class 10 (SSLC)",
    subjects: [
      {
        id: "math-10",
        name: "Mathematics",
        code: "MATH",
        icon: "📊",
        description: "Algebra, Geometry, Trigonometry, Statistics"
      },
      {
        id: "science-10",
        name: "Science",
        code: "SCI",
        icon: "🔬",
        description: "Physics, Chemistry, Biology"
      },
      {
        id: "social-10",
        name: "Social Science",
        code: "SOC",
        icon: "🌍",
        description: "History, Geography, Civics, Economics"
      },
      {
        id: "english-10",
        name: "English",
        code: "ENG",
        icon: "📚",
        description: "Literature, Grammar, Composition"
      },
      {
        id: "malayalam-10",
        name: "Malayalam",
        code: "MAL",
        icon: "📖",
        description: "Literature, Grammar, Composition"
      },
      {
        id: "hindi-10",
        name: "Hindi",
        code: "HIN",
        icon: "📝",
        description: "Literature, Grammar, Composition"
      }
    ]
  },
  plus1: {
    name: "Plus One (Class 11)",
    subjects: [
      {
        id: "math-11",
        name: "Mathematics",
        code: "MATH",
        icon: "📊",
        description: "Sets, Functions, Trigonometry, Sequences"
      },
      {
        id: "physics-11",
        name: "Physics",
        code: "PHY",
        icon: "⚛️",
        description: "Mechanics, Thermodynamics, Waves"
      },
      {
        id: "chemistry-11",
        name: "Chemistry",
        code: "CHE",
        icon: "🧪",
        description: "Atomic Structure, Chemical Bonding, States of Matter"
      },
      {
        id: "biology-11",
        name: "Biology",
        code: "BIO",
        icon: "🧬",
        description: "Cell Biology, Plant Kingdom, Human Physiology"
      },
      {
        id: "computer-11",
        name: "Computer Science",
        code: "CS",
        icon: "💻",
        description: "Programming, Data Structures, Computer Systems"
      },
      {
        id: "english-11",
        name: "English",
        code: "ENG",
        icon: "📚",
        description: "Literature, Grammar, Composition"
      },
      {
        id: "malayalam-11",
        name: "Malayalam",
        code: "MAL",
        icon: "📖",
        description: "Literature, Grammar, Composition"
      },
      {
        id: "economics-11",
        name: "Economics",
        code: "ECO",
        icon: "💰",
        description: "Microeconomics, Statistics for Economics"
      },
      {
        id: "accountancy-11",
        name: "Accountancy",
        code: "ACC",
        icon: "📊",
        description: "Financial Accounting, Partnership Accounts"
      },
      {
        id: "business-11",
        name: "Business Studies",
        code: "BS",
        icon: "🏢",
        description: "Business Environment, Planning, Organizing"
      }
    ]
  },
  plus2: {
    name: "Plus Two (Class 12)",
    subjects: [
      {
        id: "math-12",
        name: "Mathematics",
        code: "MATH",
        icon: "📊",
        description: "Calculus, Vectors, Probability, Linear Programming"
      },
      {
        id: "physics-12",
        name: "Physics",
        code: "PHY",
        icon: "⚛️",
        description: "Electrostatics, Current Electricity, Magnetism, Optics"
      },
      {
        id: "chemistry-12",
        name: "Chemistry",
        code: "CHE",
        icon: "🧪",
        description: "Electrochemistry, Chemical Kinetics, Coordination Compounds"
      },
      {
        id: "biology-12",
        name: "Biology",
        code: "BIO",
        icon: "🧬",
        description: "Reproduction, Genetics, Evolution, Ecology"
      },
      {
        id: "computer-12",
        name: "Computer Science",
        code: "CS",
        icon: "💻",
        description: "Object Oriented Programming, Data Structures, Database"
      },
      {
        id: "english-12",
        name: "English",
        code: "ENG",
        icon: "📚",
        description: "Literature, Grammar, Composition"
      },
      {
        id: "malayalam-12",
        name: "Malayalam",
        code: "MAL",
        icon: "📖",
        description: "Literature, Grammar, Composition"
      },
      {
        id: "economics-12",
        name: "Economics",
        code: "ECO",
        icon: "💰",
        description: "Macroeconomics, Money and Banking"
      },
      {
        id: "accountancy-12",
        name: "Accountancy",
        code: "ACC",
        icon: "📊",
        description: "Company Accounts, Analysis of Financial Statements"
      },
      {
        id: "business-12",
        name: "Business Studies",
        code: "BS",
        icon: "🏢",
        description: "Management, Marketing, Consumer Protection"
      }
    ]
  }
};

// Generate exam papers data for years 2000-2025
export const generateExamPapers = (subjectId, subjectName, className) => {
  const papers = [];
  const currentYear = 2025;
  
  for (let year = 2000; year <= currentYear; year++) {
    papers.push({
      id: `${subjectId}-${year}`,
      title: `${subjectName} Board Exam ${year}`,
      subject: subjectName,
      class: className,
      year: year.toString(),
      month: "March",
      type: "Board Exam",
      pdfUrl: `#`, // Placeholder - will be replaced with actual URLs
      downloadUrl: `https://dhsekerala.gov.in/papers/${subjectId}/${year}.pdf`,
      fileSize: "2.5 MB",
      pages: Math.floor(Math.random() * 10) + 8, // Random pages between 8-18
      difficulty: year >= 2020 ? "Medium" : year >= 2010 ? "Easy" : "Hard",
      topics: getTopicsForSubject(subjectId),
      isAvailable: year >= 2015 // Only papers from 2015 onwards are "available"
    });
  }
  
  return papers.reverse(); // Latest first
};

const getTopicsForSubject = (subjectId) => {
  const topicsMap = {
    "math-10": ["Algebra", "Geometry", "Trigonometry", "Statistics"],
    "math-11": ["Sets", "Functions", "Trigonometry", "Sequences"],
    "math-12": ["Calculus", "Vectors", "Probability", "Linear Programming"],
    "physics-11": ["Mechanics", "Thermodynamics", "Waves"],
    "physics-12": ["Electrostatics", "Magnetism", "Optics", "Modern Physics"],
    "chemistry-11": ["Atomic Structure", "Chemical Bonding", "States of Matter"],
    "chemistry-12": ["Electrochemistry", "Chemical Kinetics", "Coordination Compounds"],
    "biology-11": ["Cell Biology", "Plant Kingdom", "Human Physiology"],
    "biology-12": ["Reproduction", "Genetics", "Evolution", "Ecology"],
    "english-10": ["Literature", "Grammar", "Composition", "Reading Comprehension"],
    "english-11": ["Literature", "Grammar", "Composition", "Reading Comprehension"],
    "english-12": ["Literature", "Grammar", "Composition", "Reading Comprehension"]
  };
  
  return topicsMap[subjectId] || ["General Topics"];
};

// Sample official sources for Kerala HSE papers
export const officialSources = [
  {
    name: "Kerala HSE Portal",
    url: "https://dhsekerala.gov.in",
    description: "Official Kerala Directorate of Higher Secondary Education"
  },
  {
    name: "Education Observer",
    url: "https://educationobserver.com",
    description: "Comprehensive collection of Kerala HSE papers"
  },
  {
    name: "HSS Live",
    url: "https://hsslive.in",
    description: "Kerala Higher Secondary education portal"
  },
  {
    name: "HSS Reporter",
    url: "https://hssreporter.com",
    description: "Kerala HSE news and previous papers"
  }
];
