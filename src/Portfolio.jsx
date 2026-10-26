import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Moon, Sun, Mail, Linkedin, Github, ExternalLink, ChevronDown, Download, ArrowRight, Code2, Database, Globe, Terminal, Cpu, ChevronLeft, ChevronRight, X, Send, Briefcase, GraduationCap, Award, MapPin, Calendar, Wrench, Users, MonitorSmartphone, Server, GitBranch, Lightbulb, Layers } from 'lucide-react';

// ============================================
// ABEED MULLA — PORTFOLIO
// ============================================

// Project Data
// Content below was reviewed against each project's source code. Order sets the showcase layout:
// the first project (featured) gets the large card, the rest share the row beneath it.
const projectsData = [
    {
        id: 'interntracker', // kept from the original "InternTracker" name so existing #project/interntracker links keep working
        title: 'InternTrack',
        subtitle: 'Full-Stack Web Application',
        featured: true,
        description: 'A web application for managing job applications, tracking progress, and comparing résumés with job descriptions to identify relevant skills and keywords.',
        cardTech: ['React', 'Firebase', 'Tailwind CSS', 'Vite', 'Vercel'],
        highlights: [
            'Authentication and user-specific application tracking',
            'Application management with search and filtering',
            'Interactive dashboard with application statistics',
            'Résumé–job description keyword matching',
            'Responsive interface for desktop and mobile',
        ],
        thumbnail: '/images/InternTrack/dashboard-filled.png',
        imageSize: { width: 2043, height: 1172 },
        images: [
            { src: '/images/InternTrack/dashboard-filled.png', caption: 'Dashboard with application statistics and status breakdown' },
            { src: '/images/InternTrack/tracker-list.png', caption: 'Application tracker with search and status filters' },
            { src: '/images/InternTrack/resume-matcher.png', caption: 'Résumé–job description keyword matcher' },
        ],
        overview: 'InternTrack keeps job applications in one place. Each user gets a private dashboard to log applications, follow their status, and compare a résumé against a job description to see which keywords match and which are missing.',
        problem: "Tracking applications across spreadsheets, notes, and email threads makes it easy to lose track of where each one stands. It's also hard to tell how closely a résumé lines up with a specific job description before applying. I built InternTrack to replace the spreadsheet I was using for my own applications.",
        solution: "A React single-page app backed by Firebase. Firebase Authentication handles sign-in, and each user's applications are stored under their own Firestore path, with real-time listeners keeping the dashboard and tracker up to date. The résumé matcher extracts text from an uploaded PDF using pdf.js, pulls keywords from both documents, and reports a match score with matched and missing keywords.",
        techStack: ['React 18', 'Vite', 'Tailwind CSS', 'React Router', 'Firebase Auth', 'Cloud Firestore', 'pdf.js', 'Vercel'],
        decisions: [
            { title: 'React + Vite', content: 'Component-based UI with a fast dev server and hot reload, which kept iteration quick while building and restyling pages.' },
            { title: 'Firebase instead of a custom backend', content: 'Authentication and a real-time database without running a server. For a solo project, that meant more time on the product and less on infrastructure.' },
            { title: 'Per-user Firestore paths', content: "Applications are stored under users/{uid}/applications, so every read and write is scoped to the signed-in user's own data." },
            { title: 'Transparent keyword matching', content: 'The match score is the share of job-description keywords that also appear in the résumé. It is intentionally simple: users can see exactly which keywords matched and which are missing, instead of trusting an opaque score.' },
            { title: 'Tailwind CSS + Vercel', content: 'Tailwind made the responsive layout fast to build without separate stylesheets, and Vercel handled deployment with environment variables for the Firebase configuration.' },
        ],
        features: [
            'Email/password authentication with protected routes',
            'Add, edit, and delete applications',
            'Search by company or role, and filter by status (Applied, OA, Interview, Rejected, Offer)',
            'Dashboard with application counts and status breakdown',
            'Résumé matcher showing a match score, matched keywords, and missing keywords',
            'PDF résumé upload with text extraction via pdf.js',
            'Real-time updates using Firestore listeners',
            'Light and dark themes with a responsive layout',
        ],
        challenges: [
            { title: 'Keeping user data isolated', content: "Designing the Firestore data model around the signed-in user was the main challenge. Nesting applications under each user's document scopes every query to that user and keeps the data model simple." },
            { title: 'Authentication state', content: "Managing auth state with React Context took iteration — particularly loading states, so protected pages don't flash or redirect before Firebase has restored the session." },
        ],
        learned: [
            'Structuring Firestore data around per-user paths',
            'Managing global authentication state with React Context',
            'Handling real-time updates with Firestore onSnapshot listeners',
            'Deploying a Vite + Firebase app on Vercel with environment variables',
        ],
        futureImprovements: [
            'OAuth sign-in with Google or GitHub',
            'Drag-and-drop ordering of applications by priority',
            'Email reminders for follow-ups',
            'Smarter matching that handles synonyms and related terms, not just exact keywords',
        ],
        github: 'https://github.com/AbeedMulla/interntrack',
        live: 'https://interntrack-henna.vercel.app',
    },
    {
        id: 'http-server',
        title: 'Custom HTTP Server & Reverse Proxy',
        subtitle: 'Backend & Networking',
        description: 'Built an HTTP server and reverse proxy using raw TCP sockets, with request parsing, routing, health checks, and round-robin load balancing.',
        cardTech: ['Node.js', 'TCP Sockets', 'HTTP', 'Networking'],
        highlights: [
            'Low-level TCP socket programming',
            'Manual HTTP request and response handling',
            'Reverse proxy routing',
            'Round-robin load balancing across three backend servers',
            'Backend health checks and error handling',
        ],
        thumbnail: '/images/http-server-proxy/server-startup.png',
        cardImage: '/images/http-server-proxy/load-balancing.png',
        cardImageSize: { width: 1702, height: 1374 },
        isTerminalScreenshot: true, // Flag for terminal/CLI screenshots
        images: [
            { src: '/images/http-server-proxy/server-startup.png', caption: 'Server startup showing the proxy listening on port 8080 with three backend servers' },
            { src: '/images/http-server-proxy/load-balancing.png', caption: 'Round-robin load balancing distributing requests across backends 3001, 3002, and 3003' },
            { src: '/images/http-server-proxy/request-logging.png', caption: 'Request logging with a retry on another backend when 3001 is unavailable' },
            { src: '/images/http-server-proxy/health-check.png', caption: 'Health endpoint showing backend status and failure counts' },
        ],
        overview: "A from-scratch HTTP server and reverse proxy built on Node.js's net module — no Express and no http module. It reads raw bytes from TCP sockets, parses them into HTTP requests, and either responds directly or forwards the request to one of three backend servers.",
        problem: "Most developers use HTTP every day without seeing what happens beneath frameworks like Express or Flask. I wanted to understand it properly: how a server turns raw bytes into headers and a body, how a reverse proxy routes requests, and how a load balancer spreads traffic and copes with failing servers.",
        solution: "The server buffers incoming TCP data until it has a complete request — headers ending in \\r\\n\\r\\n, plus Content-Length bytes of body — then parses it and passes it to a router. The proxy handles / and /health itself and forwards /api/* requests to a backend chosen by a round-robin load balancer. Failing backends are tracked and skipped, and a failed request is retried on the next backend before the proxy returns a 502 or 503.",
        techStack: ['Node.js', 'net module (TCP)', 'HTTP/1.1', 'Round-Robin Load Balancing'],
        decisions: [
            { title: 'Raw TCP with the net module', content: "Node's net module gives direct access to TCP sockets while staying approachable. Everything above the socket — parsing, routing, proxying — is hand-written." },
            { title: 'No external dependencies', content: 'The server, proxy, and load balancer use only Node built-ins, and the unit tests are plain Node scripts. Nothing is hidden behind a library.' },
            { title: 'One request per connection', content: 'Responses are sent with Connection: close and the socket is closed afterwards. This keeps request framing simple, at the cost of connection reuse — keep-alive is on the improvement list.' },
            { title: 'Passive health tracking', content: 'Instead of polling backends, failures are recorded during real requests. A backend is marked unhealthy after 3 consecutive failures and given another chance after 30 seconds.' },
            { title: 'Round-robin selection', content: 'Simple and stateless: each request goes to the next healthy backend in order. It assumes backends have equal capacity, which is a reasonable starting point for identical local servers.' },
        ],
        features: [
            'HTTP request parsing from raw TCP byte streams',
            'Request buffering until headers and the Content-Length body are complete',
            'Case-insensitive header parsing and query-string parsing',
            'Local routes (/ and /health) alongside proxied /api/* routes',
            'Round-robin load balancing across three configurable backends',
            'Passive health tracking with automatic recovery after 30 seconds',
            'Retry on the next backend, with 502/503 responses when backends fail',
            'Backend (5 s) and idle-client (30 s) socket timeouts',
            'Colour-coded request logging with response times',
            'Unit tests for the HTTP parser and load balancer',
        ],
        httpExplanation: {
            title: 'How HTTP Works (At the Byte Level)',
            content: `HTTP is a plain-text protocol running over TCP. When your browser requests a page, it sends something like:

GET /index.html HTTP/1.1\\r\\n
Host: example.com\\r\\n
User-Agent: Mozilla/5.0\\r\\n
\\r\\n

The request ends with a blank line (\\r\\n\\r\\n). The server reads this from a TCP socket as raw bytes, parses the method (GET), path (/index.html), and headers, then sends back:

HTTP/1.1 200 OK\\r\\n
Content-Type: text/html\\r\\n
Content-Length: 1234\\r\\n
\\r\\n
<html>...</html>

My server does all of this manually — reading bytes, finding the header boundary, parsing each line, and building the response as text.`,
        },
        architectureDiagram: {
            title: 'Request Flow',
            steps: [
                { step: 1, label: 'Client', description: 'Sends an HTTP request to the proxy on port 8080' },
                { step: 2, label: 'Reverse Proxy', description: 'Parses the request; the router decides whether to handle it locally or forward it' },
                { step: 3, label: 'Load Balancer', description: 'Picks the next healthy backend using round-robin' },
                { step: 4, label: 'Backend Server', description: 'Processes the request and sends a response' },
                { step: 5, label: 'Proxy → Client', description: 'Forwards the response back to the client and closes the connection' },
            ],
        },
        codeExamples: [
            {
                title: 'Starting the servers',
                code: `# Start three backend servers (one per terminal)
node backends/simple-backend.js 3001
node backends/simple-backend.js 3002
node backends/simple-backend.js 3003

# Start the reverse proxy (listens on port 8080)
node src/server.js`,
            },
            {
                title: 'Testing with curl',
                code: `# Routes handled by the proxy itself
curl http://localhost:8080/
curl http://localhost:8080/health

# Proxied to a backend
curl http://localhost:8080/api/users

# POST with a JSON body
curl -X POST http://localhost:8080/api/echo \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Abeed"}'

# Watch round-robin load balancing
for i in {1..6}; do curl -s http://localhost:8080/api/data; echo; done`,
            },
            {
                title: 'Running the unit tests',
                code: `npm test`,
            },
        ],
        challenges: [
            {
                title: 'TCP is a stream, not messages',
                content: "TCP doesn't preserve message boundaries. One HTTP request can arrive across several data events, so the server accumulates chunks in a buffer and only parses once it has seen the header terminator (\\r\\n\\r\\n) and the full Content-Length body. Idle connections are closed after 30 seconds.",
            },
            {
                title: 'Handling backend failures',
                content: 'Backends can refuse connections, time out, or close early. The proxy applies a 5-second backend timeout, records each failure against that backend, and retries on the next one before returning a 502 or 503 to the client.',
            },
            {
                title: 'Round-robin trade-offs',
                content: 'Round-robin is simple but naive — it assumes all backends have equal capacity. A better approach for uneven servers would be least-connections (route to the backend with the fewest active requests) or weighted distribution.',
            },
        ],
        learned: [
            "TCP is a stream protocol — messages aren't automatically delimited",
            'HTTP is plain text, which makes it debuggable but requires careful parsing',
            'Load balancers need health tracking to avoid sending traffic to dead backends',
            'Error handling in network code is critical — connections drop and timeouts happen',
            'Buffering strategies matter for both performance and correctness',
        ],
        futureImprovements: [
            'HTTP keep-alive for connection reuse',
            'Chunked transfer encoding support',
            'HTTPS support with TLS termination at the proxy',
            'Active health-check probes and weighted load balancing',
            'Response caching for static content',
            'Graceful shutdown with connection draining',
        ],
        github: 'https://github.com/AbeedMulla/http-server-proxy',
        live: null,
    },
    {
        id: 'studenthub',
        title: 'StudentHub',
        subtitle: 'Android Application',
        description: 'An Android application that helps students manage classes, assignments, and focus sessions, with offline data storage and cloud sync.',
        cardTech: ['Java', 'Android', 'Firebase', 'Room', 'LiveData'],
        highlights: [
            'Native Android app written in Java',
            'Repository pattern with Room DAOs exposing LiveData to the UI',
            'Offline-first storage in Room (SQLite) with Firestore sync',
            'Firebase Authentication with per-user cloud data',
            'Class scheduling and assignment tracking with priorities and due dates',
            'Pomodoro focus mode running in a foreground service',
        ],
        thumbnail: '/images/StudentHub/Dashboard_filled.png',
        cardImages: [
            '/images/StudentHub/assignments_list.png',
            '/images/StudentHub/Dashboard_filled.png',
            '/images/StudentHub/focus_running.png',
        ],
        isMobileApp: true, // Flag for mobile app screenshots (portrait orientation)
        images: [
            { src: '/images/StudentHub/Dashboard_filled.png', caption: "Dashboard with the next class, upcoming assignments, and today's tasks" },
            { src: '/images/StudentHub/schedule_week.png', caption: 'Weekly schedule view with class times' },
            { src: '/images/StudentHub/assignments_list.png', caption: 'Assignment tracker with priorities and due dates' },
            { src: '/images/StudentHub/focus_running.png', caption: 'Pomodoro focus mode with session tracking' },
            { src: '/images/StudentHub/settings_notifications.png', caption: 'Settings with notification and quiet-hours preferences' },
        ],
        overview: 'StudentHub is an Android app for managing academic life: class schedules, assignments, daily tasks, and a Pomodoro-style focus timer. Data is stored on the device first, so the app keeps working without a connection, and syncs to Firebase when one is available.',
        problem: "Students juggle classes, assignments, and deadlines while trying to stay focused. Most apps handle only one piece — a calendar, a to-do list, or a timer — and apps that depend on a connection become frustrating in places with poor signal, like lecture halls.",
        solution: 'Every write goes to a local Room database first, and a repository layer syncs changes with Cloud Firestore on app launch and on manual refresh. Each record carries an updatedAt timestamp, a synced flag, and a soft-delete flag, so the app knows what to push and resolves conflicts with a last-write-wins rule. The focus timer runs in a foreground service so it keeps going when the app is in the background.',
        techStack: ['Java', 'Android SDK', 'Material Components', 'Room (SQLite)', 'LiveData', 'Firebase Auth', 'Cloud Firestore', 'Foreground Service'],
        decisions: [
            { title: 'Java for Android fundamentals', content: 'I chose Java over Kotlin to build a solid understanding of the core Android APIs and lifecycle.' },
            { title: 'Repository as the single source of truth', content: 'A DataRepository coordinates between Room and Firestore, so the UI never talks to the network directly and always reads from local data.' },
            { title: 'Room for local storage', content: 'Room gives compile-time-checked SQL queries and returns LiveData, so screens update automatically when the underlying data changes.' },
            { title: 'Firebase for auth and sync', content: 'Firebase Authentication and Cloud Firestore handle accounts and cloud backup without building a custom backend.' },
            { title: 'Foreground service for the timer', content: "Android limits background work, so the Pomodoro timer runs as a foreground service with a persistent notification rather than relying on the app staying open." },
        ],
        features: [
            'Firebase Authentication with email and password',
            "Dashboard with the next class, upcoming assignments, a focus shortcut, and today's tasks",
            'Today and week schedule views',
            'Assignment tracking with priority levels, due dates, and completion status',
            'Pomodoro focus mode with configurable work, break, and long-break durations',
            'Offline-first storage with Firestore sync on launch and manual refresh',
            'Connectivity monitoring to detect when the device is online',
            'Settings for theme, focus durations, and notification preferences',
        ],
        architectureDetails: {
            layers: [
                { name: 'UI Layer', description: 'Activities and Fragments with Material Components that observe LiveData from the repository' },
                { name: 'Repository', description: 'DataRepository — the single source of truth that coordinates local Room data and remote Firestore sync' },
                { name: 'Local Data', description: 'Room entities and DAOs for classes, assignments, and tasks, exposing LiveData queries' },
                { name: 'Remote Data', description: 'FirestoreManager for per-user cloud storage, used to push local changes and pull remote updates' },
            ],
        },
        challenges: [
            {
                title: 'Offline-first sync',
                content: 'All writes go to Room first and are marked unsynced. When the app syncs, it pushes local changes and then pulls remote data, keeping whichever version has the newer updatedAt timestamp (last write wins).',
            },
            {
                title: 'Deletes that sync correctly',
                content: "If a record is removed locally before it syncs, the cloud copy would simply come back on the next pull. Records are therefore soft-deleted with a deleted flag, so the deletion itself is synced.",
            },
            {
                title: 'Keeping the focus timer alive',
                content: "Android's background execution limits can stop work when the user leaves the app. Running the timer in a foreground service with an ongoing notification keeps sessions accurate and visible.",
            },
        ],
        learned: [
            'Structuring an Android app around a repository with Room and LiveData',
            'Designing offline-first sync with timestamps, sync flags, and soft deletes',
            'Using foreground services for long-running user-visible work',
            "Working within Android's lifecycle and background execution limits",
        ],
        futureImprovements: [
            'Complete location-based Home/Campus modes (the geofence receiver exists; registration is still to do)',
            'Scheduled assignment reminders with WorkManager that respect quiet hours',
            'ViewModels between the UI and repository for a full MVVM architecture',
            'Home-screen widget for a quick view of today',
            'Google Calendar sync',
        ],
        github: 'https://github.com/AbeedMulla/StudentHub',
        live: null,
    },
];

// Experience & Education Data
const axisExperience = {
    company: 'AXIS Capital',
    url: 'https://www.axiscapital.com/canada/home',
    location: 'Halifax, Nova Scotia',
    roles: [
        {
            title: 'Software Engineer Intern',
            type: 'Part-time',
            date: 'Sep 2026 – Present',
            current: true,
            description: 'Continuing to contribute to Compass NextGen, an internal reinsurance workflow platform, by developing and maintaining full-stack functionality.',
            points: [
                'Develop and maintain application features using React, TypeScript, backend APIs, and SQL Server.',
                'Contribute to UI improvements, API integration, bug fixes, and application functionality.',
                'Collaborate with engineers through code reviews, Git, Azure DevOps, and Agile development workflows.',
            ],
        },
        {
            title: 'Reinsurance Systems Engineer Co-op',
            type: 'Co-op',
            date: 'May 2026 – Aug 2026',
            current: false,
            description: 'Contributed to the development of Compass NextGen, helping modernize internal reinsurance workflows through full-stack application development.',
            points: [
                'Completed 25+ user stories and bug fixes involving contract management, validation, coverage, and UI/UX functionality.',
                'Developed features using React and TypeScript, including contract-related functionality and business-rule validation.',
                'Implemented improvements involving filtering, data synchronization, and application workflows.',
            ],
        },
    ],
    tags: ['React', 'TypeScript', '.NET APIs', 'SQL Server', 'Git', 'Azure DevOps', 'Agile'],
};

const previousTechExperience = [
    {
        title: 'Data Analyst',
        org: 'Mandovi Drydocks',
        location: 'Goa, India',
        date: 'May 2023 – Aug 2023',
        description: 'Worked with Excel and SQL to analyze operational data, improve data quality, and support reporting and business decisions.',
        tags: ['SQL', 'Excel', 'Data Analysis', 'Reporting'],
    },
    {
        title: 'IT Support',
        org: 'Sian Technologies',
        location: 'Goa, India',
        date: 'Aug 2021 – May 2022',
        description: 'Provided technical support by troubleshooting hardware, software, Windows systems, and networking issues while resolving support requests.',
        tags: ['Troubleshooting', 'Windows', 'Networking', 'Technical Support'],
    },
];

const educationData = {
    school: 'Dalhousie University',
    url: 'https://www.dal.ca',
    degree: 'Bachelor of Computer Science (Honours, Co-op)',
    location: 'Halifax, Nova Scotia',
    date: 'Sep 2022 – Expected Dec 2026',
    award: {
        title: 'Sexton Scholar',
        summary: '3 Terms',
        terms: ['Summer 2025', 'Fall 2025', 'Winter 2026'],
    },
};

