"use client"

import { Section } from "@/components/section"
import { useState, useEffect, type ReactNode } from "react"
import { QRCodeSVG } from "qrcode.react"
import { useSiteConfig } from "@/hooks/use-site-config"
import Image from "next/image"
import { Cinzel, Cormorant_Garamond } from "next/font/google"
import {
  Shirt,
  Clock,
  Utensils,
  Copy,
  Check,
  Navigation,
  Heart,
  Camera,
  X,
  MapPin,
} from "lucide-react"


const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400"],
})

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "600"],
})

// Readable text palette — dark body on cream, sage labels, accent highlights
const detailText = {
  body: "#2a2520",
  heading: "#1a1a1a",
  label: "var(--color-motif-medium)",
  accent: "var(--color-motif-accent)",
} as const

const bodyFont: React.CSSProperties = {
  fontFamily: "'SortsMillGoudy', Georgia, serif",
}

// Slightly compact type inside card containers (not the page header)
const ct = {
  label: "text-[11px] sm:text-xs md:text-sm",
  labelSm: "text-[10px] sm:text-[11px] md:text-xs",
  body: "text-xs sm:text-sm md:text-base",
  bodyMd: "text-xs sm:text-sm md:text-base lg:text-lg",
  bodyLg: "text-sm sm:text-base md:text-lg",
  subhead: "text-xs sm:text-sm md:text-base lg:text-lg",
  time: "text-xs sm:text-sm md:text-base lg:text-xl",
  cardTitle: "text-sm sm:text-lg md:text-xl lg:text-2xl",
  overlayTitle: "text-sm sm:text-lg md:text-xl lg:text-2xl",
  overlaySub: "text-xs sm:text-sm md:text-base",
  month: "text-base sm:text-xl md:text-2xl lg:text-3xl",
  dayNum: "text-2xl sm:text-4xl md:text-5xl lg:text-6xl",
  year: "text-base sm:text-xl md:text-2xl lg:text-3xl",
  sectionTitle: "text-sm sm:text-lg md:text-xl lg:text-2xl",
  attireCardTitle: "text-sm sm:text-lg md:text-xl lg:text-2xl",
  btn: "text-xs sm:text-sm md:text-base",
  noteTitle: "text-xl sm:text-2xl md:text-3xl",
  reminderHead: "text-base sm:text-lg md:text-xl",
  reminderBody: "text-xs sm:text-sm md:text-base lg:text-lg",
} as const

const attireGuide = {
  principalSponsors: {
    image: "/attireGuide/principal-sponsors.png",
    ladies: ["#EDD7B3", "#DCA449", "#EDCCA3"],
    gentlemen: ["#F4D6A6", "#ECC99A", "#F9EBD7"],
  },
  secondarySponsors: {
    image: "/attireGuide/secondary-sponsors.png",
    ladies: ["#F8AFAE", "#FCA77F", "#FC776A"],
    gentlemen: ["#E0AC7D", "#D6C4B5", "#EFD0AB"],
  },
  groomsmen: {
    image: "/attireGuide/groomsmen.png",
    colors: ["#BDBF86", "#979430", "#909E79"],
  },
  bridesmaids: {
    image: "/attireGuide/bridesmaids.png",
    colors: ["#FBAFB5", "#F95483", "#FB6A67", "#FC7406", "#FCB484", "#FDD461", "#D0B2D2"],
  },
  flowerGirlsRingBearers: {
    image: "/attireGuide/flower-girl-and-ring-bearer.png",
    flowerGirls: ["#F8ECDA", "#F4DCBB"],
    ringBearers: ["#F4DBB4", "#EFC796"],
  },
} as const

function ColorPalette({ colors }: { colors: readonly string[] }) {
  const widthClass = colors.length > 4 ? "max-w-md" : "max-w-xs sm:max-w-sm"

  return (
    <div
      className={`mx-auto flex h-8 w-full overflow-hidden rounded-full border-2 border-white sm:h-9 ${widthClass}`}
      role="img"
      aria-label={`Color palette: ${colors.join(", ")}`}
    >
      {colors.map((color) => (
        <div
          key={color}
          className="min-w-0 flex-1"
          style={{ backgroundColor: color }}
          title={color}
        />
      ))}
    </div>
  )
}

function AttirePaletteGroup({
  label,
  colors,
}: {
  label: string
  colors: readonly string[]
}) {
  return (
    <div className="space-y-2 sm:space-y-2.5">
      <p
        className={`${cinzel.className} text-center ${ct.labelSm} uppercase tracking-[0.16em] font-semibold`}
        style={{ color: detailText.label }}
      >
        {label}
      </p>
      <ColorPalette colors={colors} />
    </div>
  )
}

