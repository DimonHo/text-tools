#!/usr/bin/env python3
"""
简单的HTTP服务器，用于运行文本处理工具网站
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # 添加CORS头部，允许跨域访问
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        # 允许在iframe中显示
        self.send_header('X-Frame-Options', 'ALLOWALL')
        super().end_headers()

def main():
    # 设置端口
    PORT = 12000
    
    # 切换到网站目录
    web_dir = Path(__file__).parent
    os.chdir(web_dir)
    
    # 创建服务器
    with socketserver.TCPServer(("0.0.0.0", PORT), CustomHTTPRequestHandler) as httpd:
        print(f"服务器启动成功！")
        print(f"本地访问: http://localhost:{PORT}")
        print(f"外部访问: https://work-1-xozywcrcxvotlanf.prod-runtime.all-hands.dev")
        print("按 Ctrl+C 停止服务器")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n服务器已停止")
            sys.exit(0)

if __name__ == "__main__":
    main()