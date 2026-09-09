import Image from 'next/image';
import { Reveal } from './reveal';

const assetBase = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function ImpactStories() {
  return (
    <section className="impact-stories section-pad" aria-labelledby="impact-title">
      <Reveal className="impact-intro">
        <p className="section-number mono">IMPACT / IN CONTEXT</p>
        <h2 id="impact-title">FOUR SYSTEMS.<br />FOUR OUTCOMES.</h2>
        <p>Scan the result. Follow the signal if you want the story.</p>
      </Reveal>

      <div className="impact-grid">
        <Reveal as="article" className="impact-card impact-role">
          <div className="impact-story-copy">
            <p className="mono">ROLEREADY / VIDEO PIPELINE</p>
            <strong>2H &rarr; 15M</strong>
            <span>EDUCATIONAL VIDEO GENERATION</span>
          </div>
          <ol className="mini-knowledge-flow mono" aria-label="RoleReady content generation pipeline">
            <li><i />KNOWLEDGE</li>
            <li><i />RETRIEVAL</li>
            <li><i />SCRIPT</li>
            <li><i />VOICE</li>
            <li className="is-output"><i />VIDEO</li>
          </ol>
        </Reveal>

        <Reveal as="article" className="impact-card impact-lost" delay={50}>
          <div className="impact-story-copy">
            <p className="mono">LOST STORIES / TRANSCRIPTION</p>
            <strong>3H &rarr; 12M</strong>
            <span>MULTILINGUAL PROCESSING</span>
          </div>
          <div className="impact-parallel" aria-hidden="true">
            <i /><span /><span /><span /><span /><b />
          </div>
        </Reveal>

        <Reveal as="article" className="impact-card impact-samsung" delay={100}>
          <div className="impact-story-copy">
            <p className="mono">SAMSUNG / VISUAL REGRESSION</p>
            <strong>20M &rarr; &lt;1M</strong>
            <span>VISION VERIFICATION</span>
          </div>
          <div className="mini-vision" aria-hidden="true">
            <div className="mini-frame"><i /><i /><i /></div>
            <div className="mini-difference"><i /><i /><i /><b /></div>
            <span className="mono">ALIGN &rarr; SSIM &rarr; DIFFERENCE</span>
          </div>
        </Reveal>

        <Reveal as="article" className="impact-card impact-prompt" delay={150}>
          <div className="impact-prompt-thumb" aria-hidden="true">
            <Image src={`${assetBase}/promptquest.png`} alt="" fill sizes="240px" />
          </div>
          <div className="impact-story-copy">
            <p className="mono">PROMPTQUEST / AWARD</p>
            <strong>1ST</strong>
            <span>VERCEL SOFTWARE AWARDS &middot; LA TECH WEEK</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
