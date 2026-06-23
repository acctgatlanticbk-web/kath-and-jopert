"use client"

import type React from "react"
import { Section } from "@/components/section"
import { useSiteConfig } from "@/hooks/use-site-config"
import type { SiteConfig } from "@/lib/site-config"
import { MapPin } from "lucide-react"
import { motion } from "motion/react"
import { Cormorant_Garamond, Cinzel } from "next/font/google"
import { CloudinaryImage } from "@/components/ui/cloudinary-image"

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400"],
})

// Colors sourced from globals.css @theme inline — edit there to update everywhere
// This section sits on a darker background, so render timeline text/icons in white.
const TIMELINE_TEXT = "var(--color-motif-cream)"
// SVG stroke — CSS vars are not valid SVG attributes
const TIMELINE_SVG_STROKE = "#FFFFFF"
// White tint for corner florals — section sits on dark background
const DECO_FILTER_WHITE = "brightness(0) saturate(100%) invert(1)"

/** Soft dark veil — improves cream text/icon contrast over the silk background */
const SECTION_GRADIENT =
  "linear-gradient(180deg, transparent 0%, color-mix(in srgb, #1a1510 18%, transparent) 18%, color-mix(in srgb, #1a1510 38%, transparent) 50%, color-mix(in srgb, #1a1510 18%, transparent) 82%, transparent 100%)"

const READABLE_SHADOW = "0 1px 3px rgba(0,0,0,0.55), 0 2px 10px rgba(0,0,0,0.35)"
const ICON_SHADOW = "drop-shadow(0 2px 6px rgba(0,0,0,0.55)) drop-shadow(0 0 10px rgba(0,0,0,0.35))"

type TimelineIcon = React.ComponentType<React.SVGProps<SVGSVGElement>>

interface TimelineEvent {
  time: string
  title: string
  description?: string
  location?: string
  icon: TimelineIcon
  /** Optional image source to override the default SVG icon for this event. */
  imageSrc?: string
}

function buildTimelineEvents(siteConfig: SiteConfig): TimelineEvent[] {
  const receptionVenue = siteConfig.reception.location

  return [

{
    time: `3:00 PM`,
    title: "Assembly",
    location: `${siteConfig.ceremony.location}`,
    icon: GuestsIcon,
    imageSrc: "/weddingtimeline/assemble.png",
  },  

  {
    time: `3:30 PM`,
    title: "Processional",
    location: `${siteConfig.ceremony.location}`,
    icon: GuestsIcon,
    imageSrc: "/weddingtimeline/arrivalimage.png",
  },  
  {
    time: `4:00 PM`,
    title: "Mass Ceremony",
    location: `${siteConfig.ceremony.location}`,
    icon: RingsIcon,
    imageSrc: "/weddingtimeline/WeddingCeremony.png",
  },
  // {
  //   time: `4:00 PM`,
  //   title: "Post-Nuptial Pictorial",
  //   location: `${siteConfig.ceremony.location}`,
  //   icon: RingsIcon,
  //   imageSrc: "/weddingtimeline/PhotoSession.png",
  // },
  {
    time: `5:30 PM`,
    title: "Cocktail Hour",
    location: receptionVenue,
    icon: CocktailIcon,
    imageSrc: "/weddingtimeline/CockTailHour.png",
  },
  {
    time: "5:30 PM",
    title: "Dances",
    location: receptionVenue,
    icon: FireworksIcon,
    imageSrc: "/weddingtimeline/dance.png",
  },
  {
    time: "8:00 PM",
    title: "Dinner",
    location: receptionVenue,
    icon: DinnerIcon,
    imageSrc: "/weddingtimeline/DinnerService.png",
  },
  {
    time: "10:00 PM",
    title: "Party",
    location: receptionVenue,
    icon: DanceIcon,
    imageSrc: "/weddingtimeline/SendOff.png",
  },
]
}

