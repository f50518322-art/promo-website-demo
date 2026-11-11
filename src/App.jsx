import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Gift, Menu, ShoppingBag, Sparkles, X } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const products = [
  { id: 1, name: 'Kopi Pagi', category: 'MINUMAN', price: 'Contoh bundel', tone: 'coffee', mark: 'KOPI', detail: 'Contoh penawaran bundel minuman. Ganti informasi ini dengan ketentuan promo yang sudah disetujui sebelum publikasi.' },
  { id: 2, name: 'Camilan Ceria', category: 'SNACK', price: 'Contoh hemat', tone: 'snack', mark: 'CRUNCH', detail: 'Konsep kartu produk untuk kebutuhan kampanye retail. Harga dan mekanisme saat ini hanya contoh visual.' },
  { id: 3, name: 'Susu Harian', category: 'KEBUTUHAN HARIAN', price: 'Contoh bonus', tone: 'milk', mark: 'FRESH', detail: 'Visual kemasan adalah ilustrasi CSS, bukan produk atau penawaran nyata. Sesuaikan materi dengan aset resmi.' },
];

const steps = [
  { number: '01', title: 'Pilih produk pilihan', body: 'Jelajahi daftar produk dan penawaran contoh yang tersedia di halaman ini.', icon: ShoppingBag },
  { number: '02', title: 'Cek detail penawaran', body: 'Baca syarat, periode, dan informasi produk sebelum melanjutkan.', icon: Sparkles },
  { number: '03', title: 'Nikmati momen hemat', body: 'Tunjukkan materi kampanye resmi saat sudah tersedia dan terverifikasi.', icon: Gift },
];

function ProductVisual({ tone, mark }) {
  return (
    <div className={`product-visual ${tone}`} aria-hidden="true">
      <div className="product-shadow" />
      <div className="product-pack">
        <div className="pack-top" />
        <div className="pack-label"><span className="pack-brand">RUANG</span><strong>{mark}</strong><i>pilihan harian</i></div>
        <div className="pack-shine" />
      </div>
      <span className="visual-orbit orbit-one" /><span className="visual-orbit orbit-two" />
    </div>
  );
}

