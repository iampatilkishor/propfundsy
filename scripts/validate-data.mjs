#!/usr/bin/env node
/**
 * Validates data/firms.json and data/plans.json.
 * Run: npm run validate:data
 * Exits non-zero (fails CI) on any problem. No dependencies.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const errors = [];
const err = (msg) => errors.push(msg);

function loadJson(rel) {
  try {
    return JSON.parse(readFileSync(join(root, rel), "utf8"));
  } catch (e) {
    err(`${rel}: not valid JSON — ${e.message}`);
    return null;
  }
}

const CATS = ["forex", "futures"];
const TRIS = ["yes", "restricted", "no", "na"];
const DD_KINDS = ["static", "eod-trail", "intraday-trail", "custom"];

const isStr = (v) => typeof v === "string" && v.length > 0;
const isNum = (v) => typeof v === "number" && Number.isFinite(v);
const isBool = (v) => typeof v === "boolean";
const isStrArr = (v) => Array.isArray(v) && v.length > 0 && v.every((x) => isStr(x));

// Mirrors lib/seo.ts's slugOf() exactly — every firm's /firms/[slug] page and
// sitemap entry are keyed off this, not off `id`. Two firms with different
// ids but colliding slugified names would silently shadow one another's
// static page (or fail the build) without this check.
const slugOf = (name) =>
  (name ?? "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

const firms = loadJson("data/firms.json");
const plans = loadJson("data/plans.json");

if (firms) {
  if (!Array.isArray(firms) || firms.length === 0) err("firms.json: must be a non-empty array");
  const ids = new Set();
  const slugs = new Map(); // slug -> first firm id that claimed it
  for (const [i, f] of (firms ?? []).entries()) {
    const at = `firms[${i}]${f?.id ? ` (${f.id})` : ""}`;
    if (!isStr(f.id)) err(`${at}: missing id`);
    else if (ids.has(f.id)) err(`${at}: duplicate id "${f.id}"`);
    else ids.add(f.id);
    if (!isStr(f.name)) err(`${at}: missing name`);
    else {
      const slug = slugOf(f.name);
      if (!slug) err(`${at}: name "${f.name}" produces an empty slug`);
      else if (slugs.has(slug))
        err(`${at}: name "${f.name}" collides with "${slugs.get(slug)}" — both slugify to "${slug}", which would break /firms/${slug} (one page silently shadows the other)`);
      else slugs.set(slug, f.name);
    }
    if (!CATS.includes(f.cat)) err(`${at}: cat must be one of ${CATS.join("|")}`);
    if (!isStr(f.color) || !/^#[0-9a-fA-F]{6}$/.test(f.color)) err(`${at}: color must be a #rrggbb hex`);
    for (const k of ["desc", "split", "from", "sizes", "model", "source", "officialUrl"])
      if (!isStr(f[k])) err(`${at}: missing ${k}`);
    if (f.officialUrl && !/^https:\/\//.test(f.officialUrl)) err(`${at}: officialUrl must start with https://`);
    if (!(f.affiliateUrl === null || (isStr(f.affiliateUrl) && /^https:\/\//.test(f.affiliateUrl))))
      err(`${at}: affiliateUrl must be null or an https:// URL`);
    if (!(f.discountCode === null || isStr(f.discountCode))) err(`${at}: discountCode must be null or text`);
    if (!(f.review === null || (isStr(f.review) && f.review.length >= 80)))
      err(`${at}: review must be null or an editorial text of at least 80 characters`);
    if (!isStrArr(f.payMethods)) err(`${at}: payMethods must be a non-empty string array`);
    if (!isStrArr(f.payoutMethods)) err(`${at}: payoutMethods must be a non-empty string array`);
    if (!Array.isArray(f.tags) || !f.tags.every((t) => Array.isArray(t) && t.length === 2 && isStr(t[0]) && ["pos", ""].includes(t[1])))
      err(`${at}: tags must be [text, "pos"|""] pairs`);
  }
}

if (plans && firms) {
  if (!Array.isArray(plans) || plans.length === 0) err("plans.json: must be a non-empty array");
  const firmIds = new Set((firms ?? []).map((f) => f.id));
  const keys = new Set();
  for (const [i, p] of (plans ?? []).entries()) {
    const at = `plans[${i}] (${p?.firmId ?? "?"} ${p?.plan ?? "?"} ${p?.sizeLabel ?? "?"})`;
    if (!firmIds.has(p.firmId)) err(`${at}: unknown firmId "${p.firmId}"`);
    if (!isStr(p.plan)) err(`${at}: missing plan name`);
    if (!CATS.includes(p.cat)) err(`${at}: cat must be one of ${CATS.join("|")}`);
    if (!isNum(p.size) || p.size < 1000) err(`${at}: size must be a number ≥ 1000 (dollars, e.g. 50000)`);
    if (!isStr(p.sizeLabel)) err(`${at}: missing sizeLabel`);
    if (!isNum(p.price) || p.price <= 0) err(`${at}: price must be a positive number (USD, no symbols)`);
    if (!isStr(p.priceLabel)) err(`${at}: missing priceLabel`);
    if (!isBool(p.monthly)) err(`${at}: monthly must be true/false`);
    if (!isStr(p.steps)) err(`${at}: missing steps`);
    if (!isNum(p.splitSort) || p.splitSort < 0 || p.splitSort > 100) err(`${at}: splitSort must be 0–100`);
    if (!isStr(p.splitLabel)) err(`${at}: missing splitLabel`);
    for (const k of ["target", "dd", "dailyLoss", "payout", "notes"])
      if (!isStr(p[k])) err(`${at}: missing ${k}`);
    if (!DD_KINDS.includes(p.ddKind)) err(`${at}: ddKind must be one of ${DD_KINDS.join("|")}`);
    for (const k of ["news", "ea", "weekend"])
      if (!TRIS.includes(p[k])) err(`${at}: ${k} must be one of ${TRIS.join("|")}`);
    if (!(p.consistency === null || isStr(p.consistency))) err(`${at}: consistency must be null or text`);
    if (!(p.refund === null || isStr(p.refund))) err(`${at}: refund must be null or text`);
    if (!isNum(p.payoutDays) || p.payoutDays < 1 || p.payoutDays > 60) err(`${at}: payoutDays must be 1–60`);
    if (!isBool(p.verified)) err(`${at}: verified must be true/false`);
    const key = `${p.firmId}|${p.plan}|${p.sizeLabel}`;
    if (keys.has(key)) err(`${at}: duplicate plan (same firm + plan + size)`);
    keys.add(key);
    // sanity: cost per 10K within plausible range
    if (isNum(p.price) && isNum(p.size)) {
      const cost = p.price / (p.size / 10000);
      if (cost > 500) err(`${at}: cost per $10K is $${Math.round(cost)} — check price/size for a typo`);
    }
  }
}

if (errors.length) {
  console.error(`✗ Data validation FAILED with ${errors.length} error(s):\n`);
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}
console.log(`✓ Data valid: ${firms.length} firms, ${plans.length} plans.`);
