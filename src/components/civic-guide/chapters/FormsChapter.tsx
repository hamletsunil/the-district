"use client";

import { ScrollySection, StepContent } from "@/components/civic-guide/ScrollySection";
import { OrgChartDiagram } from "@/components/civic-guide/OrgChartDiagram";
import { CalloutBox } from "@/components/civic-guide/CalloutBox";
import { PullQuote } from "@/components/article/PullQuote";
import { AtAGlance } from "@/components/article/AtAGlance";
import { SourcesCitations } from "@/components/article/SourcesCitations";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { motion, AnimatePresence } from "framer-motion";
import type { GovernmentForm } from "@/data/civic-guide/types-city";
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
  { title: "2022 Municipal Form of Government Survey", outlet: "International City/County Management Association", url: "https://icma.org/documents/forms-local-government" },
  { title: "Forms of Municipal Government", outlet: "National League of Cities", url: "https://www.nlc.org/resource/cities-101-types-of-local-governments/" },
  { title: "2022 Census of Governments", outlet: "U.S. Census Bureau", url: "https://www.census.gov/data/tables/2022/econ/gus/2022-governments.html" },
  { title: "Council-Manager Form of Government", outlet: "ICMA", url: "https://icma.org/page/council-manager-form-government" },
  { title: "Portland Voters Approve Sweeping Changes to City Government", outlet: "Oregon Public Broadcasting", url: "https://www.opb.org/article/2022/11/08/portland-oregon-ballot-measure-26-228-charter-reform-results/" },
  { title: "Commission Government: The History", outlet: "Texas State Historical Association", url: "https://www.tshaonline.org/handbook/entries/commission-form-of-city-government" },
  { title: "Hamlet — Search local government meetings", outlet: "Hamlet", url: "https://www.myhamlet.com/search?utm_source=district&utm_medium=internal&utm_content=sources" },
];

const FORM_STEPS: { form: GovernmentForm; label: string; title: string; description: string }[] = [
  {
    form: "CM",
    label: "48% of cities",
    title: "Council-Manager",
    description: "An elected council sets policy. A hired professional manager runs day-to-day operations. The mayor is typically ceremonial — chairing meetings, cutting ribbons, but not running the city. Think of it as a corporate board hiring a CEO.",
  },
  {
    form: "SM",
    label: "30% of cities",
    title: "Strong Mayor-Council",
    description: "The mayor is the chief executive with real power — hiring and firing department heads, preparing the budget, vetoing legislation. New York, Chicago, Los Angeles, Houston all use this model. The mayor IS the government in a way no council-manager mayor ever is.",
  },
  {
    form: "WM",
    label: "8% of cities",
    title: "Weak Mayor-Council",
    description: "The mayor chairs the council but has limited executive authority. Administrative power is dispersed among council members and committees. No single person runs the show — which can mean consensus governance or paralysis.",
  },
  {
    form: "CO",
    label: "<1% of cities",
    title: "Commission",
    description: "Each elected commissioner runs a city department — one heads police, another fire, another public works. No separation between legislative and executive. Born in Galveston, Texas after the 1900 hurricane. Nearly extinct today — fewer than 150 cities still use it.",
  },
  {
    form: "TM",
    label: "5% of cities",
    title: "Town Meeting",
    description: "All registered voters gather — physically, in a room — to vote on budgets, ordinances, and policy. The purest form of direct democracy left in America. Found almost exclusively in New England, where towns have governed this way since the 1600s.",
  },
];

