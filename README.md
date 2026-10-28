# J.J. College of Arts & Science (Autonomous) — Full-Stack Examination Portal

A complete, modern, mobile-first academic marks management and student portal built for **J.J. College of Arts and Science (Autonomous)**. 

---

## 🚀 Quick Launch

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Run High-Performance Server
```bash
python server.py
```
Open **`http://localhost:5173/`** in your browser.

---

## 🔑 Login Credentials

| Role | Username / Reg No | Password / DOB | Description |
| :--- | :--- | :--- | :--- |
| **COE Administrator** | `admin` | `admin@123` | Full access to curriculum catalog, bulk ingestion, subject code change, mark corrections, and student personal portal. |
| **Faculty Coordinator** | `faculty` | `faculty@123` | Mark entry and student personal details management. |
| **Student** | `P26CA2029` | `15/08/2005` | Master of Computer Applications (M.C.A.) |
| **Student** | `23CS001` | `15/08/2005` | B.Sc. Computer Science (Semester IV) |
| **Student** | `23CS042` | `04/11/2004` | B.Sc. Computer Science (Semester IV) |
| **Student** | `22EC108` | `22/01/2004` | B.E. Electronics & Communication |

---

## 🛠️ Key Portals & Modules

1. **Student Login & Verification**:
   - Strict dual-credential authentication using Register Number & Date of Birth.
   - Intelligent auto-slash date formatting with visual calendar date picker.
2. **Official Minimal Marks Statement**:
   - Clean, academic editorial aesthetic displaying autonomous CBCS grades, GPA calculation, and degree metadata.
   - Mark correction controls strictly restricted to administrators and faculty.
3. **Admin & Faculty Management Suite**:
   - **Bulk Upload**: Ingest student examination marks via Excel (`.xlsx`) or CSV files.
   - **Manual Grade & Mark Entry**: Direct mark entry for individual students without requiring manual name/DOB input.
   - **Student Personal Details Portal**: Dedicated sub-portal managing complete bio-data, academic enrollment, mentor assignments, and contact details with instant authentication synchronization.
   - **Database Marks Ledger**: In-place grade editing modal, filterable view, and record management.
   - **Subject Code & Curriculum Portal**: COE-restricted portal with cascading course code renaming across historical student records.

---

## 📤 Pushing to GitHub

To push this repository to your GitHub account:

```bash
# 1. Initialize git (if not already initialized)
git init
git branch -M main

# 2. Link your GitHub remote repository
git remote add origin https://github.com/<YOUR_USERNAME>/<YOUR_REPOSITORY>.git

# 3. Stage and commit
git add .
git commit -m "feat: complete collegiate exam marks and student personal portal"

# 4. Push to GitHub
git push -u origin main
```
