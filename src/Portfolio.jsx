import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Moon, Sun, Mail, Linkedin, Github, ExternalLink, ChevronDown, Download, ArrowRight, Code2, Database, Globe, Terminal, Cpu, ChevronLeft, ChevronRight, X, Send } from 'lucide-react';

// ============================================
// ABEED MULLA — PORTFOLIO
// ============================================

// Project Data
const projectsData = [
    {
        id: 'interntracker',
        title: 'InternTracker',
        subtitle: 'Full-Stack Web Application',
        tagline: 'Track applications. Match resumes. Land internships.',
        description: 'A full-stack web app that helps students track internship applications and analyze how well their resume matches job descriptions using keyword matching.',
        thumbnail: '/images/InternTrack/dashboard-filled.png',
        images: [
            { src: '/images/InternTrack/dashboard-filled.png', caption: 'Dashboard with real-time statistics' },
            { src: '/images/InternTrack/tracker-list.png', caption: 'Application tracker with search & filters' },
            { src: '/images/InternTrack/resume-matcher.png', caption: 'Resume-job description keyword matcher' },
        ],
        overview: 'InternTracker is a productivity tool I built to solve my own pain point: managing dozens of internship applications across spreadsheets and email threads. It combines application tracking with a resume keyword matcher that shows how well your resume aligns with job descriptions.',
        problem: "As a student applying to dozens of internships, I found it overwhelming to track applications across multiple spreadsheets and email threads. I also had no easy way to know if my resume actually matched what companies were looking for, leading to wasted applications on roles I wasn't qualified for.",
        solution: 'I built InternTracker — a centralized dashboard where students can log applications, track their status, and use a built-in resume matcher that compares their resume against job descriptions. The matcher extracts keywords and shows a match percentage, highlighting both matched and missing skills so you can tailor your resume before applying.',
        techStack: ['React 18', 'Vite', 'Tailwind CSS', 'Firebase Auth', 'Cloud Firestore', 'Vercel', 'pdf.js', 'Lucide Icons'],
        techReasoning: 'I chose React + Vite for fast development and instant hot reload. Tailwind CSS let me build a clean, responsive UI quickly without writing custom CSS files. Firebase was ideal for authentication and real-time database without managing a backend server — perfect for a solo project. Vercel made deployment seamless with environment variable support for secure API keys.',
        features: [
            'Secure email/password authentication with user-specific data isolation',
            'Full CRUD operations: add, edit, delete internship applications',
            'Search and filter applications by company, role, and status',
            'Dashboard with real-time application statistics and status breakdown',
            'Resume–job description matcher showing match score, matched keywords, and missing keywords',
            'Responsive design that works on desktop and mobile',
        ],
        challenges: 'The biggest challenge was designing a Firestore data model that kept user data isolated and secure. I learned to write security rules that only allow users to read/write their own documents. Managing global auth state with React Context took iteration to get right, especially handling loading states and redirects.',
        improvements: "I'd add OAuth login (Google/GitHub) for easier signup, implement drag-and-drop to reorder applications by priority, and add email reminders for follow-ups. The resume matcher could be smarter with NLP instead of simple keyword matching.",
        github: 'https://github.com/AbeedMulla/interntrack',
        live: 'https://interntrack-henna.vercel.app',
        metrics: 'Built and deployed in 2 weeks. Currently using it to track my own 30+ internship applications for Summer 2026.',
        learned: [
            'Designing Firestore data models with user-level security rules',
            'Managing global authentication state using React Context',
            'Handling real-time updates with Firestore onSnapshot listeners',
            'Deploying Vite + Firebase apps securely with environment variables on Vercel',
        ],
    },
    {
        id: 'studenthub',
        title: 'StudentHub',
        subtitle: 'Android Application',
        tagline: 'An Android app to manage classes, assignments, and focus time with smart reminders and offline support.',
        description: 'A context-aware student assistant that adapts to your schedule and location, helping you stay organized with smart notifications and offline-first design.',
        thumbnail: '/images/StudentHub/Dashboard_filled.png',
        isMobileApp: true, // Flag for mobile app screenshots (portrait orientation)
        images: [
            { src: '/images/StudentHub/Dashboard_filled.png', caption: 'Dashboard with daily overview and quick actions' },
            { src: '/images/StudentHub/schedule_week.png', caption: 'Weekly schedule view with class times' },
            { src: '/images/StudentHub/assignments_list.png', caption: 'Assignment tracker with priorities and due dates' },
            { src: '/images/StudentHub/focus_running.png', caption: 'Pomodoro focus mode with session tracking' },
            { src: '/images/StudentHub/settings_notifications.png', caption: 'Settings with quiet hours and notification preferences' },
        ],
        overview: 'StudentHub is an Android application I built to help students manage their academic life more effectively. It combines class scheduling, assignment tracking, and a Pomodoro-style focus mode — all with smart notifications that respect quiet hours and adapt based on your location and schedule.',
        problem: "Students juggle multiple classes, assignments, and deadlines while trying to maintain focus and avoid burnout. Existing apps either do one thing well (calendar, to-do list, timer) but don't integrate. Notifications become noise, and when you're offline — like in a lecture hall with poor signal — apps that rely on cloud sync become useless.",
        solution: "I built StudentHub as an all-in-one academic companion. It stores everything locally first (Room database) and syncs to Firebase when online. Smart notifications know when you're in class (geofencing) and respect quiet hours. The Pomodoro timer helps maintain focus with configurable work/break intervals. Everything works offline, syncing seamlessly when connectivity returns.",
        techStack: ['Java', 'Android SDK', 'Material Design 3', 'Room (SQLite)', 'Firebase Auth', 'Cloud Firestore', 'Geofencing API', 'WorkManager'],
        techReasoning: "I chose Java over Kotlin for deeper Android fundamentals understanding. MVVM with Repository pattern keeps the codebase maintainable and testable. Room provides reliable offline storage with compile-time SQL verification. Firebase handles auth and cloud sync without building a custom backend. WorkManager ensures background tasks run reliably even with Android's battery restrictions.",
        features: [
            'Firebase Authentication with email/password and secure session management',
            'Dashboard showing today\'s classes, upcoming assignments, and focus stats',
            'Weekly and daily schedule views with color-coded classes',
            'Assignment tracking with priority levels, due dates, and completion status',
            'Pomodoro focus mode with customizable work/break durations',
            'Smart notifications with quiet hours (e.g., during classes or sleep)',
            'Offline-first design: full functionality without internet, syncs when online',
            'Geofencing to detect when you arrive at campus or leave',
        ],
        challenges: "The hardest challenge was handling offline-to-online sync without data conflicts. I implemented a last-write-wins strategy with timestamps, but edge cases (like editing the same assignment on two devices offline) required careful conflict resolution. Android's background execution limits also meant I had to use WorkManager carefully to avoid battery drain while keeping data fresh.",
        improvements: "I'd add widget support for quick glances at today's schedule, implement collaborative features for study groups, and add AI-powered study recommendations based on upcoming deadlines and past focus patterns. A calendar sync with Google Calendar would also be valuable.",
        github: 'https://github.com/AbeedMulla/StudentHub',
        live: null,
        metrics: 'Developed over 4 weeks. Implements 8+ Android architecture components. Handles offline/online transitions gracefully with conflict resolution.',
        learned: [
            'Android MVVM architecture with Repository pattern',
            'Offline-first design with Room and Firestore sync strategies',
            'Background task management with WorkManager and Foreground Services',
            'Geofencing and location-based triggers with Google Play Services',
            'Battery-efficient notification scheduling that respects user preferences',
        ],
        // Extended content for detailed case study
        architectureDetails: {
            layers: [
                { name: 'UI Layer', description: 'Activities, Fragments, and XML layouts following Material Design 3 guidelines' },
                { name: 'ViewModel', description: 'Holds UI state, survives configuration changes, exposes data via LiveData' },
                { name: 'Repository', description: 'Single source of truth that coordinates between local Room DB and remote Firestore' },
                { name: 'Data Sources', description: 'Room DAOs for local persistence, Firestore for cloud backup and cross-device sync' },
            ],
        },
        technicalInsights: [
            {
                title: 'Offline-First Sync Strategy',
                content: 'All writes go to Room first, then sync to Firestore via WorkManager. Each record has a `lastModified` timestamp and `syncStatus` flag. On conflict, the most recent write wins, but I preserve both versions in a conflict log for manual resolution if needed.',
            },
            {
                title: 'Notification Spam Prevention',
                content: 'Instead of firing notifications for every event, I batch them and use a priority queue. Quiet hours are respected (stored in SharedPreferences), and geofencing triggers adjust notification urgency — e.g., assignment reminders are more aggressive when you\'re at home vs. in class.',
            },
            {
                title: 'Battery-Efficient Background Work',
                content: 'WorkManager handles periodic syncs with exponential backoff on failure. Geofencing uses the fused location provider with minimal battery impact. Foreground services are only used during active Pomodoro sessions with a persistent notification.',
            },
        ],
    },
    {
        id: 'http-server',
        title: 'Custom HTTP Server & Reverse Proxy',
        subtitle: 'Systems Programming',
        tagline: 'A from-scratch HTTP server and reverse proxy built using raw TCP sockets.',
        description: 'A deep dive into networking fundamentals: parsing HTTP by hand, routing requests, load balancing across backends, and understanding what happens at the byte level.',
        thumbnail: '/images/http-server-proxy/server-startup.png',
        isTerminalScreenshot: true, // Flag for terminal/CLI screenshots
        images: [
            { src: '/images/http-server-proxy/server-startup.png', caption: 'Server startup showing proxy listening on port 8080 with 3 backend servers' },
            { src: '/images/http-server-proxy/load-balancing.png', caption: 'Round-robin load balancing distributing requests across backends 3001, 3002, 3003' },
            { src: '/images/http-server-proxy/request-logging.png', caption: 'Request logging with automatic failover when backend 3001 is unavailable' },
            { src: '/images/http-server-proxy/health-check.png', caption: 'Health check endpoint showing backend status and failure counts' },
        ],
        overview: 'This project was born from wanting to understand HTTP at the deepest level. No Express, no http module — just raw TCP sockets and manual parsing. I built an HTTP/1.1 compliant server, then extended it into a reverse proxy with load balancing and health checks.',
        problem: "Most developers use HTTP every day but never see what happens beneath frameworks like Express or Flask. I wanted to understand: How does a server parse raw bytes into headers and body? How does a reverse proxy route requests? How do load balancers distribute traffic? Building from scratch was the only way to truly learn.",
        solution: "I built a complete HTTP server using Node.js's `net` module (raw TCP sockets). The server manually parses HTTP requests from byte streams, handles routing, and sends properly formatted responses. I then built a reverse proxy layer that forwards requests to backend servers using round-robin load balancing, with health checks to detect and remove failed backends.",
        techStack: ['Node.js', 'TCP Sockets (net module)', 'HTTP/1.1 Protocol', 'Round-Robin Load Balancing'],
        techReasoning: "Node.js was chosen because its `net` module provides low-level TCP access while still being approachable. No external libraries were used — the entire HTTP parsing, routing, and proxying logic is hand-written to maximize learning. This could be ported to C or Rust for even lower-level understanding, but Node.js hit the sweet spot of accessible yet educational.",
        features: [
            'Manual HTTP/1.1 request parsing from raw TCP byte streams',
            'Support for GET, POST, PUT, DELETE methods',
            'Header parsing with case-insensitive matching',
            'Content-Length body handling',
            'Reverse proxy with configurable backend targets',
            'Round-robin load balancing across multiple backends',
            'Health check pings to detect backend failures',
            'Request logging with timing metrics',
        ],
        challenges: "The trickiest part was handling TCP's streaming nature. Data arrives in chunks — a single HTTP request might come in 3 packets, or 5 requests might arrive in 1 packet. I had to implement a buffer that accumulates data until a complete request is detected (headers end with \\r\\n\\r\\n, then read Content-Length bytes for the body). Edge cases like partial headers or slow clients required careful timeout handling.",
        improvements: "Next steps would be implementing HTTP keep-alive for connection reuse, HTTPS with TLS termination, weighted load balancing based on backend capacity, and response caching for static content. WebSocket upgrade support would also be a valuable addition.",
        github: 'https://github.com/AbeedMulla/http-server-proxy',
        live: null,
        metrics: 'Handles 1000+ requests/second in benchmarks. Zero external dependencies for core HTTP parsing. Full HTTP/1.1 compliance for common methods.',
        learned: [
            'TCP is a stream protocol — messages aren\'t automatically delimited',
            'HTTP is plain text, making it debuggable but requiring careful parsing',
            'Load balancers need health checks to avoid sending traffic to dead backends',
            'Error handling in network code is critical — connections drop, timeouts happen',
            'Buffering strategies matter for performance and correctness',
        ],
        // Extended content for detailed case study
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

My server does all of this manually — reading bytes, finding the header boundary, parsing each line, and constructing the response byte-by-byte.`,
        },
        architectureDiagram: {
            title: 'Request Flow Architecture',
            steps: [
                { step: 1, label: 'Client', description: 'Browser sends HTTP request to proxy' },
                { step: 2, label: 'Reverse Proxy', description: 'Parses request, selects backend via load balancer' },
                { step: 3, label: 'Load Balancer', description: 'Round-robin selection from healthy backends' },
                { step: 4, label: 'Backend Server', description: 'Processes request, sends response' },
                { step: 5, label: 'Proxy → Client', description: 'Forwards response back to client' },
            ],
        },
        codeExamples: [
            {
                title: 'Starting the Server',
                code: `# Start 3 backend servers on different ports
node backend.js 3001 &
node backend.js 3002 &
node backend.js 3003 &

# Start the reverse proxy on port 8080
node proxy.js 8080`,
            },
            {
                title: 'Testing with curl',
                code: `# Simple GET request
curl http://localhost:8080/api/users

# POST with JSON body
curl -X POST http://localhost:8080/api/users \\
  -H "Content-Type: application/json" \\
  -d '{"name": "Abeed"}'

# Watch load balancing in action
for i in {1..10}; do curl -s http://localhost:8080/ping; done`,
            },
        ],
        technicalInsights: [
            {
                title: 'TCP is a Stream, Not Messages',
                content: "Unlike UDP, TCP doesn't preserve message boundaries. If you send two HTTP requests quickly, they might arrive as one chunk. Or one request might arrive in 10 pieces. The server must buffer incoming data and scan for the header terminator (\\r\\n\\r\\n) before parsing.",
            },
            {
                title: 'Error Handling is Non-Negotiable',
                content: "Network programming is hostile. Connections drop mid-request. Backends crash. Clients send malformed data. Every socket operation needs timeout handling, and the server must gracefully handle partial data without crashing.",
            },
            {
                title: 'Round-Robin Trade-offs',
                content: "Round-robin is simple but naive — it assumes all backends have equal capacity. A better approach would be least-connections (route to the backend with fewest active requests) or weighted distribution based on server specs.",
            },
        ],
        futureImprovements: [
            'HTTP Keep-Alive for connection reuse (major performance gain)',
            'HTTPS support with TLS termination at the proxy',
            'Weighted load balancing based on backend capacity',
            'Response caching for static content',
            'WebSocket upgrade support',
            'Graceful shutdown with connection draining',
        ],
    },
];