export function WeddingTimeline() {
  const siteConfig = useSiteConfig()
  const timelineEvents = buildTimelineEvents(siteConfig)
  return (
    <Section
      id="wedding-timeline"
      className="relative py-10 sm:py-12 md:py-16 lg:py-20 overflow-hidden"
    >
      {/* Transparent gradient veil — full section width, no content containers */}
      <div
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen pointer-events-none z-[2]"
        aria-hidden
        style={{ background: SECTION_GRADIENT }}
      />

      {/* Corner floral decoration - white */}
      <div className="absolute inset-0 pointer-events-none z-[1]">
        <CloudinaryImage
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="absolute top-0 left-0 w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] opacity-25"
          style={{ transform: "scaleY(-1)", filter: DECO_FILTER_WHITE }}
          priority={false}
        />
        <CloudinaryImage
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="absolute top-0 right-0 w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] opacity-25"
          style={{ transform: "scaleX(-1) scaleY(-1)", filter: DECO_FILTER_WHITE }}
          priority={false}
        />
        <CloudinaryImage
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="absolute bottom-0 left-0 w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] opacity-25"
          style={{ filter: DECO_FILTER_WHITE }}
          priority={false}
        />
        <CloudinaryImage
          src="/decoration/flower-decoration-left-bottom-corner2.png"
          alt=""
          width={300}
          height={300}
          className="absolute bottom-0 right-0 w-auto h-auto max-w-[140px] sm:max-w-[180px] md:max-w-[220px] opacity-25"
          style={{ transform: "scaleX(-1)", filter: DECO_FILTER_WHITE }}
          priority={false}
        />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-8 sm:mb-10 md:mb-12 px-3 sm:px-4">
        <p
          className={`${cormorant.className} text-[0.85rem] sm:text-base md:text-lg tracking-[0.04em] mb-1`}
          style={{ color: TIMELINE_TEXT, textShadow: READABLE_SHADOW }}
        >
          Wedding Day
        </p>

        <h2
          className={`${cinzel.className} text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[0.95] mb-2`}
          style={{ color: TIMELINE_TEXT, textShadow: READABLE_SHADOW }}
        >
          timeline
        </h2>

        <p
          className={`${cormorant.className} text-[11px] sm:text-sm md:text-base lg:text-lg max-w-xl mx-auto leading-relaxed px-2 opacity-90`}
          style={{ color: TIMELINE_TEXT, textShadow: READABLE_SHADOW }}
        >
          A simple overview of the key moments of our day, from arrival to farewell.
        </p>

        <div className="flex items-center justify-center gap-2 mt-4 sm:mt-5">
          <div
            className="w-10 sm:w-14 md:w-20 h-px opacity-50"
            style={{ backgroundColor: "color-mix(in srgb, var(--color-motif-cream) 55%, transparent)" }}
          />
          <div className="w-1.5 h-1.5 rounded-full opacity-80" style={{ backgroundColor: TIMELINE_TEXT }} />
          <div className="w-1.5 h-1.5 rounded-full opacity-55" style={{ backgroundColor: TIMELINE_TEXT }} />
          <div className="w-1.5 h-1.5 rounded-full opacity-80" style={{ backgroundColor: TIMELINE_TEXT }} />
          <div
            className="w-10 sm:w-14 md:w-20 h-px opacity-50"
            style={{ backgroundColor: "color-mix(in srgb, var(--color-motif-cream) 55%, transparent)" }}
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="relative z-10 max-w-6xl mx-auto px-3 sm:px-5 lg:px-8">
        {/* Center line */}
        <div
          className="absolute left-1/2 -translate-x-1/2 inset-y-0 w-[2px] sm:w-px pointer-events-none opacity-80 z-0"
          style={{
            background:
              "linear-gradient(to bottom, transparent, color-mix(in srgb, var(--color-motif-cream) 60%, transparent), transparent)",
          }}
        />

        <div className="space-y-7 sm:space-y-8 md:space-y-10 lg:space-y-12">
          {timelineEvents.map((event, index) => (
            <TimelineItem key={event.title} event={event} index={index} />
          ))}
        </div>
      </div>
    </Section>
  )
}

