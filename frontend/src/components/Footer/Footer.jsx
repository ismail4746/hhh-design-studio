import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "../../assets/logomm.png";
import OptimizedImg from "../common/OptimizedImg";

const EMAIL = "hhhdesignstudio@outlook.com";
const ADDRESS =
    "Building 80, Street 6, CCA Phase V, Defence Housing Authority, Lahore 54000";
const MAP_URL =
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("HHH Design Studio, Building 80, Street 6, CCA Phase V, DHA Lahore");

const EXPLORE_LINKS = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Projects", path: "/project" },
    { name: "Contact", path: "/contactDetails" },
];

const SERVICES = [
    "Architecture Design",
    "Interior Design",
    "Project Management",
    "Construction",
    "Renovation",
];

const PHONES = [
    { label: "+92 321 7500253", href: "tel:+923217500253" },
    { label: "+92 302 4599748", href: "tel:+923024599748" },
];

const SOCIALS = [
    {
        label: "Facebook",
        href: "https://www.facebook.com/share/1AygEBaNnx/",
        Icon: FaFacebookF,
    },
    {
        label: "Instagram",
        href: "https://www.instagram.com/hhhdesignstudio?igsi=a3cycThveGVhc2k%3D&utm_source=qr",
        Icon: FaInstagram,
    },
    {
        label: "TikTok",
        href: "https://www.tiktok.com/@hhh.design.studio?_t=ZS-8yz7zVfTR4S&_r=1",
        Icon: FaTiktok,
    },
    {
        label: "YouTube",
        href: "https://youtube.com/@hhhdesignstudio01?si=3_LGtAyGCgM-iIpc",
        Icon: FaYoutube,
    },
];

const serif = { fontFamily: "'Playfair Display', serif" };

function ColumnHeading({ children }) {
    return (
        <h3 className="mb-6 text-[11px] font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
            {children}
            <span
                aria-hidden="true"
                className="mt-3 block h-px w-10 bg-gradient-to-r from-[#D4AF37] to-transparent"
            />
        </h3>
    );
}

function FooterLink({ to, children }) {
    return (
        <li>
            <Link
                to={to}
                className="group inline-flex items-center text-sm text-gray-400 transition-colors duration-300 hover:text-white"
            >
                <span
                    aria-hidden="true"
                    className="mr-0 h-px w-0 bg-[#D4AF37] transition-all duration-300 group-hover:mr-2 group-hover:w-4"
                />
                {children}
            </Link>
        </li>
    );
}

