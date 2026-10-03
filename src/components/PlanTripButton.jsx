import React from "react";
import { Link } from "react-router";
import { tallyEnabled, openTallyPopup } from "../lib/quote";
import { trackQuoteStart } from "../lib/analytics";

/**
 * The one "Plan my trip" button used everywhere.
 * Tally on  → opens the Tally popup (falls back to /plan-my-trip/ without JS).
 * Tally off → goes to /plan-my-trip/, which embeds René's current JotForm.
 */
export default function PlanTripButton({ source = "button", className = "btn", children = "Plan my trip", arrow = true, onClick }) {
  const label = (
    <>
      {children}
      {arrow ? <span className="arr" aria-hidden="true">→</span> : null}
    </>
  );
  if (tallyEnabled()) {
    return (
      <a
        href="/plan-my-trip/"
        className={className}
        onClick={(e) => {
          e.preventDefault();
          onClick?.();
          trackQuoteStart(source);
          openTallyPopup(source);
        }}
      >
        {label}
      </a>
    );
  }
  return (
    <Link to="/plan-my-trip/" className={className} onClick={() => { onClick?.(); trackQuoteStart(source); }}>
      {label}
    </Link>
  );
}
