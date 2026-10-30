"""
==============================================================================
SUPABASE CLOUD CLIENT MODULE — J.J. COLLEGE OF ARTS & SCIENCE (AUTONOMOUS)
PostgreSQL REST Client via Supabase PostgREST for Serverless & Cloud Deployments
==============================================================================
"""

import os
import json
import urllib.request
import urllib.parse
import urllib.error
from typing import Dict, Any, List, Optional, Tuple

class SupabaseClient:
    def __init__(self):
        self.url = ""
        self.key = ""
        self.reload_config()

    def reload_config(self):
        """Loads configuration from environment variables or local config files."""
        # 1. Environment variables
        self.url = (
            os.environ.get("SUPABASE_URL") or 
            os.environ.get("NEXT_PUBLIC_SUPABASE_URL") or 
            ""
        ).strip().rstrip("/")
        
        self.key = (
            os.environ.get("SUPABASE_SERVICE_ROLE_KEY") or 
            os.environ.get("SUPABASE_KEY") or 
            os.environ.get("SUPABASE_ANON_KEY") or 
            os.environ.get("NEXT_PUBLIC_SUPABASE_ANON_KEY") or 
            ""
        ).strip()

        # 2. Check .env file in root or backend
        if not self.url or not self.key:
            self._load_from_env_file()

        # 3. Check supabase_config.json if created
        if not self.url or not self.key:
            self._load_from_json_config()

    def _load_from_env_file(self):
        root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        for env_path in [os.path.join(root_dir, ".env"), os.path.join(root_dir, "backend", ".env")]:
            if os.path.exists(env_path):
                try:
                    with open(env_path, "r", encoding="utf-8") as f:
                        for line in f:
                            line = line.strip()
                            if line and not line.startswith("#") and "=" in line:
                                k, v = line.split("=", 1)
                                k = k.strip()
                                v = v.strip().strip("'\"")
                                if k in ("SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_URL") and not self.url:
                                    self.url = v.rstrip("/")
                                elif k in ("SUPABASE_SERVICE_ROLE_KEY", "SUPABASE_KEY", "SUPABASE_ANON_KEY", "NEXT_PUBLIC_SUPABASE_ANON_KEY") and not self.key:
                                    self.key = v
                except Exception:
                    pass

    def _load_from_json_config(self):
        root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        cfg_path = os.path.join(root_dir, "supabase_config.json")
        if os.path.exists(cfg_path):
            try:
                with open(cfg_path, "r", encoding="utf-8") as f:
                    data = json.load(f)
                    if isinstance(data, dict):
                        if not self.url and data.get("url"):
                            self.url = str(data["url"]).strip().rstrip("/")
                        if not self.key and data.get("key"):
                            self.key = str(data["key"]).strip()
            except Exception:
                pass

    def is_configured(self) -> bool:
        """Returns True if valid Supabase URL and API Key are present."""
        return bool(self.url and self.key and self.url.startswith("http"))

    def get_public_config(self) -> Dict[str, Any]:
        """Returns safe config status for frontend inspection."""
        is_conf = self.is_configured()
        masked_url = ""
        if is_conf:
            parsed = urllib.parse.urlparse(self.url)
            host = parsed.netloc
            masked_url = f"{parsed.scheme}://{host}"
        return {
            "configured": is_conf,
            "provider": "supabase" if is_conf else "sqlite",
            "url": masked_url,
            "connected": is_conf
        }

    def save_config(self, url: str, key: str) -> bool:
        """Saves Supabase config to supabase_config.json and updates active runtime."""
        clean_url = str(url).strip().rstrip("/")
        clean_key = str(key).strip()
        root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        cfg_path = os.path.join(root_dir, "supabase_config.json")
        try:
            with open(cfg_path, "w", encoding="utf-8") as f:
                json.dump({"url": clean_url, "key": clean_key}, f, indent=2)
            os.environ["SUPABASE_URL"] = clean_url
            os.environ["SUPABASE_KEY"] = clean_key
            self.url = clean_url
            self.key = clean_key
            return True
        except Exception:
            return False

    def request(self, endpoint: str, method: str = "GET", params: Optional[Dict[str, Any]] = None, body: Optional[Any] = None, custom_headers: Optional[Dict[str, str]] = None) -> Tuple[int, Any]:
        """Makes an authorized HTTP request to the Supabase PostgREST API."""
        if not self.is_configured():
            return 503, {"error": "Supabase credentials not configured."}

        url = f"{self.url}/rest/v1/{endpoint.lstrip('/')}"
        if params:
            query_str = urllib.parse.urlencode(params)
            url += f"?{query_str}"

        headers = {
            "apikey": self.key,
            "Authorization": f"Bearer {self.key}",
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
        if custom_headers:
            headers.update(custom_headers)

        req_data = None
        if body is not None:
            if isinstance(body, (dict, list)):
                req_data = json.dumps(body).encode("utf-8")
            elif isinstance(body, str):
                req_data = body.encode("utf-8")
            elif isinstance(body, bytes):
                req_data = body

        req = urllib.request.Request(url, data=req_data, headers=headers, method=method)

        try:
            with urllib.request.urlopen(req, timeout=12.0) as resp:
                status = resp.status
                raw = resp.read().decode("utf-8")
                res_data = json.loads(raw) if raw else {}
                return status, res_data
        except urllib.error.HTTPError as e:
            err_raw = e.read().decode("utf-8") if e.fp else "{}"
            try:
                err_json = json.loads(err_raw)
            except Exception:
                err_json = {"error": err_raw or e.reason}
            return e.code, err_json
        except Exception as ex:
            return 500, {"error": str(ex)}

    # =========================================================================
    # STUDENTS CRUD (CREATE, READ, UPDATE, DELETE)
    # =========================================================================
    def get_students(self, query: str = "") -> List[Dict[str, Any]]:
        """READ: Fetches list of students with optional search filter."""
        params = {"select": "*", "order": "register_number.asc"}
        if query:
            clean_q = query.strip().upper()
            params["or"] = f"(register_number.ilike.%{clean_q}%,name.ilike.%{clean_q}%)"

        status, data = self.request("students", method="GET", params=params)
        return data if (status in (200, 206) and isinstance(data, list)) else []

    def get_student(self, register_number: str) -> Optional[Dict[str, Any]]:
        """READ: Fetches single student record by register number."""
        clean_reg = register_number.strip().upper()
        status, data = self.request("students", method="GET", params={"register_number": f"eq.{clean_reg}", "select": "*"})
        if status in (200, 206) and isinstance(data, list) and len(data) > 0:
            return data[0]
        return None

    def save_student(self, student_data: Dict[str, Any]) -> Tuple[bool, Optional[Dict[str, Any]], str]:
        """CREATE / UPDATE: Upserts student personal details into Supabase."""
        reg_no = str(student_data.get("register_number") or student_data.get("registerNumber") or "").strip().upper()
        if not reg_no:
            return False, None, "Register number is required."

        payload = {
            "register_number": reg_no,
            "name": str(student_data.get("name") or "").strip(),
            "dob": str(student_data.get("dob") or "").strip().replace(" ", ""),
            "department": str(student_data.get("department") or "Computer Science (Autonomous)").strip(),
            "degree": str(student_data.get("degree") or "Bachelor of Science (B.Sc.)").strip(),
            "regulation": str(student_data.get("regulation") or "CBCS Regulation 2023").strip(),
            "current_semester": str(student_data.get("current_semester") or student_data.get("semester") or "Semester IV").strip(),
            "admission_year": int(student_data.get("admission_year") or student_data.get("admissionYear") or 2023),
            "mentor": str(student_data.get("mentor") or "").strip(),
            "gender": str(student_data.get("gender") or "Not Specified").strip(),
            "blood_group": str(student_data.get("blood_group") or student_data.get("bloodGroup") or "--").strip(),
            "email": str(student_data.get("email") or "").strip(),
            "phone": str(student_data.get("phone") or "").strip(),
            "guardian_name": str(student_data.get("guardian_name") or student_data.get("guardianName") or "").strip(),
            "address": str(student_data.get("address") or "").strip()
        }

        headers = {
            "Prefer": "resolution=merge-duplicates,return=representation"
        }
        status, res = self.request("students", method="POST", body=payload, custom_headers=headers)
        if status in (200, 201) and isinstance(res, list) and len(res) > 0:
            return True, res[0], "Student saved successfully in Supabase."
        elif status in (200, 201) and isinstance(res, dict):
            return True, res, "Student saved successfully in Supabase."
        else:
            err = res.get("message") or res.get("error") if isinstance(res, dict) else "Failed to save student."
            return False, None, str(err)

    def delete_student(self, register_number: str) -> Tuple[bool, str]:
        """DELETE: Deletes student, related marks and user account in Supabase."""
        clean_reg = register_number.strip().upper()
        # 1. Delete marks
        self.request("marks", method="DELETE", params={"register_number": f"eq.{clean_reg}"})
        # 2. Delete user login
        self.request("users", method="DELETE", params={"username": f"eq.{clean_reg}"})
        # 3. Delete student
        status, res = self.request("students", method="DELETE", params={"register_number": f"eq.{clean_reg}"})
        if status in (200, 204):
            return True, f"Student {clean_reg} deleted successfully."
        err = res.get("message") or res.get("error") if isinstance(res, dict) else "Delete failed."
        return False, str(err)

    # =========================================================================
    # MARKS CRUD (CREATE, READ, UPDATE, DELETE)
    # =========================================================================
    def get_marks(self, register_number: str = "", semester: str = "", academic_year: str = "", exam_type: str = "") -> List[Dict[str, Any]]:
        """READ: Queries marks records with subject join from Supabase."""
        params = {"select": "*,subjects(name,credits)", "order": "subject_code.asc"}
        if register_number:
            params["register_number"] = f"eq.{register_number.strip().upper()}"
        if semester:
            params["semester"] = f"eq.{semester.strip()}"
        if academic_year:
            params["academic_year"] = f"eq.{academic_year.strip()}"
        if exam_type:
            params["exam_type"] = f"eq.{exam_type.strip()}"

        status, data = self.request("marks", method="GET", params=params)
        if status in (200, 206) and isinstance(data, list):
            # Flatten joined subjects
            results = []
            for row in data:
                r = dict(row)
                sub_meta = r.pop("subjects", None) or {}
                r["subject_name"] = sub_meta.get("name") or f"Course {r.get('subject_code')}"
                r["credits"] = sub_meta.get("credits") or 4
                results.append(r)
            return results
        return []

    def save_mark(self, mark_data: Dict[str, Any]) -> Tuple[bool, Optional[Dict[str, Any]], str]:
        """CREATE / UPDATE: Saves or updates mark record in Supabase."""
        payload = {
            "register_number": str(mark_data.get("register_number", "")).strip().upper(),
            "subject_code": str(mark_data.get("subject_code", "")).strip().upper(),
            "semester": str(mark_data.get("semester", "Semester IV")).strip(),
            "academic_year": str(mark_data.get("academic_year", "2025 - 2026")).strip(),
            "exam_type": str(mark_data.get("exam_type", "Regular - End Semester")).strip(),
            "internal_mark": float(mark_data.get("internal_mark", 0)),
            "external_mark": float(mark_data.get("external_mark", 0)),
            "total_mark": float(mark_data.get("total_mark", 0)),
            "grade_point": int(mark_data.get("grade_point", 0)),
            "letter_grade": str(mark_data.get("letter_grade", "RA")),
            "result": str(mark_data.get("result", "REAPPEAR")),
            "updated_by": str(mark_data.get("updated_by", "system"))
        }
        headers = {"Prefer": "resolution=merge-duplicates,return=representation"}
        status, res = self.request("marks", method="POST", body=payload, custom_headers=headers)
        if status in (200, 201) and isinstance(res, list) and len(res) > 0:
            return True, res[0], "Mark saved successfully."
        elif status in (200, 201) and isinstance(res, dict):
            return True, res, "Mark saved successfully."
        return False, None, str(res.get("message") if isinstance(res, dict) else "Error saving mark.")

    def update_mark_by_id(self, mark_id: int, updates: Dict[str, Any]) -> Tuple[bool, Optional[Dict[str, Any]], str]:
        """UPDATE: In-place update of marks score by ID."""
        headers = {"Prefer": "return=representation"}
        status, res = self.request("marks", method="PATCH", params={"id": f"eq.{mark_id}"}, body=updates, custom_headers=headers)
        if status in (200, 204) and isinstance(res, list) and len(res) > 0:
            return True, res[0], "Mark updated."
        elif status in (200, 204) and isinstance(res, dict):
            return True, res, "Mark updated."
        return False, None, str(res.get("message") if isinstance(res, dict) else "Update failed.")

    def delete_mark_by_id(self, mark_id: int) -> Tuple[bool, str]:
        """DELETE: Deletes single mark record by ID."""
        status, res = self.request("marks", method="DELETE", params={"id": f"eq.{mark_id}"})
        if status in (200, 204):
            return True, f"Record {mark_id} deleted."
        return False, str(res.get("message") if isinstance(res, dict) else "Delete failed.")

    def clear_all_marks(self) -> Tuple[bool, str]:
        """DELETE: Clears all marks records from database."""
        # PostgREST requires a filter to delete, id.gt.0 matches all IDs
        status, res = self.request("marks", method="DELETE", params={"id": "gt.0"})
        if status in (200, 204):
            return True, "All marks cleared."
        return False, str(res.get("message") if isinstance(res, dict) else "Clear all failed.")

    # =========================================================================
    # SUBJECTS CRUD (CREATE, READ, UPDATE, DELETE)
    # =========================================================================
    def get_subjects(self) -> List[Dict[str, Any]]:
        """READ: Fetches curriculum course catalog."""
        status, data = self.request("subjects", method="GET", params={"select": "*", "order": "semester.asc,code.asc"})
        return data if (status in (200, 206) and isinstance(data, list)) else []

    def save_subject(self, sub_data: Dict[str, Any]) -> Tuple[bool, Optional[Dict[str, Any]], str]:
        """CREATE: Inserts a new subject code."""
        code = str(sub_data.get("code", "")).strip().upper()
        payload = {
            "code": code,
            "name": str(sub_data.get("name", "")).strip(),
            "credits": int(sub_data.get("credits", 4)),
            "semester": str(sub_data.get("semester", "Semester IV")).strip(),
            "department": str(sub_data.get("department", "CS")).strip(),
            "max_internal": int(sub_data.get("max_internal", 25)),
            "max_external": int(sub_data.get("max_external", 75))
        }
        headers = {"Prefer": "resolution=merge-duplicates,return=representation"}
        status, res = self.request("subjects", method="POST", body=payload, custom_headers=headers)
        if status in (200, 201):
            return True, payload, "Subject created successfully."
        return False, None, str(res.get("message") if isinstance(res, dict) else "Failed to add subject.")

    def change_subject_code(self, old_code: str, new_code: str, new_name: str, credits: int) -> Tuple[bool, str]:
        """UPDATE: Cascading subject code modification across historical records."""
        old_c = old_code.strip().upper()
        new_c = new_code.strip().upper()

        # 1. Fetch old subject
        status, old_rows = self.request("subjects", method="GET", params={"code": f"eq.{old_c}"})
        if not (status in (200, 206) and isinstance(old_rows, list) and len(old_rows) > 0):
            return False, f"Course code '{old_c}' not found."

        old_sub = old_rows[0]

        # 2. Insert new subject code
        new_payload = {
            "code": new_c,
            "name": new_name or old_sub.get("name"),
            "credits": credits or old_sub.get("credits", 4),
            "semester": old_sub.get("semester", "Semester IV"),
            "department": old_sub.get("department", "CS"),
            "max_internal": old_sub.get("max_internal", 25),
            "max_external": old_sub.get("max_external", 75)
        }
        self.request("subjects", method="POST", body=new_payload, custom_headers={"Prefer": "resolution=merge-duplicates"})

        # 3. Cascade update in marks
        self.request("marks", method="PATCH", params={"subject_code": f"eq.{old_c}"}, body={"subject_code": new_c})

        # 4. Remove old subject
        if old_c != new_c:
            self.request("subjects", method="DELETE", params={"code": f"eq.{old_c}"})

        return True, f"Subject code changed from {old_c} to {new_c} with marks cascade."

    def delete_subject(self, code: str) -> Tuple[bool, str]:
        """DELETE: Deletes subject and cascading marks."""
        clean_code = code.strip().upper()
        self.request("marks", method="DELETE", params={"subject_code": f"eq.{clean_code}"})
        status, res = self.request("subjects", method="DELETE", params={"code": f"eq.{clean_code}"})
        if status in (200, 204):
            return True, f"Subject {clean_code} deleted."
        return False, str(res.get("message") if isinstance(res, dict) else "Delete failed.")

    # =========================================================================
    # USER & AUTHENTICATION
    # =========================================================================
    def get_user_by_username(self, username: str) -> Optional[Dict[str, Any]]:
        """READ: Fetches user record for authentication."""
        clean_u = username.strip()
        status, rows = self.request("users", method="GET", params={"username": f"ilike.{clean_u}"})
        if status in (200, 206) and isinstance(rows, list) and len(rows) > 0:
            return rows[0]
        return None

    def save_user(self, username: str, password_hash: str, role: str, name: str, email: str) -> bool:
        """CREATE / UPDATE: Saves user credentials for login."""
        payload = {
            "username": username.strip(),
            "password_hash": password_hash,
            "role": role,
            "name": name,
            "email": email
        }
        headers = {"Prefer": "resolution=merge-duplicates"}
        status, _ = self.request("users", method="POST", body=payload, custom_headers=headers)
        return status in (200, 201)

# Global Singleton
supabase_client = SupabaseClient()

