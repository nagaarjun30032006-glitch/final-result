export interface Department {
  id: string;
  name: string;
  slug: string;
  category: "Science" | "Arts & Humanities" | "Commerce & Management" | "Computing & IT";
  established: string;
  hod: string;
  degrees: string[];
  description: string;
  highlights: string[];
  labs?: string[];
}

export interface NewsItem {
  id: string;
  date: string;
  title: string;
  summary: string;
  category: "Recruitment" | "Admission" | "Academic" | "Examination" | "Sports";
  content?: string;
  link?: string;
  url?: string;
}

export interface EventItem {
  id: string;
  date: string;
  day: string;
  month: string;
  year: string;
  title: string;
  venue: string;
  time: string;
  description: string;
}

export interface Milestone {
  year: string;
  title: string;
  description?: string;
}

export interface Administrator {
  name: string;
  role: string;
  initials: string;
  qualifications: string;
  message?: string;
  quote?: string;
  image?: string;
  url?: string;
}

export const COLLEGE_INFO = {
  name: "J.J. College of Arts and Science (Autonomous)",
  shortName: "J.J. College",
  acronym: "JJC",
  tagline: "Affiliated to Bharathidasan University, Tiruchirappalli · NAAC Re-Accredited B++ (4th Cycle) · A Silver Jubilee Institution",
  established: "1994",
  autonomousSince: "2012",
  autonomousExtendedTo: "2028",
  naacGrade: "B++ (4th Cycle)",
  address: "J.J. Nagar, Sivapuram Post, Pudukkottai - 622 422, Tamil Nadu, India",
  phone: "+91 79041 51908",
  altPhone: "+91 4322 260103",
  email: "jjcollege.pdkt@gmail.com",
  webmail: "https://webmail.jjcoll.in",
  portalUrl: "https://admission.jjcoll.in",
  social: {
    youtube: "https://www.youtube.com/@jjcollegepdkt5384",
    instagram: "https://www.instagram.com/jjcollege_pdkt",
    facebook: "https://www.facebook.com/share/16ARqyH1aE/",
    whatsapp: "https://wa.me/917904151908",
  },
};

export const MILESTONES: Milestone[] = [
  {
    year: "1994",
    title: "Establishment of J.J. College",
    description: "Founded by Karpaga Vinayaga Educational Trust under visionary leadership to serve rural youth.",
  },
  {
    year: "2001",
    title: "UGC Recognition 2(f) & 12(B)",
    description: "Formally recognized under sections 2(f) & 12(B) of the University Grants Commission Act 1956.",
  },
  {
    year: "2012",
    title: "Autonomous Status Conferred",
    description: "Conferred Autonomous status by the UGC and Government of Tamil Nadu for curriculum governance.",
  },
  {
    year: "2019",
    title: "Silver Jubilee Celebration",
    description: "Celebrated 25 years of glorious service in higher education with NAAC re-accreditation.",
  },
  {
    year: "2023",
    title: "Autonomy Extended to 2028",
    description: "UGC granted autonomous status extension up to the academic year 2027–2028.",
  },
];

export const STATS = [
  { value: "17", label: "Academic Departments", suffix: "" },
  { value: "32+", label: "UG & PG Programmes", suffix: "" },
  { value: "14", label: "Ph.D. Research Centers", suffix: "" },
  { value: "4,500+", label: "Enrolled Students", suffix: "" },
  { value: "180+", label: "Qualified Faculty", suffix: "" },
  { value: "92%", label: "Placement Success", suffix: "" },
];

