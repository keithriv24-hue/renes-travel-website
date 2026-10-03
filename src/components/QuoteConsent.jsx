import React from "react";

/**
 * Text-message consent line shown wherever the trip form appears
 * (same pattern as Haul Yeah). ⚠ René should approve this wording.
 */
export default function QuoteConsent({ className = "" }) {
  return (
    <p className={`consent ${className}`}>
      By sending the form, you agree to receive a call or text from René’s Travel Agency about your trip. Message and data
      rates may apply. Reply STOP to opt out.
    </p>
  );
}