const otherWorkExperience = [
    {
        title: 'Cashier & Line Cook',
        org: "McDonald's",
        location: 'Halifax, Nova Scotia',
        date: 'Dec 2025 – Aug 2026',
        description: 'Worked in a fast-paced environment, handling customer service, food preparation, and daily operations while collaborating with team members.',
    },
    {
        title: 'Grill Cook',
        org: 'Mezza Lebanese Kitchen',
        location: 'Halifax, Nova Scotia',
        date: 'Oct 2022 – Mar 2023',
        description: 'Supported kitchen operations, food preparation, and team coordination in a fast-paced restaurant environment.',
    },
];

const skillsData = {
    'Languages': [
        'TypeScript', 'JavaScript', 'Java', 'Python',
        'C#', 'C++', 'C', 'SQL'
    ],
    'Frontend & Mobile': [
        'React', 'React Native', 'Tailwind CSS',
        'HTML5', 'CSS3', 'Android'
    ],
    'Backend & APIs': [
        '.NET APIs', 'Node.js', 'REST APIs', 'Firebase'
    ],
    'Databases': [
        'SQL Server', 'MySQL', 'PostgreSQL',
        'SQLite', 'Firebase Firestore'
    ],
    'Developer Tools': [
        'Git', 'GitHub', 'Azure DevOps',
        'Visual Studio', 'VS Code', 'Postman',
        'Linux', 'Android Studio', 'Jira'
    ],
    'Engineering Concepts': [
        'Object-Oriented Programming',
        'Data Structures & Algorithms',
        'Agile Development',
        'API Integration',
        'Code Reviews'
    ],
};

const skillIcons = {
    'Languages': Terminal,
    'Frontend & Mobile': MonitorSmartphone,
    'Backend & APIs': Server,
    'Databases': Database,
    'Developer Tools': GitBranch,
    'Engineering Concepts': Lightbulb,
};

const professionalStack = ['React', 'TypeScript', '.NET APIs', 'SQL Server', 'Azure DevOps', 'Git'];

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
];

const RESUME_URL = '/resume.pdf';
const RESUME_FILENAME = 'Abeed_Mulla_Resume.pdf';

const contactLinks = [
    { label: 'GitHub', value: 'AbeedMulla', href: 'https://github.com/AbeedMulla', icon: Github, external: true },
    { label: 'LinkedIn', value: 'abeed-mulla', href: 'https://www.linkedin.com/in/abeed-mulla', icon: Linkedin, external: true },
    { label: 'Email', value: 'abeedmulla10@gmail.com', href: 'mailto:abeedmulla10@gmail.com', icon: Mail },
];

// ============================================
// MAIN APP WITH ROUTING
// ============================================

function LoadingScreen({ darkMode }) {
    return (
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          background: darkMode ? '#050507' : '#f8fafc',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <style>{`
          @keyframes loaderFadeOut { to { opacity: 0; visibility: hidden; } }
          @keyframes loaderBar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
          @keyframes loaderFloat { 0%,100% { transform: translateY(0);} 50% { transform: translateY(-8px);} }
        `}</style>
  
        <div style={{ textAlign: 'center' }}>
          {/* Re-use your robot look (simple version) */}
          <div
            style={{
              width: 'clamp(90px, 12vw, 140px)',
              height: 'clamp(90px, 12vw, 140px)',
              borderRadius: '50%',
              background: darkMode
                ? 'radial-gradient(ellipse at 50% 50%, rgba(35,35,45,1) 0%, rgba(18,18,22,1) 100%)'
                : 'radial-gradient(ellipse at 50% 50%, rgba(245,245,250,1) 0%, rgba(225,225,235,1) 100%)',
              boxShadow: darkMode
                ? '0 0 40px rgba(59,130,246,0.25), inset -6px -6px 16px rgba(0,0,0,0.7)'
                : '0 0 30px rgba(59,130,246,0.18), inset -6px -6px 16px rgba(0,0,0,0.08)',
              position: 'relative',
              margin: '0 auto',
              animation: 'loaderFloat 2.4s ease-in-out infinite',
            }}
          >
            {/* Eyes */}
            <div
              style={{
                position: 'absolute',
                top: '52%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 'clamp(8px, 1vw, 12px)',
                  height: 'clamp(22px, 3vw, 32px)',
                  borderRadius: 6,
                  background:
                    'linear-gradient(180deg, rgba(150,220,255,1) 0%, rgba(80,170,230,1) 40%, rgba(50,140,200,1) 100%)',
                  boxShadow: '0 0 10px rgba(100,190,255,0.65)',
                }}
              />
              <div
                style={{
                  width: 'clamp(8px, 1vw, 12px)',
                  height: 'clamp(22px, 3vw, 32px)',
                  borderRadius: 6,
                  background:
                    'linear-gradient(180deg, rgba(150,220,255,1) 0%, rgba(80,170,230,1) 40%, rgba(50,140,200,1) 100%)',
                  boxShadow: '0 0 10px rgba(100,190,255,0.65)',
                }}
              />
            </div>
          </div>
  
          {/* WELCOME text */}
          <div
            style={{
              marginTop: 22,
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: '0.6em',
              paddingLeft: '0.6em',
              fontSize: 'clamp(14px, 1.4vw, 20px)',
              color: darkMode ? 'rgba(255,255,255,0.85)' : 'rgba(15,23,42,0.75)',
            }}
          >
            WELCOME
          </div>
  
          {/* Loading bar */}
          <div
            style={{
              width: 'clamp(220px, 30vw, 360px)',
              height: 'clamp(3px, 0.4vw, 5px)',
              height: 3,
              borderRadius: 999,
              background: darkMode ? 'rgba(255,255,255,0.10)' : 'rgba(0,0,0,0.10)',
              overflow: 'hidden',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            <div
              style={{
                height: '100%',
                width: '100%',
                transformOrigin: 'left',
                background: 'rgba(59,130,246,0.9)',
                animation: 'loaderBar 1.1s ease forwards',
              }}
            />
          </div>
        </div>
      </div>
    );
  }
  

export default function Portfolio() {
    const [currentRoute, setCurrentRoute] = useState(window.location.hash || '#home');

    const [isLoading, setIsLoading] = useState(true);
    const [loadingDarkMode, setLoadingDarkMode] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved) setLoadingDarkMode(saved === 'dark');
      
        document.body.style.overflow = 'hidden';
        const t = setTimeout(() => {
          setIsLoading(false);
          document.body.style.overflow = '';
        }, 1500);
      
        return () => {
          clearTimeout(t);
          document.body.style.overflow = '';
        };
      }, []);

    useEffect(() => {
        const handleHashChange = () => {
            setCurrentRoute(window.location.hash || '#home');
            window.scrollTo(0, 0);
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    const projectMatch = currentRoute.match(/^#project\/(.+)$/);

    if (projectMatch) {
        const projectId = projectMatch[1];
        const project = projectsData.find(p => p.id === projectId);
        if (project) {
            return (
                <>
                  {isLoading && <LoadingScreen darkMode={loadingDarkMode} />}
                  <ProjectDetailPage project={project} />
                </>
              );
        }
    }

    return (
        <>
          {isLoading && <LoadingScreen darkMode={loadingDarkMode} />}
          <MainPortfolio />
        </>
      );
}

// ============================================
// CONTEXTUAL BACKGROUND MORPHING SYSTEM
// ============================================

// Section mood configurations for background morphing
const sectionMoods = {
    hero: {
        dark: {
            vignetteOpacity: 0.7,
            glowIntensity: 0.4,
            glowRadius: 60,
            noiseOpacity: 0.04,
            gridOpacity: 0.08,
            gradientAngle: 135,
            accentX: 70,
            accentY: 30,
        },
        light: {
            vignetteOpacity: 0.15,
            glowIntensity: 0.2,
            glowRadius: 55,
            noiseOpacity: 0.025,
            gridOpacity: 0.1,
            gradientAngle: 135,
            accentX: 70,
            accentY: 30,
        },
    },
    about: {
        dark: {
            vignetteOpacity: 0.5,
            glowIntensity: 0.25,
            glowRadius: 50,
            noiseOpacity: 0.03,
            gridOpacity: 0.06,
            gradientAngle: 180,
            accentX: 30,
            accentY: 50,
        },
        light: {
            vignetteOpacity: 0.1,
            glowIntensity: 0.15,
            glowRadius: 45,
            noiseOpacity: 0.02,
            gridOpacity: 0.08,
            gradientAngle: 180,
            accentX: 30,
            accentY: 50,
        },
    },
    skills: {
        dark: {
            vignetteOpacity: 0.45,
            glowIntensity: 0.2,
            glowRadius: 45,
            noiseOpacity: 0.035,
            gridOpacity: 0.12,
            gradientAngle: 90,
            accentX: 20,
            accentY: 60,
        },
        light: {
            vignetteOpacity: 0.08,
            glowIntensity: 0.12,
            glowRadius: 40,
            noiseOpacity: 0.025,
            gridOpacity: 0.12,
            gradientAngle: 90,
            accentX: 20,
            accentY: 60,
        },
    },
    projects: {
        dark: {
            vignetteOpacity: 0.6,
            glowIntensity: 0.45,
            glowRadius: 70,
            noiseOpacity: 0.03,
            gridOpacity: 0.04,
            gradientAngle: 45,
            accentX: 50,
            accentY: 40,
        },
        light: {
            vignetteOpacity: 0.12,
            glowIntensity: 0.25,
            glowRadius: 60,
            noiseOpacity: 0.02,
            gridOpacity: 0.06,
            gradientAngle: 45,
            accentX: 50,
            accentY: 40,
        },
    },
    experience: {
        dark: {
            vignetteOpacity: 0.4,
            glowIntensity: 0.18,
            glowRadius: 40,
            noiseOpacity: 0.03,
            gridOpacity: 0.05,
            gradientAngle: 200,
            accentX: 80,
            accentY: 70,
        },
        light: {
            vignetteOpacity: 0.08,
            glowIntensity: 0.1,
            glowRadius: 35,
            noiseOpacity: 0.02,
            gridOpacity: 0.06,
            gradientAngle: 200,
            accentX: 80,
            accentY: 70,
        },
    },
    contact: {
        dark: {
            vignetteOpacity: 0.3,
            glowIntensity: 0.15,
            glowRadius: 35,
            noiseOpacity: 0.02,
            gridOpacity: 0.03,
            gradientAngle: 270,
            accentX: 50,
            accentY: 80,
        },
        light: {
            vignetteOpacity: 0.05,
            glowIntensity: 0.08,
            glowRadius: 30,
            noiseOpacity: 0.015,
            gridOpacity: 0.04,
            gradientAngle: 270,
            accentX: 50,
            accentY: 80,
        },
    },
};

function ContextualBackground({ activeSection, darkMode, prefersReducedMotion, robotPosition, robotInfluence, robotVisible }) {
    const mood = sectionMoods[activeSection] || sectionMoods.hero;
    const config = darkMode ? mood.dark : mood.light;

    const transitionDuration = prefersReducedMotion ? '0ms' : '700ms';
    const transitionTiming = 'cubic-bezier(0.4, 0, 0.2, 1)';

    // Base colors
    const bgColor = darkMode ? '#0a0a0b' : '#fafafa';
    const accentColor = darkMode ? 'rgba(59, 130, 246,' : 'rgba(59, 130, 246,';

    // Robot influence calculations
    const robotGlowIntensity = robotVisible ? (darkMode ? 0.15 + (robotInfluence * 0.2) : 0.08 + (robotInfluence * 0.12)) : 0;
    const robotGlowRadius = robotVisible ? (darkMode ? 80 + (robotInfluence * 40) : 60 + (robotInfluence * 30)) : 0;

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
                overflow: 'hidden',
                backgroundColor: bgColor,
            }}
        >
            {/* Base gradient layer */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: darkMode
                        ? `linear-gradient(${config.gradientAngle}deg, #0a0a0b 0%, #0f1117 50%, #0a0a0b 100%)`
                        : `linear-gradient(${config.gradientAngle}deg, #fafafa 0%, #f0f4f8 50%, #fafafa 100%)`,
                    transition: `background ${transitionDuration} ${transitionTiming}`,
                }}
            />

            {/* Robot-anchored influence glow */}
            {robotVisible && (
                <div
                    style={{
                        position: 'absolute',
                        top: `${robotPosition.y}%`,
                        left: `${robotPosition.x}%`,
                        width: `${robotGlowRadius * 2}px`,
                        height: `${robotGlowRadius * 2}px`,
                        transform: 'translate(-50%, -50%)',
                        background: `radial-gradient(circle, ${accentColor}${robotGlowIntensity}) 0%, ${accentColor}${robotGlowIntensity * 0.3}) 40%, transparent 70%)`,
                        filter: `blur(${robotGlowRadius * 0.6}px)`,
                        transition: prefersReducedMotion ? 'none' : `all 150ms ease-out`,
                        opacity: robotVisible ? 1 : 0,
                    }}
                />
            )}

            {/* Accent glow */}
            <div
                style={{
                    position: 'absolute',
                    top: `${config.accentY}%`,
                    left: `${config.accentX}%`,
                    width: `${config.glowRadius * 2}vw`,
                    height: `${config.glowRadius * 2}vw`,
                    transform: 'translate(-50%, -50%)',
                    background: `radial-gradient(circle, ${accentColor}${config.glowIntensity}) 0%, transparent 70%)`,
                    filter: `blur(${config.glowRadius}px)`,
                    transition: `all ${transitionDuration} ${transitionTiming}`,
                }}
            />

            {/* Secondary subtle glow (opposite corner) */}
            <div
                style={{
                    position: 'absolute',
                    top: `${100 - config.accentY}%`,
                    left: `${100 - config.accentX}%`,
                    width: `${config.glowRadius * 1.2}vw`,
                    height: `${config.glowRadius * 1.2}vw`,
                    transform: 'translate(-50%, -50%)',
                    background: `radial-gradient(circle, ${accentColor}${config.glowIntensity * 0.4}) 0%, transparent 70%)`,
                    filter: `blur(${config.glowRadius * 0.8}px)`,
                    transition: `all ${transitionDuration} ${transitionTiming}`,
                }}
            />

            {/* Subtle grid pattern */}
            <svg
                style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    opacity: config.gridOpacity,
                    transition: `opacity ${transitionDuration} ${transitionTiming}`,
                }}
            >
                <defs>
                    <pattern id="grid-pattern" width="60" height="60" patternUnits="userSpaceOnUse">
                        <path
                            d="M 60 0 L 0 0 0 60"
                            fill="none"
                            stroke={darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.08)'}
                            strokeWidth="1"
                        />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid-pattern)" />
            </svg>

            {/* Noise texture overlay */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: config.noiseOpacity,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'repeat',
                    backgroundSize: '128px 128px',
                    mixBlendMode: darkMode ? 'overlay' : 'multiply',
                    transition: `opacity ${transitionDuration} ${transitionTiming}`,
                }}
            />

            {/* Vignette effect */}
            <div
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: `radial-gradient(ellipse at center, transparent 0%, transparent 50%, ${darkMode ? 'rgba(0,0,0,' : 'rgba(0,0,0,'}${config.vignetteOpacity}) 100%)`,
                    transition: `background ${transitionDuration} ${transitionTiming}`,
                }}
            />

            {/* Top edge fade for nav blending */}
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '120px',
                    background: darkMode
                        ? 'linear-gradient(to bottom, rgba(10,10,11,0.8) 0%, transparent 100%)'
                        : 'linear-gradient(to bottom, rgba(250,250,250,0.8) 0%, transparent 100%)',
                    pointerEvents: 'none',
                }}
            />
        </div>
    );
}

// ============================================
// MAIN PORTFOLIO PAGE
// ============================================