function FormMorpherViz({ stepIndex }: { stepIndex: number }) {
  const step = FORM_STEPS[Math.min(stepIndex, FORM_STEPS.length - 1)];

  return (
    <div className="lg-form-morpher">
      <AnimatePresence mode="wait">
        <motion.div
          key={step.form}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="lg-form-morpher-inner"
        >
          <div className="lg-form-morpher-label">{step.title}</div>
          <OrgChartDiagram form={step.form} />
          <div className="lg-form-morpher-pct">{step.label}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export function FormsChapter() {
  return (
    <>
      <AtAGlance
        stats={[
          { value: "5", label: "Forms of government" },
          { value: "48%", label: "Use council-manager" },
          { value: "30%", label: "Use strong mayor" },
        ]}
        finding="The person actually running your city is likely someone you have never heard of."
      />

      {/* Scrollytelling: Government Forms */}
      <ScrollySection
        steps={FORM_STEPS.map((step) => ({
          content: (
            <StepContent label={step.label} title={step.title}>
              <p>{step.description}</p>
            </StepContent>
          ),
        }))}
        textPosition="left"
        renderVisualization={(stepIndex) => (
          <FormMorpherViz stepIndex={stepIndex} />
        )}
      />

      {/* Prose */}
      <section className="lg-chapter-body">
        <div className="lg-prose-container">
          <FadeIn>
            <p className="lg-prose-paragraph">
              The <a href="/articles/how-local-government-works/glossary#council-manager">council-manager</a> form dominates American local government. According to the{" "}
              <a href="https://icma.org/documents/forms-local-government" target="_blank" rel="noopener noreferrer">
                International City/County Management Association
              </a>, approximately 48 percent of municipalities with populations above 2,500 use it —
              and the percentage climbs higher among mid-sized cities where professional management
              is most valued. Phoenix, Austin, Dallas, San Antonio, Charlotte, and Kansas City all
              run this way.
            </p>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The strong-mayor model concentrates power. When New York&rsquo;s mayor proposes a $107
              billion budget, the city council can modify it but cannot substitute its own. When
              Chicago&rsquo;s mayor fires a police superintendent, no council vote is required. The
              mayor hires department heads, negotiates union contracts, and sets the agenda. This is
              the model most Americans imagine when they think of city government — and it&rsquo;s the
              model that produces the highest-profile local politicians.
            </p>
          </FadeIn>

          <FadeIn>
            <CalloutBox variant="misconception" title="&quot;Mayors Run Cities&quot;">
              In the 48% of American cities that use the council-manager form, the mayor is often
              a part-time position that chairs council meetings and handles ceremonial duties. The
              person actually running the city — making hiring decisions, preparing budgets,
              directing departments — is the city manager, a hired professional who answers to
              the council. It&rsquo;s the difference between a board chair and a CEO.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The commission form is a historical curiosity. Born in Galveston, Texas after the
              devastating 1900 hurricane killed an estimated 8,000 people, it was designed for
              emergency efficiency: each commissioner ran a city department directly. At its peak
              in the early twentieth century, hundreds of cities adopted it. Today fewer than 150
              remain. The fundamental problem — no one is in charge of the whole — proved
              unworkable for modern governance.
            </p>
          </FadeIn>

          <FadeIn>
            <PullQuote
              text="Portland voters approved the most dramatic structural change any major American city has undertaken in decades — abolishing its commission form and adopting a council-manager system."
              city="Portland"
              state="OR"
              className="lg-pull-quote"
            />
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              Portland, Oregon was the last major U.S. city to use the commission form — until 2022,
              when voters{" "}
              <a href="https://www.opb.org/article/2022/11/08/portland-oregon-ballot-measure-26-228-charter-reform-results/" target="_blank" rel="noopener noreferrer">
                approved a sweeping charter reform
              </a>{" "}
              that replaced it with a council-manager system, expanded the council from five to twelve
              members, and introduced ranked-choice voting. The transition, which took effect in 2025,
              was the most dramatic structural change any major American city had undertaken in decades.
            </p>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              <a href="/articles/how-local-government-works/glossary#town-meeting">Town meetings</a> persist in New England as a living artifact of colonial governance.
              Brookline, Massachusetts — population 63,000 — still governs by open town meeting,
              where any registered voter can attend, speak, and vote on the annual budget. The
              practical reality is that a few hundred engaged residents make decisions for tens of
              thousands. Defenders call it the purest form of democracy. Critics note that the
              participants are overwhelmingly older, whiter, and wealthier than the population they
              represent — the same demographic skew that plagues local elections everywhere, amplified
              by the additional barrier of showing up on a Tuesday evening for three hours.
            </p>
          </FadeIn>

          <FadeIn>
            <CalloutBox variant="state-variation" title="Why Forms Differ By Region">
              The council-manager form spread through the South and West alongside Progressive Era
              reformers who wanted to kill patronage machines. The Northeast kept its mayors and
              town meetings &mdash; older traditions with deeper roots. The Midwest split the
              difference. A map of government forms is, roughly, a map of when each region
              professionalized.
            </CalloutBox>
          </FadeIn>

          <FadeIn>
            <p className="lg-prose-paragraph">
              The choice of form has consequences you can measure. Council-manager cities
              consistently spend less per capita, carry lower tax rates, and earn higher bond
              ratings than comparable mayor-council cities. The trade-off is blunt: the person
              making the most consequential decisions &mdash; hiring, firing, allocating millions
              &mdash; never faces a voter. Search the{" "}
              <a href="https://www.myhamlet.com/search?utm_source=district&utm_medium=internal&utm_content=prose" target="_blank" rel="noopener noreferrer">
                meeting transcripts on Hamlet
              </a>{" "}
              and you can watch the tension between efficiency and representation play out in real
              time, city by city, Tuesday night by Tuesday night.
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
