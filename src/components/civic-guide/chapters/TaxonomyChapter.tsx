"use client";

import { CalloutBox } from "@/components/civic-guide/CalloutBox";
import { PullQuote } from "@/components/article/PullQuote";
import { AtAGlance } from "@/components/article/AtAGlance";
import { SourcesCitations } from "@/components/article/SourcesCitations";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import type { ReactNode } from "react";
import type { Source } from "@/types/article";

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
  { title: "2022 Census of Governments Press Release", outlet: "U.S. Census Bureau", url: "https://www.census.gov/newsroom/press-releases/2023/census-of-governments.html" },
  { title: "The Number and Types of Local Governments in the U.S.", outlet: "Federal Reserve Bank of St. Louis", url: "https://www.stlouisfed.org/publications/regional-economist/2024/march/local-governments-us-number-type" },
  { title: "Out of Sight: How Special Taxing Districts Circumvent Spending Limits", outlet: "Goldwater Institute", url: "https://www.goldwaterinstitute.org/out-of-sight-how-special-taxing-districts-circumve/" },
  { title: "Hidden Government", outlet: "ICMA", url: "https://icma.org/articles/article/hidden-government" },
  { title: "Following the Money 2017: Special Districts", outlet: "U.S. PIRG Education Fund", url: "https://pirg.org/edfund/resources/following-the-money-2017-special-districts/" },
  { title: "No County for Old Management: America's Independent Cities", outlet: "Library of Congress", url: "https://blogs.loc.gov/maps/2025/01/independent-cities/" },
  { title: "Polycentric Governance of Complex Economic Systems (Nobel Lecture)", outlet: "Elinor Ostrom / Nobel Prize", url: "https://web.pdx.edu/~nwallace/EHP/OstromPolyGov.pdf" },
  { title: "Special Districts: Improving Oversight & Transparency", outlet: "Little Hoover Commission (California)", url: "https://lhc.ca.gov/report/special-districts-improving-oversight-transparency" },
  { title: "Tribal Nations & the United States: An Introduction", outlet: "National Congress of American Indians", url: "https://www.ncai.org/about-tribes" },
  { title: "Cook County Mosquito Abatement Districts: Governance, Transparency, and Finances", outlet: "Civic Federation", url: "https://civicfed.org/CookCountyMosquitoAbatementDistricts" },
  { title: "Municipal Form of Government by the Numbers", outlet: "ICMA", url: "https://icma.org/blog-posts/municipal-form-government-numbers" },
  { title: "Cities 101 — Types of Local US Governments", outlet: "National League of Cities", url: "https://www.nlc.org/resource/cities-101-types-of-local-governments/" },
];

