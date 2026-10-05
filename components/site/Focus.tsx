"use client";

import { useRef, useState } from "react";
import { FOCUS } from "@/content/portfolio";
import { Proximity } from "./Proximity";

/**
 * WHAT I WORK WITH — a typographic landscape, not a list.
 *
 * The six words are placed across the width of the screen rather than down
 * it: different lanes, different sizes, composed tightly enough to read as
 * one system. The one under the pointer comes forward, the rest recede, and
 * what it means appears attached to that word — nowhere else, and never
 * until it is asked for. Absolutely positioned, so nothing reflows.
 *
 * Hover, focus and click all make a word active, so a pointer, a keyboard
 * and a thumb all get the same thing.
 *
 * A THUMB IS NOT A POINTER, though, and the difference matters twice. Hover
 * is guarded to a real mouse, and focus to :focus-visible, because a tap
 * fires pointerenter AND focus AND click, and either of the first two would
 * open the word for the click to toggle shut again in the same gesture. And what a word means
 * cannot float over the landscape on a screen this size, so on a touch
 * device it is given its own place underneath instead; the panel below is
 * that place, and CSS decides which of the two is in use.
 */
export function Focus() {
  const [open, setOpen] = useState<string | null>(null);
  const root = useRef<HTMLDivElement>(null);
  const live = FOCUS.items.find((i) => i.id === open);

  // the mark that trails the pointer — two properties, one frame
  const frame = useRef(0);
  const pos = useRef({ x: 0, y: 0 });
  const track = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = root.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    pos.current = { x: e.clientX - r.left, y: e.clientY - r.top };
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      el.style.setProperty("--mx", `${pos.current.x}px`);
      el.style.setProperty("--my", `${pos.current.y}px`);
    });
  };

  return (
    <section className="focus" id="focus">
      <div className="focus__label" data-reveal>
        <span className="m">{FOCUS.label}</span>
        <h2 className="m">{FOCUS.heading}</h2>
      </div>

      <div
        ref={root}
        className="focus__field"
        data-track
        data-live={open || undefined}
        onPointerMove={track}
        onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(null)}
      >
        <span className="focus__mark" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="23" stroke="currentColor" />
            <path d="M24 8v32M8 24h32" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
            <circle cx="24" cy="24" r="3.5" fill="currentColor" />
          </svg>
        </span>

        {FOCUS.items.map((item, i) => (
          <button
            key={item.id}
            type="button"
            className="focus__word"
            data-open={open === item.id || undefined}
            data-reveal
            data-cursor="text"
            style={{ ["--i" as string]: i, ["--delay" as string]: `${i * 70}ms` }}
            aria-expanded={open === item.id}
            onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(item.id)}
            // Keyboard focus opens a word; a TAP must not. Tapping focuses
            // the button first and clicks it second, so an unguarded focus
            // handler sets the word open and the click immediately toggles
            // it shut again — the first tap looked like it did nothing.
            // :focus-visible is the one thing that tells the two apart.
            onFocus={(e) => { if (e.currentTarget.matches(":focus-visible")) setOpen(item.id); }}
            onBlur={() => setOpen(null)}
            onClick={() => setOpen(open === item.id ? null : item.id)}
          >
            <Proximity text={item.title} className="focus__w d" />
            {/* attached to its own word, and shown only while it is the live
                one — there is no permanent place for descriptions here */}
            <span className="focus__said">
              <span className="focus__line">{item.line}</span>
              <span className="focus__keys">
                {item.keywords.map((k) => <span key={k} className="m">{k}</span>)}
              </span>
            </span>
          </button>
        ))}

        {/* the one hint on the site */}
        <span className="focus__hint m" aria-hidden="true">↓ {FOCUS.hint}</span>
      </div>

      {/* Where a word's meaning goes when there is no pointer to hold it
          with. It is below the landscape, never over it, and it is the same
          state driving it, so a tap moves it rather than stacking. */}
      <div className="focus__panel" data-open={live ? "" : undefined} aria-live="polite">
        {live ? (
          <>
            <p className="focus__line">{live.line}</p>
            <p className="focus__keys">
              {live.keywords.map((k) => <span key={k} className="m">{k}</span>)}
            </p>
          </>
        ) : null}
      </div>
    </section>
  );
}
