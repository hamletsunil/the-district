"use client";

import { CalloutBox } from "@/components/civic-guide/CalloutBox";
import { PullQuote } from "@/components/article/PullQuote";
import { AtAGlance } from "@/components/article/AtAGlance";
import { SourcesCitations } from "@/components/article/SourcesCitations";
import { KeyFact } from "@/components/civic-guide/KeyFact";
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
  { title: "Counties 101", outlet: "National Association of Counties", url: "https://www.naco.org/page/counties-101" },
  { title: "County Structure, Authority and Finances", outlet: "National Association of Counties", url: "https://www.naco.org/page/county-structure-authority-and-finances" },
  { title: "2026 NACo Federal Policy Priorities", outlet: "National Association of Counties", url: "https://www.naco.org/resource/2026-naco-federal-policy-priorities" },
  { title: "Board of Supervisors", outlet: "Los Angeles County", url: "https://bos.lacounty.gov/executive-office/about-us/board-of-supervisors/" },
  { title: "Measure G: Expanding the Board of Supervisors", outlet: "LAist", url: "https://laist.com/news/politics/2024-election-california-general-measure-g-los-angeles-county-board-of-supervisors" },
  { title: "History of Metropolitan Nashville Government", outlet: "Nashville.gov", url: "https://www.nashville.gov/departments/government/history-metro" },
  { title: "Jacksonville Consolidation", outlet: "Wikipedia", url: "https://en.wikipedia.org/wiki/Jacksonville_Consolidation" },
  { title: "Creation of UniGov", outlet: "Encyclopedia of Indianapolis", url: "https://indyencyclopedia.org/unigov-creation-of-1967-1971/" },
  { title: "The Undemocratic Making of Indianapolis", outlet: "Belt Magazine", url: "https://beltmag.com/undemocratic-indianapolis-unigov-poletika/" },
  { title: "A 10-Year Perspective of the Merger of Louisville and Jefferson County, KY", outlet: "Abell Foundation", url: "https://abell.org/publication/a-10-year-perspective-of-the-merger-of-louisville-and-jefferson-county-ky/" },
  { title: "County Government Abolishment", outlet: "Connecticut General Assembly", url: "https://cga.ct.gov/PS98/rpt/olr/htm/98-R-0086.htm" },
  { title: "The Consolidation of City and County Governments", outlet: "University of Tennessee MTAS", url: "https://www.mtas.tennessee.edu/system/files/mrln/mknowledge/main/MTAS%20Consolidation%20Research%202021.pdf" },
];