export default function Footer() {
    const year = new Date().getFullYear();

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

    return (
        <footer className="relative overflow-hidden bg-[#08080A] text-white">
            {/* Gold hairline */}
            <div
                aria-hidden="true"
                className="h-px w-full bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"
            />

            {/* Ambient glow */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
                <div className="absolute -top-40 left-1/2 h-80 w-[38rem] -translate-x-1/2 rounded-full bg-[#D4AF37]/[0.07] blur-[120px]" />
                <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-[#0d2a45]/50 blur-[110px]" />
            </div>

            {/* Call to action */}
            <div className="relative border-b border-white/[0.06]">
                <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between md:py-16">
                    <div>
                        <p className="text-[11px] uppercase tracking-[0.3em] text-[#D4AF37]">
                            Ready when you are
                        </p>
                        <h2
                            className="mt-3 text-2xl leading-snug text-white md:text-[2rem]"
                            style={serif}
                        >
                            Have a space worth designing?
                        </h2>
                        <p className="mt-3 max-w-md text-sm leading-relaxed text-gray-400">
                            Tell us about your project and we will shape it into something
                            considered, functional, and built to last.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        <Link
                            to="/contactDetails"
                            className="rounded-full bg-gradient-to-r from-[#E7C766] to-[#C9A227] px-7 py-3 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_-10px_rgba(212,175,55,0.8)]"
                        >
                            Start a Conversation
                        </Link>
                        <Link
                            to="/project"
                            className="rounded-full border border-white/20 px-7 py-3 text-sm font-medium text-gray-200 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                        >
                            View Our Work
                        </Link>
                    </div>
                </div>
            </div>

            {/* Main columns */}
            <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-14 md:grid-cols-2 md:py-16 lg:grid-cols-12 lg:gap-8">
                {/* Brand */}
                <div className="lg:col-span-4">
                    <div className="flex items-center gap-3">
                        <OptimizedImg
                            src={logo}
                            alt="HHH Design Studio"
                            className="h-11 w-auto"
                            loading="lazy"
                            style={{ filter: "drop-shadow(0 0 8px rgba(212, 175, 55, 0.55))" }}
                        />
                        <div>
                            <span className="block text-lg font-bold tracking-wide" style={serif}>
                                HHH Design Studio
                            </span>
                            <span className="text-[10px] uppercase tracking-[0.28em] text-[#D4AF37]/80">
                                Architecture &amp; Interiors
                            </span>
                        </div>
                    </div>

                    <p className="mt-6 max-w-sm text-sm leading-relaxed text-gray-400">
                        Crafting architectural and interior designs that turn spaces into
                        experiences &mdash; premium, elegant, and timeless.
                    </p>

                    <div className="mt-8 flex gap-3">
                        {SOCIALS.map((social) => (
                            <a
                                key={social.label}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.label}
                                title={social.label}
                                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-gray-300 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:bg-[#D4AF37] hover:text-black hover:shadow-[0_10px_22px_-8px_rgba(212,175,55,0.7)]"
                            >
                                <social.Icon className="h-[18px] w-[18px]" />
                            </a>
                        ))}
                    </div>
                </div>

                {/* Explore */}
                <nav aria-label="Footer navigation" className="lg:col-span-2">
                    <ColumnHeading>Explore</ColumnHeading>
                    <ul className="space-y-3">
                        {EXPLORE_LINKS.map((link) => (
                            <FooterLink key={link.path} to={link.path}>
                                {link.name}
                            </FooterLink>
                        ))}
                    </ul>
                </nav>

                {/* Services */}
                <div className="lg:col-span-3">
                    <ColumnHeading>Services</ColumnHeading>
                    <ul className="space-y-3">
                        {SERVICES.map((service) => (
                            <FooterLink key={service} to="/services">
                                {service}
                            </FooterLink>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div className="lg:col-span-3">
                    <ColumnHeading>Get in Touch</ColumnHeading>
                    <address className="space-y-4 not-italic">
                        <a
                            href={MAP_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex gap-3 text-sm leading-relaxed text-gray-400 transition-colors duration-300 hover:text-white"
                        >
                            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#D4AF37]" />
                            <span>{ADDRESS}</span>
                        </a>

                        <a
                            href={`mailto:${EMAIL}`}
                            className="flex items-center gap-3 text-sm text-gray-400 transition-colors duration-300 hover:text-white"
                        >
                            <Mail className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                            <span className="break-all">{EMAIL}</span>
                        </a>

                        {PHONES.map((phone) => (
                            <a
                                key={phone.href}
                                href={phone.href}
                                className="flex items-center gap-3 text-sm text-gray-400 transition-colors duration-300 hover:text-white"
                            >
                                <Phone className="h-4 w-4 shrink-0 text-[#D4AF37]" />
                                <span>{phone.label}</span>
                            </a>
                        ))}
                    </address>
                </div>
            </div>

            {/* Bottom bar */}
            <div className="relative border-t border-white/[0.06]">
                <div className="mx-auto flex max-w-7xl flex-col-reverse items-center gap-4 px-6 py-6 text-center sm:flex-row sm:justify-between sm:text-left">
                    <p className="text-xs text-gray-500">
                        &copy; {year} HHH Design Studio. All rights reserved.
                    </p>

                    <div className="flex items-center gap-6">
                        <p className="hidden text-xs tracking-wide text-gray-500 sm:block">
                            Architecture &middot; Interiors &middot; Project Management
                        </p>
                        <button
                            type="button"
                            onClick={scrollToTop}
                            aria-label="Back to top"
                            title="Back to top"
                            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-gray-400 transition-all duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                        >
                            <ArrowUp className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}
