import React from "react";
import { Link } from "react-router";

export default function Breadcrumbs({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="crumbs">
        <li><Link to="/">Home</Link></li>
        {items.map((it, i) =>
          i === items.length - 1 ? (
            <li key={it.label} aria-current="page">{it.label}</li>
          ) : (
            <li key={it.label}><Link to={it.to}>{it.label}</Link></li>
          ),
        )}
      </ol>
    </nav>
  );
}