function App() {
  const [selected, setSelected] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const journeyRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.reveal', { y: 34, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: journeyRef.current, start: 'top 78%' },
      });
      gsap.fromTo(lineRef.current, { scaleX: 0 }, {
        scaleX: 1, ease: 'none', scrollTrigger: { trigger: journeyRef.current, start: 'top 70%', end: 'bottom 60%', scrub: 0.7 },
      });
    }, journeyRef);
    return () => ctx.revert();
  }, []);

  const onPointerMove = (event) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPointer({ x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5 });
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <main onMouseMove={onPointerMove}>
      <div className="demo-notice"><span className="notice-dot" /> Konsep demo — bukan promosi resmi, tidak berafiliasi dengan merek tertentu.</div>
      <header className="site-header">
        <a href="#home" className="wordmark" aria-label="Ruang Hemat, ke beranda"><span className="brand-symbol">R</span><span>ruang<span className="wordmark-light">hemat</span><small>RETAIL CAMPAIGN CONCEPT</small></span></a>
        <button className="mobile-menu" aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Navigasi utama">
          <a onClick={closeMenu} href="#cara">Cara kerja</a><a onClick={closeMenu} href="#pilihan">Pilihan promo</a><a onClick={closeMenu} href="#tentang">Tentang konsep</a>
          <a className="nav-cta" onClick={closeMenu} href="#pilihan">Jelajahi <ArrowUpRight size={15} /></a>
        </nav>
      </header>

      <section id="home" className="hero" ref={heroRef}>
        <div className="hero-grid" />
        <div className="hero-copy">
          <motion.div className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }}><span className="eyebrow-mark"><Sparkles size={13} /></span> PROGRAM PILIHAN · KONSEP KAMPANYE</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25, ease: [0.2, 0.7, 0.2, 1] }}>Belanja lebih,<br /><span>dapatkan lebih.</span></motion.h1>
          <motion.p className="hero-subtitle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>Pilihan harian, pengalaman yang lebih berarti.<br />Jelajahi konsep penawaran retail yang dirancang untukmu.</motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}><a href="#pilihan" className="button button-primary">Lihat promo <ArrowRight size={17} /></a><a href="#cara" className="button button-quiet">Pelajari caranya <ArrowDown size={16} /></a></motion.div>
          <motion.div className="hero-footnote" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}><span className="footnote-rule" /> Penawaran pada halaman ini merupakan konten contoh.</motion.div>
        </div>
        <div className="hero-art" aria-label="Ilustrasi produk konsep melayang">
          <div className="art-glow" />
          <div className="art-disc" style={{ transform: `translate3d(${pointer.x * -15}px, ${pointer.y * -12}px, 0) rotate(-13deg)` }} />
          <motion.div className="hero-product hero-product-main" style={{ x: pointer.x * 17, y: pointer.y * 13 }} animate={{ y: [0, -9, 0], rotate: [-4, -2, -4] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}><ProductVisual tone="coffee" mark="KOPI" /></motion.div>
          <motion.div className="hero-product hero-product-small" style={{ x: pointer.x * -24, y: pointer.y * -18 }} animate={{ y: [0, 10, 0], rotate: [7, 9, 7] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}><ProductVisual tone="snack" mark="CRUNCH" /></motion.div>
          <motion.div className="hero-product hero-product-mini" style={{ x: pointer.x * 12, y: pointer.y * 24 }} animate={{ y: [0, -7, 0], rotate: [2, 4, 2] }} transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}><ProductVisual tone="milk" mark="FRESH" /></motion.div>
          <div className="float-label label-top"><span>01 / PILIHAN</span><i /></div><div className="float-label label-bottom"><i /><span>DAILY ESSENTIALS</span></div>
          <div className="hero-stamp"><Sparkles size={17} /><span>Lebih dari<br />sekadar belanja</span></div>
        </div>
        <div className="hero-side-note">KONSEP KAMPANYE / 2025</div>
        <a className="scroll-cue" href="#cara"><span>GULIR UNTUK MENJELAJAH</span><ArrowDown size={15} /></a>
      </section>

      <section id="cara" className="journey section-pad" ref={journeyRef}>
        <div className="section-heading"><div><div className="eyebrow dark-eyebrow"><span className="eyebrow-mark"><span>01</span></span> SEDERHANA & JELAS</div><h2>Mulai dari hal<br /><em>yang sederhana.</em></h2></div><p>Pengalaman yang baik dimulai dengan informasi yang mudah dipahami. Ikuti langkah berikut untuk menjelajahi konsep ini.</p></div>
        <div className="journey-track"><div className="track-base" /><div className="track-progress" ref={lineRef} />{steps.map(({ number, title, body, icon: Icon }) => <article className="step-card reveal" key={number}><div className="step-top"><span className="step-number">{number}</span><span className="step-icon"><Icon size={20} strokeWidth={1.6} /></span></div><h3>{title}</h3><p>{body}</p><a href="#pilihan" className="step-link" aria-label={`Lihat pilihan promo, langkah ${number}`}><ArrowUpRight size={17} /></a></article>)}</div>
      </section>

      <section id="pilihan" className="products-section section-pad">
        <div className="section-heading products-heading"><div><div className="eyebrow dark-eyebrow"><span className="eyebrow-mark"><span>02</span></span> PILIHAN UNTUKMU</div><h2>Temukan favorit<br /><em>setiap harimu.</em></h2></div><div className="product-heading-aside"><p>Jelajahi contoh kategori pilihan dalam konsep kampanye ini.</p><div className="slider-controls"><button aria-label="Produk sebelumnya" onClick={() => document.querySelector('.product-grid')?.scrollBy({ left: -320, behavior: 'smooth' })}><ArrowLeft size={17} /></button><button aria-label="Produk berikutnya" onClick={() => document.querySelector('.product-grid')?.scrollBy({ left: 320, behavior: 'smooth' })}><ArrowRight size={17} /></button></div></div></div>
        <div className="product-grid">{products.map((product, index) => <motion.button className={`product-card card-${index + 1}`} key={product.id} onClick={() => setSelected(product)} whileHover={{ y: -7, rotateX: 2, rotateY: index === 1 ? -2 : 2 }} whileTap={{ scale: 0.98 }} aria-label={`Lihat detail ${product.name}`}><div className="product-card-top"><span>{product.category}</span><span className="card-arrow"><ArrowUpRight size={16} /></span></div><ProductVisual tone={product.tone} mark={product.mark} /><div className="product-card-info"><div><h3>{product.name}</h3><span>{product.price}</span></div><span className="product-plus">+</span></div></motion.button>)}</div>
        <div className="product-disclaimer"><span><Check size={14} /></span> Gambar, nama, dan penawaran produk ditampilkan sebagai ilustrasi konsep.</div>
      </section>

      <section id="tentang" className="closing-section"><div className="closing-orb orb-a" /><div className="closing-orb orb-b" /><div className="closing-content"><div className="eyebrow light-eyebrow"><span className="eyebrow-mark"><Sparkles size={13} /></span> RUANG HEMAT · KONSEP DEMO</div><h2>Lebih bermakna,<br /><span>setiap harinya.</span></h2><p>Ini adalah demo desain untuk eksplorasi visual. Materi promosi, identitas merek, harga, serta syarat dan ketentuan perlu diverifikasi sebelum digunakan.</p><a href="#home" className="button button-light">Kembali ke atas <ArrowUpRight size={17} /></a></div><div className="closing-mark">R<span>H</span></div></section>
      <footer className="site-footer"><a href="#home" className="footer-logo">RUANG HEMAT <span>®</span></a><span>DEMO DESAIN · BUKAN PENAWARAN AKTUAL</span><a href="#tentang">Tentang konsep <ArrowUpRight size={13} /></a><span>© 2025 KONSEP KAMPANYE</span></footer>

      <AnimatePresence>{selected && <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={(event) => { if (event.target === event.currentTarget) setSelected(null); }}><motion.div className="product-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title" initial={{ opacity: 0, y: 18, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.98 }} transition={{ duration: 0.25 }}><button className="modal-close" onClick={() => setSelected(null)} aria-label="Tutup detail"><X size={19} /></button><ProductVisual tone={selected.tone} mark={selected.mark} /><div className="modal-content"><div className="eyebrow dark-eyebrow"><span className="eyebrow-mark"><span>DETAIL</span></span> {selected.category}</div><h2 id="modal-title">{selected.name}</h2><p>{selected.detail}</p><span className="modal-disclaimer">Ilustrasi dan informasi contoh — bukan penawaran aktual.</span><button className="button button-primary" onClick={() => setSelected(null)}>Mengerti <Check size={16} /></button></div></motion.div></motion.div>}</AnimatePresence>
    </main>
  );
}

export default App;