function AttirePaletteSection({ colors }: { colors: readonly string[] }) {
  return <ColorPalette colors={colors} />
}

function AttireCard({
  title,
  image,
  alt,
  children,
}: {
  title: string
  image: string
  alt: string
  children: ReactNode
}) {
  return (
    <div className="relative group">
      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-motif-silver/25 via-motif-accent/5 to-transparent opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-100" />
      <div className="relative overflow-hidden rounded-xl border border-motif-deep/20 bg-motif-cream shadow-[0_16px_40px_rgba(0,0,0,0.14)] transition-all duration-300 hover:border-motif-deep/50 hover:shadow-[0_20px_48px_rgba(0,0,0,0.2)] sm:rounded-2xl">

        <div className="relative w-full aspect-[2176/1741] bg-[#FFF7F6]">
          <Image
            src={image}
            alt={alt}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.02]"
            sizes="(max-width: 1024px) 100vw, 1024px"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#2a2520]/72 via-[#2a2520]/35 to-transparent px-5 pb-5 pt-16 sm:px-8 sm:pb-6 sm:pt-20">
            <div className="mx-auto flex max-w-lg flex-col items-center gap-2">
              <div className="h-px w-12 bg-white/40 sm:w-16" />
              <h4
                className={`${cinzel.className} ${ct.attireCardTitle} text-center uppercase tracking-[0.22em] font-semibold leading-tight text-white drop-shadow-sm`}
              >
                {title}
              </h4>
              <div className="h-px w-12 bg-white/40 sm:w-16" />
            </div>
          </div>
        </div>

        <div className="border-t border-motif-deep/10 bg-motif-cream px-4 py-4 sm:px-6 sm:py-5 md:px-8">
          {children}
        </div>
      </div>
    </div>
  )
}

// Colors sourced from globals.css @theme inline — edit there to update everywhere