export const ADMINISTRATORS: Administrator[] = [
  {
    name: "Thiru. S. Ragupathy B.Sc., B.L.",
    role: "Founder & Chairman",
    initials: "SR",
    qualifications: "B.Sc., B.L. · Minister for Law, Courts and Prisons, Govt. of Tamil Nadu",
    message: "Our supreme ambition is to empower rural youth with value-based higher education, fostering self-reliance, intellectual vigor, and ethical uprightness.",
    quote: "Our supreme ambition is to empower rural youth with value-based higher education, fostering self-reliance and intellectual vigor.",
    url: "https://jjcoll.in/founder.php",
  },
  {
    name: "Mr. N. Subramanian B.Sc., LLB",
    role: "Secretary",
    initials: "NS",
    qualifications: "B.Sc., LLB · Educational Administrator",
    message: "We ensure state-of-the-art laboratory infrastructure, autonomous curriculum flexibility, and holistic training that equips our graduates for global careers.",
    quote: "We ensure state-of-the-art laboratory infrastructure and autonomous curriculum flexibility for global careers.",
    url: "https://jjcoll.in/secretary.php",
  },
  {
    name: "Dr. Kavitha Subramanian",
    role: "Trustee",
    initials: "KS",
    qualifications: "M.B.B.S., D.G.O. · Karpaga Vinayaga Educational Trust",
    message: "Promoting girl-child education, research orientation, and continuous campus community service through vibrant extension wings like NSS, YRC, and WEW.",
    quote: "Promoting girl-child education, research orientation, and continuous community service through active extension wings.",
    url: "https://jjcoll.in/trustee.php",
  },
  {
    name: "Dr. J. Parasuraman Ph.D.",
    role: "Principal",
    initials: "JP",
    qualifications: "M.Sc., M.Phil., Ph.D. · Principal & Academic Head",
    message: "Fostering academic rigor, research culture, Outcome Based Education (OBE), and holistic student personality transformation at J.J. College.",
    quote: "Fostering academic rigor, research culture, Outcome Based Education (OBE), and holistic student transformation.",
    url: "https://jjcoll.in/principal.php",
  },
];

