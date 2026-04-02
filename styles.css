:root{
  --azul-970:#041426;
  --azul-950:#061a30;
  --azul-930:#071d35;
  --azul-910:#08233f;
  --azul-900:#08233f;
  --azul-870:#0c2e52;
  --azul-850:#0b2b4c;
  --azul-800:#10365d;
  --azul-760:#1c568d;
  --azul-700:#1c4f82;
  --azul-600:#2f6ea8;
  --ouro:#d8b25a;
  --ouro-2:#f0cf7b;
  --ouro-soft:#e1c27a;
  --branco:#ffffff;
  --gelo:#f4f7fb;
  --gelo-2:#eef3f9;
  --cinza-100:#eef2f7;
  --cinza-200:#d9e1ea;
  --cinza-400:#94a3b3;
  --cinza-500:#6d7b8a;
  --cinza-700:#344556;
  --texto:#102131;
  --text-soft:#5f6f80;
  --line-soft:rgba(16,33,49,.08);
  --line-strong:rgba(16,33,49,.12);
  --card-bg:#ffffff;
  --card-bg-2:#f8fbff;
  --shadow-sm:0 10px 30px rgba(3,16,33,.08);
  --shadow:0 18px 50px rgba(3,16,33,.12);
  --shadow-lg:0 28px 70px rgba(3,16,33,.16);
  --radius:24px;
  --container:1280px;
  --topbar-h:44px;
  --header-h:88px;
  --ease:cubic-bezier(.22,.61,.36,1);
}

*{margin:0;padding:0;box-sizing:border-box;}
html{scroll-behavior:smooth;}
body{
  font-family:'Barlow',sans-serif;
  background:var(--gelo);
  color:var(--azul-930);
  line-height:1.5;
  overflow-x:hidden;
  text-rendering:optimizeLegibility;
  -webkit-font-smoothing:antialiased;
}
img{max-width:100%;display:block;}
a{text-decoration:none;color:inherit;}
button{font-family:inherit;border:none;background:none;cursor:pointer;}
input,select,textarea{font:inherit;outline:none;}

.container{
  width:min(100% - 36px, var(--container));
  margin:0 auto;
}

.reveal{
  opacity:0;
  transform:translateY(28px);
  transition:opacity .8s var(--ease), transform .8s var(--ease);
}
.reveal.show{
  opacity:1;
  transform:translateY(0);
}

