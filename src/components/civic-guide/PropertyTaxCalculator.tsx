"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface TaxBucket {
  label: string;
  percentage: number;
  color: string;
  example: string;
}

const TAX_BUCKETS: TaxBucket[] = [
  { label: "K-12 Education", percentage: 45, color: "#3b82f6", example: "Teachers, buses, school buildings" },
  { label: "Police & Fire", percentage: 15, color: "#ef4444", example: "Officers, fire trucks, 911 dispatch" },
  { label: "Infrastructure", percentage: 12, color: "#f59e0b", example: "Roads, water mains, bridges" },
  { label: "Parks & Libraries", percentage: 8, color: "#10b981", example: "Playgrounds, programs, books" },
  { label: "General Government", percentage: 10, color: "#8b5cf6", example: "City hall, courts, elections" },
  { label: "Debt Service", percentage: 7, color: "#6b7280", example: "Bond payments from past projects" },
  { label: "Other", percentage: 3, color: "#475569", example: "Health, welfare, miscellaneous" },
];

function formatDollars(amount: number): string {
  if (amount >= 1000) return `$${(amount / 1000).toFixed(1)}K`;
  return `$${Math.round(amount).toLocaleString()}`;
}

export function PropertyTaxCalculator() {
  const [homeValue, setHomeValue] = useState(350000);
  const [showBreakdown, setShowBreakdown] = useState(false);

  // Effective property tax rate ~1.1% national average
  const effectiveRate = 0.011;
  const annualTax = homeValue * effectiveRate;

  return (
    <div className="lg-tax-calc">
      <div className="lg-tax-calc-header">
        <h3 className="lg-tax-calc-title">Property Tax Calculator</h3>
        <p className="lg-tax-calc-subtitle">
          See where your property taxes actually go
        </p>
      </div>

      {/* Input */}
      <div className="lg-tax-calc-input-section">
        <label className="lg-tax-calc-label">Your home&rsquo;s assessed value</label>
        <div className="lg-tax-calc-value-display">
          ${homeValue.toLocaleString()}
        </div>
        <input
          type="range"
          min={100000}
          max={2000000}
          step={25000}
          value={homeValue}
          onChange={(e) => {
            setHomeValue(Number(e.target.value));
            setShowBreakdown(true);
          }}
          className="lg-tax-calc-slider"
        />
        <div className="lg-tax-calc-range-labels">
          <span>$100K</span>
          <span>$2M</span>
        </div>
      </div>

      {/* Annual total */}
      <div className="lg-tax-calc-total">
        <div className="lg-tax-calc-total-label">Estimated annual property tax</div>
        <div className="lg-tax-calc-total-amount">
          ${Math.round(annualTax).toLocaleString()}
          <span className="lg-tax-calc-monthly">
            (${Math.round(annualTax / 12).toLocaleString()}/mo)
          </span>
        </div>
        <div className="lg-tax-calc-rate-note">
          Based on national average effective rate of 1.1%
        </div>
      </div>

      {/* Breakdown bars */}
      <div className="lg-tax-calc-breakdown">
        <div className="lg-tax-calc-breakdown-title">Where every dollar goes</div>
        {TAX_BUCKETS.map((bucket, i) => {
          const amount = annualTax * (bucket.percentage / 100);
          return (
            <motion.div
              key={bucket.label}
              className="lg-tax-bucket"
              initial={showBreakdown ? { opacity: 0, x: -20 } : false}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.3 }}
            >
              <div className="lg-tax-bucket-header">
                <span className="lg-tax-bucket-label">{bucket.label}</span>
                <span className="lg-tax-bucket-amount">
                  {formatDollars(amount)}
                  <span className="lg-tax-bucket-pct">({bucket.percentage}%)</span>
                </span>
              </div>
              <div className="lg-tax-bucket-bar-bg">
                <motion.div
                  className="lg-tax-bucket-bar"
                  style={{ backgroundColor: bucket.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${bucket.percentage}%` }}
                  transition={{ duration: 0.6, delay: i * 0.05, ease: [0.21, 0.47, 0.32, 0.98] }}
                />
              </div>
              <div className="lg-tax-bucket-example">{bucket.example}</div>
            </motion.div>
          );
        })}
      </div>

      {/* Fun fact */}
      <div className="lg-tax-calc-fact">
        <strong>Perspective:</strong> Your {formatDollars(annualTax)} in property taxes pays for
        approximately {Math.round(annualTax / 150).toLocaleString()} minutes of police patrol,{" "}
        {Math.round(annualTax / 12000 * 365).toLocaleString()} days of a teacher&rsquo;s salary,
        or {Math.round(annualTax / 3)} library books.
      </div>
    </div>
  );
}
