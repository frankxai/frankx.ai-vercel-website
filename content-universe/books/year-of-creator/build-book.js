const fs = require('fs');
const path = require('path');
const config = require('./book-config.json');

// Auto-generate HTML reader with dynamic chapter loading
function buildBookHTML() {
    const chapters = config.book.chapters;
    
    // Generate navigation items
    const navItems = chapters.map(chapter => 
        `<div class="nav-item" data-chapter="${chapter.id}">${chapter.title}</div>`
    ).join('\n        ');

    // Generate chapter content loading
    const chapterContent = chapters.map(chapter => {
        let content = '';
        try {
            const filePath = path.join(__dirname, chapter.file);
            content = fs.readFileSync(filePath, 'utf8');
            // Convert markdown to simple HTML
            content = markdownToHTML(content);
        } catch (error) {
            content = '<p>Chapter not found. Please check the file path.</p>';
        }
        
        return {
            id: chapter.id,
            title: chapter.title,
            content: content
        };
    });

    const htmlTemplate = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${config.book.title} - ${config.book.subtitle}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        :root {
            --bg-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            --bg-secondary: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
            --text-primary: #2d3748;
            --text-secondary: #4a5568;
            --accent: #764ba2;
            --card-bg: rgba(255, 255, 255, 0.95);
            --shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        body {
            font-family: 'Georgia', serif;
            line-height: 1.8;
            color: var(--text-primary);
            min-height: 100vh;
            background: var(--bg-primary);
        }

        .background {
            position: fixed;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: -1;
            background: var(--bg-primary);
            opacity: 0.9;
        }

        .background::before {
            content: '';
            position: absolute;
            width: 200%;
            height: 200%;
            top: -50%;
            left: -50%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
            background-size: 50px 50px;
            animation: drift 20s linear infinite;
        }

        @keyframes drift {
            from { transform: translate(0, 0); }
            to { transform: translate(50px, 50px); }
        }

        header {
            background: var(--card-bg);
            backdrop-filter: blur(10px);
            padding: 2rem;
            box-shadow: var(--shadow);
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .header-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
        }

        h1 {
            font-size: 2rem;
            background: var(--bg-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .subtitle {
            color: var(--text-secondary);
            font-style: italic;
        }

        nav {
            background: var(--card-bg);
            backdrop-filter: blur(10px);
            padding: 1rem 2rem;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            position: sticky;
            top: 88px;
            z-index: 99;
            overflow-x: auto;
        }

        .nav-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            gap: 1rem;
            padding-bottom: 0.5rem;
            min-width: max-content;
        }

        .nav-item {
            padding: 0.5rem 1rem;
            background: white;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
            white-space: nowrap;
            border: 2px solid transparent;
            font-size: 0.9rem;
        }

        .nav-item:hover {
            background: var(--bg-primary);
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(118, 75, 162, 0.3);
        }

        .nav-item.active {
            background: var(--accent);
            color: white;
        }

        main {
            max-width: 900px;
            margin: 2rem auto;
            padding: 0 2rem 4rem;
        }

        .chapter {
            background: var(--card-bg);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 3rem;
            margin-bottom: 2rem;
            box-shadow: var(--shadow);
            display: none;
            animation: fadeIn 0.5s ease;
        }

        .chapter.active {
            display: block;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .chapter h1, .chapter h2 {
            font-size: 2.5rem;
            margin-bottom: 2rem;
            background: var(--bg-primary);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            line-height: 1.2;
        }

        .chapter h3 {
            font-size: 1.5rem;
            margin: 2rem 0 1rem;
            color: var(--accent);
        }

        .chapter h4 {
            font-size: 1.2rem;
            margin: 1.5rem 0 0.75rem;
            color: var(--text-primary);
        }

        .chapter p {
            margin-bottom: 1.5rem;
            font-size: 1.1rem;
            color: var(--text-primary);
            text-align: justify;
        }

        .chapter ul, .chapter ol {
            margin: 1.5rem 0;
            padding-left: 2rem;
        }

        .chapter li {
            margin-bottom: 0.75rem;
            color: var(--text-secondary);
        }

        .chapter blockquote {
            border-left: 4px solid var(--accent);
            padding-left: 1.5rem;
            margin: 2rem 0;
            font-style: italic;
            color: var(--text-secondary);
            background: rgba(118, 75, 162, 0.05);
            padding: 1rem 1.5rem;
            border-radius: 0 10px 10px 0;
        }

        .chapter strong {
            color: var(--accent);
            font-weight: 600;
        }

        .chapter em {
            color: var(--accent);
            font-style: italic;
        }

        .verification-notice {
            background: #fff3cd;
            border: 1px solid #ffeaa7;
            padding: 1rem;
            border-radius: 10px;
            margin: 1rem 0;
            font-size: 0.9rem;
            color: #856404;
        }

        .progress-bar {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 6px;
            background: rgba(255, 255, 255, 0.3);
            z-index: 101;
        }

        .progress-fill {
            height: 100%;
            background: var(--bg-secondary);
            width: 0%;
            transition: width 0.3s ease;
        }

        .controls {
            position: fixed;
            bottom: 2rem;
            right: 2rem;
            display: flex;
            gap: 1rem;
            z-index: 100;
        }

        .control-btn {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: var(--card-bg);
            border: 2px solid var(--accent);
            color: var(--accent);
            font-size: 1.2rem;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        }

        .control-btn:hover {
            background: var(--accent);
            color: white;
            transform: scale(1.1);
        }

        @media (max-width: 768px) {
            header {
                padding: 1rem;
            }

            h1 {
                font-size: 1.5rem;
            }

            .chapter {
                padding: 1.5rem;
            }

            .chapter h1, .chapter h2 {
                font-size: 1.8rem;
            }

            .nav-content {
                gap: 0.5rem;
            }

            .nav-item {
                font-size: 0.8rem;
                padding: 0.4rem 0.8rem;
            }

            .controls {
                bottom: 1rem;
                right: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="background"></div>

    <header>
        <div class="header-content">
            <div>
                <h1>${config.book.title}</h1>
                <div class="subtitle">${config.book.subtitle}</div>
            </div>
            <div>By ${config.book.author}</div>
        </div>
    </header>

    <nav>
        <div class="nav-content" id="nav-menu">
            ${navItems}
        </div>
    </nav>

    <main>
        <div id="content">
            ${chapterContent.map(chapter => `
                <div class="chapter" id="${chapter.id}">
                    ${chapter.content}
                </div>
            `).join('')}
        </div>
    </main>

    <div class="controls">
        <button class="control-btn" id="prev-btn" title="Previous Chapter">←</button>
        <button class="control-btn" id="next-btn" title="Next Chapter">→</button>
        <button class="control-btn" id="theme-btn" title="Toggle Theme">🌙</button>
    </div>

    <div class="progress-bar">
        <div class="progress-fill" id="progress"></div>
    </div>

    <script>
        const chapters = ${JSON.stringify(chapterContent.map(c => c.id))};
        let currentChapter = 0;

        function showChapter(index) {
            document.querySelectorAll('.chapter').forEach(ch => ch.classList.remove('active'));
            document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
            
            const chapterId = chapters[index];
            document.getElementById(chapterId).classList.add('active');
            document.querySelector(\`[data-chapter="\${chapterId}"]\`).classList.add('active');
            
            currentChapter = index;
            window.scrollTo({ top: 0, behavior: 'smooth' });
            updateProgress();
        }

        function updateProgress() {
            window.addEventListener('scroll', () => {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                document.getElementById('progress').style.width = scrolled + '%';
            });
        }

        // Navigation
        document.getElementById('nav-menu').addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-item')) {
                const chapterId = e.target.dataset.chapter;
                const index = chapters.indexOf(chapterId);
                showChapter(index);
            }
        });

        // Controls
        document.getElementById('prev-btn').addEventListener('click', () => {
            if (currentChapter > 0) showChapter(currentChapter - 1);
        });

        document.getElementById('next-btn').addEventListener('click', () => {
            if (currentChapter < chapters.length - 1) showChapter(currentChapter + 1);
        });

        // Theme toggle
        let darkMode = false;
        document.getElementById('theme-btn').addEventListener('click', () => {
            darkMode = !darkMode;
            if (darkMode) {
                document.documentElement.style.setProperty('--card-bg', 'rgba(30, 30, 30, 0.95)');
                document.documentElement.style.setProperty('--text-primary', '#e2e8f0');
                document.documentElement.style.setProperty('--text-secondary', '#cbd5e0');
                document.getElementById('theme-btn').textContent = '☀️';
            } else {
                document.documentElement.style.setProperty('--card-bg', 'rgba(255, 255, 255, 0.95)');
                document.documentElement.style.setProperty('--text-primary', '#2d3748');
                document.documentElement.style.setProperty('--text-secondary', '#4a5568');
                document.getElementById('theme-btn').textContent = '🌙';
            }
        });

        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && currentChapter > 0) {
                showChapter(currentChapter - 1);
            } else if (e.key === 'ArrowRight' && currentChapter < chapters.length - 1) {
                showChapter(currentChapter + 1);
            }
        });

        // Initialize
        showChapter(0);
    </script>
</body>
</html>`;

    fs.writeFileSync(path.join(__dirname, 'book-reader-auto.html'), htmlTemplate);
    console.log('Book HTML generated successfully!');
}

// Simple markdown to HTML converter
function markdownToHTML(markdown) {
    let html = markdown;
    
    // Convert headers
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^#### (.*$)/gim, '<h4>$1</h4>');
    
    // Convert bold and italic
    html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
    
    // Convert blockquotes
    html = html.replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>');
    
    // Convert verification notices
    html = html.replace(/\*\[Note:.*?\]\*/g, '<div class="verification-notice">⚠️ This chapter contains fictional examples pending verification with real case studies. See SOURCES-VERIFICATION.md for research status.</div>');
    html = html.replace(/\*\[NEEDS VERIFICATION:.*?\]\*/g, '<div class="verification-notice">📊 Data point requires verification from primary sources.</div>');
    html = html.replace(/\*\[FICTIONAL.*?\]\*/g, '<div class="verification-notice">🔄 Fictional example - needs replacement with verified case study.</div>');
    
    // Convert paragraphs
    html = html.replace(/\n\n/g, '</p><p>');
    html = '<p>' + html + '</p>';
    
    // Clean up empty paragraphs and fix formatting
    html = html.replace(/<p><\/p>/g, '');
    html = html.replace(/<p>(<h[1-6]>)/g, '$1');
    html = html.replace(/(<\/h[1-6]>)<\/p>/g, '$1');
    html = html.replace(/<p>(<blockquote>)/g, '$1');
    html = html.replace(/(<\/blockquote>)<\/p>/g, '$1');
    html = html.replace(/<p>(<div class="verification-notice">)/g, '$1');
    html = html.replace(/(<\/div>)<\/p>/g, '$1');
    
    return html;
}

// Auto-update chapter list when new chapters are added
function updateBookConfig() {
    const finalDir = path.join(__dirname, 'final');
    if (!fs.existsSync(finalDir)) return;
    
    const files = fs.readdirSync(finalDir);
    const existingChapters = config.book.chapters.map(ch => path.basename(ch.file));
    
    files.forEach(file => {
        if (file.endsWith('.md') && !existingChapters.includes(file)) {
            // Auto-detect new chapters
            const content = fs.readFileSync(path.join(finalDir, file), 'utf8');
            const titleMatch = content.match(/^# (.*?)$/m);
            const title = titleMatch ? titleMatch[1] : file.replace('.md', '');
            
            const chapterId = file.replace('.md', '').toLowerCase().replace(/[^a-z0-9]/g, '-');
            
            config.book.chapters.push({
                id: chapterId,
                title: title,
                file: `final/${file}`,
                status: "draft"
            });
            
            config.book.verification_status[chapterId] = "needs_real_stories";
        }
    });
    
    fs.writeFileSync(path.join(__dirname, 'book-config.json'), JSON.stringify(config, null, 2));
}

// Main execution
updateBookConfig();
buildBookHTML();