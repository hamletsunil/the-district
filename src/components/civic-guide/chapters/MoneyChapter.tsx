"use client";

import dynamic from "next/dynamic";
import { CalloutBox } from "@/components/civic-guide/CalloutBox";
import { PullQuote } from "@/components/article/PullQuote";
import { AtAGlance } from "@/components/article/AtAGlance";
import { SourcesCitations } from "@/components/article/SourcesCitations";
import { StatBar } from "@/components/civic-guide/StatBar";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import type { ReactNode } from "react";
import type { Source } from "@/types/article";

const PropertyTaxCalculator = dynamic(
  () => import("@/components/civic-guide/PropertyTaxCalculator").then((m) => m.PropertyTaxCalculator),
  { ssr: false }
);

function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });
  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.6s ease ${delay}s, transform 0.6s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const SOURCES: Source[] = [
  { title: "What Are the Sources of Revenue for State and Local Governments?", outlet: "Tax Policy Center", url: "https://taxpolicycenter.org/briefing-book/what-are-sources-revenue-state-and-local-governments" },
  { title: "State and Local Expenditures", outlet: "Urban Institute", url: "https://www.urban.org/policy-centers/cross-center-initiatives/state-and-local-finance-initiative/state-and-local-backgrounders/state-and-local-expenditures" },
  { title: "The State of State (and Local) Tax Policy", outlet: "Tax Foundation", url: "https://taxfoundation.org/research/all/state/state-local-tax-burden-rankings/" },
  { title: "The Pension Crisis in Local Government", outlet: "Brookings Institution", url: "https://www.brookings.edu/articles/the-challenging-state-and-local-pension-landscape/" },
  { title: "Detroit Bankruptcy: A Case Study", outlet: "Federal Reserve Bank of Chicago", url: "https://www.chicagofed.org/publications/chicago-fed-letter/2014/special-january" },
  { title: "Proposition 13 (1978)", outlet: "California Tax Foundation", url: "https://www.caltax.org/proposition-13/" },
  { title: "Investigation of the Ferguson Police Department", outlet: "U.S. Department of Justice", url: "https://www.justice.gov/sites/default/files/opa/press-releases/attachments/2015/03/04/ferguson_police_department_report.pdf" },
  { title: "Hamlet — Search local government meetings", outlet: "Hamlet", url: "https://www.myhamlet.com/search?ref=district" },
];

