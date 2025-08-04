const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Subject = require('../models/Subject');
const ExamPaper = require('../models/ExamPaper');

dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Kerala HSE Subjects Data
const keralaHSESubjects = [
  // Class 10 (SSLC)
  {
    id: "math-10",
    name: "Mathematics",
    code: "MATH",
    icon: "📊",
    description: "Algebra, Geometry, Trigonometry, Statistics",
    class: "class10",
    className: "Class 10 (SSLC)"
  },
  {
    id: "science-10",
    name: "Science",
    code: "SCI",
    icon: "🔬",
    description: "Physics, Chemistry, Biology",
    class: "class10",
    className: "Class 10 (SSLC)"
  },
  {
    id: "social-10",
    name: "Social Science",
    code: "SOC",
    icon: "🌍",
    description: "History, Geography, Civics, Economics",
    class: "class10",
    className: "Class 10 (SSLC)"
  },
  {
    id: "english-10",
    name: "English",
    code: "ENG",
    icon: "📚",
    description: "Literature, Grammar, Composition",
    class: "class10",
    className: "Class 10 (SSLC)"
  },
  {
    id: "malayalam-10",
    name: "Malayalam",
    code: "MAL",
    icon: "📖",
    description: "Literature, Grammar, Composition",
    class: "class10",
    className: "Class 10 (SSLC)"
  },
  {
    id: "hindi-10",
    name: "Hindi",
    code: "HIN",
    icon: "📝",
    description: "Literature, Grammar, Composition",
    class: "class10",
    className: "Class 10 (SSLC)"
  },

  // Plus One (Class 11)
  {
    id: "math-11",
    name: "Mathematics",
    code: "MATH",
    icon: "📊",
    description: "Sets, Functions, Trigonometry, Sequences",
    class: "plus1",
    className: "Plus One (Class 11)"
  },
  {
    id: "physics-11",
    name: "Physics",
    code: "PHY",
    icon: "⚛️",
    description: "Mechanics, Thermodynamics, Waves",
    class: "plus1",
    className: "Plus One (Class 11)"
  },
  {
    id: "chemistry-11",
    name: "Chemistry",
    code: "CHE",
    icon: "🧪",
    description: "Atomic Structure, Chemical Bonding, States of Matter",
    class: "plus1",
    className: "Plus One (Class 11)"
  },
  {
    id: "biology-11",
    name: "Biology",
    code: "BIO",
    icon: "🧬",
    description: "Cell Biology, Plant Kingdom, Human Physiology",
    class: "plus1",
    className: "Plus One (Class 11)"
  },
  {
    id: "computer-11",
    name: "Computer Science",
    code: "CS",
    icon: "💻",
    description: "Programming, Data Structures, Computer Systems",
    class: "plus1",
    className: "Plus One (Class 11)"
  },
  {
    id: "english-11",
    name: "English",
    code: "ENG",
    icon: "📚",
    description: "Literature, Grammar, Composition",
    class: "plus1",
    className: "Plus One (Class 11)"
  },
  {
    id: "malayalam-11",
    name: "Malayalam",
    code: "MAL",
    icon: "📖",
    description: "Literature, Grammar, Composition",
    class: "plus1",
    className: "Plus One (Class 11)"
  },
  {
    id: "economics-11",
    name: "Economics",
    code: "ECO",
    icon: "💰",
    description: "Microeconomics, Statistics for Economics",
    class: "plus1",
    className: "Plus One (Class 11)"
  },
  {
    id: "accountancy-11",
    name: "Accountancy",
    code: "ACC",
    icon: "📊",
    description: "Financial Accounting, Partnership Accounts",
    class: "plus1",
    className: "Plus One (Class 11)"
  },
  {
    id: "business-11",
    name: "Business Studies",
    code: "BS",
    icon: "🏢",
    description: "Business Environment, Planning, Organizing",
    class: "plus1",
    className: "Plus One (Class 11)"
  },

  // Plus Two (Class 12)
  {
    id: "math-12",
    name: "Mathematics",
    code: "MATH",
    icon: "📊",
    description: "Calculus, Vectors, Probability, Linear Programming",
    class: "plus2",
    className: "Plus Two (Class 12)"
  },
  {
    id: "physics-12",
    name: "Physics",
    code: "PHY",
    icon: "⚛️",
    description: "Electrostatics, Current Electricity, Magnetism, Optics",
    class: "plus2",
    className: "Plus Two (Class 12)"
  },
  {
    id: "chemistry-12",
    name: "Chemistry",
    code: "CHE",
    icon: "🧪",
    description: "Electrochemistry, Chemical Kinetics, Coordination Compounds",
    class: "plus2",
    className: "Plus Two (Class 12)"
  },
  {
    id: "biology-12",
    name: "Biology",
    code: "BIO",
    icon: "🧬",
    description: "Reproduction, Genetics, Evolution, Ecology",
    class: "plus2",
    className: "Plus Two (Class 12)"
  },
  {
    id: "computer-12",
    name: "Computer Science",
    code: "CS",
    icon: "💻",
    description: "Object Oriented Programming, Data Structures, Database",
    class: "plus2",
    className: "Plus Two (Class 12)"
  },
  {
    id: "english-12",
    name: "English",
    code: "ENG",
    icon: "📚",
    description: "Literature, Grammar, Composition",
    class: "plus2",
    className: "Plus Two (Class 12)"
  },
  {
    id: "malayalam-12",
    name: "Malayalam",
    code: "MAL",
    icon: "📖",
    description: "Literature, Grammar, Composition",
    class: "plus2",
    className: "Plus Two (Class 12)"
  },
  {
    id: "economics-12",
    name: "Economics",
    code: "ECO",
    icon: "💰",
    description: "Macroeconomics, Money and Banking",
    class: "plus2",
    className: "Plus Two (Class 12)"
  },
  {
    id: "accountancy-12",
    name: "Accountancy",
    code: "ACC",
    icon: "📊",
    description: "Company Accounts, Analysis of Financial Statements",
    class: "plus2",
    className: "Plus Two (Class 12)"
  },
  {
    id: "business-12",
    name: "Business Studies",
    code: "BS",
    icon: "🏢",
    description: "Management, Marketing, Consumer Protection",
    class: "plus2",
    className: "Plus Two (Class 12)"
  }
];

