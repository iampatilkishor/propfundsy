import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import {
  FIRMS, firmLink, initials, costPer10k, payoutSpeedLabel, DD_LABEL, TRI_LABEL,
  type Firm, type Plan, type TriState,
} from "@/lib/data";
import {
  SITE_URL, slugOf, firmBySlug, plansOfFirm, firmUrl, relatedFirms, cheapestPlan, truncateDesc,
} from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return FIRMS.map((f) => ({ slug: slugOf(f) }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ slug: string }> },
): Promise<Metadata> {
  const { slug } = await params;
  const f = firmBySlug(slug);
  if (!f) return {};
  const cheapest = cheapestPlan(f.id);
  const desc = truncateDesc(
    `${f.name} compared (2026): plans from ${cheapest ? cheapest.priceLabel : f.from}, ${f.split} split, ${f.sizes} accounts. Rules, payout speed & how it stacks up vs other ${f.cat} prop firms.`,
  );
  return {
    title: `${f.name} — Plans, Pricing & Rules (2026)`,
    description: desc,
    alternates: { canonical: `/firms/${slug}` },
    openGraph: {
      type: "article",
      url: firmUrl(f),
      siteName: "Propfundsy",
      title: `${f.name} — Plans, Pricing & Rules`,
      description: desc,
    },
    twitter: { card: "summary_large_image", title: `${f.name} on Propfundsy`, description: desc },
  };
}

const firmFaq = (f: Firm, plans: Plan[]) => {
  const cheapest = cheapestPlan(f.id);
  const faq: { q: string; a: string }[] = [
    {
      q: `What profit split does ${f.name} offer?`,
      a: `${f.name} offers a profit split of ${f.split} on funded accounts.`,
    },
    {
      q: `How much does a ${f.name} account cost?`,
      a: cheapest
        ? `${f.name} plans start at ${cheapest.priceLabel} for a ${cheapest.sizeLabel} ${cheapest.plan} account, with sizes ranging ${f.sizes}.`
        : `${f.name} account sizes range ${f.sizes}; exact current prices are being verified — check the official site.`,
    },
    {
      q: `How fast does ${f.name} pay out?`,
      a: plans.length
        ? `Typical payout timing at ${f.name} is ${payoutSpeedLabel(Math.min(...plans.map((p) => p.payoutDays))).toLowerCase()}. ${plans[0].payout}.`
        : `Payout terms vary by plan — see the official site for current terms.`,
    },
  ];
  if (plans.some((p) => p.steps === "Instant")) {
    faq.push({
      q: `Does ${f.name} offer instant funding?`,
      a: `Yes — ${f.name} offers instant-funding accounts with no evaluation phase.`,
    });
  }
  return faq;
};

const uniq = <T,>(arr: T[]) => [...new Set(arr)];

/** Summarize a tri-state field across plans: single value, or "Varies by plan". */
const triSummary = (plans: Plan[], pick: (p: Plan) => TriState) => {
  const vals = uniq(plans.map(pick));
  if (vals.length === 0) return { label: "—", cls: "dim" };
  if (vals.length === 1) {
    const v = vals[0];
    return {
      label: TRI_LABEL[v],
      cls: v === "yes" ? "ok" : v === "restricted" ? "warn" : v === "no" ? "bad" : "dim",
    };
  }
  return { label: "Varies by plan", cls: "warn" };
};

