import React, { useEffect, useRef, useState } from "react";
import siteConfig from "../data/siteConfig";

/**
 * Google reviews via Trustindex (ported from Haul Yeah).
 * While siteConfig.reviews.enabled is false, René’s own testimonials
 * (`children`) render instead, so there is never an empty review box.
 * When she has a Google Business Profile: create a Trustindex widget, set
 * enabled: true, trustindexWidgetId and googleReviewLink.
 */
const contentUrlFor = (id) => `https://cdn.trustindex.io/widgets/${id.substring(0, 2)}/${id}/content.html`;

export default function GoogleReviews({ children }) {
  const { enabled, trustindexWidgetId, googleReviewLink } = siteConfig.reviews;
  const sectionRef = useRef(null);
  const mountRef = useRef(null);
  const [near, setNear] = useState(false);
  const on = enabled && Boolean(trustindexWidgetId);

  useEffect(() => {
    if (!on || !sectionRef.current) return undefined;
    if (!("IntersectionObserver" in window)) { setNear(true); return undefined; }
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { setNear(true); io.disconnect(); } }), { rootMargin: "400px 0px" });
    io.observe(sectionRef.current);
    return () => io.disconnect();
  }, [on]);

  useEffect(() => {
    if (!on || !near || !mountRef.current) return undefined;
    let cancelled = false;
    if (!document.querySelector('script[src="https://cdn.trustindex.io/loader.js"]')) {
      const s = document.createElement("script");
      s.src = "https://cdn.trustindex.io/loader.js";
      s.async = true;
      document.body.appendChild(s);
    }
    // no-cache: Trustindex pins error bodies for 12 hours otherwise (a real Haul Yeah incident).
    fetch(contentUrlFor(trustindexWidgetId), { credentials: "omit", cache: "no-cache" })
      .then((r) => (r.ok ? r.text() : ""))
      .then((html) => {
        if (cancelled || !html || !html.includes("ti-widget") || !mountRef.current) return;
        mountRef.current.innerHTML = html;
        if (typeof window.renderTrustindexWidgets === "function") { try { window.renderTrustindexWidgets(); } catch { /* ignore */ } }
      })
      .catch(() => {});
    return () => { cancelled = true; };
  }, [on, near, trustindexWidgetId]);

  if (!on) return children;

  return (
    <>
      <section className="words" ref={sectionRef} aria-labelledby="reviews-title">
        <div className="wrap">
          <h2 id="reviews-title" className="h-section">What travelers say about René.</h2>
          <div ref={mountRef} style={{ marginTop: 40, minHeight: 240 }} />
          {googleReviewLink ? (
            <p style={{ marginTop: 24 }}><a className="tlink" href={googleReviewLink} target="_blank" rel="noopener noreferrer">Leave René a Google review</a></p>
          ) : null}
        </div>
      </section>
      {children}
    </>
  );
}
