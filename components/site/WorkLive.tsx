"use client";

import { useEffect, useRef, useState } from "react";

/** The width the embedded site is rendered at before it is scaled down. A
 *  real desktop width, so the frame shows the desktop layout rather than the
 *  site's own narrow one squeezed into a small rectangle. */
const DESIGN_W = 1440;

/**
 * THE LIVE SURFACE.
 *
 * A project whose media carries a `live` URL can run the real website inside
 * the rectangle the still occupies. It is an enhancement laid OVER the still,
 * never instead of it: if it is refused, slow, blocked or simply not worth
 * mounting, what stays on screen is the photograph the composition was built
 * on, and nothing about the section changes.
 *
 * IT TAKES NO POINTER EVENTS, deliberately. The Featured Work interaction is
 * the image: entering it names the project, brings up the line about it and
 * puts the lens under the cursor. An interactive frame would swallow every
 * one of those events and the whole composition would go dead under the
 * pointer. So the site runs and animates on its own, and the pointer still
 * belongs to the portfolio.
 *
 * It is also not mounted at all where it would cost more than it gives: no
 * real pointer, reduced motion, a screen too narrow to read a desktop layout
 * scaled down, or a project still far from the viewport.
 */
export function WorkLive({ src, title }: { src: string; title: string }) {
  const host = useRef<HTMLSpanElement>(null);
  const [mount, setMount] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    // A desktop pointer, motion allowed, and room to render a desktop layout.
    const ok =
      window.matchMedia("(pointer: fine) and (hover: hover)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
      window.innerWidth >= 1024;
    if (!ok) return;

    /* The frame is rendered at a fixed width and scaled to the rectangle, so
       the scale has to follow the rectangle. */
    const ro = new ResizeObserver(([e]) => {
      const w = e.contentRect.width;
      if (w) el.style.setProperty("--s", String(w / DESIGN_W));
    });
    ro.observe(el);

    // Nothing is fetched until the project is nearly on screen.
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        setMount(true);
        io.disconnect();
      },
      { rootMargin: "120% 0px 120% 0px" },
    );
    io.observe(el);
    return () => { ro.disconnect(); io.disconnect(); };
  }, []);

  return (
    <span ref={host} className="work__live" data-ready={ready || undefined} aria-hidden="true">
      {mount ? (
        <iframe
          src={src}
          title={title}
          width={DESIGN_W}
          height={Math.round(DESIGN_W / 1.754)}
          loading="lazy"
          tabIndex={-1}
          referrerPolicy="no-referrer-when-downgrade"
          // Scripts, because the point of this is the site's own motion. Not
          // top-navigation, which is what would let an embedded page move the
          // portfolio out from under the person reading it.
          sandbox="allow-scripts allow-same-origin"
          onLoad={() => setReady(true)}
        />
      ) : null}
    </span>
  );
}