const experienceData = [
    {
        type: 'education',
        title: 'Bachelor of Computer Science (Honours)',
        org: 'Dalhousie University',
        location: 'Halifax, NS',
        date: 'Expected Oct 2026',
        details: ['Algorithms & Data Structures', 'Operating Systems', 'Computer Networks', 'Software Engineering', 'Databases'],
    },
    {
        type: 'work',
        title: 'Cashier & Line Cook',
        org: "McDonald's",
        location: 'Halifax, NS',
        date: 'Nov 2024 – Present',
        details: ['High-pressure environment', 'Customer service and team collaboration'],
    },
    {
        type: 'work',
        title: 'Grill Cook',
        org: 'Mezza Lebanese Kitchen',
        location: 'Halifax, NS',
        date: '2021 – 2022',
        details: ['Team coordination in fast-paced environment', 'Reliability under pressure'],
    },
];

const skillsData = {
    'Languages': ['Java', 'Python', 'C', 'C++', 'JavaScript', 'HTML5', 'CSS3'],
    'Frontend': ['React', 'Tailwind CSS', 'Bootstrap', 'Responsive Design'],
    'Backend': ['Node.js', 'Flask', 'Express', 'REST APIs', 'Firebase', 'MySQL', 'MongoDB'],
    'Tools & Systems': ['Git', 'GitHub', 'Linux', 'Android Studio', 'Postman', 'TCP/UDP', 'Wireshark'],
};

