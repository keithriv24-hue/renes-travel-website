import React from "react";
import { Link } from "react-router";
import PlanTripButton from "../components/PlanTripButton";

export default function NotFound() {
  return (
    <section className="section">
      <div className="wrap-narrow">
        <p className="label" style={{ color: "var(--color-blue)" }}>Page not found</p>
        <h1 className="h-page" style={{ marginTop: 16 }}>This page has sailed away.</h1>
        <p className="lede" style={{ marginTop: 24 }}>It may have moved when the site was updated. These will get you where you were going.</p>
        <div className="chiplinks" style={{ marginTop: 32 }}>
          <Link to="/">Home</Link>
          <Link to="/trips/">Trips</Link>
          <Link to="/group-cruises/">Group cruises</Link>
          <Link to="/partners/">Partners</Link>
          <Link to="/forms/">Client forms</Link>
        </div>
        <div style={{ marginTop: 32 }}><PlanTripButton source="404" /></div>
      </div>
    </section>
  );
}
