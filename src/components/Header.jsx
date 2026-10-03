import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import siteConfig from "../data/siteConfig";
import PlanTripButton from "./PlanTripButton";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { contact, business, nav } = siteConfig;

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="utility">
        <div className="wrap">
          <span className="hide-sm">Cruises, resorts and group trips {business.scope.toLowerCase()}</span>
          <a href={`tel:${contact.phoneTel}`}>Reservations &amp; sales {contact.phoneDisplay}</a>
        </div>
      </div>
      <header className="masthead">
        <div className="wrap">
          <Link className="brand" to="/" aria-label={`${business.shortName}, home`}>
            <span className="r">René’s</span>
            <span className="t">Travel Agency</span>
          </Link>
          <nav className="nav" aria-label="Main">
            <ul className="nav-list">
              {nav.map((item) => (
                <li key={item.href}><NavLink to={item.href}>{item.label}</NavLink></li>
              ))}
            </ul>
            <PlanTripButton source="header" />
            <button
              type="button"
              className="menu-btn"
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? "Close" : "Menu"}
            </button>
          </nav>
        </div>
        {open ? (
          <div className="menu-panel" id="mobile-menu">
            <nav aria-label="Mobile">
              {nav.map((item) => (
                <Link key={item.href} to={item.href}>{item.label}</Link>
              ))}
            </nav>
            <PlanTripButton source="mobile-menu" />
            <p className="contact-line">Call or text {contact.phoneDisplay}</p>
          </div>
        ) : null}
      </header>
    </>
  );
}
