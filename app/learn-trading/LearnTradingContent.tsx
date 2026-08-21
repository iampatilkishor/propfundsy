"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import "./learn-trading.css";

const STORAGE_KEY = "propfundsy-learn-trading-progress";

/** Every checklist row on the page, in document order, tagged with the
 * syllabus section it belongs to. Drives the progress gauge, the per-section
 * tick counters in the table of contents, and localStorage persistence. */
const ROWS: { id: string; sectionId: string }[] = [
  { id: "varsity-intro", sectionId: "s2" },
  { id: "khan-finance", sectionId: "s2" },
  { id: "investor-gov", sectionId: "s2" },
  { id: "finra-investor-ed", sectionId: "s2" },
  { id: "mit-finance-theory", sectionId: "s2" },
  { id: "open-yale-econ252", sectionId: "s2" },
  { id: "varsity-fundamental", sectionId: "s3" },
  { id: "sec-edgar", sectionId: "s3" },
  { id: "finviz", sectionId: "s3" },
  { id: "fred", sectionId: "s3" },
  { id: "varsity-technical", sectionId: "s4" },
  { id: "tradingview", sectionId: "s4" },
  { id: "ibkr-traders-academy", sectionId: "s4" },
  { id: "optionseducation", sectionId: "s5" },
  { id: "cboe-options-institute", sectionId: "s5" },
  { id: "cme-institute", sectionId: "s5" },
  { id: "varsity-options-theory", sectionId: "s5" },
  { id: "paper-trading-sims", sectionId: "s6" },
  { id: "written-journal", sectionId: "s6" },
  { id: "varsity-innerworth", sectionId: "s6" },
  { id: "reminiscences-stock-operator", sectionId: "s6" },
  { id: "finra-brokercheck", sectionId: "s8" },
  { id: "fca-warning-list", sectionId: "s8" },
  { id: "sec-check-investment-pro", sectionId: "s8" },
  { id: "own-national-regulator", sectionId: "s8" },
];

const TOC = [
  { n: "00", id: "s0", label: "Baseline evidence" },
  { n: "01", id: "s1", label: "How free is sold back" },
  { n: "02", id: "s2", label: "Market mechanics", tick: true },
  { n: "03", id: "s3", label: "Reading a business", tick: true },
  { n: "04", id: "s4", label: "Price and structure", tick: true },
  { n: "05", id: "s5", label: "Derivatives", tick: true },
  { n: "06", id: "s6", label: "Practice and record", tick: true },
  { n: "07", id: "s7", label: "Behavioural register" },
  { n: "08", id: "s8", label: "Verification", tick: true },
];

function Row({
  id,
  href,
  title,
  desc,
  meta,
  checked,
  onToggle,
}: {
  id: string;
  href?: string;
  title: React.ReactNode;
  desc: React.ReactNode;
  meta: string;
  checked: boolean;
  onToggle: (id: string) => void;
}) {
  return (
    <div className={`lt-row${checked ? " lt-done" : ""}`}>
      <button
        className="lt-chk"
        aria-label="Mark complete"
        aria-pressed={checked}
        onClick={() => onToggle(id)}
      />
      <div>
        <div className="lt-r-t">
          {href ? (
            <a href={href} target="_blank" rel="noopener">
              {title}
            </a>
          ) : (
            title
          )}
        </div>
        <div className="lt-r-d">{desc}</div>
      </div>
      <div className="lt-r-m">{meta}</div>
    </div>
  );
}

