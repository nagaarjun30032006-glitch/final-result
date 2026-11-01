export interface NavItemChild {
  label: string;
  href: string;
  description?: string;
}

export interface NavItemGroup {
  groupTitle?: string;
  items: NavItemChild[];
}

export interface NavSection {
  name: string;
  href: string;
  hasDropdown: boolean;
  megaMenuGroups?: NavItemGroup[];
}

export const NAVIGATION_SECTIONS: NavSection[] = [
  {
    name: "About Us",
    href: "/about",
    hasDropdown: true,
    megaMenuGroups: [
      {
        groupTitle: "Institution",
        items: [
          { label: "History & Genesis", href: "/about#history", description: "Established in 1994 by KVET" },
          { label: "Vision & Mission", href: "/about#vision-mission", description: "Educational empowerment of rural youth" },
          { label: "Emblem & Motto", href: "/about#emblem-motto", description: "Knowledge, discipline and service" },
          { label: "College Profile", href: "/about#profile", description: "Campus demographics and milestones" },
          { label: "Organogram", href: "/about#organogram", description: "Administrative governance chart" },
        ],
      },
      {
        groupTitle: "Leadership & Administration",
        items: [
          { label: "Founder: Thiru. S. Ragupathy", href: "/about#founder", description: "Minister for Law, Courts & Prisons" },
          { label: "Secretary: Mr. N. Subramanian", href: "/about#secretary", description: "Educational administration" },
          { label: "Trustee: Dr. Kavitha Subramanian", href: "/about#trustee", description: "Student welfare & development" },
          { label: "Principal: Dr. J. Parasuraman", href: "/about#principal", description: "Academic and research leadership" },
        ],
      },
      {
        groupTitle: "Governance & Accreditation",
        items: [
          { label: "Autonomous Status", href: "/about#autonomy", description: "Conferred by UGC; valid to 2028" },
          { label: "NAAC B++ Accreditation", href: "/about#naac", description: "4th cycle re-accreditation" },
          { label: "Annual Institutional Reports", href: "/about#annual-reports", description: "Academic performance archives" },
        ],
      },
    ],
  },
  {
    name: "Admission",
    href: "/admissions",
    hasDropdown: true,
    megaMenuGroups: [
      {
        groupTitle: "Programmes Offered",
        items: [
          { label: "Undergraduate (UG) Programmes", href: "/admissions#ug", description: "17 specialized Bachelor degrees" },
          { label: "Postgraduate (PG) Programmes", href: "/admissions#pg", description: "Master of Science, Arts & Commerce" },
          { label: "Research: M.Phil. & Ph.D.", href: "/admissions#research", description: "Doctoral research departments" },
          { label: "PG Diploma Courses", href: "/admissions#diploma", description: "Specialized skill credentials" },
        ],
      },
      {
        groupTitle: "Information & Guidelines",
        items: [
          { label: "Fee Structure (UG & PG)", href: "/admissions#fees", description: "Affordable fee schedules with scholarships" },
          { label: "Admission Policy & Eligibility", href: "/admissions#policy", description: "Reservation norms and qualification guidelines" },
          { label: "Institutional Prospectus", href: "/admissions#prospectus", description: "Complete downloadable academic handbook" },
          { label: "Online Application Portal", href: "/admissions#apply", description: "Direct student enrollment application" },
        ],
      },
    ],
  },
  {
    name: "Academic",
    href: "/academic",
    hasDropdown: true,
    megaMenuGroups: [
      {
        groupTitle: "Sciences",
        items: [
          { label: "Biotechnology", href: "/academic/departments/biotechnology" },
          { label: "Microbiology", href: "/academic/departments/microbiology" },
          { label: "Biochemistry", href: "/academic/departments/biochemistry" },
          { label: "Botany", href: "/academic/departments/botany" },
          { label: "Physics", href: "/academic/departments/physics" },
          { label: "Chemistry", href: "/academic/departments/chemistry" },
          { label: "Mathematics", href: "/academic/departments/mathematics" },
        ],
      },
      {
        groupTitle: "Computing & IT",
        items: [
          { label: "Computer Science & Data Science", href: "/academic/departments/computer-science" },
          { label: "Information Technology", href: "/academic/departments/information-technology" },
          { label: "Computer Applications (BCA/MCA)", href: "/academic/departments/computer-applications" },
        ],
      },
      {
        groupTitle: "Commerce, Arts & Applied",
        items: [
          { label: "Commerce & Commerce (CA)", href: "/academic/departments/commerce" },
          { label: "Business Administration (BBA/MBA)", href: "/academic/departments/business-administration" },
          { label: "Visual Communication", href: "/academic/departments/visual-communication" },
          { label: "Hotel Management & Catering", href: "/academic/departments/hotel-management" },
          { label: "Physical Education", href: "/academic/departments/physical-education" },
          { label: "English", href: "/academic/departments/english" },
          { label: "Tamil", href: "/academic/departments/tamil" },
        ],
      },
      {
        groupTitle: "Resources & Curriculum",
        items: [
          { label: "Autonomous Syllabus (OBE)", href: "/academic#syllabus", description: "Outcome-based academic framework" },
          { label: "PEOs, POs, PSOs & Outcomes", href: "/academic#outcomes", description: "Programme educational objectives" },
          { label: "Central Library & Digital Resources", href: "/academic#library", description: "Over 45,000 volumes & DELNET" },
          { label: "Skill & Capacity Development", href: "/academic#skills", description: "Career orientation programs" },
        ],
      },
    ],
  },
  {
    name: "Examination",
    href: "/examination",
    hasDropdown: true,
    megaMenuGroups: [
      {
        groupTitle: "Office of the CoE",
        items: [
          { label: "Profile of Controller of Examinations", href: "/examination#coe", description: "Autonomous examination leadership" },
          { label: "CoE Staff & Examination Wing", href: "/examination#staff", description: "Administrative and evaluation team" },
          { label: "Statutory Manual of CoE", href: "/examination#manual", description: "Regulatory rules and ordinances" },
        ],
      },
      {
        groupTitle: "Systems & Services",
        items: [
          { label: "The Autonomous Examination System", href: "/examination#system", description: "Continuous assessment & semester exams" },
          { label: "Evaluation & Moderation Process", href: "/examination#evaluation", description: "Double valuation and transparency" },
          { label: "Student Result Access Demonstration", href: "/examination#results", description: "Online marksheet portal interface" },
        ],
      },
    ],
  },
  {
    name: "Research",
    href: "/research",
    hasDropdown: true,
    megaMenuGroups: [
      {
        groupTitle: "Research Infrastructure",
        items: [
          { label: "Central Instrumentation Facility (CIF)", href: "/research#cif", description: "Analytical instruments (FTIR, UV-Vis, HPLC)" },
          { label: "CPCSEA Animal House Facility", href: "/research#animal-house", description: "Registered pharmacological facility" },
          { label: "Mushroom Cultivation & Spawn Lab", href: "/research#mushroom", description: "Agri-biotechnology extension" },
          { label: "Vermicomposting & Azolla Farm", href: "/research#bio-farm", description: "Sustainable eco-agriculture units" },
        ],
      },
      {
        groupTitle: "Scholarship & Output",
        items: [
          { label: "Research Departments & Guides", href: "/research#guides", description: "Approved Ph.D. supervisors" },
          { label: "Funded Research Projects", href: "/research#projects", description: "UGC, DST, and TNSCST grants" },
          { label: "Research Publications & Journals", href: "/research#publications", description: "Peer-reviewed college journals" },
          { label: "Research Ethics & Code of Conduct", href: "/research#ethics", description: "Anti-plagiarism & ethics policy" },
        ],
      },
    ],
  },
  {
    name: "IRINS",
    href: "/irins",
    hasDropdown: false,
  },
  {
    name: "IQAC",
    href: "/iqac",
    hasDropdown: true,
    megaMenuGroups: [
      {
        groupTitle: "Quality Assurance",
        items: [
          { label: "Objectives & Functions", href: "/iqac#objectives", description: "Quality mandate and enhancement goals" },
          { label: "IQAC Committee Members", href: "/iqac#members", description: "Institutional advisory council" },
          { label: "Annual Quality Assurance Reports (AQAR)", href: "/iqac#aqar", description: "Comprehensive statutory submissions" },
          { label: "Self Study Report (SSR - Cycle IV)", href: "/iqac#ssr", description: "NAAC 4th cycle documentation" },
        ],
      },
      {
        groupTitle: "Audit & Benchmarks",
        items: [
          { label: "Academic Calendar & Almanac", href: "/iqac#calendar", description: "Yearly schedule of operations" },
          { label: "Academic & Administrative Audit (AAA)", href: "/iqac#aaa", description: "External peer evaluation reports" },
          { label: "NIRF Submissions", href: "/iqac#nirf", description: "National Institutional Ranking Framework" },
          { label: "Best Practices & Distinctiveness", href: "/iqac#best-practices", description: "Institutional core strengths" },
        ],
      },
    ],
  },
  {
    name: "Services",
    href: "/services",
    hasDropdown: true,
    megaMenuGroups: [
      {
        groupTitle: "Student Support",
        items: [
          { label: "Training & Placement Cell", href: "/services#placement", description: "Corporate recruiter connects & training" },
          { label: "Entrepreneurship Development (EDC)", href: "/services#edc", description: "Startup incubation and ideation" },
          { label: "Anti-Ragging Squad & Cell", href: "/services#anti-ragging", description: "Zero-tolerance campus protection" },
          { label: "Statutory & Functional Committees", href: "/services#committees", description: "Grievance, ICC and SC/ST cell" },
        ],
      },
      {
        groupTitle: "Extension & Sports",
        items: [
          { label: "National Service Scheme (NSS)", href: "/services#nss", description: "Community upliftment and village adoption" },
          { label: "Youth Red Cross (YRC) & RRC", href: "/services#yrc", description: "Blood donation and health advocacy" },
          { label: "Women Empowerment Wing (WEW)", href: "/services#wew", description: "Gender sensitization and leadership" },
          { label: "Sports, Gym & Physical Education", href: "/services#sports", description: "Olympic 400m track and indoor stadium" },
        ],
      },
    ],
  },
  {
    name: "Alumni",
    href: "/alumni",
    hasDropdown: false,
  },
  {
    name: "News",
    href: "/news",
    hasDropdown: false,
  },
  {
    name: "Events",
    href: "/events",
    hasDropdown: false,
  },
  {
    name: "Contact",
    href: "/contact",
    hasDropdown: false,
  },
];

