"use client";

import { CalloutBox } from "@/components/civic-guide/CalloutBox";
import { PullQuote } from "@/components/article/PullQuote";
import { AtAGlance } from "@/components/article/AtAGlance";
import { SourcesCitations } from "@/components/article/SourcesCitations";
import { StatBar } from "@/components/civic-guide/StatBar";
import { ComparisonTable } from "@/components/civic-guide/ComparisonTable";
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
  { title: "CAO Salary and Compensation Survey", outlet: "ICMA", url: "https://icma.org/articles/article/cao-salary-and-compensation-survey" },
  { title: "2025 California City Managers Survey", outlet: "Rose Institute of State and Local Government", url: "https://roseinstitute.org/2025-california-city-managers-survey-a-profile-of-the-profession/" },
  { title: "Cities 101 — Mayoral Powers", outlet: "National League of Cities", url: "https://www.nlc.org/resource/cities-101-mayoral-powers/" },
  { title: "District vs At-Large Elections", outlet: "University of Chicago Center for Effective Government", url: "https://effectivegov.uchicago.edu/primers/district-vs-at-large-elections" },
  { title: "Top Five Things to Know About the Municipal Clerk Position", outlet: "ICMA", url: "https://icma.org/articles/pm-magazine/pm-article-top-five-things-know-about-municipal-clerk-position" },
  { title: "How Cities and Towns Acquire Legal Services", outlet: "MRSC", url: "https://mrsc.org/stay-informed/mrsc-insight/october-2024/acquire-legal-services" },
  { title: "Civilian Oversight — Assessing the Evidence", outlet: "Council on Criminal Justice", url: "https://counciloncj.foleon.com/policing/assessing-the-evidence/xi-civilian-oversight" },
  { title: "Legislative vs. Quasi-Judicial Land Use Decisions", outlet: "Iowa State Extension", url: "https://www.extension.iastate.edu/communities/legislative-v-quasi-judicial-land-use-decisions" },
  { title: "Understanding the Role of Ethics Commissions", outlet: "Western City Magazine / Institute for Local Government", url: "https://www.ca-ilg.org/ethics-commissions" },
  { title: "Dallas City Manager Contract Details", outlet: "WFAA", url: "https://www.wfaa.com/article/news/local/dallas-county/dallas-city-manager-salary-comparison/287-c167603f-3b99-48b6-b942-8d3402c36393" },
  { title: "Sample City Manager Employment Agreement", outlet: "Texas City Management Association", url: "https://www.tcma.org/DocumentCenter/View/155/Sample-Employment-Agreement-PDF" },
  { title: "Twenty-Five Largest U.S. Cities: Executive and Mayoral Salary Data", outlet: "NYC Quadrennial Advisory Commission", url: "https://www.nyc.gov/assets/quadrennial/downloads/pdf/tables/Executive-Mayoral-Data.pdf" },
];