/* TOPBAR */
.topbar{
  min-height:var(--topbar-h);
  background:linear-gradient(90deg,#4c4c4c 0%, #626262 20%, #505050 55%, #444 100%);
  color:#fff;
  display:flex;
  align-items:center;
  font-size:.89rem;
  position:relative;
  z-index:60;
  box-shadow:inset 0 -1px 0 rgba(255,255,255,.08);
}
.topbar .container{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:16px;
  flex-wrap:wrap;
  padding:8px 0;
}
.topbar-left,.topbar-right{
  display:flex;
  align-items:center;
  gap:26px;
  flex-wrap:wrap;
}
.topbar span{letter-spacing:.2px;}
.topbar strong{font-weight:800;}

/* HEADER */
.site-header{
  position:sticky;
  top:0;
  z-index:70;
  background:rgba(255,255,255,.94);
  backdrop-filter:blur(14px);
  border-bottom:1px solid rgba(16,33,49,.07);
  box-shadow:0 10px 34px rgba(7,23,44,.05);
  transition:background .3s ease, box-shadow .3s ease;
}
.site-header.scrolled{
  background:rgba(255,255,255,.98);
  box-shadow:0 16px 38px rgba(7,23,44,.08);
}
.header-inner{
  min-height:var(--header-h);
  display:grid;
  grid-template-columns:auto 1fr auto;
  align-items:center;
  gap:28px;
}
.brand{
  display:flex;
  align-items:center;
  gap:14px;
  min-width:0;
}
.brand-logo{
  width:68px;
  height:68px;
  border-radius:18px;
  background:#fff;
  padding:5px;
  box-shadow:0 16px 32px rgba(10,25,44,.10);
  object-fit:contain;
}
.brand-text h1{
  font-size:1.28rem;
  line-height:1;
  color:var(--azul-850);
  font-weight:800;
  letter-spacing:.3px;
}
.brand-text p{
  margin-top:5px;
  color:#748293;
  font-size:.95rem;
  font-weight:600;
}

.desktop-nav{
  justify-self:center;
  display:flex;
  align-items:center;
  gap:28px;
}
.desktop-nav a,
.nav-drop-btn{
  position:relative;
  font-size:1rem;
  font-weight:800;
  color:var(--azul-850);
  padding:10px 0;
  transition:color .25s ease;
  white-space:nowrap;
}
.desktop-nav a::after,
.nav-drop-btn::after{
  content:"";
  position:absolute;
  left:0;
  bottom:0;
  width:0;
  height:3px;
  border-radius:999px;
  background:linear-gradient(90deg,var(--ouro),var(--ouro-2));
  transition:width .28s var(--ease);
  box-shadow:0 3px 12px rgba(216,178,90,.20);
}
.desktop-nav a:hover,
.desktop-nav a.active,
.nav-dropdown:hover .nav-drop-btn{
  color:var(--azul-700);
}
.desktop-nav a:hover::after,
.desktop-nav a.active::after,
.nav-dropdown:hover .nav-drop-btn::after{
  width:100%;
}

.nav-dropdown{
  position:relative;
}
.nav-drop-btn{
  display:flex;
  align-items:center;
  gap:6px;
}
.nav-dropdown-menu{
  position:absolute;
  top:calc(100% + 14px);
  left:0;
  min-width:220px;
  background:#fff;
  border:1px solid rgba(16,33,49,.07);
  border-radius:20px;
  box-shadow:0 24px 50px rgba(3,16,33,.12);
  padding:12px;
  opacity:0;
  visibility:hidden;
  transform:translateY(10px);
  transition:.25s ease;
}
.nav-dropdown:hover .nav-dropdown-menu{
  opacity:1;
  visibility:visible;
  transform:translateY(0);
}
.nav-dropdown-menu a{
  display:block;
  padding:12px 14px;
  border-radius:12px;
  font-weight:700;
}
.nav-dropdown-menu a:hover{
  background:linear-gradient(180deg,#f6f9fd 0%, #eef4fb 100%);
}

.header-actions{
  display:flex;
  align-items:center;
  gap:12px;
}
.btn-orcamento,
.btn-primary{
  display:inline-flex;
  align-items:center;
  justify-content:center;
  min-height:50px;
  padding:0 24px;
  border-radius:999px;
  background:linear-gradient(135deg,var(--ouro) 0%, var(--ouro-soft) 100%);
  color:#162231;
  font-weight:800;
  box-shadow:
    0 16px 34px rgba(216,178,90,.22),
    inset 0 1px 0 rgba(255,255,255,.35);
  transition:transform .25s var(--ease), box-shadow .25s var(--ease);
}
.btn-orcamento:hover,
.btn-primary:hover{
  transform:translateY(-3px);
  box-shadow:
    0 22px 42px rgba(216,178,90,.28),
    inset 0 1px 0 rgba(255,255,255,.4);
}
.menu-toggle{
  width:48px;
  height:48px;
  border-radius:14px;
  background:var(--azul-850);
  color:#fff;
  font-size:1.3rem;
  display:none;
  box-shadow:var(--shadow-sm);
}

.mobile-menu{
  display:none;
  background:#fff;
  border-top:1px solid rgba(16,33,49,.08);
  padding:12px 16px 20px;
  box-shadow:0 18px 40px rgba(10,28,48,.08);
}
.mobile-menu.show{
  display:block;
  animation:fadeDown .35s ease;
}
.mobile-menu nav{
  display:flex;
  flex-direction:column;
  gap:10px;
}
.mobile-menu a,
.mobile-menu button{
  padding:15px 16px;
  border-radius:16px;
  background:var(--gelo);
  color:var(--azul-850);
  font-weight:700;
  border:1px solid rgba(16,33,49,.06);
  text-align:left;
}
.mobile-menu .btn-orcamento{
  width:100%;
  margin-top:8px;
  justify-content:center;
}

/* HERO */
.hero{
  position:relative;
  min-height:calc(100vh - var(--topbar-h) - var(--header-h));
  display:flex;
  align-items:stretch;
  overflow:hidden;
  background:linear-gradient(180deg,var(--azul-910) 0%, var(--azul-930) 100%);
  isolation:isolate;
}
.hero-slide{
  position:absolute;
  inset:0;
  opacity:0;
  pointer-events:none;
  transition:opacity .8s ease;
}
.hero-slide.active{
  opacity:1;
  pointer-events:auto;
}
.hero-slide img{
  width:100%;
  height:100%;
  object-fit:cover;
  animation:slowZoom 10s linear infinite alternate;
}
.hero-overlay{
  position:absolute;
  inset:0;
  background:
    linear-gradient(90deg, rgba(4,18,35,.92) 0%, rgba(4,18,35,.78) 30%, rgba(4,18,35,.46) 62%, rgba(4,18,35,.18) 100%),
    linear-gradient(180deg, rgba(8,25,45,.10) 0%, rgba(8,25,45,.18) 100%);
  z-index:1;
}
.hero-grid-lines{
  position:absolute;
  inset:0;
  z-index:1;
  opacity:.18;
  background-image:
    linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px);
  background-size:72px 72px;
  mask-image:linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,.75) 45%, transparent 100%);
}
.hero-content{
  position:relative;
  z-index:2;
  width:100%;
  display:flex;
  align-items:center;
  min-height:calc(100vh - var(--topbar-h) - var(--header-h));
  padding:82px 0 118px;
}
.hero-layout{
  display:grid;
  grid-template-columns:minmax(0, 690px) 1fr;
  gap:36px;
  align-items:center;
}
.hero-copy{color:#fff;}
.hero-kicker{
  display:inline-flex;
  align-items:center;
  gap:10px;
  margin-bottom:18px;
  padding:10px 16px;
  border:1px solid rgba(255,255,255,.14);
  background:rgba(255,255,255,.09);
  border-radius:999px;
  backdrop-filter:blur(8px);
  color:#edf5ff;
  font-size:1rem;
  font-weight:700;
  box-shadow:
    0 10px 24px rgba(0,0,0,.10),
    inset 0 1px 0 rgba(255,255,255,.06);
}
.hero-kicker::before{
  content:"";
  width:34px;
  height:4px;
  border-radius:999px;
  background:linear-gradient(90deg,var(--ouro),var(--ouro-2));
}
.hero h2{
  max-width:10ch;
  font-size:clamp(3rem, 6vw, 5.9rem);
  line-height:.92;
  font-weight:800;
  letter-spacing:-2.4px;
  margin-bottom:24px;
  text-shadow:0 10px 28px rgba(0,0,0,.18);
}
.hero p{
  max-width:670px;
  font-size:clamp(1.04rem, 1.4vw, 1.28rem);
  color:rgba(255,255,255,.88);
  margin-bottom:30px;
}
.hero-actions{
  display:flex;
  flex-wrap:wrap;
  gap:14px;
  margin-bottom:28px;
}
.btn-secondary{
  min-height:58px;
  padding:0 26px;
  border-radius:999px;
  display:inline-flex;
  align-items:center;
  justify-content:center;
  font-weight:800;
  font-size:1rem;
  color:#fff;
  background:rgba(255,255,255,.11);
  border:1px solid rgba(255,255,255,.20);
  backdrop-filter:blur(8px);
  box-shadow:inset 0 1px 0 rgba(255,255,255,.08);
  transition:transform .25s var(--ease), box-shadow .25s var(--ease), background .25s ease;
}
.btn-secondary:hover{
  transform:translateY(-2px);
  background:rgba(255,255,255,.16);
}
.btn-secondary-light{
  color:var(--azul-850);
  background:linear-gradient(180deg,#f7fbff 0%, #edf4fb 100%);
  border:1px solid rgba(16,33,49,.08);
}
.hero-highlights{
  display:grid;
  grid-template-columns:repeat(3, minmax(0, 1fr));
  gap:14px;
}
.hero-highlight{
  border-radius:22px;
  padding:18px 16px 16px;
  background:rgba(255,255,255,.08);
  border:1px solid rgba(255,255,255,.10);
  backdrop-filter:blur(10px);
  box-shadow:
    0 14px 24px rgba(0,0,0,.10),
    inset 0 1px 0 rgba(255,255,255,.05);
}
.hero-highlight strong{
  display:block;
  font-size:1.16rem;
  margin-bottom:4px;
  color:#fff;
}
.hero-highlight span{
  color:rgba(255,255,255,.82);
  font-size:.93rem;
  font-weight:600;
}
.hero-panel{
  justify-self:end;
  width:min(100%, 390px);
  border-radius:32px;
  padding:26px;
  background:linear-gradient(180deg, rgba(255,255,255,.16) 0%, rgba(255,255,255,.08) 100%);
  border:1px solid rgba(255,255,255,.14);
  box-shadow:
    0 26px 50px rgba(0,0,0,.18),
    inset 0 1px 0 rgba(255,255,255,.05);
  backdrop-filter:blur(14px);
  color:#fff;
}
.hero-panel small{
  display:block;
  color:rgba(255,255,255,.78);
  font-weight:700;
  letter-spacing:.4px;
  margin-bottom:8px;
  text-transform:uppercase;
}
.hero-panel h3{
  font-size:1.92rem;
  line-height:1;
  margin-bottom:14px;
  font-weight:800;
}
.hero-panel p{
  color:rgba(255,255,255,.84);
  font-size:1rem;
  margin-bottom:18px;
}
.hero-panel ul{
  list-style:none;
  display:grid;
  gap:10px;
}
.hero-panel li{
  padding:12px 14px;
  border-radius:18px;
  background:rgba(255,255,255,.08);
  border:1px solid rgba(255,255,255,.10);
  font-weight:700;
}
.hero-controls{
  position:absolute;
  left:0;
  bottom:36px;
  z-index:3;
  width:100%;
}
.hero-controls .container{
  display:flex;
  align-items:center;
  gap:12px;
}
.hero-dot{
  width:13px;
  height:13px;
  border-radius:50%;
  background:rgba(255,255,255,.34);
  box-shadow:0 0 0 1px rgba(255,255,255,.08) inset;
}
.hero-dot.active{
  width:42px;
  border-radius:999px;
  background:linear-gradient(90deg,var(--ouro),var(--ouro-2));
  box-shadow:0 8px 18px rgba(216,178,90,.30);
}

/* SECTION BASE */
section{padding:108px 0;}
.section-head{
  max-width:760px;
  margin-bottom:48px;
}
.section-kicker{
  display:inline-flex;
  align-items:center;
  gap:10px;
  margin-bottom:14px;
  color:var(--azul-700);
  font-size:.98rem;
  font-weight:800;
  letter-spacing:1px;
  text-transform:uppercase;
}
.section-kicker::before{
  content:"";
  width:40px;
  height:4px;
  border-radius:999px;
  background:linear-gradient(90deg,var(--ouro),var(--ouro-2));
}
.section-head h3{
  font-size:clamp(2.2rem, 4vw, 3.5rem);
  line-height:.96;
  color:var(--azul-850);
  margin-bottom:16px;
  font-weight:800;
  letter-spacing:-1.5px;
}
.section-head p{
  font-size:1.12rem;
  color:var(--text-soft);
  max-width:70ch;
}

.quem-somos,.projetos,.curiosidades,.diferenciais,.timeline-section{background:#fff;}
.servicos,.parceiros,.depoimentos-contato,.logo-strip,.cta-final{
  background:linear-gradient(180deg,#eef4fb 0%, #f8fbff 100%);
}

/* METRICS */
.metrics-band{
  position:relative;
  z-index:5;
  margin-top:-52px;
  padding:0 0 30px;
}
.metrics-grid{
  display:grid;
  grid-template-columns:repeat(4, minmax(0, 1fr));
  gap:18px;
}
.metric-card{
  background:linear-gradient(180deg,var(--card-bg) 0%, var(--card-bg-2) 100%);
  border:1px solid var(--line-soft);
  border-radius:28px;
  padding:28px 24px;
  box-shadow:
    0 18px 40px rgba(3,16,33,.08),
    0 2px 8px rgba(3,16,33,.03);
}
.metric-card strong{
  display:block;
  font-size:2.5rem;
  line-height:1;
  color:var(--azul-850);
  margin-bottom:10px;
  font-weight:800;
  letter-spacing:-1px;
}
.metric-card span{
  display:block;
  color:var(--text-soft);
  font-weight:600;
  line-height:1.55;
}

/* LOGO STRIP */
.logo-strip{
  padding:38px 0 54px;
}
.logo-strip-head{
  margin-bottom:18px;
}
.logo-strip-head span{
  display:inline-flex;
  align-items:center;
  gap:10px;
  color:var(--azul-700);
  font-weight:800;
  text-transform:uppercase;
  letter-spacing:.8px;
}
.logo-strip-track{
  overflow:hidden;
  position:relative;
}
.logo-strip-row{
  display:flex;
  gap:18px;
  width:max-content;
  animation:logoScroll 24s linear infinite;
}
.logo-chip{
  min-width:190px;
  height:96px;
  border-radius:24px;
  background:linear-gradient(180deg,#ffffff 0%, #f7fbff 100%);
  border:1px solid rgba(16,33,49,.08);
  box-shadow:var(--shadow-sm);
  display:flex;
  align-items:center;
  justify-content:center;
  padding:18px;
}
.logo-chip img{
  max-width:126px;
  max-height:58px;
  object-fit:contain;
  opacity:.92;
}

/* ABOUT */
.about-grid,.bottom-grid{
  display:grid;
  grid-template-columns:1.04fr .96fr;
  gap:36px;
}
.about-photo{
  min-height:540px;
  border-radius:36px;
  overflow:hidden;
  box-shadow:0 30px 64px rgba(3,16,33,.14);
}
.about-photo img{
  width:100%;
  height:100%;
  object-fit:cover;
}
.about-card,.panel{
  background:linear-gradient(180deg,var(--card-bg) 0%, var(--card-bg-2) 100%);
  border:1px solid var(--line-soft);
  border-radius:36px;
  padding:42px;
  box-shadow:
    0 18px 40px rgba(3,16,33,.08),
    0 2px 8px rgba(3,16,33,.03);
}
.about-card{
  position:relative;
  overflow:hidden;
}
.about-card::before{
  content:"";
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:6px;
  background:linear-gradient(90deg,var(--ouro), rgba(240,207,123,.22));
}
.about-card h3{
  font-size:clamp(2.2rem, 4vw, 3rem);
  line-height:.98;
  color:var(--azul-850);
  margin-bottom:18px;
  font-weight:800;
}
.about-card p{
  color:var(--text-soft);
  font-size:1.08rem;
  margin-bottom:14px;
}
.about-points{
  display:grid;
  grid-template-columns:repeat(2, minmax(0, 1fr));
  gap:14px;
  margin-top:18px;
}
.about-point{
  background:linear-gradient(180deg,var(--card-bg) 0%, var(--card-bg-2) 100%);
  border:1px solid var(--line-soft);
  border-radius:22px;
  padding:18px 16px;
}
.about-point strong{
  display:block;
  color:var(--azul-850);
  font-size:1.05rem;
  margin-bottom:5px;
}
.about-point span{
  display:block;
  color:var(--cinza-500);
  font-weight:600;
  font-size:.96rem;
}

/* COMMON CARD HOVER */
.service-card,.project-card,.partner-card,.fact-card,.diferencial-card,.timeline-card,.editorial-card{
  transition:transform .3s var(--ease), box-shadow .3s var(--ease);
}
.service-card:hover,.project-card:hover,.partner-card:hover,.fact-card:hover,.diferencial-card:hover,.timeline-card:hover,.editorial-card:hover{
  transform:translateY(-10px);
  box-shadow:
    0 28px 54px rgba(3,16,33,.12),
    0 8px 18px rgba(3,16,33,.06);
}

/* SERVICES / PROJECTS */
.services-grid,.projects-grid,.facts-grid{
  display:grid;
  grid-template-columns:repeat(3, minmax(0, 1fr));
  gap:24px;
}
.partners-grid{
  display:grid;
  grid-template-columns:repeat(2, minmax(0, 1fr));
  gap:24px;
}
.service-card,.project-card{
  background:linear-gradient(180deg,var(--card-bg) 0%, var(--card-bg-2) 100%);
  border-radius:32px;
  overflow:hidden;
  border:1px solid var(--line-soft);
  box-shadow:
    0 18px 40px rgba(3,16,33,.08),
    0 2px 8px rgba(3,16,33,.03);
}
.service-image,.project-image{
  height:268px;
  overflow:hidden;
}
.project-image{
  display:block;
  width:100%;
  padding:0;
  background:#dfe7f1;
}
.project-image img,.service-image img{
  width:100%;
  height:100%;
  object-fit:cover;
  transition:transform .55s var(--ease);
}
.project-card:hover .project-image img,
.service-card:hover .service-image img{
  transform:scale(1.06);
}
.service-body,.project-body{
  padding:26px;
}
.service-body h4,.project-body h4{
  font-size:1.34rem;
  color:var(--azul-850);
  font-weight:800;
  margin-bottom:10px;
  letter-spacing:-.4px;
}
.service-body p,.project-body p{
  color:var(--cinza-700);
  margin-bottom:16px;
  font-size:1rem;
}
.service-link{
  color:var(--azul-700);
  font-weight:800;
  font-size:.98rem;
}

/* DIFERENCIAIS */
.diferenciais-grid{
  display:grid;
  grid-template-columns:repeat(4, minmax(0, 1fr));
  gap:22px;
}
.diferencial-card{
  background:linear-gradient(180deg,var(--card-bg) 0%, var(--card-bg-2) 100%);
  border:1px solid var(--line-soft);
  border-radius:30px;
  padding:30px 24px;
  box-shadow:
    0 18px 40px rgba(3,16,33,.08),
    0 2px 8px rgba(3,16,33,.03);
}
.diferencial-icon{
  width:56px;
  height:56px;
  border-radius:18px;
  display:grid;
  place-items:center;
  margin-bottom:18px;
  background:linear-gradient(135deg,var(--ouro),var(--ouro-2));
  color:#162231;
  font-size:1.2rem;
  font-weight:800;
  box-shadow:0 10px 20px rgba(216,178,90,.18);
}
.diferencial-card h4{
  font-size:1.25rem;
  color:var(--azul-850);
  margin-bottom:10px;
  font-weight:800;
  letter-spacing:-.4px;
}
.diferencial-card p{
  color:var(--cinza-700);
  font-size:1rem;
}

/* TIMELINE */
.timeline-grid{
  display:grid;
  grid-template-columns:repeat(4, minmax(0, 1fr));
  gap:22px;
}
.timeline-card{
  position:relative;
  background:linear-gradient(180deg,var(--card-bg) 0%, var(--card-bg-2) 100%);
  border:1px solid var(--line-soft);
  border-radius:30px;
  padding:28px 24px;
  box-shadow:
    0 18px 40px rgba(3,16,33,.08),
    0 2px 8px rgba(3,16,33,.03);
}
.timeline-card::before{
  content:"";
  position:absolute;
  top:0;
  left:0;
  width:100%;
  height:6px;
  border-radius:30px 30px 0 0;
  background:linear-gradient(90deg,var(--ouro),var(--ouro-2));
}
.timeline-year{
  display:inline-flex;
  padding:8px 12px;
  border-radius:999px;
  background:linear-gradient(180deg,#f7fbff 0%, #edf4fb 100%);
  border:1px solid rgba(16,33,49,.06);
  color:var(--azul-700);
  font-weight:800;
  font-size:.9rem;
  margin-bottom:14px;
}
.timeline-card h4{
  color:var(--azul-850);
  font-size:1.22rem;
  margin-bottom:10px;
  font-weight:800;
  letter-spacing:-.4px;
}
.timeline-card p{
  color:var(--cinza-700);
}

/* PARCEIROS */
.partner-card{
  min-height:205px;
  border-radius:30px;
  background:linear-gradient(180deg,var(--card-bg) 0%, var(--card-bg-2) 100%);
  border:1px solid var(--line-soft);
  box-shadow:
    0 18px 40px rgba(3,16,33,.08),
    0 2px 8px rgba(3,16,33,.03);
  display:flex;
  align-items:center;
  justify-content:center;
  padding:26px;
}
.partner-card img{
  max-height:104px;
  width:auto;
  object-fit:contain;
}

/* CURIOSIDADES */
.curiosidades-layout{
  display:grid;
  grid-template-columns:1.05fr .95fr;
  gap:34px;
  align-items:stretch;
}
.curiosidades-copy{
  background:linear-gradient(180deg,#0f355d 0%, #09233f 100%);
  color:#fff;
  border-radius:38px;
  padding:42px;
  box-shadow:0 28px 70px rgba(3,16,33,.18);
}
.curiosidades-copy .section-kicker{
  color:#dbeaff;
}
.curiosidades-copy h3{
  font-size:clamp(2.1rem, 4vw, 3.2rem);
  line-height:.98;
  margin-bottom:18px;
  font-weight:800;
  letter-spacing:-1px;
}
.curiosidades-copy p{
  color:rgba(255,255,255,.86);
  font-size:1.06rem;
  margin-bottom:14px;
}
.curiosidades-tags{
  display:flex;
  flex-wrap:wrap;
  gap:10px;
  margin-top:20px;
}
.curiosidades-tags span{
  padding:10px 14px;
  border-radius:999px;
  background:rgba(255,255,255,.10);
  border:1px solid rgba(255,255,255,.12);
  color:#fff;
  font-weight:700;
  font-size:.94rem;
}
.curiosidades-editorial{
  display:grid;
  gap:18px;
}
.editorial-card{
  background:linear-gradient(180deg,var(--card-bg) 0%, var(--card-bg-2) 100%);
  border:1px solid var(--line-soft);
  border-radius:30px;
  padding:30px 24px;
  box-shadow:
    0 18px 40px rgba(3,16,33,.08),
    0 2px 8px rgba(3,16,33,.03);
}
.editorial-card small{
  display:inline-block;
  margin-bottom:12px;
  color:var(--azul-700);
  font-size:.92rem;
  font-weight:800;
  letter-spacing:1px;
}
.editorial-card h4{
  font-size:1.3rem;
  color:var(--azul-850);
  margin-bottom:10px;
  font-weight:800;
  letter-spacing:-.4px;
}
.editorial-card p{
  color:var(--cinza-700);
}

/* DEPOIMENTOS / CONTATO */
.panel h4{
  color:var(--azul-850);
  font-size:1.82rem;
  font-weight:800;
  margin-bottom:18px;
}
.testimonial{
  padding:20px 0;
  border-top:1px solid rgba(16,33,49,.08);
}
.testimonial:first-of-type{
  border-top:none;
  padding-top:0;
}
.testimonial strong{
  display:block;
  font-size:1.05rem;
  color:var(--azul-850);
  margin-bottom:6px;
}
.testimonial p{
  color:var(--cinza-700);
}
.contact-list{
  display:grid;
  gap:14px;
  margin-bottom:24px;
}
.contact-item{
  padding:16px 18px;
  border-radius:20px;
  background:linear-gradient(180deg,#f7fbff 0%, #eef4fb 100%);
  border:1px solid rgba(16,33,49,.06);
}
.contact-item strong{
  display:block;
  color:var(--azul-850);
  margin-bottom:4px;
}
.contact-item span{
  color:var(--cinza-700);
  font-weight:600;
}
.contact-actions{
  display:flex;
  flex-wrap:wrap;
  gap:12px;
}

/* CTA FINAL */
.cta-final{
  padding-top:26px;
}
.cta-final-box{
  border-radius:38px;
  padding:42px;
  background:linear-gradient(135deg, rgba(7,29,53,.98) 0%, rgba(13,49,86,.96) 100%);
  color:#fff;
  box-shadow:0 30px 70px rgba(3,16,33,.18);
  display:grid;
  grid-template-columns:1fr auto;
  gap:24px;
  align-items:center;
}
.cta-final-copy small{
  display:block;
  color:#dbeaff;
  font-weight:800;
  text-transform:uppercase;
  letter-spacing:.9px;
  margin-bottom:10px;
}
.cta-final-copy h3{
  font-size:clamp(2rem, 4vw, 3.2rem);
  line-height:1;
  margin-bottom:14px;
  font-weight:800;
  letter-spacing:-1.3px;
}
.cta-final-copy p{
  color:rgba(255,255,255,.86);
  max-width:700px;
}
.cta-final-actions{
  display:flex;
  flex-wrap:wrap;
  gap:12px;
}

/* FOOTER */
footer{
  background:#081b31;
  color:#fff;
  padding-top:0;
}
.footer-map{
  width:100%;
  height:340px;
  border-bottom:1px solid rgba(255,255,255,.08);
}
.footer-map iframe{
  width:100%;
  height:100%;
  border:0;
  filter:grayscale(.08) contrast(1.04) saturate(.95);
}
.footer-inner{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:20px;
  flex-wrap:wrap;
  padding:30px 0;
}
.footer-brand{
  display:flex;
  align-items:center;
  gap:14px;
}
.footer-brand img{
  width:60px;
  height:60px;
  object-fit:contain;
  border-radius:16px;
  background:rgba(255,255,255,.08);
  padding:4px;
}
.footer-brand strong{
  display:block;
  font-size:1.1rem;
  color:#fff;
  margin-bottom:4px;
}
.footer-brand p{
  color:rgba(255,255,255,.78);
  font-size:.95rem;
  font-weight:600;
}
.footer-center{
  flex:1;
  display:flex;
  justify-content:center;
}
.footer-center p{
  color:rgba(255,255,255,.78);
  font-weight:600;
}
.footer-social{
  display:flex;
  align-items:center;
  gap:12px;
}
.footer-social a{
  width:48px;
  height:48px;
  border-radius:50%;
  display:grid;
  place-items:center;
  background:rgba(255,255,255,.08);
  transition:transform .25s var(--ease), background .25s ease;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.06);
}
.footer-social a:hover{
  transform:translateY(-3px);
  background:rgba(255,255,255,.16);
}
.footer-social svg{
  width:21px;
  height:21px;
  fill:#fff;
}

/* FLOAT */
.whatsapp-float{
  position:fixed;
  right:18px;
  bottom:18px;
  width:62px;
  height:62px;
  border-radius:50%;
  background:linear-gradient(135deg,#19d466,#11b957);
  color:#fff;
  display:grid;
  place-items:center;
  box-shadow:
    0 18px 34px rgba(17,185,87,.30),
    inset 0 1px 0 rgba(255,255,255,.20);
  z-index:90;
}
.whatsapp-float svg{
  width:26px;
  height:26px;
  fill:#fff;
}

/* LIGHTBOX */
.lightbox{
  position:fixed;
  inset:0;
  z-index:120;
  display:flex;
  align-items:center;
  justify-content:center;
  opacity:0;
  visibility:hidden;
  transition:.28s ease;
}
.lightbox.show{
  opacity:1;
  visibility:visible;
}
.lightbox-backdrop{
  position:absolute;
  inset:0;
  background:rgba(3,12,24,.82);
  backdrop-filter:blur(8px);
}
.lightbox-content{
  position:relative;
  z-index:2;
  width:min(92vw, 980px);
  border-radius:30px;
  overflow:hidden;
  background:#0b1d33;
  box-shadow:0 28px 80px rgba(0,0,0,.45);
  transform:translateY(20px) scale(.97);
  transition:.28s ease;
}
.lightbox.show .lightbox-content{
  transform:translateY(0) scale(1);
}
.lightbox-content img{
  width:100%;
  max-height:78vh;
  object-fit:contain;
  background:#081a2d;
}
.lightbox-caption{
  padding:16px 20px;
  color:#fff;
  font-weight:700;
  background:#0d2743;
}
.lightbox-close{
  position:absolute;
  top:14px;
  right:14px;
  width:44px;
  height:44px;
  border-radius:50%;
  background:rgba(255,255,255,.12);
  color:#fff;
  font-size:1.8rem;
  z-index:3;
}

/* CONTACT MODAL */
.contact-modal{
  position:fixed;
  inset:0;
  z-index:130;
  display:flex;
  align-items:center;
  justify-content:center;
  opacity:0;
  visibility:hidden;
  transition:.28s ease;
}
.contact-modal.show{
  opacity:1;
  visibility:visible;
}
.contact-modal-backdrop{
  position:absolute;
  inset:0;
  background:rgba(4,15,28,.78);
  backdrop-filter:blur(8px);
}
.contact-modal-box{
  position:relative;
  z-index:2;
  width:min(92vw, 720px);
  background:#fff;
  border-radius:30px;
  padding:38px;
  box-shadow:0 30px 80px rgba(0,0,0,.32);
  transform:translateY(20px) scale(.97);
  transition:.28s ease;
}
.contact-modal.show .contact-modal-box{
  transform:translateY(0) scale(1);
}
.contact-modal-close{
  position:absolute;
  top:14px;
  right:14px;
  width:42px;
  height:42px;
  border-radius:50%;
  background:#edf3fb;
  color:var(--azul-850);
  font-size:1.8rem;
}
.contact-modal-kicker{
  display:block;
  margin-bottom:10px;
  color:var(--azul-700);
  font-weight:800;
  text-transform:uppercase;
  letter-spacing:.8px;
}
.contact-modal-box h3{
  font-size:2rem;
  color:var(--azul-850);
  margin-bottom:10px;
  line-height:1;
}
.contact-modal-box p{
  color:var(--cinza-700);
  margin-bottom:24px;
}
.contact-form{
  display:grid;
  gap:16px;
}
.form-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:16px;
}
.form-field{
  display:grid;
  gap:8px;
}
.form-field label{
  font-weight:700;
  color:var(--azul-850);
}
.form-field input,
.form-field select,
.form-field textarea{
  width:100%;
  border:1px solid rgba(16,33,49,.10);
  border-radius:16px;
  padding:14px 16px;
  background:linear-gradient(180deg,#f8fbff 0%, #f1f6fb 100%);
  color:var(--texto);
}
.form-field input:focus,
.form-field select:focus,
.form-field textarea:focus{
  border-color:var(--azul-600);
  background:#fff;
  box-shadow:0 0 0 4px rgba(47,110,168,.08);
}
.contact-submit{
  width:100%;
}

/* ANIMAÇÕES */
@keyframes slowZoom{
  from{transform:scale(1.02);}
  to{transform:scale(1.08);}
}
@keyframes fadeDown{
  from{opacity:0;transform:translateY(-8px);}
  to{opacity:1;transform:translateY(0);}
}
@keyframes logoScroll{
  from{transform:translateX(0);}
  to{transform:translateX(-35%);}
}

body.modal-open{
  overflow:hidden;
}

/* RESPONSIVO */
@media (max-width:1180px){
  .desktop-nav{display:none;}
  .menu-toggle{
    display:inline-flex;
    align-items:center;
    justify-content:center;
  }

  .hero-layout,
  .about-grid,
  .bottom-grid,
  .curiosidades-layout,
  .cta-final-box{
    grid-template-columns:1fr;
  }

  .hero-panel{
    justify-self:start;
    width:min(100%, 420px);
  }

  .services-grid,
  .projects-grid,
  .facts-grid,
  .metrics-grid,
  .diferenciais-grid,
  .timeline-grid{
    grid-template-columns:repeat(2, minmax(0, 1fr));
  }

  .metric-card strong{
    font-size:2.25rem;
  }

  .footer-inner{
    flex-direction:column;
    align-items:flex-start;
  }
  .footer-center{
    justify-content:flex-start;
  }
}

@media (max-width:760px){
  :root{
    --topbar-h:auto;
    --header-h:80px;
  }

  section{
    padding:84px 0;
  }

  .topbar .container{
    justify-content:center;
    text-align:center;
    gap:10px;
  }
  .topbar-left,.topbar-right{
    justify-content:center;
    gap:14px;
  }

  .brand-logo{
    width:54px;
    height:54px;
  }

  .btn-orcamento.desktop-only{display:none;}

  .hero{
    min-height:auto;
  }
  .hero-content{
    min-height:auto;
    padding:58px 0 105px;
  }
  .hero h2{
    font-size:clamp(2.35rem, 12vw, 4rem);
    max-width:100%;
    letter-spacing:-1.6px;
  }

  .hero-highlights,
  .services-grid,
  .projects-grid,
  .facts-grid,
  .partners-grid,
  .about-points,
  .form-grid,
  .metrics-grid,
  .diferenciais-grid,
  .timeline-grid{
    grid-template-columns:1fr;
  }

  .metrics-band{
    margin-top:-24px;
  }

  .metric-card strong{
    font-size:2rem;
  }

  .about-photo{
    min-height:350px;
  }

  .service-image,
  .project-image{
    height:236px;
  }

  .about-card,
  .panel,
  .contact-modal-box,
  .curiosidades-copy,
  .editorial-card,
  .cta-final-box{
    padding:24px;
  }

  .footer-map{
    height:250px;
  }
}
