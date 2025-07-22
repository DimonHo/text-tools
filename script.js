// 文本处理工具JavaScript功能

// 导航切换功能
document.addEventListener('DOMContentLoaded', function() {
    const navBtns = document.querySelectorAll('.nav-btn');
    const toolPanels = document.querySelectorAll('.tool-panel');

    navBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tool = this.getAttribute('data-tool');
            
            // 移除所有活动状态
            navBtns.forEach(b => b.classList.remove('active'));
            toolPanels.forEach(p => p.classList.remove('active'));
            
            // 添加当前活动状态
            this.classList.add('active');
            document.getElementById(tool + '-panel').classList.add('active');
        });
    });
});

// 通用工具函数
function showStatus(message, type = 'success', duration = 3000) {
    const statusElements = document.querySelectorAll('.status');
    statusElements.forEach(status => {
        status.textContent = message;
        status.className = `status ${type}`;
        status.style.display = 'block';
        
        setTimeout(() => {
            status.style.display = 'none';
        }, duration);
    });
}

function copyText(elementId) {
    const element = document.getElementById(elementId);
    if (element && element.value) {
        navigator.clipboard.writeText(element.value).then(() => {
            showStatus('已复制到剪贴板！', 'success', 2000);
            // 添加成功动画
            element.classList.add('success-animation');
            setTimeout(() => {
                element.classList.remove('success-animation');
            }, 300);
        }).catch(() => {
            showStatus('复制失败，请手动复制', 'error');
        });
    } else {
        showStatus('没有内容可复制', 'warning');
    }
}

function clearText(tool) {
    const inputElement = document.getElementById(tool + '-input');
    const outputElement = document.getElementById(tool + '-output');
    
    if (inputElement) inputElement.value = '';
    if (outputElement) outputElement.value = '';
    
    // 清除状态信息
    const statusElements = document.querySelectorAll('.status');
    statusElements.forEach(status => {
        status.style.display = 'none';
    });
}

