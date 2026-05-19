import { useEffect, useState } from "react";
import "./App.css";

const PHONE = "+393762300107";
const PHONE_DISPLAY = "+39 376 230 0107";
const MENU_PDF_URL = "https://davinci-lounge.com/menu/";

const STEPS = [
	{
		n: "01",
		title: "Scegli dal menu",
		text: "Sfoglia le nostre creazioni gourmet e scegli la pizza che fa per te. Ogni piatto racconta una storia di ingredienti selezionati.",
		icon: (
			<svg
				width="20"
				height="20"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
			</svg>
		),
	},
	{
		n: "02",
		title: "Chiama e ordina",
		text: "Contattaci al numero dedicato. Il nostro team sarà pronto a prendere il tuo ordine e a indicarti i tempi di preparazione.",
		icon: (
			<svg
				width="20"
				height="20"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				<path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
			</svg>
		),
	},
	{
		n: "03",
		title: "Ritira e gusta",
		text: "Passa al Da Vinci Lounge, ritira il tuo ordine appena sfornato e portalo dove vuoi. Arte gourmet, comodità assoluta.",
		icon: (
			<svg
				width="20"
				height="20"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.5"
				viewBox="0 0 24 24"
				aria-hidden="true"
			>
				<path d="M5 3h14a2 2 0 012 2v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm0 0v18m14-18v18M5 21h14" />
			</svg>
		),
	},
];

const PIZZE = [
	{
		tag: "Signature",
		name: "Pizza Da Vinci",
		desc: "Vellutata di zucchine, fiordilatte di Napoli, cipolla caramellata, tartare di tonno, burrata, zest di lime, basilico, olio evo.",
		price: "€ 21,90",
	},
	{
		tag: "Gourmet",
		name: "Piemontese",
		desc: "Battuta di Fassona, stracciatella di bufala campana DOP, pesto di basilico e tartufo.",
		price: "€ 16,90",
	},
	{
		tag: "Gourmet",
		name: "Malafemmina",
		desc: "Fiordilatte di Napoli, crudo di Parma 24 mesi, stracciatella di bufala DOP, fichi caramellati, granella di nocciole, glassa di balsamico.",
		price: "€ 16,90",
	},
	{
		tag: "Classica",
		name: "Bufalina",
		desc: "Pomodoro San Marzano DOP, bufala campana DOP, olio evo, basilico fresco. La semplicità elevata a perfezione.",
		price: "€ 11,00",
	},
	{
		tag: "Frittura",
		name: "Montanarine del Piemonte",
		desc: "Stracciatella di bufala campana DOP, tartare di Fassona piemontese, capperi, pesto di basilico.",
		price: "€ 8,00",
	},
	{
		tag: "Dolce",
		name: "Irresistibile Nutella",
		desc: "Gnocco fritto con Nutella, granella di nocciole e zucchero a velo. Il finale perfetto per ogni ordine.",
		price: "€ 6,50",
	},
];

const REVIEWS = [
	{
		text: "\"La pizza è davvero spettacolare, così come il servizio e l'ambiente. Altamente raccomandato! Tornerò sicuramente.\"",
		author: "Alice De Silvestri",
	},
	{
		text: '"Pizza gourmet molto buona. Locale nuovo, molto accogliente. Arredamento e stile di alto livello."',
		author: "Ihor Berezovyi",
	},
	{
		text: '"Ingredienti freschi e impasto davvero buono. Difficile trovare difetti. Lo consigliamo e ritorneremo sicuramente."',
		author: "Laura LG",
	},
];

const MenuIcon = () => (
	<svg
		width="16"
		height="16"
		fill="none"
		stroke="currentColor"
		strokeWidth="1.5"
		viewBox="0 0 24 24"
		aria-hidden="true"
	>
		<path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
	</svg>
);

const DownloadIcon = ({ size = 18 }: { size?: number }) => (
	<svg
		width={size}
		height={size}
		fill="none"
		stroke="currentColor"
		strokeWidth="1.5"
		viewBox="0 0 24 24"
		aria-hidden="true"
	>
		<path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
	</svg>
);