function TimelineItem({ event, index }: { event: TimelineEvent; index: number }) {
  const Icon = event.icon
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="relative z-10"
    >
      {/* Desktop: alternating left/right text with opposite-side icon, centered line + dot */}
      <div className="hidden md:grid grid-cols-[1fr_auto_1fr] items-center gap-x-10 lg:gap-x-14">
        {/* Left side */}
        <div className={`${isEven ? "" : "text-right"}`}>
          <div className="flex items-center justify-end gap-4">
            {!isEven ? <TimelineText event={event} align="right" /> : <IconMark Icon={Icon} imageSrc={event.imageSrc} />}
            <div
              className="hidden lg:block w-10 h-px opacity-70"
              style={{ backgroundColor: "color-mix(in srgb, var(--color-motif-cream) 65%, transparent)" }}
            />
          </div>
        </div>

        {/* Center dot */}
        <div className="relative flex items-center justify-center">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: TIMELINE_TEXT }} />
        </div>

        {/* Right side */}
        <div>
          <div className="flex items-center justify-start gap-4">
            <div
              className="hidden lg:block w-10 h-px opacity-70"
              style={{ backgroundColor: "color-mix(in srgb, var(--color-motif-cream) 65%, transparent)" }}
            />
            {isEven ? <TimelineText event={event} align="left" /> : <IconMark Icon={Icon} imageSrc={event.imageSrc} />}
          </div>
        </div>
      </div>

      {/* Mobile: centered line + alternating text/icon */}
      <div className="md:hidden grid grid-cols-[1fr_auto_1fr] items-center gap-x-4 sm:gap-x-6">
        {/* Left side */}
        <div className={`${isEven ? "" : "text-right"}`}>
          <div className="flex items-center justify-end gap-3">
            {!isEven ? <TimelineText event={event} align="right" mobile /> : <IconMark Icon={Icon} imageSrc={event.imageSrc} mobile />}
            <div
              className="w-6 h-px opacity-70"
              style={{ backgroundColor: "color-mix(in srgb, var(--color-motif-cream) 65%, transparent)" }}
            />
          </div>
        </div>

        {/* Center dot */}
        <div className="relative flex items-center justify-center">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: TIMELINE_TEXT }} />
        </div>

        {/* Right side */}
        <div>
          <div className="flex items-center justify-start gap-3">
            <div
              className="w-6 h-px opacity-70"
              style={{ backgroundColor: "color-mix(in srgb, var(--color-motif-cream) 65%, transparent)" }}
            />
            {isEven ? <TimelineText event={event} align="left" mobile /> : <IconMark Icon={Icon} imageSrc={event.imageSrc} mobile />}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function TimelineText({
  event,
  align,
  mobile,
}: {
  event: TimelineEvent
  align: "left" | "right"
  mobile?: boolean
}) {
  const textAlign = align === "right" ? "text-right" : "text-left"
  return (
    <div className={`${textAlign} max-w-md ${align === "right" ? "ml-auto" : "mr-auto"}`}>
      <p
        className={`${cinzel.className} ${
          mobile ? "text-[0.7rem]" : "text-[0.75rem] lg:text-sm"
        } tracking-[0.22em] uppercase`}
        style={{ color: TIMELINE_TEXT, textShadow: READABLE_SHADOW }}
      >
        {event.title}
      </p>
      <p
        className={`${cormorant.className} ${
          mobile ? "text-[0.75rem]" : "text-sm lg:text-base"
        } mt-0.5 opacity-95`}
        style={{ color: TIMELINE_TEXT, textShadow: READABLE_SHADOW }}
      >
        at {event.time}
      </p>

      {event.description && (
        <p
          className={`${cormorant.className} ${
            mobile ? "text-[10px]" : "text-xs lg:text-sm"
          } mt-1.5 leading-relaxed opacity-90`}
          style={{ color: TIMELINE_TEXT, textShadow: READABLE_SHADOW }}
        >
          {event.description}
        </p>
      )}

      {event.location && (
        <div
          className={`mt-1.5 flex items-start gap-1.5 ${align === "right" ? "justify-end" : "justify-start"} opacity-90`}
        >
          <MapPin
            className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
            style={{ color: TIMELINE_TEXT, filter: ICON_SHADOW }}
          />
          <p
            className={`${cormorant.className} ${mobile ? "text-[10px]" : "text-xs lg:text-sm"} leading-relaxed`}
            style={{ color: TIMELINE_TEXT, textShadow: READABLE_SHADOW }}
          >
            {event.location}
          </p>
        </div>
      )}
    </div>
  )
}