// 转义/去转义功能
function escapeText() {
    const input = document.getElementById('escape-input').value;
    const output = document.getElementById('escape-output');
    
    if (!input.trim()) {
        showStatus('请输入要转义的文本', 'warning');
        return;
    }
    
    try {
        let escaped = input
            .replace(/\\/g, '\\\\')  // 反斜杠（必须先处理）
            .replace(/"/g, '\\"')    // 双引号
            .replace(/'/g, "\\'")    // 单引号
            .replace(/\n/g, '\\n')   // 换行符
            .replace(/\r/g, '\\r')   // 回车符
            .replace(/\t/g, '\\t')   // 制表符
            .replace(/\x08/g, '\\b') // 退格符（使用十六进制表示）
            .replace(/\f/g, '\\f')   // 换页符
            .replace(/\v/g, '\\v');  // 垂直制表符
        
        output.value = escaped;
        showStatus('转义完成！', 'success');
    } catch (error) {
        showStatus('转义失败：' + error.message, 'error');
    }
}

function unescapeText() {
    const input = document.getElementById('escape-input').value;
    const output = document.getElementById('escape-output');
    
    if (!input.trim()) {
        showStatus('请输入要去转义的文本', 'warning');
        return;
    }
    
    try {
        let unescaped = input
            .replace(/\\n/g, '\n')   // 换行符
            .replace(/\\r/g, '\r')   // 回车符
            .replace(/\\t/g, '\t')   // 制表符
            .replace(/\\b/g, '\b')   // 退格符
            .replace(/\\f/g, '\f')   // 换页符
            .replace(/\\v/g, '\v')   // 垂直制表符
            .replace(/\\"/g, '"')    // 双引号
            .replace(/\\'/g, "'")    // 单引号
            .replace(/\\\\/g, '\\'); // 反斜杠（最后处理）
        
        output.value = unescaped;
        showStatus('去转义完成！', 'success');
    } catch (error) {
        showStatus('去转义失败：' + error.message, 'error');
    }
}

// JSON格式化功能
function formatJson() {
    const input = document.getElementById('json-input').value;
    const output = document.getElementById('json-output');
    
    if (!input.trim()) {
        showStatus('请输入JSON数据', 'warning');
        return;
    }
    
    try {
        const parsed = JSON.parse(input);
        const formatted = JSON.stringify(parsed, null, 2);
        output.value = formatted;
        showStatus('JSON格式化完成！', 'success');
    } catch (error) {
        showStatus('JSON格式错误：' + error.message, 'error');
        output.value = '';
    }
}

function compressJson() {
    const input = document.getElementById('json-input').value;
    const output = document.getElementById('json-output');
    
    if (!input.trim()) {
        showStatus('请输入JSON数据', 'warning');
        return;
    }
    
    try {
        const parsed = JSON.parse(input);
        const compressed = JSON.stringify(parsed);
        output.value = compressed;
        showStatus('JSON压缩完成！', 'success');
    } catch (error) {
        showStatus('JSON格式错误：' + error.message, 'error');
        output.value = '';
    }
}

function validateJson() {
    const input = document.getElementById('json-input').value;
    
    if (!input.trim()) {
        showStatus('请输入JSON数据', 'warning');
        return;
    }
    
    try {
        JSON.parse(input);
        showStatus('JSON格式正确！', 'success');
    } catch (error) {
        showStatus('JSON格式错误：' + error.message, 'error');
    }
}

// 多行文本处理功能
function toQuotedList() {
    const input = document.getElementById('multiline-input').value;
    const output = document.getElementById('multiline-output');
    
    if (!input.trim()) {
        showStatus('请输入多行文本', 'warning');
        return;
    }
    
    try {
        const lines = input.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0)
            .map(line => `'${line}'`);
        
        output.value = lines.join(',\n');
        showStatus(`已转换 ${lines.length} 行文本！`, 'success');
    } catch (error) {
        showStatus('转换失败：' + error.message, 'error');
    }
}

function toCommaList() {
    const input = document.getElementById('multiline-input').value;
    const output = document.getElementById('multiline-output');
    
    if (!input.trim()) {
        showStatus('请输入多行文本', 'warning');
        return;
    }
    
    try {
        const lines = input.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
        
        output.value = lines.join(', ');
        showStatus(`已转换 ${lines.length} 行文本！`, 'success');
    } catch (error) {
        showStatus('转换失败：' + error.message, 'error');
    }
}

function toArray() {
    const input = document.getElementById('multiline-input').value;
    const output = document.getElementById('multiline-output');
    
    if (!input.trim()) {
        showStatus('请输入多行文本', 'warning');
        return;
    }
    
    try {
        const lines = input.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
        
        const array = JSON.stringify(lines, null, 2);
        output.value = array;
        showStatus(`已转换为包含 ${lines.length} 个元素的数组！`, 'success');
    } catch (error) {
        showStatus('转换失败：' + error.message, 'error');
    }
}

function removeDuplicates() {
    const input = document.getElementById('multiline-input').value;
    const output = document.getElementById('multiline-output');
    
    if (!input.trim()) {
        showStatus('请输入多行文本', 'warning');
        return;
    }
    
    try {
        const lines = input.split('\n')
            .map(line => line.trim())
            .filter(line => line.length > 0);
        
        const originalCount = lines.length;
        const uniqueLines = [...new Set(lines)];
        const duplicatesRemoved = originalCount - uniqueLines.length;
        
        output.value = uniqueLines.join('\n');
        showStatus(`去重完成！原有 ${originalCount} 行，去除 ${duplicatesRemoved} 个重复项`, 'success');
    } catch (error) {
        showStatus('去重失败：' + error.message, 'error');
    }
}

// Base64编码功能
function encodeBase64() {
    const input = document.getElementById('base64-input').value;
    const output = document.getElementById('base64-output');
    
    if (!input.trim()) {
        showStatus('请输入要编码的文本', 'warning');
        return;
    }
    
    try {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        output.value = encoded;
        showStatus('Base64编码完成！', 'success');
    } catch (error) {
        showStatus('编码失败：' + error.message, 'error');
    }
}

function decodeBase64() {
    const input = document.getElementById('base64-input').value;
    const output = document.getElementById('base64-output');
    
    if (!input.trim()) {
        showStatus('请输入要解码的Base64文本', 'warning');
        return;
    }
    
    try {
        const decoded = decodeURIComponent(escape(atob(input)));
        output.value = decoded;
        showStatus('Base64解码完成！', 'success');
    } catch (error) {
        showStatus('解码失败：请检查Base64格式是否正确', 'error');
    }
}

// URL编码功能
function encodeUrl() {
    const input = document.getElementById('url-input').value;
    const output = document.getElementById('url-output');
    
    if (!input.trim()) {
        showStatus('请输入要编码的URL或文本', 'warning');
        return;
    }
    
    try {
        const encoded = encodeURIComponent(input);
        output.value = encoded;
        showStatus('URL编码完成！', 'success');
    } catch (error) {
        showStatus('编码失败：' + error.message, 'error');
    }
}

function decodeUrl() {
    const input = document.getElementById('url-input').value;
    const output = document.getElementById('url-output');
    
    if (!input.trim()) {
        showStatus('请输入要解码的URL编码文本', 'warning');
        return;
    }
    
    try {
        const decoded = decodeURIComponent(input);
        output.value = decoded;
        showStatus('URL解码完成！', 'success');
    } catch (error) {
        showStatus('解码失败：请检查URL编码格式是否正确', 'error');
    }
}

// 哈希计算功能（使用Web Crypto API）
async function calculateMD5() {
    const input = document.getElementById('hash-input').value;
    const output = document.getElementById('hash-output');
    
    if (!input.trim()) {
        showStatus('请输入要计算哈希的文本', 'warning');
        return;
    }
    
    try {
        // 由于Web Crypto API不支持MD5，我们使用一个简单的MD5实现
        const md5Hash = await simpleMD5(input);
        output.value = `MD5: ${md5Hash}`;
        showStatus('MD5计算完成！', 'success');
    } catch (error) {
        showStatus('MD5计算失败：' + error.message, 'error');
    }
}

async function calculateSHA1() {
    const input = document.getElementById('hash-input').value;
    const output = document.getElementById('hash-output');
    
    if (!input.trim()) {
        showStatus('请输入要计算哈希的文本', 'warning');
        return;
    }
    
    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(input);
        const hashBuffer = await crypto.subtle.digest('SHA-1', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        output.value = `SHA1: ${hashHex}`;
        showStatus('SHA1计算完成！', 'success');
    } catch (error) {
        showStatus('SHA1计算失败：' + error.message, 'error');
    }
}

async function calculateSHA256() {
    const input = document.getElementById('hash-input').value;
    const output = document.getElementById('hash-output');
    
    if (!input.trim()) {
        showStatus('请输入要计算哈希的文本', 'warning');
        return;
    }
    
    try {
        const encoder = new TextEncoder();
        const data = encoder.encode(input);
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        
        output.value = `SHA256: ${hashHex}`;
        showStatus('SHA256计算完成！', 'success');
    } catch (error) {
        showStatus('SHA256计算失败：' + error.message, 'error');
    }
}

// 简单的MD5实现（用于演示，实际项目中建议使用专业的加密库）
async function simpleMD5(str) {
    // 这是一个简化的MD5实现，仅用于演示
    // 在实际项目中，建议使用crypto-js等专业库
    
    function rotateLeft(value, amount) {
        return (value << amount) | (value >>> (32 - amount));
    }
    
    function addUnsigned(x, y) {
        return ((x & 0x7FFFFFFF) + (y & 0x7FFFFFFF)) ^ (x & 0x80000000) ^ (y & 0x80000000);
    }
    
    function md5cmn(q, a, b, x, s, t) {
        return addUnsigned(rotateLeft(addUnsigned(addUnsigned(a, q), addUnsigned(x, t)), s), b);
    }
    
    function md5ff(a, b, c, d, x, s, t) {
        return md5cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }
    
    function md5gg(a, b, c, d, x, s, t) {
        return md5cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }
    
    function md5hh(a, b, c, d, x, s, t) {
        return md5cmn(b ^ c ^ d, a, b, x, s, t);
    }
    
    function md5ii(a, b, c, d, x, s, t) {
        return md5cmn(c ^ (b | (~d)), a, b, x, s, t);
    }
    
    function convertToWordArray(str) {
        let wordArray = [];
        let wordCount = (((str.length + 8) - ((str.length + 8) % 64)) / 64 + 1) * 16;
        
        for (let i = 0; i < wordCount; i++) {
            wordArray[i] = 0;
        }
        
        for (let i = 0; i < str.length; i++) {
            wordArray[i >> 2] |= (str.charCodeAt(i) & 0xFF) << ((i % 4) * 8);
        }
        
        wordArray[str.length >> 2] |= 0x80 << ((str.length % 4) * 8);
        wordArray[wordCount - 2] = str.length * 8;
        
        return wordArray;
    }
    
    function wordToHex(value) {
        let hex = '';
        for (let i = 0; i <= 3; i++) {
            let byte = (value >>> (i * 8)) & 255;
            hex += ('0' + byte.toString(16)).slice(-2);
        }
        return hex;
    }
    
    let x = convertToWordArray(str);
    let a = 0x67452301;
    let b = 0xEFCDAB89;
    let c = 0x98BADCFE;
    let d = 0x10325476;
    
    for (let i = 0; i < x.length; i += 16) {
        let olda = a;
        let oldb = b;
        let oldc = c;
        let oldd = d;
        
        a = md5ff(a, b, c, d, x[i + 0], 7, 0xD76AA478);
        d = md5ff(d, a, b, c, x[i + 1], 12, 0xE8C7B756);
        c = md5ff(c, d, a, b, x[i + 2], 17, 0x242070DB);
        b = md5ff(b, c, d, a, x[i + 3], 22, 0xC1BDCEEE);
        a = md5ff(a, b, c, d, x[i + 4], 7, 0xF57C0FAF);
        d = md5ff(d, a, b, c, x[i + 5], 12, 0x4787C62A);
        c = md5ff(c, d, a, b, x[i + 6], 17, 0xA8304613);
        b = md5ff(b, c, d, a, x[i + 7], 22, 0xFD469501);
        a = md5ff(a, b, c, d, x[i + 8], 7, 0x698098D8);
        d = md5ff(d, a, b, c, x[i + 9], 12, 0x8B44F7AF);
        c = md5ff(c, d, a, b, x[i + 10], 17, 0xFFFF5BB1);
        b = md5ff(b, c, d, a, x[i + 11], 22, 0x895CD7BE);
        a = md5ff(a, b, c, d, x[i + 12], 7, 0x6B901122);
        d = md5ff(d, a, b, c, x[i + 13], 12, 0xFD987193);
        c = md5ff(c, d, a, b, x[i + 14], 17, 0xA679438E);
        b = md5ff(b, c, d, a, x[i + 15], 22, 0x49B40821);
        
        a = md5gg(a, b, c, d, x[i + 1], 5, 0xF61E2562);
        d = md5gg(d, a, b, c, x[i + 6], 9, 0xC040B340);
        c = md5gg(c, d, a, b, x[i + 11], 14, 0x265E5A51);
        b = md5gg(b, c, d, a, x[i + 0], 20, 0xE9B6C7AA);
        a = md5gg(a, b, c, d, x[i + 5], 5, 0xD62F105D);
        d = md5gg(d, a, b, c, x[i + 10], 9, 0x2441453);
        c = md5gg(c, d, a, b, x[i + 15], 14, 0xD8A1E681);
        b = md5gg(b, c, d, a, x[i + 4], 20, 0xE7D3FBC8);
        a = md5gg(a, b, c, d, x[i + 9], 5, 0x21E1CDE6);
        d = md5gg(d, a, b, c, x[i + 14], 9, 0xC33707D6);
        c = md5gg(c, d, a, b, x[i + 3], 14, 0xF4D50D87);
        b = md5gg(b, c, d, a, x[i + 8], 20, 0x455A14ED);
        a = md5gg(a, b, c, d, x[i + 13], 5, 0xA9E3E905);
        d = md5gg(d, a, b, c, x[i + 2], 9, 0xFCEFA3F8);
        c = md5gg(c, d, a, b, x[i + 7], 14, 0x676F02D9);
        b = md5gg(b, c, d, a, x[i + 12], 20, 0x8D2A4C8A);
        
        a = md5hh(a, b, c, d, x[i + 5], 4, 0xFFFA3942);
        d = md5hh(d, a, b, c, x[i + 8], 11, 0x8771F681);
        c = md5hh(c, d, a, b, x[i + 11], 16, 0x6D9D6122);
        b = md5hh(b, c, d, a, x[i + 14], 23, 0xFDE5380C);
        a = md5hh(a, b, c, d, x[i + 1], 4, 0xA4BEEA44);
        d = md5hh(d, a, b, c, x[i + 4], 11, 0x4BDECFA9);
        c = md5hh(c, d, a, b, x[i + 7], 16, 0xF6BB4B60);
        b = md5hh(b, c, d, a, x[i + 10], 23, 0xBEBFBC70);
        a = md5hh(a, b, c, d, x[i + 13], 4, 0x289B7EC6);
        d = md5hh(d, a, b, c, x[i + 0], 11, 0xEAA127FA);
        c = md5hh(c, d, a, b, x[i + 3], 16, 0xD4EF3085);
        b = md5hh(b, c, d, a, x[i + 6], 23, 0x4881D05);
        a = md5hh(a, b, c, d, x[i + 9], 4, 0xD9D4D039);
        d = md5hh(d, a, b, c, x[i + 12], 11, 0xE6DB99E5);
        c = md5hh(c, d, a, b, x[i + 15], 16, 0x1FA27CF8);
        b = md5hh(b, c, d, a, x[i + 2], 23, 0xC4AC5665);
        
        a = md5ii(a, b, c, d, x[i + 0], 6, 0xF4292244);
        d = md5ii(d, a, b, c, x[i + 7], 10, 0x432AFF97);
        c = md5ii(c, d, a, b, x[i + 14], 15, 0xAB9423A7);
        b = md5ii(b, c, d, a, x[i + 5], 21, 0xFC93A039);
        a = md5ii(a, b, c, d, x[i + 12], 6, 0x655B59C3);
        d = md5ii(d, a, b, c, x[i + 3], 10, 0x8F0CCC92);
        c = md5ii(c, d, a, b, x[i + 10], 15, 0xFFEFF47D);
        b = md5ii(b, c, d, a, x[i + 1], 21, 0x85845DD1);
        a = md5ii(a, b, c, d, x[i + 8], 6, 0x6FA87E4F);
        d = md5ii(d, a, b, c, x[i + 15], 10, 0xFE2CE6E0);
        c = md5ii(c, d, a, b, x[i + 6], 15, 0xA3014314);
        b = md5ii(b, c, d, a, x[i + 13], 21, 0x4E0811A1);
        a = md5ii(a, b, c, d, x[i + 4], 6, 0xF7537E82);
        d = md5ii(d, a, b, c, x[i + 11], 10, 0xBD3AF235);
        c = md5ii(c, d, a, b, x[i + 2], 15, 0x2AD7D2BB);
        b = md5ii(b, c, d, a, x[i + 9], 21, 0xEB86D391);
        
        a = addUnsigned(a, olda);
        b = addUnsigned(b, oldb);
        c = addUnsigned(c, oldc);
        d = addUnsigned(d, oldd);
    }
    
    return (wordToHex(a) + wordToHex(b) + wordToHex(c) + wordToHex(d)).toLowerCase();
}

// 键盘快捷键支持
document.addEventListener('keydown', function(e) {
    // Ctrl+Enter 执行当前工具的主要功能
    if (e.ctrlKey && e.key === 'Enter') {
        const activePanel = document.querySelector('.tool-panel.active');
        if (activePanel) {
            const panelId = activePanel.id;
            switch (panelId) {
                case 'escape-panel':
                    escapeText();
                    break;
                case 'json-panel':
                    formatJson();
                    break;
                case 'multiline-panel':
                    toQuotedList();
                    break;
                case 'base64-panel':
                    encodeBase64();
                    break;
                case 'url-panel':
                    encodeUrl();
                    break;
                case 'hash-panel':
                    calculateSHA256();
                    break;
            }
        }
        e.preventDefault();
    }
    
    // Ctrl+L 清空当前工具
    if (e.ctrlKey && e.key === 'l') {
        const activePanel = document.querySelector('.tool-panel.active');
        if (activePanel) {
            const tool = activePanel.id.replace('-panel', '');
            clearText(tool);
        }
        e.preventDefault();
    }
});

// 添加工具提示
document.addEventListener('DOMContentLoaded', function() {
    // 为按钮添加工具提示
    const tooltips = {
        'escape': '转义特殊字符，如换行符、引号等',
        'json': '格式化和验证JSON数据',
        'multiline': '处理多行文本，转换为各种格式',
        'base64': 'Base64编码和解码',
        'url': 'URL编码和解码',
        'hash': '计算文本的哈希值'
    };
    
    Object.keys(tooltips).forEach(key => {
        const btn = document.querySelector(`[data-tool="${key}"]`);
        if (btn) {
            btn.setAttribute('title', tooltips[key]);
        }
    });
});

// 自动保存功能（使用localStorage）
function autoSave() {
    const inputs = document.querySelectorAll('textarea[id$="-input"]');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            localStorage.setItem(this.id, this.value);
        });
        
        // 页面加载时恢复内容
        const saved = localStorage.getItem(input.id);
        if (saved) {
            input.value = saved;
        }
    });
}

// 初始化自动保存
document.addEventListener('DOMContentLoaded', autoSave);