function App() {
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 60);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	useEffect(() => {
		const els = document.querySelectorAll<HTMLElement>(".reveal");
		const io = new IntersectionObserver(
			(entries) => {
				entries.forEach((e) => {
					if (e.isIntersecting) {
						e.target.classList.add("visible");
						io.unobserve(e.target);
					}
				});
			},
			{ threshold: 0.12 },
		);
		els.forEach((el) => io.observe(el));
		return () => io.disconnect();
	}, []);

	return (
		<>
			<nav className={scrolled ? "scrolled" : undefined}>
				<a href="#" className="nav-logo">
					Da Vinci Pizza Gourmet
				</a>
				<a href={`tel:${PHONE}`} className="nav-cta">
					Ordina ora
				</a>
			</nav>

			<section className="hero">
				<img
					src="https://davinci-lounge.com/wp-content/uploads/2025/10/davinci_pizza.png"
					alt="Da Vinci Pizza Gourmet"
					className="hero-logo"
					onError={(e) => {
						(e.currentTarget as HTMLImageElement).style.display = "none";
					}}
				/>
				<div className="hero-badge">
					Pizza Gourmet · Riccione · Asporto
				</div>
				<h1>
					La pizza d'arte
					<br />
					<em>direttamente a casa tua</em>
				</h1>
				<p className="hero-sub">
					Ingredienti di eccellenza. Impasto artigianale. Zero compromessi.
				</p>
				<div className="cta-group">
					<a href={`tel:${PHONE}`} className="btn-primary">
						📞 &nbsp;Chiama e ordina
					</a>
					<a href="#menu" className="btn-outline">
						<MenuIcon />
						Scopri il menu
					</a>
				</div>
				<div className="scroll-hint">
					<div className="scroll-line" />
					<span>Scorri</span>
				</div>
			</section>

			<div className="phone-strip">
				<span>Ordina telefonicamente</span>
				<a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>
				<span>·</span>
				<span>Riccione (RN)</span>
			</div>

			<section className="steps-section">
				<div className="container">
					<span className="section-label reveal">Come funziona</span>
					<h2 className="section-title reveal">
						Tre passi verso
						<br />
						<em>la perfezione</em>
					</h2>
					<div className="divider reveal" />
					<div className="steps-grid">
						{STEPS.map((s) => (
							<div className="step reveal" key={s.n}>
								<div className="step-number">{s.n}</div>
								<div className="step-icon">{s.icon}</div>
								<h3>{s.title}</h3>
								<p>{s.text}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="menu-section" id="menu">
				<div className="container">
					<span className="section-label reveal">I nostri best seller</span>
					<h2 className="section-title reveal">
						Pizze che sono
						<br />
						<em>opere d'arte</em>
					</h2>
					<div className="divider reveal" />
					<div className="pizze-grid">
						{PIZZE.map((p) => (
							<div className="pizza-card reveal" key={p.name}>
								<span className="pizza-tag">{p.tag}</span>
								<h3 className="pizza-name">{p.name}</h3>
								<p className="pizza-desc">{p.desc}</p>
								<div className="pizza-price">{p.price}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="pdf-section">
				<div className="container">
					<div className="pdf-inner">
						<div className="pdf-text">
							<span className="section-label reveal">Menu completo</span>
							<h2 className="section-title reveal">
								Scarica il menu
								<br />
								<em>in formato PDF</em>
							</h2>
							<div className="divider reveal" />
							<p className="reveal">
								Vuoi sfogliare l'intera carta prima di ordinare? Scarica il
								menu completo in PDF e prenditi tutto il tempo per scegliere.
								Pizze gourmet, fritti, hamburger, dessert e molto altro.
							</p>
							<a
								href={MENU_PDF_URL}
								target="_blank"
								rel="noopener noreferrer"
								className="btn-dark reveal"
							>
								<DownloadIcon />
								Scarica il menu PDF
							</a>
						</div>
						<div className="pdf-visual">
							<div className="pdf-mock">
								<div className="pdf-icon">
									<DownloadIcon size={20} />
								</div>
								<div className="pdf-mock-top" />
								<div className="pdf-logo-mock">Da Vinci · Menu</div>
								<div className="pdf-line" />
								<div className="pdf-line short" />
								<div className="pdf-line med" />
								<div className="pdf-line short" />
								<div className="pdf-line" />
								<div className="pdf-line med" />
								<div className="pdf-line short" />
								<div className="pdf-line" />
								<div className="pdf-line short" />
								<div className="pdf-line med" />
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="reviews-section">
				<div className="container">
					<span className="section-label reveal">Cosa dicono di noi</span>
					<h2 className="section-title reveal">
						Le voci dei
						<br />
						<em>nostri ospiti</em>
					</h2>
					<div className="divider reveal" />
					<div className="reviews-grid">
						{REVIEWS.map((r) => (
							<div className="review-card reveal" key={r.author}>
								<div className="review-stars">★★★★★</div>
								<p className="review-text">{r.text}</p>
								<div className="review-author">{r.author}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			<section className="final-cta">
				<div className="container">
					<span className="section-label reveal">Pronto a ordinare?</span>
					<h2 className="section-title reveal">
						Vivi la vita
						<br />
						<em>1/4 di pizza alla volta</em>
					</h2>
					<p className="reveal">
						Chiama adesso e ritira la tua pizza gourmet. Ti aspettiamo a
						Riccione.
					</p>
					<div className="cta-group reveal">
						<a href={`tel:${PHONE}`} className="btn-primary">
							📞 &nbsp;{PHONE_DISPLAY}
						</a>
						<a
							href={MENU_PDF_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="btn-outline"
						>
							<DownloadIcon />
							Menu PDF
						</a>
					</div>
				</div>
			</section>

			<footer>
				<div className="footer-logo">Da Vinci Pizza Gourmet</div>
				<p className="footer-line">
					Riccione (RN) · <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>
				</p>
				<p className="footer-line">
					<a
						href="https://davinci-lounge.com"
						target="_blank"
						rel="noopener noreferrer"
					>
						davinci-lounge.com
					</a>
				</p>
			</footer>
		</>
	);
}

export default App;
