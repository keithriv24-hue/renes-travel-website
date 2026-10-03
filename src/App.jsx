import React from "react";
import { Routes, Route } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Trips from "./pages/Trips";
import TripPage from "./pages/TripPage";
import GroupCruises from "./pages/GroupCruises";
import Partners from "./pages/Partners";
import PartnerPage from "./pages/PartnerPage";
import Forms from "./pages/Forms";
import PlanMyTrip from "./pages/PlanMyTrip";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ThankYou from "./pages/ThankYou";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/trips/:slug" element={<TripPage />} />
        <Route path="/group-cruises" element={<GroupCruises />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/partners/:slug" element={<PartnerPage />} />
        <Route path="/forms" element={<Forms />} />
        <Route path="/plan-my-trip" element={<PlanMyTrip />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        {/* Conversion page: noindex, absent from sitemap.xml, still prerendered. */}
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Layout>
  );
}