export function RolesChapter() {
  return (
    <>
      <AtAGlance
        stats={[
          { value: "$250K+", label: "Average city manager salary, large cities" },
          { value: "7.3 yrs", label: "Average manager tenure" },
          { value: "6 of 50", label: "Police agencies with civilian disciplinary oversight" },
        ]}
        finding="The person actually running most American cities is an appointed professional most residents have never heard of."
      />

      <section className="lg-chapter-body">
        <div className="lg-prose-container">
          <FadeIn>
            <p className="lg-prose-paragraph">
              A city&rsquo;s organizational chart is a map of power — who holds it, who delegates it,
              who merely advises. The titles look similar across municipalities, but the actual authority
              behind each role shifts dramatically depending on the form of government, state law, and
              local charter. Understanding the roles means understanding the difference between the
              person residents think is in charge and the person who actually is.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <h3 className="lg-prose-subhead">The Mayor: Three Jobs Under One Title</h3>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The word &ldquo;mayor&rdquo; describes at least three distinct positions in American local
              government. In New York, the mayor earns $258,750, commands 300,000 city employees,
              appoints commissioners, prepares a $110 billion budget, and wields line-item veto power —
              a strong-mayor role that functions as a genuine chief executive ({" "}
              <a href="https://pix11.com/news/local-news/nyc-mayor-eric-adams-earns-708-90-daily-what-is-his-annual-salary/" target="_blank" rel="noopener noreferrer">
                PIX11
              </a>). In Phoenix, the mayor presides over council meetings and serves as the city&rsquo;s
              public face but holds exactly one vote on a seven-member council — no veto, no appointment
              power, no independent budget authority. The city manager runs the operation. In hundreds of
              small weak-mayor municipalities, the mayor&rsquo;s function is almost entirely ceremonial:
              chairing meetings and signing documents the council has already approved.
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <p className="lg-prose-paragraph">
              Compensation reflects these differences. San Francisco&rsquo;s mayor earns $353,802; Los
              Angeles pays $283,827; Chicago $216,210. By contrast, mayors of small council-manager
              cities frequently earn $10,000 to $30,000 for what amounts to a part-time ceremonial role
              ({" "}
              <a href="https://www.nyc.gov/assets/quadrennial/downloads/pdf/tables/Executive-Mayoral-Data.pdf" target="_blank" rel="noopener noreferrer">
                NYC Quadrennial Commission
              </a>). The common misconception — that &ldquo;mayor&rdquo; means &ldquo;boss&rdquo; —
              collapses on contact with reality in the majority of American cities.
            </p>
          </FadeIn>

          <FadeIn>
            <StatBar
              title="Mayor Salary by City"
              items={[
                { label: "San Francisco", value: 353802, displayValue: "$353,802" },
                { label: "Los Angeles", value: 283827, displayValue: "$283,827" },
                { label: "New York City", value: 258750, displayValue: "$258,750" },
                { label: "Chicago", value: 216210, displayValue: "$216,210" },
                { label: "Phoenix", value: 30000, displayValue: "~$30,000", highlight: true },
              ]}
            />
          </FadeIn>

          <FadeIn>
            <CalloutBox variant="state-variation" title="The Same Title, Radically Different Power">
              A &ldquo;mayor&rdquo; in a strong-mayor city (New York, Chicago) commands the executive
              branch. A &ldquo;mayor&rdquo; in a council-manager city (Phoenix, Scottsdale, Durham)
              holds one vote and no veto. A &ldquo;city attorney&rdquo; may be an elected independent
              officer or an appointed employee serving at the manager&rsquo;s discretion. Always ask:
              what does this city&rsquo;s charter say the role actually does?
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <ComparisonTable
              title="Three Jobs Called 'Mayor'"
              columns={["", "Strong Mayor", "Council-Manager", "Weak Mayor"]}
              rows={[
                { label: "Chief Executive", values: ["Mayor", "City Manager", "None (shared)"] },
                { label: "Budget Authority", values: ["Mayor prepares", "Manager prepares", "Council prepares"] },
                { label: "Hiring Power", values: ["Mayor appoints", "Manager appoints", "Council appoints"] },
                { label: "Veto Power", values: ["Yes", "None", "None"] },
                { label: "Typical Salary", values: ["$200K–$350K", "Ceremonial stipend", "$10K–$30K"] },
              ]}
            />
          </FadeIn>

          <FadeIn>
            <h3 className="lg-prose-subhead">Council Members: Part-Time Legislators, Full-Time Demands</h3>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              City councils range from New York&rsquo;s 51-member body (each member earning $148,500
              with full-time staff) to five-person boards in small towns whose members receive nothing at
              all. The median reality falls somewhere between: a seven-member council in a mid-size city,
              members earning modest stipends, each logging 15 to 20 hours per week between meetings,
              constituent calls, committee work, and agenda review ({" "}
              <a href="https://gazette.com/pikespeakcourier/what-does-a-council-member-do-and-how-much-time-and-expense-is-expended-guest/article_c1c4267a-317a-11ea-b0a2-6b9fe6dabd45.html" target="_blank" rel="noopener noreferrer">
                Colorado Springs Gazette
              </a>).
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <p className="lg-prose-paragraph">
              Election structure matters. Scottsdale, AZ, elects all six council members and the mayor
              at large — every voter chooses every seat. Durham, NC, uses a mixed system: three ward
              representatives and three at-large members plus a mayor. At-large systems historically
              favored citywide name recognition and campaign fundraising capacity; district systems
              improved representation for geographically concentrated minority communities, a finding
              that drove federal Voting Rights Act litigation for decades ({" "}
              <a href="https://effectivegov.uchicago.edu/primers/district-vs-at-large-elections" target="_blank" rel="noopener noreferrer">
                University of Chicago Center for Effective Government
              </a>). Many cities now use hybrid models seeking both geographic accountability and
              citywide perspective.
            </p>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Committees do the substantive work. Standing committees on finance, public safety, land
              use, and infrastructure review legislation, hear staff presentations, and take public
              testimony before forwarding items to the full council. In larger cities like Los Angeles
              (15 council members, 20+ standing committees), the committee system resembles a miniature
              legislature. In a five-member council, committees are often informal or nonexistent —
              every item goes to the full body.
            </p>
          </FadeIn>

          <FadeIn>
            <PullQuote
              text="The city manager is the most powerful appointed official in American local government and among the least understood by residents."
              className="lg-pull-quote"
            />
          </FadeIn>

          <FadeIn>
            <h3 className="lg-prose-subhead">The City Manager: Professional Executive on a Short Leash</h3>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The city manager is the most powerful appointed official in American local government and
              among the least understood by residents. In council-manager cities — 48% of all
              municipalities — the manager hires and fires department heads, prepares the budget, directs
              daily operations, and serves as the council&rsquo;s primary policy advisor.
              Phoenix&rsquo;s city manager oversees 14,000 employees and a multi-billion-dollar budget.
              In large cities, city manager compensation routinely exceeds $250,000,
              with some of the biggest jurisdictions paying over $400,000 ({" "}
              <a href="https://icma.org/articles/article/cao-salary-and-compensation-survey" target="_blank" rel="noopener noreferrer">
                ICMA
              </a>).
            </p>
          </FadeIn>

          <FadeIn delay={0.05}>
            <p className="lg-prose-paragraph">
              The pipeline runs through graduate programs in public administration. An MPA degree from
              programs at Syracuse, Kansas, or USC has become the de facto credential, and ICMA&rsquo;s
              Credentialed Manager designation signals professional standing within the field. Average
              national tenure is 7.3 years, though California managers average just 4.5 years — a
              reflection of that state&rsquo;s politically volatile local politics ({" "}
              <a href="https://roseinstitute.org/2025-california-city-managers-survey-a-profile-of-the-profession/" target="_blank" rel="noopener noreferrer">
                Rose Institute
              </a>). The ICMA model employment agreement provides six to twelve months of severance upon
              termination without cause, an acknowledgment that managers serve at the council&rsquo;s
              pleasure and can be fired by a simple majority vote at any meeting ({" "}
              <a href="https://www.tcma.org/DocumentCenter/View/155/Sample-Employment-Agreement-PDF" target="_blank" rel="noopener noreferrer">
                TCMA
              </a>).
            </p>
          </FadeIn>

          <FadeIn>
            <KeyFact value="7.3" unit="years" description="Average city manager tenure nationally. In California: just 4.5." />
          </FadeIn>

          <FadeIn>
            <CalloutBox variant="misconception" title="&quot;The city manager is an unelected bureaucrat with no accountability.&quot;">
              City managers serve at the pleasure of the elected council and can be terminated by a
              simple majority vote at any public meeting — a shorter leash than any corporate CEO faces
              from a board of directors. The average tenure of 7.3 years reflects this vulnerability.
              Managers who lose a council majority typically depart within weeks, often negotiating a
              six-to-twelve-month severance package on their way out.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The distinction between &ldquo;city manager&rdquo; and &ldquo;city administrator&rdquo;
              is often misunderstood. A city manager derives authority from a charter and exercises
              independent executive discretion. A city administrator typically serves under a strong
              mayor as a chief of staff — coordinating departments and managing operations but reporting
              to the mayor, not the council ({" "}
              <a href="https://www.escribemeetings.com/blog/city-administrator-city-manager/" target="_blank" rel="noopener noreferrer">
                eScribe
              </a>).
            </p>
          </FadeIn>

          <FadeIn>
            <h3 className="lg-prose-subhead">The City Clerk: Institutional Memory</h3>
          </FadeIn>

          <FadeIn delay={0.05}>
            <p className="lg-prose-paragraph">
              The clerk maintains official records, administers elections, records council proceedings,
              issues licenses, and serves as custodian of the city seal. In some states the position is
              elected; in others, appointed. The clerk is often the municipality&rsquo;s longest-serving
              official and its institutional memory — the person who knows where every ordinance,
              contract, and resolution lives. ICMA notes the clerk is frequently &ldquo;the first and
              most direct link between residents and government&rdquo; ({" "}
              <a href="https://icma.org/articles/pm-magazine/pm-article-top-five-things-know-about-municipal-clerk-position" target="_blank" rel="noopener noreferrer">
                ICMA
              </a>).
            </p>
          </FadeIn>

          <FadeIn>
            <h3 className="lg-prose-subhead">The City Attorney: Legal Gatekeeper</h3>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Cities obtain legal counsel through in-house attorneys, contracted outside firms, or both.
              Larger cities maintain full legal departments — Los Angeles employs hundreds of attorneys —
              while small municipalities contract with private firms specializing in municipal law. The
              city attorney drafts ordinances, reviews contracts, advises the council on open-meeting and
              public-records law, and represents the city in litigation. Some city attorneys are elected
              (in many California cities, among others), giving them political independence but also
              introducing electoral considerations into legal advice ({" "}
              <a href="https://mrsc.org/stay-informed/mrsc-insight/october-2024/acquire-legal-services" target="_blank" rel="noopener noreferrer">
                MRSC
              </a>).
            </p>
          </FadeIn>

          <FadeIn>
            <h3 className="lg-prose-subhead">Department Heads: The Operational Layer</h3>
          </FadeIn>

          <FadeIn delay={0.05}>
            <p className="lg-prose-paragraph">
              Police and fire chiefs are appointed by the city manager (in council-manager cities) or the
              mayor (in strong-mayor cities). Civilian oversight boards exist in many jurisdictions but
              wield limited disciplinary power — only six of the fifty largest police agencies have
              oversight bodies with any disciplinary authority ({" "}
              <a href="https://counciloncj.foleon.com/policing/assessing-the-evidence/xi-civilian-oversight" target="_blank" rel="noopener noreferrer">
                Council on Criminal Justice
              </a>). Detroit&rsquo;s Board of Police Commissioners is notable for being partially
              elected: seven of eleven members are chosen by district voters.
            </p>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The planning director manages zoning administration, comprehensive plan updates, and
              development review, typically reporting to the city manager. Public works directors oversee
              streets, water, sewer, and solid waste — the infrastructure residents interact with
              daily — and earn an average of $151,359 nationally ({" "}
              <a href="https://www.salary.com/research/salary/recruiting/public-works-director-salary" target="_blank" rel="noopener noreferrer">
                Salary.com
              </a>). The finance director or treasurer manages investments, debt issuance, cash flow, and
              financial reporting; in some jurisdictions the treasurer is elected, while the finance
              director is always appointed.
            </p>
          </FadeIn>

          <FadeIn>
            <CalloutBox variant="why-matters" title="Council Compensation Shapes Who Can Serve">
              When Atherton, California, pays its council members nothing and expects 15+ hours per week,
              the position self-selects for retirees, the independently wealthy, or those whose employers
              tolerate extensive absences. Low pay is not frugality — it is a structural barrier to
              representative government. New York City&rsquo;s $148,500 council salary enables
              working-class residents to serve; a $300/month stipend does not.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <h3 className="lg-prose-subhead">Boards and Commissions: Volunteer Power</h3>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Planning commissions hold quasi-judicial authority over land-use decisions — variances,
              conditional use permits, subdivision approvals — and must follow due-process requirements
              resembling court proceedings: notice, hearing, evidence-based findings, impartial
              decision-makers ({" "}
              <a href="https://www.extension.iastate.edu/communities/legislative-v-quasi-judicial-land-use-decisions" target="_blank" rel="noopener noreferrer">
                Iowa State Extension
              </a>). Zoning boards of appeal hear variance requests and interpret the zoning code. Ethics
              commissions, where they exist, investigate complaints and may issue subpoenas, though most
              can only recommend disciplinary action to the manager or council ({" "}
              <a href="https://www.ca-ilg.org/ethics-commissions" target="_blank" rel="noopener noreferrer">
                Institute for Local Government
              </a>). These volunteer bodies constitute the broadest layer of civic participation in local
              government — thousands of residents serving unpaid on commissions that shape their
              communities.
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