export function MoneyChapter() {
  return (
    <>
      <AtAGlance
        stats={[
          { value: "$2.32T", label: "Annual spending" },
          { value: "72%", label: "From property taxes" },
          { value: "$1.27T", label: "Unfunded pensions" },
        ]}
        finding="Property taxes are the bedrock of local government — and the source of its deepest political fault lines."
      />

      {/* Property Tax Calculator */}
      <section className="lg-chapter-body">
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <FadeIn>
            <PropertyTaxCalculator />
          </FadeIn>
        </div>
      </section>

      {/* Prose */}
      <section className="lg-chapter-body">
        <div className="lg-prose-container">
          <FadeIn>
            <h2 className="lg-prose-heading">Where the Money Comes From</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Local governments collectively spent{" "}
              <a href="https://usgovernmentspending.com/year2022_r" target="_blank" rel="noopener noreferrer">
                $2.32 trillion in 2022
              </a>{" "}
              — a sum larger than the GDP of Italy, Brazil, or Canada. Where does the money come
              from? Property taxes dominate, supplying{" "}
              <a href="https://taxpolicycenter.org/briefing-book/what-are-sources-revenue-state-and-local-governments" target="_blank" rel="noopener noreferrer">
                72 percent of all local tax revenue
              </a>. Intergovernmental transfers from state and federal sources provide another 37 percent
              of general revenue. Charges and fees — from sewerage to parking meters — supply 16
              percent. The remainder trickles in through sales taxes, fines, enterprise fund revenues,
              and bond proceeds.
            </p>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Property taxation is simultaneously the most stable and most hated form of local
              revenue. Unlike income and sales taxes, which fluctuate with the economy, property
              taxes provide a predictable revenue stream even during recessions — your house doesn&rsquo;t
              lose its assessed value overnight. But the tax is visible in a way others are not.
              You receive a bill. You write a check. You know exactly what you paid. And when your
              assessment rises while your income doesn&rsquo;t, the political fury is immediate and personal.
            </p>
          </FadeIn>

          <FadeIn>
            <CalloutBox variant="why-matters" title="Prop 13 Changed Everything">
              California&rsquo;s Proposition 13, passed in 1978, capped property tax rates at 1% of
              assessed value and limited annual increases to 2%. The result: two neighbors in identical
              houses can pay vastly different taxes depending on when they bought. A homeowner who
              purchased in 1980 might pay $2,000 while their neighbor who bought in 2020 pays $15,000.
              The policy has been copied in various forms by dozens of states.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">Where the Money Goes</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Where the money goes reveals what cities actually prioritize. Education alone consumes
              39 percent of direct local spending, according to the{" "}
              <a href="https://www.urban.org/policy-centers/cross-center-initiatives/state-and-local-finance-initiative/state-and-local-backgrounders/state-and-local-expenditures" target="_blank" rel="noopener noreferrer">
                Urban Institute
              </a>. Police protection takes another 6 percent. Highways and roads get 5 percent.
              The budget debate — fought in city councils across America every year — is the
              single most consequential act of local governance. It determines whether the library
              stays open, whether the potholes get filled, whether the fire station gets a new truck.
              These debates are{" "}
              <a href="https://www.myhamlet.com/search?ref=district" target="_blank" rel="noopener noreferrer">
                searchable on Hamlet
              </a>.
            </p>
          </FadeIn>

          <FadeIn>
            <StatBar
              title="Local Government Spending Breakdown"
              subtitle="Source: Urban Institute"
              items={[
                { label: "K-12 Education", value: 39, displayValue: "39%", highlight: true },
                { label: "Public Welfare", value: 8, displayValue: "8%" },
                { label: "Police & Fire", value: 6, displayValue: "6%" },
                { label: "Roads", value: 5, displayValue: "5%" },
                { label: "All Other", value: 42, displayValue: "42%" },
              ]}
            />
          </FadeIn>

          <FadeIn>
            <PullQuote
              text="The city filed for Chapter 9 bankruptcy with $18 billion in debt — the largest municipal bankruptcy in American history."
              city="Detroit"
              state="MI"
              className="lg-pull-quote"
            />
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">The Pension Crisis</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Detroit&rsquo;s 2013 bankruptcy — $18 billion in debt, the largest municipal filing in
              American history — exposed the pension crisis that haunts local government nationwide.
              The city had promised retirement benefits it could not afford, deferred infrastructure
              maintenance for decades, and watched its tax base evaporate as population fell from 1.8
              million in 1950 to 680,000. The national unfunded pension liability for state and local
              governments now exceeds{" "}
              <a href="https://www.brookings.edu/articles/the-challenging-state-and-local-pension-landscape/" target="_blank" rel="noopener noreferrer">
                $1.27 trillion
              </a>.
            </p>
          </FadeIn>

          <FadeIn>
            <CalloutBox variant="misconception" title="&quot;Cities Can't Go Bankrupt&quot;">
              They can — but only with state permission. Chapter 9 bankruptcy requires state
              authorization, and many states don&rsquo;t grant it. When Stockton, California filed in
              2012, it became a test case for whether pension obligations could be reduced in
              bankruptcy. (The city ultimately chose to protect pensions and cut bondholder
              payments instead.) Jefferson County, Alabama filed in 2011 over a $4 billion sewer
              debt. Harrisburg, Pennsylvania couldn&rsquo;t file because the state legislature blocked it.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">Fiscalization of Land Use</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The &ldquo;fiscalization of land use&rdquo; — cities approving developments based on
              tax revenue potential rather than community need — is a direct consequence of property
              tax dependence. A shopping center generates sales tax revenue; an apartment building
              generates schoolchildren who cost money to educate. The math pushes cities toward
              commercial development and away from housing, exacerbating the affordability crisis
              that dominates local politics from San Francisco to Boise to Austin.
            </p>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Ferguson, Missouri showed the dark side of municipal finance. When property taxes and
              intergovernmental transfers fell short, the city turned its police department and
              municipal court into a revenue extraction machine, budgeting 23 percent of revenue
              from fines and fees disproportionately levied against Black residents. The model was
              not unique to Ferguson — a{" "}
              <a href="https://www.justice.gov/sites/default/files/opa/press-releases/attachments/2015/03/04/ferguson_police_department_report.pdf" target="_blank" rel="noopener noreferrer">
                Department of Justice investigation
              </a>{" "}
              described a system where policing existed to generate revenue rather than promote
              public safety. The lesson: how a city funds itself shapes who gets policed, who gets
              served, and who gets ignored.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="lg-chapter-body" style={{ paddingTop: 0 }}>
        <div className="lg-prose-container">
          <SourcesCitations sources={SOURCES} />
        </div>
      </section>
    </>
  );
}