export function Details() {
  const siteConfig = useSiteConfig()
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set())
  const [currentCeremonyImageIndex, setCurrentCeremonyImageIndex] = useState(0)
  const [currentReceptionImageIndex, setCurrentReceptionImageIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [rotationOffset, setRotationOffset] = useState(0)
  
  const coupleImages = [
    "/desktop-background/couple (1).webp",
    "/desktop-background/couple (2).webp",
    "/desktop-background/couple (3).webp",
    "/desktop-background/couple (4).webp",
  ]

  const ceremonyImages = siteConfig.ceremony.image
  const receptionImages = siteConfig.reception.image
  const dressCodeColors = siteConfig.dressCode.colors.split(",").map((color) => color.trim())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCeremonyImageIndex((prev) => (prev + 1) % ceremonyImages.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [ceremonyImages.length])

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReceptionImageIndex((prev) => (prev + 1) % receptionImages.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [receptionImages.length])

  // Gentle reminders couple photos — subtle carousel + wobble animation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % coupleImages.length)
      setRotationOffset((prev) => (prev + 10) % 360)
    }, 2600)

    return () => clearInterval(interval)
  }, [coupleImages.length])

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedItems(prev => new Set(prev).add(itemId))
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev)
          newSet.delete(itemId)
          return newSet
        })
      }, 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  // Venue information from site config
  const ceremonyVenueName = siteConfig.ceremony.location
  const ceremonyVenueDetail = ""
  const ceremonyAddress = siteConfig.ceremony.venue
  const ceremonyVenue = `${ceremonyVenueName}, ${ceremonyAddress}`
  const ceremonyMapsLink = siteConfig.ceremony.map

  const receptionVenueName = siteConfig.reception.location
  const receptionVenueDetail = ""
  const receptionAddress = siteConfig.reception.venue
  const receptionVenue = `${receptionVenueName}, ${receptionAddress}`
  const receptionMapsLink = `https://maps.google.com/?q=${encodeURIComponent(receptionVenue)}`

  // Aliases used in the image modal
  const ceremonyLocationFormatted = ceremonyVenueName
  const receptionLocationFormatted = receptionVenueName
  const ceremonyLocation = ceremonyVenue
  const receptionLocation = receptionVenue
  const formattedCeremonyDate = siteConfig.ceremony.date
  const formattedReceptionDate = siteConfig.ceremony.date // reception follows ceremony on same day

  const openInMaps = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer')
  }


  return (
    <Section
      id="details"
      className="relative py-16 sm:py-20 md:py-24 lg:py-28 overflow-hidden bg-motif-cream"
    >
      {/* Semi-transparent overlay for better text readability */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            background: 'linear-gradient(165deg, var(--color-motif-cream) 0%, color-mix(in srgb, var(--color-motif-silver) 14%, transparent) 35%, color-mix(in srgb, var(--color-motif-medium) 6%, transparent) 70%, color-mix(in srgb, var(--color-motif-deep) 3%, transparent) 100%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 15%, var(--color-motif-silver) 0%, transparent 55%)' }}
        />
      </div>

      {/* Corner florals — same as hero */}
      <div className="decor-corner decor-top-left decor-visible pointer-events-none absolute left-0 top-0 z-[2]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/decoration/decoration/left-top-decoration.png" alt="" className="block h-auto w-auto max-w-[130px] sm:max-w-[160px] md:max-w-[210px] lg:max-w-[260px]" />
      </div>
      <div className="decor-corner decor-top-right decor-visible pointer-events-none absolute right-0 top-0 z-[2]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/decoration/decoration/right-top-decoration.png" alt="" className="block h-auto w-auto max-w-[130px] sm:max-w-[160px] md:max-w-[210px] lg:max-w-[260px]" />
      </div>
      <div className="decor-corner decor-bottom-left decor-visible pointer-events-none absolute bottom-0 left-0 z-[2]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/decoration/decoration/left-bottom-decoration.png" alt="" className="block h-auto w-auto max-w-[130px] sm:max-w-[160px] md:max-w-[210px] lg:max-w-[260px]" />
      </div>
      <div className="decor-corner decor-bottom-right decor-visible pointer-events-none absolute bottom-0 right-0 z-[2]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/decoration/decoration/right-bottom-decoration.png" alt="" className="block h-auto w-auto max-w-[130px] sm:max-w-[160px] md:max-w-[210px] lg:max-w-[260px]" />
      </div>
      <div className="decor-bottom decor-visible pointer-events-none absolute bottom-0 left-0 right-0 z-[3] md:hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/decoration/decoration/bottom-center-decoration.png" alt="" className="block h-auto w-full" />
      </div>

      {/* Header */}
      <div className="relative z-10 text-center mb-12 sm:mb-16 md:mb-20 px-4 sm:px-6">
        <div className="flex items-center justify-center gap-2 mb-4 sm:mb-5">
          <div className="h-px w-16 sm:w-24 bg-motif-silver/60" />
          <div className="w-1.5 h-1.5 rounded-full bg-motif-silver shadow-[0_0_18px_color-mix(in_srgb,var(--color-motif-silver)_80%,transparent)]" />
          <div className="h-px w-16 sm:w-24 bg-motif-silver/60" />
        </div>
        <h2
          className="leading-none" style={{
            fontFamily: "var(--font-brittany), cursive",
            fontSize: "clamp(1.85rem, 8vw, 4.5rem)",
            color: "var(--color-motif-deep)",
            letterSpacing: "0.01em",
          }}
        >
          Event Details
        </h2>
        <p
          className={`${cinzel.className} text-sm sm:text-lg md:text-xl font-normal max-w-xl mx-auto leading-relaxed tracking-[0.12em] px-4`}
          style={{ ...bodyFont, color: detailText.body }}
        >
          Everything you need to know about our special day.
        </p>
      </div>

      {/* Venue and Event Information */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 mb-8 sm:mb-12 md:mb-16 space-y-6 sm:space-y-10 md:space-y-14 details-container-inner">
        
        {/* Ceremony & Reception Card — same venue */}
        <div className="relative group">
          {/* Subtle champagne glow on hover */}
          <div className="absolute -inset-1 bg-gradient-to-br from-motif-silver/22 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-lg" />
          
          {/* Main card */}
          <div className="relative bg-motif-cream rounded-xl sm:rounded-2xl overflow-hidden border border-motif-deep/20  shadow-[0_16px_40px_rgba(0,0,0,0.18)] hover:shadow-[0_20px_48px_rgba(0,0,0,0.24)] hover:border-motif-deep/80 transition-all duration-300">
            {/* Venue Image */}
            <div className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-[30rem] overflow-hidden">
              {ceremonyImages.map((src, index) => (
                <div
                  key={src}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                    index === currentCeremonyImageIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <Image
                    src={src}
                    alt={siteConfig.ceremony.location}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1280px"
                    priority={index === 0}
                  />
                </div>
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              
              {/* Venue name overlay */}
              <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 md:bottom-6 md:left-6 right-3 sm:right-4 md:right-6">
                <span className={`${cinzel.className} inline-block mb-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white border border-white/30`}>
                  Ceremony & Reception
                </span>
                <h3 className={`${cinzel.className} ${ct.overlayTitle} font-[family-name:var(--font-crimson)] font-normal text-white mb-0.5 sm:mb-1 drop-shadow-lg uppercase tracking-[0.1em] leading-tight`}>
                  {siteConfig.ceremony.location}
                </h3>
                <p className={`${cinzel.className} ${ct.overlaySub} text-white/90 drop-shadow-md tracking-wide`}>
                  {siteConfig.ceremony.venue}
                </p>
              </div>
            </div>

            {/* Event Details Content */}
            <div className="p-3 sm:p-5 md:p-7 lg:p-9">
              {/* Date Section */}
              <div className="text-center mb-5 sm:mb-8 md:mb-10">
                {/* Day name */}
                <p className={`${cinzel.className} ${ct.label} font-semibold uppercase tracking-[0.18em] mb-2 sm:mb-3`} style={{ color: detailText.label }}>
                  {siteConfig.ceremony.day}
                </p>
                
                {/* Month - Script style with warm gold */}
                <div className="mb-2 sm:mb-4">
                  <p className={`${cinzel.className} ${ct.month} leading-none`} style={{ color: detailText.label }}>
                  {new Date(siteConfig.ceremony.date).toLocaleString('default', { month: 'long' })}
                  </p>
                </div>
                
                {/* Day and Year */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6 md:mb-7">
                  <p className={`${cinzel.className} ${ct.dayNum} font-normal leading-none`} style={{ color: detailText.accent }}>
                  {new Date(siteConfig.ceremony.date).getDate()}
                  </p>
                  <div className="h-10 sm:h-12 md:h-16 lg:h-20 w-[2px] bg-gradient-to-b from-motif-medium via-motif-deep to-motif-medium" />
                  <p className={`${cinzel.className} ${ct.year} font-light leading-none`} style={{ color: detailText.heading }}>
                  {new Date(siteConfig.ceremony.date).getFullYear()}
                  </p>
                </div>

                {/* Decorative line */}
                <div className="flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="h-[1px] w-8 sm:w-10 md:w-14 bg-gradient-to-r from-transparent via-motif-medium to-motif-medium" />
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-motif-medium rounded-full" />
                  <div className="h-[1px] w-8 sm:w-10 md:w-14 bg-gradient-to-l from-transparent via-motif-medium to-motif-medium" />
                </div>

                {/* Schedule — ceremony & reception, same venue */}
                <div className="mx-auto max-w-sm">
                  <div className="overflow-hidden rounded-xl border border-motif-deep/15 bg-motif-cream/40 shadow-sm">
                    <div className="grid grid-cols-2 divide-x divide-motif-deep/10">
                      <div className="px-3 py-3 sm:px-4 sm:py-4 text-center">
                        <p className={`${cinzel.className} ${ct.labelSm} font-semibold uppercase tracking-[0.16em] mb-1.5 sm:mb-2`} style={{ color: detailText.label }}>
                          Ceremony
                        </p>
                        <p className={`${cinzel.className} ${ct.time} font-semibold tracking-wide`} style={{ color: detailText.heading }}>
                          {siteConfig.ceremony.time}
                        </p>
                      </div>
                      <div className="px-3 py-3 sm:px-4 sm:py-4 text-center">
                        <p className={`${cinzel.className} ${ct.labelSm} font-semibold uppercase tracking-[0.16em] mb-1.5 sm:mb-2`} style={{ color: detailText.label }}>
                          Reception
                        </p>
                        <p className={`${cinzel.className} ${ct.time} font-semibold tracking-wide`} style={{ color: detailText.heading }}>
                          {siteConfig.reception.time}
                        </p>
                      </div>
                    </div>
                  </div>
                  {/* <p className={`${cormorant.className} mt-3 sm:mt-4 ${ct.body} italic leading-relaxed`} style={{ ...bodyFont, color: detailText.label }}>
                    Both held at the same venue
                  </p> */}
                </div>
              </div>

              {/* Location Details */}
              <div className="bg-gradient-to-br from-motif-cream/40 to-motif-cream rounded-xl p-3 sm:p-4 md:p-5 mb-4 sm:mb-6 border border-motif-deep/15">
                <div className="flex items-start gap-2 sm:gap-3 md:gap-4">
                  <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mt-0.5 flex-shrink-0" style={{ color: detailText.accent }} />
                  <div className="flex-1 min-w-0">
                    <p className={`${ct.label} font-[family-name:var(--font-crimson)] font-semibold mb-1.5 sm:mb-2 uppercase tracking-wide`} style={{ color: detailText.label }}>
                      Ceremony & Reception Venue
                    </p>
                    <p className={`${cinzel.className} ${ct.bodyMd} font-[family-name:var(--font-crimson)] leading-relaxed`} style={{ color: detailText.body }}>
                      {ceremonyVenueName}
                    </p>
                    {ceremonyVenueDetail && (
                      <p className={`${cinzel.className} ${ct.body} font-[family-name:var(--font-crimson)] leading-relaxed mt-1`} style={{ color: detailText.label }}>
                        {ceremonyVenueDetail}
                      </p>
                    )}
                    <p className={`${cinzel.className} ${ct.body} font-[family-name:var(--font-crimson)] leading-relaxed`} style={{ color: detailText.body }}>
                      {ceremonyAddress}
                    </p>
                  </div>
                  {/* QR Code for Ceremony - Right side */}
                  <div className="flex flex-col items-center gap-1.5 sm:gap-2 flex-shrink-0">
                    <div className="bg-motif-cream p-1.5 sm:p-2 md:p-2.5 rounded-lg border border-motif-deep/20 shadow-sm">
                      <QRCodeSVG
                        value={ceremonyMapsLink}
                        size={80}
                        level="M"
                        includeMargin={false}
                        fgColor="var(--color-motif-deep)"
                        bgColor="var(--color-motif-cream)"
                      />
                    </div>
                    <p className={`${ct.label} font-[family-name:var(--font-crimson)] italic text-center max-w-[90px]`} style={{ color: detailText.label }}>
                      Scan for directions
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4">
                <button
                  onClick={() => openInMaps(ceremonyMapsLink)}
                  className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 md:py-3.5 bg-motif-deep hover:bg-motif-accent text-motif-cream rounded-lg font-[family-name:var(--font-crimson)] font-semibold ${ct.btn} transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] premium-shadow`}
                  aria-label="Get directions to ceremony and reception venue"
                >
                  <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                  <span>Get Directions</span>
                </button>
                <button
                  onClick={() => copyToClipboard(ceremonyVenue, 'ceremony')}
                  className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 sm:py-3 md:py-3.5 bg-motif-cream border-2 border-motif-deep/30 hover:border-motif-deep/50 hover:bg-motif-silver/20 rounded-lg font-[family-name:var(--font-crimson)] font-semibold ${ct.btn} transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`}
                  style={{ color: detailText.heading }}
                  aria-label="Copy ceremony and reception venue address"
                >
                  {copiedItems.has('ceremony') ? (
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0 text-motif-deep" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 flex-shrink-0" />
                  )}
                  <span>{copiedItems.has('ceremony') ? 'Copied!' : 'Copy Address'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Attire Guidelines */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 details-container-inner">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5">
            <div className="h-px w-10 sm:w-14 md:w-20 bg-motif-silver/60" />
            <Shirt className="w-5 h-5 sm:w-6 sm:h-6 text-motif-silver" />
            <div className="h-px w-10 sm:w-14 md:w-20 bg-motif-silver/60" />
          </div>
          <h3
            className={`${cinzel.className} ${ct.sectionTitle} uppercase tracking-[0.2em] font-semibold leading-tight`}
            style={{ color: detailText.heading }}
          >
            Attire Guidelines
          </h3>
          <div className="flex justify-center mt-3 sm:mt-4 mb-3 sm:mb-4">
            {/* <span
              className={`${cinzel.className} inline-flex items-center gap-2 px-5 py-1.5 sm:py-2 rounded-full bg-motif-deep text-motif-cream text-[10px] sm:text-xs tracking-[0.22em] uppercase font-semibold shadow-md`}
            >
              {siteConfig.dressCode.theme}
            </span> */}
          </div>
          <p className={`${ct.bodyLg} font-normal leading-relaxed`} style={{ ...bodyFont, color: detailText.body }}>
            Please dress according to the guidelines below.
          </p>
        </div>

        {/* Attire cards */}
        <div className="space-y-6 sm:space-y-8 md:space-y-10 mb-6 sm:mb-8 md:mb-10">

          <AttireCard
            title="Principal Sponsors"
            image={attireGuide.principalSponsors.image}
            alt="Principal sponsor attire"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              <AttirePaletteGroup label="Ladies" colors={attireGuide.principalSponsors.ladies} />
              <AttirePaletteGroup label="Gentlemen" colors={attireGuide.principalSponsors.gentlemen} />
            </div>
          </AttireCard>

          <AttireCard
            title="Secondary Sponsors"
            image={attireGuide.secondarySponsors.image}
            alt="Secondary sponsor attire"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              <AttirePaletteGroup label="Ladies" colors={attireGuide.secondarySponsors.ladies} />
              <AttirePaletteGroup label="Gentlemen" colors={attireGuide.secondarySponsors.gentlemen} />
            </div>
          </AttireCard>

          <AttireCard
            title="Groomsmen"
            image={attireGuide.groomsmen.image}
            alt="Groomsmen attire"
          >
            <AttirePaletteSection colors={attireGuide.groomsmen.colors} />
          </AttireCard>

          <AttireCard
            title="Bridesmaids"
            image={attireGuide.bridesmaids.image}
            alt="Bridesmaids attire"
          >
            <AttirePaletteSection colors={attireGuide.bridesmaids.colors} />
          </AttireCard>

          <AttireCard
            title="Flower Girls / Ring Bearers"
            image={attireGuide.flowerGirlsRingBearers.image}
            alt="Flower girls and ring bearers attire"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6">
              <AttirePaletteGroup label="Flower Girls" colors={attireGuide.flowerGirlsRingBearers.flowerGirls} />
              <AttirePaletteGroup label="Ring Bearers" colors={attireGuide.flowerGirlsRingBearers.ringBearers} />
            </div>
          </AttireCard>
        </div>

        {/* Dress code restrictions */}
        <div className="mb-8 sm:mb-10 md:mb-12 p-4 sm:p-5 md:p-6 rounded-xl sm:rounded-2xl bg-motif-cream/60 border border-motif-deep/15 shadow-sm">
          <p className={`${cinzel.className} ${ct.label} uppercase tracking-[0.18em] text-center mb-3 sm:mb-4 font-semibold`} style={{ color: detailText.label }}>
            Please Note
          </p>
          <ul className="space-y-2 sm:space-y-3 max-w-2xl mx-auto">
            {[
              "Semi Formal Attire",
              "We kindly request that all guests honor the dress code by avoiding overly casual attire, such as t-shirts, slippers, denim, and jeans.",
              "Please adhere to the specified dress code and color motif provided. Dressing accordingly is deeply appreciated, as it will contribute to the elegance and harmony of our celebration.",
              "We look forward to seeing you in your finest that complements our chosen theme!",
            ].map((note, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-motif-deep/40" />
                <p className={`${ct.body} font-[family-name:var(--font-crimson)] leading-relaxed`} style={{ color: detailText.body }}>{note}</p>
              </li>
            ))}
          </ul>
        </div>

     {/* Gentle Reminders Container */}
     <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-5 mt-8 sm:mt-12 md:mt-16 details-container-inner">
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-motif-cream/40 bg-motif-cream backdrop-blur-lg shadow-[0_18px_40px_color-mix(in_srgb,var(--color-motif-cream)_15%,transparent)]">
          {/* Content */}
          <div className="relative z-10 px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-10">
            {/* Animated couple photos carousel */}
            <div className="flex justify-center gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
              {coupleImages.map((image, index) => {
                const isActive = index === currentImageIndex
                // Alternate rotation: -5deg, 5deg, -3deg, 3deg for variety
                const baseRotation = index === 0 ? -5 : index === 1 ? 5 : index === 2 ? -3 : 3
                // Add gentle rotation animation for active image
                const currentRotation = isActive 
                  ? baseRotation + Math.sin(rotationOffset * Math.PI / 180) * 2 
                  : baseRotation
                
                return (
                  <div
                    key={index}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-lg overflow-hidden border-2 border-motif-deep/30 shadow-lg transition-all duration-700 ease-in-out ${
                      isActive ? 'scale-110 z-10' : 'scale-100 opacity-70'
                    }`}
                    style={{
                      transform: `rotate(${currentRotation}deg) ${isActive ? 'scale(1.1)' : 'scale(1)'}`,
                    }}
                  >
                    <Image
                      src={image}
                      alt={`Wedding couple ${index + 1}`}
                      fill
                      className={`object-cover transition-opacity duration-500 ${
                        isActive ? 'opacity-100' : 'opacity-70'
                      }`}
                      sizes="(max-width: 640px) 64px, (max-width: 768px) 80px, 96px"
                    />
                  </div>
                )
              })}
            </div>

            {/* Title */}
            <h3 className={`${cinzel.className} ${ct.noteTitle} text-center mb-6 sm:mb-8 font-normal tracking-wide`} style={{ color: detailText.accent }}>
              GENTLE REMINDERS
            </h3>

            {/* Reminders List */}
            <div className="space-y-4 sm:space-y-5 md:space-y-6 max-w-2xl mx-auto">
               {/* No Kinds */}
               {/* <div className="bg-motif-cream/60 rounded-lg p-4 sm:p-5 md:p-6 border border-motif-deep/10 shadow-sm">
                <h4 className={`${cinzel.className} ${ct.reminderHead} font-semibold mb-2 sm:mb-3`} style={{ color: detailText.heading }}>
                Adults-Only Celebration
                </h4>
                <p className={`${cormorant.className} ${ct.reminderBody} leading-relaxed`} style={{ ...bodyFont, color: detailText.body }}>
                We kindly request that our wedding be an adults-only occasion. We hope this allows everyone to relax and fully enjoy the celebration with us.
                </p>
              </div> */}
              {/* Unplugged Ceremony Reminder */}
              <div className="bg-motif-cream/60 rounded-lg p-4 sm:p-5 md:p-6 border border-motif-deep/10 shadow-sm">
                <h4 className={`${cinzel.className} ${ct.reminderHead} font-semibold mb-2 sm:mb-3`} style={{ color: detailText.heading }}>
                Unplugged Ceremony

                </h4>
                <p className={`${cormorant.className} ${ct.reminderBody} leading-relaxed`} style={{ ...bodyFont, color: detailText.body }}>
                We&apos;re having a mostly unplugged ceremony. Guests may take photos, but we kindly ask that it be kept minimal. Please avoid blocking or crowding our official photographers so they can capture the special moments. We&apos;d love for everyone to stay present and share the moment with us. Don&apos;t worry—professional photos will be shared with you after the event. Thank you for your understanding 
                </p>
              </div>

              {/* Arrival Reminder */}
              {/* <div className="bg-motif-cream/60 rounded-lg p-4 sm:p-5 md:p-6 border border-motif-deep/10 shadow-sm">
                <h4 className={`${cinzel.className} ${ct.reminderHead} font-semibold mb-2 sm:mb-3`} style={{ color: detailText.heading }}>
                Arrival
                </h4>
                <p className={`${cormorant.className} ${ct.reminderBody} leading-relaxed`} style={{ ...bodyFont, color: detailText.body }}>
                To ensure everything runs smoothly, please arrive at least 30 minutes before the ceremony starts. The program will begin at {siteConfig.ceremony.time}, so we kindly ask everyone to arrive by {siteConfig.ceremony.guestsTime} minutes. This will give you time to find your seat, take in the beautiful setup, and be fully present for our special moment
                </p>
              </div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Image Modal */}
      {showImageModal && (
        <div
          className="fixed inset-0 backdrop-blur-xl z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-500"
          onClick={() => setShowImageModal(null)}
          style={{ backgroundColor: "rgba(91,102,85,0.96)" }}
        >
          {/* Decorative background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
              style={{ backgroundColor: "var(--color-motif-cream)", opacity: 0.12 }}
            />
            <div
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse"
              style={{ backgroundColor: "var(--color-motif-cream)", opacity: 0.14, animationDelay: "1s" }}
            />
          </div>

          <div
            className="relative max-w-6xl w-full max-h-[95vh] sm:max-h-[90vh] bg-motif-deep rounded-3xl overflow-hidden shadow-2xl border-2 animate-in zoom-in-95 duration-500 group"
            onClick={(e) => e.stopPropagation()}
            style={{ borderColor: "var(--color-motif-cream)" }}
          >
            {/* Decorative top accent */}
            <div
              className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r"
              style={{ background: "linear-gradient(to right, var(--color-motif-cream), var(--color-motif-cream), var(--color-motif-deep))" }}
            />

            {/* Enhanced close button */}
            <button
              onClick={() => setShowImageModal(null)}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 md:top-6 md:right-6 z-20 hover:bg-motif-accent backdrop-blur-sm p-2.5 sm:p-3 rounded-xl shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl active:scale-95 border-2 group/close"
              title="Close (ESC)"
              style={{ backgroundColor: "var(--color-motif-deep)", borderColor: "var(--color-motif-cream)", color: "var(--color-motif-cream)" }}
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 group-hover/close:text-[#E1D5C7] transition-colors" />
            </button>

            {/* Venue badge */}
            <div className="absolute top-4 left-4 sm:top-5 sm:left-5 md:top-6 md:left-6 z-20">
              <div
                className="flex items-center gap-2 backdrop-blur-md px-4 py-2 rounded-full shadow-xl border-2"
                style={{ backgroundColor: "var(--color-motif-deep)", borderColor: "var(--color-motif-cream)" }}
              >
                {showImageModal === "ceremony" ? (
                  <>
                    <Heart className="w-4 h-4" fill="var(--color-motif-cream)" style={{ color: "var(--color-motif-cream)" }} />
                    <span className="text-xs sm:text-sm font-bold text-motif-cream">
                      Ceremony & Reception
                    </span>
                  </>
                ) : (
                  <>
                    <Utensils className="w-4 h-4 text-motif-cream" />
                    <span className="text-xs sm:text-sm font-bold text-motif-cream">
                      Reception Venue
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Image section with enhanced effects */}
            <div
              className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] overflow-hidden"
              style={{ backgroundColor: "var(--color-motif-deep)" }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-1000 z-0" />

              <Image
                src={showImageModal === "ceremony" ? "/Details/ceremony&location.jpg" : "/Details/Kayama Mountain Resort And Events Place, Sitio Kaytuyang, Brgy. Aga Nasugbu, Batangas.png"}
                alt={showImageModal === "ceremony" ? ceremonyLocationFormatted : receptionLocationFormatted}
                fill
                className="object-contain p-6 sm:p-8 md:p-10 transition-transform duration-700 group-hover:scale-105 z-10"
                sizes="95vw"
                priority
              />
            </div>

            {/* Enhanced content section */}
            <div
              className={`${cormorant.className} p-5 sm:p-6 md:p-8 bg-motif-deep backdrop-blur-sm border-t-2 relative`}
              style={{ borderColor: "var(--color-motif-cream)" }}
            >
              {/* Decorative line */}
              <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-motif-cream/30 to-transparent" />

              <div className="space-y-5">
                {/* Header with venue info */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-2">
                    <h3
                      className={`${cinzel.className} text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-3`}
                      style={{ color: "var(--color-motif-cream)" }}
                    >
                      {showImageModal === "ceremony" ? (
                        <Heart className="w-6 h-6 text-motif-cream" fill="var(--color-motif-cream)" />
                      ) : (
                        <Utensils className="w-6 h-6 text-motif-cream" />
                      )}
                      {showImageModal === "ceremony" ? siteConfig.ceremony.venue : siteConfig.reception.venue}
                    </h3>
                    <div className="flex items-center gap-2 text-sm opacity-70 text-motif-cream">
                      <MapPin className="w-4 h-4 text-motif-cream" />
                      <span>
                        {showImageModal === "ceremony"
                          ? ceremonyLocationFormatted
                          : receptionLocationFormatted}
                      </span>
                    </div>

                    {/* Date & Time info */}
                    {showImageModal === "ceremony" && (
                      <div className="space-y-2">
                        <div
                          className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border"
                          style={{
                            color: "var(--color-motif-cream)",
                            backgroundColor: "var(--color-motif-deep)",
                            opacity: 0.9,
                            borderColor: "var(--color-motif-cream)",
                          }}
                        >
                          <Clock className="w-4 h-4 text-motif-cream shrink-0" />
                          <span>
                            Ceremony — {formattedCeremonyDate} at {siteConfig.ceremony.time}
                          </span>
                        </div>
                        <div
                          className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border"
                          style={{
                            color: "var(--color-motif-cream)",
                            backgroundColor: "var(--color-motif-deep)",
                            opacity: 0.9,
                            borderColor: "var(--color-motif-cream)",
                          }}
                        >
                          <Utensils className="w-4 h-4 text-motif-cream shrink-0" />
                          <span>
                            Reception — {formattedReceptionDate} at {siteConfig.reception.time}
                          </span>
                        </div>
                      </div>
                    )}
                    {showImageModal === "reception" && (
                      <div
                        className="flex items-center gap-2 text-sm font-medium px-3 py-2 rounded-lg border"
                        style={{
                          color: "var(--color-motif-cream)",
                          backgroundColor: "var(--color-motif-deep)",
                          opacity: 0.9,
                          borderColor: "var(--color-motif-cream)",
                        }}
                      >
                        <Clock className="w-4 h-4 text-motif-cream" />
                        <span>
                          {formattedReceptionDate} - {siteConfig.reception.time}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                    <button
                      onClick={() =>
                        copyToClipboard(
                          showImageModal === "ceremony"
                            ? ceremonyLocation
                            : receptionLocation,
                          `modal-${showImageModal}`,
                        )
                      }
                      className="flex items-center justify-center gap-2 px-4 py-2.5 sm:px-5 sm:py-3 bg-motif-deep border-2 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95 shadow-md hover:bg-motif-accent whitespace-nowrap text-motif-cream"
                      title="Copy address"
                      style={{ borderColor: "var(--color-motif-cream)" }}
                    >
                      {copiedItems.has(`modal-${showImageModal}`) ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          <span>Copy Address</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() =>
                        openInMaps(showImageModal === "ceremony" ? ceremonyMapsLink : receptionMapsLink)
                      }
                      className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 shadow-lg whitespace-nowrap bg-motif-cream text-motif-deep"
                    >
                      <Navigation className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span>Get Directions</span>
                    </button>
                  </div>
                </div>

                {/* Additional info */}
                  <div className="flex items-center gap-2 text-xs opacity-65 text-motif-cream">
                  <span className="flex items-center gap-1.5">
                    <Camera className="w-3 h-3" />
                    Click outside to close
                  </span>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline-flex items-center gap-1.5">Press ESC to close</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
     
      </div>
    </Section>
  )
}