function IconMark({
  Icon,
  mobile,
  imageSrc,
}: {
  Icon: TimelineIcon
  mobile?: boolean
  imageSrc?: string
}) {
  if (imageSrc) {
    return (
      <CloudinaryImage
        src={imageSrc}
        alt=""
        width={96}
        height={96}
        className={`${
          mobile ? "w-16 h-16" : "w-18 h-18 lg:w-22 lg:h-22"
        } object-contain`}
        style={{ filter: `${ICON_SHADOW} brightness(0) invert(1)` }}
      />
    )
  }
  
  return (
    <div
      className={`${
        mobile ? "w-14 h-14" : "w-16 h-16 lg:w-18 lg:h-18"
      } rounded-full border bg-white/15 flex items-center justify-center`}
      style={{
        borderColor: "color-mix(in srgb, var(--color-motif-cream) 45%, transparent)",
        filter: ICON_SHADOW,
      }}
    >
      <Icon className={`${mobile ? "w-7 h-7" : "w-8 h-8 lg:w-9 lg:h-9"}`} style={{ color: TIMELINE_TEXT }} />
    </div>
  )
}

/* Hand-drawn–style timeline icons */

const iconStroke = TIMELINE_SVG_STROKE

function GuestsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M11 16a4 4 0 1 0-4-4 4 4 0 0 0 4 4Z" />
      <path d="M21 16a3.5 3.5 0 1 0-3.5-3.5A3.5 3.5 0 0 0 21 16Z" />
      <path d="M4 24.5c1.2-3 3.9-4.5 7-4.5s5.8 1.5 7 4.5" />
      <path d="M17.5 19.5A6 6 0 0 1 26 24" />
    </svg>
  )
}

function RingsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="12" cy="20" r="6" />
      <circle cx="20" cy="20" r="6" />
      <path d="M14 9 16 5l2 4" />
      <path d="M13 7h6" />
    </svg>
  )
}

function FireworksIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 5v4" />
      <path d="M9 7l2.5 2.5" />
      <path d="M23 7 20.5 9.5" />
      <path d="M8 14h4" />
      <path d="M20 14h4" />
      <path d="M11 21 8 24" />
      <path d="M21 21 24 24" />
      <circle cx="16" cy="14" r="3" />
    </svg>
  )
}

function DinnerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="16" cy="16" r="7" />
      <path d="M7 8v12" />
      <path d="M9.5 8v12" />
      <path d="M23 8v12" />
      <path d="M5 24h22" />
    </svg>
  )
}

function CocktailIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 28h16" />
      <path d="M16 28V12" />
      <path d="M10 12h12l-1-4H11l-1 4Z" />
      <circle cx="16" cy="8" r="2" />
      <path d="M12 16h8" />
    </svg>
  )
}

function DanceIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke={iconStroke} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" {...props}>
      <circle cx="10" cy="12" r="3" />
      <circle cx="22" cy="12" r="3" />
      <path d="M10 15v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6" />
      <path d="M12 23v2" />
      <path d="M20 23v2" />
      <path d="M8 18h16" />
      <path d="M16 5v4" />
      <path d="M13 7l3-2 3 2" />
    </svg>
  )
}

