#!/usr/bin/env python3
"""
==============================================================================
VERCEL SERVERLESS ENTRYPOINT — J.J. COLLEGE OF ARTS & SCIENCE (AUTONOMOUS)
Dispatches API Routes (/api/*) in Vercel Python Serverless Environment
==============================================================================
"""

import sys
import os
import json
from http.server import BaseHTTPRequestHandler

# Add root and backend directories to sys.path
ROOT_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BACKEND_DIR = os.path.join(ROOT_DIR, "backend")

for d in [ROOT_DIR, BACKEND_DIR]:
    if d not in sys.path:
        sys.path.insert(0, d)

from database import init_database
from api_handler import APIHandler

# Initialize SQLite database (runs in /tmp on Vercel)
try:
    init_database()
except Exception as e:
    print(f"[VERCEL] Database initialization warning: {e}")

class handler(BaseHTTPRequestHandler):
    def address_string(self):
        return "127.0.0.1"

    def _dispatch(self):
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
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'success': False, 'error': str(e)}).encode('utf-8'))

    def do_GET(self):
        self._dispatch()

    def do_POST(self):
        self._dispatch()

    def do_PUT(self):
        self._dispatch()

    def do_DELETE(self):
        self._dispatch()

    def do_OPTIONS(self):
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', '*')
        self.send_header('Access-Control-Max-Age', '86400')
        self.send_header('Content-Length', '0')
        self.end_headers()