function TocList({
  active,
  checkedCount,
  onNavigate,
}: {
  active: string;
  checkedCount: (sectionId: string) => { done: number; total: number };
  onNavigate?: () => void;
}) {
  return (
    <ul className="lt-toc">
      {TOC.map((item) => {
        const isOn = active === item.id;
        const counts = item.tick ? checkedCount(item.id) : null;
        return (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={isOn ? "lt-on" : ""}
              onClick={onNavigate}
            >
              <span className="lt-n">{item.n}</span>
              {item.label}
              {counts && (
                <span className={`lt-tick${counts.done === counts.total && counts.total > 0 ? " lt-full" : ""}`}>
                  {counts.total ? `${counts.done}/${counts.total}` : ""}
                </span>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
}

export default function LearnTradingContent() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [loaded, setLoaded] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [active, setActive] = useState("s0");
  const mainRef = useRef<HTMLDivElement>(null);

  // Load saved progress once, client-side only.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setChecked(JSON.parse(raw));
    } catch {
      // ignore malformed/unavailable storage
    }
    setLoaded(true);
  }, []);

  // Persist progress after the initial load, so we never clobber a saved
  // value with the empty initial state.
  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
    } catch {
      // ignore
    }
  }, [checked, loaded]);

  const toggle = (id: string) => setChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const doneCount = useMemo(() => ROWS.filter((r) => checked[r.id]).length, [checked]);
  const totalCount = ROWS.length;
  const pct = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;

  const checkedCount = (sectionId: string) => {
    const set = ROWS.filter((r) => r.sectionId === sectionId);
    const done = set.filter((r) => checked[r.id]).length;
    return { done, total: set.length };
  };

  // Highlight the in-view section in both the desktop rail and mobile drawer.
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const ids = TOC.map((t) => t.id);
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-14% 0px -70% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Escape closes the mobile contents drawer.
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  return (
    <div className="lt-page">
      <Nav />

      <button
        className="lt-mbar"
        aria-expanded={drawerOpen}
        aria-controls="lt-mdrawer"
        onClick={() => setDrawerOpen((o) => !o)}
      >
        <span className="lt-mbar-title">Contents</span>
        <span className="lt-mbar-count">
          {doneCount} / {totalCount}
        </span>
        <span className="lt-mbar-chev" aria-hidden="true" />
        <span className="lt-mbar-track">
          <i style={{ width: `${pct}%` }} />
        </span>
      </button>
      <nav
        id="lt-mdrawer"
        className={`lt-mdrawer${drawerOpen ? " lt-open" : ""}`}
        aria-label="Contents"
      >
        <TocList active={active} checkedCount={checkedCount} onNavigate={() => setDrawerOpen(false)} />
      </nav>

      <div className="lt-shell" ref={mainRef}>
        <aside className="lt-rail">
          <div className="lt-rail-mark">
            The Free <em>Syllabus</em>
          </div>
          <div className="lt-rail-sub">Equities &amp; Options · Ed. 01</div>
          <TocList active={active} checkedCount={checkedCount} />
          <div className="lt-rail-foot">
            <div className="lt-gauge">
              <i style={{ width: `${pct}%` }} />
            </div>
            <span>
              {doneCount} of {totalCount} complete
            </span>
          </div>
        </aside>

        <main className="lt-main">
          <article itemScope itemType="https://schema.org/Course">
            <header className="lt-masthead">
              <div className="lt-imprint">A zero-cost curriculum · Edition 01 · Independently sourced</div>
              <h1>
                Everything required to learn this is <em>already free</em>.
              </h1>
              <p className="lt-deck">
                The cost of a trading education is not tuition. It is the account you fund before you
                understand what you are buying. What follows is a four-month curriculum assembled
                entirely from exchange bodies, clearing houses, regulators and university faculty —{" "}
                <b>every item independently published, none of it selling anything.</b>
              </p>
              <div className="lt-epigraph">
                <p>
                  Most people will not complete it. They will purchase the shortcut instead, and then pay a{" "}
                  <b>second time</b> discovering it was not one.
                </p>
                <span className="lt-attrib">The premise of this document</span>
              </div>
              <div className="lt-specs">
                <div className="lt-spec">
                  <div className="lt-v">31</div>
                  <div className="lt-k">Resources listed</div>
                </div>
                <div className="lt-spec">
                  <div className="lt-v">4</div>
                  <div className="lt-k">Months, sequenced</div>
                </div>
                <div className="lt-spec">
                  <div className="lt-v">0</div>
                  <div className="lt-k">Paid items in the curriculum</div>
                </div>
                <div className="lt-spec">
                  <div className="lt-v">0</div>
                  <div className="lt-k">Affiliate arrangements</div>
                </div>
              </div>
            </header>

            {/* 00 */}
            <section className="lt-sec" id="s0">
              <div className="lt-sec-tag">00 — Baseline evidence</div>
              <h2>What the research establishes before you begin</h2>
              <p className="lt-lede">
                Three datasets, each covering complete populations rather than surveys or self-reported
                results. They are presented first because they determine how seriously the rest of this
                page deserves to be taken.
              </p>

              <table className="lt-evidence">
                <thead>
                  <tr>
                    <th style={{ width: "16%" }}>Finding</th>
                    <th style={{ width: "50%" }}>Population and result</th>
                    <th style={{ width: "34%" }}>Source</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="lt-fig">97%</span>
                    </td>
                    <td>
                      Of individuals who day-traded index futures and persisted beyond 300 sessions, 97 per
                      cent lost money. Just 1.1 per cent earned above minimum wage. The authors found no
                      evidence that persistence produced learning.
                    </td>
                    <td className="lt-src">
                      Chague, De-Losso &amp; Giovannetti — <i>Day Trading for a Living?</i> Brazil, 2020
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="lt-fig">&lt;1%</span>
                    </td>
                    <td>
                      Across fifteen years of complete exchange records, fewer than one per cent of day
                      traders could predictably and reliably earn positive returns net of fees. Roughly 80
                      per cent stopped within two years.
                    </td>
                    <td className="lt-src">
                      Barber, Lee, Liu &amp; Odean — <i>Journal of Financial Markets.</i> Taiwan, 2014
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="lt-fig">74–89%</span>
                    </td>
                    <td>
                      Retail contract-for-difference accounts losing money across EU jurisdictions.
                      Regulated firms are now obliged to publish their own figure on promotional material.
                    </td>
                    <td className="lt-src">ESMA and FCA supervisory analysis — Europe &amp; UK, 2018</td>
                  </tr>
                </tbody>
              </table>

              <div className="lt-note">
                The more consequential finding sits underneath the headline figures.{" "}
                <b>Experience alone did not correct the outcome.</b> Traders did not reliably improve by
                continuing to trade. Improvement, where the data found it, came from study, position
                sizing, and keeping a record — which is the entire premise of what follows.
              </div>
            </section>

            {/* 01 */}
            <section className="lt-sec" id="s1">
              <div className="lt-sec-tag">01 — Risk register</div>
              <h2>How free material is sold back to you</h2>
              <p className="lt-lede">
                Everything in the curriculum that follows is free. It is placed after this section
                deliberately, because the principal risk to a beginner is not the market — it is the
                commercial layer built to intercept them before they ever reach free material. Each
                pattern below is identifiable before any money moves.
              </p>

              <table className="lt-reg">
                <thead>
                  <tr>
                    <th>Pattern</th>
                    <th>Commercial mechanism</th>
                    <th>Identifying signal</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="lt-pat">Signal groups</td>
                    <td className="lt-mech">
                      A free channel feeds a paid tier. Winning calls are published, losing calls deleted.
                      In 2022 the SEC and Department of Justice charged eight social-media traders
                      operating largely through a trading Discord, in a scheme prosecutors valued near one
                      hundred million dollars.
                    </td>
                    <td className="lt-sig">Results shown, methodology withheld</td>
                  </tr>
                  <tr>
                    <td className="lt-pat">Proprietary firm challenges</td>
                    <td className="lt-mech">
                      Revenue derives from evaluation fees rather than from trading. Where promotion runs
                      on affiliate commission, a participant&apos;s failure carries no cost to the promoter.
                    </td>
                    <td className="lt-sig">Paid entry to be allowed to trade</td>
                  </tr>
                  <tr>
                    <td className="lt-pat">Guaranteed or risk-free returns</td>
                    <td className="lt-mech">
                      No such instrument exists in any regulated market. The phrase is definitional rather
                      than exaggerated.
                    </td>
                    <td className="lt-sig">Any use of the word guaranteed</td>
                  </tr>
                  <tr>
                    <td className="lt-pat">Screenshot evidence</td>
                    <td className="lt-mech">
                      Trivially fabricated, trivially selected, never independently audited. A simulator
                      account renders identically to a funded one.
                    </td>
                    <td className="lt-sig">Profit images without statements</td>
                  </tr>
                  <tr>
                    <td className="lt-pat">Broker recommendations</td>
                    <td className="lt-mech">
                      Where one specific broker is insisted upon through a personal link, compensation per
                      funded account should be assumed to have shaped the recommendation.
                    </td>
                    <td className="lt-sig">One broker, one link, no alternatives</td>
                  </tr>
                  <tr>
                    <td className="lt-pat">Withdrawal fees</td>
                    <td className="lt-mech">
                      A demand for tax, release fees or a further deposit before funds can be withdrawn is
                      the oldest pattern in investment fraud.
                    </td>
                    <td className="lt-sig">Payment required to access your own funds</td>
                  </tr>
                </tbody>
              </table>

              <div className="lt-pull">
                <p>
                  Credible education teaches a <b>process</b> and publishes its losses. A funnel sells a{" "}
                  <b>prediction</b> and publishes a lifestyle.
                </p>
              </div>
            </section>

            {/* 02 */}
            <section className="lt-sec" id="s2">
              <div className="lt-sec-tag">02 — Month one</div>
              <h2>Market mechanics and vocabulary</h2>
              <p className="lt-lede">
                Before strategy, before charts. A material share of retail losses trace to a mechanic
                nobody explained: a spread, an order type, a margin call, a settlement date.
              </p>

              <div className="lt-grp">
                <div className="lt-grp-head">
                  <h3>Foundation</h3>
                  <span className="lt-hrs">≈ 5 hrs / week</span>
                </div>
                <Row
                  id="varsity-intro"
                  href="https://zerodha.com/varsity/"
                  title="Zerodha Varsity — Introduction to Stock Markets"
                  desc={
                    <>
                      Nine modules, no registration, no advertising, no paid tier. Written around Indian
                      markets; the mechanics are universal. <em>The strongest single free curriculum
                      available in any market.</em>
                    </>
                  }
                  meta="2 weeks"
                  checked={!!checked["varsity-intro"]}
                  onToggle={toggle}
                />
                <Row
                  id="khan-finance"
                  href="https://www.khanacademy.org/economics-finance-domain/core-finance"
                  title="Khan Academy — Finance & Capital Markets"
                  desc="Equities, fixed income, interest, inflation, and a dedicated unit on fraud. Permanently free, non-commercial."
                  meta="6 hrs"
                  checked={!!checked["khan-finance"]}
                  onToggle={toggle}
                />
                <Row
                  id="investor-gov"
                  href="https://www.investor.gov"
                  title="Investor.gov — U.S. Securities and Exchange Commission"
                  desc="Regulator-published investor education with no commercial interest in whether you trade at all."
                  meta="2 hrs"
                  checked={!!checked["investor-gov"]}
                  onToggle={toggle}
                />
                <Row
                  id="finra-investor-ed"
                  href="https://www.finra.org/investors"
                  title="FINRA — Investor Education"
                  desc="Free publications and calculators. The material on margin and on the compounding effect of fees repays the time immediately."
                  meta="2 hrs"
                  checked={!!checked["finra-investor-ed"]}
                  onToggle={toggle}
                />
              </div>

              <div className="lt-grp">
                <div className="lt-grp-head">
                  <h3>Academic grounding</h3>
                  <span className="lt-hrs">Optional · high return</span>
                </div>
                <Row
                  id="mit-finance-theory"
                  href="https://ocw.mit.edu/courses/15-401-finance-theory-i-fall-2008/"
                  title="MIT OpenCourseWare 15.401 — Finance Theory I"
                  desc="Andrew Lo's complete lecture series with slides, problem sets and examinations. Present value, fixed income, equities, forwards, options, portfolio theory."
                  meta="Full course"
                  checked={!!checked["mit-finance-theory"]}
                  onToggle={toggle}
                />
                <Row
                  id="open-yale-econ252"
                  href="https://oyc.yale.edu/economics/econ-252"
                  title="Open Yale ECON 252 — Financial Markets"
                  desc="Robert Shiller, awarded the Nobel for empirical work on asset prices, lecturing in full and at no cost."
                  meta="Full course"
                  checked={!!checked["open-yale-econ252"]}
                  onToggle={toggle}
                />
              </div>
            </section>

            {/* 03 */}
            <section className="lt-sec" id="s3">
              <div className="lt-sec-tag">03 — Month two</div>
              <h2>Reading a business</h2>
              <p className="lt-lede">
                A share is a claim on a company&apos;s future cash flows. Learn to read the company before
                learning to read its chart.
              </p>

              <div className="lt-grp">
                <div className="lt-grp-head">
                  <h3>Statements, filings, screening</h3>
                  <span className="lt-hrs">≈ 6 hrs / week</span>
                </div>
                <Row
                  id="varsity-fundamental"
                  href="https://zerodha.com/varsity/module/fundamental-analysis/"
                  title="Varsity — Fundamental Analysis"
                  desc="Balance sheet, income statement, cash flow and ratio analysis. The chapter connecting all three statements is the one that changes how everything else reads."
                  meta="3 weeks"
                  checked={!!checked["varsity-fundamental"]}
                  onToggle={toggle}
                />
                <Row
                  id="sec-edgar"
                  href="https://www.sec.gov/edgar"
                  title="SEC EDGAR — primary filings"
                  desc={
                    <>
                      Every filing from every U.S.-listed issuer, free and unmediated. <em>Read the risk
                      factors of one annual report in full.</em> It is an education on its own.
                    </>
                  }
                  meta="Practice"
                  checked={!!checked["sec-edgar"]}
                  onToggle={toggle}
                />
                <Row
                  id="finviz"
                  href="https://finviz.com"
                  title="Finviz — screener, free tier"
                  desc="Over sixty filters and sector heat maps at no cost. Free data carries a delay, which for learning purposes is immaterial."
                  meta="Tool"
                  checked={!!checked["finviz"]}
                  onToggle={toggle}
                />
                <Row
                  id="fred"
                  href="https://fred.stlouisfed.org"
                  title="FRED — Federal Reserve Bank of St. Louis"
                  desc="Rates, inflation, employment, yield curves. When someone asserts what the macro picture is, verify it here rather than accepting it."
                  meta="Tool"
                  checked={!!checked["fred"]}
                  onToggle={toggle}
                />
              </div>
            </section>

            {/* 04 */}
            <section className="lt-sec" id="s4">
              <div className="lt-sec-tag">04 — Month three</div>
              <h2>Price, structure and position size</h2>
              <p className="lt-lede">
                Technical analysis is defensible for structure, for placing risk and for timing an entry
                already justified on other grounds. It is not a prediction engine, and the academic
                evidence for its predictive power is genuinely mixed. <b>Learn it as a tool, not a
                doctrine.</b>
              </p>

              <div className="lt-grp">
                <div className="lt-grp-head">
                  <h3>Chart reading and risk</h3>
                  <span className="lt-hrs">≈ 6 hrs / week</span>
                </div>
                <Row
                  id="varsity-technical"
                  href="https://zerodha.com/varsity/module/technical-analysis/"
                  title="Varsity — Technical Analysis"
                  desc="Candlestick construction, trend, support and resistance, volume, and a small set of indicators. The restraint is deliberate."
                  meta="3 weeks"
                  checked={!!checked["varsity-technical"]}
                  onToggle={toggle}
                />
                <Row
                  id="tradingview"
                  href="https://www.tradingview.com"
                  title="TradingView — free tier"
                  desc="The strongest free charting available. Bar replay allows a setup to be tested against historical data at no risk."
                  meta="Tool"
                  checked={!!checked["tradingview"]}
                  onToggle={toggle}
                />
                <Row
                  id="ibkr-traders-academy"
                  href="https://www.interactivebrokers.com/campus/"
                  title="IBKR Traders' Academy — risk and position sizing"
                  desc={
                    <>
                      Free structured courses with no funding requirement. <em>Calculate for yourself what
                      ten consecutive losses do at one per cent risk against five.</em> Doing that
                      arithmetic once tends to be permanent.
                    </>
                  }
                  meta="Essential"
                  checked={!!checked["ibkr-traders-academy"]}
                  onToggle={toggle}
                />
              </div>
            </section>

            {/* 05 */}
            <section className="lt-sec" id="s5">
              <div className="lt-sec-tag">05 — Month four</div>
              <h2>Derivatives, from the institutions that clear them</h2>
              <p className="lt-lede">
                The most rigorous options education available anywhere is free, and it is published by
                clearing houses and exchanges rather than by anyone with a course to sell.
              </p>

              <div className="lt-grp">
                <div className="lt-grp-head">
                  <h3>Options and futures</h3>
                  <span className="lt-hrs">≈ 7 hrs / week</span>
                </div>
                <Row
                  id="optionseducation"
                  href="https://www.optionseducation.org"
                  title="OptionsEducation.org — The Options Industry Council"
                  desc={
                    <>
                      Funded by the Options Clearing Corporation and running since 1992. A nine-course
                      curriculum, live webinars, and a help desk staffed on trading days. <em>Free,
                      unbiased, and more rigorous than most paid programmes.</em>
                    </>
                  }
                  meta="Essential"
                  checked={!!checked["optionseducation"]}
                  onToggle={toggle}
                />
                <Row
                  id="cboe-options-institute"
                  href="https://www.cboe.com/optionsinstitute/"
                  title="Cboe Options Institute"
                  desc="Established 1985 as the first dedicated options education body. Free learning paths from introductory to advanced, plus pricing calculators."
                  meta="Free account"
                  checked={!!checked["cboe-options-institute"]}
                  onToggle={toggle}
                />
                <Row
                  id="cme-institute"
                  href="https://www.cmegroup.com/education.html"
                  title="CME Institute"
                  desc="More than sixty self-paced courses covering futures and options mechanics, margin and settlement, with a free simulator. No funded account required."
                  meta="60+ courses"
                  checked={!!checked["cme-institute"]}
                  onToggle={toggle}
                />
                <Row
                  id="varsity-options-theory"
                  href="https://zerodha.com/varsity/module/option-theory/"
                  title="Varsity — Options Theory & Strategies"
                  desc="The Greeks, payoff construction, spreads and multi-leg positions. The theory module is the one most commonly skipped and the one that most often prevents a blown account."
                  meta="4 weeks"
                  checked={!!checked["varsity-options-theory"]}
                  onToggle={toggle}
                />
              </div>
            </section>

            {/* 06 */}
            <section className="lt-sec" id="s6">
              <div className="lt-sec-tag">06 — Ongoing</div>
              <h2>Practice, psychology, and the written record</h2>
              <p className="lt-lede">
                The studies in section 00 found that repetition alone taught nothing. What distinguished
                the small group who improved was documentation — a written account of the decision, made
                before the outcome was known.
              </p>

              <div className="lt-grp">
                <div className="lt-grp-head">
                  <h3>Simulation</h3>
                  <span className="lt-hrs">90 days minimum</span>
                </div>
                <Row
                  id="paper-trading-sims"
                  title="thinkorswim paperMoney · TradingView paper · Webull paper"
                  desc={
                    <>
                      All free; none require a funded account. Trade the identical rule set you intend to
                      run live. <em>A simulator cannot reproduce the fear, so assume live results will be
                      measurably worse.</em>
                    </>
                  }
                  meta="Free"
                  checked={!!checked["paper-trading-sims"]}
                  onToggle={toggle}
                />
                <Row
                  id="written-journal"
                  title="A written journal, every trade without exception"
                  desc="Not the profit and loss. The decision. What the setup was, whether the rule was followed, what was felt at entry, and what would be repeated. Ninety days of that record outperforms ninety courses."
                  meta="Every trade"
                  checked={!!checked["written-journal"]}
                  onToggle={toggle}
                />
              </div>

              <div className="lt-grp">
                <div className="lt-grp-head">
                  <h3>Psychology</h3>
                  <span className="lt-hrs">Continuous</span>
                </div>
                <Row
                  id="varsity-innerworth"
                  href="https://zerodha.com/varsity/module/innerworth/"
                  title="Varsity — Innerworth: Mind over Markets"
                  desc="Over a hundred short chapters on trading psychology, free. Read one daily rather than consuming the module at once."
                  meta="Daily"
                  checked={!!checked["varsity-innerworth"]}
                  onToggle={toggle}
                />
                <Row
                  id="reminiscences-stock-operator"
                  href="https://www.gutenberg.org/ebooks/60979"
                  title="Reminiscences of a Stock Operator — Lefèvre, 1923"
                  desc="Public domain; complete text free at Project Gutenberg. A century old and still the most precise account of speculation and self-deception written."
                  meta="Free text"
                  checked={!!checked["reminiscences-stock-operator"]}
                  onToggle={toggle}
                />
              </div>
            </section>

            {/* 07 */}
            <section className="lt-sec" id="s7">
              <div className="lt-sec-tag">07 — Behavioural register</div>
              <h2>The recurring psychological errors</h2>
              <p className="lt-lede">
                These are not character flaws. Every one is a documented, replicable finding, and every one
                is invisible from the inside — which is precisely why the written record exists.{" "}
                <b>The third column is the point of the table:</b> each error has a specific journal field
                that catches it, and none of them can be caught by memory after the fact.
              </p>

              <table className="lt-psy">
                <thead>
                  <tr>
                    <th>Error</th>
                    <th>How it presents at the desk</th>
                    <th>Caught by</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="lt-bias">Disposition effect</td>
                    <td className="lt-mech">
                      Winners are closed early to bank a certain gain; losers are held in the hope of
                      returning to break-even. The most consistently measured error in retail trading, and
                      it inverts the arithmetic a strategy depends on.
                    </td>
                    <td className="lt-fix">Planned exit recorded before entry</td>
                  </tr>
                  <tr>
                    <td className="lt-bias">Overconfidence</td>
                    <td className="lt-mech">
                      Trading frequency rises after a run of wins. The account most active in a given
                      period tends to be the one underperforming the index, because activity is being
                      driven by confidence rather than by opportunity.
                    </td>
                    <td className="lt-fix">Trade count per week, tracked</td>
                  </tr>
                  <tr>
                    <td className="lt-bias">Loss aversion</td>
                    <td className="lt-mech">
                      A loss registers as roughly twice the magnitude of an equivalent gain. The result is
                      stops moved wider in the moment and sizing that quietly expands to make a loss feel
                      recoverable.
                    </td>
                    <td className="lt-fix">Stop location, before and after</td>
                  </tr>
                  <tr>
                    <td className="lt-bias">Revenge trading</td>
                    <td className="lt-mech">
                      A second position is opened immediately after a loss to recover it. Almost never
                      planned, almost always larger, and the single fastest route from a bad day to a bad
                      month.
                    </td>
                    <td className="lt-fix">Minutes elapsed since last close</td>
                  </tr>
                  <tr>
                    <td className="lt-bias">Outcome bias</td>
                    <td className="lt-mech">
                      A profitable trade is judged good and a losing trade bad, regardless of whether the
                      process was followed. This is how a reckless habit gets reinforced by a lucky result
                      and a sound rule gets abandoned after variance.
                    </td>
                    <td className="lt-fix">Rule followed: yes / no — scored separately from profit</td>
                  </tr>
                  <tr>
                    <td className="lt-bias">Anchoring</td>
                    <td className="lt-mech">
                      The entry price becomes the reference point for every subsequent decision. The market
                      has no knowledge of where a position was opened, and a thesis that has broken does not
                      become valid again at break-even.
                    </td>
                    <td className="lt-fix">Written thesis, and what would invalidate it</td>
                  </tr>
                  <tr>
                    <td className="lt-bias">Confirmation bias</td>
                    <td className="lt-mech">
                      Once a position exists, supporting information is sought and contradicting information
                      dismissed. Feeds and communities are then curated, usually unconsciously, into
                      agreement.
                    </td>
                    <td className="lt-fix">The strongest argument against the position, written at entry</td>
                  </tr>
                  <tr>
                    <td className="lt-bias">Sunk cost</td>
                    <td className="lt-mech">
                      Averaging down to justify the original decision rather than because the thesis
                      improved. The capital already committed is treated as a reason to commit more, which
                      is the reverse of the correct inference.
                    </td>
                    <td className="lt-fix">Was adding planned at entry, or improvised</td>
                  </tr>
                  <tr>
                    <td className="lt-bias">Attention-driven entry</td>
                    <td className="lt-mech">
                      Buying whatever is prominent — high volume, breaking news, dominating a feed.
                      Attention determines the shortlist, and the shortlist is where nearly all subsequent
                      risk originates.
                    </td>
                    <td className="lt-fix">Where the idea came from</td>
                  </tr>
                  <tr>
                    <td className="lt-bias">Hindsight bias</td>
                    <td className="lt-mech">
                      After the outcome is known, it feels as though it was foreseeable. This is what
                      quietly destroys the value of reviewing from memory, and why a record written before
                      the outcome is the only usable one.
                    </td>
                    <td className="lt-fix">Conviction level, recorded at entry</td>
                  </tr>
                  <tr>
                    <td className="lt-bias">Recency bias</td>
                    <td className="lt-mech">
                      The last five sessions are weighted as though they represent the market. A strategy
                      is abandoned during an ordinary drawdown and adopted at the end of an ordinary run.
                    </td>
                    <td className="lt-fix">Performance reviewed over 50 trades, not 5</td>
                  </tr>
                  <tr>
                    <td className="lt-bias">Narrative fallacy</td>
                    <td className="lt-mech">
                      A clean explanatory story is constructed for what was noise. The story is convincing,
                      memorable and unfalsifiable — which is exactly why it survives to inform the next
                      decision.
                    </td>
                    <td className="lt-fix">Distinguishing what was observed from what was inferred</td>
                  </tr>
                </tbody>
              </table>

              <div className="lt-note">
                Nothing in this table is corrected by reading it. Every entry is identified by a record
                made <b>before the outcome is known</b> — which is why the studies in section 00 found
                that repetition alone taught nothing while documentation did. The journal is not
                administration. It is the only instrument that makes any of these visible.
              </div>

              <aside className="lt-offer">
                <div className="lt-offer-tag">Disclosure — the author&apos;s own book, sold commercially</div>
                <div className="lt-offer-body">
                  <div className="lt-offer-main">
                    <h3>Trade With Discipline</h3>
                    <p className="lt-offer-desc">
                      Ten chapters on the gap between knowing the rules and following them, written from
                      sixty days of publicly journaling my own trading. Every chapter ends in an exercise,
                      and the book closes with a thirty-day discipline challenge. It covers building a
                      system, risk rules, a pre-market routine, handling losses, and how to journal in a
                      way that actually surfaces patterns.
                    </p>
                    <p className="lt-offer-honest">
                      Everything in sections 02 through 08 is free and complete without this. It is a
                      workbook for applying the behavioural table above, not a prerequisite for anything on
                      this page — and if the choice is between buying it and finishing the free curriculum,
                      finish the curriculum.
                    </p>
                  </div>
                  <div className="lt-offer-side">
                    <div className="lt-offer-price">$5</div>
                    <div className="lt-offer-meta">
                      10 chapters
                      <br />+ 30-day challenge
                      <br />
                      PDF workbook
                    </div>
                    <a
                      className="lt-offer-cta"
                      href="https://crorepatiin365days.gumroad.com/l/tradersmind"
                      target="_blank"
                      rel="noopener"
                    >
                      View on Gumroad
                    </a>
                  </div>
                </div>
              </aside>
            </section>

            {/* 08 */}
            <section className="lt-sec" id="s8">
              <div className="lt-sec-tag">08 — Verification</div>
              <h2>Confirming any counterparty, at no cost</h2>
              <p className="lt-lede">
                Every major regulator maintains a free public register and a warning list. Consulting them
                takes under two minutes and is the single highest-return action on this page.
              </p>

              <div className="lt-grp">
                <div className="lt-grp-head">
                  <h3>Public registers</h3>
                  <span className="lt-hrs">Free · no account</span>
                </div>
                <Row
                  id="finra-brokercheck"
                  href="https://brokercheck.finra.org"
                  title="FINRA BrokerCheck"
                  desc="Licensing, employment history and disciplinary record for any registered individual or firm in the United States."
                  meta="United States"
                  checked={!!checked["finra-brokercheck"]}
                  onToggle={toggle}
                />
                <Row
                  id="fca-warning-list"
                  href="https://www.fca.org.uk/consumers/warning-list-unauthorised-firms"
                  title="FCA Warning List"
                  desc="Firms known to be operating in the United Kingdom without authorisation. Consult before depositing rather than after."
                  meta="United Kingdom"
                  checked={!!checked["fca-warning-list"]}
                  onToggle={toggle}
                />
                <Row
                  id="sec-check-investment-pro"
                  href="https://www.investor.gov/protect-your-investments"
                  title="SEC — check an investment professional"
                  desc="The Commission's own lookup, alongside its standing library of current fraud alerts."
                  meta="United States"
                  checked={!!checked["sec-check-investment-pro"]}
                  onToggle={toggle}
                />
                <Row
                  id="own-national-regulator"
                  title="Your own national regulator"
                  desc="SEBI in India, ASIC in Australia, CIRO in Canada, MAS in Singapore, and the national authorities across the EU. Each publishes a free register and a warning list."
                  meta="All markets"
                  checked={!!checked["own-national-regulator"]}
                  onToggle={toggle}
                />
              </div>
            </section>
          </article>
        </main>
      </div>

      <Footer />
    </div>
  );
}
