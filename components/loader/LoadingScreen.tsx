'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { siteConfig } from '@/content/site';

interface LoadingScreenProps {
  onComplete: () => void;
}

const TEXT = '#909E79';
const TEXT_DEEP = '#979430';
const ACCENT = '#F95483';
const PALETTE = {
  cream: '#F8ECDA',
  creamMid: '#F4DCBB',
  peach: '#F4DBB4',
  gold: '#EFC796',
  blush: '#FBAFB5',
  rose: '#F95483',
  coral: '#FB6A67',
  orange: '#FC7406',
  apricot: '#FCB484',
  sun: '#FDD461',
  lavender: '#D0B2D2',
  sage: '#BDBF86',
  olive: '#979430',
  moss: '#909E79',
} as const;
const PALETTE_COLORS = Object.values(PALETTE);
const TOTAL_DURATION_MS = 15000;

const DECORATION_IMAGES = [
  '/decoration/decoration/left-top-decoration.png',
  '/decoration/decoration/right-top-decoration.png',
  '/decoration/decoration/left-bottom-decoration.png',
  '/decoration/decoration/right-bottom-decoration.png',
  '/decoration/decoration/bottom-center-decoration.png',
] as const;

const BACKGROUND_GRADIENT = `linear-gradient(
  165deg,
  #FEFAF5 0%,
  #FDF6ED 22%,
  #FFFFFF 48%,
  ${PALETTE.blush}28 74%,
  ${PALETTE.lavender}33 100%
)`;

const CORNER_DECO_CLASS =
  'block h-auto w-auto max-w-[130px] sm:max-w-[160px] md:max-w-[210px] lg:max-w-[250px]';

const smg: React.CSSProperties = {
  fontFamily: "'SortsMillGoudy', Georgia, serif",
  fontStyle: 'normal',
};
const hps: React.CSSProperties = {
  fontFamily: "'HelloParisSans', serif",
};

function parseCeremonyDate(dateStr: string) {
  const match = dateStr.match(/(\w+)\s+(\d{1,2}),\s+(\d{4})/);
  return {
    month: match?.[1]?.toUpperCase() ?? 'OCTOBER',
    day: match?.[2] ?? '18',
    year: match?.[3] ?? '2026',
  };
}

interface AmbientOrb {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
}

interface SparkParticle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  opacity: number;
  duration: number;
  delay: number;
  driftX: number;
  driftY: number;
  twinkleDuration: number;
}

function createAmbientOrbs(count: number): AmbientOrb[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    x: 4 + Math.random() * 92,
    y: 6 + Math.random() * 88,
    size: 60 + Math.random() * 100,
    color: PALETTE_COLORS[Math.floor(Math.random() * PALETTE_COLORS.length)],
    opacity: 0.06 + Math.random() * 0.09,
    duration: 16 + Math.random() * 14,
    delay: Math.random() * 6,
    driftX: -14 + Math.random() * 28,
    driftY: -12 + Math.random() * 24,
  }));
}

function createSparkParticles(count: number): SparkParticle[] {
  return Array.from({ length: count }, (_, id) => ({
    id,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 1.5 + Math.random() * 3,
    color: PALETTE_COLORS[Math.floor(Math.random() * PALETTE_COLORS.length)],
    opacity: 0.18 + Math.random() * 0.22,
    duration: 12 + Math.random() * 16,
    delay: Math.random() * 10,
    driftX: -10 + Math.random() * 20,
    driftY: -12 + Math.random() * 24,
    twinkleDuration: 3 + Math.random() * 4,
  }));
}

