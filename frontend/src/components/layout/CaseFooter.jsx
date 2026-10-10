import {
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const brands = [
  {
    name: "SAEINDIA",
    logo: "/sae-logo.png",
    website: "https://saenitd.in",
    socials: [
      {
        name: "Instagram",
        icon: faInstagram,
        url: "https://www.instagram.com/sae.nitd/",
      },
      {
        name: "LinkedIn",
        icon: faLinkedin,
        url: "https://www.linkedin.com/company/sae-nitdgp/posts/?feedView=all",
      },
      {
        name: "Website",
        icon: faGlobe,
        url: "https://saenitd.in",
      },
    ],
  },
  {
    name: "AAROHAN",
    logo: "/aarohan.png",
    website: "https://www.arhn.in/",
    socials: [
      {
        name: "Instagram",
        icon: faInstagram,
        url: "https://www.instagram.com/arhn.nitd/",
      },
      {
        name: "LinkedIn",
        icon: faLinkedin,
        url: "https://www.linkedin.com/company/aarohan-nit-durgapur/",
      },
      {
        name: "Website",
        icon: faGlobe,
        url: "https://www.arhn.in/",
      },
    ],
  },
];

function CaseFooter() {
  return (
    <footer
      id="case-footer"
      className="relative m-0 w-full overflow-hidden bg-black px-5 pb-4 pt-6 text-white sm:px-8 sm:pb-5 sm:pt-7"
      style={{
        width: "100%",
        maxWidth: "none",
        margin: 0,
        border: "none",
        borderRadius: 0,
        backgroundColor: "#000000",
        boxSizing: "border-box",
      }}
    >
      {/* SAEINDIA and AAROHAN logos */}
      <div className="mx-auto flex w-full items-start justify-center gap-12 sm:gap-24 md:gap-32">
        {brands.map((brand) => (
          <section
            key={brand.name}
            className="flex min-w-0 flex-col items-center text-center"
          >
            <a
              href={brand.website}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${brand.name} website`}
              className="flex h-12 w-28 items-center justify-center transition-transform duration-300 hover:scale-105 sm:h-14 sm:w-36"
            >
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                loading="lazy"
                className="max-h-full max-w-full object-contain"
              />
            </a>

            <h3 className="mt-2 text-xs font-bold uppercase tracking-[0.2em] text-[#f3eee3] sm:text-sm">
              {brand.name}
            </h3>

            <div className="mt-4 flex items-center justify-center gap-4 sm:gap-5">
              {brand.socials.map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${brand.name} on ${social.name}`}
                  title={social.name}
                  className="text-[#99938e] transition-colors duration-200 hover:text-[#e04450] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c94a52]"
                >
                  <FontAwesomeIcon
                    icon={social.icon}
                    className="text-base sm:text-lg"
                  />
                </a>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Centered credit and copyright */}
      <div className="mt-6 flex w-full justify-center px-2 text-center sm:mt-7">
        <p className="text-[9px] font-medium uppercase tracking-[0.12em] text-[#e5ded6] sm:text-[11px] sm:tracking-[0.18em]">
          Made with <span className="mx-1 text-base">❤️</span> By SAE-Dev Team
          <span className="mx-2 text-[#e04450]">@</span>
          {new Date().getFullYear()}
          <span className="ml-2 text-[#e04450]">SAE</span>
          <span className="ml-2">© All rights reserved.</span>
        </p>
      </div>

      {/* Back to top */}
      <div className="mt-4 flex justify-center">
        <a
          href="#top"
          className="text-[9px] font-bold uppercase tracking-[0.16em] text-[#89817e] transition-colors duration-200 hover:text-[#e25a62] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c94a52]"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}

export default CaseFooter;