const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
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
        "Full-Stack Developer",
        "Problem Solver",
        "Android Developer",
        "AI Enthusiast",
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
        const sectionIds = ['hero', 'about', 'skills', 'projects', 'experience', 'contact'];
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
                        <button className="mobile-menu-btn" style={{ ...styles.themeToggle, display: 'none' }} onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
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
                        <div className="fade-in"><p style={{ ...styles.sectionTitle, marginBottom: '24px' }}>Hi, I'm</p></div>
                        <h1 className="fade-in fade-in-delay-1" style={{ ...styles.heading, fontSize: 'clamp(40px, 8vw, 72px)', marginBottom: '16px' }}>Abeed Mulla</h1>
                        <h2 className="fade-in fade-in-delay-2" style={{ fontSize: 'clamp(20px, 4vw, 28px)', fontWeight: 400, color: theme.textMuted, marginBottom: '32px', minHeight: '1.4em' }}>{typewriterText}<span className="typewriter-cursor" style={{ color: theme.accent }}>|</span></h2>
                        <p className="fade-in fade-in-delay-3" style={{ ...styles.paragraph, marginBottom: '40px', maxWidth: '560px' }}>I care about how software behaves in real life: edge cases, user experience, performance, and maintainability. I enjoy understanding <em>why</em> something works, not just making it work.</p>
                        <div className="fade-in fade-in-delay-4" style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                            <a href="#projects" style={{ ...styles.button, ...styles.buttonPrimary }} onClick={(e) => { e.preventDefault(); scrollToSection('#projects'); }}>View Projects <ArrowRight size={16} /></a>
                            <a href="/resume.pdf" style={{ ...styles.button, ...styles.buttonSecondary }}><Download size={16} /> Download Resume</a>
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
                                <p style={{ ...styles.paragraph, marginBottom: '24px' }}>I'm a Computer Science Honours student at Dalhousie University, focused on building scalable, reliable software for real-world use.</p>
                                <p style={{ ...styles.paragraph, marginBottom: '24px' }}>My approach is to understand systems deeply before writing code. I ask: What happens at the edges? How does this scale?</p>
                                <p style={styles.paragraph}>Currently seeking <strong style={{ color: theme.text }}>Summer 2026 internships</strong> where I can contribute to production systems.</p>
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
                        <p style={styles.sectionTitle}>Skills</p>
                        <h2 style={{ ...styles.heading, marginBottom: '48px' }}>Technical Stack</h2>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px' }}>
                            {Object.entries(skillsData).map(([category, items]) => (
                                <div key={category} style={styles.card}>
                                    <h3 style={{ fontSize: '14px', fontWeight: 600, color: theme.textMuted, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {category === 'Languages' && <Terminal size={16} style={{ color: theme.accent }} />}
                                        {category === 'Frontend' && <Globe size={16} style={{ color: theme.accent }} />}
                                        {category === 'Backend' && <Database size={16} style={{ color: theme.accent }} />}
                                        {category === 'Tools & Systems' && <Cpu size={16} style={{ color: theme.accent }} />}
                                        {category}
                                    </h3>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                        {items.map((skill) => (<span key={skill} style={{ ...styles.tag, ...styles.mono, fontSize: '12px' }}>{skill}</span>))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Projects Section - Carousel */}
                <section id="projects" style={{ ...styles.section, backgroundColor: darkMode ? 'rgba(20,20,22,0.5)' : 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)' }}>
                    <div style={styles.container}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '48px' }}>
                            <div>
                                <p style={styles.sectionTitle}>Projects</p>
                                <h2 style={{ ...styles.heading, marginBottom: '16px' }}>Featured Work</h2>
                                <p style={{ ...styles.paragraph, marginBottom: 0 }}>Real projects solving real problems. Click View Project to explore the project's details.</p>
                            </div>
                            <a href="https://github.com/AbeedMulla" target="_blank" rel="noopener noreferrer" style={{ ...styles.button, ...styles.buttonSecondary, fontSize: '13px', padding: '10px 16px' }}><Github size={16} /> View GitHub</a>
                        </div>
                    </div>
                    <ProjectCarousel projects={projectsData} theme={theme} darkMode={darkMode} styles={styles} />
                </section>

                {/* Experience Section */}
                <section id="experience" style={styles.section}>
                    <div style={styles.container}>
                        <p style={styles.sectionTitle}>Experience</p>
                        <h2 style={{ ...styles.heading, marginBottom: '48px' }}>Education & Work</h2>
                        <div style={{ position: 'relative', paddingLeft: '24px' }}>
                            <div style={{ position: 'absolute', left: '4px', top: '8px', bottom: '8px', width: '2px', backgroundColor: theme.border }} />
                            {experienceData.map((item, index) => (
                                <div key={index} style={{ position: 'relative', marginBottom: index === experienceData.length - 1 ? 0 : '40px' }}>
                                    <div style={{ position: 'absolute', left: '-24px', top: '6px', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: item.type === 'education' ? theme.accent : theme.textMuted, border: `2px solid ${darkMode ? '#0a0a0b' : '#fafafa'}` }} />
                                    <span style={{ fontSize: '12px', color: item.type === 'education' ? theme.accent : theme.textMuted, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}>{item.type === 'education' ? 'Education' : 'Work Experience'}</span>
                                    <h3 style={{ fontSize: '18px', fontWeight: 600, marginTop: '4px' }}>{item.title}</h3>
                                    <p style={{ fontSize: '14px', color: theme.textMuted, marginTop: '4px' }}>{item.org} · {item.location}</p>
                                    <p style={{ fontSize: '13px', color: theme.textMuted, marginTop: '2px' }}>{item.date}</p>
                                    {item.details && (
                                        <div style={{ marginTop: '12px', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                            {item.details.map((detail, i) => (<span key={i} style={{ fontSize: '12px', color: theme.textMuted, padding: '4px 10px', backgroundColor: theme.surface, borderRadius: '4px', border: `1px solid ${theme.border}` }}>{detail}</span>))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact Section */}
                <section id="contact" style={{ ...styles.section, backgroundColor: darkMode ? 'rgba(20,20,22,0.5)' : 'rgba(255,255,255,0.5)', backdropFilter: 'blur(8px)', position: 'relative', overflow: 'hidden' }}>
                    <div style={styles.container}>
                        <div style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                            <p style={{ ...styles.sectionTitle, marginBottom: '16px' }}>Contact</p>
                            <h2 style={{ ...styles.heading, marginBottom: '16px' }}>Let's Connect</h2>
                            <p style={{ ...styles.paragraph, margin: '0 auto 32px', textAlign: 'center' }}>Open to <strong style={{ color: theme.text }}>Summer 2026 internships</strong> and new-grad opportunities.</p>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '40px' }}>
                                <button
                                    onClick={() => setContactModalOpen(true)}
                                    style={{ ...styles.button, ...styles.buttonPrimary, cursor: 'pointer', border: 'none' }}
                                >
                                    <Mail size={16} /> Let's Connect
                                </button>
                                <a href="/resume.pdf" style={{ ...styles.button, ...styles.buttonSecondary }}><Download size={16} /> Download Resume</a>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
                                <a href="mailto:abeedmulla10@gmail.com" style={{ color: theme.textMuted }} aria-label="Email"><Mail size={22} /></a>
                                <a href="https://www.linkedin.com/in/abeed-mulla" target="_blank" rel="noopener noreferrer" style={{ color: theme.textMuted }} aria-label="LinkedIn"><Linkedin size={22} /></a>
                                <a href="https://github.com/AbeedMulla" target="_blank" rel="noopener noreferrer" style={{ color: theme.textMuted }} aria-label="GitHub"><Github size={22} /></a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Robot */}
                    {showContactRobot && !isMobile && (
                        <div
                            ref={contactRobotRef}
                            className="contact-robot-wrapper contact-robot-enter"
                            style={{
                                position: 'absolute',
                                bottom: '40px',
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
                                            Looking for an intern? Let’s connect. 💬
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
                                            Looking for an intern? Let’s connect. 💬
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
                        <p style={{ fontSize: '13px', color: theme.textMuted }}>© 2026 Abeed Mulla. Built with intention.</p>
                        <p style={{ fontSize: '13px', color: theme.textMuted }}>Halifax, NS · Open to remote & relocation</p>
                    </div>
                </footer>
            </div>
        </>
    );
}

// ============================================
// PROJECT CAROUSEL
// ============================================

function ProjectCarousel({ projects, theme, darkMode, styles }) {
    const carouselRef = useRef(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobileCarousel, setIsMobileCarousel] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobileCarousel(window.innerWidth <= 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    const checkScrollButtons = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            setCanScrollLeft(scrollLeft > 10);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

            // Calculate current index for pagination dots
            const cardWidth = isMobileCarousel ? clientWidth : 440;
            const newIndex = Math.round(scrollLeft / cardWidth);
            setCurrentIndex(Math.min(newIndex, projects.length - 1));
        }
    };

    useEffect(() => {
        checkScrollButtons();
        const carousel = carouselRef.current;
        if (carousel) {
            carousel.addEventListener('scroll', checkScrollButtons);
            return () => carousel.removeEventListener('scroll', checkScrollButtons);
        }
    }, [isMobileCarousel]);

    const scroll = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = direction === 'left' ? -440 : 440;
            carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const scrollToIndex = (index) => {
        if (carouselRef.current) {
            const cardWidth = isMobileCarousel ? carouselRef.current.clientWidth : 440;
            carouselRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            {/* Desktop arrows - hidden on mobile via CSS */}
            <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                aria-label="Previous project"
                className="carousel-arrows"
                style={{
                    position: 'absolute',
                    left: '24px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: `1px solid ${theme.border}`,
                    backgroundColor: darkMode ? 'rgba(20,20,22,0.9)' : 'rgba(255,255,255,0.9)',
                    color: canScrollLeft ? theme.text : theme.textMuted,
                    cursor: canScrollLeft ? 'pointer' : 'default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: canScrollLeft ? 1 : 0.3,
                    backdropFilter: 'blur(8px)',
                    transition: 'opacity 0.2s',
                }}
            >
                <ChevronLeft size={24} />
            </button>
            <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                aria-label="Next project"
                className="carousel-arrows"
                style={{
                    position: 'absolute',
                    right: '24px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    zIndex: 10,
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    border: `1px solid ${theme.border}`,
                    backgroundColor: darkMode ? 'rgba(20,20,22,0.9)' : 'rgba(255,255,255,0.9)',
                    color: canScrollRight ? theme.text : theme.textMuted,
                    cursor: canScrollRight ? 'pointer' : 'default',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: canScrollRight ? 1 : 0.3,
                    backdropFilter: 'blur(8px)',
                    transition: 'opacity 0.2s',
                }}
            >
                <ChevronRight size={24} />
            </button>

            {/* Carousel container */}
            <div
                ref={carouselRef}
                className="carousel-container"
                style={{
                    display: 'flex',
                    gap: isMobileCarousel ? '16px' : '32px',
                    padding: isMobileCarousel ? '20px 24px' : '20px 80px',
                    overflowX: 'auto',
                    scrollSnapType: 'x mandatory'
                }}
            >
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        theme={theme}
                        darkMode={darkMode}
                        styles={styles}
                        isMobile={isMobileCarousel}
                    />
                ))}
            </div>

            {/* Pagination dots - always visible but more prominent on mobile */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '10px',
                marginTop: '24px',
                padding: '0 24px',
            }}>
                {projects.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => scrollToIndex(index)}
                        aria-label={`Go to project ${index + 1}`}
                        style={{
                            width: currentIndex === index ? '28px' : '10px',
                            height: '10px',
                            borderRadius: '5px',
                            border: 'none',
                            backgroundColor: currentIndex === index ? theme.accent : (darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'),
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            padding: 0,
                        }}
                    />
                ))}
            </div>
        </div>
    );
}

// ============================================
// PROJECT CARD
// ============================================

function ProjectCard({ project, theme, darkMode, styles, isMobile }) {
    const [isHovered, setIsHovered] = useState(false);

    const cardWidth = isMobile ? 'calc(100vw - 48px)' : '420px';
    const cardMinWidth = isMobile ? 'calc(100vw - 48px)' : '420px';
    const hasImage = !project.showPlaceholder && project.thumbnail && (project.thumbnail.startsWith('/images') || project.thumbnail.startsWith('http'));
    const useContainFit = project.isMobileApp || project.isTerminalScreenshot;

    return (
        <div
            className="carousel-card"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                width: cardWidth,
                minWidth: cardMinWidth,
                backgroundColor: darkMode ? '#0f0f11' : '#ffffff',
                borderRadius: isMobile ? '16px' : '20px',
                border: `1px solid ${isHovered ? theme.accent : theme.border}`,
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: isHovered && !isMobile ? 'translateY(-8px)' : 'translateY(0)',
                boxShadow: isHovered ? `0 0 40px ${theme.accent}25, 0 25px 50px rgba(0,0,0,0.3)` : '0 4px 20px rgba(0,0,0,0.15)',
                scrollSnapAlign: 'center'
            }}
        >
            <div style={{
                width: '100%',
                height: isMobile ? '200px' : '240px',
                backgroundColor: project.isTerminalScreenshot ? '#1a1a1a' : (darkMode ? '#1a1a1d' : '#f4f4f5'),
                position: 'relative',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}>
                {/* Image display - different for mobile apps, terminal screenshots, vs web apps */}
                {useContainFit && hasImage ? (
                    // Mobile app or terminal - show full centered image
                    <img
                        src={project.thumbnail}
                        alt={project.title}
                        style={{
                            maxHeight: '100%',
                            maxWidth: '100%',
                            width: 'auto',
                            height: 'auto',
                            objectFit: 'contain',
                            padding: project.isTerminalScreenshot ? '16px' : '12px',
                            borderRadius: project.isTerminalScreenshot ? '8px' : '0',
                        }}
                    />
                ) : hasImage ? (
                    // Web app - use background cover
                    <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: `url(${project.thumbnail})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center top',
                    }} />
                ) : null}

                {/* Gradient overlay */}
                <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${darkMode ? 'rgba(15,15,17,0.9)' : 'rgba(255,255,255,0.8)'} 0%, transparent 50%)`, pointerEvents: 'none' }} />

                {/* Placeholder icon when no image */}
                {!hasImage && (
                    <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${theme.accent}15 0%, ${theme.accent}05 100%)` }}>
                        <Code2 size={isMobile ? 48 : 64} style={{ color: theme.accent, opacity: 0.4 }} />
                    </div>
                )}

                {/* Hover overlay with buttons */}
                <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', opacity: isHovered && !isMobile ? 1 : 0, transition: 'opacity 0.3s ease' }}>
                    {project.live && project.live !== '#' && (
                        <a href={project.live} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ ...styles.button, ...styles.buttonPrimary, padding: '10px 16px', fontSize: '13px' }}><ExternalLink size={16} /> Live Demo</a>
                    )}
                    {project.github && project.github !== '#' && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ ...styles.button, padding: '10px 16px', fontSize: '13px', backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.3)', color: '#fff' }}><Github size={16} /> Code</a>
                    )}
                </div>
            </div>
            <div style={{ padding: isMobile ? '20px' : '24px' }}>
                <span style={{ fontSize: '11px', color: theme.accent, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1.5px' }}>{project.subtitle}</span>
                <h3 style={{ fontSize: isMobile ? '22px' : '26px', fontWeight: 700, marginTop: '8px', marginBottom: '12px', color: theme.text, lineHeight: 1.2 }}>{project.title}</h3>
                <p style={{ fontSize: isMobile ? '14px' : '15px', color: theme.textMuted, lineHeight: 1.6, marginBottom: '16px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{project.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                    {project.techStack.slice(0, isMobile ? 3 : 4).map((tech) => (<span key={tech} style={{ ...styles.tag, ...styles.mono, fontSize: '11px', padding: '4px 10px' }}>{tech}</span>))}
                    {project.techStack.length > (isMobile ? 3 : 4) && (<span style={{ fontSize: '11px', color: theme.textMuted, padding: '4px 10px' }}>+{project.techStack.length - (isMobile ? 3 : 4)}</span>)}
                </div>

                {/* Mobile: Show quick links row */}
                {isMobile && (project.live || project.github) && (
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                        {project.live && project.live !== '#' && (
                            <a href={project.live} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ ...styles.button, ...styles.buttonPrimary, padding: '8px 14px', fontSize: '12px', flex: 1, justifyContent: 'center' }}><ExternalLink size={14} /> Demo</a>
                        )}
                        {project.github && project.github !== '#' && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" onClick={(e) => e.stopPropagation()} style={{ ...styles.button, ...styles.buttonSecondary, padding: '8px 14px', fontSize: '12px', flex: 1, justifyContent: 'center' }}><Github size={14} /> Code</a>
                        )}
                    </div>
                )}

                <a href={`#project/${project.id}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', width: '100%', padding: isMobile ? '12px 16px' : '14px 20px', fontSize: isMobile ? '14px' : '15px', fontWeight: 600, borderRadius: '10px', border: `2px solid ${isHovered ? theme.accent : theme.border}`, backgroundColor: isHovered && !isMobile ? theme.accent : 'transparent', color: isHovered && !isMobile ? '#fff' : theme.text, textDecoration: 'none', transition: 'all 0.3s' }}>
                    View Project <ArrowRight size={16} />
                </a>
            </div>
        </div>
    );
}

// ============================================
// PROJECT DETAIL PAGE
// ============================================

function ProjectDetailPage({ project }) {
    const [darkMode, setDarkMode] = useState(true);
    const [activeImage, setActiveImage] = useState(0);
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

    const SectionTitle = ({ children }) => (
        <h2 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 600, marginBottom: '16px', color: theme.text }}>{children}</h2>
    );

    const Paragraph = ({ children }) => (
        <p style={{ fontSize: isMobile ? '15px' : '16px', lineHeight: 1.8, color: theme.textMuted }}>{children}</p>
    );

    const CodeBlock = ({ title, code }) => (
        <div style={{ marginBottom: '20px' }}>
            {title && <p style={{ fontSize: '13px', fontWeight: 600, color: theme.textMuted, marginBottom: '8px' }}>{title}</p>}
            <pre style={{
                backgroundColor: darkMode ? '#1a1a1d' : '#f4f4f5',
                padding: '16px 20px',
                borderRadius: '10px',
                overflow: 'auto',
                fontSize: '13px',
                lineHeight: 1.6,
                fontFamily: "'JetBrains Mono', monospace",
                color: theme.text,
                border: `1px solid ${theme.border}`,
            }}>
                <code>{code}</code>
            </pre>
        </div>
    );

    return (
        <div style={{ minHeight: '100vh', width: '100%', backgroundColor: theme.bg, color: theme.text, fontFamily: "'Sora', sans-serif" }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html, body, #root { width: 100%; min-height: 100vh; margin: 0; padding: 0; background-color: ${theme.bg}; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        ::selection { background-color: ${theme.accent}; color: white; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-section { animation: fadeIn 0.6s ease forwards; }
      `}</style>

            {/* Header */}
            <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, backgroundColor: darkMode ? 'rgba(10,10,11,0.9)' : 'rgba(250,250,250,0.9)', backdropFilter: 'blur(12px)', borderBottom: `1px solid ${theme.border}` }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', padding: isMobile ? '12px 16px' : '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = ''; }} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: theme.textMuted, textDecoration: 'none', fontSize: '14px' }}>
                        <ChevronLeft size={20} /> {!isMobile && 'Back to Portfolio'}
                    </a>
                    <div style={{ display: 'flex', gap: isMobile ? '8px' : '12px', alignItems: 'center' }}>
                        {project.live && project.live !== '#' && (
                            <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: isMobile ? '8px 12px' : '8px 16px', fontSize: '13px', fontWeight: 500, borderRadius: '8px', backgroundColor: theme.accent, color: '#fff', textDecoration: 'none' }}>
                                <ExternalLink size={14} /> {!isMobile && 'Live Demo'}
                            </a>
                        )}
                        {project.github && project.github !== '#' && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: isMobile ? '8px 12px' : '8px 16px', fontSize: '13px', fontWeight: 500, borderRadius: '8px', backgroundColor: 'transparent', border: `1px solid ${theme.border}`, color: theme.text, textDecoration: 'none' }}>
                                <Github size={14} /> {!isMobile && 'View Code'}
                            </a>
                        )}
                        <button onClick={() => setDarkMode(!darkMode)} style={{ padding: '8px', borderRadius: '8px', border: 'none', backgroundColor: 'transparent', color: theme.textMuted, cursor: 'pointer' }}>{darkMode ? <Sun size={18} /> : <Moon size={18} />}</button>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="fade-section" style={{ paddingTop: isMobile ? '100px' : '120px', paddingBottom: isMobile ? '40px' : '60px', backgroundColor: darkMode ? 'rgba(20,20,22,0.5)' : 'rgba(255,255,255,0.5)', width: '100%' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 24px', width: '100%' }}>
                    <span style={{ fontSize: '12px', color: theme.accent, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px' }}>{project.subtitle}</span>
                    <h1 style={{ fontSize: isMobile ? 'clamp(28px, 8vw, 40px)' : 'clamp(36px, 6vw, 56px)', fontWeight: 700, marginTop: '12px', marginBottom: '16px', lineHeight: 1.1 }}>{project.title}</h1>
                    <p style={{ fontSize: isMobile ? '16px' : '20px', color: theme.textMuted, maxWidth: '700px', lineHeight: 1.5, marginBottom: '24px' }}>{project.tagline}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '40px' }}>
                        {project.techStack.map((tech) => (<span key={tech} style={{ padding: '6px 14px', fontSize: '13px', fontWeight: 500, borderRadius: '6px', backgroundColor: theme.accentMuted, color: theme.accent, fontFamily: "'JetBrains Mono', monospace" }}>{tech}</span>))}
                    </div>

                    {/* Hero Image */}
                    {project.images && project.images.length > 0 && (
                        <div style={{
                            borderRadius: '16px',
                            overflow: 'hidden',
                            border: `1px solid ${theme.border}`,
                            backgroundColor: project.isTerminalScreenshot ? '#1a1a1a' : (darkMode ? '#1a1a1d' : '#f4f4f5'),
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}>
                            {(project.isMobileApp || project.isTerminalScreenshot) ? (
                                // Mobile app or terminal screenshot - show full image with proper aspect ratio
                                <div style={{
                                    padding: project.isTerminalScreenshot ? '16px' : '24px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    backgroundColor: project.isTerminalScreenshot ? '#0d0d0d' : (darkMode ? '#0f0f11' : '#f0f0f2'),
                                    width: '100%',
                                }}>
                                    <img
                                        src={project.images[activeImage]?.src || project.thumbnail}
                                        alt={project.images[activeImage]?.caption || project.title}
                                        style={{
                                            maxHeight: isMobile ? '300px' : (project.isTerminalScreenshot ? '350px' : '500px'),
                                            width: 'auto',
                                            maxWidth: '100%',
                                            borderRadius: project.isTerminalScreenshot ? '8px' : '12px',
                                            boxShadow: project.isTerminalScreenshot
                                                ? '0 10px 40px rgba(0,0,0,0.6)'
                                                : (darkMode
                                                    ? '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)'
                                                    : '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(0,0,0,0.05)'),
                                        }}
                                    />
                                </div>
                            ) : (
                                // Web app screenshot - use background cover
                                <div style={{
                                    width: '100%',
                                    height: isMobile ? '250px' : '400px',
                                    backgroundImage: `url(${project.images[activeImage]?.src || project.thumbnail})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center top'
                                }} />
                            )}
                            {project.images[activeImage]?.caption && (
                                <p style={{ padding: '12px 16px', fontSize: '13px', color: theme.textMuted, backgroundColor: project.isTerminalScreenshot ? '#0d0d0d' : (darkMode ? '#0f0f11' : '#fafafa'), textAlign: 'center', width: '100%' }}>{project.images[activeImage].caption}</p>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* Main Content */}
            <section style={{ padding: isMobile ? '40px 0' : '80px 0', width: '100%' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 24px', width: '100%' }}>

                    {/* Overview */}
                    <div className="fade-section" style={{ marginBottom: isMobile ? '40px' : '60px' }}>
                        <SectionTitle>Overview</SectionTitle>
                        <Paragraph>{project.overview}</Paragraph>
                    </div>

                    {/* The Problem */}
                    <div className="fade-section" style={{ marginBottom: isMobile ? '40px' : '60px' }}>
                        <SectionTitle>The Problem</SectionTitle>
                        <Paragraph>{project.problem}</Paragraph>
                    </div>

                    {/* Solution */}
                    <div className="fade-section" style={{ marginBottom: isMobile ? '40px' : '60px' }}>
                        <SectionTitle>Solution & Approach</SectionTitle>
                        <Paragraph>{project.solution}</Paragraph>
                    </div>

                    {/* HTTP Explanation (for HTTP Server project) */}
                    {project.httpExplanation && (
                        <div className="fade-section" style={{ marginBottom: isMobile ? '40px' : '60px' }}>
                            <SectionTitle>{project.httpExplanation.title}</SectionTitle>
                            <div style={{
                                backgroundColor: darkMode ? '#1a1a1d' : '#f4f4f5',
                                padding: '20px 24px',
                                borderRadius: '12px',
                                border: `1px solid ${theme.border}`,
                            }}>
                                <pre style={{
                                    fontSize: '13px',
                                    lineHeight: 1.7,
                                    fontFamily: "'JetBrains Mono', monospace",
                                    color: theme.textMuted,
                                    whiteSpace: 'pre-wrap',
                                    wordBreak: 'break-word',
                                    margin: 0,
                                }}>
                                    {project.httpExplanation.content}
                                </pre>
                            </div>
                        </div>
                    )}

                    {/* Architecture Diagram (for HTTP Server project) */}
                    {project.architectureDiagram && (
                        <div className="fade-section" style={{ marginBottom: isMobile ? '40px' : '60px' }}>
                            <SectionTitle>{project.architectureDiagram.title}</SectionTitle>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {project.architectureDiagram.steps.map((step, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                                        <div style={{
                                            width: '36px',
                                            height: '36px',
                                            borderRadius: '50%',
                                            backgroundColor: theme.accent,
                                            color: '#fff',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            flexShrink: 0,
                                        }}>
                                            {step.step}
                                        </div>
                                        <div style={{ paddingTop: '6px' }}>
                                            <p style={{ fontSize: '15px', fontWeight: 600, color: theme.text, marginBottom: '4px' }}>{step.label}</p>
                                            <p style={{ fontSize: '14px', color: theme.textMuted, lineHeight: 1.5 }}>{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Architecture Details (for StudentHub project) */}
                    {project.architectureDetails && (
                        <div className="fade-section" style={{ marginBottom: isMobile ? '40px' : '60px' }}>
                            <SectionTitle>Architecture</SectionTitle>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {project.architectureDetails.layers.map((layer, i) => (
                                    <div key={i} style={{
                                        padding: '16px 20px',
                                        borderRadius: '10px',
                                        backgroundColor: darkMode ? 'rgba(59,130,246,0.08)' : 'rgba(59,130,246,0.05)',
                                        border: `1px solid ${darkMode ? 'rgba(59,130,246,0.2)' : 'rgba(59,130,246,0.15)'}`,
                                    }}>
                                        <p style={{ fontSize: '14px', fontWeight: 600, color: theme.accent, marginBottom: '4px' }}>{layer.name}</p>
                                        <p style={{ fontSize: '14px', color: theme.textMuted, lineHeight: 1.5 }}>{layer.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Key Features */}
                    {project.features && project.features.length > 0 && (
                        <div className="fade-section" style={{ marginBottom: isMobile ? '40px' : '60px' }}>
                            <SectionTitle>Key Features</SectionTitle>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {project.features.map((feature, i) => (
                                    <li key={i} style={{ fontSize: '15px', color: theme.textMuted, paddingLeft: '24px', position: 'relative', lineHeight: 1.6 }}>
                                        <span style={{ position: 'absolute', left: 0, top: '8px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: theme.accent }} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Code Examples (for HTTP Server project) */}
                    {project.codeExamples && (
                        <div className="fade-section" style={{ marginBottom: isMobile ? '40px' : '60px' }}>
                            <SectionTitle>Running the Project</SectionTitle>
                            {project.codeExamples.map((example, i) => (
                                <CodeBlock key={i} title={example.title} code={example.code} />
                            ))}
                        </div>
                    )}

                    {/* Tech Stack Reasoning */}
                    <div className="fade-section" style={{ marginBottom: isMobile ? '40px' : '60px' }}>
                        <SectionTitle>Why This Tech Stack</SectionTitle>
                        <Paragraph>{project.techReasoning}</Paragraph>
                    </div>

                    {/* Technical Insights */}
                    {project.technicalInsights && (
                        <div className="fade-section" style={{ marginBottom: isMobile ? '40px' : '60px' }}>
                            <SectionTitle>Technical Insights</SectionTitle>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                                {project.technicalInsights.map((insight, i) => (
                                    <div key={i} style={{
                                        padding: '20px 24px',
                                        borderRadius: '12px',
                                        backgroundColor: darkMode ? '#141416' : '#ffffff',
                                        border: `1px solid ${theme.border}`,
                                    }}>
                                        <h3 style={{ fontSize: '16px', fontWeight: 600, color: theme.text, marginBottom: '10px' }}>{insight.title}</h3>
                                        <p style={{ fontSize: '14px', color: theme.textMuted, lineHeight: 1.7 }}>{insight.content}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Challenges */}
                    <div className="fade-section" style={{ marginBottom: isMobile ? '40px' : '60px' }}>
                        <SectionTitle>Challenges & Solutions</SectionTitle>
                        <Paragraph>{project.challenges}</Paragraph>
                    </div>

                    {/* What I Learned */}
                    {project.learned && project.learned.length > 0 && (
                        <div className="fade-section" style={{ marginBottom: isMobile ? '40px' : '60px' }}>
                            <SectionTitle>What I Learned</SectionTitle>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {project.learned.map((item, i) => (
                                    <li key={i} style={{ fontSize: '15px', color: theme.textMuted, paddingLeft: '24px', position: 'relative', lineHeight: 1.6 }}>
                                        <span style={{ position: 'absolute', left: 0, top: '8px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: theme.accent }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Future Improvements */}
                    {project.futureImprovements ? (
                        <div className="fade-section" style={{ marginBottom: isMobile ? '40px' : '60px' }}>
                            <SectionTitle>Future Improvements</SectionTitle>
                            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {project.futureImprovements.map((item, i) => (
                                    <li key={i} style={{ fontSize: '15px', color: theme.textMuted, paddingLeft: '24px', position: 'relative', lineHeight: 1.6 }}>
                                        <span style={{ position: 'absolute', left: 0, top: '8px', width: '8px', height: '8px', borderRadius: '2px', backgroundColor: theme.accent }} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : project.improvements && (
                        <div className="fade-section" style={{ marginBottom: isMobile ? '40px' : '60px' }}>
                            <SectionTitle>What I'd Improve</SectionTitle>
                            <Paragraph>{project.improvements}</Paragraph>
                        </div>
                    )}

                    {/* Metrics */}
                    {project.metrics && (
                        <div className="fade-section" style={{ padding: '24px', borderRadius: '12px', backgroundColor: theme.accentMuted, border: `1px solid ${theme.accent}30`, marginBottom: isMobile ? '40px' : '60px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: theme.accent }}>Results & Impact</h3>
                            <p style={{ fontSize: '15px', lineHeight: 1.6, color: theme.text }}>{project.metrics}</p>
                        </div>
                    )}
                </div>
            </section>

            {/* Visual Showcase */}
            {project.images && project.images.length > 1 && (
                <section className="fade-section" style={{ padding: isMobile ? '40px 0' : '60px 0', backgroundColor: darkMode ? 'rgba(20,20,22,0.5)' : 'rgba(255,255,255,0.5)', width: '100%' }}>
                    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px', width: '100%' }}>
                        <h2 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 600, marginBottom: '32px', color: theme.text, textAlign: 'center' }}>Visual Showcase</h2>

                        {(project.isMobileApp || project.isTerminalScreenshot) ? (
                            // Mobile app or terminal screenshots - grid with full images
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: isMobile
                                    ? '1fr'
                                    : project.isTerminalScreenshot
                                        ? 'repeat(2, 1fr)'
                                        : `repeat(${Math.min(project.images.length, 5)}, 1fr)`,
                                gap: isMobile ? '16px' : '20px',
                            }}>
                                {project.images.map((img, index) => (
                                    <div
                                        key={index}
                                        onClick={() => setActiveImage(index)}
                                        style={{
                                            borderRadius: '12px',
                                            overflow: 'hidden',
                                            border: `2px solid ${activeImage === index ? theme.accent : theme.border}`,
                                            cursor: 'pointer',
                                            backgroundColor: project.isTerminalScreenshot ? '#0d0d0d' : (darkMode ? '#1a1a1d' : '#f4f4f5'),
                                            transition: 'all 0.2s',
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <div style={{
                                            padding: project.isTerminalScreenshot ? '12px' : (isMobile ? '12px' : '16px'),
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: project.isTerminalScreenshot ? '#0d0d0d' : (darkMode ? '#0f0f11' : '#f0f0f2'),
                                            flex: 1,
                                            minHeight: project.isTerminalScreenshot ? (isMobile ? '150px' : '180px') : 'auto',
                                        }}>
                                            <img
                                                src={img.src}
                                                alt={img.caption}
                                                style={{
                                                    maxHeight: project.isTerminalScreenshot
                                                        ? (isMobile ? '140px' : '160px')
                                                        : (isMobile ? '180px' : '280px'),
                                                    width: 'auto',
                                                    maxWidth: '100%',
                                                    borderRadius: project.isTerminalScreenshot ? '6px' : '8px',
                                                    boxShadow: project.isTerminalScreenshot
                                                        ? '0 4px 16px rgba(0,0,0,0.4)'
                                                        : (darkMode
                                                            ? '0 8px 24px rgba(0,0,0,0.4)'
                                                            : '0 8px 24px rgba(0,0,0,0.1)'),
                                                }}
                                            />
                                        </div>
                                        <p style={{ padding: isMobile ? '10px' : '12px', fontSize: isMobile ? '11px' : '12px', color: theme.textMuted, textAlign: 'center', lineHeight: 1.4, backgroundColor: project.isTerminalScreenshot ? '#1a1a1a' : 'transparent' }}>{img.caption}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            // Web app screenshots - standard grid with background cover
                            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                                {project.images.map((img, index) => (
                                    <div key={index} onClick={() => setActiveImage(index)} style={{ borderRadius: '12px', overflow: 'hidden', border: `2px solid ${activeImage === index ? theme.accent : theme.border}`, cursor: 'pointer', backgroundColor: darkMode ? '#1a1a1d' : '#f4f4f5', transition: 'all 0.2s' }}>
                                        <div style={{ width: '100%', height: isMobile ? '200px' : '180px', backgroundImage: `url(${img.src})`, backgroundSize: 'cover', backgroundPosition: 'center top' }} />
                                        <p style={{ padding: '12px', fontSize: '12px', color: theme.textMuted, textAlign: 'center' }}>{img.caption}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="fade-section" style={{ padding: isMobile ? '60px 0' : '80px 0', width: '100%' }}>
                <div style={{ maxWidth: '600px', margin: '0 auto', padding: '0 24px', textAlign: 'center', width: '100%' }}>
                    <h2 style={{ fontSize: isMobile ? '24px' : '28px', fontWeight: 600, marginBottom: '16px' }}>Interested in this project?</h2>
                    <p style={{ fontSize: '16px', color: theme.textMuted, marginBottom: '32px' }}>
                        {project.live ? 'Check out the live demo or view the source code on GitHub.' : 'View the source code on GitHub to see how it works.'}
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
                        {project.live && project.live !== '#' && (
                            <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 28px', fontSize: '15px', fontWeight: 600, borderRadius: '10px', backgroundColor: theme.accent, color: '#fff', textDecoration: 'none' }}><ExternalLink size={18} /> View Live Demo</a>
                        )}
                        {project.github && project.github !== '#' && (
                            <a href={project.github} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '14px 28px', fontSize: '15px', fontWeight: 600, borderRadius: '10px', border: `2px solid ${theme.border}`, backgroundColor: 'transparent', color: theme.text, textDecoration: 'none' }}><Github size={18} /> View Source Code</a>
                        )}
                    </div>
                    <a href="#" onClick={(e) => { e.preventDefault(); window.location.hash = ''; }} style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', marginTop: '40px', color: theme.textMuted, textDecoration: 'none', fontSize: '14px' }}><ChevronLeft size={16} /> Back to all projects</a>
                </div>
            </section>
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
                    'button, input, textarea, [tabindex]:not([tabindex="-1"])'
                );
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

        // Focus first input when modal opens
        setTimeout(() => {
            if (firstInputRef.current) {
                firstInputRef.current.focus();
            }
        }, 100);

        // Prevent body scroll when modal is open
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen]);

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
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
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
        .modal-input::placeholder {
          color: ${theme.textMuted};
          opacity: 0.7;
        }
      `}</style>

            {/* Overlay */}
            <div
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
                    aria-label="Close modal"
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
                        <h3 style={{ fontSize: '20px', fontWeight: 600, color: theme.text, marginBottom: '8px' }}>
                            Message sent!
                        </h3>
                        <p style={{ fontSize: '14px', color: theme.textMuted, lineHeight: 1.6 }}>
                            Thanks — I’ll get back to you soon.
                        </p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                                style={{
                                    ...inputStyle,
                                    ...(errors.name ? errorStyle : {}),
                                }}
                            />
                            {errors.name && (
                                <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{errors.name}</p>
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
                                style={{
                                    ...inputStyle,
                                    ...(errors.email ? errorStyle : {}),
                                }}
                            />
                            {errors.email && (
                                <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{errors.email}</p>
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
                                style={{
                                    ...inputStyle,
                                    resize: 'vertical',
                                    minHeight: '100px',
                                    ...(errors.message ? errorStyle : {}),
                                }}
                            />
                            {errors.message && (
                                <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px' }}>{errors.message}</p>
                            )}
                        </div>

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