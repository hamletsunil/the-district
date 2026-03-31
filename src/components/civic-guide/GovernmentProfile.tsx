"use client";

import { motion } from "framer-motion";
import type { CityProfile } from "@/data/civic-guide/types-city";
import { GOVERNMENT_FORMS } from "@/data/civic-guide/types-city";
import { OrgChartDiagram } from "./OrgChartDiagram";

interface GovernmentProfileProps {
  city: CityProfile;
  onReset: () => void;
}

export function GovernmentProfile({ city, onReset }: GovernmentProfileProps) {
  const formInfo = GOVERNMENT_FORMS[city.form];

  const shareText = `I live in ${city.name}, ${city.state} — a ${formInfo.name.toLowerCase()} ${city.type}. ${formInfo.percentage} of US cities use this form of government.`;
  const shareUrl = typeof window !== "undefined"
    ? `${window.location.origin}/results?city=${encodeURIComponent(city.name)}&state=${city.state}`
    : "";

  return (
    <motion.div
      className="lg-profile-card"
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {/* Header */}
      <div className="lg-profile-header">
        <div className="lg-profile-city-name">
          {city.name}, {city.state}
        </div>
        <div className="lg-profile-meta">
          {city.population.toLocaleString()} residents &middot; {city.county} County &middot;{" "}
          {city.type.charAt(0).toUpperCase() + city.type.slice(1)}
        </div>
      </div>

      {/* Government Form */}
      <div className="lg-profile-form-section">
        <div className="lg-profile-form-badge">
          {formInfo.name}
        </div>
        <p className="lg-profile-form-desc">{formInfo.description}</p>
        <div className="lg-profile-form-context">
          Your city is one of {formInfo.count.toLocaleString()} {formInfo.name.toLowerCase()} cities
          in America ({formInfo.percentage} of all municipalities).
        </div>
      </div>

      {/* Org Chart */}
      <div className="lg-profile-chart">
        <div className="lg-profile-chart-label">How power flows in your city</div>
        <OrgChartDiagram form={city.form} />
      </div>

      {/* Actions */}
      <div className="lg-profile-actions">
        <button
          className="lg-profile-share-btn"
          onClick={() => {
            if (navigator.share) {
              navigator.share({ title: `${city.name} Government`, text: shareText, url: shareUrl });
            } else {
              navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
            }
          }}
        >
          Share Result
        </button>
        <button className="lg-profile-reset-btn" onClick={onReset}>
          Search another city
        </button>
      </div>

      {/* Learn More */}
      <div className="lg-profile-learn-more">
        <a href="/articles/how-local-government-works/forms" className="lg-profile-learn-link">
          Learn how all 5 forms of government work &rarr;
        </a>
      </div>
    </motion.div>
  );
}
