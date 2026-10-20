import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, BookOpen, BriefcaseBusiness,
  CheckCircle2, Code2, ExternalLink, Github, GraduationCap, Laptop,
  Mail, MapPin, Menu, Moon, Phone, Send, Sun, Target, Terminal, X
} from "lucide-react";
import "./styles.css";

const skills = [
  { name: "HTML", type: "Frontend", mark: "5", color: "#f1662a" },
  { name: "CSS", type: "Frontend", mark: "3", color: "#2878d0" },
  { name: "JavaScript", type: "Frontend", mark: "JS", color: "#d5a900" },
  { name: "React.js", type: "Frontend", mark: "⚛", color: "#39c5ed" },
  { name: "Python", type: "Programming", mark: "Py", color: "#4b8bbe" },
  { name: "PHP (Basic)", type: "Backend", mark: "php", color: "#777bb4" },
  { name: "MySQL", type: "Database", mark: "⌁", color: "#00758f" },
  { name: "Linux", type: "Operating System", mark: "L", color: "#e3ad21" },
  { name: "WordPress", type: "CMS", mark: "W", color: "#21759b" },
  { name: "WooCommerce", type: "E-commerce", mark: "W", color: "#96588a" },
  { name: "Figma", type: "Design", mark: "F", color: "#a259ff" },
];

const projects = [
  { title: "E-commerce Website", category: "React", description: "A responsive storefront concept with product cards, category filters, and a clean shopping layout.", tags: ["React", "Vite", "CSS"], symbol: "🛍️", theme: "violet" },
  { title: "Manis Motors", category: "Frontend", description: "A modern vehicle showcase for cars, bikes, and tractors with a responsive layout.", tags: ["React", "Bootstrap", "JavaScript"], symbol: "🚘", theme: "blue" },
  { title: "School Website", category: "Frontend", description: "A friendly school website concept with courses, school highlights, and contact information.", tags: ["React", "CSS", "Responsive"], symbol: "🎓", theme: "orange" },
  { title: "DevOps Notes", category: "DevOps", description: "A learning tracker for Linux commands, Git practice, and deployment notes.", tags: ["Git", "Linux", "DevOps"], symbol: "⌘", theme: "green" },
  { title: "WordPress Landing Page", category: "Frontend", description: "A marketing landing page concept with responsive sections and clear calls to action.", tags: ["WordPress", "CSS", "Elementor"], symbol: "✦", theme: "pink" },
  { title: "User Management UI", category: "React", description: "A dashboard interface concept for users, roles, search, and status labels.", tags: ["React", "UI", "CRUD concept"], symbol: "👥", theme: "cyan" },
];

const filters = ["All", "React", "Frontend", "DevOps"];