export function CountyGovernmentChapter() {
  return (
    <>
      <AtAGlance
        stats={[
          { value: "3,143", label: "Counties and equivalents" },
          { value: "$743B", label: "Annual county investment" },
          { value: "91%", label: "Of local jails run by counties" },
        ]}
        finding="Roughly 37% of Americans live outside any incorporated city. For them, the county is their city government -- except with thinner staffing, longer response times, and fewer sidewalks."
      />

      <section className="lg-chapter-body">
        <div className="lg-prose-container">
          <FadeIn>
            <p className="lg-prose-paragraph">
              The American <a href="/articles/how-local-government-works/glossary#county">county</a> is a paradox: a unit of government that most residents cannot name
              the leaders of, yet one that runs the jail they might end up in, maintains the road they
              drive on, records the deed to their house, and prosecutes the crimes committed in their
              neighborhood. Counties invest{" "}
              <a href="https://www.naco.org/resource/2026-naco-federal-policy-priorities" target="_blank" rel="noopener noreferrer">
                nearly $743 billion annually
              </a>{" "}
              through the work of{" "}
              <a href="https://www.naco.org/page/counties-101" target="_blank" rel="noopener noreferrer">
                3.6 million employees
              </a>. They operate{" "}
              <a href="https://www.naco.org/page/counties-101" target="_blank" rel="noopener noreferrer">
                91% of all local jails
              </a>{" "}
              and support{" "}
              <a href="https://www.naco.org/page/counties-101" target="_blank" rel="noopener noreferrer">
                over 900 hospitals
              </a>. And almost nobody pays attention to how they are governed.
            </p>
          </FadeIn>

          <FadeIn>
            <KeyFact value="3,143" unit="counties" description="Governing courts, jails, roads, elections, and public health across every state except Connecticut and Rhode Island." />
          </FadeIn>

          <FadeIn delay={0.05}>
            <h3 className="lg-prose-subheading">The dual nature: state agent, local provider.</h3>
            <p className="lg-prose-paragraph">
              Counties occupy an awkward constitutional space. They are, at their core, administrative
              subdivisions of the state — created by state legislatures to carry out state functions at
              the local level. The county recorder files deeds because the state needs a property
              records system. The county assessor values property because the state needs a tax base.
              The county sheriff enforces state law. The county clerk runs state elections. Unlike
              cities, which incorporate voluntarily and receive charters granting them self-governance,
              counties{" "}
              <a href="https://www.naco.org/page/county-structure-authority-and-finances" target="_blank" rel="noopener noreferrer">
                exist at the pleasure of the legislature
              </a>. A state can redraw county boundaries, merge counties, or strip them of powers
              without asking permission. But counties are also the primary government for everyone who
              lives outside a city. Roughly{" "}
              <a href="https://www.census.gov/library/stories/2020/05/america-a-nation-of-small-towns.html" target="_blank" rel="noopener noreferrer">
                37% of Americans
              </a>{" "}
              — well over 100 million people — reside in unincorporated areas, from exurban
              subdivisions in Georgia to ranch land in Wyoming to dense urban neighborhoods in Los
              Angeles County that never incorporated. For them, the county is their city government,
              except with thinner staffing, longer response times, and fewer sidewalks.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <CalloutBox variant="why-matters" title="Over 100 Million Americans Without a City Government">
              If you live in an unincorporated area, the county is your city — handling roads, police,
              planning, and public works. But county governments are typically structured to serve as
              state administrative arms, not as responsive local service providers. A large share of
              Americans receive municipal-type services from an entity never designed to provide them,
              with governing boards whose districts may span hundreds of square miles.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <h3 className="lg-prose-subheading">The board: small bodies, enormous power.</h3>
            <p className="lg-prose-paragraph">
              The governing body goes by various names — board of supervisors in California,
              commissioners court in Texas, county commission across the South and Midwest, county
              council in reformed governments. The structure is almost universally district-based. The
              size variations are remarkable.{" "}
              <a href="https://bos.lacounty.gov/executive-office/about-us/board-of-supervisors/" target="_blank" rel="noopener noreferrer">
                Los Angeles County&rsquo;s Board of Supervisors
              </a>{" "}
              consists of five people governing roughly 10 million residents, each representing about
              2 million constituents — more than the population of New Mexico. They manage an{" "}
              <a href="https://bos.lacounty.gov/executive-office/about-us/board-of-supervisors/" target="_blank" rel="noopener noreferrer">
                annual budget exceeding $50 billion
              </a>. For decades, the supervisors were nicknamed the{" "}
              <a href="https://lapublicpress.org/2024/05/supervising-the-la-county-supervisors/" target="_blank" rel="noopener noreferrer">
                &ldquo;five little kings&rdquo;
              </a>{" "}
              for their extraordinary concentration of executive, legislative, and quasi-judicial
              power. In November 2024, LA County voters{" "}
              <a href="https://www.nbclosangeles.com/decision-2024/los-angeles-county-measure-g-election-results/3552655/" target="_blank" rel="noopener noreferrer">
                narrowly approved Measure G
              </a>{" "}
              (51-49%) to expand the board to nine members and create an elected county executive — the
              most significant structural reform in the county&rsquo;s 172-year history, though full
              implementation stretches to 2032. At the other extreme, some Georgia counties operate
              under a sole commissioner: one person serving as the entire legislative and executive
              branch. Texas standardizes at five — a county judge who chairs the commissioners court
              and four commissioners. A{" "}
              <a href="https://www.naco.org/page/county-structure-authority-and-finances" target="_blank" rel="noopener noreferrer">
                majority of counties
              </a>{" "}
              — 61% — still operate under the traditional commission form, a structure designed for a
              rural, 19th-century America that bears little resemblance to the urbanized counties that
              now contain most of the population.
            </p>
          </FadeIn>

          <FadeIn>
            <PullQuote
              text="Los Angeles County's five supervisors govern 10 million residents with a $50 billion budget. For decades they were nicknamed the 'five little kings.'"
              city="Los Angeles County"
              state="CA"
              className="lg-pull-quote"
            />
          </FadeIn>

          <FadeIn>
            <h3 className="lg-prose-subheading">Row officers: the independently elected constellation.</h3>
            <p className="lg-prose-paragraph">
              The most distinctive feature of county government is the array of independently elected
              &ldquo;row officers&rdquo; — officials who answer to voters, not to the board. A typical
              county ballot includes the sheriff, district attorney, assessor, recorder or clerk,
              treasurer-tax collector, auditor-controller, and sometimes a coroner and public
              administrator. NACo counts{" "}
              <a href="https://www.naco.org/page/county-structure-authority-and-finances" target="_blank" rel="noopener noreferrer">
                18,629 independently elected constitutional officers
              </a>{" "}
              nationwide. The sheriff is the most consequential. In most counties, the office is not
              subordinate to the county board. The sheriff sets law enforcement priorities, runs the
              county jail, serves court orders, and in rural counties provides the only police presence
              for miles. The board approves the budget but cannot direct how the office operates. A
              board of supervisors can adopt a policing policy; the sheriff can ignore it. The only
              recourse is the ballot box. The district attorney occupies a similar space of
              independence, deciding who gets charged and what plea deals to offer with no
              accountability to the board that funds the office. The coroner — still elected in{" "}
              <a href="https://christinavandepol.com/death-and-politics-electing-qualified-coroners/" target="_blank" rel="noopener noreferrer">
                roughly 80% of jurisdictions
              </a>{" "}
              that use the coroner system — exemplifies the persistence of tradition over expertise. In
              South Carolina, the only educational requirement is{" "}
              <a href="https://www.governing.com/politics/south-carolina-still-elects-county-coroners-heres-why" target="_blank" rel="noopener noreferrer">
                a high school diploma
              </a>. The logic of electing these officers is democratic: independence prevents the{" "}
              <a href="https://cumberlink.com/news/local/row-officers-officials-question-defend-elected-status-of-row-officers/article_9cc93b7e-67b5-11e4-839e-cf474284533b.html" target="_blank" rel="noopener noreferrer">
                concentration of power
              </a>{" "}
              in the county board. The cost is coordination — a county administrator must negotiate
              with elected officials who owe nothing to the board that appointed the administrator.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <CalloutBox variant="misconception" title={`"The County Board Controls the Sheriff"`}>
              It does not. In most states, the sheriff is an independently elected constitutional
              officer whose internal operations are not subject to the directives of the county board.
              The board sets the budget, but the sheriff decides how to deploy deputies, which laws to
              prioritize, and how to run the jail. This structural independence is the reason
              sheriff&rsquo;s races have become some of the most consequential — and expensive — local
              elections in the country.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <h3 className="lg-prose-subheading">The county administrator: a professional in a political thicket.</h3>
            <p className="lg-prose-paragraph">
              As counties have grown more complex, many have hired professional administrators —
              appointed executives who manage day-to-day operations under the board&rsquo;s direction.
              The role parallels a{" "}
              <a href="https://icma.org/what-professional-city-town-and-county-managers-do" target="_blank" rel="noopener noreferrer">
                city manager
              </a>, but with a critical structural difference: the county administrator shares
              executive authority with all those independently elected officers. A city manager hires
              and fires the police chief. A county administrator works alongside an elected sheriff who
              owes nothing to the board. This makes county administration a more constrained, more
              politically delicate enterprise. The administrator coordinates and cajoles where a city
              manager can direct. In counties with an elected county executive — an arrangement found
              in places like Nassau County, New York, and Montgomery County, Maryland — the executive
              serves as a true chief executive,{" "}
              <a href="https://en.wikipedia.org/wiki/County_executive" target="_blank" rel="noopener noreferrer">
                presiding over the legislative body, signing legislation, and managing departments
              </a>. The executive model concentrates accountability in a single elected official,
              trading the diffusion of the commission form for something closer to a mayoral system.
            </p>
          </FadeIn>

          <FadeIn>
            <h3 className="lg-prose-subheading">Unincorporated America.</h3>
            <p className="lg-prose-paragraph">
              The population of unincorporated areas represents a significant and often overlooked
              share of the country. In fast-growing Sunbelt states, entire suburban neighborhoods exist
              as &ldquo;county islands&rdquo; surrounded by city territory. The differences are
              tangible: county roads are maintained to lower standards, the sheriff&rsquo;s office
              provides policing rather than a dedicated city department, and land use planning may be
              handled by a thinly staffed county planning division. Some unincorporated areas are
              affluent enclaves that prefer lighter regulation. Others are lower-income communities
              that lack the tax base to incorporate and the political power to demand better county
              services. In either case, the county provides municipal-type services through a structure
              never really designed for that purpose.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <CalloutBox variant="state-variation" title="Counties Range from Omnipresent to Nonexistent">
              Texas has 254 functioning county governments, each with a constitutionally mandated
              commissioners court. Connecticut has zero — its counties were abolished as functioning
              governments in 1960 and replaced by councils of government in 2022. Louisiana has 64
              parishes. Alaska has 19 organized boroughs plus a vast unorganized borough covering most
              of the state. Virginia&rsquo;s independent cities are not part of any county at all.
              Thirteen states grant all counties home rule authority; fourteen apply strict
              Dillon&rsquo;s Rule.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <h3 className="lg-prose-subheading">The 3,143: variation at scale.</h3>
            <p className="lg-prose-paragraph">
              The{" "}
              <a href="https://en.wikipedia.org/wiki/List_of_United_States_counties_and_county_equivalents" target="_blank" rel="noopener noreferrer">
                3,143 counties and county equivalents
              </a>{" "}
              encompass an almost absurd range. Louisiana calls them parishes — a legacy of French
              colonial and Catholic ecclesiastical administration. Alaska uses boroughs and has only 19
              organized ones; the remaining 56% of the state&rsquo;s land mass constitutes a single{" "}
              <a href="https://en.wikipedia.org/wiki/County_(United_States)" target="_blank" rel="noopener noreferrer">
                unorganized borough
              </a>.{" "}
              <a href="https://cga.ct.gov/PS98/rpt/olr/htm/98-R-0086.htm" target="_blank" rel="noopener noreferrer">
                Connecticut abolished county government entirely in 1960
              </a>; in 2022, the Census Bureau formally replaced its eight legacy counties with{" "}
              <a href="https://en.wikipedia.org/wiki/Councils_of_governments_in_Connecticut" target="_blank" rel="noopener noreferrer">
                nine councils of government as county equivalents
              </a>. Rhode Island&rsquo;s counties have no government function. Virginia&rsquo;s
              independent cities exist outside any county, a structure unique in the nation.{" "}
              <a href="https://statutes.capitol.texas.gov/Docs/LG/htm/LG.81.htm" target="_blank" rel="noopener noreferrer">
                Texas has 254 counties
              </a>{" "}
              — more than any other state — each with a constitutionally mandated commissioners court.
              Georgia has 159, second only to Texas, with some so small that the sole commissioner runs
              the entire government from what amounts to a home office.
            </p>
          </FadeIn>

          <FadeIn>
            <h3 className="lg-prose-subheading">Consolidation: the recurring fantasy.</h3>
            <p className="lg-prose-paragraph">
              The idea of merging a city and its surrounding county into a single government has
              appealed to reformers for over a century. The landmark consolidations are{" "}
              <a href="https://www.nashville.gov/departments/government/history-metro" target="_blank" rel="noopener noreferrer">
                Nashville-Davidson County (1962)
              </a>,{" "}
              <a href="https://en.wikipedia.org/wiki/Jacksonville_Consolidation" target="_blank" rel="noopener noreferrer">
                Jacksonville-Duval County (1968)
              </a>, and{" "}
              <a href="https://indyencyclopedia.org/unigov-creation-of-1967-1971/" target="_blank" rel="noopener noreferrer">
                Indianapolis-Marion County (1970)
              </a>. Nashville&rsquo;s was the pioneer — approved 56-44% by voters after a failed 1958
              attempt, it became the national model for urban-county mergers. Jacksonville&rsquo;s
              followed, driven by school accreditation crises, river pollution, and municipal
              corruption. Louisville and Jefferson County merged in 2003,{" "}
              <a href="https://corescholar.libraries.wright.edu/special_ms603/5/" target="_blank" rel="noopener noreferrer">
                instantly vaulting Louisville from the 65th to the 18th largest city
              </a>{" "}
              in America. The appeal is obvious: eliminate duplicate departments, streamline permitting,
              present a unified front for economic development. The reality is politically brutal. Of{" "}
              <a href="https://www.mtas.tennessee.edu/system/files/mrln/mknowledge/main/MTAS%20Consolidation%20Research%202021.pdf" target="_blank" rel="noopener noreferrer">
                132 consolidation attempts between 1921 and 1996, only 22 succeeded
              </a>{" "}
              — a 16% success rate. Suburban residents fear higher taxes. City residents fear diluted
              political power, a concern with particular force where the city is majority-minority and
              the county is not. Indianapolis&rsquo;s UniGov was{" "}
              <a href="https://indyencyclopedia.org/unigov-creation-of-1967-1971/" target="_blank" rel="noopener noreferrer">
                enacted by the state legislature without a referendum
              </a>{" "}
              — proposed by then-Mayor Richard Lugar — precisely because supporters knew voters would
              reject it. The merger tripled the city&rsquo;s land area and added 250,000 residents
              overnight, but{" "}
              <a href="https://beltmag.com/undemocratic-indianapolis-unigov-poletika/" target="_blank" rel="noopener noreferrer">
                diluted African American voting power
              </a>{" "}
              from 23% of the old city population to 16% of the expanded jurisdiction. Schools were
              explicitly excluded, preserving segregated district boundaries. Louisville&rsquo;s merger
              produced{" "}
              <a href="https://abell.org/publication/a-10-year-perspective-of-the-merger-of-louisville-and-jefferson-county-ky/" target="_blank" rel="noopener noreferrer">
                more modest results
              </a>: government costs declined slightly, fewer employees maintained comparable services,
              but 83 semi-autonomous small cities within Jefferson County continued to operate
              independently, maintaining their own police forces and zoning codes. Consolidation rarely
              produces the clean merger its advocates promise.
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
