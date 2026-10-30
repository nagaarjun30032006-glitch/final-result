#!/usr/bin/env python3
"""
==============================================================================
HIGH-PERFORMANCE FULL-STACK SERVER — J.J. COLLEGE OF ARTS & SCIENCE (AUTONOMOUS)
Serves Modern Frontend Web UI & Dispatches Python Backend REST APIs
==============================================================================
"""

import http.server
import socketserver
import os
import sys

# Ensure backend folder is on python path
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.join(BASE_DIR, "backend")
if BACKEND_DIR not in sys.path:
    sys.path.insert(0, BACKEND_DIR)

from database import init_database
from api_handler import APIHandler

DEFAULT_PORT = 5173

import socket

def get_local_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        ip = s.getsockname()[0]
        s.close()
        return ip
    except Exception:
        return '127.0.0.1'

class ThreadingServer(socketserver.ThreadingMixIn, http.server.HTTPServer):
    daemon_threads = True
    allow_reuse_address = True

class PortalHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=BASE_DIR, **kwargs)

    def address_string(self):
        # Disable reverse DNS lookups on Windows for instant response times
        return self.client_address[0]

    def _dispatch_api(self):
        try:
            content_length = int(self.headers.get('Content-Length', 0))
            body_bytes = self.rfile.read(content_length) if content_length > 0 else b''
            headers_dict = {k: v for k, v in self.headers.items()}

            status_code, resp_headers, resp_bytes = APIHandler.handle_request(
                method=self.command,
                path=self.path,
                headers=headers_dict,
                body_bytes=body_bytes
            )

            self.send_response(status_code)
            for h_key, h_val in resp_headers.items():
                self.send_header(h_key, h_val)
            self.send_header('Content-Length', str(len(resp_bytes)))
            self.end_headers()
            self.wfile.write(resp_bytes)
        except Exception as e:
            import traceback
            traceback.print_exc()
            self.send_error(500, str(e))

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Access-Control-Max-Age', '86400')
        self.send_header('Content-Length', '0')
        self.end_headers()

    def do_GET(self):
        if self.path.startswith('/api/'):
            self._dispatch_api()
        else:
            super().do_GET()

    def do_POST(self):
        if self.path.startswith('/api/'):
            self._dispatch_api()
        else:
            self.send_error(405, "Method Not Allowed")

    def do_PUT(self):
        if self.path.startswith('/api/'):
            self._dispatch_api()
        else:
            self.send_error(405, "Method Not Allowed")

    def do_DELETE(self):
        if self.path.startswith('/api/'):
            self._dispatch_api()
        else:
            self.send_error(405, "Method Not Allowed")

    def end_headers(self):
        # Enable CORS and caching rules for development
        if not self.path.startswith('/api/'):
            self.send_header('Access-Control-Allow-Origin', '*')
            self.send_header('Cache-Control', 'no-cache, no-store, must-revalidate')
            self.send_header('Pragma', 'no-cache')
            self.send_header('Expires', '0')
        super().end_headers()

if __name__ == "__main__":
    if sys.stdout.encoding != 'utf-8':
        try:
            sys.stdout.reconfigure(encoding='utf-8')
        except Exception:
            pass

    # 1. Initialize SQLite Database & Seed Data
    print("[INIT] Initializing J.J. College SQLite Database...")
    init_database()

    env_port = os.environ.get("PORT")
    port = int(env_port) if env_port else (int(sys.argv[1]) if len(sys.argv) > 1 else DEFAULT_PORT)
    host = os.environ.get("HOST", "")

    for p in [port, 3000, 3001, 8080]:
        try:
            with ThreadingServer((host, p), PortalHandler) as httpd:
                print("================================================================")
                print(f"  [ONLINE] J.J. College Full-Stack Portal Running Successfully")
                local_ip = get_local_ip()
                print(f"  🔗  Local PC URL:   http://localhost:{p}/")
                if local_ip and local_ip != '127.0.0.1':
                    print(f"  📱  Mobile Phone URL: http://{local_ip}:{p}/")
                print(f"  📁  Static Files: {BASE_DIR}")
                print(f"  🗄️   Database: {os.path.join(BACKEND_DIR, 'college_portal.db')}")
                print(f"  🔐  Admin Login: admin / admin@123")
                print(f"  👨‍🏫  Faculty Login: faculty / faculty@123")
                print(f"  🎓  Student Login: P26CA2029 / 30/03/2006")
                print("================================================================")
                print("Press Ctrl+C to stop the server.")
                httpd.serve_forever()
                break
        except OSError:
            print(f"Port {p} is in use, trying next port...")
