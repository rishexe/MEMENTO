import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Home.css";

type District = {
  id: string;
  name: string;
  label: string;
  tagline: string;
  description: string;
  image: string;
  accent: string;
  tint: string;
};

type ParticleStyle = CSSProperties & {
  "--duration": string;
  "--delay": string;
};

const heroImage = "/images/hero.jpg";

const districts: District[] = [
  {
    id: "gangtok",
    name: "Gangtok",
    label: "Capital District",
    tagline: "Where clouds hold court with stone",
    description:
      "Ancient monasteries rise above the city while mist carries prayer flags across the ridges.",
    image:
      "https://images.unsplash.com/photo-1566241619114-948b5a7df53c?w=1800&h=1100&fit=crop&auto=format",
    accent: "#7aa4bd",
    tint: "rgba(24, 44, 72, 0.52)",
  },
  {
    id: "namchi",
    name: "Namchi",
    label: "South Sikkim",
    tagline: "Valley of golden temples",
    description:
      "Warm light moves over terraced hills, temple roofs, and quiet roads that climb into ceremony.",
    image:
      "https://images.unsplash.com/photo-1756201409420-00f93939f9d1?w=1800&h=1100&fit=crop&auto=format",
    accent: "#c58a52",
    tint: "rgba(62, 40, 20, 0.5)",
  },
  {
    id: "mangan",
    name: "Mangan",
    label: "North Sikkim",
    tagline: "At the edge of the sky",
    description:
      "High peaks, old forests, and glacial routes make this the wilder threshold of Sikkim.",
    image:
      "https://images.unsplash.com/photo-1766405531825-7084adb47d71?w=1800&h=1100&fit=crop&auto=format",
    accent: "#79aabd",
    tint: "rgba(20, 32, 50, 0.58)",
  },
  {
    id: "gyalshing",
    name: "Gyalshing",
    label: "West Sikkim",
    tagline: "Heritage carved in stone",
    description:
      "Monastery walls, old settlements, and red earth hold centuries of painted devotion.",
    image:
      "https://images.unsplash.com/photo-1769742345875-b8ad89be9f86?w=1800&h=1100&fit=crop&auto=format",
    accent: "#b99362",
    tint: "rgba(40, 28, 16, 0.58)",
  },
  {
    id: "pakyong",
    name: "Pakyong",
    label: "East Sikkim",
    tagline: "Where tea terraces breathe",
    description:
      "Rolling green slopes, light air, and hillside routes connect quiet villages to open views.",
    image:
      "https://images.unsplash.com/photo-1785767021015-d8eac9f076cc?w=1800&h=1100&fit=crop&auto=format",
    accent: "#77a66f",
    tint: "rgba(20, 42, 28, 0.54)",
  },
  {
    id: "soreng",
    name: "Soreng",
    label: "West Sikkim",
    tagline: "The valley remembers rain",
    description:
      "Rural paths, waterfalls, and river valleys reveal a slower, softer side of the state.",
    image:
      "https://images.unsplash.com/photo-1774694234800-5f0e11cc77c8?w=1800&h=1100&fit=crop&auto=format",
    accent: "#7ca887",
    tint: "rgba(22, 38, 30, 0.55)",
  },
];

