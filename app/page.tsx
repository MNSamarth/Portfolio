import Image from 'next/image';
import { ComparisonSlider } from './components/comparison-slider';
import { ImpactStories } from './components/impact-stories';
import { LostStoriesPipeline } from './components/lost-stories-pipeline';
import { Reveal } from './components/reveal';
import { RoleReadyMap } from './components/role-ready-map';
import { SiteHeader } from './components/site-header';
import { SystemField } from './components/system-field';
import { TechNetwork } from './components/tech-network';

export const dynamic = 'force-static';

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const experience = [
  { year: '2024—25', company: 'VYLAR / LOST STORIES', role: 'Founding Software Engineering Intern', category: 'PRODUCTION SYSTEMS · AI' },
  { year: '2023', company: 'VIDATT DATA ANALYTICS', role: 'Frontend Developer Intern', category: 'REACT · TESTING' },
  { year: '2023', company: 'SAMSUNG PRISM', role: 'Software Engineering Intern', category: 'COMPUTER VISION' },
  { year: '2023', company: 'CONTRIVER', role: 'Developer Intern', category: 'FULL STACK · ML' },
];

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <SiteHeader />
      <main id="main">
        <section id="top" className="hero" aria-labelledby="hero-title">
          <SystemField />
          <div className="hero-meta mono">
            <span>01 / SOFTWARE ENGINEER</span>
            <span>LOS ANGELES, CA</span>
          </div>
          <div className="hero-content">
            <div className="hero-heading-wrap">
              <h1 id="hero-title" className="hero-title">
                <span>SAMARTH</span>
                <span>MANDAGERE</span>
              </h1>
              <span className="hero-status mono"><i /> SYSTEMS ONLINE</span>
            </div>
            <div className="hero-summary">
              <p className="hero-deck">Software Engineer building backend systems and intelligent products.</p>
              <p className="hero-focus mono">BACKEND · AI INTEGRATION · PRODUCT ENGINEERING</p>
              <p className="hero-school">M.S. Computer Science @ USC · May 2027</p>
              <div className="hero-actions mono">
                <a className="button button-primary" href="#work">Explore work <span aria-hidden="true">↓</span></a>
                <a className="button button-secondary" href={`${assetBase}/Samarth_Narahari_Mandagere.pdf`} target="_blank" rel="noreferrer">Résumé <span aria-hidden="true">↗</span></a>
              </div>
            </div>
          </div>
          <div className="hero-index mono" aria-hidden="true">SIGNAL FIELD / MOVE TO EXPLORE</div>
        </section>

        <Reveal as="section" className="identity section-pad" aria-labelledby="identity-title">
          <div className="identity-copy">
            <p className="section-kicker mono">BUILT FROM FRICTION</p>
            <h2 id="identity-title">I BUILD THINGS<br />I WISH ALREADY<br />EXISTED.</h2>
            <p>I’m a software engineer who tends to notice friction and start building. My work spans backend systems, product engineering and practical AI — from retrieval systems and multimodal pipelines to tools I wanted to use myself.</p>
          </div>
          <div className="identity-loop" aria-label="Build, use, break, improve, repeat">
            <div className="loop-orbit">
              <span className="mono">BUILD</span><span className="mono">USE</span><span className="mono">BREAK</span><span className="mono">IMPROVE</span>
              <i /><b />
            </div>
            <p className="mono">REPEAT / SINCE 2021</p>
          </div>
        </Reveal>

        <ImpactStories />

        <section id="work" className="work" aria-labelledby="work-title">
          <Reveal className="work-intro section-pad">
            <p className="section-number mono">02 / SELECTED WORK</p>
            <div>
              <h2 id="work-title">SYSTEMS, PRODUCTS<br />AND USEFUL EXPERIMENTS.</h2>
              <p>Each project began with a different kind of friction.</p>
            </div>
          </Reveal>

          <article className="role-ready-project project-section compact-project role-ready-compact" aria-labelledby="roleready-title">
            <Reveal className="project-compact-copy">
              <p className="project-index mono">01 / AI SYSTEMS &middot; BACKEND</p>
              <h3 id="roleready-title">ROLEREADY</h3>
              <p className="project-tagline">Turning company knowledge into a learning system.</p>
              <p className="project-description">An AI-powered onboarding platform that ingests organizational knowledge from GitHub, Jira, Confluence and stored context, performs semantic retrieval, and generates structured learning content, interactive mindmaps and educational media.</p>
              <div className="project-metric">
                <strong>2H &rarr; 15M</strong>
                <span className="mono">EDUCATIONAL VIDEO GENERATION</span>
              </div>
              <p className="tech-line mono">PYTHON / FASTAPI / LANGCHAIN / GEMINI / PGVECTOR / SUPABASE / GCP</p>
            </Reveal>
            <Reveal className="rr-map-wrap">
              <RoleReadyMap />
            </Reveal>
          </article>

          <article className="promptquest-project project-section compact-project promptquest-compact" aria-labelledby="promptquest-title">
            <Reveal className="promptquest-copy project-compact-copy">
              <p className="project-index mono">02 / PRODUCT &middot; AI</p>
              <h3 id="promptquest-title">PROMPTQUEST</h3>
              <p className="project-tagline">Prompting, but competitive.</p>
              <p className="project-description">A web-based game that teaches high-quality prompt engineering through interactive challenges and real-time scoring powered by Google Gemini.</p>
              <p className="tech-line mono">REACT / TYPESCRIPT / FLASK / GEMINI / DOCKER / CLOUD RUN</p>
              <div className="text-links mono">
                <a href="https://prompt-quest-theta.vercel.app/" target="_blank" rel="noreferrer">LIVE &nearr;</a>
                <a href="https://github.com/MNSamarth/PromptQuest" target="_blank" rel="noreferrer">GITHUB &nearr;</a>
              </div>
            </Reveal>
            <div className="promptquest-stage">
              <Reveal className="promptquest-image-main">
                <Image src={`${assetBase}/promptquest.png`} alt="PromptQuest gameplay interface showing its challenge path, score, level, and leaderboard" fill sizes="(max-width: 800px) 100vw, 62vw" priority={false} />
              </Reveal>
              <Reveal className="pq-float pq-score mono" delay={120}>
                <span>REAL-TIME SCORE</span><strong>00</strong><i />
              </Reveal>
              <Reveal className="pq-float pq-challenge mono" delay={180}>
                <span>CHALLENGE / 01</span><strong>PROMPT</strong><small>CREATIVITY + CLARITY</small>
              </Reveal>
              <Reveal className="pq-award" delay={220}>
                <span className="mono">VERCEL SOFTWARE AWARDS &middot; LA TECH WEEK</span>
                <strong>1ST<br />PLACE</strong>
              </Reveal>
            </div>
          </article>

          <article className="lost-project project-section compact-project lost-compact" aria-labelledby="lost-title">
            <Reveal className="lost-heading project-compact-copy">
              <p className="project-index mono">03 / PRODUCTION ENGINEERING</p>
              <h3 id="lost-title">VYLAR /<br />LOST STORIES</h3>
              <p className="role mono">FOUNDING SOFTWARE ENGINEERING INTERN</p>
              <p className="project-description">Built creator publishing workflows across React, Node and MongoDB application services, plus Python and Flask processing services for multilingual transcription and recommendation systems deployed on AWS EC2.</p>
            </Reveal>
            <Reveal className="lost-visual-wrap">
              <LostStoriesPipeline />
              <div className="lost-caption mono"><span>AUDIO INGEST</span><span>PARALLEL CHUNKS</span><span>TRANSCRIPT</span></div>
            </Reveal>
          </article>

          <article className="samsung-project project-section compact-project samsung-compact" aria-labelledby="samsung-title">
            <Reveal className="samsung-heading project-compact-copy">
              <p className="project-index mono">04 / COMPUTER VISION</p>
              <h3 id="samsung-title">SAMSUNG PRISM</h3>
              <p className="role mono">SOFTWARE ENGINEERING INTERN &mdash; COMPUTER VISION</p>
              <p className="project-description">Engineered an automated visual regression pipeline in Python using OpenCV, NumPy, SSIM, template matching, image alignment and anomaly detection to make large-batch image verification fast and repeatable.</p>
            </Reveal>
            <Reveal className="comparison-wrap">
              <ComparisonSlider />
            </Reveal>
          </article>
        </section>

        <section className="experience section-pad" aria-labelledby="experience-title">
          <Reveal className="experience-heading">
            <p className="section-number mono">03 / EXPERIENCE</p>
            <h2 id="experience-title">WHERE I’VE SHIPPED.</h2>
          </Reveal>
          <div className="experience-signal" aria-hidden="true"><i /><i /><i /><i /><span /></div>
          <div className="timeline">
            {experience.map((item, index) => (
              <Reveal key={item.company} as="article" className="timeline-row" delay={index * 50}>
                <time className="mono">{item.year}</time>
                <h3>{item.company}</h3>
                <p>{item.role}</p>
                <span className="mono">{item.category}</span>
              </Reveal>
            ))}
          </div>
        </section>

        <section id="about" className="about section-pad" aria-labelledby="about-title">
          <Reveal className="about-photo-stage">
            <div className="about-image">
              <Image src={`${assetBase}/SamarthMN(DP).png`} alt="Samarth Mandagere" fill unoptimized sizes="(max-width: 640px) 100vw, 600px" />
            </div>
            <span className="photo-index mono">PHOTO 01 / USC</span>
            <div className="photo-registration mono" aria-hidden="true"><i /> 34.0206° N<br /><i /> 118.2854° W</div>
          </Reveal>
          <Reveal className="about-copy" delay={100}>
            <p className="section-number mono">04 / ABOUT</p>
            <h2 id="about-title">BUILDING IS<br />KIND OF A HABIT.</h2>
            <div className="about-body">
              <p>A lot of my side projects begin because something in my day-to-day life feels unnecessarily difficult or repetitive. Eventually “someone should build this” turns into “fine, I’ll build it.”</p>
              <p>I’m currently pursuing my M.S. in Computer Science at USC and gravitate toward backend engineering, AI-integrated products and systems where architecture matters as much as the interface.</p>
            </div>
          </Reveal>
          <Reveal className="interest-annotations">
            <p className="mono">WHEN I’M NOT BUILDING / FIELD NOTES</p>
            <div className="interest-cloud">
              <span className="note-1">LIFTING <i>06:30</i></span>
              <span className="note-2">GAMING <i>+ TEAM</i></span>
              <span className="note-3">ANIME <i>QUEUE: LONG</i></span>
              <span className="note-4">MUSIC <i>ON REPEAT</i></span>
              <span className="note-5">COOKING SOMETHING <i>V0.3</i></span>
              <span className="note-6">EATING SOMETHING BETTER <i>✓</i></span>
            </div>
            <p className="personality-note">Usually somewhere between starting another side project and telling myself I already have enough side projects.</p>
          </Reveal>
        </section>

        <section className="technology section-pad" aria-labelledby="technology-title">
          <Reveal className="technology-heading">
            <p className="section-number mono">05 / TOOLS I REACH FOR</p>
            <div>
              <h2 id="technology-title">TOOLS CONNECTED<br />TO REAL WORK.</h2>
              <p>Hover or tap a technology to trace where it was used.</p>
            </div>
          </Reveal>
          <Reveal className="tech-network-wrap">
            <TechNetwork />
          </Reveal>
        </section>

        <footer className="contact section-pad" aria-labelledby="contact-title">
          <Reveal>
            <p className="section-number mono">06 / CONTACT</p>
            <h2 id="contact-title" className="contact-heading">LET’S BUILD<br /><em>SOMETHING USEFUL.</em></h2>
            <nav className="contact-links mono" aria-label="Contact links">
              <a href="mailto:samarthmandagere.dev@gmail.com">EMAIL ↗</a>
              <a href="https://www.linkedin.com/in/samarthmandagere/" target="_blank" rel="noreferrer">LINKEDIN ↗</a>
              <a href="https://github.com/MNSamarth" target="_blank" rel="noreferrer">GITHUB ↗</a>
              <a href={`${assetBase}/Samarth_Narahari_Mandagere.pdf`} target="_blank" rel="noreferrer">RÉSUMÉ ↗</a>
            </nav>
          </Reveal>
          <div className="footer-line mono">
            <span>SAMARTH MANDAGERE</span>
            <span>LOS ANGELES</span>
            <a href="#top">BACK TO TOP ↑</a>
          </div>
        </footer>
      </main>
    </>
  );
}