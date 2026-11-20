import { useEffect, useState } from 'react'

const services = [
  {
    number: '01',
    name: 'Alterations',
    copy: 'A perfect fit is never an accident. We refine the pieces you own until they feel like they were made for you.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=85',
    backImage: 'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&w=900&q=85',
    alt: 'A tailor carefully working on a garment',
  },
  {
    number: '02',
    name: 'Made to measure',
    copy: 'Your cloth, your details, your silhouette. A one-to-one fitting for a suit that is entirely your own.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=900&q=85',
    backImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=85',
    alt: 'A carefully tailored dark suit',
  },
  {
    number: '03',
    name: 'Wedding',
    copy: 'For the day you will remember. Thoughtful styling and considered tailoring for you and your party.',
    image: 'https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=900&q=85',
    backImage: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=900&q=85',
    alt: 'A groom in a classic formal suit',
  },
]

const team = [
  {
    name: 'James Whitaker',
    role: 'Master Tailor',
    specialty: 'Bespoke suits & hand finishing',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=85',
  },
  {
    name: 'Amara Okafor',
    role: 'Lead Designer',
    specialty: 'Fabric, color & silhouette',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=85',
  },
  {
    name: 'Daniel Kim',
    role: 'Alterations Specialist',
    specialty: 'Precision fit & restoration',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=85',
  },
  {
    name: 'Sofia Laurent',
    role: 'Weddingwear Tailor',
    specialty: 'Wedding & occasion suits',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=700&q=85',
  },
]

function ArrowIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 20 20" fill="none">
      <path d="M3.5 10h12m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
      <path d="m3.5 8.2 2.8 2.7 6.3-6" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [bookingSent, setBookingSent] = useState(false)
  const [flippedPictures, setFlippedPictures] = useState([])

  const togglePicture = (pictureId) => {
    setFlippedPictures((current) =>
      current.includes(pictureId)
        ? current.filter((id) => id !== pictureId)
        : [...current, pictureId]
    )
  }

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')

    if (!('IntersectionObserver' in window)) {
      elements.forEach((element) => element.classList.add('is-visible'))
      return undefined
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12, rootMargin: '0px 0px -36px' })

    elements.forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    let frame

    const updateLight = (event) => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--light-x', `${event.clientX}px`)
        document.documentElement.style.setProperty('--light-y', `${event.clientY}px`)
      })
    }

    window.addEventListener('pointermove', updateLight, { passive: true })
    return () => {
      window.removeEventListener('pointermove', updateLight)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  function handleBooking(event) {
    event.preventDefault()
    setBookingSent(true)
  }

  return (
    <main>
      <div className="lighting-canvas" aria-hidden="true" />
      <div className="utility-bar">
        <div className="utility-inner">
          <div className="utility-contact">
            <a href="#visit"><span className="utility-icon">⌖</span> 0665 Broadway, NYC</a>
            <a href="tel:+18001234444"><span className="utility-icon">◔</span> 800 123 4444</a>
          </div>
          <p><span className="status-dot" /> Opening · Mon–Fri 10:00 – 20:00</p>
        </div>
      </div>

      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#home" aria-label="Tailorand home">
            <span>TAILORAND</span>
            <small>TAILORING</small>
          </a>
          <button
            type="button"
            className={menuOpen ? 'menu-toggle menu-toggle--open' : 'menu-toggle'}
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span />
          </button>
          <nav className={menuOpen ? 'main-nav main-nav--open' : 'main-nav'} aria-label="Main navigation">
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#team" onClick={closeMenu}>Team</a>
            <a href="#services" onClick={closeMenu}>Services <span className="nav-caret">⌄</span></a>
            <a href="#wedding" onClick={closeMenu}>Wedding</a>
            <a href="#pricing" onClick={closeMenu}>Pricing</a>
            <a href="#services" onClick={closeMenu}>Pages <span className="nav-caret">⌄</span></a>
            <a href="#journal" onClick={closeMenu}>Blog <span className="nav-caret">⌄</span></a>
            <a href="#visit" onClick={closeMenu}>Contact</a>
          </nav>
        </div>
      </header>

      <section className="hero" id="home">
        <img
          className="hero-image"
          src="https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=2200&q=90"
          alt="A tailor fitting a jacket in the atelier"
        />
        <div className="hero-overlay" />
        <div className="hero-content" data-reveal="hero">
          <p className="hero-kicker">CUT, TAILORED &amp; FITTED</p>
          <h1>Men&apos;s Wear Alterations<br /><em>and Tailoring</em></h1>
          <a className="button button--cream" href="#appointment">Make appointment</a>
        </div>
        <a className="hero-down" href="#about" aria-label="Scroll to about us">↓</a>
      </section>

      <section className="about-section" id="about">
        <div className="about-inner">
          <div className="about-copy" data-reveal="left">
            <p className="section-kicker">TAILORS TO TRUST</p>
            <h2>Tailorand <em>Tailoring</em></h2>
            <p>Tailor sit amet risus ac dui auctor posuere sit amet eget libero. Ut lacinia lectus risus facilisis, semper consequat sem fringilla. Etiam et tincidunt felis. Quisque at maximus nulla dictum vestibulum sed interdum neque dictum.</p>
            <p>Tailorand lobortis sollicitudin purus vel posuere. Maecenas auctor, turpis quis mattis tristique, ligula dolor vestibulum risus, nec ullamcorper justo dolor sodales lorem. Sed interdum orci ac metus vitae venenatis.</p>
            <ul className="trust-list">
              <li><CheckIcon /> Ten decades of experience in luxury tailoring</li>
              <li><CheckIcon /> We care about our customers’ satisfaction</li>
            </ul>
            <a className="underlined-link" href="#services">More about us <ArrowIcon /></a>
          </div>
          <div className="about-gallery" data-reveal="right" aria-label="Inside the Tailorand atelier">
            <button
              type="button"
              className={`flip-picture about-photo about-photo--work ${flippedPictures.includes('about-work') ? 'is-flipped' : ''}`}
              onClick={() => togglePicture('about-work')}
              aria-label="Flip tailor photograph"
              aria-pressed={flippedPictures.includes('about-work')}
            >
              <span className="flip-face flip-front">
                <img src="https://images.unsplash.com/photo-1598808503746-f34c53b9323e?auto=format&fit=crop&w=900&q=85" alt="A tailor hand-stitching a dark wool garment" loading="lazy" />
              </span>
              <span className="flip-face flip-back flip-back--photo">
                <img src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?auto=format&fit=crop&w=900&q=85" alt="Fabric and tailoring details" loading="lazy" />
                <span><small>THE CRAFT</small><strong>Every stitch,<br />considered.</strong></span>
              </span>
            </button>
            <button
              type="button"
              className={`flip-picture about-photo about-photo--portrait ${flippedPictures.includes('about-portrait') ? 'is-flipped' : ''}`}
              onClick={() => togglePicture('about-portrait')}
              aria-label="Flip fitted suit photograph"
              aria-pressed={flippedPictures.includes('about-portrait')}
            >
              <span className="flip-face flip-front">
                <img src="https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=900&q=85" alt="A client wearing a finely fitted suit" loading="lazy" />
              </span>
              <span className="flip-face flip-back flip-back--photo">
                <img src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&w=900&q=85" alt="A hand-finished suit detail" loading="lazy" />
                <span><small>THE FIT</small><strong>Made around<br />you.</strong></span>
              </span>
            </button>
            <span className="gallery-caption">Made by hand. Worn for years.</span>
          </div>
        </div>
      </section>

      <section className="team-section" id="team" aria-labelledby="team-title">
        <div className="content-width">
          <div className="team-heading" data-reveal="up">
            <p className="section-kicker">MEET THE ATELIER TEAM</p>
            <h2 id="team-title">Expert hands.<br /><em>Individual specialties.</em></h2>
            <p>Tailors and designers, working together to make every detail feel personal.</p>
          </div>
          <div className="team-grid">
            {team.map((member, index) => (
              <article
                className="team-card"
                key={member.name}
                data-reveal="card"
                style={{ '--reveal-delay': `${index * 100}ms` }}
              >
                <div className="team-photo">
                  <img src={member.image} alt={`Portrait of ${member.name}`} loading="lazy" />
                  <span>{String(index + 1).padStart(2, '0')}</span>
                </div>
                <div className="team-card-copy">
                  <p className="team-role">{member.role}</p>
                  <h3>{member.name}</h3>
                  <p className="team-specialty"><span>Specializes in</span>{member.specialty}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="services-section" id="services">
        <div className="content-width">
          <div className="section-heading" data-reveal="up">
            <div>
              <p className="section-kicker">WHAT WE DO</p>
              <h2>Good tailoring, <em>your way.</em></h2>
            </div>
            <a className="underlined-link" href="#appointment">View all services <ArrowIcon /></a>
          </div>
          <div className="service-grid">
            {services.map((service, index) => (
              <article
                className="service-card"
                id={service.name === 'Wedding' ? 'wedding' : undefined}
                key={service.number}
                data-reveal="card"
                style={{ '--reveal-delay': `${index * 110}ms` }}
              >
                <button
                  type="button"
                  className={`flip-picture service-image ${flippedPictures.includes(`service-${service.number}`) ? 'is-flipped' : ''}`}
                  onClick={() => togglePicture(`service-${service.number}`)}
                  aria-label={`Flip ${service.name} photograph`}
                  aria-pressed={flippedPictures.includes(`service-${service.number}`)}
                >
                  <span className="flip-face flip-front">
                    <img src={service.image} alt={service.alt} loading="lazy" />
                    <b>{service.number}</b>
                  </span>
                  <span className="flip-face flip-back flip-back--photo">
                    <img src={service.backImage} alt={`Discover ${service.name.toLowerCase()} tailoring`} loading="lazy" />
                    <span><small>{service.number}</small><strong>{service.name}</strong></span>
                  </span>
                </button>
                <div className="service-body">
                  <h3>{service.name}</h3>
                  <p>{service.copy}</p>
                  <a className="service-link" href="#appointment">Discover service <ArrowIcon /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="atelier-details" aria-labelledby="atelier-details-title">
        <div className="content-width">
          <div className="atelier-details-heading" data-reveal="up">
            <p className="section-kicker">THE TAILORAND WAY</p>
            <h2 id="atelier-details-title">Considered from first fitting<br />to <em>final stitch.</em></h2>
          </div>
          <div className="atelier-detail-panels">
            <article className="atelier-detail-panel" data-reveal="left">
              <div className="atelier-detail-meta"><span>01</span><span>PERSONAL FITTING</span></div>
              <h3>It starts with you.</h3>
              <p>We take the time to understand how you want your clothes to look and feel. Thoughtful measurements and a one-to-one consultation give every piece a more personal fit.</p>
              <a className="underlined-link" href="#appointment">Plan a fitting <ArrowIcon /></a>
            </article>
            <article className="atelier-detail-panel" data-reveal="right">
              <div className="atelier-detail-meta"><span>02</span><span>MADE TO LAST</span></div>
              <h3>Details worth keeping.</h3>
              <p>From careful alterations to considered finishing, we focus on the small details that help your favorite pieces fit beautifully and stay in rotation for years.</p>
              <a className="underlined-link" href="#services">Explore our services <ArrowIcon /></a>
            </article>
          </div>
        </div>
      </section>

      <section className="delivery-section" id="delivery">
        <div className="delivery-inner">
          <div className="delivery-visual" data-reveal="left">
            <img
              className="delivery-boutique-image"
              src="/Suit%20Haven%20Boutique%20Service.png"
              alt="A boutique owner handing a packaged suit to a customer at Suit Haven"
              loading="lazy"
            />
          </div>
          <div className="delivery-copy" data-reveal="right">
            <p className="section-kicker">A PERSONAL HANDOVER</p>
            <h2>A suit in a box.<br /><em>A moment made personal.</em></h2>
            <p>Our brand owner welcomes each customer with their finished suit, carefully wrapped and ready to wear—because the last fitting deserves a thoughtful send-off.</p>
            <div className="delivery-steps">
              <div><span>01</span><p>Your suit is finished in our atelier</p></div>
              <div><span>02</span><p>Carefully wrapped for collection</p></div>
              <div><span>03</span><p>Handed to you by our owner</p></div>
            </div>
            <a className="button button--dark" href="#appointment">Arrange your collection <ArrowIcon /></a>
          </div>
        </div>
      </section>

      <section className="promise-section" id="pricing">
        <button
          type="button"
          className={`flip-picture promise-image ${flippedPictures.includes('promise') ? 'is-flipped' : ''}`}
          onClick={() => togglePicture('promise')}
          aria-label="Flip tailoring process photograph"
          aria-pressed={flippedPictures.includes('promise')}
          data-reveal="left"
        >
          <span className="flip-face flip-front">
            <img src="https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&w=1400&q=85" alt="A gentleman wearing a custom-tailored suit" loading="lazy" />
          </span>
          <span className="flip-face flip-back flip-back--photo">
            <img src="https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?auto=format&fit=crop&w=1400&q=85" alt="A finished tailored suit" loading="lazy" />
            <span><small>THE PROCESS</small><strong>Measured.<br />Shaped. Finished.</strong></span>
          </span>
        </button>
        <div className="promise-copy" data-reveal="right">
          <p className="section-kicker">A BETTER FIT, BY DESIGN</p>
          <h2>Feel the difference<br />of <em>made for you.</em></h2>
          <p>From the first pin to the final press, our makers bring care and experience to every fitting. Your clothes should feel as good as they look.</p>
          <a className="button button--dark" href="#appointment">Discover our process <ArrowIcon /></a>
          <div className="promise-detail"><span>01</span> Personal consultation <span>02</span> Thoughtful finishing</div>
        </div>
      </section>

      <section className="appointment-section" id="appointment">
        <div className="appointment-inner" id="visit">
          <div data-reveal="left">
            <p className="section-kicker">YOUR TAILOR IS WAITING</p>
            <h2>A good fit starts<br />with <em>hello.</em></h2>
            <p className="appointment-description">Visit our New York atelier or get in touch to arrange a personal fitting. We look forward to meeting you.</p>
            <p className="appointment-address">0665 Broadway, New York, NY<br />Mon–Fri, 10:00–20:00 · +1 800 123 4444</p>
          </div>
          <form className="appointment-form" onSubmit={handleBooking} data-reveal="right">
            <label htmlFor="appointment-email">Request an appointment</label>
            <p>Leave your email and our team will be in touch.</p>
            <div className="email-field">
              <input id="appointment-email" name="email" type="email" placeholder="Your email address" required />
              <button type="submit" aria-label="Send appointment request"><ArrowIcon /></button>
            </div>
            <span className={bookingSent ? 'form-message form-message--success' : 'form-message'} aria-live="polite">
              {bookingSent ? 'Thank you. We’ll be in touch shortly.' : 'No pressure, just a conversation.'}
            </span>
          </form>
        </div>
      </section>

      <footer className="site-footer" id="journal">
        <a className="brand brand--footer" href="#home"><span>TAILORAND</span><small>TAILORING</small></a>
        <p>Considered tailoring. Made for you.</p>
        <div className="footer-links">
          <a href="#services">Services</a>
          <a href="#team">Team</a>
          <a href="#appointment">Contact</a>
          <a href="#journal">Instagram</a>
          <span>© Tailorand 2025</span>
        </div>
      </footer>
    </main>
  )
}

export default App