function ChevronLeft() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M15 18 9 12l6-6" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function DistrictExplorer({
  onBack,
  onOpenMap,
}: {
  onBack: () => void;
  onOpenMap: (district: District) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [entering, setEntering] = useState<District | null>(null);
  const [panelPointer, setPanelPointer] = useState({ x: 0, y: 0, index: -1 });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    let frame = 0;
    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setActiveIndex(Math.round(track.scrollLeft / track.clientWidth));
      });
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const boundedIndex = Math.max(0, Math.min(index, districts.length - 1));
    track.scrollTo({
      left: boundedIndex * track.clientWidth,
      behavior: "smooth",
    });
  }, []);

  const activeDistrict = districts[activeIndex] ?? districts[0];

  return (
    <section
      className="district-explorer"
      style={{ "--active-accent": activeDistrict.accent } as CSSProperties}
      aria-label="Explore Sikkim districts"
    >
      <div className="district-track" ref={trackRef}>
        {districts.map((district, index) => {
          const isActive = index === activeIndex;
          const isHovered = panelPointer.index === index;
          const parallaxX = isHovered ? panelPointer.x * -14 : 0;
          const parallaxY = isHovered ? panelPointer.y * -8 : 0;

          return (
            <article
              className={`district-panel${isActive ? " is-active" : ""}`}
              key={district.id}
              onMouseMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect();
                setPanelPointer({
                  x: (event.clientX - rect.left) / rect.width - 0.5,
                  y: (event.clientY - rect.top) / rect.height - 0.5,
                  index,
                });
              }}
              onMouseLeave={() => setPanelPointer((current) => ({ ...current, index: -1 }))}
              style={
                {
                  "--district-accent": district.accent,
                  "--district-tint": district.tint,
                } as CSSProperties
              }
            >
              <img
                src={district.image}
                alt=""
                className="district-image"
                style={{
                  transform: `scale(${isHovered ? 1.055 : 1.02}) translate(${parallaxX}px, ${parallaxY}px)`,
                }}
              />
              <div className="district-tint" />
              <div className="district-shade" />

              <div className="district-index">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <i />
              </div>

              <div className="district-copy">
                <p>{district.label}</p>
                <h2>{district.name}</h2>
                <i />
                <strong>{district.tagline}</strong>
                <span>{district.description}</span>
                <button type="button" onClick={() => setEntering(district)}>
                  <i />
                  Explore District
                  <ChevronRight />
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <button className="district-back" type="button" onClick={onBack}>
        <ChevronLeft />
        Home
      </button>

      <div className="district-wordmark">Memento</div>
      <div className="district-count">
        <span>{String(activeIndex + 1).padStart(2, "0")}</span>
        <i>/</i>
        <span>{String(districts.length).padStart(2, "0")}</span>
      </div>

      <div className="district-nav" aria-label="District carousel controls">
        <button
          type="button"
          aria-label="Previous district"
          disabled={activeIndex === 0}
          onClick={() => goTo(activeIndex - 1)}
        >
          <ChevronLeft />
        </button>
        <div className="district-dots">
          {districts.map((district, index) => (
            <button
              type="button"
              key={district.id}
              aria-label={`Show ${district.name}`}
              className={index === activeIndex ? "is-active" : ""}
              onClick={() => goTo(index)}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next district"
          disabled={activeIndex === districts.length - 1}
          onClick={() => goTo(activeIndex + 1)}
        >
          <ChevronRight />
        </button>
      </div>

      <div className="district-progress">
        <span style={{ height: `${((activeIndex + 1) / districts.length) * 100}%` }} />
      </div>

      {entering && (
        <div className="entering-overlay" role="dialog" aria-modal="true">
          <p>Memento</p>
          <h2>Entering {entering.name}</h2>
          <i />
          <div>
            <button type="button" onClick={() => setEntering(null)}>
              Back
            </button>
            <button type="button" onClick={() => onOpenMap(entering)}>
              View On Map
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default function Home({
  initialSection = "hero",
}: {
  initialSection?: "hero" | "districts";
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const heroRef = useRef<HTMLElement>(null);
  const districtsRef = useRef<HTMLDivElement>(null);
  const routeScrollRef = useRef(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, () => {
        const size = 1 + Math.random() * 2;
        return {
          left: `${10 + Math.random() * 80}%`,
          top: `${40 + Math.random() * 55}%`,
          width: `${size}px`,
          height: `${size}px`,
          opacity: 0.35 + Math.random() * 0.55,
          "--duration": `${6 + Math.random() * 10}s`,
          "--delay": `${Math.random() * 10}s`,
        } as ParticleStyle;
      }),
    []
  );

  const scrollToHero = useCallback(
    (smooth = true) => {
      heroRef.current?.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "start",
      });
      if (location.pathname !== "/") {
        routeScrollRef.current = smooth;
        navigate("/", { replace: true });
      }
    },
    [location.pathname, navigate]
  );

  const scrollToDistricts = useCallback(
    (smooth = true) => {
      districtsRef.current?.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "start",
      });
      if (location.pathname !== "/districts") {
        routeScrollRef.current = smooth;
        navigate("/districts", { replace: true });
      }
    },
    [location.pathname, navigate]
  );

  useEffect(() => {
    const openDistricts = location.pathname === "/districts" || initialSection === "districts";
    window.setTimeout(() => {
      const shouldSmooth = routeScrollRef.current || initialSection === "districts";
      if (openDistricts) {
        scrollToDistricts(shouldSmooth);
      } else {
        scrollToHero(routeScrollRef.current);
      }
      routeScrollRef.current = false;
    }, 60);
  }, [initialSection, location.pathname, scrollToDistricts, scrollToHero]);

  return (
    <div className="home-memento">
      <section
        className="memento-hero"
        ref={heroRef}
        onWheel={(event) => {
          if (event.deltaY > 18) scrollToDistricts(true);
        }}
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          setPointer({
            x: (event.clientX - rect.left) / rect.width - 0.5,
            y: (event.clientY - rect.top) / rect.height - 0.5,
          });
        }}
      >
        <div
          className="hero-image-wrap"
          style={{
            transform: `scale(1.08) translate(${pointer.x * -10}px, ${pointer.y * -6}px)`,
          }}
        >
          <img src={heroImage} alt="Sunlit Himalayan valley in Sikkim" />
        </div>

        <div className="hero-grade" />
        <div className="hero-vignette" />
        <div className="hero-fog" />
        <div className="hero-fog hero-fog-slow" />
        <div className="hero-bottom-fade" />

        {particles.map((style, index) => (
          <span className="hero-particle" key={index} style={style} />
        ))}

        <header className="hero-topbar" aria-label="Memento introduction">
          <span>Memento</span>
          <span>Sikkim - India</span>
        </header>

        <div className="hero-center">
          <p>An Exploration Awaits</p>
          <h1>Memento</h1>
          <span>Discover Sikkim through stories, artifacts, and places worth finding.</span>
          <button type="button" onClick={() => scrollToDistricts(true)}>
            Explore
          </button>
        </div>

        <button className="hero-scroll" type="button" onClick={() => scrollToDistricts(true)}>
          <span>Scroll</span>
          <i />
        </button>
      </section>

      <div ref={districtsRef}>
        <DistrictExplorer onBack={() => scrollToHero(true)} onOpenMap={() => navigate("/map")} />
      </div>
    </div>
  );
}
