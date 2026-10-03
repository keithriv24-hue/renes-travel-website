import React from "react";
import siteConfig from "../data/siteConfig";
import Breadcrumbs from "../components/Breadcrumbs";
import PlanTripButton from "../components/PlanTripButton";
import { GroupFeature, Handles, FAQ, LetterBand, testimonialById } from "../components/sections";

const groupHandles = [
  { title: "A group leader since 2006", detail: "René has organized group cruises for the same faithful travelers year after year." },
  { title: "Everyone on the same ship", detail: "René books the group together, from the first cabin to the last." },
  { title: "Time to pay", detail: "Recurring card payments spread the cost out before you sail." },
  { title: "Registration for every traveler", detail: "Each traveler fills in René’s registration form, all kept in one place." },
  { title: "Travel insurance", detail: "Travel Guard plans for anyone in the group who wants coverage." },
  { title: "Help along the way", detail: "René works with the group from the first call until the day of the trip." },
];

export default function GroupCruises() {
  const felicia = testimonialById("felicia");
  const { contact, faqs } = siteConfig;
  return (
    <>
      <header className="page-head">
        <div className="wrap">
          <Breadcrumbs items={[{ label: "Group cruises" }]} />
          <h1 className="h-page rise" style={{ maxWidth: "15ch" }}>Group cruises, reunions and retirement cruises.</h1>
          <p className="lede rise-2">
            Getting a group on the same ship is how René started. Bring the family, the class or the whole retirement party, and she
            gets everyone sailing together.
          </p>
          <div className="ctas rise-3">
            <PlanTripButton source="groups-head">Plan a group trip</PlanTripButton>
            <a className="tlink" href={`tel:${contact.phoneTel}`}>Call {contact.phoneDisplay}</a>
          </div>
        </div>
      </header>

      <GroupFeature link={false} />

      <section className="section tint" aria-labelledby="group-handles">
        <div className="wrap">
          <h2 id="group-handles" className="h-section" style={{ maxWidth: "18ch" }}>How a group trip works with René.</h2>
          <Handles items={groupHandles} />
        </div>
      </section>

      <section className="section" aria-labelledby="felicia-title">
        <div className="wrap split">
          <div className="side">
            <h2 id="felicia-title" className="h-section">From one of René’s group travelers.</h2>
          </div>
          <figure className="main picked" style={{ marginTop: 0 }}>
            <blockquote>“{felicia.full}”</blockquote>
            <figcaption><strong>{felicia.name}</strong>, {felicia.context}</figcaption>
          </figure>
        </div>
      </section>

      <FAQ faqs={[faqs[1], faqs[3], faqs[5]]} title="Group trips: good to know." />
      <LetterBand title="Planning a trip for the whole group?" />
    </>
  );
}