function MainPortfolio() {
    const [darkMode, setDarkMode] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [typewriterText, setTypewriterText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    const typewriterPhrases = [
        "Computer Science Honours Student",
        "Software Developer",
        "Full-Stack Developer",
        "AI-Enthusiast",
    ];

    const cursorDotRef = useRef(null);
    const mousePosition = useRef({ x: 0, y: 0 });
    const dotPosition = useRef({ x: 0, y: 0 });
    const animationFrameId = useRef(null);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

    const [robotVisible, setRobotVisible] = useState(true);
    const [robotOpacity, setRobotOpacity] = useState(1);
    const [robotTransform, setRobotTransform] = useState({ y: 0, scale: 1 });
    const robotRef = useRef(null);
    const leftPupilRef = useRef(null);
    const rightPupilRef = useRef(null);
    const robotMousePos = useRef({ x: 0, y: 0 });
    const robotAnimationId = useRef(null);
    const [isIdle, setIsIdle] = useState(true);
    const idleTimeoutRef = useRef(null);
    const [isBlinking, setIsBlinking] = useState(false);
    const blinkTimeoutRef = useRef(null);

    // Mobile detection
    const [isMobile, setIsMobile] = useState(false);

    // Thought bubble state
    const [thoughtText, setThoughtText] = useState('');
    const [isThoughtDeleting, setIsThoughtDeleting] = useState(false);
    const [thoughtPhraseIndex, setThoughtPhraseIndex] = useState(-1); // -1 = greeting phase
    const [thoughtCharIndex, setThoughtCharIndex] = useState(0);
    const [showThoughtBubble, setShowThoughtBubble] = useState(false);
    const [hasShownGreeting, setHasShownGreeting] = useState(false);

    const thoughtPhrases = [
        "Curious? Let's explore.",
        "Scroll down — the good stuff is below.",
        "Want to see what I've built?",
        "I build things that solve real problems.",
        "Take a look at my work.",
    ];

    const greetings = ["Hey 👋", "Hello 👋"];

    // Active section tracking for background morphing
    const [activeSection, setActiveSection] = useState('hero');

    // Robot influence state for background effects
    const [robotPosition, setRobotPosition] = useState({ x: 70, y: 45 }); // percentage
    const [robotInfluence, setRobotInfluence] = useState(0);
    const [cursorDistanceToRobot, setCursorDistanceToRobot] = useState(1000);

    // Contact section robot state
    const [showContactRobot, setShowContactRobot] = useState(false);
    const [contactBubbleVisible, setContactBubbleVisible] = useState(false);
    const contactRobotRef = useRef(null);

    // Contact modal state
    const [contactModalOpen, setContactModalOpen] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved) setDarkMode(saved === 'dark');
        const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        setPrefersReducedMotion(motionQuery.matches);
        const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
        motionQuery.addEventListener('change', handleMotionChange);
        return () => motionQuery.removeEventListener('change', handleMotionChange);
    }, []);

    useEffect(() => {
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    // Mobile detection
    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    // Section tracking with IntersectionObserver for background morphing
    useEffect(() => {
        const sectionIds = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];
        const observers = [];
        const visibilityMap = {};

        sectionIds.forEach((id) => {
            const element = document.getElementById(id);

            if (element) {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach((entry) => {
                            visibilityMap[id] = entry.intersectionRatio;

                            // Find section with highest visibility
                            let maxVisibility = 0;
                            let mostVisibleSection = 'hero';

                            Object.entries(visibilityMap).forEach(([sectionId, ratio]) => {
                                if (ratio > maxVisibility) {
                                    maxVisibility = ratio;
                                    mostVisibleSection = sectionId;
                                }
                            });

                            if (maxVisibility > 0.1) {
                                setActiveSection(mostVisibleSection);
                            }
                        });
                    },
                    {
                        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
                        rootMargin: '-20% 0px -20% 0px',
                    }
                );

                observer.observe(element);
                observers.push(observer);
            }
        });

        return () => {
            observers.forEach((observer) => observer.disconnect());
        };
    }, []);

    // Typewriter effect
    useEffect(() => {
        const currentPhrase = typewriterPhrases[phraseIndex];
        let timeout;
        if (!isDeleting) {
            if (charIndex < currentPhrase.length) {
                timeout = setTimeout(() => {
                    setTypewriterText(currentPhrase.substring(0, charIndex + 1));
                    setCharIndex(charIndex + 1);
                }, Math.floor(Math.random() * 20) + 70);
            } else {
                timeout = setTimeout(() => setIsDeleting(true), Math.floor(Math.random() * 400) + 900);
            }
        } else {
            if (charIndex > 0) {
                timeout = setTimeout(() => {
                    setTypewriterText(currentPhrase.substring(0, charIndex - 1));
                    setCharIndex(charIndex - 1);
                }, Math.floor(Math.random() * 20) + 35);
            } else {
                setIsDeleting(false);
                setPhraseIndex((phraseIndex + 1) % typewriterPhrases.length);
            }
        }
        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, phraseIndex]);

    // Cursor dot effect
    useEffect(() => {
        const checkTouchDevice = () => {
            const isTouchCapable = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches;
            setIsTouchDevice(isTouchCapable);
            return isTouchCapable;
        };
        if (checkTouchDevice()) return;

        const handleMouseMove = (e) => { mousePosition.current = { x: e.clientX, y: e.clientY }; };
        const animateDot = () => {
            const lerp = 0.15;
            dotPosition.current.x += (mousePosition.current.x - dotPosition.current.x) * lerp;
            dotPosition.current.y += (mousePosition.current.y - dotPosition.current.y) * lerp;
            if (cursorDotRef.current) {
                cursorDotRef.current.style.transform = `translate3d(${dotPosition.current.x - 6}px, ${dotPosition.current.y - 6}px, 0)`;
            }
            animationFrameId.current = requestAnimationFrame(animateDot);
        };
        mousePosition.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        dotPosition.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        window.addEventListener('mousemove', handleMouseMove);
        animationFrameId.current = requestAnimationFrame(animateDot);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
        };
    }, []);

    // Robot eye tracking
    useEffect(() => {
        if (isTouchDevice || prefersReducedMotion) return;
        const handleMouseMoveRobot = (e) => {
            robotMousePos.current = { x: e.clientX, y: e.clientY };
            setIsIdle(false);
            if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
            idleTimeoutRef.current = setTimeout(() => setIsIdle(true), 2000);
        };
        const animateEyes = () => {
            const leftPupil = leftPupilRef.current;
            const rightPupil = rightPupilRef.current;
            if (leftPupil && rightPupil && robotRef.current) {
                const maxOffset = 22;
                const lerp = 0.15;
                const viewportWidth = window.innerWidth;
                const viewportHeight = window.innerHeight;
                const rawX = (robotMousePos.current.x / viewportWidth) * 2 - 1;
                const rawY = (robotMousePos.current.y / viewportHeight) * 2 - 1;
                const easeOut = (t) => 1 - Math.pow(1 - Math.abs(t), 2);
                const normalizedX = Math.sign(rawX) * easeOut(rawX);
                const normalizedY = Math.sign(rawY) * easeOut(rawY);
                const targetX = Math.max(-maxOffset, Math.min(maxOffset, normalizedX * maxOffset));
                const targetY = Math.max(-maxOffset, Math.min(maxOffset, normalizedY * maxOffset));
                [leftPupil, rightPupil].forEach((pupil) => {
                    const currentX = parseFloat(pupil.dataset.x || 0);
                    const currentY = parseFloat(pupil.dataset.y || 0);
                    const newX = currentX + (targetX - currentX) * lerp;
                    const newY = currentY + (targetY - currentY) * lerp;
                    pupil.dataset.x = newX;
                    pupil.dataset.y = newY;
                    pupil.style.transform = `translate(${newX}px, ${newY}px)`;
                });
            }
            robotAnimationId.current = requestAnimationFrame(animateEyes);
        };
        robotMousePos.current = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        window.addEventListener('mousemove', handleMouseMoveRobot);
        robotAnimationId.current = requestAnimationFrame(animateEyes);
        return () => {
            window.removeEventListener('mousemove', handleMouseMoveRobot);
            if (robotAnimationId.current) cancelAnimationFrame(robotAnimationId.current);
            if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
        };
    }, [isTouchDevice, prefersReducedMotion]);

    // Blinking effect
    useEffect(() => {
        if (prefersReducedMotion) return;
        const triggerBlink = () => { setIsBlinking(true); setTimeout(() => setIsBlinking(false), 150); };
        const scheduleNextBlink = () => {
            blinkTimeoutRef.current = setTimeout(() => { triggerBlink(); scheduleNextBlink(); }, Math.random() * 3000 + 3000);
        };
        const handleMouseLeave = () => triggerBlink();
        scheduleNextBlink();
        document.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            if (blinkTimeoutRef.current) clearTimeout(blinkTimeoutRef.current);
            document.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [prefersReducedMotion]);

    // Thought bubble animation - show after delay
    useEffect(() => {
        if (prefersReducedMotion) {
            // For reduced motion, just show a static message
            setThoughtText("Take a look at my work.");
            setShowThoughtBubble(true);
            return;
        }

        // Delay showing the thought bubble
        const showTimer = setTimeout(() => {
            setShowThoughtBubble(true);
        }, 1500);

        return () => clearTimeout(showTimer);
    }, [prefersReducedMotion]);

    // Thought bubble typing effect
    useEffect(() => {
        if (prefersReducedMotion || !showThoughtBubble || !robotVisible) return;

        let timeout;

        // Determine current phrase
        let currentPhrase;
        if (thoughtPhraseIndex === -1) {
            // Greeting phase
            currentPhrase = greetings[Math.floor(Math.random() * greetings.length)];
        } else {
            currentPhrase = thoughtPhrases[thoughtPhraseIndex];
        }

        if (!isThoughtDeleting) {
            // Typing - faster speed
            if (thoughtCharIndex < currentPhrase.length) {
                const typingSpeed = Math.floor(Math.random() * 20) + 35; // Faster: 35-55ms
                timeout = setTimeout(() => {
                    setThoughtText(currentPhrase.substring(0, thoughtCharIndex + 1));
                    setThoughtCharIndex(thoughtCharIndex + 1);
                }, typingSpeed);
            } else {
                // Finished typing, pause before deleting
                const pauseTime = thoughtPhraseIndex === -1 ? 1000 : Math.floor(Math.random() * 800) + 1800; // 1.8-2.6s
                timeout = setTimeout(() => {
                    setIsThoughtDeleting(true);
                }, pauseTime);
            }
        } else {
            // Deleting - smoother
            if (thoughtCharIndex > 0) {
                const deletingSpeed = Math.floor(Math.random() * 15) + 20; // Faster: 20-35ms
                timeout = setTimeout(() => {
                    setThoughtText(currentPhrase.substring(0, thoughtCharIndex - 1));
                    setThoughtCharIndex(thoughtCharIndex - 1);
                }, deletingSpeed);
            } else {
                // Finished deleting, move to next phrase
                setIsThoughtDeleting(false);
                if (thoughtPhraseIndex === -1) {
                    // Move from greeting to first message
                    setHasShownGreeting(true);
                    setThoughtPhraseIndex(0);
                } else {
                    // Move to next message (loop)
                    setThoughtPhraseIndex((thoughtPhraseIndex + 1) % thoughtPhrases.length);
                }
            }
        }

        return () => clearTimeout(timeout);
    }, [thoughtCharIndex, isThoughtDeleting, thoughtPhraseIndex, showThoughtBubble, robotVisible, prefersReducedMotion]);

    // Robot scroll visibility + contact section reappearance
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const heroHeight = window.innerHeight;
            const fadeStart = heroHeight * 0.15;
            const fadeEnd = heroHeight * 0.5;

            // Check if contact section is in view
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const contactRect = contactSection.getBoundingClientRect();
                const isContactVisible = contactRect.top < window.innerHeight * 0.6 && contactRect.bottom > 0;

                if (isContactVisible && !showContactRobot) {
                    setShowContactRobot(true);
                    // Delay bubble appearance for smooth entrance
                    setTimeout(() => setContactBubbleVisible(true), 800);
                } else if (!isContactVisible && showContactRobot) {
                    setContactBubbleVisible(false);
                    setTimeout(() => setShowContactRobot(false), 300);
                }
            }

            // Hero robot fade logic
            if (scrollY <= fadeStart) {
                setRobotOpacity(1);
                setRobotTransform({ y: 0, scale: 1 });
                setRobotVisible(true);
            } else if (scrollY >= fadeEnd) {
                setRobotOpacity(0);
                setRobotTransform({ y: 30, scale: 0.9 });
                setTimeout(() => { if (window.scrollY >= fadeEnd) setRobotVisible(false); }, 300);
            } else {
                setRobotVisible(true);
                const progress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
                setRobotOpacity(1 - progress);
                setRobotTransform({ y: progress * 30, scale: 1 - (progress * 0.1) });
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Initial check
        return () => window.removeEventListener('scroll', handleScroll);
    }, [showContactRobot]);

    // Robot position tracking for background influence
    useEffect(() => {
        if (isTouchDevice || prefersReducedMotion) return;

        const updateRobotPosition = () => {
            // Track hero robot
            if (robotRef.current && robotVisible) {
                const rect = robotRef.current.getBoundingClientRect();
                const centerX = (rect.left + rect.width / 2) / window.innerWidth * 100;
                const centerY = (rect.top + rect.height / 2) / window.innerHeight * 100;
                setRobotPosition({ x: centerX, y: centerY });
            }
            // Track contact robot if visible
            else if (contactRobotRef.current && showContactRobot) {
                const rect = contactRobotRef.current.getBoundingClientRect();
                const centerX = (rect.left + rect.width / 2) / window.innerWidth * 100;
                const centerY = (rect.top + rect.height / 2) / window.innerHeight * 100;
                setRobotPosition({ x: centerX, y: centerY });
            }
        };

        const handleMouseMove = (e) => {
            // Calculate distance from cursor to robot
            const robotX = robotPosition.x / 100 * window.innerWidth;
            const robotY = robotPosition.y / 100 * window.innerHeight;
            const distance = Math.sqrt(Math.pow(e.clientX - robotX, 2) + Math.pow(e.clientY - robotY, 2));
            setCursorDistanceToRobot(distance);

            // Calculate influence (0-1) based on proximity (300px = max influence range)
            const maxRange = 300;
            const influence = Math.max(0, 1 - (distance / maxRange));
            setRobotInfluence(influence);
        };

        // Update position on scroll and resize
        window.addEventListener('scroll', updateRobotPosition, { passive: true });
        window.addEventListener('resize', updateRobotPosition, { passive: true });
        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        // Initial position
        updateRobotPosition();

        return () => {
            window.removeEventListener('scroll', updateRobotPosition);
            window.removeEventListener('resize', updateRobotPosition);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [robotVisible, showContactRobot, robotPosition.x, robotPosition.y, isTouchDevice, prefersReducedMotion]);

    const theme = {
        bg: darkMode ? '#0a0a0b' : '#fafafa',
        surface: darkMode ? '#141416' : '#ffffff',
        surfaceHover: darkMode ? '#1c1c1f' : '#f4f4f5',
        border: darkMode ? '#27272a' : '#e4e4e7',
        text: darkMode ? '#f4f4f5' : '#18181b',
        textMuted: darkMode ? '#a1a1aa' : '#71717a',
        accent: '#3b82f6',
        accentHover: '#2563eb',
        accentMuted: darkMode ? 'rgba(59, 130, 246, 0.1)' : 'rgba(59, 130, 246, 0.08)',
    };

    const styles = {
        page: { minHeight: '100vh', width: '100%', backgroundColor: 'transparent', color: theme.text, fontFamily: "'Sora', sans-serif", transition: 'color 0.3s ease', overflowX: 'hidden', position: 'relative', zIndex: 1 },
        container: { maxWidth: '1100px', margin: '0 auto', padding: '0 24px' },
        nav: { position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: darkMode ? 'rgba(10,10,11,0.8)' : 'rgba(250,250,250,0.8)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${theme.border}` },
        navInner: { maxWidth: '1100px', margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
        logo: { fontSize: '18px', fontWeight: 600, color: theme.text, textDecoration: 'none' },
        navLinks: { display: 'flex', gap: '32px', alignItems: 'center' },
        navLink: { fontSize: '14px', color: theme.textMuted, textDecoration: 'none', transition: 'color 0.2s', cursor: 'pointer' },
        themeToggle: { padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', color: theme.textMuted, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
        section: { padding: '100px 0', width: '100%', position: 'relative' },
        sectionTitle: { fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', color: theme.accent, marginBottom: '16px' },
        heading: { fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: 600, lineHeight: 1.2, marginBottom: '24px' },
        paragraph: { fontSize: '16px', lineHeight: 1.7, color: theme.textMuted, maxWidth: '600px' },
        button: { display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '14px', fontWeight: 500, borderRadius: '8px', border: 'none', cursor: 'pointer', transition: 'all 0.2s', textDecoration: 'none' },
        buttonPrimary: { backgroundColor: theme.accent, color: '#ffffff' },
        buttonSecondary: { backgroundColor: 'transparent', color: theme.text, border: `1px solid ${theme.border}` },
        card: { backgroundColor: darkMode ? 'rgba(20,20,22,0.8)' : 'rgba(255,255,255,0.9)', backdropFilter: 'blur(8px)', borderRadius: '12px', border: `1px solid ${theme.border}`, padding: '24px' },
        tag: { display: 'inline-block', padding: '4px 12px', fontSize: '12px', fontWeight: 500, borderRadius: '6px', backgroundColor: theme.accentMuted, color: theme.accent },
        mono: { fontFamily: "'JetBrains Mono', monospace" },
    };

    const scrollToSection = (href) => {
        const element = document.querySelector(href);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
    };

    return (
        <>
            <ContextualBackground
                activeSection={activeSection}
                darkMode={darkMode}
                prefersReducedMotion={prefersReducedMotion}
                robotPosition={robotPosition}
                robotInfluence={robotInfluence}
                robotVisible={robotVisible || showContactRobot}
            />
            <div style={styles.page}>
                <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; min-height: 100vh; margin: 0; padding: 0; background-color: transparent; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        ::selection { background-color: ${theme.accent}; color: white; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes blink { 0%, 50% { opacity: 1; } 51%, 100% { opacity: 0; } }
        @keyframes robotFloat { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-6px); } }
        @keyframes thoughtBubbleIn { 
          0% { opacity: 0; transform: translateY(15px) scale(0.92); } 
          50% { opacity: 0.8; }
          100% { opacity: 1; transform: translateY(0) scale(1); } 
        }
        @keyframes thoughtFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        @keyframes contactRobotEnter {
          0% { opacity: 0; transform: translateY(30px) scale(0.8); }
          60% { opacity: 1; transform: translateY(-5px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes contactBubblePop {
          0% { opacity: 0; transform: translateY(10px) scale(0.9); }
          50% { transform: translateY(-3px) scale(1.02); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
        .contact-robot-enter { animation: contactRobotEnter 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .contact-bubble-enter { animation: contactBubblePop 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards; }
        .thought-bubble-enter { animation: thoughtBubbleIn 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .thought-cursor { animation: blink 0.9s ease-in-out infinite; }
        .typewriter-cursor { animation: blink 1s infinite; font-weight: 300; margin-left: 2px; }
        .fade-in { animation: fadeInUp 0.6s ease forwards; }
        .fade-in-delay-1 { animation-delay: 0.1s; opacity: 0; }
        .fade-in-delay-2 { animation-delay: 0.2s; opacity: 0; }
        .fade-in-delay-3 { animation-delay: 0.3s; opacity: 0; }
        .fade-in-delay-4 { animation-delay: 0.4s; opacity: 0; }
        .carousel-container { overflow-x: auto; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; scrollbar-width: none; }
        .carousel-container::-webkit-scrollbar { display: none; }
        .carousel-card { scroll-snap-align: center; flex-shrink: 0; }
        .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .reveal.reveal-visible { opacity: 1; transform: none; }
        .exp-card { transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease; }
        @media (hover: hover) {
          .exp-card:hover { transform: translateY(-4px); border-color: var(--exp-hover-border) !important; box-shadow: var(--exp-hover-shadow) !important; }
          .exp-card-flat:hover { transform: none; }
        }
        .exp-link { color: inherit; text-decoration: none; }
        .exp-link::after { content: ''; position: absolute; inset: 0; border-radius: inherit; z-index: 1; }
        .exp-link:focus-visible { outline: none; }
        .exp-link:focus-visible::after { outline: 2px solid #3b82f6; outline-offset: 2px; }
        .exp-link-icon { opacity: 0.5; transition: opacity 0.2s ease, transform 0.2s ease; }
        .exp-card:hover .exp-link-icon, .exp-link:focus-visible .exp-link-icon { opacity: 1; transform: translate(2px, -2px); }
        .skills-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 20px; }
        @media (max-width: 1024px) { .skills-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } }
        @media (max-width: 640px) { .skills-grid { grid-template-columns: minmax(0, 1fr); } }
        .skill-tag { transition: border-color 0.2s ease, background-color 0.2s ease, color 0.2s ease; }
        .skill-tag:hover { border-color: var(--skill-tag-hover) !important; color: var(--skill-tag-hover-text) !important; }
        .project-featured { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); }
        .projects-secondary-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
        .project-media img { transition: transform 0.5s ease; }
        .project-card:hover .project-media img { transform: scale(1.02); }
        .project-stretch::after { content: ''; position: absolute; inset: 0; z-index: 1; border-radius: 20px; }
        .project-stretch:focus-visible { outline: none; }
        .project-stretch:focus-visible::after { outline: 2px solid #3b82f6; outline-offset: -2px; }
        .project-card:hover .project-stretch { background-color: #2563eb !important; }
        .project-action-secondary:hover { border-color: var(--action-hover-border) !important; color: var(--action-hover-border) !important; }
        .project-action-secondary:focus-visible { outline: 2px solid #3b82f6; outline-offset: 2px; }
        @media (max-width: 900px) {
          .project-featured { grid-template-columns: minmax(0, 1fr); }
          .project-featured-media { padding: 16px 16px 0 !important; }
        }
        @media (max-width: 768px) { .projects-secondary-grid { grid-template-columns: minmax(0, 1fr); } }
        @media (max-width: 560px) { .featured-thumbs-row { display: none !important; } }
        @media (prefers-reduced-motion: reduce) {
          .project-media img, .project-card:hover .project-media img { transition: none !important; transform: none !important; }
        }
        @media (max-width: 1199px) {
          /* Not enough room beside the description: sit centred below the contact links instead */
          .contact-robot-wrapper { position: relative !important; top: auto !important; bottom: auto !important; right: auto !important; width: fit-content; margin: 120px auto 0; }
          .contact-robot-wrapper .contact-bubble { right: auto !important; left: 50% !important; translate: -50% 0; }
        }
        .contact-links { list-style: none; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; max-width: 820px; margin: 48px auto 0; padding: 0; }
        @media (max-width: 768px) { .contact-links { grid-template-columns: minmax(0, 1fr); max-width: 420px; } }
        @media (max-width: 480px) { .contact-ctas > * { width: 100%; justify-content: center; } }
        .contact-cta { transition: background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease, transform 0.2s ease; }
        .contact-cta-primary:hover { background-color: #2563eb !important; }
        .contact-cta-secondary:hover { border-color: #3b82f6 !important; color: #3b82f6 !important; }
        .contact-cta:focus-visible, .contact-link:focus-visible { outline: 2px solid #3b82f6; outline-offset: 3px; }
        .contact-link:hover .contact-link-icon { color: #3b82f6 !important; }
        .exp-current-dot { animation: expPulse 2.4s ease-in-out infinite; }
        @keyframes expPulse { 0%, 100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.45); } 50% { box-shadow: 0 0 0 5px rgba(59,130,246,0); } }
        @media (prefers-reduced-motion: reduce) {
          .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
          .exp-card, .exp-card:hover { transform: none !important; }
          .exp-current-dot { animation: none !important; }
        }
        @media (max-width: 768px) { 
          .desktop-nav { display: none !important; } 
          .mobile-menu-btn { display: flex !important; }
          .carousel-arrows { display: none !important; }
          .carousel-container { padding: 20px 24px !important; gap: 16px !important; }
          .carousel-card { width: calc(100vw - 48px) !important; min-width: calc(100vw - 48px) !important; }
          .hero-robot-desktop { display: none !important; }
          .hero-robot-mobile { display: flex !important; }
          .contact-robot-wrapper { bottom: 20px !important; right: 20px !important; }
          .contact-bubble { bottom: calc(100% + 15px) !important; right: auto !important; left: 50% !important; transform: translateX(-50%) !important; }
        }
        @media (min-width: 769px) { 
          .mobile-menu-btn { display: none !important; } 
          .mobile-menu { display: none !important; }
          .hero-robot-mobile { display: none !important; }
        }
      `}</style>

                {!isTouchDevice && (
                    <div ref={cursorDotRef} style={{ position: 'fixed', top: 0, left: 0, width: '12px', height: '12px', borderRadius: '50%', backgroundColor: theme.accent, opacity: 0.8, pointerEvents: 'none', zIndex: 10, boxShadow: '0 0 16px rgba(59,130,246,0.4)' }} />
                )}

                <nav style={styles.nav}>
                    <div style={styles.navInner}>
                        <a href="#" style={styles.logo} onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>AM</a>
                        <div style={styles.navLinks} className="desktop-nav">
                            {navLinks.map((link) => (
                                <a key={link.href} href={link.href} style={styles.navLink} onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}>{link.label}</a>
                            ))}
                            <a href="https://github.com/AbeedMulla" target="_blank" rel="noopener noreferrer" style={{ ...styles.navLink, display: 'flex' }} aria-label="GitHub"><Github size={18} /></a>
                            <a href="https://www.linkedin.com/in/abeed-mulla" target="_blank" rel="noopener noreferrer" style={{ ...styles.navLink, display: 'flex' }} aria-label="LinkedIn"><Linkedin size={18} /></a>
                            <button style={styles.themeToggle} onClick={() => setDarkMode(!darkMode)} aria-label="Toggle theme">{darkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
                        </div>
                        <button className="mobile-menu-btn" style={{ ...styles.themeToggle, display: 'none' }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'} aria-expanded={mobileMenuOpen}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <span style={{ width: '18px', height: '2px', backgroundColor: theme.text }} />
                                <span style={{ width: '18px', height: '2px', backgroundColor: theme.text }} />
                                <span style={{ width: '18px', height: '2px', backgroundColor: theme.text }} />
                            </div>
                        </button>
                    </div>
                    {mobileMenuOpen && (
                        <div className="mobile-menu" style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: theme.surface, borderBottom: `1px solid ${theme.border}`, padding: '16px 24px' }}>
                            {navLinks.map((link) => (<a key={link.href} href={link.href} style={{ ...styles.navLink, display: 'block', padding: '12px 0' }} onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}>{link.label}</a>))}
                            {/* Mobile Theme Toggle */}
                            <div style={{ borderTop: `1px solid ${theme.border}`, marginTop: '12px', paddingTop: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span style={{ fontSize: '14px', color: theme.textMuted }}>Theme</span>
                                <button 
                                    onClick={() => setDarkMode(!darkMode)} 
                                    style={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        gap: '8px', 
                                        padding: '8px 14px', 
                                        borderRadius: '8px', 
                                        border: `1px solid ${theme.border}`, 
                                        backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)', 
                                        color: theme.text, 
                                        cursor: 'pointer',
                                        fontSize: '13px',
                                        fontWeight: 500,
                                        fontFamily: "'Sora', sans-serif",
                                    }}
                                    aria-label="Toggle theme"
                                >
                                    {darkMode ? <Sun size={16} /> : <Moon size={16} />}
                                    {darkMode ? 'Light' : 'Dark'}
                                </button>
                            </div>
                        </div>
                    )}
                </nav>

                {/* Hero Section */}
                <section id="hero" style={{ ...styles.section, paddingTop: isMobile ? '120px' : '160px', minHeight: '100vh', display: 'flex', alignItems: isMobile ? 'flex-start' : 'center', position: 'relative', overflow: 'hidden' }}>

                    {/* Desktop Robot - absolute positioned */}
                    {!isTouchDevice && robotVisible && !isMobile && (
                        <div ref={robotRef} className="hero-robot-desktop" style={{ position: 'absolute', right: 'clamp(40px, 8vw, 140px)', top: '45%', opacity: robotOpacity, transform: `translateY(calc(-50% + ${robotTransform.y}px)) scale(${robotTransform.scale})`, transition: 'opacity 0.4s, transform 0.4s', zIndex: 1, pointerEvents: 'none' }}>

                            {/* Speech Bubble - positioned higher and to the left of robot */}
                            {showThoughtBubble && (
                                <div
                                    className="thought-bubble-enter"
                                    style={{
                                        position: 'absolute',
                                        right: 'calc(100% + 25px)',
                                        top: '-60px',
                                        zIndex: 10,
                                        animation: !prefersReducedMotion ? 'thoughtFloat 5s ease-in-out infinite' : 'none',
                                    }}
                                >
                                    {/* Main bubble */}
                                    <div
                                        style={{
                                            position: 'relative',
                                            padding: '16px 22px',
                                            borderRadius: '20px',
                                            backgroundColor: darkMode ? 'rgba(18, 22, 32, 0.94)' : 'rgba(255, 255, 255, 0.96)',
                                            border: `1.5px solid ${darkMode ? 'rgba(59, 130, 246, 0.35)' : 'rgba(59, 130, 246, 0.22)'}`,
                                            boxShadow: darkMode
                                                ? '0 0 25px rgba(59, 130, 246, 0.18), 0 0 50px rgba(59, 130, 246, 0.08), 0 8px 32px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.04)'
                                                : '0 0 20px rgba(59, 130, 246, 0.1), 0 8px 32px rgba(0, 0, 0, 0.1)',
                                            backdropFilter: 'blur(16px)',
                                            minWidth: '200px',
                                            maxWidth: '300px',
                                        }}
                                    >
                                        {darkMode && (
                                            <div style={{
                                                position: 'absolute',
                                                inset: '1px',
                                                borderRadius: '19px',
                                                background: 'linear-gradient(145deg, rgba(59,130,246,0.06) 0%, transparent 40%)',
                                                pointerEvents: 'none',
                                            }} />
                                        )}

                                        <p style={{
                                            fontSize: '15px',
                                            fontWeight: 500,
                                            color: darkMode ? '#93c5fd' : theme.accent,
                                            margin: 0,
                                            lineHeight: 1.5,
                                            letterSpacing: '-0.01em',
                                            textShadow: darkMode ? '0 0 20px rgba(59, 130, 246, 0.25)' : 'none',
                                            position: 'relative',
                                            zIndex: 1,
                                            minHeight: '23px',
                                        }}>
                                            {thoughtText}
                                            <span
                                                className="thought-cursor"
                                                style={{
                                                    color: darkMode ? '#93c5fd' : theme.accent,
                                                    fontWeight: 300,
                                                    marginLeft: '2px',
                                                    opacity: 0.7,
                                                }}
                                            >|</span>
                                        </p>
                                    </div>

                                    {/* Tail */}
                                    <svg
                                        style={{
                                            position: 'absolute',
                                            top: '100%',
                                            right: '8px',
                                            width: '60px',
                                            height: '50px',
                                            overflow: 'visible',
                                            marginTop: '-2px',
                                        }}
                                        viewBox="0 0 60 50"
                                    >
                                        {darkMode && (
                                            <path
                                                d="M 8 2 Q 25 15, 50 40"
                                                fill="none"
                                                stroke="rgba(59, 130, 246, 0.12)"
                                                strokeWidth="8"
                                                strokeLinecap="round"
                                                style={{ filter: 'blur(4px)' }}
                                            />
                                        )}
                                        <path
                                            d="M 8 2 Q 25 15, 50 40"
                                            fill="none"
                                            stroke={darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'}
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                        />
                                        <circle cx="12" cy="6" r="5" fill={darkMode ? 'rgba(18, 22, 32, 0.94)' : 'rgba(255, 255, 255, 0.96)'} stroke={darkMode ? 'rgba(59, 130, 246, 0.35)' : 'rgba(59, 130, 246, 0.22)'} strokeWidth="1.5" />
                                        <circle cx="28" cy="18" r="4" fill={darkMode ? 'rgba(18, 22, 32, 0.94)' : 'rgba(255, 255, 255, 0.96)'} stroke={darkMode ? 'rgba(59, 130, 246, 0.35)' : 'rgba(59, 130, 246, 0.22)'} strokeWidth="1.5" />
                                        <circle cx="42" cy="32" r="3" fill={darkMode ? 'rgba(18, 22, 32, 0.94)' : 'rgba(255, 255, 255, 0.96)'} stroke={darkMode ? 'rgba(59, 130, 246, 0.35)' : 'rgba(59, 130, 246, 0.22)'} strokeWidth="1" />
                                    </svg>
                                </div>
                            )}

                            <div style={{ animation: (!prefersReducedMotion && isIdle) ? 'robotFloat 6s ease-in-out infinite' : 'none' }}>
                                <div style={{ position: 'relative', width: 'clamp(130px, 16vw, 180px)', height: 'clamp(130px, 16vw, 180px)' }}>
                                    <div style={{ position: 'absolute', inset: '-30px', borderRadius: '50%', background: darkMode ? 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 60%)', filter: 'blur(20px)' }} />
                                    {darkMode && <div style={{ position: 'absolute', inset: '-8px', borderRadius: '50%', boxShadow: '0 0 30px rgba(59,130,246,0.25), 0 0 60px rgba(59,130,246,0.15)' }} />}
                                    <div style={{ position: 'absolute', bottom: '-20px', left: '10%', width: '80%', height: '20px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,0,0,0.4) 0%, transparent 70%)', filter: 'blur(10px)' }} />
                                    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: darkMode ? 'radial-gradient(ellipse 120% 120% at 30% 20%, rgba(80,80,95,0.5) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(35,35,45,1) 0%, rgba(18,18,22,1) 100%)' : 'radial-gradient(ellipse 120% 120% at 30% 20%, rgba(255,255,255,0.8) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(240,240,245,1) 0%, rgba(220,220,230,1) 100%)', boxShadow: darkMode ? 'inset -10px -10px 30px rgba(0,0,0,0.8), inset 10px 10px 30px rgba(255,255,255,0.05)' : 'inset -8px -8px 20px rgba(0,0,0,0.15), inset 8px 8px 20px rgba(255,255,255,0.8)', overflow: 'hidden' }}>
                                        <div style={{ position: 'absolute', top: '5%', left: '8%', width: '85%', height: '45%', borderRadius: '50%', background: darkMode ? 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 100%)' : 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, transparent 100%)' }} />
                                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', gap: 'clamp(20px, 3vw, 30px)' }}>
                                            <div ref={leftPupilRef} data-x="0" data-y="0" style={{ width: 'clamp(8px, 1.1vw, 12px)', height: isBlinking ? '3px' : 'clamp(24px, 3vw, 32px)', borderRadius: isBlinking ? '1px' : '6px', background: isBlinking ? 'rgba(100,180,220,0.5)' : 'linear-gradient(180deg, rgba(150,220,255,1) 0%, rgba(80,170,230,1) 40%, rgba(50,140,200,1) 100%)', boxShadow: isBlinking ? 'none' : '0 0 10px rgba(100,190,255,0.6), 0 0 20px rgba(80,170,230,0.35)', transition: 'height 0.1s, border-radius 0.1s' }} />
                                            <div ref={rightPupilRef} data-x="0" data-y="0" style={{ width: 'clamp(8px, 1.1vw, 12px)', height: isBlinking ? '3px' : 'clamp(24px, 3vw, 32px)', borderRadius: isBlinking ? '1px' : '6px', background: isBlinking ? 'rgba(100,180,220,0.5)' : 'linear-gradient(180deg, rgba(150,220,255,1) 0%, rgba(80,170,230,1) 40%, rgba(50,140,200,1) 100%)', boxShadow: isBlinking ? 'none' : '0 0 10px rgba(100,190,255,0.6), 0 0 20px rgba(80,170,230,0.35)', transition: 'height 0.1s, border-radius 0.1s' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div style={{ ...styles.container, width: '100%', position: 'relative', zIndex: 2 }}>
                        <div className="fade-in"><p style={{ ...styles.sectionTitle, fontSize: '14px', marginBottom: '24px' }}>Hi, I'm</p></div>
                        <h1 className="fade-in fade-in-delay-1" style={{ ...styles.heading, fontSize: 'clamp(44px, 8vw, 88px)', marginBottom: '20px' }}>Abeed Mulla</h1>
                        <h2 className="fade-in fade-in-delay-2" style={{ fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 400, color: theme.textMuted, marginBottom: '32px', minHeight: '1.4em' }}>{typewriterText}<span className="typewriter-cursor" style={{ color: theme.accent }}>|</span></h2>
                        <p className="fade-in fade-in-delay-3" style={{ ...styles.paragraph, fontSize: 'clamp(16px, 1.4vw, 19px)', marginBottom: '44px', maxWidth: '680px' }}>I'm a Computer Science (Honours, Co-op) student at Dalhousie University, graduating in December 2026. Currently working as a Software Engineer Intern at AXIS Capital, I have hands-on experience developing production applications using React, TypeScript, .NET APIs, and SQL Server. I enjoy building reliable, user-focused software and am seeking full-time opportunities across software development after graduation.</p>
                        <div className="fade-in fade-in-delay-4" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                            <a href="#projects" style={{ ...styles.button, ...styles.buttonPrimary, padding: '14px 28px', fontSize: '15px' }} onClick={(e) => { e.preventDefault(); scrollToSection('#projects'); }}>View Projects <ArrowRight size={18} /></a>
                            <a href={RESUME_URL} download={RESUME_FILENAME} style={{ ...styles.button, ...styles.buttonSecondary, padding: '14px 28px', fontSize: '15px' }}><Download size={18} /> Download Resume</a>
                        </div>

                        {/* Mobile Robot - below text, centered */}
                        {isMobile && robotVisible && (
                            <div
                                className="hero-robot-mobile fade-in fade-in-delay-4"
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    marginTop: '48px',
                                    opacity: robotOpacity,
                                }}
                            >
                                {/* Speech Bubble - above robot on mobile */}
                                {showThoughtBubble && (
                                    <div
                                        className="thought-bubble-enter"
                                        style={{
                                            marginBottom: '20px',
                                            animation: !prefersReducedMotion ? 'thoughtFloat 5s ease-in-out infinite' : 'none',
                                        }}
                                    >
                                        <div
                                            style={{
                                                position: 'relative',
                                                padding: '14px 18px',
                                                borderRadius: '18px',
                                                backgroundColor: darkMode ? 'rgba(18, 22, 32, 0.94)' : 'rgba(255, 255, 255, 0.96)',
                                                border: `1.5px solid ${darkMode ? 'rgba(59, 130, 246, 0.35)' : 'rgba(59, 130, 246, 0.22)'}`,
                                                boxShadow: darkMode
                                                    ? '0 0 25px rgba(59, 130, 246, 0.18), 0 8px 32px rgba(0, 0, 0, 0.5)'
                                                    : '0 0 20px rgba(59, 130, 246, 0.1), 0 8px 32px rgba(0, 0, 0, 0.1)',
                                                backdropFilter: 'blur(16px)',
                                                maxWidth: 'calc(100vw - 80px)',
                                            }}
                                        >
                                            <p style={{
                                                fontSize: '14px',
                                                fontWeight: 500,
                                                color: darkMode ? '#93c5fd' : theme.accent,
                                                margin: 0,
                                                lineHeight: 1.5,
                                                textAlign: 'center',
                                            }}>
                                                {thoughtText}
                                                <span className="thought-cursor" style={{ color: darkMode ? '#93c5fd' : theme.accent, fontWeight: 300, marginLeft: '2px', opacity: 0.7 }}>|</span>
                                            </p>
                                        </div>
                                        {/* Small connector dots */}
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '8px', gap: '6px' }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: darkMode ? 'rgba(18, 22, 32, 0.94)' : 'rgba(255, 255, 255, 0.96)', border: `1.5px solid ${darkMode ? 'rgba(59, 130, 246, 0.35)' : 'rgba(59, 130, 246, 0.22)'}` }} />
                                            <div style={{ width: '5px', height: '5px', borderRadius: '50%', backgroundColor: darkMode ? 'rgba(18, 22, 32, 0.94)' : 'rgba(255, 255, 255, 0.96)', border: `1px solid ${darkMode ? 'rgba(59, 130, 246, 0.35)' : 'rgba(59, 130, 246, 0.22)'}` }} />
                                        </div>
                                    </div>
                                )}

                                {/* Robot */}
                                <div style={{ animation: !prefersReducedMotion ? 'robotFloat 6s ease-in-out infinite' : 'none' }}>
                                    <div style={{ position: 'relative', width: '120px', height: '120px' }}>
                                        <div style={{ position: 'absolute', inset: '-25px', borderRadius: '50%', background: darkMode ? 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 60%)', filter: 'blur(15px)' }} />
                                        {darkMode && <div style={{ position: 'absolute', inset: '-6px', borderRadius: '50%', boxShadow: '0 0 25px rgba(59,130,246,0.25), 0 0 50px rgba(59,130,246,0.15)' }} />}
                                        <div style={{ position: 'absolute', bottom: '-15px', left: '10%', width: '80%', height: '15px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%)', filter: 'blur(8px)' }} />
                                        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: darkMode ? 'radial-gradient(ellipse 120% 120% at 30% 20%, rgba(80,80,95,0.5) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(35,35,45,1) 0%, rgba(18,18,22,1) 100%)' : 'radial-gradient(ellipse 120% 120% at 30% 20%, rgba(255,255,255,0.8) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(240,240,245,1) 0%, rgba(220,220,230,1) 100%)', boxShadow: darkMode ? 'inset -8px -8px 25px rgba(0,0,0,0.8), inset 8px 8px 25px rgba(255,255,255,0.05)' : 'inset -6px -6px 15px rgba(0,0,0,0.15), inset 6px 6px 15px rgba(255,255,255,0.8)', overflow: 'hidden' }}>
                                            <div style={{ position: 'absolute', top: '5%', left: '8%', width: '85%', height: '45%', borderRadius: '50%', background: darkMode ? 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 100%)' : 'linear-gradient(180deg, rgba(255,255,255,0.7) 0%, transparent 100%)' }} />
                                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', gap: '22px' }}>
                                                <div style={{ width: '10px', height: isBlinking ? '3px' : '28px', borderRadius: isBlinking ? '1px' : '5px', background: isBlinking ? 'rgba(100,180,220,0.5)' : 'linear-gradient(180deg, rgba(150,220,255,1) 0%, rgba(80,170,230,1) 40%, rgba(50,140,200,1) 100%)', boxShadow: isBlinking ? 'none' : '0 0 10px rgba(100,190,255,0.6), 0 0 20px rgba(80,170,230,0.35)', transition: 'height 0.1s, border-radius 0.1s' }} />
                                                <div style={{ width: '10px', height: isBlinking ? '3px' : '28px', borderRadius: isBlinking ? '1px' : '5px', background: isBlinking ? 'rgba(100,180,220,0.5)' : 'linear-gradient(180deg, rgba(150,220,255,1) 0%, rgba(80,170,230,1) 40%, rgba(50,140,200,1) 100%)', boxShadow: isBlinking ? 'none' : '0 0 10px rgba(100,190,255,0.6), 0 0 20px rgba(80,170,230,0.35)', transition: 'height 0.1s, border-radius 0.1s' }} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* About Section */}
                <section id="about" style={{ ...styles.section, backgroundColor: darkMode ? 'rgba(20,20,22,0.5)' : 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)' }}>
                    <div style={styles.container}>
                        <p style={styles.sectionTitle}>About</p>
                        <h2 style={{ ...styles.heading, marginBottom: '48px' }}>How I Approach Software Development</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                            <div>
                                <p style={{ ...styles.paragraph, marginBottom: '24px' }}>I enjoy building software that solves real problems and is reliable, practical, and easy to use. Whether I'm working on a user interface, backend functionality, or debugging an issue, I like understanding how things work and finding solutions that make sense.</p>
                                <p style={{ ...styles.paragraph, marginBottom: '24px' }}>At AXIS Capital, I started as a Reinsurance Systems Engineer Co-op and now continue part-time as a Software Engineer Intern. Working on Compass NextGen has given me hands-on experience developing production features, resolving bugs, and collaborating with an engineering team.</p>
                                <p style={styles.paragraph}>As I approach graduation in December 2026, I'm looking forward to applying what I've learned, taking on new challenges, and continuing to grow as a developer. I'm currently exploring <strong style={{ color: theme.text }}>full-time opportunities</strong> across software development.</p>
                            </div>
                            <div style={{ ...styles.card, backgroundColor: darkMode ? 'rgba(10,10,11,0.7)' : 'rgba(250,250,250,0.8)' }}>
                                <h3 style={{ fontSize: '16px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}><Code2 size={18} style={{ color: theme.accent }} />Programming Principles I Care About</h3>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    {['Edge cases and error handling', "Code that's readable by others", 'Understanding system trade-offs', 'Testing assumptions', 'Performance, scalability and security'].map((item, i) => (
                                        <li key={i} style={{ fontSize: '14px', color: theme.textMuted, paddingLeft: '16px', borderLeft: `2px solid ${theme.accent}`, lineHeight: 1.5 }}>{item}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Skills Section */}
                <section id="skills" style={styles.section}>
                    <div style={styles.container}>
                        <SkillsSection theme={theme} darkMode={darkMode} styles={styles} />
                    </div>
                </section>

                {/* Experience Section */}
                <section id="experience" style={{ ...styles.section, backgroundColor: darkMode ? 'rgba(20,20,22,0.5)' : 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)' }}>
                    <div style={styles.container}>
                        <ExperienceSection theme={theme} darkMode={darkMode} styles={styles} />
                    </div>
                </section>

                {/* Projects Section */}
                <section id="projects" style={styles.section}>
                    <div style={styles.container}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '48px' }}>
                            <div>
                                <p style={styles.sectionTitle}>Selected Work</p>
                                <h2 style={{ ...styles.heading, marginBottom: '16px' }}>Featured Projects</h2>
                                <p style={{ ...styles.paragraph, marginBottom: 0 }}>A selection of applications and systems I've built, exploring different areas of software development.</p>
                            </div>
                            <a href="https://github.com/AbeedMulla" target="_blank" rel="noopener noreferrer" style={{ ...styles.button, ...styles.buttonSecondary, fontSize: '13px', padding: '10px 16px' }}><Github size={16} /> View GitHub</a>
                        </div>
                        <ProjectsShowcase projects={projectsData} theme={theme} darkMode={darkMode} styles={styles} />
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" style={{ ...styles.section, backgroundColor: darkMode ? 'rgba(20,20,22,0.5)' : 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)', position: 'relative', overflow: 'hidden' }}>
                    <div style={styles.container}>
                        <Reveal>
                            <div style={{ textAlign: 'center', maxWidth: '680px', margin: '0 auto' }}>
                                <p style={{ ...styles.sectionTitle, marginBottom: '16px' }}>Get In Touch</p>
                                <h2 style={{ ...styles.heading, fontSize: 'clamp(36px, 6vw, 56px)', marginBottom: '20px' }}>Let's Connect</h2>
                                <p style={{ ...styles.paragraph, fontSize: 'clamp(16px, 1.4vw, 18px)', maxWidth: '620px', margin: '0 auto 36px', textAlign: 'center' }}>I'm exploring full-time opportunities in software development following my December 2026 graduation. Whether it's an opportunity, a project, or a conversation about technology, I'd be happy to connect.</p>
                                <div className="contact-ctas" style={{ display: 'flex', justifyContent: 'center', gap: '14px', flexWrap: 'wrap' }}>
                                    <button
                                        type="button"
                                        onClick={() => setContactModalOpen(true)}
                                        className="contact-cta contact-cta-primary"
                                        style={{ ...styles.button, ...styles.buttonPrimary, padding: '14px 28px', fontSize: '15px', fontFamily: 'inherit' }}
                                    >
                                        <Send size={17} aria-hidden="true" /> Send a Message
                                    </button>
                                    <a href={RESUME_URL} download={RESUME_FILENAME} className="contact-cta contact-cta-secondary" style={{ ...styles.button, ...styles.buttonSecondary, padding: '14px 28px', fontSize: '15px' }}>
                                        <Download size={17} aria-hidden="true" /> Download Resume
                                    </a>
                                </div>
                            </div>
                        </Reveal>
                        <Reveal delay={100}>
                            <ul className="contact-links" aria-label="Contact links">
                                {contactLinks.map(({ label, value, href, icon: Icon, external }) => (
                                    <li key={label} style={{ display: 'flex' }}>
                                        <a
                                            href={href}
                                            className="exp-card contact-link"
                                            {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                                            aria-label={external ? `${label}: ${value} (opens in a new tab)` : `${label}: ${value}`}
                                            style={{
                                                display: 'flex', alignItems: 'center', gap: '14px', width: '100%', padding: '16px 18px', textDecoration: 'none', color: theme.text,
                                                backgroundColor: darkMode ? 'rgba(15,15,17,0.85)' : 'rgba(255,255,255,0.95)',
                                                border: `1px solid ${theme.border}`, borderRadius: '14px',
                                                '--exp-hover-border': darkMode ? 'rgba(59,130,246,0.5)' : 'rgba(59,130,246,0.4)',
                                                '--exp-hover-shadow': darkMode ? '0 0 24px rgba(59,130,246,0.1), 0 12px 30px rgba(0,0,0,0.3)' : '0 0 20px rgba(59,130,246,0.07), 0 10px 24px rgba(0,0,0,0.07)',
                                            }}
                                        >
                                            <span aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '40px', height: '40px', borderRadius: '10px', backgroundColor: theme.accentMuted, color: theme.accent, flexShrink: 0 }}>
                                                <Icon size={18} />
                                            </span>
                                            <span style={{ display: 'flex', flexDirection: 'column', minWidth: 0, textAlign: 'left' }}>
                                                <span style={{ fontSize: '12px', fontWeight: 600, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '2px' }}>{label}</span>
                                                <span style={{ ...styles.mono, fontSize: '13px', color: theme.text, overflowWrap: 'anywhere' }}>{value}</span>
                                            </span>
                                            {external && <ExternalLink size={14} aria-hidden="true" className="contact-link-icon" style={{ marginLeft: 'auto', color: theme.textMuted, flexShrink: 0 }} />}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                    </div>

                    {/* Contact Robot */}
                    {showContactRobot && !isMobile && (
                        <div
                            ref={contactRobotRef}
                            className="contact-robot-wrapper contact-robot-enter"
                            style={{
                                position: 'absolute',
                                top: '230px', // level with the description, bubble beside the heading
                                right: 'clamp(30px, 6vw, 80px)',
                                zIndex: 5,
                                pointerEvents: 'none',
                            }}
                        >
                            {/* Speech Bubble */}
                            {contactBubbleVisible && (
                                <div
                                    className="contact-bubble contact-bubble-enter"
                                    style={{
                                        position: 'absolute',
                                        bottom: 'calc(100% + 20px)',
                                        right: '-10px',
                                        zIndex: 10,
                                        animation: !prefersReducedMotion ? 'thoughtFloat 4s ease-in-out infinite' : 'none',
                                    }}
                                >
                                    <div
                                        style={{
                                            position: 'relative',
                                            padding: '14px 18px',
                                            borderRadius: '16px',
                                            backgroundColor: darkMode ? 'rgba(18, 22, 32, 0.95)' : 'rgba(255, 255, 255, 0.98)',
                                            border: `1.5px solid ${darkMode ? 'rgba(59, 130, 246, 0.35)' : 'rgba(59, 130, 246, 0.25)'}`,
                                            boxShadow: darkMode
                                                ? '0 0 20px rgba(59, 130, 246, 0.15), 0 8px 24px rgba(0, 0, 0, 0.4)'
                                                : '0 0 15px rgba(59, 130, 246, 0.1), 0 8px 24px rgba(0, 0, 0, 0.08)',
                                            backdropFilter: 'blur(12px)',
                                            width: 'max-content',
                                            maxWidth: '220px',
                                        }}
                                    >
                                        <p style={{
                                            fontSize: '13px',
                                            fontWeight: 500,
                                            color: darkMode ? '#93c5fd' : theme.accent,
                                            margin: 0,
                                            lineHeight: 1.5,
                                            textShadow: darkMode ? '0 0 15px rgba(59, 130, 246, 0.2)' : 'none',
                                        }}>
                                            Hiring a new grad? Let’s connect. 💬
                                        </p>
                                    </div>
                                    {/* Bubble tail */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '-8px',
                                        right: '30px',
                                        width: '16px',
                                        height: '16px',
                                        backgroundColor: darkMode ? 'rgba(18, 22, 32, 0.95)' : 'rgba(255, 255, 255, 0.98)',
                                        border: `1.5px solid ${darkMode ? 'rgba(59, 130, 246, 0.35)' : 'rgba(59, 130, 246, 0.25)'}`,
                                        borderTop: 'none',
                                        borderLeft: 'none',
                                        transform: 'rotate(45deg)',
                                        boxShadow: darkMode ? '4px 4px 8px rgba(0, 0, 0, 0.2)' : '2px 2px 4px rgba(0, 0, 0, 0.05)',
                                    }} />
                                </div>
                            )}

                            {/* Robot */}
                            <div style={{ animation: !prefersReducedMotion ? 'robotFloat 5s ease-in-out infinite' : 'none' }}>
                                <div style={{ position: 'relative', width: '90px', height: '90px' }}>
                                    <div style={{ position: 'absolute', inset: '-20px', borderRadius: '50%', background: darkMode ? 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 60%)', filter: 'blur(15px)' }} />
                                    {darkMode && <div style={{ position: 'absolute', inset: '-5px', borderRadius: '50%', boxShadow: '0 0 20px rgba(59,130,246,0.2), 0 0 40px rgba(59,130,246,0.1)' }} />}
                                    <div style={{ position: 'absolute', bottom: '-12px', left: '10%', width: '80%', height: '12px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,0,0,0.3) 0%, transparent 70%)', filter: 'blur(6px)' }} />
                                    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: darkMode ? 'radial-gradient(ellipse 120% 120% at 30% 20%, rgba(80,80,95,0.5) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(35,35,45,1) 0%, rgba(18,18,22,1) 100%)' : 'radial-gradient(ellipse 120% 120% at 30% 20%, rgba(255,255,255,0.8) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(240,240,245,1) 0%, rgba(220,220,230,1) 100%)', boxShadow: darkMode ? 'inset -6px -6px 20px rgba(0,0,0,0.8), inset 6px 6px 20px rgba(255,255,255,0.05)' : 'inset -5px -5px 12px rgba(0,0,0,0.15), inset 5px 5px 12px rgba(255,255,255,0.8)', overflow: 'hidden' }}>
                                        <div style={{ position: 'absolute', top: '5%', left: '8%', width: '85%', height: '45%', borderRadius: '50%', background: darkMode ? 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)' : 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)' }} />
                                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', gap: '18px' }}>
                                            <div style={{ width: '7px', height: '22px', borderRadius: '4px', background: 'linear-gradient(180deg, rgba(150,220,255,1) 0%, rgba(80,170,230,1) 40%, rgba(50,140,200,1) 100%)', boxShadow: '0 0 8px rgba(100,190,255,0.6), 0 0 16px rgba(80,170,230,0.3)' }} />
                                            <div style={{ width: '7px', height: '22px', borderRadius: '4px', background: 'linear-gradient(180deg, rgba(150,220,255,1) 0%, rgba(80,170,230,1) 40%, rgba(50,140,200,1) 100%)', boxShadow: '0 0 8px rgba(100,190,255,0.6), 0 0 16px rgba(80,170,230,0.3)' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Mobile Contact Robot */}
                    {showContactRobot && isMobile && (
                        <div
                            ref={contactRobotRef}
                            className="contact-robot-enter"
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                marginTop: '40px',
                                paddingBottom: '20px',
                            }}
                        >
                            {/* Speech Bubble - above robot on mobile */}
                            {contactBubbleVisible && (
                                <div
                                    className="contact-bubble-enter"
                                    style={{
                                        marginBottom: '15px',
                                        animation: !prefersReducedMotion ? 'thoughtFloat 4s ease-in-out infinite' : 'none',
                                    }}
                                >
                                    <div
                                        style={{
                                            padding: '12px 16px',
                                            borderRadius: '14px',
                                            backgroundColor: darkMode ? 'rgba(18, 22, 32, 0.95)' : 'rgba(255, 255, 255, 0.98)',
                                            border: `1.5px solid ${darkMode ? 'rgba(59, 130, 246, 0.35)' : 'rgba(59, 130, 246, 0.25)'}`,
                                            boxShadow: darkMode
                                                ? '0 0 15px rgba(59, 130, 246, 0.12), 0 6px 20px rgba(0, 0, 0, 0.3)'
                                                : '0 0 12px rgba(59, 130, 246, 0.08), 0 6px 16px rgba(0, 0, 0, 0.06)',
                                            backdropFilter: 'blur(10px)',
                                            maxWidth: '200px',
                                        }}
                                    >
                                        <p style={{
                                            fontSize: '12px',
                                            fontWeight: 500,
                                            color: darkMode ? '#93c5fd' : theme.accent,
                                            margin: 0,
                                            lineHeight: 1.4,
                                            textAlign: 'center',
                                        }}>
                                            Hiring a new grad? Let’s connect. 💬
                                        </p>
                                    </div>
                                    {/* Small connector dots */}
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '6px', gap: '4px' }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: darkMode ? 'rgba(18, 22, 32, 0.95)' : 'rgba(255, 255, 255, 0.98)', border: `1px solid ${darkMode ? 'rgba(59, 130, 246, 0.35)' : 'rgba(59, 130, 246, 0.25)'}` }} />
                                        <div style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: darkMode ? 'rgba(18, 22, 32, 0.95)' : 'rgba(255, 255, 255, 0.98)', border: `1px solid ${darkMode ? 'rgba(59, 130, 246, 0.35)' : 'rgba(59, 130, 246, 0.25)'}` }} />
                                    </div>
                                </div>
                            )}

                            {/* Robot */}
                            <div style={{ animation: !prefersReducedMotion ? 'robotFloat 5s ease-in-out infinite' : 'none' }}>
                                <div style={{ position: 'relative', width: '70px', height: '70px' }}>
                                    <div style={{ position: 'absolute', inset: '-15px', borderRadius: '50%', background: darkMode ? 'radial-gradient(circle, rgba(59,130,246,0.15) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 60%)', filter: 'blur(12px)' }} />
                                    {darkMode && <div style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', boxShadow: '0 0 15px rgba(59,130,246,0.15), 0 0 30px rgba(59,130,246,0.08)' }} />}
                                    <div style={{ position: 'absolute', bottom: '-10px', left: '10%', width: '80%', height: '10px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,0,0,0.25) 0%, transparent 70%)', filter: 'blur(5px)' }} />
                                    <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: darkMode ? 'radial-gradient(ellipse 120% 120% at 30% 20%, rgba(80,80,95,0.5) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(35,35,45,1) 0%, rgba(18,18,22,1) 100%)' : 'radial-gradient(ellipse 120% 120% at 30% 20%, rgba(255,255,255,0.8) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(240,240,245,1) 0%, rgba(220,220,230,1) 100%)', boxShadow: darkMode ? 'inset -5px -5px 15px rgba(0,0,0,0.8), inset 5px 5px 15px rgba(255,255,255,0.05)' : 'inset -4px -4px 10px rgba(0,0,0,0.15), inset 4px 4px 10px rgba(255,255,255,0.8)', overflow: 'hidden' }}>
                                        <div style={{ position: 'absolute', top: '5%', left: '8%', width: '85%', height: '45%', borderRadius: '50%', background: darkMode ? 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)' : 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)' }} />
                                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', gap: '14px' }}>
                                            <div style={{ width: '6px', height: '18px', borderRadius: '3px', background: 'linear-gradient(180deg, rgba(150,220,255,1) 0%, rgba(80,170,230,1) 40%, rgba(50,140,200,1) 100%)', boxShadow: '0 0 6px rgba(100,190,255,0.6), 0 0 12px rgba(80,170,230,0.3)' }} />
                                            <div style={{ width: '6px', height: '18px', borderRadius: '3px', background: 'linear-gradient(180deg, rgba(150,220,255,1) 0%, rgba(80,170,230,1) 40%, rgba(50,140,200,1) 100%)', boxShadow: '0 0 6px rgba(100,190,255,0.6), 0 0 12px rgba(80,170,230,0.3)' }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </section>

                {/* Contact Modal */}
                <ContactModal
                    isOpen={contactModalOpen}
                    onClose={() => setContactModalOpen(false)}
                    theme={theme}
                    darkMode={darkMode}
                    prefersReducedMotion={prefersReducedMotion}
                />

                <footer style={{ padding: '32px 0', borderTop: `1px solid ${theme.border}`, backgroundColor: 'transparent' }}>
                    <div style={{ ...styles.container, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                        <p style={{ fontSize: '13px', color: theme.textMuted }}>© 2026 Abeed Mulla</p>
                        <p style={{ fontSize: '13px', color: theme.textMuted }}>Built with React · Halifax, NS</p>
                    </div>
                </footer>
            </div>
        </>
    );
}

// ============================================
// SKILLS
// ============================================

function SkillsSection({ theme, darkMode, styles }) {
    const cardBase = {
        backgroundColor: darkMode ? 'rgba(15,15,17,0.85)' : 'rgba(255,255,255,0.95)',
        border: `1px solid ${theme.border}`,
        borderRadius: '16px',
        boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.25)' : '0 4px 16px rgba(0,0,0,0.04)',
        '--exp-hover-border': darkMode ? 'rgba(59,130,246,0.5)' : 'rgba(59,130,246,0.4)',
        '--exp-hover-shadow': darkMode ? '0 0 30px rgba(59,130,246,0.1), 0 16px 40px rgba(0,0,0,0.35)' : '0 0 24px rgba(59,130,246,0.07), 0 12px 32px rgba(0,0,0,0.08)',
    };
    const iconBox = (size) => ({ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: `${size}px`, height: `${size}px`, borderRadius: size > 36 ? '12px' : '10px', backgroundColor: theme.accentMuted, color: theme.accent, flexShrink: 0 });
    const tag = {
        ...styles.mono,
        display: 'inline-block',
        padding: '5px 11px',
        fontSize: '12px',
        fontWeight: 500,
        lineHeight: 1.4,
        borderRadius: '8px',
        border: `1px solid ${theme.border}`,
        backgroundColor: darkMode ? 'rgba(255,255,255,0.03)' : '#fafafa',
        color: theme.text,
        '--skill-tag-hover': darkMode ? 'rgba(59,130,246,0.55)' : 'rgba(59,130,246,0.45)',
        '--skill-tag-hover-text': theme.accent,
    };

    return (
        <div>
            <p style={styles.sectionTitle}>Technical Expertise</p>
            <h2 style={{ ...styles.heading, marginBottom: '16px' }}>Technologies & Tools</h2>
            <p style={{ ...styles.paragraph, marginBottom: '48px' }}>Tools and technologies I've used to build applications, solve problems, and collaborate on software projects.</p>

            {/* Professional Stack */}
            <Reveal>
                <div
                    className="exp-card"
                    style={{
                        ...cardBase,
                        border: `1px solid ${darkMode ? 'rgba(59,130,246,0.35)' : 'rgba(59,130,246,0.3)'}`,
                        backgroundColor: darkMode ? 'rgba(17,22,34,0.85)' : 'rgba(239,246,255,0.85)',
                        boxShadow: darkMode ? '0 0 32px rgba(59,130,246,0.08), 0 8px 28px rgba(0,0,0,0.28)' : '0 0 28px rgba(59,130,246,0.06), 0 8px 24px rgba(0,0,0,0.04)',
                        '--exp-hover-border': darkMode ? 'rgba(59,130,246,0.6)' : 'rgba(59,130,246,0.5)',
                        padding: 'clamp(20px, 3vw, 28px) clamp(20px, 3.5vw, 32px)',
                        marginBottom: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: '20px 32px',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                        <span aria-hidden="true" style={iconBox(44)}><Briefcase size={20} /></span>
                        <div>
                            <h3 style={{ fontSize: '18px', fontWeight: 600, lineHeight: 1.3, marginBottom: '2px' }}>Professional Stack</h3>
                            <p style={{ fontSize: '13px', color: theme.textMuted, margin: 0 }}>Technologies used in my work at AXIS Capital</p>
                        </div>
                    </div>
                    <ul aria-label="Professional stack" style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '8px', margin: 0, padding: 0 }}>
                        {professionalStack.map((item) => (
                            <li
                                key={item}
                                className="skill-tag"
                                style={{
                                    ...tag,
                                    fontSize: '13px',
                                    padding: '7px 14px',
                                    color: theme.accent,
                                    border: `1px solid ${darkMode ? 'rgba(59,130,246,0.3)' : 'rgba(59,130,246,0.25)'}`,
                                    backgroundColor: darkMode ? 'rgba(59,130,246,0.1)' : '#ffffff',
                                    '--skill-tag-hover': theme.accent,
                                }}
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            </Reveal>

            {/* Skill categories */}
            <div className="skills-grid">
                {Object.entries(skillsData).map(([category, items], index) => {
                    const Icon = skillIcons[category] || Layers;
                    return (
                        <Reveal key={category} delay={(index % 3) * 80} style={{ display: 'flex' }}>
                            <div className="exp-card" style={{ ...cardBase, padding: '22px 24px 24px', width: '100%' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' }}>
                                    <span aria-hidden="true" style={iconBox(34)}><Icon size={17} /></span>
                                    <h3 style={{ fontSize: '15px', fontWeight: 600, color: theme.text, margin: 0, flex: 1 }}>{category}</h3>
                                    <span aria-hidden="true" style={{ ...styles.mono, fontSize: '11px', color: theme.textMuted }}>{String(items.length).padStart(2, '0')}</span>
                                </div>
                                <ul aria-label={category} style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '8px', margin: 0, padding: 0 }}>
                                    {items.map((skill) => (
                                        <li key={skill} className="skill-tag" style={tag}>{skill}</li>
                                    ))}
                                </ul>
                            </div>
                        </Reveal>
                    );
                })}
            </div>
        </div>
    );
}

// ============================================
// EXPERIENCE & EDUCATION
// ============================================

function Reveal({ children, delay = 0, style }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node || typeof IntersectionObserver === 'undefined') {
            setVisible(true);
            return;
        }
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <div ref={ref} className={`reveal${visible ? ' reveal-visible' : ''}`} style={{ transitionDelay: `${delay}ms`, ...style }}>
            {children}
        </div>
    );
}

function ExperienceSubheading({ icon: Icon, title, theme }) {
    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
            <span aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '8px', backgroundColor: theme.accentMuted, color: theme.accent, flexShrink: 0 }}>
                <Icon size={16} />
            </span>
            <h3 style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', color: theme.text, margin: 0 }}>{title}</h3>
            <span aria-hidden="true" style={{ flex: 1, minWidth: '24px', height: '1px', backgroundColor: theme.border }} />
        </div>
    );
}

function MetaLine({ icon: Icon, children, theme }) {
    return (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: theme.textMuted }}>
            <Icon size={14} aria-hidden="true" style={{ flexShrink: 0 }} />
            {children}
        </span>
    );
}

function ExperienceSection({ theme, darkMode, styles }) {
    const cardBase = {
        backgroundColor: darkMode ? 'rgba(15,15,17,0.85)' : 'rgba(255,255,255,0.95)',
        border: `1px solid ${theme.border}`,
        borderRadius: '16px',
        boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.25)' : '0 4px 16px rgba(0,0,0,0.04)',
        '--exp-hover-border': darkMode ? 'rgba(59,130,246,0.5)' : 'rgba(59,130,246,0.4)',
        '--exp-hover-shadow': darkMode ? '0 0 30px rgba(59,130,246,0.12), 0 16px 40px rgba(0,0,0,0.35)' : '0 0 24px rgba(59,130,246,0.08), 0 12px 32px rgba(0,0,0,0.08)',
    };
    const featuredCard = {
        ...cardBase,
        border: `1px solid ${darkMode ? 'rgba(59,130,246,0.35)' : 'rgba(59,130,246,0.3)'}`,
        boxShadow: darkMode ? '0 0 40px rgba(59,130,246,0.1), 0 8px 32px rgba(0,0,0,0.3)' : '0 0 32px rgba(59,130,246,0.07), 0 8px 24px rgba(0,0,0,0.05)',
        '--exp-hover-border': darkMode ? 'rgba(59,130,246,0.6)' : 'rgba(59,130,246,0.5)',
        '--exp-hover-shadow': darkMode ? '0 0 48px rgba(59,130,246,0.16), 0 16px 40px rgba(0,0,0,0.35)' : '0 0 36px rgba(59,130,246,0.1), 0 12px 32px rgba(0,0,0,0.08)',
        padding: 'clamp(24px, 4vw, 40px)',
    };
    const chip = { display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '3px 10px', fontSize: '12px', fontWeight: 500, borderRadius: '999px', border: `1px solid ${theme.border}`, color: theme.textMuted, whiteSpace: 'nowrap' };
    const subsection = { marginTop: '64px' };

    return (
        <div>
            <p style={styles.sectionTitle}>Experience</p>
            <h2 style={{ ...styles.heading, marginBottom: '16px' }}>Experience & Education</h2>
            <p style={{ ...styles.paragraph, marginBottom: '56px' }}>From building personal projects to contributing to real-world software.</p>

            {/* Professional Experience — AXIS Capital */}
            <ExperienceSubheading icon={Briefcase} title="Professional Experience" theme={theme} />
            <Reveal>
                <article className="exp-card" style={{ ...featuredCard, position: 'relative', cursor: 'pointer' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '32px' }}>
                        <div>
                            <h4 style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 600, lineHeight: 1.2, marginBottom: '8px' }}>
                                <a href={axisExperience.url} target="_blank" rel="noopener noreferrer" className="exp-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                    {axisExperience.company}
                                    <ExternalLink size={18} aria-hidden="true" className="exp-link-icon" style={{ color: theme.accent }} />
                                    <span style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>(opens in a new tab)</span>
                                </a>
                            </h4>
                            <MetaLine icon={MapPin} theme={theme}>{axisExperience.location}</MetaLine>
                        </div>
                    </div>

                    <ol style={{ listStyle: 'none', position: 'relative', margin: 0, padding: 0 }}>
                        <span aria-hidden="true" style={{ position: 'absolute', left: '5px', top: '8px', bottom: '8px', width: '2px', backgroundColor: darkMode ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.2)' }} />
                        {axisExperience.roles.map((role, index) => (
                            <li key={role.title} style={{ position: 'relative', paddingLeft: '32px', paddingBottom: index === axisExperience.roles.length - 1 ? 0 : '32px' }}>
                                <span
                                    aria-hidden="true"
                                    className={role.current ? 'exp-current-dot' : undefined}
                                    style={{ position: 'absolute', left: 0, top: '6px', width: '12px', height: '12px', borderRadius: '50%', backgroundColor: role.current ? theme.accent : (darkMode ? '#0f0f11' : '#ffffff'), border: `2px solid ${theme.accent}` }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px 16px', marginBottom: '10px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                                        <h5 style={{ fontSize: '18px', fontWeight: 600, lineHeight: 1.3, margin: 0 }}>{role.title}</h5>
                                        <span style={chip}>{role.type}</span>
                                        {role.current && (
                                            <span style={{ ...chip, color: theme.accent, borderColor: 'transparent', backgroundColor: theme.accentMuted }}>
                                                <span aria-hidden="true" style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: theme.accent }} />
                                                Current
                                            </span>
                                        )}
                                    </div>
                                    <MetaLine icon={Calendar} theme={theme}><span style={styles.mono}>{role.date}</span></MetaLine>
                                </div>
                                <p style={{ fontSize: '15px', lineHeight: 1.7, color: theme.textMuted, marginBottom: '14px', maxWidth: '760px' }}>{role.description}</p>
                                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px', margin: 0, padding: 0 }}>
                                    {role.points.map((point) => (
                                        <li key={point} style={{ position: 'relative', paddingLeft: '18px', fontSize: '14px', lineHeight: 1.6, color: theme.textMuted, maxWidth: '760px' }}>
                                            <span aria-hidden="true" style={{ position: 'absolute', left: 0, top: '10px', width: '8px', height: '2px', borderRadius: '1px', backgroundColor: theme.accent }} />
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ol>

                    <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: `1px solid ${theme.border}`, display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                        {axisExperience.tags.map((tag) => (<span key={tag} style={{ ...styles.tag, ...styles.mono, fontSize: '12px' }}>{tag}</span>))}
                    </div>
                </article>
            </Reveal>

            {/* Previous Technical Experience */}
            <div style={subsection}>
                <ExperienceSubheading icon={Wrench} title="Previous Technical Experience" theme={theme} />
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '20px' }}>
                    {previousTechExperience.map((job, index) => (
                        <Reveal key={job.org} delay={index * 100} style={{ display: 'flex' }}>
                            <article className="exp-card" style={{ ...cardBase, padding: '24px', display: 'flex', flexDirection: 'column', width: '100%' }}>
                                <h4 style={{ fontSize: '17px', fontWeight: 600, lineHeight: 1.3, marginBottom: '4px' }}>{job.title}</h4>
                                <p style={{ fontSize: '14px', color: theme.text, marginBottom: '10px' }}>{job.org}</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px', marginBottom: '14px' }}>
                                    <MetaLine icon={MapPin} theme={theme}>{job.location}</MetaLine>
                                    <MetaLine icon={Calendar} theme={theme}><span style={styles.mono}>{job.date}</span></MetaLine>
                                </div>
                                <p style={{ fontSize: '14px', lineHeight: 1.65, color: theme.textMuted, marginBottom: '18px', flex: 1 }}>{job.description}</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {job.tags.map((tag) => (<span key={tag} style={{ ...styles.tag, ...styles.mono, fontSize: '11px' }}>{tag}</span>))}
                                </div>
                            </article>
                        </Reveal>
                    ))}
                </div>
            </div>

            {/* Education & Academic Achievements */}
            <div style={subsection}>
                <ExperienceSubheading icon={GraduationCap} title="Education & Academic Achievements" theme={theme} />
                <Reveal>
                    <article className="exp-card" style={{ ...cardBase, padding: 'clamp(24px, 3.5vw, 32px)', position: 'relative', cursor: 'pointer' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '24px', alignItems: 'center' }}>
                            <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                                <span aria-hidden="true" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '44px', height: '44px', borderRadius: '12px', backgroundColor: theme.accentMuted, color: theme.accent, flexShrink: 0 }}>
                                    <GraduationCap size={22} />
                                </span>
                                <div>
                                    <h4 style={{ fontSize: '20px', fontWeight: 600, lineHeight: 1.3, marginBottom: '4px' }}>
                                        <a href={educationData.url} target="_blank" rel="noopener noreferrer" className="exp-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                                            {educationData.school}
                                            <ExternalLink size={16} aria-hidden="true" className="exp-link-icon" style={{ color: theme.accent }} />
                                            <span style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>(opens in a new tab)</span>
                                        </a>
                                    </h4>
                                    <p style={{ fontSize: '15px', color: theme.text, marginBottom: '12px' }}>{educationData.degree}</p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 16px' }}>
                                        <MetaLine icon={MapPin} theme={theme}>{educationData.location}</MetaLine>
                                        <MetaLine icon={Calendar} theme={theme}><span style={styles.mono}>{educationData.date}</span></MetaLine>
                                    </div>
                                </div>
                            </div>
                            <div style={{ padding: '18px 20px', borderRadius: '12px', backgroundColor: theme.accentMuted, border: `1px solid ${darkMode ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.2)'}` }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', flexWrap: 'wrap' }}>
                                    <Award size={20} aria-hidden="true" style={{ color: theme.accent, flexShrink: 0 }} />
                                    <span style={{ fontSize: '16px', fontWeight: 600, color: theme.text }}>{educationData.award.title}</span>
                                    <span style={{ fontSize: '13px', fontWeight: 500, color: theme.accent }}>· {educationData.award.summary}</span>
                                </div>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                    {educationData.award.terms.map((term) => (
                                        <span key={term} style={{ ...chip, backgroundColor: darkMode ? 'rgba(10,10,11,0.6)' : '#ffffff', color: theme.text }}>{term}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </article>
                </Reveal>
            </div>

            {/* Other Work Experience */}
            <div style={subsection}>
                <ExperienceSubheading icon={Users} title="Other Work Experience" theme={theme} />
                <Reveal>
                    <div className="exp-card exp-card-flat" style={{ ...cardBase, boxShadow: 'none', '--exp-hover-shadow': 'none', backgroundColor: darkMode ? 'rgba(15,15,17,0.6)' : 'rgba(255,255,255,0.7)', borderRadius: '14px' }}>
                        {otherWorkExperience.map((job, index) => (
                            <article key={job.org} style={{ padding: '18px 24px', borderTop: index === 0 ? 'none' : `1px solid ${theme.border}` }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '4px 16px', marginBottom: '6px' }}>
                                    <h4 style={{ fontSize: '15px', fontWeight: 600, margin: 0 }}>
                                        {job.title} <span style={{ fontWeight: 400, color: theme.textMuted }}>· {job.org}</span>
                                    </h4>
                                    <span style={{ ...styles.mono, fontSize: '12px', color: theme.textMuted }}>{job.date}</span>
                                </div>
                                <p style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '6px' }}>{job.location}</p>
                                <p style={{ fontSize: '14px', lineHeight: 1.6, color: theme.textMuted, margin: 0 }}>{job.description}</p>
                            </article>
                        ))}
                    </div>
                </Reveal>
            </div>
        </div>
    );
}

// ============================================
// PROJECTS SHOWCASE
// ============================================

const RETURN_TO_PROJECTS_KEY = 'portfolio:returnTo';

function goBackToProjects(e) {
    e.preventDefault();
    try { sessionStorage.setItem(RETURN_TO_PROJECTS_KEY, 'projects'); } catch { /* storage unavailable */ }
    window.location.hash = '';
}

function WindowDots({ dark }) {
    return (
        <div aria-hidden="true" style={{ display: 'flex', gap: '6px', padding: '10px 14px', backgroundColor: dark ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.03)', borderBottom: `1px solid ${dark ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'}` }}>
            {[0, 1, 2].map((i) => (<span key={i} style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: dark ? 'rgba(255,255,255,0.16)' : 'rgba(0,0,0,0.14)' }} />))}
        </div>
    );
}

function ProjectMedia({ project, darkMode }) {
    if (project.isMobileApp) {
        const phones = project.cardImages || [project.thumbnail];
        return (
            <div className="project-media" style={{ aspectRatio: '16 / 10', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4%', padding: '6% 8% 0', backgroundColor: darkMode ? '#0f0f11' : '#eef0f3', overflow: 'hidden' }}>
                {phones.map((src, i) => {
                    const isCenter = phones.length === 3 ? i === 1 : i === 0;
                    return (
                        <img
                            key={src}
                            src={src}
                            alt={isCenter ? `${project.title} app screens` : ''}
                            aria-hidden={isCenter ? undefined : 'true'}
                            loading="lazy"
                            decoding="async"
                            width="806"
                            height="1432"
                            style={{ height: isCenter ? '92%' : '80%', width: 'auto', alignSelf: 'flex-end', borderRadius: '12px 12px 0 0', boxShadow: darkMode ? '0 10px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.08)' : '0 10px 30px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.06)' }}
                        />
                    );
                })}
            </div>
        );
    }

    if (project.isTerminalScreenshot) {
        const size = project.cardImageSize || {};
        return (
            <div className="project-media" style={{ aspectRatio: '16 / 10', display: 'flex', flexDirection: 'column', backgroundColor: '#0d0d0d', overflow: 'hidden' }}>
                <WindowDots dark />
                <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
                    <img src={project.cardImage || project.thumbnail} alt={`${project.title} terminal output`} loading="lazy" decoding="async" width={size.width} height={size.height} style={{ maxWidth: '100%', maxHeight: '100%', width: 'auto', height: 'auto', objectFit: 'contain', borderRadius: '6px' }} />
                </div>
            </div>
        );
    }

    const size = project.imageSize || {};
    return (
        <div className="project-media" style={{ display: 'flex', flexDirection: 'column', height: '100%', backgroundColor: darkMode ? '#0f0f11' : '#f4f4f5', overflow: 'hidden' }}>
            <WindowDots dark={darkMode} />
            <div style={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
                <img src={project.thumbnail} alt={`${project.title} dashboard`} loading="lazy" decoding="async" width={size.width} height={size.height} style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top left' }} />
            </div>
        </div>
    );
}

function FramedScreenshot({ src, alt, size, darkMode, theme }) {
    return (
        <div style={{ borderRadius: '10px', overflow: 'hidden', border: `1px solid ${theme.border}`, backgroundColor: darkMode ? '#0f0f11' : '#f4f4f5' }}>
            <WindowDots dark={darkMode} />
            <img src={src} alt={alt} loading="lazy" decoding="async" width={size?.width} height={size?.height} style={{ display: 'block', width: '100%', height: 'auto' }} />
        </div>
    );
}

function FeaturedMedia({ project, darkMode, theme }) {
    const [main, ...rest] = project.images;
    return (
        <div className="project-media" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <FramedScreenshot src={main.src} alt={main.caption} size={project.imageSize} darkMode={darkMode} theme={theme} />
            {rest.length > 0 && (
                <div className="featured-thumbs-row" style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(rest.length, 2)}, minmax(0, 1fr))`, gap: '12px' }}>
                    {rest.slice(0, 2).map((img) => (
                        <FramedScreenshot key={img.src} src={img.src} alt={img.caption} size={project.imageSize} darkMode={darkMode} theme={theme} />
                    ))}
                </div>
            )}
        </div>
    );
}

function ProjectActions({ project, theme }) {
    const base = { position: 'relative', zIndex: 2, display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '9px 14px', fontSize: '13px', fontWeight: 500, borderRadius: '8px', textDecoration: 'none', transition: 'background-color 0.2s ease, border-color 0.2s ease, color 0.2s ease' };
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: 'auto', paddingTop: '22px' }}>
            {/* Stretched link: covers the whole card so any click opens the project page */}
            <a href={`#project/${project.id}`} className="project-stretch project-action" aria-label={`View the ${project.title} project`} style={{ ...base, position: 'static', backgroundColor: theme.accent, color: '#fff' }}>
                View Project <ArrowRight size={14} aria-hidden="true" />
            </a>
            {project.github && (
                <a href={project.github} target="_blank" rel="noopener noreferrer" className="project-action project-action-secondary" aria-label={`${project.title} source code on GitHub (opens in a new tab)`} style={{ ...base, border: `1px solid ${theme.border}`, color: theme.text, '--action-hover-border': theme.accent }}>
                    <Github size={14} aria-hidden="true" /> GitHub
                </a>
            )}
            {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="project-action project-action-secondary" aria-label={`${project.title} live demo (opens in a new tab)`} style={{ ...base, border: `1px solid ${theme.border}`, color: theme.text, '--action-hover-border': theme.accent }}>
                    <ExternalLink size={14} aria-hidden="true" /> Live Demo
                </a>
            )}
        </div>
    );
}

function ProjectHighlights({ items, theme, compact }) {
    return (
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: compact ? '6px' : '8px', margin: 0, padding: 0 }}>
            {items.map((item) => (
                <li key={item} style={{ position: 'relative', paddingLeft: '18px', fontSize: compact ? '13px' : '14px', lineHeight: 1.55, color: theme.textMuted }}>
                    <span aria-hidden="true" style={{ position: 'absolute', left: 0, top: compact ? '9px' : '10px', width: '8px', height: '2px', borderRadius: '1px', backgroundColor: theme.accent }} />
                    {item}
                </li>
            ))}
        </ul>
    );
}

function ProjectsShowcase({ projects, theme, darkMode, styles }) {
    const featured = projects.find((p) => p.featured) || projects[0];
    const others = projects.filter((p) => p !== featured);

    // Returning from a project page lands back on this section instead of the top of the page
    useEffect(() => {
        let target = null;
        try {
            target = sessionStorage.getItem(RETURN_TO_PROJECTS_KEY);
            sessionStorage.removeItem(RETURN_TO_PROJECTS_KEY);
        } catch { /* storage unavailable */ }
        if (target !== 'projects') return;
        const frame = requestAnimationFrame(() => {
            document.getElementById('projects')?.scrollIntoView({ behavior: 'auto', block: 'start' });
        });
        return () => cancelAnimationFrame(frame);
    }, []);

    const cardBase = {
        position: 'relative',
        cursor: 'pointer',
        overflow: 'hidden',
        backgroundColor: darkMode ? 'rgba(15,15,17,0.9)' : 'rgba(255,255,255,0.96)',
        border: `1px solid ${theme.border}`,
        borderRadius: '20px',
        boxShadow: darkMode ? '0 4px 20px rgba(0,0,0,0.25)' : '0 4px 16px rgba(0,0,0,0.04)',
        '--exp-hover-border': darkMode ? 'rgba(59,130,246,0.5)' : 'rgba(59,130,246,0.4)',
        '--exp-hover-shadow': darkMode ? '0 0 30px rgba(59,130,246,0.1), 0 18px 44px rgba(0,0,0,0.38)' : '0 0 24px rgba(59,130,246,0.07), 0 14px 34px rgba(0,0,0,0.09)',
    };
    const tags = (items) => (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '18px' }}>
            {items.map((t) => (<span key={t} style={{ ...styles.tag, ...styles.mono, fontSize: '11px', padding: '3px 10px' }}>{t}</span>))}
        </div>
    );
    const eyebrow = (text) => (
        <span style={{ fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', color: theme.accent }}>{text}</span>
    );

    return (
        <div>
            {/* Featured project */}
            <Reveal>
                <article
                    className="exp-card project-card project-featured"
                    style={{
                        ...cardBase,
                        border: `1px solid ${darkMode ? 'rgba(59,130,246,0.3)' : 'rgba(59,130,246,0.25)'}`,
                        boxShadow: darkMode ? '0 0 36px rgba(59,130,246,0.07), 0 8px 30px rgba(0,0,0,0.3)' : '0 0 30px rgba(59,130,246,0.06), 0 8px 24px rgba(0,0,0,0.05)',
                    }}
                >
                    <div className="project-featured-media" style={{ padding: '24px 0 24px 24px', alignSelf: 'center' }}>
                        <FeaturedMedia project={featured} darkMode={darkMode} theme={theme} />
                    </div>
                    <div style={{ padding: 'clamp(24px, 3vw, 36px)', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '10px' }}>
                            {eyebrow(featured.subtitle)}
                            <span style={{ fontSize: '11px', fontWeight: 500, padding: '2px 9px', borderRadius: '999px', color: theme.accent, backgroundColor: theme.accentMuted }}>Featured</span>
                        </div>
                        <h3 style={{ fontSize: 'clamp(24px, 3vw, 30px)', fontWeight: 600, lineHeight: 1.2, marginBottom: '12px' }}>{featured.title}</h3>
                        <p style={{ fontSize: '15px', lineHeight: 1.7, color: theme.textMuted, marginBottom: '18px' }}>{featured.description}</p>
                        <ProjectHighlights items={featured.highlights} theme={theme} />
                        {tags(featured.cardTech)}
                        <ProjectActions project={featured} theme={theme} />
                    </div>
                </article>
            </Reveal>

            {/* Secondary projects */}
            <div className="projects-secondary-grid" style={{ marginTop: '24px' }}>
                {others.map((project, index) => (
                    <Reveal key={project.id} delay={index * 100} style={{ display: 'flex' }}>
                        <article className="exp-card project-card" style={{ ...cardBase, display: 'flex', flexDirection: 'column', width: '100%' }}>
                            <div style={{ padding: '16px 16px 0' }}>
                                <div style={{ borderRadius: '12px', overflow: 'hidden', border: `1px solid ${project.isTerminalScreenshot ? '#222' : theme.border}` }}>
                                    <ProjectMedia project={project} darkMode={darkMode} />
                                </div>
                            </div>
                            <div style={{ padding: '22px 24px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                                <div style={{ marginBottom: '8px' }}>{eyebrow(project.subtitle)}</div>
                                <h3 style={{ fontSize: '20px', fontWeight: 600, lineHeight: 1.3, marginBottom: '10px' }}>{project.title}</h3>
                                <p style={{ fontSize: '14px', lineHeight: 1.65, color: theme.textMuted, marginBottom: '16px' }}>{project.description}</p>
                                <ProjectHighlights items={project.highlights} theme={theme} compact />
                                {tags(project.cardTech)}
                                <ProjectActions project={project} theme={theme} />
                            </div>
                        </article>
                    </Reveal>
                ))}
            </div>
        </div>
    );
}

// ============================================
// PROJECT DETAIL PAGE
// ============================================

function CaseStudyGallery({ project, theme, darkMode, isMobile }) {
    const [active, setActive] = useState(0);
    const images = project.images || [];
    if (images.length === 0) return null;

    const count = images.length;
    const current = images[active];
    const go = (delta) => setActive((i) => (i + delta + count) % count);
    const stageBg = project.isTerminalScreenshot ? '#0d0d0d' : (darkMode ? '#0f0f11' : '#eef0f3');

    const onKeyDown = (e) => {
        if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
        if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    };

    const arrow = (delta, label, Icon) => (
        <button
            type="button"
            onClick={() => go(delta)}
            aria-label={label}
            className="gallery-arrow"
            style={{ position: 'absolute', top: '50%', [delta < 0 ? 'left' : 'right']: '12px', transform: 'translateY(-50%)', width: '40px', height: '40px', borderRadius: '50%', border: `1px solid ${darkMode || project.isTerminalScreenshot ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)'}`, backgroundColor: darkMode || project.isTerminalScreenshot ? 'rgba(20,20,22,0.85)' : 'rgba(255,255,255,0.92)', color: darkMode || project.isTerminalScreenshot ? '#f4f4f5' : '#18181b', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)' }}
        >
            <Icon size={18} aria-hidden="true" style={{ flexShrink: 0, width: '18px', height: '18px' }} />
        </button>
    );

    return (
        <div role="region" aria-roledescription="carousel" aria-label={`${project.title} screenshots`} onKeyDown={onKeyDown}>
            <div style={{ borderRadius: '16px', overflow: 'hidden', border: `1px solid ${project.isTerminalScreenshot ? '#222' : theme.border}`, backgroundColor: stageBg }}>
                {!project.isMobileApp && <WindowDots dark={darkMode || project.isTerminalScreenshot} />}
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: project.isMobileApp ? (isMobile ? '20px' : '28px') : (project.isTerminalScreenshot ? (isMobile ? '16px' : '28px 64px') : 0), minHeight: project.isTerminalScreenshot ? (isMobile ? '160px' : '260px') : undefined }}>
                    <img
                        key={current.src}
                        src={current.src}
                        alt={current.caption}
                        decoding="async"
                        className="gallery-image"
                        style={project.isMobileApp
                            ? { height: isMobile ? '420px' : '540px', maxWidth: '100%', width: 'auto', objectFit: 'contain', borderRadius: '14px', boxShadow: darkMode ? '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)' : '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)' }
                            : project.isTerminalScreenshot
                                ? { maxWidth: '100%', maxHeight: isMobile ? '320px' : '440px', width: 'auto', height: 'auto', objectFit: 'contain', borderRadius: '8px' }
                                : { display: 'block', width: '100%', height: 'auto' }}
                    />
                    {count > 1 && arrow(-1, 'Previous screenshot', ChevronLeft)}
                    {count > 1 && arrow(1, 'Next screenshot', ChevronRight)}
                </div>
            </div>
            <p aria-live="polite" style={{ marginTop: '14px', fontSize: '13px', color: theme.textMuted, textAlign: 'center' }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: theme.accent, marginRight: '8px' }}>{String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}</span>
                {current.caption}
            </p>
            {count > 1 && (
                <div className="gallery-thumbs" style={{ display: 'flex', gap: '10px', marginTop: '16px', overflowX: 'auto', padding: '4px 2px', justifyContent: isMobile ? 'flex-start' : 'center' }}>
                    {images.map((img, i) => (
                        <button
                            key={img.src}
                            type="button"
                            onClick={() => setActive(i)}
                            aria-label={`Show screenshot ${i + 1}: ${img.caption}`}
                            aria-current={i === active ? 'true' : undefined}
                            style={{ flexShrink: 0, padding: 0, borderRadius: '8px', overflow: 'hidden', cursor: 'pointer', border: `2px solid ${i === active ? theme.accent : theme.border}`, opacity: i === active ? 1 : 0.65, backgroundColor: project.isTerminalScreenshot ? '#0d0d0d' : stageBg, width: project.isMobileApp ? '52px' : '112px', height: project.isMobileApp ? '92px' : '64px', transition: 'opacity 0.2s ease, border-color 0.2s ease' }}
                        >
                            <img src={img.src} alt="" loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: project.isTerminalScreenshot ? 'contain' : 'cover', objectPosition: 'top' }} />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

function CaseStudySection({ number, title, theme, isMobile, children }) {
    return (
        <Reveal style={{ marginBottom: isMobile ? '56px' : '80px' }}>
            <section>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '14px', marginBottom: '24px', paddingBottom: '14px', borderBottom: `1px solid ${theme.border}` }}>
                    <span aria-hidden="true" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '13px', color: theme.accent }}>{String(number).padStart(2, '0')}</span>
                    <h2 style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: 600, color: theme.text }}>{title}</h2>
                </div>
                {children}
            </section>
        </Reveal>
    );
}

function ProjectDetailPage({ project }) {
    const [darkMode, setDarkMode] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('theme');
        if (saved) setDarkMode(saved === 'dark');

        const checkMobile = () => setIsMobile(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    const theme = {
        bg: darkMode ? '#0a0a0b' : '#fafafa',
        surface: darkMode ? '#141416' : '#ffffff',
        border: darkMode ? '#27272a' : '#e4e4e7',
        text: darkMode ? '#f4f4f5' : '#18181b',
        textMuted: darkMode ? '#a1a1aa' : '#71717a',
        accent: '#3b82f6',
        accentMuted: darkMode ? 'rgba(59,130,246,0.1)' : 'rgba(59,130,246,0.08)',
    };

    const projectIndex = projectsData.findIndex((p) => p.id === project.id);
    const nextProject = projectsData[(projectIndex + 1) % projectsData.length];

    const mono = { fontFamily: "'JetBrains Mono', monospace" };
    const card = { padding: '20px 22px', borderRadius: '14px', backgroundColor: darkMode ? '#121214' : '#ffffff', border: `1px solid ${theme.border}` };
    // Sections are numbered in render order, so optional sections never leave gaps
    let sectionCount = 0;
    const sectionProps = () => ({ number: ++sectionCount, theme, isMobile });

    const Paragraph = ({ children }) => (
        <p style={{ fontSize: isMobile ? '15px' : '16px', lineHeight: 1.8, color: theme.textMuted }}>{children}</p>
    );

    const BulletList = ({ items, square }) => (
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {items.map((item) => (
                <li key={item} style={{ fontSize: '15px', color: theme.textMuted, paddingLeft: '22px', position: 'relative', lineHeight: 1.6 }}>
                    <span aria-hidden="true" style={{ position: 'absolute', left: 0, top: '9px', width: '7px', height: '7px', borderRadius: square ? '2px' : '50%', backgroundColor: theme.accent }} />
                    {item}
                </li>
            ))}
        </ul>
    );

    const CardGrid = ({ items, minWidth = 260 }) => (
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${minWidth}px), 1fr))`, gap: '16px' }}>
            {items.map((item) => (
                <div key={item.title} style={card}>
                    <h3 style={{ fontSize: '15px', fontWeight: 600, color: theme.text, marginBottom: '8px' }}>{item.title}</h3>
                    <p style={{ fontSize: '14px', color: theme.textMuted, lineHeight: 1.7 }}>{item.content}</p>
                </div>
            ))}
        </div>
    );

    const CodeBlock = ({ title, code }) => (
        <div style={{ marginBottom: '20px' }}>
            {title && <p style={{ fontSize: '13px', fontWeight: 600, color: theme.textMuted, marginBottom: '8px' }}>{title}</p>}
            <pre tabIndex={0} aria-label={title ? `${title} code` : 'Code example'} style={{ backgroundColor: darkMode ? '#121214' : '#f4f4f5', padding: '16px 20px', borderRadius: '12px', overflowX: 'auto', fontSize: '13px', lineHeight: 1.65, ...mono, color: theme.text, border: `1px solid ${theme.border}`, whiteSpace: 'pre' }}>
                <code>{code}</code>
            </pre>
        </div>
    );

    const linkButton = { display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '12px 20px', fontSize: '14px', fontWeight: 600, borderRadius: '10px', textDecoration: 'none' };

    return (
        <div style={{ minHeight: '100vh', width: '100%', backgroundColor: theme.bg, color: theme.text, fontFamily: "'Sora', sans-serif", transition: 'background-color 0.3s ease, color 0.3s ease' }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; min-height: 100vh; margin: 0; padding: 0; background-color: ${theme.bg}; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        ::selection { background-color: ${theme.accent}; color: white; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-section { animation: fadeIn 0.6s ease forwards; }
        .reveal { opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
        .reveal.reveal-visible { opacity: 1; transform: none; }
        .gallery-image { animation: fadeIn 0.35s ease; }
        .gallery-thumbs { scrollbar-width: thin; }
        .cs-link { transition: opacity 0.2s ease, border-color 0.2s ease, color 0.2s ease; }
        .cs-link:hover { opacity: 0.9; }
        .cs-link-secondary:hover { border-color: ${theme.accent} !important; color: ${theme.accent} !important; }
        a:focus-visible, button:focus-visible, pre:focus-visible { outline: 2px solid ${theme.accent}; outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .fade-section, .gallery-image { animation: none !important; }
          .reveal { opacity: 1 !important; transform: none !important; transition: none !important; }
        }
      `}</style>

            {/* Header */}
            <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: darkMode ? 'rgba(10,10,11,0.9)' : 'rgba(250,250,250,0.9)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${theme.border}` }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', padding: isMobile ? '12px 16px' : '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
                    <a href="#projects" onClick={goBackToProjects} style={{ display: 'flex', alignItems: 'center', gap: '6px', color: theme.textMuted, textDecoration: 'none', fontSize: '14px' }}>
                        <ChevronLeft size={18} aria-hidden="true" /> {isMobile ? 'Back' : 'Back to Projects'}
                    </a>
                    <div style={{ display: 'flex', gap: isMobile ? '8px' : '12px', alignItems: 'center' }}>
                        {project.live && (
                            <a href={project.live} target="_blank" rel="noopener noreferrer" aria-label="Live demo (opens in a new tab)" className="cs-link" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: isMobile ? '8px 10px' : '8px 16px', fontSize: '13px', fontWeight: 500, borderRadius: '8px', backgroundColor: theme.accent, color: '#fff', textDecoration: 'none' }}>
                                <ExternalLink size={14} aria-hidden="true" /> {!isMobile && 'Live Demo'}
                            </a>
                        )}
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" aria-label="Source code on GitHub (opens in a new tab)" className="cs-link cs-link-secondary" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: isMobile ? '8px 10px' : '8px 16px', fontSize: '13px', fontWeight: 500, borderRadius: '8px', backgroundColor: 'transparent', border: `1px solid ${theme.border}`, color: theme.text, textDecoration: 'none' }}>
                                <Github size={14} aria-hidden="true" /> {!isMobile && 'GitHub'}
                            </a>
                        )}
                        <button type="button" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle theme" style={{ padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', color: theme.textMuted, cursor: 'pointer', display: 'flex' }}>{darkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
                    </div>
                </div>
            </header>

            <main>
                {/* Project header */}
                <section className="fade-section" style={{ paddingTop: isMobile ? '96px' : '128px', paddingBottom: isMobile ? '48px' : '72px', backgroundColor: darkMode ? 'rgba(20,20,22,0.5)' : 'rgba(255,255,255,0.6)', borderBottom: `1px solid ${theme.border}` }}>
                    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px' }}>
                        <span style={{ fontSize: '12px', color: theme.accent, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px' }}>{project.subtitle}</span>
                        <h1 style={{ fontSize: isMobile ? 'clamp(30px, 8vw, 40px)' : 'clamp(40px, 6vw, 56px)', fontWeight: 700, marginTop: '14px', marginBottom: '16px', lineHeight: 1.1 }}>{project.title}</h1>
                        <p style={{ fontSize: isMobile ? '16px' : '19px', color: theme.textMuted, maxWidth: '720px', lineHeight: 1.6, marginBottom: '24px' }}>{project.description}</p>
                        <ul aria-label="Technologies" style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '28px' }}>
                            {project.techStack.map((tech) => (<li key={tech} style={{ padding: '5px 12px', fontSize: '12px', fontWeight: 500, borderRadius: '6px', backgroundColor: theme.accentMuted, color: theme.accent, ...mono }}>{tech}</li>))}
                        </ul>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: isMobile ? '40px' : '56px' }}>
                            {project.live && (
                                <a href={project.live} target="_blank" rel="noopener noreferrer" className="cs-link" style={{ ...linkButton, backgroundColor: theme.accent, color: '#fff' }}><ExternalLink size={16} aria-hidden="true" /> Live Demo</a>
                            )}
                            {project.github && (
                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="cs-link cs-link-secondary" style={{ ...linkButton, border: `1px solid ${theme.border}`, color: theme.text }}><Github size={16} aria-hidden="true" /> View Source</a>
                            )}
                        </div>
                        <CaseStudyGallery project={project} theme={theme} darkMode={darkMode} isMobile={isMobile} />
                    </div>
                </section>

                {/* Body */}
                <div style={{ maxWidth: '840px', margin: '0 auto', padding: isMobile ? '56px 24px 0' : '88px 24px 0' }}>
                    <CaseStudySection {...sectionProps()} title="Overview">
                        <Paragraph>{project.overview}</Paragraph>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '16px', marginTop: '28px' }}>
                            <div style={card}>
                                <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', color: theme.accent, marginBottom: '10px' }}>The Problem</p>
                                <p style={{ fontSize: '14px', color: theme.textMuted, lineHeight: 1.75 }}>{project.problem}</p>
                            </div>
                            <div style={card}>
                                <p style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', color: theme.accent, marginBottom: '10px' }}>The Approach</p>
                                <p style={{ fontSize: '14px', color: theme.textMuted, lineHeight: 1.75 }}>{project.solution}</p>
                            </div>
                        </div>
                    </CaseStudySection>

                    {project.features?.length > 0 && (
                        <CaseStudySection {...sectionProps()} title="Key Features">
                            <ul style={{ listStyle: 'none', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '12px 28px' }}>
                                {project.features.map((feature) => (
                                    <li key={feature} style={{ fontSize: '15px', color: theme.textMuted, paddingLeft: '22px', position: 'relative', lineHeight: 1.6 }}>
                                        <span aria-hidden="true" style={{ position: 'absolute', left: 0, top: '9px', width: '7px', height: '7px', borderRadius: '50%', backgroundColor: theme.accent }} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </CaseStudySection>
                    )}

                    {(project.architectureDiagram || project.architectureDetails) && (
                        <CaseStudySection {...sectionProps()} title={project.architectureDiagram ? project.architectureDiagram.title : 'Architecture'}>
                            {project.architectureDiagram && (
                                <ol style={{ listStyle: 'none', position: 'relative' }}>
                                    <span aria-hidden="true" style={{ position: 'absolute', left: '17px', top: '18px', bottom: '18px', width: '2px', backgroundColor: darkMode ? 'rgba(59,130,246,0.25)' : 'rgba(59,130,246,0.2)' }} />
                                    {project.architectureDiagram.steps.map((step, i) => (
                                        <li key={step.step} style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: '16px', marginBottom: i === project.architectureDiagram.steps.length - 1 ? 0 : '18px' }}>
                                            <span aria-hidden="true" style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: theme.accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 600, flexShrink: 0, ...mono }}>{step.step}</span>
                                            <div style={{ ...card, padding: '12px 16px', flex: 1 }}>
                                                <p style={{ fontSize: '15px', fontWeight: 600, color: theme.text, marginBottom: '2px' }}>{step.label}</p>
                                                <p style={{ fontSize: '14px', color: theme.textMuted, lineHeight: 1.55 }}>{step.description}</p>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            )}
                            {project.architectureDetails && (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
                                    {project.architectureDetails.layers.map((layer, i) => (
                                        <React.Fragment key={layer.name}>
                                            {i > 0 && <span aria-hidden="true" style={{ alignSelf: 'center', width: '2px', height: '14px', backgroundColor: darkMode ? 'rgba(59,130,246,0.3)' : 'rgba(59,130,246,0.25)' }} />}
                                            <div style={{ padding: '14px 18px', borderRadius: '12px', backgroundColor: darkMode ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.05)', border: `1px solid ${darkMode ? 'rgba(59,130,246,0.22)' : 'rgba(59,130,246,0.16)'}` }}>
                                                <p style={{ fontSize: '14px', fontWeight: 600, color: theme.accent, marginBottom: '4px' }}>{layer.name}</p>
                                                <p style={{ fontSize: '14px', color: theme.textMuted, lineHeight: 1.55 }}>{layer.description}</p>
                                            </div>
                                        </React.Fragment>
                                    ))}
                                </div>
                            )}
                        </CaseStudySection>
                    )}

                    {project.httpExplanation && (
                        <CaseStudySection {...sectionProps()} title={project.httpExplanation.title}>
                            <pre tabIndex={0} aria-label="HTTP request and response example" style={{ backgroundColor: darkMode ? '#121214' : '#f4f4f5', padding: '20px 24px', borderRadius: '12px', border: `1px solid ${theme.border}`, fontSize: '13px', lineHeight: 1.75, ...mono, color: theme.textMuted, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                                {project.httpExplanation.content}
                            </pre>
                        </CaseStudySection>
                    )}

                    {project.decisions?.length > 0 && (
                        <CaseStudySection {...sectionProps()} title="Technical Decisions">
                            <CardGrid items={project.decisions} />
                        </CaseStudySection>
                    )}

                    {project.challenges?.length > 0 && (
                        <CaseStudySection {...sectionProps()} title="Engineering Challenges">
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {project.challenges.map((item) => (
                                    <div key={item.title} style={{ ...card, borderLeft: `3px solid ${theme.accent}` }}>
                                        <h3 style={{ fontSize: '16px', fontWeight: 600, color: theme.text, marginBottom: '8px' }}>{item.title}</h3>
                                        <p style={{ fontSize: '14px', color: theme.textMuted, lineHeight: 1.75 }}>{item.content}</p>
                                    </div>
                                ))}
                            </div>
                        </CaseStudySection>
                    )}

                    {project.codeExamples && (
                        <CaseStudySection {...sectionProps()} title="Running the Project">
                            {project.codeExamples.map((example) => (
                                <CodeBlock key={example.title} title={example.title} code={example.code} />
                            ))}
                        </CaseStudySection>
                    )}

                    {(project.learned?.length > 0 || project.futureImprovements?.length > 0) && (
                        <CaseStudySection {...sectionProps()} title="Lessons & Next Steps">
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '16px' }}>
                                {project.learned?.length > 0 && (
                                    <div style={card}>
                                        <h3 style={{ fontSize: '15px', fontWeight: 600, color: theme.text, marginBottom: '14px' }}>What I Learned</h3>
                                        <BulletList items={project.learned} />
                                    </div>
                                )}
                                {project.futureImprovements?.length > 0 && (
                                    <div style={card}>
                                        <h3 style={{ fontSize: '15px', fontWeight: 600, color: theme.text, marginBottom: '14px' }}>Future Improvements</h3>
                                        <BulletList items={project.futureImprovements} square />
                                    </div>
                                )}
                            </div>
                        </CaseStudySection>
                    )}
                </div>

                {/* Footer navigation */}
                <section style={{ borderTop: `1px solid ${theme.border}`, padding: isMobile ? '48px 0 56px' : '64px 0 80px' }}>
                    <div style={{ maxWidth: '840px', margin: '0 auto', padding: '0 24px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
                        <a href="#projects" onClick={goBackToProjects} className="cs-link cs-link-secondary" style={{ ...linkButton, border: `1px solid ${theme.border}`, color: theme.text, fontWeight: 500 }}>
                            <ChevronLeft size={16} aria-hidden="true" /> All Projects
                        </a>
                        {nextProject && nextProject.id !== project.id && (
                            <a href={`#project/${nextProject.id}`} className="cs-link" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', textDecoration: 'none', color: theme.text, marginLeft: 'auto', textAlign: 'right' }}>
                                <span style={{ fontSize: '12px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px', color: theme.textMuted, marginBottom: '4px' }}>Next Project</span>
                                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: isMobile ? '17px' : '20px', fontWeight: 600 }}>{nextProject.title} <ArrowRight size={18} aria-hidden="true" style={{ color: theme.accent }} /></span>
                            </a>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}

// ============================================
// CONTACT MODAL
// ============================================

function ContactModal({ isOpen, onClose, theme, darkMode, prefersReducedMotion }) {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});
    const modalRef = useRef(null);
    const firstInputRef = useRef(null);
    const successHeadingRef = useRef(null);

    const onCloseRef = useRef(onClose);

    useEffect(() => {
        onCloseRef.current = onClose;
    }, [onClose]);

    const [isSending, setIsSending] = useState(false);
    const [submitError, setSubmitError] = useState('');

    // Typewriter state for robot speech bubble
    const [bubbleText, setBubbleText] = useState('');
    const [bubblePhraseIndex, setBubblePhraseIndex] = useState(0);
    const [bubbleCharIndex, setBubbleCharIndex] = useState(0);
    const [isBubbleDeleting, setIsBubbleDeleting] = useState(false);

    const bubblePhrases = [
        "Hey 👋",
        "I'll deliver your message straight to Abeed! 😊.",
    ];

    // Typewriter effect for bubble
    useEffect(() => {
        if (!isOpen || prefersReducedMotion) {
            if (prefersReducedMotion && isOpen) {
                setBubbleText(bubblePhrases[0]);
            }
            return;
        }

        const currentPhrase = bubblePhrases[bubblePhraseIndex];

        const typeTimer = setTimeout(() => {
            if (!isBubbleDeleting) {
                if (bubbleCharIndex < currentPhrase.length) {
                    setBubbleText(currentPhrase.slice(0, bubbleCharIndex + 1));
                    setBubbleCharIndex(bubbleCharIndex + 1);
                } else {
                    // Pause before deleting
                    setTimeout(() => setIsBubbleDeleting(true), 2000);
                }
            } else {
                if (bubbleCharIndex > 0) {
                    setBubbleText(currentPhrase.slice(0, bubbleCharIndex - 1));
                    setBubbleCharIndex(bubbleCharIndex - 1);
                } else {
                    setIsBubbleDeleting(false);
                    setBubblePhraseIndex((bubblePhraseIndex + 1) % bubblePhrases.length);
                }
            }
        }, isBubbleDeleting ? 40 : 80);

        return () => clearTimeout(typeTimer);
    }, [isOpen, bubbleCharIndex, isBubbleDeleting, bubblePhraseIndex, prefersReducedMotion]);

    // Reset typewriter when modal opens
    useEffect(() => {
        if (isOpen) {
            setBubbleText('');
            setBubblePhraseIndex(0);
            setBubbleCharIndex(0);
            setIsBubbleDeleting(false);
            setIsSubmitted(false);
            setErrors({});
            setSubmitError('');
        }
    }, [isOpen]);

    // Focus trap and ESC key handler
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                onCloseRef.current?.();
            }

            // Focus trap
            if (e.key === 'Tab' && modalRef.current) {
                const focusableElements = modalRef.current.querySelectorAll(
                    'button:not([disabled]), a[href], input, textarea, [tabindex]:not([tabindex="-1"])'
                );
                if (focusableElements.length === 0) return;
                const firstElement = focusableElements[0];
                const lastElement = focusableElements[focusableElements.length - 1];

                if (e.shiftKey && document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement.focus();
                } else if (!e.shiftKey && document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement.focus();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);

        // Remember what opened the modal so focus can return there on close
        const previouslyFocused = document.activeElement;

        // Focus first input when modal opens
        const focusTimer = setTimeout(() => {
            if (firstInputRef.current) {
                firstInputRef.current.focus();
            }
        }, 100);

        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';

        return () => {
            clearTimeout(focusTimer);
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
            if (previouslyFocused && typeof previouslyFocused.focus === 'function') previouslyFocused.focus();
        };
    }, [isOpen]);

    // Move focus to the confirmation so keyboard and screen reader users know the message was sent
    useEffect(() => {
        if (isSubmitted) successHeadingRef.current?.focus();
    }, [isSubmitted]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email';
        }
        if (!formData.message.trim()) newErrors.message = 'Message is required';
        setErrors(newErrors);
        const firstInvalid = ['name', 'email', 'message'].find((field) => newErrors[field]);
        if (firstInvalid) document.getElementById(`contact-${firstInvalid}`)?.focus();
        return !firstInvalid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSending) return;
        setSubmitError('');

        if (!validateForm()) return;

        try {
            setIsSending(true);

            const response = await fetch('https://formspree.io/f/xqeezznp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                }),
            });

            if (response.ok) {
                setIsSubmitted(true);
                setFormData({ name: '', email: '', message: '' });
            } else {
                // Try to read Formspree error for better message
                let data = null;
                try {
                    data = await response.json();
                } catch (_) { }

                const msg =
                    (data && data.errors && data.errors[0] && data.errors[0].message) ||
                    'Something went wrong. Please try again.';
                setSubmitError(msg);
            }
        } catch (err) {
            setSubmitError('Network error. Please check your connection and try again.');
        } finally {
            setIsSending(false);
        }
    };

    if (!isOpen) return null;

    const inputStyle = {
        width: '100%',
        padding: '14px 16px',
        fontSize: '15px',
        fontFamily: "'Sora', sans-serif",
        backgroundColor: darkMode ? 'rgba(20, 20, 25, 0.8)' : 'rgba(245, 245, 250, 0.9)',
        border: `1px solid ${darkMode ? 'rgba(59, 130, 246, 0.2)' : 'rgba(59, 130, 246, 0.3)'}`,
        borderRadius: '10px',
        color: theme.text,
        outline: 'none',
        transition: 'all 0.2s ease',
    };

    const inputFocusStyle = {
        borderColor: theme.accent,
        boxShadow: `0 0 0 3px ${darkMode ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.1)'}`,
    };

    const errorStyle = {
        borderColor: '#ef4444',
        boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)',
    };

    return (
        <>
            {/* Modal animations */}
            <style>{`
        @keyframes modalOverlayFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
        @keyframes contentPopIn {
            from { opacity: 0; transform: scale(0.98); }
            to { opacity: 1; transform: scale(1); }
          }
        @keyframes modalOverlayFadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
        @keyframes modalSlideOut {
          from { opacity: 1; transform: translate(-50%, -50%) scale(1); }
          to { opacity: 0; transform: translate(-50%, -50%) scale(0.95); }
        }
        .modal-input:focus {
          border-color: ${theme.accent} !important;
          box-shadow: 0 0 0 3px ${darkMode ? 'rgba(59, 130, 246, 0.15)' : 'rgba(59, 130, 246, 0.1)'} !important;
        }
        .modal-done-btn:hover { border-color: ${theme.accent} !important; color: ${theme.accent} !important; }
        .modal-done-btn:focus-visible, .modal-input:focus-visible { outline: none; }
        [role="dialog"] button:focus-visible { outline: 2px solid ${theme.accent}; outline-offset: 2px; }
        .modal-input::placeholder {
          color: ${theme.textMuted};
          opacity: 0.7;
        }
      `}</style>

            {/* Overlay */}
            <div
                aria-hidden="true"
                onClick={onClose}
                style={{
                    position: 'fixed',
                    inset: 0,
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 1000,
                    animation: prefersReducedMotion ? 'none' : 'modalOverlayFadeIn 0.3s ease forwards',
                }}
            />

            {/* Modal */}
            <div
                ref={modalRef}
                role="dialog"
                aria-modal="true"
                aria-labelledby="contact-modal-title"
                style={{
                    position: 'fixed',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 'calc(100% - 32px)',
                    maxWidth: '480px',
                    maxHeight: 'calc(100vh - 48px)',
                    overflowY: 'auto',
                    backgroundColor: darkMode ? 'rgba(15, 15, 20, 0.95)' : 'rgba(255, 255, 255, 0.98)',
                    border: `1px solid ${darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.2)'}`,
                    borderRadius: '20px',
                    boxShadow: darkMode
                        ? '0 0 60px rgba(59, 130, 246, 0.15), 0 25px 50px rgba(0, 0, 0, 0.5)'
                        : '0 0 40px rgba(59, 130, 246, 0.1), 0 25px 50px rgba(0, 0, 0, 0.15)',
                    backdropFilter: 'blur(20px)',
                    zIndex: 1001,
                    animation: prefersReducedMotion ? 'none' : 'modalSlideIn 0.3s ease forwards',
                    padding: '32px',
                }}
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    type="button"
                    aria-label="Close contact form"
                    style={{
                        position: 'absolute',
                        top: '16px',
                        right: '16px',
                        width: '40px',
                        height: '40px',
                        borderRadius: '50%',
                        border: `1px solid ${darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
                        backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                        color: theme.textMuted,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = darkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.06)';
                        e.currentTarget.style.color = theme.text;
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)';
                        e.currentTarget.style.color = theme.textMuted;
                    }}
                >
                    <X size={20} />
                </button>

                {/* Robot with speech bubble */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
                    {/* Robot */}
                    <div style={{
                        position: 'relative',
                        width: '80px',
                        height: '80px',
                        animation: prefersReducedMotion ? 'none' : 'robotFloat 5s ease-in-out infinite',
                    }}>
                        <div style={{ position: 'absolute', inset: '-18px', borderRadius: '50%', background: darkMode ? 'radial-gradient(circle, rgba(59,130,246,0.2) 0%, transparent 70%)' : 'radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 60%)', filter: 'blur(12px)' }} />
                        {darkMode && <div style={{ position: 'absolute', inset: '-4px', borderRadius: '50%', boxShadow: '0 0 18px rgba(59,130,246,0.2), 0 0 36px rgba(59,130,246,0.1)' }} />}
                        <div style={{ position: 'absolute', bottom: '-10px', left: '10%', width: '80%', height: '10px', borderRadius: '50%', background: 'radial-gradient(ellipse, rgba(0,0,0,0.25) 0%, transparent 70%)', filter: 'blur(5px)' }} />
                        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: darkMode ? 'radial-gradient(ellipse 120% 120% at 30% 20%, rgba(80,80,95,0.5) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(35,35,45,1) 0%, rgba(18,18,22,1) 100%)' : 'radial-gradient(ellipse 120% 120% at 30% 20%, rgba(255,255,255,0.8) 0%, transparent 50%), radial-gradient(ellipse at 50% 50%, rgba(240,240,245,1) 0%, rgba(220,220,230,1) 100%)', boxShadow: darkMode ? 'inset -5px -5px 15px rgba(0,0,0,0.8), inset 5px 5px 15px rgba(255,255,255,0.05)' : 'inset -4px -4px 10px rgba(0,0,0,0.15), inset 4px 4px 10px rgba(255,255,255,0.8)', overflow: 'hidden' }}>
                            <div style={{ position: 'absolute', top: '5%', left: '8%', width: '85%', height: '45%', borderRadius: '50%', background: darkMode ? 'linear-gradient(180deg, rgba(255,255,255,0.15) 0%, transparent 100%)' : 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)' }} />
                            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', gap: '16px' }}>
                                <div style={{ width: '7px', height: '20px', borderRadius: '4px', background: 'linear-gradient(180deg, rgba(150,220,255,1) 0%, rgba(80,170,230,1) 40%, rgba(50,140,200,1) 100%)', boxShadow: '0 0 8px rgba(100,190,255,0.6), 0 0 14px rgba(80,170,230,0.3)' }} />
                                <div style={{ width: '7px', height: '20px', borderRadius: '4px', background: 'linear-gradient(180deg, rgba(150,220,255,1) 0%, rgba(80,170,230,1) 40%, rgba(50,140,200,1) 100%)', boxShadow: '0 0 8px rgba(100,190,255,0.6), 0 0 14px rgba(80,170,230,0.3)' }} />
                            </div>
                        </div>
                    </div>

                    {/* Speech bubble */}
                    <div
                        style={{
                            marginTop: '16px',
                            padding: '12px 20px',
                            borderRadius: '16px',
                            backgroundColor: darkMode ? 'rgba(18, 22, 32, 0.95)' : 'rgba(255, 255, 255, 0.98)',
                            border: `1.5px solid ${darkMode ? 'rgba(59, 130, 246, 0.4)' : 'rgba(59, 130, 246, 0.3)'}`,
                            boxShadow: darkMode
                                ? '0 0 20px rgba(59, 130, 246, 0.15), 0 8px 20px rgba(0, 0, 0, 0.3)'
                                : '0 0 15px rgba(59, 130, 246, 0.1), 0 8px 16px rgba(0, 0, 0, 0.06)',
                            backdropFilter: 'blur(10px)',
                            minWidth: '180px',
                            textAlign: 'center',
                            position: 'relative',
                        }}
                    >
                        {/* Bubble connector */}
                        <div style={{
                            position: 'absolute',
                            top: '-8px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '14px',
                            height: '14px',
                            backgroundColor: darkMode ? 'rgba(18, 22, 32, 0.95)' : 'rgba(255, 255, 255, 0.98)',
                            border: `1.5px solid ${darkMode ? 'rgba(59, 130, 246, 0.4)' : 'rgba(59, 130, 246, 0.3)'}`,
                            borderBottom: 'none',
                            borderRight: 'none',
                            transform: 'translateX(-50%) rotate(45deg)',
                        }} />
                        <p style={{
                            fontSize: '14px',
                            fontWeight: 500,
                            fontFamily: "'JetBrains Mono', monospace",
                            color: darkMode ? '#93c5fd' : theme.accent,
                            margin: 0,
                            lineHeight: 1.5,
                            minHeight: '21px',
                        }}>
                            {bubbleText}
                            <span style={{
                                opacity: 0.7,
                                animation: prefersReducedMotion ? 'none' : 'blink 1s infinite',
                            }}>|</span>
                        </p>
                    </div>
                </div>

                {/* Form */}
                {isSubmitted ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '40px 20px',
                        animation: prefersReducedMotion ? 'none' : 'contentPopIn 0.25s ease forwards',
                    }}>
                        <div style={{
                            width: '64px',
                            height: '64px',
                            margin: '0 auto 20px',
                            borderRadius: '50%',
                            backgroundColor: darkMode ? 'rgba(34, 197, 94, 0.15)' : 'rgba(34, 197, 94, 0.1)',
                            border: `2px solid rgba(34, 197, 94, 0.5)`,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '28px',
                        }}>
                            ✅
                        </div>
                        <h3 ref={successHeadingRef} tabIndex={-1} style={{ fontSize: '20px', fontWeight: 600, color: theme.text, marginBottom: '8px', outline: 'none' }}>
                            Message sent!
                        </h3>
                        <p style={{ fontSize: '14px', color: theme.textMuted, lineHeight: 1.6, marginBottom: '24px' }}>
                            Thanks — I’ll get back to you soon.
                        </p>
                        <button
                            type="button"
                            onClick={onClose}
                            className="modal-done-btn"
                            style={{ padding: '10px 22px', fontSize: '14px', fontWeight: 500, fontFamily: "'Sora', sans-serif", borderRadius: '10px', border: `1px solid ${darkMode ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.12)'}`, backgroundColor: 'transparent', color: theme.text, cursor: 'pointer' }}
                        >
                            Done
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} noValidate aria-busy={isSending} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <div>
                            <label htmlFor="contact-name" style={{
                                display: 'block',
                                fontSize: '13px',
                                fontWeight: 500,
                                color: theme.textMuted,
                                marginBottom: '6px'
                            }}>
                                Name
                            </label>
                            <input
                                ref={firstInputRef}
                                id="contact-name"
                                name="name"
                                type="text"
                                placeholder="Your name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="modal-input"
                                aria-required="true"
                                aria-invalid={!!errors.name}
                                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                                style={{
                                    ...inputStyle,
                                    ...(errors.name ? errorStyle : {}),
                                }}
                            />
                            {errors.name && (
                                <p id="contact-name-error" style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{errors.name}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="contact-email" style={{
                                display: 'block',
                                fontSize: '13px',
                                fontWeight: 500,
                                color: theme.textMuted,
                                marginBottom: '6px'
                            }}>
                                Email
                            </label>
                            <input
                                id="contact-email"
                                name="email"
                                type="email"
                                placeholder="your@email.com"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="modal-input"
                                aria-required="true"
                                aria-invalid={!!errors.email}
                                aria-describedby={errors.email ? 'contact-email-error' : undefined}
                                style={{
                                    ...inputStyle,
                                    ...(errors.email ? errorStyle : {}),
                                }}
                            />
                            {errors.email && (
                                <p id="contact-email-error" style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label htmlFor="contact-message" style={{
                                display: 'block',
                                fontSize: '13px',
                                fontWeight: 500,
                                color: theme.textMuted,
                                marginBottom: '6px'
                            }}>
                                Message
                            </label>
                            <textarea
                                id="contact-message"
                                name="message"
                                placeholder="Your message..."
                                value={formData.message}
                                onChange={handleInputChange}
                                rows={4}
                                className="modal-input"
                                aria-required="true"
                                aria-invalid={!!errors.message}
                                aria-describedby={errors.message ? 'contact-message-error' : undefined}
                                style={{
                                    ...inputStyle,
                                    resize: 'vertical',
                                    minHeight: '100px',
                                    ...(errors.message ? errorStyle : {}),
                                }}
                            />
                            {errors.message && (
                                <p id="contact-message-error" style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{errors.message}</p>
                            )}
                        </div>

                        {submitError && (
                            <p role="alert" style={{ fontSize: '13px', lineHeight: 1.5, color: darkMode ? '#fca5a5' : '#b91c1c', backgroundColor: darkMode ? 'rgba(239,68,68,0.1)' : 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.35)', borderRadius: '10px', padding: '10px 14px' }}>
                                {submitError} You can also email me directly at{' '}
                                <a href="mailto:abeedmulla10@gmail.com" style={{ color: 'inherit', fontWeight: 600 }}>abeedmulla10@gmail.com</a>.
                            </p>
                        )}

                        <button
                            type="submit"
                            disabled={isSending}
                            style={{
                                marginTop: '8px',
                                padding: '14px 24px',
                                fontSize: '15px',
                                fontWeight: 600,
                                fontFamily: "'Sora', sans-serif",
                                backgroundColor: theme.accent,
                                color: '#fff',
                                border: 'none',
                                borderRadius: '10px',
                                cursor: isSending ? 'not-allowed' : 'pointer',
                                opacity: isSending ? 0.75 : 1,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '8px',
                                transition: 'all 0.2s ease',
                                boxShadow: `0 4px 14px ${darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.25)'}`,
                            }}
                            onMouseEnter={(e) => {
                                if (isSending) return;
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = `0 6px 20px ${darkMode ? 'rgba(59, 130, 246, 0.4)' : 'rgba(59, 130, 246, 0.35)'}`;
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = `0 4px 14px ${darkMode ? 'rgba(59, 130, 246, 0.3)' : 'rgba(59, 130, 246, 0.25)'}`;
                            }}
                        >
                            <Send size={18} />
                            {isSending ? 'Sending...' : 'Send'}
                        </button>
                    </form>
                )}
            </div>
        </>
    );
}