function App() {
  const [dark, setDark] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [notice, setNotice] = useState("");
  const [noticeType, setNoticeType] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", role: "", phone: "", message: "" });

  const visibleProjects = useMemo(() => projects.filter((project) => {
    const matchesFilter = filter === "All" || project.category === filter || project.tags.includes(filter);
    const text = `${project.title} ${project.description} ${project.tags.join(" ")}`.toLowerCase();
    return matchesFilter && text.includes(query.toLowerCase());
  }), [filter, query]);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setNotice("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const responseText = await response.text();
      let result;
      try {
        result = JSON.parse(responseText);
      } catch {
        throw new Error("The contact service returned an invalid response. Check that the API server is running.");
      }

      if (!response.ok) {
        throw new Error(result.error || "Your message could not be sent. Please try again.");
      }

      setNoticeType("success");
      setNotice(`Thanks, ${form.name}. Your message has been sent.`);
      setForm({ name: "", email: "", company: "", role: "", phone: "", message: "" });
    } catch (error) {
      setNoticeType("error");
      setNotice(error instanceof TypeError
        ? "Unable to reach the contact service. Please try again later or email me directly."
        : error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className={dark ? "app dark" : "app light"}>
      <header className="topbar">
        <a className="brand" href="#home" onClick={closeMenu}>Manikanta<span>.</span></a>
        <button className="menu-toggle icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={menuOpen ? "nav nav-open" : "nav"} aria-label="Main navigation">
          {["Home", "About", "Experience", "Skills", "Learning", "Projects", "Contact"].map((item) =>
            <a key={item} href={`#${item.toLowerCase()}`} onClick={closeMenu}>{item}</a>
          )}
        </nav>
        <div className="top-actions">
          <button className="icon-button theme-button" onClick={() => setDark(!dark)} aria-label="Toggle theme">
            {dark ? <Sun size={19} /> : <Moon size={19} />}
          </button>
          <a className="button button-primary resume-button" href="#contact">Let's Connect <ArrowUpRight size={16} /></a>
        </div>
      </header>

      <main>
        <section className="hero section-wrap" id="home">
          <div className="hero-copy">
            <div className="availability"><span className="pulse" /> Open to opportunities</div>
            <p className="eyebrow">HELLO, WORLD 👋</p>
            <h1>1.5 years building for the web.<br /><span>Growing into DevOps.</span></h1>
            <p className="hero-text">I'm Manikanta, with professional experience in WordPress, WooCommerce, and frontend development at Espirit Technology. I'm currently studying DevOps and exploring my next opportunity.</p>
            <div className="hero-buttons">
              <a className="button button-primary" href="#projects">Explore my work <ArrowRight size={17} /></a>
              <a className="button button-outline" href="#contact">Contact me</a>
            </div>
            <div className="social-row">
              <a className="social-link" href="https://github.com/" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
              <a className="social-link text-social" href="https://www.linkedin.com/" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a>
              <a className="social-link" href="mailto:manikantareddy22.gade@gmail.com" aria-label="Email"><Mail size={18} /></a>
              <span className="social-caption">Find me online</span>
            </div>
          </div>
          <div className="hero-art" aria-label="Developer terminal illustration">
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="terminal-card">
              <div className="terminal-head"><span /><span /><span /><small>developer.js</small></div>
              <pre><code><span className="code-purple">const</span> developer = {"{"}
{"\n"}  name: <span className="code-green">"Manikanta"</span>,
{"\n"}  focus: [<span className="code-green">"React"</span>, <span className="code-green">"Linux"</span>],
{"\n"}  learning: <span className="code-green">"DevOps"</span>,
{"\n"}  mindset: <span className="code-green">"Keep building"</span>
{"\n"}{"}"};</code></pre>
              <div className="terminal-status"><span className="pulse" /> all systems learning</div>
            </div>
            <div className="floating-chip chip-react"><span className="react-mark">⚛</span> React</div>
            <div className="floating-chip chip-devops"><Terminal size={18} /> DevOps</div>
            <div className="hero-monogram"><Code2 size={84} strokeWidth={1.1} /><span>BUILD<br />DEPLOY<br />REPEAT</span></div>
            <div className="hero-orb" />
          </div>
          <a className="scroll-cue" href="#about"><ArrowDownRight size={17} /> Scroll to explore</a>
        </section>

        <section className="section-wrap about-section section" id="about">
          <div className="section-heading">
            <p className="eyebrow">A LITTLE ABOUT ME</p>
            <h2>Curious by nature.<br /><span>Developer by practice.</span></h2>
          </div>
          <div className="about-grid">
            <div className="about-copy">
              <p>I'm a Computer Science graduate with 1.5 years of professional experience at Espirit Technology, working across WordPress, WooCommerce, and frontend development. I'm currently studying DevOps, building on my web development background with Linux, Git, and deployment fundamentals.</p>
              <p>This portfolio is also a practical project: I'll use Git to track changes, GitHub to store code, and a hosting platform to publish updates.</p>
              <div className="stats-grid">
                <div className="stat"><GraduationCap /><div><strong>CSE Graduate</strong><small>Computer Science</small></div></div>
                <div className="stat"><BriefcaseBusiness /><div><strong>Web Development</strong><small>WordPress & frontend</small></div></div>
                <div className="stat"><MapPin /><div><strong>Hyderabad, India</strong><small>Open to opportunities</small></div></div>
                <div className="stat"><Target /><div><strong>Current goal</strong><small>Learn DevOps hands-on</small></div></div>
              </div>
            </div>
            <div className="about-side">
              <div className="code-visual"><Laptop size={46} /><div className="visual-lines"><i /><i /><i /><i /><i /></div><span>Always building something</span></div>
              <div className="principles">
                <div className="principle-icon blue"><Code2 /></div><div><strong>Clean code</strong><p>Readable, maintainable interfaces</p></div>
                <div className="principle-icon green"><CheckCircle2 /></div><div><strong>Practical learning</strong><p>Learn by building and debugging</p></div>
                <div className="principle-icon purple"><Terminal /></div><div><strong>DevOps mindset</strong><p>Automate, test, deploy, improve</p></div>
                <div className="principle-icon orange"><BookOpen /></div><div><strong>Keep growing</strong><p>Small progress, consistently</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-wrap section experience-section" id="experience">
          <div className="section-heading">
            <p className="eyebrow">PROFESSIONAL EXPERIENCE</p>
            <h2>Experience that <span>builds forward.</span></h2>
          </div>
          <article className="experience-card">
            <div className="experience-mark"><BriefcaseBusiness /></div>
            <div className="experience-content">
              <div className="experience-heading">
                <div>
                  <h3>WordPress, WooCommerce & Frontend Developer</h3>
                  <p className="experience-company">Espirit Technology</p>
                </div>
                <span className="experience-duration">1.5 years</span>
              </div>
              <p>Professional experience across WordPress and WooCommerce websites and frontend development. Now building on that foundation through ongoing DevOps studies.</p>
              <div className="tag-row"><span>WordPress</span><span>WooCommerce</span><span>Frontend</span></div>
            </div>
          </article>
        </section>

        <section className="section-wrap section" id="skills">
          <div className="section-title-row">
            <div className="section-heading"><p className="eyebrow">TOOLS IN MY TOOLBOX</p><h2>Skills & technologies</h2></div>
            <span className="subtle-label">Learning in public <span className="pulse" /></span>
          </div>
          <div className="skills-grid">
            {skills.map((skill) => <div className="skill-card" key={skill.name}>
              <span className="skill-mark" style={{ "--skill-color": skill.color }}>{skill.mark}</span>
              <strong>{skill.name}</strong><small>{skill.type}</small>
            </div>)}
          </div>
        </section>

        <section className="section-wrap section learning-section" id="learning">
          <div className="section-title-row">
            <div className="section-heading">
              <p className="eyebrow">WHAT I'M WORKING TOWARD</p>
              <h2>A practical learning roadmap</h2>
              <p className="section-description">My DevOps course is going well, and I'm steadily building practical Linux, automation, and deployment skills.</p>
            </div>
            <span className="learning-badge"><span className="pulse" /> One step at a time</span>
          </div>
          <div className="learning-grid">
            <article className="learning-card">
              <span className="learning-icon"><Terminal /></span>
              <p className="learning-step">01 / IN PROGRESS</p>
              <h3>DevOps & Linux</h3>
              <p>Continue my DevOps course and strengthen Linux and command-line fundamentals.</p>
            </article>
            <article className="learning-card">
              <span className="learning-icon"><Code2 /></span>
              <p className="learning-step">02 / NEXT MILESTONE</p>
              <h3>CI/CD foundations</h3>
              <p>Learn how automated checks and build pipelines help teams ship changes more reliably.</p>
            </article>
            <article className="learning-card">
              <span className="learning-icon"><Target /></span>
              <p className="learning-step">03 / LONG-TERM GOAL</p>
              <h3>Cloud deployment</h3>
              <p>Practice taking applications from a local project to a live, maintainable deployment.</p>
            </article>
          </div>
        </section>

        <section className="section-wrap section projects-section" id="projects">
          <div className="section-title-row">
            <div className="section-heading"><p className="eyebrow">SELECTED PRACTICE WORK</p><h2>Projects that show my progress</h2><p className="section-description">Demo concepts today, stronger real-world projects with every iteration.</p></div>
            <span className="project-count">{visibleProjects.length.toString().padStart(2, "0")} PROJECTS</span>
          </div>
          <div className="project-controls">
            <div className="filter-row">
              {filters.map((item) => <button key={item} className={filter === item ? "filter active" : "filter"} onClick={() => setFilter(item)}>{item}</button>)}
            </div>
            <input className="search-input" type="search" placeholder="Search projects..." value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search projects" />
          </div>
          <div className="projects-grid">
            {visibleProjects.map((project, index) => <article className="project-card" key={project.title}>
              <div className={`project-cover ${project.theme}`}>
                <span className="project-index">0{index + 1} / PROJECT</span>
                <span className="project-symbol">{project.symbol}</span>
                <div className="cover-window"><span /><span /><span /><div className="cover-content"><i /><i /><i /></div></div>
                <a href="#contact" className="project-open" aria-label={`Ask about ${project.title}`}><ExternalLink size={17} /></a>
              </div>
              <div className="project-body">
                <div className="project-title-row"><h3>{project.title}</h3><ArrowUpRight size={17} /></div>
                <p>{project.description}</p>
                <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
              </div>
            </article>)}
            {visibleProjects.length === 0 && <div className="empty-state">No projects match that search. Try another keyword.</div>}
          </div>
        </section>

        <section className="section-wrap cta-section">
          <div><p className="eyebrow">OPEN TO OPPORTUNITIES</p><h2>Web experience.<br /><span>DevOps ambition.</span></h2><p>I'm looking for frontend developer roles, DevOps internships, technical support positions, and Linux-focused opportunities.</p></div>
          <a className="button button-primary" href="#contact">Let's talk <ArrowRight size={17} /></a>
          <div className="cta-decoration"><Code2 size={116} /></div>
        </section>

        <section className="section-wrap section contact-section" id="contact">
          <div className="section-heading"><p className="eyebrow">LET'S CONNECT</p><h2>Ready for my next <span>opportunity.</span></h2><p className="section-description">Recruiters can share role details here. Your message will be sent directly to my email.</p></div>
          <div className="contact-grid">
            <div className="contact-details">
              <a className="contact-item" href="mailto:manikantareddy22.gade@gmail.com"><span><Mail /></span><div><small>Email</small><strong>manikantareddy22.gade@gmail.com</strong></div><ArrowUpRight /></a>
              <a className="contact-item" href="tel:8179586234"><span><Phone /></span><div><small>Phone</small><strong>8179586234</strong></div><ArrowUpRight /></a>
              <div className="contact-item"><span><MapPin /></span><div><small>Location</small><strong>Hyderabad, India</strong></div></div>
              <div className="contact-note"><span className="pulse" /> Open to frontend, DevOps intern, technical support, and Linux roles.</div>
            </div>
            <form className="contact-form" onSubmit={handleSubmit}>
              <label>Your name<input required maxLength="100" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Enter your name" /></label>
              <label>Email address<input required type="email" maxLength="254" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com" /></label>
              <label>Company<input required maxLength="120" autoComplete="organization" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} placeholder="Company name" /></label>
              <label>Role or opportunity<input required maxLength="120" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="e.g. Frontend Developer" /></label>
              <label>Phone number (optional)<input type="tel" maxLength="40" autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Your contact number" /></label>
              <label>Message<textarea required maxLength="5000" rows="4" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Share the role details..." /></label>
              <button className="button button-primary submit-button" type="submit" disabled={isSubmitting}>{isSubmitting ? "Sending..." : "Send message"} {!isSubmitting && <Send size={16} />}</button>
              {notice && <p className={`form-notice ${noticeType}`} role="status" aria-live="polite">{notice}</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer section-wrap"><a className="brand" href="#home">Manikanta<span>.</span></a><p>Designed to learn. Built to grow. © {new Date().getFullYear()}</p><a href="#home" className="back-top">Back to top ↑</a></footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<React.StrictMode><App /></React.StrictMode>);