export default async function FirmPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const f = firmBySlug(slug);
  if (!f) notFound();
  const plans = plansOfFirm(f.id);
  const related = relatedFirms(f);
  const faq = firmFaq(f, plans);
  const pros = f.tags.filter((t) => t[1] === "pos").map((t) => t[0]);
  const cons = f.tags.filter((t) => t[1] === "").map((t) => t[0]);

  const cheapest = cheapestPlan(f.id);
  const bestSplit = plans.length ? Math.max(...plans.map((p) => p.splitSort)) : null;
  const fastestPayout = plans.length ? Math.min(...plans.map((p) => p.payoutDays)) : null;
  const ddKinds = uniq(plans.map((p) => DD_LABEL[p.ddKind]));
  const consistencies = uniq(plans.map((p) => p.consistency ?? "None"));
  const refunds = uniq(plans.map((p) => p.refund ?? "No"));
  const news = triSummary(plans, (p) => p.news);
  const ea = triSummary(plans, (p) => p.ea);
  const weekend = triSummary(plans, (p) => p.weekend);
  const hasInstant = plans.some((p) => p.steps === "Instant");

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Propfundsy", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Firms", item: `${SITE_URL}/#firms` },
          { "@type": "ListItem", position: 3, name: f.name, item: firmUrl(f) },
        ],
      },
      {
        "@type": "WebPage",
        "@id": `${firmUrl(f)}#page`,
        url: firmUrl(f),
        name: `${f.name} — Plans, Pricing & Rules`,
        description: f.desc,
        isPartOf: { "@id": `${SITE_URL}/#website` },
      },
      {
        "@type": "FAQPage",
        "@id": `${firmUrl(f)}#faq`,
        mainEntity: faq.map((it) => ({
          "@type": "Question",
          name: it.q,
          acceptedAnswer: { "@type": "Answer", text: it.a },
        })),
      },
      ...(f.review
        ? [
            {
              "@type": "Review",
              "@id": `${firmUrl(f)}#review`,
              itemReviewed: { "@type": "Organization", name: f.name, url: f.officialUrl },
              author: { "@id": `${SITE_URL}/#org` },
              publisher: { "@id": `${SITE_URL}/#org` },
              reviewBody: f.review,
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />

      <section>
        <p className="crumb"><Link href="/#firms">← All firms</Link></p>

        <div className="firm-head" style={{ marginBottom: 20 }}>
          <div className="firm-logo" style={{ width: 64, height: 64, fontSize: "1.4rem", background: `linear-gradient(135deg, ${f.color}, ${f.color}99)` }}>
            {initials(f.name)}
          </div>
          <div>
            <h1 className="firm-page-title">{f.name}</h1>
            <div className="firm-cat">{f.cat === "forex" ? "Forex / CFD" : "Futures"} prop firm · {f.model}</div>
          </div>
        </div>

        <p className="sec-sub" style={{ marginBottom: 24 }}>{f.desc}</p>

        <div className="firm-metrics firm-metrics-wide">
          <div className="metric"><span>Profit split</span><b className="green">{f.split}</b></div>
          <div className="metric"><span>Plans from</span><b className="gold">{cheapest ? cheapest.priceLabel : f.from}</b></div>
          <div className="metric"><span>Account sizes</span><b>{f.sizes}</b></div>
          <div className="metric"><span>Evaluation</span><b>{f.model}</b></div>
          {bestSplit !== null && <div className="metric"><span>Best split tracked</span><b className="green">{bestSplit}%</b></div>}
          {fastestPayout !== null && <div className="metric"><span>Fastest payout</span><b className="gold">{payoutSpeedLabel(fastestPayout)}</b></div>}
          <div className="metric"><span>Instant funding</span><b>{hasInstant ? "Yes ⚡" : plans.length ? "No" : "—"}</b></div>
          <div className="metric"><span>Plans tracked</span><b>{plans.length || "Being verified"}</b></div>
        </div>

        <div className="firm-tags" style={{ marginTop: 18 }}>
          {f.tags.map(([label, kind]) => (
            <span key={label} className={`tag ${kind}`}>{label}</span>
          ))}
        </div>

        <div className="pay-block" style={{ marginTop: 18 }}>
          <div className="pay-line"><span className="pay-label">Pay with</span>{f.payMethods.map((m) => <span key={m} className="pay-chip">{m}</span>)}</div>
          <div className="pay-line"><span className="pay-label">Payouts via</span>{f.payoutMethods.map((m) => <span key={m} className="pay-chip out">{m}</span>)}</div>
        </div>

        <div className="firm-source" style={{ marginTop: 10 }}>Data source: {f.source}</div>

        <div style={{ display: "flex", gap: 12, marginTop: 18, flexWrap: "wrap" }}>
          <a className="btn btn-gold" href={firmLink(f)} target="_blank" rel="sponsored nofollow noopener">
            {f.discountCode ? `Get Funded · ${f.discountCode}` : "Get Funded"}
          </a>
          <Link className="btn btn-ghost" href="/#plans">Compare With Other Firms</Link>
        </div>
      </section>

      {plans.length > 0 && (
        <section>
          <div className="sec-label">Rules</div>
          <h2>Trading rules at a glance</h2>
          <div className="firm-metrics firm-metrics-wide" style={{ marginTop: 30 }}>
            <div className="metric"><span>News trading</span><b className={news.cls}>{news.label}</b></div>
            <div className="metric"><span>EAs / bots</span><b className={ea.cls}>{ea.label}</b></div>
            <div className="metric"><span>Weekend holding</span><b className={weekend.cls}>{weekend.label}</b></div>
            <div className="metric"><span>Drawdown type{ddKinds.length > 1 ? "s" : ""}</span><b>{ddKinds.join(" / ")}</b></div>
            <div className="metric"><span>Consistency rule</span><b>{consistencies.join(" · ")}</b></div>
            <div className="metric"><span>Fee refund</span><b>{refunds.join(" · ")}</b></div>
          </div>
        </section>
      )}

      {plans.length > 0 && (
        <section>
          <div className="sec-label">Plans</div>
          <h2>{f.name} plans &amp; pricing</h2>
          <div className="table-wrap" style={{ marginTop: 30 }}>
            <table>
              <caption className="sr-only">{f.name} plans: fees, splits, drawdown and payout terms</caption>
              <thead>
                <tr>
                  <th>Plan</th><th>Account</th><th>Fee</th><th>Cost/$10K</th><th>Split</th>
                  <th>Target</th><th>Drawdown</th><th>Daily loss</th><th>Consistency</th>
                  <th>Payout</th><th>Data</th><th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((p) => (
                  <tr key={`${p.plan}-${p.sizeLabel}`}>
                    <td>{p.plan}{p.steps === "Instant" ? " ⚡" : ""}</td>
                    <td><b>{p.sizeLabel}</b></td>
                    <td><span className="pill price">{p.priceLabel}</span></td>
                    <td>{costPer10k(p)}</td>
                    <td><span className="pill split">{p.splitLabel}</span></td>
                    <td>{p.target}</td>
                    <td>{p.dd} <span className="dim">· {DD_LABEL[p.ddKind]}</span></td>
                    <td>{p.dailyLoss}</td>
                    <td>{p.consistency ?? <span className="ok">None</span>}</td>
                    <td title={p.payout}>{payoutSpeedLabel(p.payoutDays)}</td>
                    <td>{p.verified ? <span className="badge v">Verified</span> : <span className="badge u">Reviews</span>}</td>
                    <td className="notes">{p.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {f.review && (
        <section>
          <div className="sec-label">Our Take</div>
          <h2>The Propfundsy view on {f.name}</h2>
          <p className="review-body">{f.review}</p>
        </section>
      )}

      <section>
        <div className="sec-label">Assessment</div>
        <h2>Pros &amp; considerations</h2>
        <div className="proscons">
          <div className="pc-col">
            <h3 className="pc-title good">Pros</h3>
            <ul>{pros.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
          <div className="pc-col">
            <h3 className="pc-title warn">Considerations</h3>
            <ul>{cons.length ? cons.map((t) => <li key={t}>{t}</li>) : <li>No major caveats flagged — always read the firm&apos;s full rules before buying.</li>}</ul>
          </div>
        </div>
      </section>

      <section>
        <div className="sec-label">FAQ</div>
        <h2>{f.name} — common questions</h2>
        <div className="faq" style={{ marginTop: 30 }}>
          {faq.map((it) => (
            <details key={it.q}>
              <summary>{it.q}</summary>
              <div className="faq-body">{it.a}</div>
            </details>
          ))}
        </div>
      </section>

      {related.length > 0 && (
        <section>
          <div className="sec-label">Alternatives</div>
          <h2>Similar {f.cat === "forex" ? "forex" : "futures"} prop firms</h2>
          <div className="grid" style={{ marginTop: 30 }}>
            {related.map((r) => (
              <Link key={r.id} href={`/firms/${slugOf(r)}`} className="firm-card rel-card">
                <div className="firm-head">
                  <div className="firm-logo" style={{ background: `linear-gradient(135deg, ${r.color}, ${r.color}99)` }}>{initials(r.name)}</div>
                  <div>
                    <h3 className="firm-name">{r.name}</h3>
                    <div className="firm-cat">{r.split} split · from {r.from}</div>
                  </div>
                </div>
                <p className="firm-desc">{r.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </>
  );
}
