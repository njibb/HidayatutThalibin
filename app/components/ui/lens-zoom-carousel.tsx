/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client"

import * as React from "react"

export type LandPalette = "dawn" | "alpine" | "dusk" | "mist"

export type Slide = {
  image?: string
  title?: string
  caption?: string
  alt?: string
  palette?: LandPalette
  seed?: number
  link?: string
}

export type LensZoomCarouselProps = {
  slides?: Slide[]
  height?: number | string
  duration?: number
  depth?: number
  autoplay?: number
  ink?: string
  onChange?: (index: number) => void
  className?: string
  style?: React.CSSProperties
  ariaLabel?: string
}

export function wrap(i: number, n: number): number {
  return n ? ((i % n) + n) % n : 0
}

export function ghostScale(depth: number, g: number): number {
  return depth + (depth - 1) * 0.6 * (g + 1)
}

export function pad2(n: number): string {
  return n < 10 ? "0" + n : String(n)
}

const PALETTES = {
  dawn: { top: "#e7b7a5", bottom: "#f8e8d6", sun: "#fff4df", far: "#d2b2bb", near: "#3a2a3b", mist: "255,240,232" },
  alpine: { top: "#7ea5c8", bottom: "#e3ecf2", sun: "#ffffff", far: "#a9bfd0", near: "#1c3044", mist: "236,244,250" },
  dusk: { top: "#2a2450", bottom: "#ef8d60", sun: "#ffd9a6", far: "#93607c", near: "#18121f", mist: "255,196,160" },
  mist: { top: "#c4d0cb", bottom: "#eef1ec", sun: "#ffffff", far: "#aebcb5", near: "#2c3a33", mist: "246,248,245" },
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
function hexRgb(h: string): [number, number, number] {
  const v = parseInt(h.replace("#", ""), 16)
  return [(v >> 16) & 255, (v >> 8) & 255, v & 255]
}
function mixRgb(a: string, b: string, t: number): string {
  const A = hexRgb(a)
  const B = hexRgb(b)
  return "rgb(" + A.map((v, i) => Math.round(v + (B[i] - v) * t)).join(",") + ")"
}

function paintLandscape(seed: number, palette: LandPalette, w = 1600, h = 1000): string {
  if (typeof document === "undefined") return ""
  const c = document.createElement("canvas")
  c.width = w
  c.height = h
  const g = c.getContext("2d")
  if (!g) return ""
  const P = PALETTES[palette] ?? PALETTES.dawn
  const r = mulberry32(seed * 104729 + 7)

  const sky = g.createLinearGradient(0, 0, 0, h * 0.72)
  sky.addColorStop(0, P.top)
  sky.addColorStop(1, P.bottom)
  g.fillStyle = sky
  g.fillRect(0, 0, w, h)
  const sx = w * (0.22 + r() * 0.56)
  const sy = h * (0.26 + r() * 0.16)
  const halo = g.createRadialGradient(sx, sy, 0, sx, sy, w * 0.45)
  halo.addColorStop(0, "rgba(" + hexRgb(P.sun).join(",") + ",.85)")
  halo.addColorStop(0.08, "rgba(" + hexRgb(P.sun).join(",") + ",.55)")
  halo.addColorStop(1, "rgba(" + hexRgb(P.sun).join(",") + ",0)")
  g.fillStyle = halo
  g.fillRect(0, 0, w, h)
  g.fillStyle = P.sun
  g.beginPath()
  g.arc(sx, sy, h * 0.045, 0, Math.PI * 2)
  g.fill()

  const layers = 5
  for (let L = 0; L < layers; L++) {
    const k = L / (layers - 1)
    const base = h * (0.42 + k * 0.4)
    const amp = h * (0.07 + k * 0.1)
    const ph = [r(), r(), r(), r()].map((v) => v * Math.PI * 2)
    const fr = [1.3 + r(), 3.1 + r() * 2, 7 + r() * 4, 17 + r() * 8]
    const ridge = (x: number) => {
      const u = x / w
      return (
        base -
        amp *
          (0.55 * Math.sin(u * fr[0] + ph[0]) +
            0.28 * Math.sin(u * fr[1] + ph[1]) +
            0.12 * Math.abs(Math.sin(u * fr[2] + ph[2])) +
            0.05 * Math.sin(u * fr[3] + ph[3]))
      )
    }
    const mist = g.createLinearGradient(0, base - amp * 1.4, 0, base + amp * 0.4)
    mist.addColorStop(0, "rgba(" + P.mist + ",0)")
    mist.addColorStop(1, "rgba(" + P.mist + "," + (0.55 - k * 0.35).toFixed(2) + ")")
    g.fillStyle = mist
    g.fillRect(0, base - amp * 1.4, w, amp * 1.8)
    const body = g.createLinearGradient(0, base - amp, 0, h)
    body.addColorStop(0, mixRgb(P.far, P.near, Math.pow(k, 1.3)))
    body.addColorStop(1, mixRgb(P.far, P.near, Math.min(1, Math.pow(k, 1.3) + 0.18)))
    g.fillStyle = body
    g.beginPath()
    g.moveTo(0, h)
    for (let x = 0; x <= w; x += 6) g.lineTo(x, ridge(x))
    g.lineTo(w, h)
    g.closePath()
    g.fill()
  }
  return c.toDataURL("image/jpeg", 0.88)
}

function useSlideImages(slides: Slide[]): string[] {
  const key = slides.map((s) => s.image || (s.palette || "dawn") + ":" + (s.seed ?? 1)).join("|")
  const [painted, setPainted] = React.useState(() => slides.map(() => ""))
  React.useEffect(() => {
    setPainted(slides.map((s, i) => (s.image ? "" : paintLandscape(s.seed ?? i + 1, s.palette || "dawn"))))
  }, [key, slides])
  return slides.map((s, i) => s.image || painted[i] || "")
}

const LZ_CSS = [
  ".lz-root{position:relative;width:100%;height:100vh;overflow:hidden;background:#0d0d0f;color:var(--lz-ink);user-select:none;-webkit-user-select:none;touch-action:pan-y;outline:none}",
  ".lz-root:focus-visible{box-shadow:inset 0 0 0 2px var(--lz-ink)}",
  ".lz-base{position:absolute;inset:0;transition:filter .9s ease,transform 1.4s cubic-bezier(.2,.7,.2,1)}",
  ".lz-root[data-moving='1'] .lz-base{filter:brightness(.42);transform:scale(1.04)}",
  ".lz-img{position:absolute;inset:0;width:100%;height:100%;max-width:none;object-fit:cover;display:block;pointer-events:none}",
  ".lz-in{position:absolute;inset:0;overflow:hidden;animation:lz-show var(--lz-d) cubic-bezier(.2,.75,.2,1) both}",
  ".lz-main{animation:lz-zoom var(--lz-d) cubic-bezier(.16,.8,.2,1) both}",
  ".lz-ghost{opacity:0;mix-blend-mode:screen;animation:lz-ghost var(--lz-d) cubic-bezier(.16,.8,.2,1) both}",
  ".lz-shade{position:absolute;inset:auto 0 0 0;height:55%;background:linear-gradient(to top,rgba(0,0,0,.8),rgba(0,0,0,0));pointer-events:none}",
  ".lz-text{position:absolute;left:clamp(20px,4vw,56px);bottom:clamp(44px,8vh,80px);right:clamp(140px,20vw,280px);pointer-events:none}",
  ".lz-line{display:block;overflow:hidden;padding-bottom:.08em}",
  ".lz-line>span{display:block;animation:lz-rise .9s cubic-bezier(.2,.8,.2,1) both}",
  ".lz-title{font:500 clamp(28px,4.5vw,64px)/1.1 ui-serif,Georgia,'Times New Roman',serif;letter-spacing:-.02em}",
  ".lz-cap{margin-top:12px;font:400 14px/1.4 ui-sans-serif,system-ui,sans-serif;opacity:.88;max-width:44ch}",
  ".lz-cap>span{animation-delay:.08s}",
  ".lz-nav{position:absolute;right:clamp(20px,4vw,56px);bottom:clamp(44px,8vh,80px);display:flex;align-items:center;gap:14px; z-index:10}",
  ".lz-count{font:500 12px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.14em}",
  ".lz-btn{appearance:none;width:44px;height:44px;border-radius:50%;border:1px solid color-mix(in srgb,var(--lz-ink) 45%,transparent);background:transparent;color:inherit;display:grid;place-items:center;cursor:pointer;transition:background .2s ease,color .2s ease}",
  ".lz-btn:hover{background:var(--lz-ink);color:#0d0d0f}",
  ".lz-btn:focus-visible{outline:2px solid var(--lz-ink);outline-offset:2px}",
  ".lz-link{display:inline-flex;align-items:center;gap:8px;margin-top:20px;padding:10px 20px;background:white;color:black;border-radius:9999px;font-weight:600;font-size:14px;pointer-events:auto;transition:transform .2s ease,background .2s ease}",
  ".lz-link:hover{background:#f3f4f6;transform:scale(1.05)}",
  ".lz-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}",
  "@keyframes lz-show{from{opacity:0}35%{opacity:1}to{opacity:1}}",
  "@keyframes lz-zoom{from{transform:scale(var(--lz-depth));filter:blur(14px) brightness(1.2)}to{transform:none;filter:none}}",
  "@keyframes lz-ghost{from{transform:scale(var(--lz-g));opacity:.4;filter:blur(6px)}to{transform:scale(1);opacity:0;filter:blur(0)}}",
  "@keyframes lz-rise{from{transform:translateY(105%)}to{transform:none}}",
  "@keyframes lz-fade{from{opacity:0}to{opacity:1}}",
].join("\n")

export default function LensZoomCarousel({
  slides = [],
  height = "550px",
  duration = 1050,
  depth = 1.35,
  ink = "#ffffff",
  onChange,
  className,
  style,
  ariaLabel = "Unit Pendidikan carousel",
}: LensZoomCarouselProps) {
  const n = slides.length
  const srcs = useSlideImages(slides)
  const [index, setIndex] = React.useState(0)
  const [incoming, setIncoming] = React.useState(null as null | { to: number; dir: number; id: number })
  const rootRef = React.useRef(null as HTMLDivElement | null)
  const down = React.useRef(null as null | { x: number; y: number })

  const go = (dir: number) => {
    if (incoming || n < 2) return
    setIncoming({ to: wrap(index + dir, n), dir, id: Date.now() })
  }
  const commit = () => {
    if (!incoming) return
    setIndex(incoming.to)
    setIncoming(null)
  }

  React.useEffect(() => {
    onChange?.(index)
  }, [index, onChange])

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") go(1)
    else if (e.key === "ArrowLeft") go(-1)
    else return
    e.preventDefault()
  }
  const onDown = (e: React.PointerEvent) => {
    down.current = { x: e.clientX, y: e.clientY }
  }
  const onUp = (e: React.PointerEvent) => {
    const s = down.current
    down.current = null
    if (!s) return
    const dx = e.clientX - s.x
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(e.clientY - s.y)) go(dx < 0 ? 1 : -1)
  }

  const shown = incoming ? incoming.to : index
  const s = slides[shown] || {}

  return (
    <div
      ref={rootRef}
      className={["lz-root", className].filter(Boolean).join(" ")}
      style={{ height, ["--lz-ink" as string]: ink, ["--lz-d" as string]: duration + "ms", ...style }}
      data-moving={incoming ? "1" : "0"}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={onKey}
      onPointerDown={onDown}
      onPointerUp={onUp}
    >
      <style>{LZ_CSS}</style>
      <div className="lz-base">
        {srcs[index] ? <img className="lz-img" src={srcs[index]} alt={slides[index]?.alt || slides[index]?.title || ""} draggable={false} /> : null}
      </div>
      {incoming ? (
        <div
          className="lz-in"
          key={incoming.id}
          style={{ ["--lz-depth" as string]: String(incoming.dir >= 0 ? depth : 1 / depth) }}
          onAnimationEnd={(e) => e.target === e.currentTarget && commit()}
          aria-hidden="true"
        >
          {srcs[incoming.to] ? <img className="lz-img lz-main" src={srcs[incoming.to]} alt="" draggable={false} /> : null}
          {srcs[incoming.to]
            ? [1, 0].map((g) => (
                <img
                  key={g}
                  className="lz-img lz-ghost"
                  src={srcs[incoming.to]}
                  alt=""
                  draggable={false}
                  style={{ ["--lz-g" as string]: String(ghostScale(incoming.dir >= 0 ? depth : 1 / depth, g)), animationDelay: g * 40 + "ms" }}
                />
              ))
            : null}
        </div>
      ) : null}
      <div className="lz-shade" aria-hidden="true" />
      <div className="lz-text" key={"t" + shown}>
        {s.title ? (
          <span className="lz-line lz-title">
            <span>{s.title}</span>
          </span>
        ) : null}
        {s.caption ? (
          <span className="lz-line lz-cap">
            <span>{s.caption}</span>
          </span>
        ) : null}
        {s.link ? (
          <a href={s.link} className="lz-link">
            <span>Kunjungi Website</span>
            <span>&rarr;</span>
          </a>
        ) : null}
      </div>
      <div className="lz-nav">
        <span className="lz-count" aria-hidden="true">
          {pad2(shown + 1)} / {pad2(n)}
        </span>
        <button type="button" className="lz-btn" aria-label="Previous" onClick={() => go(-1)} onPointerDown={(e) => e.stopPropagation()}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
        <button type="button" className="lz-btn" aria-label="Next" onClick={() => go(1)} onPointerDown={(e) => e.stopPropagation()}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </button>
      </div>
      <div className="lz-sr" aria-live="polite">
        {"Slide " + (shown + 1) + " of " + n + (s.title ? ": " + s.title : "")}
      </div>
    </div>
  )
}