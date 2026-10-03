import React from "react";
import siteConfig from "../data/siteConfig";

/**
 * A photo slot from siteConfig.images. Renders the real image once `src` is
 * set; until then, a flat placeholder at the same size that shows its brief,
 * so swapping in the real photo causes no layout change.
 */
export default function Photo({ name, className = "", deep = false, priority = false, sizes = "100vw" }) {
  const img = siteConfig.images[name];
  if (!img) return null;
  if (img.src) {
    return (
      <div className={`photo ${name === "portrait" ? "portrait-photo" : ""} ${className}`}>
        <img
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          sizes={sizes}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={priority ? "high" : undefined}
        />
      </div>
    );
  }
  return (
    <div className={`photo ph ${deep ? "deep" : ""} ${className}`} role="img" aria-label={`Photo coming soon: ${img.alt}`}>
      <span className="cap"><b>Photo needed</b><span className="brief">{img.brief}</span></span>
    </div>
  );
}