export const DEPARTMENTS: Department[] = [
  {
    id: "biotech",
    name: "Biotechnology",
    slug: "biotechnology",
    category: "Science",
    established: "1999",
    hod: "Dr. P. Manoharan M.Sc., Ph.D.",
    degrees: ["B.Sc. Biotechnology", "M.Sc. Biotechnology", "Ph.D. Biotechnology"],
    description: "Equipped with advanced tissue culture, genetic engineering, and molecular biology instrumentation for cutting-edge bioscience training.",
    highlights: ["Central Instrumentation Lab", "DST-FIST Supported", "Plant Tissue Culture Unit"],
    labs: ["Molecular Biology Lab", "Genetic Engineering Lab", "Plant Tissue Culture Facility"],
  },
  {
    id: "microbio",
    name: "Microbiology",
    slug: "microbiology",
    category: "Science",
    established: "1996",
    hod: "Dr. S. Kanchana M.Sc., M.Phil., Ph.D.",
    degrees: ["B.Sc. Microbiology", "M.Sc. Microbiology", "M.Phil. Microbiology", "Ph.D. Microbiology"],
    description: "Renowned for clinical diagnostics, microbial immunology, mushroom cultivation, and organic bio-fertilizer development.",
    highlights: ["Mushroom Cultivation Unit", "Azolla Bio-fertilizer Farm", "Industrial Strain Repository"],
    labs: ["Microbial Culture Lab", "Immunology & Virology Lab", "Biofertilizer Processing Unit"],
  },
  {
    id: "biochem",
    name: "Biochemistry",
    slug: "biochemistry",
    category: "Science",
    established: "1998",
    hod: "Dr. R. Kavitha M.Sc., Ph.D.",
    degrees: ["B.Sc. Biochemistry", "M.Sc. Biochemistry", "Ph.D. Biochemistry"],
    description: "Focusing on clinical biochemistry, pharmacology, enzymology, and cancer biology research with clinical laboratory tie-ups.",
    highlights: ["Clinical Diagnostics Suite", "HPLC & Spectrophotometry", "Metabolic Profiling"],
  },
  {
    id: "botany",
    name: "Botany",
    slug: "botany",
    category: "Science",
    established: "1995",
    hod: "Dr. T. Murugesan M.Sc., Ph.D.",
    degrees: ["B.Sc. Botany", "M.Sc. Botany", "Ph.D. Botany"],
    description: "Focusing on herbal taxonomy, ethnobotany of Eastern Ghats, biodiversity conservation, and medicinal plant gardens.",
    highlights: ["Herbal Botanical Garden", "Herbarium Center", "Vermicomposting Unit"],
  },
  {
    id: "physics",
    name: "Physics",
    slug: "physics",
    category: "Science",
    established: "1997",
    hod: "Dr. C. Balakrishnan M.Sc., M.Phil., Ph.D.",
    degrees: ["B.Sc. Physics", "M.Sc. Physics", "Ph.D. Physics"],
    description: "Pioneering research in crystal growth, thin film technology, nanomaterials, and optoelectronics.",
    highlights: ["Crystal Growth Lab", "Ultrasonics Research Station", "Optics & Laser Laboratory"],
  },
  {
    id: "chemistry",
    name: "Chemistry",
    slug: "chemistry",
    category: "Science",
    established: "1997",
    hod: "Dr. K. Ganesan M.Sc., Ph.D.",
    degrees: ["B.Sc. Chemistry", "M.Sc. Chemistry", "Ph.D. Chemistry"],
    description: "Comprehensive training in synthetic organic chemistry, environmental catalysis, green synthesis, and polymer chemistry.",
    highlights: ["Spectroscopic Instrumentation", "Green Chemical Synthesis Lab", "Water Quality Analysis Lab"],
  },
  {
    id: "maths",
    name: "Mathematics",
    slug: "mathematics",
    category: "Science",
    established: "1994",
    hod: "Dr. G. Anbazhagan M.Sc., M.Phil., Ph.D.",
    degrees: ["B.Sc. Mathematics", "M.Sc. Mathematics", "M.Phil. Mathematics", "Ph.D. Mathematics"],
    description: "Specializing in graph theory, differential equations, operations research, and stochastic modeling.",
    highlights: ["Mathematical Computing Lab", "MATLAB & Python Modeling", "Annual Ramanujan Colloquium"],
  },
  {
    id: "cs",
    name: "Computer Science & Data Science",
    slug: "computer-science",
    category: "Computing & IT",
    established: "1994",
    hod: "Dr. R. Senthil Kumar M.C.A., M.Phil., Ph.D.",
    degrees: ["B.Sc. Computer Science", "B.Sc. Data Science", "M.Sc. Computer Science", "Ph.D. Computer Science"],
    description: "State-of-the-art computing laboratories delivering industry-aligned education in AI, Machine Learning, Cloud Architecture, and Big Data.",
    highlights: ["High-Performance Computing Lab", "AWS & Google Cloud Academy", "24/7 Gigabit Fiber Network"],
  },
  {
    id: "it",
    name: "Information Technology",
    slug: "information-technology",
    category: "Computing & IT",
    established: "2000",
    hod: "Dr. M. Sangeetha M.Sc., M.Phil., Ph.D.",
    degrees: ["B.Sc. Information Technology", "M.Sc. Information Technology"],
    description: "Focused on enterprise networking, mobile application development, cyber security, and DevOps.",
    highlights: ["Cisco Networking Lab", "Mobile App Development Center", "Cyber Security Training Hub"],
  },
  {
    id: "ca",
    name: "Computer Applications",
    slug: "computer-applications",
    category: "Computing & IT",
    established: "1998",
    hod: "Prof. P. Vijayalakshmi M.C.A., M.Phil.",
    degrees: ["BCA (Bachelor of Computer Applications)", "MCA (Approved by AICTE)"],
    description: "Professional software engineering, database management, full-stack web technologies, and enterprise application building.",
    highlights: ["Full-Stack Innovation Lab", "AICTE Approved MCA", "Industry Internship Program"],
  },
  {
    id: "viscom",
    name: "Visual Communication",
    slug: "visual-communication",
    category: "Arts & Humanities",
    established: "2005",
    hod: "Prof. R. Saravanan M.A., M.Phil.",
    degrees: ["B.Sc. Visual Communication"],
    description: "Professional digital media studio, multi-track audio recording, cinematography, broadcast editing, and 3D animation.",
    highlights: ["Broadcast Video Suite", "Acoustic Audio Studio", "Darkroom & Digital Photography"],
  },
  {
    id: "hm",
    name: "Hotel Management & Catering",
    slug: "hotel-management",
    category: "Arts & Humanities",
    established: "2002",
    hod: "Chef. S. Kumaravel B.Sc., M.B.A. (HM)",
    degrees: ["B.Sc. Hotel Management and Catering Science"],
    description: "Equipped with commercial culinary suites, bakeries, mock training restaurants, and executive housekeeping labs.",
    highlights: ["Commercial Training Kitchen", "Mock Star Restaurant", "Bakery & Confectionery Suite"],
  },
  {
    id: "pe",
    name: "Physical Education",
    slug: "physical-education",
    category: "Arts & Humanities",
    established: "2000",
    hod: "Dr. K. Chandrasekaran M.P.Ed., M.Phil., Ph.D.",
    degrees: ["B.Sc. Physical Education", "B.P.Ed."],
    description: "Sprawling 400m athletic track, multi-sport indoor stadium, cricket pavilion, gymnasiums, and sports medicine clinic.",
    highlights: ["400m Olympic standard Track", "Multipurpose Indoor Stadium", "State-Level Tournament Venue"],
  },
  {
    id: "comm",
    name: "General Commerce & Commerce with CA",
    slug: "commerce",
    category: "Commerce & Management",
    established: "1994",
    hod: "Dr. N. Rajalingam M.Com., M.Phil., Ph.D.",
    degrees: ["B.Com. General", "B.Com. Computer Applications", "M.Com.", "M.Phil. Commerce", "Ph.D. Commerce"],
    description: "Premier commerce academy with Tally Prime, GST computation, corporate taxation, and banking lab simulations.",
    highlights: ["Computerized Accounting Lab", "Stock Market Trading Sim", "Chartered Accountant Club"],
  },
  {
    id: "bba",
    name: "Business Administration",
    slug: "business-administration",
    category: "Commerce & Management",
    established: "1995",
    hod: "Dr. S. Thiyagarajan M.B.A., Ph.D.",
    degrees: ["BBA (Bachelor of Business Administration)", "MBA (Approved by AICTE)"],
    description: "Developing future business leaders through case method pedagogy, entrepreneurial incubators, and corporate leadership conclaves.",
    highlights: ["Entrepreneurship Development Cell", "Executive Management Suite", "Live Case Studies Lab"],
  },
  {
    id: "english",
    name: "English",
    slug: "english",
    category: "Arts & Humanities",
    established: "1994",
    hod: "Dr. P. Geetha M.A., M.Phil., Ph.D.",
    degrees: ["B.A. English", "M.A. English", "M.Phil. English", "Ph.D. English"],
    description: "Dedicated to British and Commonwealth literature, linguistics, digital English language laboratory, and theatre studies.",
    highlights: ["Interactive Digital Language Lab", "Shakespeare Literary Society", "Pronunciation & Phonetics Suite"],
  },
  {
    id: "tamil",
    name: "Tamil",
    slug: "tamil",
    category: "Arts & Humanities",
    established: "1994",
    hod: "Dr. M. Karunanidhi M.A., M.Phil., Ph.D.",
    degrees: ["B.A. Tamil", "M.A. Tamil", "Ph.D. Tamil"],
    description: "Promoting Classical Tamil literature, Sangam poetry, folklore preservation, epigraphy, and creative journalistic writing.",
    highlights: ["Classical Tamil Research Cell", "Manuscript & Epigraphy Archive", "Kaviarangam Literary Forum"],
  },
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "news-01",
    date: "19-10-2026",
    title: "Staff Recruitment - Karpaga Vinayaga Hospital (KVH)",
    summary: "Campus recruitment notice for students and alumni with clinical and corporate positions.",
    category: "Recruitment",
    content: "Karpaga Vinayaga Institute of Medical Sciences & Hospital conducts a special campus recruitment drive for final year UG/PG Biotechnology, Microbiology, and Biochemistry graduates on 28th October 2026 at the Main Auditorium.",
    url: "https://jjcoll.in/newsevents.php?id=19-10-2026-13-56-13-86",
  },
  {
    id: "news-02",
    date: "16-10-2026",
    title: "Spot Admission Open for Autonomous UG & PG Programmes",
    summary: "Spot admission notice for the current academic year across science, IT and commerce.",
    category: "Admission",
    content: "Candidates seeking spot admissions for unfilled seats in B.Sc. Data Science, BCA, B.Com CA, and M.Sc. Biotechnology can walk in directly to the Principal's Office with original qualifying marksheets.",
    url: "https://jjcoll.in/newsevents.php?id=16-10-2026-16-19-39-45",
  },
  {
    id: "news-03",
    date: "17-09-2026",
    title: "Perfect Your Pronunciation — Department of English",
    summary: "English department programme on phonetics and oral communication mastery.",
    category: "Academic",
    content: "The Department of English organizes a state-level training program in the Digital Language Lab focusing on the International Phonetic Alphabet (IPA), interview articulation, and public discourse.",
    url: "https://jjcoll.in/newsevents.php?id=23-09-2026-10-25-15-53",
  },
  {
    id: "news-04",
    date: "05-09-2026",
    title: "Odd Semester Autonomous Examination Time Table Released",
    summary: "Controller of Examinations releases timetable for November/December 2026 Comprehensive Semester Examinations.",
    category: "Examination",
    content: "The Office of the Controller of Examinations has published the theory examination schedule for all UG & PG semesters. Students are advised to download hall tickets through the Student Examination Portal.",
    url: "https://jjcoll.in/newsevents.php?id=05-09-2026",
  },
];