// Function to generate exam papers for a subject
const generateExamPapers = (subject) => {
  const papers = [];
  const currentYear = 2025;
  
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
  
  for (let year = 2000; year <= currentYear; year++) {
    papers.push({
      id: `${subject.id}-${year}`,
      title: `${subject.name} Board Exam ${year}`,
      subject: subject.name,
      subjectId: subject.id,
      class: subject.className,
      year: year.toString(),
      month: "March",
      type: "Board Exam",
      pdfUrl: `https://dhsekerala.gov.in/papers/${subject.id}/${year}.pdf`,
      downloadUrl: `https://dhsekerala.gov.in/papers/${subject.id}/${year}.pdf`,
      fileSize: `${(Math.random() * 3 + 1.5).toFixed(1)} MB`,
      pages: Math.floor(Math.random() * 10) + 8,
      difficulty: year >= 2020 ? "Medium" : year >= 2010 ? "Easy" : "Hard",
      topics: topicsMap[subject.id] || ["General Topics"],
      isAvailable: year >= 2015,
      downloadCount: Math.floor(Math.random() * 1000),
      isVerified: year >= 2015,
      source: year >= 2015 ? "Kerala DHSE Portal" : "Education Observer"
    });
  }
  
  return papers;
};

// Seed function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');

    // Clear existing data
    await Subject.deleteMany({});
    await ExamPaper.deleteMany({});
    console.log('Cleared existing data');

    // Insert subjects
    await Subject.insertMany(keralaHSESubjects);
    console.log('Subjects seeded successfully');

    // Generate and insert exam papers
    const allPapers = [];
    keralaHSESubjects.forEach(subject => {
      const papers = generateExamPapers(subject);
      allPapers.push(...papers);
    });

    await ExamPaper.insertMany(allPapers);
    console.log(`${allPapers.length} exam papers seeded successfully`);

    console.log('Database seeding completed!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seeding if this file is executed directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase, keralaHSESubjects };
