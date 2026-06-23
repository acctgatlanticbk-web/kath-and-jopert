"use client"

import { useState, useEffect, useCallback, useRef, useLayoutEffect, useMemo, type CSSProperties } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "motion/react"
import {
  Heart,
  Check,
  X,
  Sparkles,
  MapPin,
} from "lucide-react"
import { useSiteConfig } from "@/hooks/use-site-config"
import { LoadingScreen } from "@/components/loader/LoadingScreen"
import { getRoleSingular } from "@/lib/proposal-roles"
import type { ProposalRole, ProposalResponse } from "@/lib/proposal-types"

const TEXT = "var(--color-motif-medium)"
const TEXT_DEEP = "var(--color-motif-medium)"
const ACCENT = "var(--color-motif-accent)"

const smg: CSSProperties = {
  fontFamily: "'SortsMillGoudy', Georgia, serif",
  fontStyle: "normal",
}
const hps: CSSProperties = {
  fontFamily: "'HelloParisSans', serif",
}

const HERO_BACKGROUND = `linear-gradient(
  165deg,
  var(--color-motif-cream) 0%,
  color-mix(in srgb, var(--color-motif-cream) 88%, white) 22%,
  #FFFFFF 48%,
  color-mix(in srgb, var(--color-motif-soft) 16%, transparent) 74%,
  color-mix(in srgb, var(--color-motif-yellow) 12%, transparent) 100%
)`

const PALETTE_COLORS = [
  "var(--color-motif-cream)",
  "var(--color-motif-silver)",
  "var(--color-motif-soft)",
  "var(--color-motif-accent)",
  "var(--color-motif-yellow)",
  "var(--color-motif-medium)",
] as const

interface AmbientOrb {
  id: number
  x: number
  y: number
  size: number
  color: string
  opacity: number
  duration: number
  delay: number
  driftX: number
  driftY: number
}

interface SparkParticle {
  id: number
  x: number
  y: number
  size: number
  color: string
  opacity: number
  duration: number
  delay: number
  driftX: number
  driftY: number
  twinkleDuration: number
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
  }))
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
  }))
}

function DottedRule({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={
        compact
          ? "w-[3.25rem] border-t border-dotted md:w-[4rem]"
          : "flex-1 border-t border-dotted"
      }
      style={{ borderColor: TEXT_DEEP }}
    />
  )
}