export function TaxonomyChapter() {
  return (
    <>
      <AtAGlance
        stats={[
          { value: "39,555", label: "Special districts" },
          { value: "461%", label: "Special district growth since 1942" },
          { value: "38%", label: "Publish budgets online" },
        ]}
        finding="Special districts outnumber every other type of local government and operate with less transparency than any of them."
      />

      <section className="lg-chapter-body">
        <div className="lg-prose-container">
          <FadeIn>
            <p className="lg-prose-paragraph">
              The United States does not have a system of local government. It has roughly 90,837
              of them &mdash; a riotous, overlapping, historically accreted patchwork that no constitutional
              convention designed and no rational planner would defend.
            </p>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The{" "}
              <a href="https://www.census.gov/newsroom/press-releases/2023/census-of-governments.html" target="_blank" rel="noopener noreferrer">
                2022 Census of Governments
              </a>{" "}
              tallied 19,491 municipalities, 3,031 counties, 16,214 townships, 12,546 school districts,
              and 39,555 <a href="/articles/how-local-government-works/glossary#special-district">special districts</a>. Taken together, they employ more Americans than the federal
              government and the fifty state governments combined.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">Municipalities</h2>
          </FadeIn>

          <FadeIn delay={0.05}>
            <p className="lg-prose-paragraph">
              Municipalities are the entities most people picture when they think of
              local government, yet even the naming conventions defy standardization. New Jersey is the
              only state containing cities, towns, villages, and boroughs as incorporated places. Eleven
              states designate only &ldquo;cities.&rdquo; In the six New England states plus New York
              and Wisconsin, a &ldquo;town&rdquo; is not a municipality at all but a minor civil
              division — a critical distinction that has confused census-takers for generations. The
              Census Bureau counted 19,491 municipal governments in 2022, ranging from New York City
              (population 8.3 million, budget exceeding $100 billion) to scores of incorporated villages
              in the rural Midwest with populations under 100 and no paid staff. Virginia alone hosts 38
              of the nation&rsquo;s{" "}
              <a href="https://blogs.loc.gov/maps/2025/01/independent-cities/" target="_blank" rel="noopener noreferrer">
                41 independent cities
              </a>{" "}
              — municipalities that exist outside any county jurisdiction. Baltimore separated from
              Baltimore County in 1851; St. Louis seceded from St. Louis County in 1876; Carson City
              consolidated with Ormsby County in 1969. San Francisco is different still: a consolidated
              city-county where both entities nominally exist but share a single government.
            </p>
          </FadeIn>

          <FadeIn>
            <CalloutBox variant="misconception" title="&quot;Counties Are Just Subdivisions of States&quot;">
              In Connecticut and Rhode Island, counties have no governmental function whatsoever — they
              are cartographic artifacts. Alaska leaves 56 percent of its land in a single unorganized
              borough. Virginia&rsquo;s independent cities exist outside county jurisdiction entirely.
              The assumption that counties sit neatly below states and above cities describes perhaps
              half the country.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">Counties</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Counties — 3,031 in all — are the workhorse of American governance in
              most states, operating courts, jails, public health departments, roads, and election
              administration. Louisiana calls them parishes, a vestige of Catholic ecclesiastical
              geography. Alaska calls them boroughs and leaves 56 percent of its land mass in a single
              &ldquo;unorganized borough&rdquo; with no county-level government at all. Connecticut
              abolished its county governments in 1960; Rhode Island&rsquo;s counties are purely
              geographic. In much of the South and West, counties remain the dominant layer of local
              government, delivering services that cities provide in the Northeast. The variation is not
              a bug; it is the operating system.
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">Townships</h2>
          </FadeIn>

          <FadeIn delay={0.05}>
            <p className="lg-prose-paragraph">
              <a href="/articles/how-local-government-works/glossary#township">Townships</a> occupy a peculiar middle tier, found in{" "}
              <a href="https://en.wikipedia.org/wiki/Township_(United_States)" target="_blank" rel="noopener noreferrer">
                20 states
              </a>{" "}
              concentrated in the Midwest and New England. The Census counted 16,214 in 2022. The
              distinction between a civil township (a unit of government) and a survey township (a
              36-square-mile grid from the Northwest Ordinance&rsquo;s land survey) trips up even
              seasoned political scientists. Civil townships in Michigan, Ohio, Indiana, and Pennsylvania
              exercise real authority over road maintenance, zoning, and land-use planning. New England
              &ldquo;towns&rdquo; — technically classified as townships by the Census — are the
              foundational unit of self-governance, many still conducting business at open town meetings.
              Brattleboro, Vermont, was the{" "}
              <a href="https://brattleboro.gov/representative-town-meeting" target="_blank" rel="noopener noreferrer">
                sole town in the state
              </a>{" "}
              to use a representative town meeting, electing 138 delegates rather than opening the floor
              to all voters, until residents voted in March 2026 to{" "}
              <a href="https://www.wcax.com/2026/03/04/brattleboro-residents-vote-toss-representative-town-meeting-format/" target="_blank" rel="noopener noreferrer">
                abandon the format
              </a>{" "}
              by a margin of 59 votes — returning to the direct democracy their neighbors never left.
            </p>
          </FadeIn>

          <FadeIn>
            <PullQuote
              text="A homeowner in suburban Illinois may live under the jurisdiction of a municipality, a county, a township, a school district, a park district, a library district, a fire protection district, a mosquito abatement district, and a sanitary district — nine layers of elected or appointed authority, most of them invisible until the property tax bill arrives."
              className="lg-pull-quote"
            />
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">Special Districts</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Special districts are the invisible leviathan. At 39,555, they outnumber
              every other type of local government and have grown{" "}
              <a href="https://www.goldwaterinstitute.org/out-of-sight-how-special-taxing-districts-circumve/" target="_blank" rel="noopener noreferrer">
                461 percent since 1942
              </a>. They provide fire protection, water, sewerage, transit, ports, airports, hospitals,
              libraries, parks, cemeteries, soil conservation, mosquito abatement, and levee maintenance.
              Illinois has 3,068 special districts — more than ten individual U.S. states — and{" "}
              <a href="https://civicfed.org/CookCountyMosquitoAbatementDistricts" target="_blank" rel="noopener noreferrer">
                Cook County alone has 244
              </a>. The Moraga-Orinda Fire District in Contra Costa County, California,{" "}
              <a href="https://www.mofd.org/our-district/district-overview" target="_blank" rel="noopener noreferrer">
                protects 42 square miles
              </a>{" "}
              with 57 firefighters and a five-member elected board that most residents of Orinda could
              not name. The Port Authority of New York and New Jersey,{" "}
              <a href="https://www.britannica.com/topic/Port-Authority-of-New-York-and-New-Jersey" target="_blank" rel="noopener noreferrer">
                created in 1921
              </a>{" "}
              by interstate compact, operates five airports, the PATH rail system, six bridges and
              tunnels, and the World Trade Center site. It was the first regional public authority in the
              Western Hemisphere. Special districts proliferate because they can circumvent municipal debt
              limits, target a specific service area that crosses city or county boundaries, and —
              crucially — operate with minimal public scrutiny.{" "}
              <a href="https://pirg.org/edfund/resources/following-the-money-2017-special-districts/" target="_blank" rel="noopener noreferrer">
                Only 38 percent
              </a>{" "}
              publish their budgets online.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <CalloutBox variant="why-matters" title="Special Districts Spend Over $100 Billion Annually With Minimal Oversight">
              Special districts control more combined revenue than many state governments, yet fewer
              than 40 percent publish their budgets online. Their elections draw vanishingly low turnout.
              Board members are frequently appointed rather than elected, and meetings are held at times
              designed to discourage attendance. This is not a conspiracy; it is a structural incentive
              problem baked into the system.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">School Districts</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              School districts — 12,546 independent ones — represent the single largest
              category of special-purpose government. Their boundaries routinely ignore city limits: in
              Texas, Lewisville Independent School District encompasses four separate municipalities.
              Most are governed by elected boards with taxing authority, though{" "}
              <a href="https://cga.ct.gov/2024/rpt/pdf/2024-R-0149.pdf" target="_blank" rel="noopener noreferrer">
                Virginia&rsquo;s districts
              </a>{" "}
              have no independent taxing power and must rely on county governments for funding. The
              dramatic historical trend here is consolidation: the United States had roughly 108,000
              school districts in 1942. Elinor Ostrom&rsquo;s research career was sparked by observing
              that{" "}
              <a href="https://web.pdx.edu/~nwallace/EHP/OstromPolyGov.pdf" target="_blank" rel="noopener noreferrer">
                this massive amalgamation
              </a>{" "}
              had been implemented &ldquo;without much empirical underpinning, just on the belief that
              consolidated districts would be more efficient and equitable.&rdquo;
            </p>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">Regional Bodies</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Regional bodies — councils of governments (COGs), metropolitan planning
              organizations (MPOs), and joint powers authorities (JPAs) — are not governments, strictly
              speaking, but wield substantial influence over transportation funding, land-use planning,
              and regional coordination. The{" "}
              <a href="https://ewdpulse.com/the-southern-california-association-of-governments-scag/" target="_blank" rel="noopener noreferrer">
                Southern California Association of Governments
              </a>{" "}
              (SCAG) is the nation&rsquo;s largest COG and MPO, covering six counties and 191 cities.
              Nearly half of the nation&rsquo;s{" "}
              <a href="https://en.wikipedia.org/wiki/Metropolitan_planning_organization" target="_blank" rel="noopener noreferrer">
                420-plus MPOs
              </a>{" "}
              operate as part of a regional council. Congress mandated MPOs in 1962 for urbanized areas
              exceeding 50,000 people, giving unelected regional planners control over billions in
              federal highway and transit dollars.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <CalloutBox variant="did-you-know" title="One County Has More Special Districts Than Ten States">
              Cook County, Illinois contains 244 special districts. Illinois has 3,068 statewide — the
              most in the nation. The state passed its Mosquito Abatement District Act in 1927, giving
              citizens the right to petition for a district to control mosquitoes. Only five of the
              state&rsquo;s 20 mosquito abatement districts have websites.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <h2 className="lg-prose-heading">Tribal Governments</h2>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Tribal governments add a constitutionally distinct layer. The Bureau of
              Indian Affairs recognizes{" "}
              <a href="https://www.congress.gov/crs-product/R47414" target="_blank" rel="noopener noreferrer">
                574 federally recognized tribes
              </a>{" "}
              — 347 in the contiguous states, 227 in Alaska — each possessing inherent sovereignty
              predating the U.S. Constitution. Tribal jurisdiction intersects with local government in
              complex, often contested ways. Tribes operate courts, police forces, schools, and utilities
              on trust lands, and recent Supreme Court decisions have{" "}
              <a href="https://www.ncai.org/about-tribes" target="_blank" rel="noopener noreferrer">
                reshaped the boundaries
              </a>{" "}
              of tribal authority over non-members.
            </p>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The Census of Governments has tracked this ecosystem every five years since 1952. The
              headline trend: total governments declined sharply from 1942 to the 1970s as school
              districts consolidated, then climbed back as special districts multiplied. The net effect
              is a system where a homeowner in suburban Illinois may live under the jurisdiction of a
              municipality, a county, a township, a school district, a park district, a library district,
              a fire protection district, a mosquito abatement district, and a sanitary district — nine
              layers of elected or appointed authority, most of them invisible until the property tax
              bill arrives.
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