export const EVENTS: EventItem[] = [
  {
    id: "event-01",
    date: "28 Sep 2026",
    day: "28",
    month: "Sep",
    year: "2026",
    title: "The Mahatma — Gandhi Jayanti National Youth Symposium",
    venue: "Dr. A.P.J. Abdul Kalam Memorial Auditorium",
    time: "10:00 AM – 04:00 PM",
    description: "National debate, Gandhian philosophy exhibition, and inter-collegiate essay competitions honoring the Father of the Nation.",
  },
  {
    id: "event-02",
    date: "24 Sep 2026",
    day: "24",
    month: "Sep",
    year: "2026",
    title: "NSS & YRC Mega Plantation Drive — பனை விதைகள் நடும் பணி",
    venue: "J.J. College Eco-Campus & Pudukkottai Ring Road",
    time: "07:30 AM – 11:30 AM",
    description: "Planting of 10,000 Palmyra (Panai) seeds across water catchment areas to conserve groundwater and protect Tamil Nadu's state tree.",
  },
  {
    id: "event-03",
    date: "14 Oct 2026",
    day: "14",
    month: "Oct",
    year: "2026",
    title: "Annual Sports Meet & Inter-Collegiate Athletic Championships",
    venue: "College 400m Track Stadium",
    time: "08:30 AM – 05:00 PM",
    description: "Two-day state-level athletic championship featuring track and field events, volleyball, basketball, and kabaddi tournaments.",
  },
];