function ProposalHeroBackdrop({ decorVisible }: { decorVisible: boolean }) {
  const ambientOrbs = useMemo(() => createAmbientOrbs(5), [])
  const sparkParticles = useMemo(() => createSparkParticles(16), [])
  const decorClass = decorVisible ? " decor-visible" : ""

  return (
    <>
      <div className="proposal-base pointer-events-none absolute inset-0 z-0" aria-hidden />
      <div className="proposal-wash pointer-events-none absolute inset-0 z-0" aria-hidden />

      <div className="particle-field particle-field-visible pointer-events-none absolute inset-0 z-[1]" aria-hidden>
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
              ["--drift-x" as string]: `${orb.driftX}px`,
              ["--drift-y" as string]: `${orb.driftY}px`,
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
              ["--drift-x" as string]: `${particle.driftX}px`,
              ["--drift-y" as string]: `${particle.driftY}px`,
            }}
          />
        ))}
      </div>

      <div className={`decor-corner decor-top-left pointer-events-none absolute left-0 top-0 z-[2]${decorClass}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/decoration/decoration/left-top-decoration.png" alt="" className="block h-auto w-auto max-w-[130px] sm:max-w-[160px] md:max-w-[210px] lg:max-w-[260px]" />
      </div>
      <div className={`decor-corner decor-top-right pointer-events-none absolute right-0 top-0 z-[2]${decorClass}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/decoration/decoration/right-top-decoration.png" alt="" className="block h-auto w-auto max-w-[130px] sm:max-w-[160px] md:max-w-[210px] lg:max-w-[260px]" />
      </div>
      <div className={`decor-corner decor-bottom-left pointer-events-none absolute bottom-0 left-0 z-[2]${decorClass}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/decoration/decoration/left-bottom-decoration.png" alt="" className="block h-auto w-auto max-w-[130px] sm:max-w-[160px] md:max-w-[210px] lg:max-w-[260px]" />
      </div>
      <div className={`decor-corner decor-bottom-right pointer-events-none absolute bottom-0 right-0 z-[2]${decorClass}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/decoration/decoration/right-bottom-decoration.png" alt="" className="block h-auto w-auto max-w-[130px] sm:max-w-[160px] md:max-w-[210px] lg:max-w-[260px]" />
      </div>
      <div className={`decor-bottom pointer-events-none absolute bottom-0 left-0 right-0 z-[3] md:hidden${decorClass}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/decoration/decoration/bottom-center-decoration.png" alt="" className="block h-auto w-full" />
      </div>
    </>
  )
}

function CoupleNamesHero() {
  const siteConfig = useSiteConfig()
  const groomNickname = siteConfig.couple.groomNickname || siteConfig.couple.groom
  const brideNickname = siteConfig.couple.brideNickname || siteConfig.couple.bride

  return (
    <div className="relative z-10 flex w-full flex-col items-center leading-none">
      <h1
        className="w-full leading-none"
        style={{
          ...hps,
          fontSize: "clamp(52px, 14vw, 72px)",
          color: ACCENT,
          fontWeight: 400,
          letterSpacing: "0.04em",
          textTransform: "capitalize",
        }}
      >
        {groomNickname}
      </h1>

      <div className="my-2 flex w-full items-center justify-center gap-2 md:my-3">
        <DottedRule compact />
        <span className="shrink-0 text-[13px] md:text-[16px]" style={{ ...smg, color: TEXT }}>
          and
        </span>
        <DottedRule compact />
      </div>

      <h1
        className="w-full leading-none"
        style={{
          ...hps,
          fontSize: "clamp(52px, 14vw, 72px)",
          color: ACCENT,
          fontWeight: 400,
          letterSpacing: "0.04em",
          textTransform: "capitalize",
        }}
      >
        {brideNickname}
      </h1>
    </div>
  )
}

function ProposalIntroSection({ venue }: { venue: string }) {
  return (
    <div
      className="mx-auto w-full max-w-[310px] space-y-4 text-center md:max-w-[520px] md:space-y-5"
      style={{ color: TEXT, WebkitFontSmoothing: "antialiased" }}
    >
      <div className="mb-1 w-full">
        <svg viewBox="0 0 300 100" className="mx-auto h-[66px] w-full md:hidden" aria-hidden overflow="visible">
          <defs>
            <path id="proposalArcMob" d="M 6 80 A 178 178 0 0 1 294 80" fill="none" />
          </defs>
          <text fill={TEXT_DEEP} style={{ ...smg, fontSize: "24px", letterSpacing: "0.32em" }}>
            <textPath href="#proposalArcMob" startOffset="50%" textAnchor="middle">
              SAVE THE DATE
            </textPath>
          </text>
        </svg>
        <svg viewBox="0 0 480 130" className="mx-auto hidden h-[90px] w-full md:block" aria-hidden overflow="visible">
          <defs>
            <path id="proposalArcDsk" d="M 10 104 A 280 280 0 0 1 470 104" fill="none" />
          </defs>
          <text fill={TEXT_DEEP} style={{ ...smg, fontSize: "36px", letterSpacing: "0.3em" }}>
            <textPath href="#proposalArcDsk" startOffset="50%" textAnchor="middle">
              SAVE THE DATE
            </textPath>
          </text>
        </svg>
      </div>

      <div className="flex w-full flex-col items-center gap-2">
        <div className="flex w-full max-w-[280px] items-center justify-center gap-2 md:max-w-[320px]">
          <DottedRule compact />
          <p
            className="shrink-0 text-[10px] tracking-[0.28em] uppercase md:text-[12px]"
            style={{ ...smg, color: TEXT, opacity: 0.88 }}
          >
            With joy in our hearts
          </p>
          <DottedRule compact />
        </div>
        <p
          className="text-[12px] leading-[1.65] md:text-[14px] md:leading-[1.75]"
          style={{ ...smg, color: TEXT }}
        >
          With the grace of God and the blessings
          <br />
          of our families we ask of you
        </p>
      </div>

      <CoupleNamesHero />

      <p
        className="text-sm tracking-[0.18em] uppercase md:text-base md:tracking-[0.22em]"
        style={{ ...smg, color: TEXT_DEEP, fontWeight: 600 }}
      >
        Are Getting Married
      </p>

      <div className="flex flex-col items-center">
        <div className="flex items-center justify-center gap-1.5 md:gap-2">
          <DottedRule compact />
          <span className="text-[13px] md:text-[15px]" style={{ ...smg, color: TEXT }}>
            at
          </span>
          <DottedRule compact />
        </div>
        <p
          className="mt-2 flex items-center justify-center gap-2 text-[13px] leading-snug md:mt-2.5 md:text-[15px]"
          style={{ ...smg, color: TEXT }}
        >
          <MapPin className="h-4 w-4 shrink-0" style={{ color: ACCENT }} />
          <span className="text-pretty" title={venue}>
            {venue}
          </span>
        </p>
      </div>
    </div>
  )
}

const cardClass =
  "relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-motif-medium/20 bg-motif-cream/90 p-5 text-center shadow-[0_16px_48px_rgba(42,37,32,0.08)] backdrop-blur-sm sm:p-10 md:p-12 lg:p-14"

const primaryBtnClass =
  "cursor-pointer rounded-lg border border-motif-accent bg-motif-accent px-5 py-3 text-[10px] font-semibold tracking-[0.22em] text-white uppercase shadow-[0_10px_24px_color-mix(in_srgb,var(--color-motif-accent)_28%,transparent)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-motif-deep hover:border-motif-deep disabled:opacity-50 sm:px-7 sm:py-3.5 sm:text-[11px] sm:tracking-[0.26em] md:px-8 md:py-4"

const secondaryBtnClass =
  "cursor-pointer rounded-lg border border-motif-medium/35 bg-white/70 px-5 py-3 text-[10px] font-semibold tracking-[0.22em] uppercase shadow-sm transition-all duration-300 hover:border-motif-accent/50 hover:bg-motif-soft/20 sm:px-7 sm:py-3.5 sm:text-[11px] sm:tracking-[0.26em] md:px-8 md:py-4"

function ProposalAskSection({
  roleSingular,
  description,
  coAttendants,
  onYes,
  onNo,
}: {
  roleSingular: string
  description: string
  coAttendants: string[]
  onYes: () => void
  onNo: () => void
}) {
  const questionRef = useRef<HTMLDivElement>(null)
  const [questionHeight, setQuestionHeight] = useState<number | null>(null)

  useLayoutEffect(() => {
    const node = questionRef.current
    if (!node) return

    const syncHeight = () => {
      setQuestionHeight(node.getBoundingClientRect().height)
    }

    syncHeight()
    const observer = new ResizeObserver(syncHeight)
    observer.observe(node)

    return () => observer.disconnect()
  }, [roleSingular, description])

  return (
    <div className="relative mx-auto mt-0 w-full sm:mt-10">
      {coAttendants.length > 0 && (
        <div className="mx-auto mb-8 max-w-lg space-y-3 rounded-xl border border-motif-medium/20 bg-white/60 px-5 py-4 text-center sm:px-6 sm:py-5">
          <div
            className="flex items-center justify-center gap-2 text-[10px] font-semibold tracking-[0.2em] uppercase sm:text-xs"
            style={{ ...smg, color: ACCENT }}
          >
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            <span>Co-members standing in this position</span>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {coAttendants.map((name, idx) => (
              <span
                key={idx}
                className="rounded-full border border-motif-medium/25 bg-motif-soft/30 px-3 py-1 text-xs font-medium shadow-sm"
                style={{ ...smg, color: TEXT_DEEP }}
              >
                ✨ {name}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="relative pt-0 sm:border-t sm:border-motif-medium/15 sm:pt-10">
        <span
          aria-hidden
          className="pointer-events-none absolute right-0 bottom-8 h-56 w-56 rounded-full opacity-35 blur-3xl sm:bottom-12 sm:h-72 sm:w-72"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--color-motif-soft) 55%, transparent), transparent)",
          }}
        />

        <div className="relative flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between sm:gap-6 md:gap-10 mt-10">
          <div className="flex flex-row items-stretch justify-between gap-3 sm:contents">
            {/* Question + quote */}
            <div className="relative z-10 flex min-w-0 flex-1 flex-col items-start text-left">
              <div ref={questionRef} className="w-full">
                <p
                  className="text-[10px] tracking-[0.28em] uppercase sm:text-xs sm:tracking-[0.32em]"
                  style={{ ...smg, color: TEXT, fontWeight: 600 }}
                >
                  Will You Be Our
                </p>

                <h2
                  className="mt-2 leading-[0.92] sm:mt-3"
                  style={{
                    ...hps,
                    fontSize: "clamp(2.75rem, 11vw, 4.5rem)",
                    color: ACCENT,
                    fontWeight: 400,
                    letterSpacing: "0.04em",
                    textTransform: "capitalize",
                  }}
                >
                  {roleSingular}?
                </h2>

                <p
                  className="mt-3 max-w-lg pr-1 text-sm leading-[1.65] italic sm:mt-6 sm:pr-0 sm:text-base sm:leading-[1.75] md:mt-7 md:text-lg md:leading-relaxed"
                  style={{ ...smg, color: TEXT }}
                >
                  &ldquo;{description}&rdquo;
                </p>
              </div>

              {/* Desktop / tablet buttons */}
              <div className="mt-8 hidden w-full flex-row gap-3 sm:mt-10 sm:flex sm:max-w-md md:mt-12">
                <button onClick={onYes} className={`${primaryBtnClass} min-w-0 flex-1`}>
                  Yes, I&apos;d Be Honored
                </button>
                <button
                  onClick={onNo}
                  className={`${secondaryBtnClass} min-w-0 flex-1`}
                  style={{ ...smg, color: TEXT }}
                >
                  Regretfully Decline
                </button>
              </div>
            </div>

            {/* Couple illustration — height tracks question block on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden
              style={
                questionHeight
                  ? ({ "--ask-image-h": `${questionHeight}px` } as CSSProperties)
                  : undefined
              }
              className="pointer-events-none relative -mr-1 flex w-[38%] max-w-[168px] shrink-0 items-center justify-end self-stretch translate-x-4 max-sm:h-[var(--ask-image-h)] sm:mr-0 sm:block sm:w-[min(36vw,240px)] sm:max-w-none sm:translate-x-0 md:w-[min(32vw,280px)] lg:w-[300px]"
            >
              <div className="relative h-full w-full sm:h-auto sm:aspect-[3/4] sm:translate-y-4 md:translate-y-6">
                <Image
                  src="/attireGuide/character.png"
                  alt=""
                  fill
                  className="object-contain object-[right_center] drop-shadow-[0_20px_48px_rgba(15,28,63,0.14)] sm:object-bottom"
                  sizes="(max-width: 640px) 38vw, 300px"
                  priority
                />
              </div>
            </motion.div>
          </div>

          {/* Mobile buttons — full width below text + image */}
          <div className="flex w-full flex-row gap-2.5 sm:hidden">
            <button
              onClick={onYes}
              className={`${primaryBtnClass} min-h-11 min-w-0 flex-1 px-4 py-3.5 text-[10px] tracking-[0.12em]`}
            >
              Yes
            </button>
            <button
              onClick={onNo}
              className={`${secondaryBtnClass} min-h-11 min-w-0 flex-1 px-4 py-3.5 text-[10px] tracking-[0.12em]`}
              style={{ color: TEXT }}
            >
              Decline
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

type ProposalFlowState =
  | "question"
  | "yes_details"
  | "yes_submitted"
  | "no_clicked"
  | "no_submitted"

interface ProposalPageProps {
  role: ProposalRole
}

export function ProposalPage({ role }: ProposalPageProps) {
  const siteConfig = useSiteConfig()
  const [isReady, setIsReady] = useState(false)
  const [flowState, setFlowState] = useState<ProposalFlowState>("question")
  const [preferredName, setPreferredName] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [validationError, setValidationError] = useState("")
  const [responses, setResponses] = useState<ProposalResponse[]>([])

  const handleLoadingComplete = useCallback(() => {
    setIsReady(true)
  }, [])

  useEffect(() => {
    fetch("/api/proposal-responses", { cache: "no-store" })
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setResponses(Array.isArray(data) ? data : []))
      .catch(() => setResponses([]))
  }, [])

  const coAttendants = responses
    .filter((r) => r.role === role.id && r.status === "Confirmed")
    .map((r) => r.name || "A Secret Supporter")

  const submitResponse = async (status: "Confirmed" | "Declined", name: string) => {
    const response = await fetch("/api/proposal-responses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        role: role.id,
        name,
        status,
        submittedAt: new Date().toISOString(),
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to submit response")
    }

    window.dispatchEvent(new Event("entourageUpdated"))
  }

  const handleYesSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!preferredName.trim()) {
      setValidationError(
        "Please type your preferred name so we can add it to our invitation."
      )
      return
    }
    setValidationError("")
    setSubmitting(true)

    try {
      await submitResponse("Confirmed", preferredName.trim())
      setFlowState("yes_submitted")
    } catch (err) {
      console.error("Failed to submit confirmation:", err)
    } finally {
      setSubmitting(false)
    }
  }

  const handleNoSubmit = async () => {
    setSubmitting(true)
    try {
      await submitResponse("Declined", "Declined Entourage Offer")
      setFlowState("no_submitted")
    } catch (err) {
      console.error("Failed to submit decline:", err)
    } finally {
      setSubmitting(false)
    }
  }

  const roleSingular = getRoleSingular(role.title)
  const venue = siteConfig.ceremony.location

  return (
    <div
      className="relative isolate flex min-h-screen select-none flex-col items-center justify-center overflow-hidden px-3 py-8 sm:px-6 sm:py-16"
      style={{ background: "var(--color-motif-cream)", ...smg, color: TEXT }}
    >
      {!isReady && <LoadingScreen onComplete={handleLoadingComplete} />}

      <ProposalHeroBackdrop decorVisible={isReady} />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto w-full max-w-2xl lg:max-w-4xl"
      >
        <AnimatePresence mode="wait">
          {flowState === "question" && (
            <motion.div
              key="question-box"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className={cardClass}
            >
              <div className="relative z-10 w-full space-y-3 pt-1 sm:space-y-8 sm:pt-2">
                <ProposalIntroSection venue={venue} />

                <div
                  className="mx-auto max-w-xl space-y-3 border-t border-motif-medium/15 px-1 pt-4 pb-0 text-[13px] leading-[1.75] italic sm:space-y-5 sm:px-0 sm:border-y sm:py-8 sm:text-base sm:leading-[1.8]"
                  style={{ ...smg, color: TEXT_DEEP, opacity: 0.92 }}
                >
                  <p className="text-pretty">
                    &ldquo;As we enter the next chapter of our lives as husband and wife, we seek
                    the guidance and support of special people who have inspired us through their
                    love, wisdom, and example.&rdquo;
                  </p>
                  <p
                    className="text-[11px] leading-relaxed tracking-[0.14em] uppercase not-italic sm:text-sm sm:tracking-[0.2em]"
                    style={{ ...smg, color: TEXT, fontWeight: 600 }}
                  >
                    Because you are a role model of love, laughter, and happily ever after, it
                    would be our honor if you would stand with us and witness our love as our:
                  </p>
                </div>

                <ProposalAskSection
                  roleSingular={roleSingular}
                  description={role.description}
                  coAttendants={coAttendants}
                  onYes={() => setFlowState("yes_details")}
                  onNo={() => setFlowState("no_clicked")}
                />
              </div>
            </motion.div>
          )}

          {flowState === "yes_details" && (
            <motion.form
              key="yes-form"
              onSubmit={handleYesSubmit}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className={cardClass}
            >
              <div className="relative z-10 w-full space-y-4 py-1 sm:space-y-6 sm:py-3">
                <div className="flex justify-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-emerald-200/80 bg-emerald-50/90 shadow-sm backdrop-blur-sm sm:h-12 sm:w-12">
                    <Check className="h-5 w-5 text-emerald-600 sm:h-6 sm:w-6" />
                  </div>
                </div>

                <h2
                  className="mb-2 text-xl italic sm:text-3xl"
                  style={{ ...hps, color: ACCENT, fontSize: "clamp(1.75rem, 6vw, 2.75rem)" }}
                >
                  We are honored to have you as part of our special day.
                </h2>

                <p
                  className="mx-auto max-w-md text-xs leading-relaxed sm:text-sm"
                  style={{ ...smg, color: TEXT }}
                >
                  Thank you for accepting our proposal! Please enter the exact name you would like
                  displayed on our wedding invitation and guestlists:
                </p>

                <div className="mx-auto max-w-md text-left">
                  <label
                    className="mb-2 block text-[10px] font-semibold tracking-widest uppercase sm:text-xs"
                    style={{ ...smg, color: TEXT }}
                  >
                    Your Preferred Name <span style={{ color: ACCENT }}>*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Aunt Maria Clara / Mr. James Bond"
                    value={preferredName}
                    onChange={(e) => setPreferredName(e.target.value)}
                    className="w-full rounded-xl border border-motif-medium/30 bg-white/70 px-4 py-2.5 text-xs font-medium transition-all placeholder:text-motif-medium/40 focus:border-motif-accent focus:ring-2 focus:ring-motif-accent/30 focus:outline-none sm:py-3 sm:text-sm"
                    style={{ ...smg, color: TEXT_DEEP }}
                  />
                  {validationError && (
                    <p className="mt-2 flex items-center gap-1 text-xs font-medium text-rose-500">
                      <span>⚠️</span> {validationError}
                    </p>
                  )}
                </div>

                <div
                  className="mx-auto flex max-w-md flex-col gap-3 border-t pt-4 sm:flex-row"
                  style={{ borderColor: "color-mix(in srgb, var(--color-motif-accent) 20%, transparent)" }}
                >
                  <button type="submit" disabled={submitting} className={`${primaryBtnClass} flex-1`}>
                    {submitting ? "Saving..." : "Submit Response"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFlowState("question")}
                    className={secondaryBtnClass}
                    style={{ ...smg, color: TEXT }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.form>
          )}

          {flowState === "yes_submitted" && (
            <motion.div
              key="yes-success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={cardClass}
            >
              <div className="relative z-10 space-y-4">
                <div className="relative mb-6 flex justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.6 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full border border-motif-accent/30 bg-motif-soft/50 shadow-[0_8px_24px_rgba(15,28,63,0.08)] backdrop-blur-sm"
                    style={{ color: "var(--color-motif-accent)" }}
                  >
                    <Sparkles className="h-8 w-8" />
                  </motion.div>
                </div>

                <h2
                  className="mb-4 leading-none"
                  style={{ ...hps, fontSize: "clamp(2rem, 9vw, 3.5rem)", color: ACCENT }}
                >
                  It&apos;s Official!
                </h2>

                <div className="mx-auto mb-6 max-w-sm rounded-2xl border border-motif-medium/20 bg-white/65 px-6 py-4 shadow-[0_8px_28px_rgba(42,37,32,0.08)] backdrop-blur-sm">
                  <span
                    className="mb-1 block text-[10px] font-semibold tracking-widest uppercase"
                    style={{ ...smg, color: TEXT }}
                  >
                    Registered partner
                  </span>
                  <p
                    className="text-lg font-semibold tracking-wide sm:text-xl"
                    style={{ ...hps, color: ACCENT, fontSize: "clamp(1.5rem, 5vw, 2rem)" }}
                  >
                    {preferredName}
                  </p>
                  <span
                    className="mt-1.5 block text-xs italic"
                    style={{ ...smg, color: TEXT }}
                  >
                    for the position of {role.title}
                  </span>
                </div>

                <p
                  className="mx-auto mb-10 max-w-md text-sm leading-relaxed"
                  style={{ ...smg, color: TEXT }}
                >
                  Thank you so much. Having you stand with us fills our hearts with endless joy
                  and confidence. We can&apos;t wait to celebrate together on our wedding day!
                </p>

                <Link href="/" className={`${primaryBtnClass} inline-block w-full max-w-sm`}>
                  Return to Wedding Page
                </Link>
              </div>
            </motion.div>
          )}

          {flowState === "no_clicked" && (
            <motion.div
              key="no-confirm"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className={cardClass}
            >
              <div className="relative z-10 space-y-4">
                <div className="mb-6 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-rose-200/80 bg-rose-50/90 shadow-sm backdrop-blur-sm">
                    <X className="h-6 w-6 text-rose-500" />
                  </div>
                </div>

                <h2
                  className="mb-4 text-2xl tracking-[0.12em] uppercase sm:text-3xl"
                  style={{ ...smg, color: TEXT_DEEP, fontWeight: 600 }}
                >
                  Thank You for Responding
                </h2>

                <p
                  className="mx-auto mb-10 max-w-lg text-sm leading-relaxed italic sm:text-base"
                  style={{ ...smg, color: TEXT }}
                >
                  &ldquo;Thank you for taking the time to respond. While we&apos;re saddened that
                  you won&apos;t be able to join us in this role, we truly appreciate your support
                  and well wishes as we begin this new chapter together.&rdquo;
                </p>

                <div
                  className="mx-auto flex max-w-xs flex-col gap-3 border-t pt-4 sm:max-w-md sm:flex-row"
                  style={{ borderColor: "color-mix(in srgb, var(--color-motif-accent) 20%, transparent)" }}
                >
                  <button
                    onClick={handleNoSubmit}
                    disabled={submitting}
                    className="flex-1 cursor-pointer rounded-full border border-rose-500 bg-rose-500 px-8 py-4 text-[11px] font-bold tracking-[0.18em] text-white uppercase shadow-md transition-all duration-300 hover:border-rose-600 hover:bg-rose-600 disabled:opacity-50"
                  >
                    {submitting ? "Sending..." : "Send Response"}
                  </button>
                  <button
                    onClick={() => setFlowState("question")}
                    className={secondaryBtnClass}
                    style={{ ...smg, color: TEXT }}
                  >
                    Go Back
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {flowState === "no_submitted" && (
            <motion.div
              key="no-submitted-box"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={cardClass}
            >
              <div className="relative z-10 space-y-4">
                <div className="mb-6 flex justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-motif-accent/30 bg-white/70 shadow-sm backdrop-blur-sm">
                    <Heart className="h-6 w-6" style={{ color: "var(--color-motif-accent)" }} />
                  </div>
                </div>

                <h2
                  className="mb-4 leading-none"
                  style={{ ...hps, fontSize: "clamp(1.75rem, 7vw, 2.75rem)", color: ACCENT }}
                >
                  Response Sent Successfully
                </h2>

                <p
                  className="mx-auto mb-8 max-w-md text-sm leading-relaxed"
                  style={{ ...smg, color: TEXT }}
                >
                  We have received your response. Your love, support, and well wishes mean the
                  world to us regardless. We look forward to celebrating other special milestones
                  with you in the future!
                </p>

                <Link
                  href="/"
                  className={secondaryBtnClass}
                  style={{ ...smg, color: TEXT }}
                >
                  Return to Wedding Page
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <style jsx>{`
        .proposal-base {
          background: ${HERO_BACKGROUND};
        }

        .proposal-wash {
          background:
            radial-gradient(
              ellipse 120% 80% at 50% 0%,
              #FFFFFF 0%,
              color-mix(in srgb, var(--color-motif-cream) 92%, white) 55%,
              var(--color-motif-cream) 100%
            ),
            linear-gradient(
              180deg,
              var(--color-motif-cream) 0%,
              color-mix(in srgb, var(--color-motif-silver) 35%, var(--color-motif-cream)) 100%
            );
        }

        .decor-corner,
        .decor-bottom {
          opacity: 0;
          will-change: transform, opacity;
        }

        .decor-top-left {
          transform: translate(-12%, -12%);
          transition:
            opacity 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.06s,
            transform 1.65s cubic-bezier(0.16, 1, 0.3, 1) 0.06s;
        }

        .decor-top-right {
          transform: translate(12%, -12%);
          transition:
            opacity 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.14s,
            transform 1.65s cubic-bezier(0.16, 1, 0.3, 1) 0.14s;
        }

        .decor-bottom-left {
          transform: translate(-12%, 12%);
          transition:
            opacity 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.22s,
            transform 1.65s cubic-bezier(0.16, 1, 0.3, 1) 0.22s;
        }

        .decor-bottom-right {
          transform: translate(12%, 12%);
          transition:
            opacity 1.35s cubic-bezier(0.16, 1, 0.3, 1) 0.30s,
            transform 1.65s cubic-bezier(0.16, 1, 0.3, 1) 0.30s;
        }

        .decor-bottom {
          transform: translateY(28%);
          transition:
            opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.38s,
            transform 1.55s cubic-bezier(0.16, 1, 0.3, 1) 0.38s;
        }

        .decor-corner.decor-visible,
        .decor-bottom.decor-visible {
          opacity: 1;
          transform: translate(0, 0);
        }

        .particle-field-visible {
          opacity: 1;
        }

        .particle-gradient {
          position: absolute;
          inset: -20%;
          background:
            radial-gradient(circle at 14% 18%, color-mix(in srgb, var(--color-motif-yellow) 14%, transparent) 0%, transparent 40%),
            radial-gradient(circle at 86% 14%, color-mix(in srgb, var(--color-motif-soft) 18%, transparent) 0%, transparent 38%),
            radial-gradient(circle at 78% 82%, color-mix(in srgb, var(--color-motif-accent) 14%, transparent) 0%, transparent 42%),
            radial-gradient(circle at 20% 78%, color-mix(in srgb, var(--color-motif-silver) 20%, transparent) 0%, transparent 38%),
            radial-gradient(circle at 50% 50%, color-mix(in srgb, var(--color-motif-cream) 22%, transparent) 0%, transparent 52%);
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
          0%, 100% { opacity: 0.12; }
          50% { opacity: 0.45; }
        }

        @keyframes gradientBreath {
          0% { transform: scale(1) translate3d(0, 0, 0); }
          100% { transform: scale(1.05) translate3d(0, -1%, 0); }
        }

        @keyframes particleDrift {
          0% { transform: translate3d(calc(-50% + 0px), calc(-50% + 0px), 0); }
          100% {
            transform: translate3d(
              calc(-50% + var(--drift-x, 12px)),
              calc(-50% + var(--drift-y, -18px)),
              0
            );
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .particle-gradient,
          .particle-orb,
          .particle-spark {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