function DottedRule({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? 'w-[3.25rem] border-t border-dotted md:w-[4rem]'
          : 'flex-1 border-t border-dotted'
      }
      style={{ borderColor: TEXT_DEEP }}
    />
  );
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [loadPercent, setLoadPercent] = useState(0);

  useEffect(() => {
    DECORATION_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  useEffect(() => {
    const startedAt = performance.now();
    let frameId = 0;
    let completed = false;

    const finish = () => {
      if (completed) return;
      completed = true;
      onComplete();
    };

    const hardCapTimer = setTimeout(finish, TOTAL_DURATION_MS);

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const next = Math.min(100, Math.round((elapsed / TOTAL_DURATION_MS) * 100));
      setLoadPercent(next);
      if (next < 100) frameId = requestAnimationFrame(tick);
    };
    frameId = requestAnimationFrame(tick);

    return () => {
      clearTimeout(hardCapTimer);
      cancelAnimationFrame(frameId);
    };
  }, [onComplete]);

  const groomNickname = siteConfig.couple.groomNickname;
  const brideNickname = siteConfig.couple.brideNickname;
  const day = siteConfig.ceremony.day?.toUpperCase() ?? 'SATURDAY';
  const time = siteConfig.ceremony.time ?? '3:30 PM';
  const venue = siteConfig.ceremony.location;
  const { month, day: dateNum, year } = useMemo(
    () => parseCeremonyDate(siteConfig.ceremony.date ?? 'October 18, 2026'),
    [],
  );
  const ambientOrbs = useMemo(() => createAmbientOrbs(5), []);
  const sparkParticles = useMemo(() => createSparkParticles(16), []);

  return (
    <div
      className="fixed inset-0 z-30 flex items-center justify-center overflow-hidden"
      style={{ background: '#FEFAF5' }}
    >
      {/* ── Ambient color wash + floating particles (visible from first paint) ── */}
      <div
        className="particle-field pointer-events-none absolute inset-0 z-0"
        aria-hidden
        style={{ background: BACKGROUND_GRADIENT }}
      >
        <div className="particle-gradient" />
        {ambientOrbs.map((orb) => (
          <span
            key={`orb-${orb.id}`}
            className="particle-orb"
            style={{
              left: `${orb.x}%`,
              top: `${orb.y}%`,
              width: orb.size,
              height: orb.size,
              backgroundColor: orb.color,
              opacity: orb.opacity,
              animationDuration: `${orb.duration}s`,
              animationDelay: `${orb.delay}s`,
              ['--drift-x' as string]: `${orb.driftX}px`,
              ['--drift-y' as string]: `${orb.driftY}px`,
            }}
          />
        ))}
        {sparkParticles.map((particle) => (
          <span
            key={`spark-${particle.id}`}
            className="particle-spark"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              color: particle.color,
              opacity: particle.opacity,
              animationDuration: `${particle.duration}s, ${particle.twinkleDuration}s`,
              animationDelay: `${particle.delay}s, ${particle.delay * 0.4}s`,
              ['--drift-x' as string]: `${particle.driftX}px`,
              ['--drift-y' as string]: `${particle.driftY}px`,
            }}
          />
        ))}
      </div>
      {/* ── Corner florals ── */}
      <div className="pointer-events-none absolute left-0 top-0 z-[1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/decoration/decoration/left-top-decoration.png" alt="" className={CORNER_DECO_CLASS} />
      </div>

      <div className="pointer-events-none absolute right-0 top-0 z-[1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/decoration/decoration/right-top-decoration.png" alt="" className={CORNER_DECO_CLASS} />
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 z-[1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/decoration/decoration/left-bottom-decoration.png" alt="" className={CORNER_DECO_CLASS} />
      </div>

      <div className="pointer-events-none absolute bottom-0 right-0 z-[1]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/decoration/decoration/right-bottom-decoration.png" alt="" className={CORNER_DECO_CLASS} />
      </div>

      {/* ── Bottom-center floral — mobile only ── */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-[1] md:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/decoration/decoration/bottom-center-decoration.png" alt="" className="block h-auto w-full" />
      </div>

      {/* ── Card content ──
           Mobile : 310px max-width, 26% viewport padding handled via max-w
           Desktop: 520px card centered, flanked by the tall florals            ── */}
      <div
        className="relative z-10 mx-auto flex w-full max-w-[310px] flex-col items-center text-center md:max-w-[520px]"
        style={{
          color: TEXT,
          WebkitFontSmoothing: 'antialiased',
        }}
      >
        {/* SAVE THE DATE — arch */}
        <div className="mb-1 w-full">
          {/* Mobile SVG */}
          <svg
            viewBox="0 0 300 100"
            className="mx-auto h-[66px] w-full md:hidden"
            aria-hidden
            overflow="visible"
          >
            <defs>
              <path id="stdArcMob" d="M 6 86 A 178 178 0 0 1 294 86" fill="none" />
            </defs>
            <text fill={TEXT_DEEP} style={{ ...smg, fontSize: '24px', letterSpacing: '0.32em' }}>
              <textPath href="#stdArcMob" startOffset="50%" textAnchor="middle">
                SAVE THE DATE
              </textPath>
            </text>
          </svg>

          {/* Desktop SVG — larger arch */}
          <svg
            viewBox="0 0 480 130"
            className="mx-auto hidden h-[90px] w-full md:block"
            aria-hidden
            overflow="visible"
          >
            <defs>
              <path id="stdArcDsk" d="M 10 112 A 280 280 0 0 1 470 112" fill="none" />
            </defs>
            <text fill={TEXT_DEEP} style={{ ...smg, fontSize: '36px', letterSpacing: '0.3em' }}>
              <textPath href="#stdArcDsk" startOffset="50%" textAnchor="middle">
                SAVE THE DATE
              </textPath>
            </text>
          </svg>
        </div>

        {/* for the wedding of */}
        <div className="mt-1">
          <p
            className="text-[14px] md:text-[18px]"
            style={{ ...smg, color: TEXT }}
          >
            for the wedding of
          </p>
        </div>

        {/* Groom name */}
        <div className="mt-4 w-full">
          <h1
            className="w-full leading-none"
            style={{
              ...hps,
              fontSize: 'clamp(52px, 14vw, 72px)',
              color: ACCENT,
              fontWeight: 400,
              letterSpacing: '0.04em',
              textTransform: 'capitalize',
            }}
          >
            {groomNickname}
          </h1>
        </div>

        {/* and */}
        <div className="my-2 flex w-full items-center justify-center gap-2 md:my-3">
          <DottedRule compact />
          <span
            className="shrink-0 text-[13px] md:text-[16px]"
            style={{ ...smg, color: TEXT }}
          >
            and
          </span>
          <DottedRule compact />
        </div>

        {/* Bride name */}
        <div className="w-full">
          <h1
            className="w-full leading-none"
            style={{
              ...hps,
              fontSize: 'clamp(52px, 14vw, 72px)',
              color: ACCENT,
              fontWeight: 400,
              letterSpacing: '0.04em',
              textTransform: 'capitalize',
            }}
          >
            {brideNickname}
          </h1>
        </div>

        {/* Together with their families */}
        <div className="mt-4 w-[115%] md:mt-5 md:w-full">
          <p
            className="whitespace-nowrap text-[12px] leading-[1.65] md:whitespace-normal md:text-[14px] md:leading-[1.75]"
            style={{ ...smg, color: TEXT }}
          >
            Together with their families
            <br />
            invite you to their wedding celebration
          </p>
        </div>

        {/* Date block */}
        <div className="mt-4 w-full md:mt-5">
          <div
            className="mx-auto grid w-full max-w-[260px] gap-y-0 md:max-w-[340px]"
            style={{
              gridTemplateColumns: '1fr auto 1fr',
              gridTemplateRows: 'auto auto auto',
            }}
          >
            {/* OCTOBER */}
            <div
              className="col-start-2 row-start-1 border-x border-t border-dotted px-1.5 pb-0 pt-0.5 text-center md:px-2"
              style={{ borderColor: TEXT_DEEP }}
            >
              <span
                className="text-[10px] font-bold tracking-[0.18em] uppercase md:text-[12px]"
                style={{ ...smg, color: TEXT }}
              >
                {month}
              </span>
            </div>

            {/* LEFT — day + lines aligned to 18 */}
            <div className="col-start-1 row-start-2 flex flex-col justify-center gap-[2px] px-0.5 md:px-1">
              <div className="border-t border-dotted" style={{ borderColor: TEXT_DEEP }} />
              <span
                className="text-center text-[10px] tracking-[0.14em] uppercase md:text-[12px]"
                style={{ ...smg, color: TEXT }}
              >
                {day}
              </span>
              <div className="border-t border-dotted" style={{ borderColor: TEXT_DEEP }} />
            </div>

            {/* 18 */}
            <div
              className="col-start-2 row-start-2 flex items-center justify-center border-x border-dotted px-1 pb-0 pt-0 md:px-1.5"
              style={{ borderColor: TEXT_DEEP }}
            >
              <span
                className="leading-[0.85]"
                style={{
                  ...hps,
                  fontSize: 'clamp(52px, 14vw, 68px)',
                  color: ACCENT,
                }}
              >
                {dateNum}
              </span>
            </div>

            {/* RIGHT — time + lines aligned to 18 */}
            <div className="col-start-3 row-start-2 flex flex-col justify-center gap-[2px] px-0.5 md:px-1">
              <div className="border-t border-dotted" style={{ borderColor: TEXT_DEEP }} />
              <span
                className="whitespace-nowrap text-center text-[10px] tracking-[0.12em] uppercase md:text-[12px]"
                style={{ ...smg, color: TEXT }}
              >
                At {time}
              </span>
              <div className="border-t border-dotted" style={{ borderColor: TEXT_DEEP }} />
            </div>

            {/* 2026 */}
            <div
              className="col-start-2 row-start-3 border-x border-b border-dotted px-1.5 pb-0.5 pt-0 text-center md:px-2"
              style={{ borderColor: TEXT_DEEP }}
            >
              <span
                className="text-[14px] font-bold leading-none tracking-[0.12em] md:text-[18px]"
                style={{ ...smg, color: TEXT_DEEP, fontWeight: 700 }}
              >
                {year}
              </span>
            </div>
          </div>
        </div>

        {/* at / venue */}
        <div className="mt-4 flex w-full flex-col items-center md:mt-5">
          <div className="flex items-center justify-center gap-1.5 md:gap-2">
            <div
              className="w-[3.25rem] border-t border-dotted md:w-[4rem]"
              style={{ borderColor: TEXT_DEEP }}
            />
            <span className="text-[13px] md:text-[15px]" style={{ ...smg, color: TEXT }}>
              at
            </span>
            <div
              className="w-[3.25rem] border-t border-dotted md:w-[4rem]"
              style={{ borderColor: TEXT_DEEP }}
            />
          </div>
          <p
            className="mt-2 text-[13px] leading-snug md:mt-2.5 md:text-[15px]"
            style={{ ...smg, color: TEXT }}
          >
            {venue}
          </p>
        </div>

        {/* Loading indicator */}
        <div className="mt-7 w-full max-w-[220px] pb-2 md:max-w-[320px]">
          <p
            className="loading-dots-text text-[11px] tracking-[0.28em] uppercase md:text-[12px]"
            style={{ ...smg, color: TEXT, opacity: 0.85 }}
            aria-live="polite"
          >
            Loading {loadPercent}%
          </p>
          <div
            className="mt-2 h-[3px] w-full overflow-hidden rounded-full"
            style={{ backgroundColor: `${PALETTE.sage}33` }}
          >
            <div
              className="h-full rounded-full transition-[width] duration-150 ease-out"
              style={{
                width: `${loadPercent}%`,
                background: `linear-gradient(90deg, ${PALETTE.rose}, ${PALETTE.apricot}, ${PALETTE.sun})`,
              }}
            />
          </div>
        </div>
      </div>

      <style jsx>{`
        .loading-dots-text {
          animation: loadingPulse 2s ease-in-out infinite;
        }

        @keyframes loadingPulse {
          0%, 100% { opacity: 0.65; }
          50%       { opacity: 1; }
        }

        .particle-field {
          opacity: 1;
        }

        .particle-gradient {
          position: absolute;
          inset: -20%;
          background:
            radial-gradient(circle at 14% 18%, ${PALETTE.sun}22 0%, transparent 40%),
            radial-gradient(circle at 86% 14%, ${PALETTE.blush}28 0%, transparent 38%),
            radial-gradient(circle at 78% 82%, ${PALETTE.apricot}22 0%, transparent 42%),
            radial-gradient(circle at 20% 78%, ${PALETTE.lavender}28 0%, transparent 38%),
            radial-gradient(circle at 50% 50%, ${PALETTE.gold}18 0%, transparent 52%);
          animation: gradientBreath 22s ease-in-out infinite alternate;
        }

        .particle-orb,
        .particle-spark {
          position: absolute;
          border-radius: 9999px;
          will-change: transform, opacity;
          animation-name: particleDrift;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
          animation-direction: alternate;
        }

        .particle-orb {
          filter: blur(38px);
          transform: translate3d(-50%, -50%, 0);
        }

        .particle-spark {
          transform: translate3d(-50%, -50%, 0);
          box-shadow: 0 0 6px color-mix(in srgb, currentColor 35%, transparent);
          animation-name: particleDrift, particleTwinkleOpacity;
        }

        @keyframes particleTwinkleOpacity {
          0%, 100% {
            opacity: 0.12;
          }
          50% {
            opacity: 0.45;
          }
        }

        @keyframes gradientBreath {
          0% {
            transform: scale(1) translate3d(0, 0, 0);
            opacity: 0.85;
          }
          100% {
            transform: scale(1.06) translate3d(0, -1.5%, 0);
            opacity: 1;
          }
        }

        @keyframes particleDrift {
          0% {
            transform: translate3d(calc(-50% + 0px), calc(-50% + 0px), 0);
          }
          100% {
            transform: translate3d(
              calc(-50% + var(--drift-x, 12px)),
              calc(-50% + var(--drift-y, -18px)),
              0
            );
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .particle-field {
            animation: none !important;
            opacity: 1;
          }

          .particle-gradient,
          .particle-orb,
          .particle-spark {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};
