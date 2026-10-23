/* Shared navigation, footer, mobile menu, FAQ accordion, and review carousel. */
const ENROLL_URL = 'https://forms.gle/1qeqk1FDT8qyGmPd8';
const REVIEW_URL = 'https://forms.gle/Ak16ZvCyWL39sR3o7';
const INSTAGRAM_URL = 'https://www.instagram.com/Aniras_Hub/';
const EMAIL = 'AnirasHub@gmail.com';

const pageLinks = [
  ['Home', 'home.html', 'home'],
  ['Services', 'services.html', 'services'],
  ['Reviews', 'reviews.html', 'reviews'],
  ['FAQs', 'faqs.html', 'faqs'],
  ['About US', 'about.html', 'about']
];

function currentPageKey() {
  const file = window.location.pathname.split('/').pop().toLowerCase();
  if (!file || file === 'home.html') return 'home';
  if (file.startsWith('services')) return 'services';
  if (file.startsWith('reviews')) return 'reviews';
  if (file.startsWith('faqs')) return 'faqs';
  if (file.startsWith('about')) return 'about';
  return '';
}

function renderHeader() {
  const host = document.getElementById('site-header');
  if (!host) return;
  const active = currentPageKey();
  const nav = pageLinks.map(([label, href, key]) =>
    `<a href="${href}" ${active === key ? 'aria-current="page"' : ''}>${label}</a>`
  ).join('');
  host.innerHTML = `
    <header class="site-header">
      <div class="nav-inner">
        <a class="brand" href="index.html" aria-label="Aniras Hub home">
          <!-- LOGO LOCATION: replace assets/aniras-hub-logo.png or change this src. -->
          <img src="assets/aniras-hub-logo.png" alt="Aniras Hub — Turn Not Yet into What's Next">
        </a>
        <nav class="nav-links" id="primary-navigation" aria-label="Main navigation">${nav}</nav>
        <a class="nav-enroll" href="${ENROLL_URL}" target="_blank" rel="noopener">ENROLL<br>NOW</a>
        <button class="menu-toggle" type="button" aria-label="Open navigation menu" aria-controls="primary-navigation" aria-expanded="false">☰</button>
      </div>
    </header>`;
  const toggle = host.querySelector('.menu-toggle');
  const menu = host.querySelector('.nav-links');
  toggle?.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    toggle.textContent = isOpen ? '×' : '☰';
  });
  menu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    toggle?.setAttribute('aria-expanded', 'false');
    if (toggle) { toggle.textContent = '☰'; toggle.setAttribute('aria-label', 'Open navigation menu'); }
  }));
}

function renderFooter() {
  const host = document.getElementById('site-footer');
  if (!host) return;
  host.innerHTML = `
    <footer class="site-footer">
      <div class="footer-inner">
        <a class="footer-brand" href="index.html" aria-label="Aniras Hub home"><img src="assets/aniras-hub-logo.png" alt="Aniras Hub logo"></a>
        <div class="footer-column">
          <h2>Quick Links</h2>
          <div class="footer-links">
            <a href="${ENROLL_URL}" target="_blank" rel="noopener">Book a free session</a>
            <a href="index.html">Home</a>
            <a href="services.html">Services</a>
            <a href="reviews.html">Reviews</a>
            <a href="faqs.html">FAQs</a>
            <a href="about.html">About Us</a>
          </div>
        </div>
        <div class="footer-column">
          <h2>Contact Us</h2>
          <div class="contact-list">
            <a href="mailto:${EMAIL}">✉ ${EMAIL}</a>
            <a href="${INSTAGRAM_URL}" target="_blank" rel="noopener">
    <img
        src="assets/insta-logo.png"
        alt=""
        class="instagram-icon"
    >
    <span>Aniras_Hub</span>
</a>
          </div>
        </div>
      </div>
      <p class="copyright">© ${new Date().getFullYear()} Aniras Hub. All rights reserved.</p>
    </footer>`;
}

function setupFaqAccordion() {
  const items = [...document.querySelectorAll('.faq-item')];
  items.forEach(item => item.addEventListener('toggle', () => {
    if (!item.open) return;
    items.forEach(other => { if (other !== item) other.open = false; });
  }));
}

function setupReviewCarousel() {
  const viewport = document.getElementById('review-viewport');
  const track = document.getElementById('review-track');
  if (!viewport || !track) return;
  const cards = [...track.children];
  let index = 0;
  let startX = 0;
  let startY = 0;
  let dragging = false;
  const gap = () => parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap) || 0;
  const step = () => cards[0].getBoundingClientRect().width + gap();
  const maxIndex = () => Math.max(0, cards.length - (window.matchMedia('(max-width: 700px)').matches ? 1 : 2));
  function render() {
    if (index > maxIndex()) index = 0;
    track.style.transform = `translateX(${-index * step()}px)`;
    const prev = document.getElementById('review-prev');
    const next = document.getElementById('review-next');
    if (prev) prev.setAttribute('aria-label', index === 0 ? 'Wrap to last review' : 'Show previous review');
    if (next) next.setAttribute('aria-label', index === maxIndex() ? 'Wrap to first review' : 'Show next review');
  }
  function move(direction) {
    const max = maxIndex();
    if (max === 0) {
      // With two cards visible on desktop, briefly slide the pair and return it to
      // its original position rather than making either card disappear.
      track.style.transition = 'transform .22s ease';
      track.style.transform = `translateX(${-direction * Math.min(step() * 0.12, 42)}px)`;
      window.setTimeout(() => {
        track.style.transition = 'transform .28s ease';
        track.style.transform = 'translateX(0px)';
      }, 230);
      return;
    }
    index += direction;
    if (index > max) index = 0;
    if (index < 0) index = max;
    render();
  }
  document.getElementById('review-prev')?.addEventListener('click', () => move(-1));
  document.getElementById('review-next')?.addEventListener('click', () => move(1));
  viewport.addEventListener('touchstart', e => { startX = e.touches[0].clientX; startY = e.touches[0].clientY; dragging = true; }, {passive:true});
  viewport.addEventListener('touchend', e => {
    if (!dragging) return;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) move(dx < 0 ? 1 : -1);
    dragging = false;
  }, {passive:true});
  viewport.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') move(1);
    if (e.key === 'ArrowLeft') move(-1);
  });
  window.addEventListener('resize', render);
  render();
}

renderHeader();
renderFooter();
setupFaqAccordion();
setupReviewCarousel();