// Flat Search Index for Instant Search Bar
export interface SearchItem {
  title: string;
  category: string;
  href: string;
}

export const SEARCH_INDEX: SearchItem[] = [
  { title: "Home", category: "General", href: "/" },
  { title: "College History", category: "About Us", href: "/about#history" },
  { title: "Vision and Mission", category: "About Us", href: "/about#vision-mission" },
  { title: "College Emblem & Motto", category: "About Us", href: "/about#emblem-motto" },
  { title: "College Profile", category: "About Us", href: "/about#profile" },
  { title: "Organogram", category: "About Us", href: "/about#organogram" },
  { title: "Founder Thiru. S. Ragupathy", category: "About Us", href: "/about#founder" },
  { title: "Secretary Mr. N. Subramanian", category: "About Us", href: "/about#secretary" },
  { title: "Trustee Dr. Kavitha Subramanian", category: "About Us", href: "/about#trustee" },
  { title: "Principal Dr. J. Parasuraman", category: "About Us", href: "/about#principal" },
  { title: "Autonomy Status", category: "About Us", href: "/about#autonomy" },
  { title: "NAAC Accreditation", category: "About Us", href: "/about#naac" },
  { title: "Annual Reports", category: "About Us", href: "/about#annual-reports" },
  { title: "Undergraduate Programmes (UG)", category: "Admissions", href: "/admissions#ug" },
  { title: "Postgraduate Programmes (PG)", category: "Admissions", href: "/admissions#pg" },
  { title: "M.Phil. & Ph.D. Research Admissions", category: "Admissions", href: "/admissions#research" },
  { title: "Fee Structure", category: "Admissions", href: "/admissions#fees" },
  { title: "Admission Policy & Eligibility", category: "Admissions", href: "/admissions#policy" },
  { title: "College Prospectus", category: "Admissions", href: "/admissions#prospectus" },
  { title: "Apply Online for Admissions", category: "Admissions", href: "/admissions#apply" },
  { title: "Department of Biotechnology", category: "Academic", href: "/academic/departments/biotechnology" },
  { title: "Department of Microbiology", category: "Academic", href: "/academic/departments/microbiology" },
  { title: "Department of Biochemistry", category: "Academic", href: "/academic/departments/biochemistry" },
  { title: "Department of Botany", category: "Academic", href: "/academic/departments/botany" },
  { title: "Department of Physics", category: "Academic", href: "/academic/departments/physics" },
  { title: "Department of Chemistry", category: "Academic", href: "/academic/departments/chemistry" },
  { title: "Department of Mathematics", category: "Academic", href: "/academic/departments/mathematics" },
  { title: "Department of Computer Science & Data Science", category: "Academic", href: "/academic/departments/computer-science" },
  { title: "Department of Information Technology", category: "Academic", href: "/academic/departments/information-technology" },
  { title: "Department of Computer Applications (BCA / MCA)", category: "Academic", href: "/academic/departments/computer-applications" },
  { title: "Department of Visual Communication", category: "Academic", href: "/academic/departments/visual-communication" },
  { title: "Department of Hotel Management & Catering", category: "Academic", href: "/academic/departments/hotel-management" },
  { title: "Department of Physical Education", category: "Academic", href: "/academic/departments/physical-education" },
  { title: "Department of Commerce & Commerce with CA", category: "Academic", href: "/academic/departments/commerce" },
  { title: "Department of Business Administration (BBA / MBA)", category: "Academic", href: "/academic/departments/business-administration" },
  { title: "Department of English", category: "Academic", href: "/academic/departments/english" },
  { title: "Department of Tamil", category: "Academic", href: "/academic/departments/tamil" },
  { title: "Syllabus (Autonomous Curriculum)", category: "Academic", href: "/academic#syllabus" },
  { title: "Programme Outcomes (POs & PEOs)", category: "Academic", href: "/academic#outcomes" },
  { title: "Central Library", category: "Academic", href: "/academic#library" },
  { title: "Office of the Controller of Examinations (COE)", category: "Examination", href: "/examination#coe" },
  { title: "Autonomous Examination System", category: "Examination", href: "/examination#system" },
  { title: "Evaluation & Moderation Process", category: "Examination", href: "/examination#evaluation" },
  { title: "Student Result Access Portal", category: "Examination", href: "/examination#results" },
  { title: "Central Instrumentation Facility (CIF)", category: "Research", href: "/research#cif" },
  { title: "Animal House Facility", category: "Research", href: "/research#animal-house" },
  { title: "Mushroom Cultivation Unit", category: "Research", href: "/research#mushroom" },
  { title: "Research Guides & Supervisors", category: "Research", href: "/research#guides" },
  { title: "IRINS Research Portal", category: "Research", href: "/irins" },
  { title: "Internal Quality Assurance Cell (IQAC)", category: "IQAC", href: "/iqac#objectives" },
  { title: "AQAR Submissions", category: "IQAC", href: "/iqac#aqar" },
  { title: "NIRF Ranking Documents", category: "IQAC", href: "/iqac#nirf" },
  { title: "Training and Placement Cell", category: "Services", href: "/services#placement" },
  { title: "National Service Scheme (NSS)", category: "Services", href: "/services#nss" },
  { title: "Youth Red Cross (YRC)", category: "Services", href: "/services#yrc" },
  { title: "Sports Complex & Athletic Stadium", category: "Services", href: "/services#sports" },
  { title: "Alumni Association", category: "Alumni", href: "/alumni" },
  { title: "Latest News & Circulars", category: "News", href: "/news" },
  { title: "Events & Symposia", category: "Events", href: "/events" },
  { title: "Campus Contact & Location Map", category: "Contact", href: "/contact" },
];

