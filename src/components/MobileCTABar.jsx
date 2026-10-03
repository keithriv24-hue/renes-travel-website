import React from "react";
import siteConfig from "../data/siteConfig";
import PlanTripButton from "./PlanTripButton";

/** Fixed bottom bar on phones (Haul Yeah pattern): Call, Text, Plan my trip. */
export default function MobileCTABar() {
  const { contact } = siteConfig;
  return (
    <nav className="mbar" aria-label="Quick contact">
      <a className="plain" href={`tel:${contact.phoneTel}`} aria-label={`Call René at ${contact.phoneDisplay}`}>Call</a>
      {contact.acceptsTexts ? (
        <a className="plain" href={`sms:${contact.phoneTel}`} aria-label={`Text René at ${contact.phoneDisplay}`}>Text</a>
      ) : null}
      <PlanTripButton source="mobile-bar" arrow={false} />
    </nav>
  );
}