export const RESEARCH_CENTERS = [
  {
    title: "Central Instrumentation Facility (CIF)",
    description: "Houses state-of-the-art analytical instrumentation including UV-Vis Spectrophotometers, FTIR, HPLC, and Cooling Centrifuges.",
  },
  {
    title: "Animal House Facility (CPCSEA Approved)",
    description: "Government-registered research facility catering to preclinical pharmacology, toxicology, and biochemistry research.",
  },
  {
    title: "Mushroom Cultivation & Spawn Lab",
    description: "Hands-on training center producing oyster and milky mushroom spawns, serving agricultural farmers across Pudukkottai.",
  },
  {
    title: "Vermi-Composting & Azolla Bio-Farm",
    description: "Eco-friendly organic fertilizer synthesis units recycling campus organic waste and generating organic fertilizer for farmers.",
  },
];

export const HIGHLIGHTS = [
  { title: "Autonomous Status", subtitle: "Since 2013" },
  { title: "NAAC Re-Accredited", subtitle: "with B++ Grade" },
  { title: "Affiliated to", subtitle: "Bharathidasan University" },
  { title: "Student Centric", subtitle: "Quality Education" },
  { title: "Silver Jubilee", subtitle: "Institution" },
];

export const COLLEGE_DATA = {
  info: COLLEGE_INFO,
  highlights: HIGHLIGHTS,
  milestones: MILESTONES,
  statistics: STATS,
  leadership: ADMINISTRATORS,
  departments: DEPARTMENTS,
  latestNews: NEWS_ITEMS,
  upcomingEvents: EVENTS,
  researchCenters: RESEARCH_CENTERS,
};

