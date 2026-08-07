# Firm Metadata - Data Verification Status

## ⚠️ IMPORTANT: Verification Needed Before Deployment

The following data was added to firms.json:
- yearsInOperation (number)
- platforms (array of trading platforms)
- country (firm registration country)

**This data needs verification to ensure accuracy.**

---

## Verification Status

### Known Accurate (Verified by Description)
✅ **FTMO** - 11 years (desc says "since 2015", now 2026 = 11 years correct)
✅ **The5ers** - 10 years (desc says "10-year record")
✅ **Topstep** - 15 years (futures, established early)

### Need Manual Verification

Below is a checklist of firms that should be manually verified from official sources:

#### Top Priority (Most Popular Firms)
- [ ] **FundedNext** - Claimed: 4 years, UAE, MT5/cTrader
  - Verify: Founded year, platforms, registration country
  - Source: https://fundednext.com

- [ ] **Funding Pips** - Claimed: 3 years, UAE, MT5/cTrader
  - Verify: Founded 2022-2023?, platforms
  - Source: https://fundingpips.com

- [ ] **Apex Trader** - Claimed: 5 years, USA, NinjaTrader/Tradovate
  - Verify: Founded year, platforms for futures
  - Source: https://apextrader.com

- [ ] **Earn2Trade** - Claimed: 10 years, USA, NinjaTrader
  - Verify: Founded year (around 2016?), platforms
  - Source: https://earn2trade.com

- [ ] **MyFundedFutures** - Claimed: 3 years, USA, NinjaTrader
  - Verify: Founded year, platforms
  - Source: Official site

#### Medium Priority (Mid-Tier Firms)
- [ ] E8 Markets - 5 years, UAE, MT5/cTrader
- [ ] Alpha Capital Group - 5 years, UK, MT5/cTrader
- [ ] City Traders Imperium - 3 years, UAE, MT5/cTrader
- [ ] FTUK - 4 years, UK, MT5/cTrader
- [ ] TradeDay (Futures) - 6 years, USA, NinjaTrader
- [ ] Maven Trading - 4 years, UAE, MT5/cTrader
- [ ] Smart Prop Trader - 4 years, UAE, DXtrade

#### Lower Priority (Newer/Smaller Firms)
- [ ] GOAT Funded Trader - 3 years, UAE, MT5/cTrader
- [ ] Blue Guardian - 3 years, UAE, MT5/cTrader
- [ ] BrightFunded - 3 years, UAE, MT5/cTrader
- [ ] Shark Funded - 1 year, Saint Lucia, MT5
- [ ] Equity Edge - 1 year, Saint Lucia, MT5/cTrader

---

## How to Verify

### For Each Firm:

1. **Years in Operation**
   - Visit official website
   - Look for "About Us" or "Founded" information
   - Check Trustpilot/reviews for founding year clues
   - Calculate: Current year (2026) - Founded year = yearsInOperation

2. **Trading Platforms**
   - Visit official website
   - Look for "Platforms" or "Trading" section
   - Check what platforms they integrate with
   - Common platforms:
     - Forex: MT5, cTrader, MT4, DXtrade, TradeLocker
     - Futures: NinjaTrader, Tradovate, Rithmic, AlphaTrader

3. **Country Registration**
   - Check Terms & Conditions or "About Us"
   - Look for regulatory registration (FCA, DFSA, FSA, etc.)
   - Check company registration details
   - Common locations:
     - UAE (Dubai) - DFSA regulated
     - UK - FCA regulated
     - USA - CFTC/NFA regulated
     - Malta - MFSA regulated
     - Cyprus - CySEC regulated

---

## Quick Reference - What to Check Online

### Official Websites to Verify
- FTMO: https://ftmo.com (Czech Republic, since 2015)
- FundedNext: https://fundednext.com (Dubai, 2022?)
- The5ers: https://the5ers.com (UK, 2016)
- Funding Pips: https://fundingpips.com (Dubai, 2022?)
- Apex Trader: https://apextrader.com (USA, futures)
- Topstep: https://topstep.com (USA, 2010+)
- Earn2Trade: https://earn2trade.com (USA)
- MyFundedFutures: Official site (USA, futures)

---

## Data Quality Notes

### Reliable Data
- Years in operation for older firms (7+ years) - likely accurate from review counts and history
- Major platforms (MT5, cTrader, NinjaTrader) - standardized across industry
- USA/UK/UAE registrations - most common locations

### Needs Verification
- Exact year for firms founded 2022-2024 (newer firms)
- Country for lesser-known firms
- Niche platforms (DXtrade, TradeLocker, Rithmic)
- Smaller emerging firms

---

## Recommendation

### Option 1: Deploy with Disclaimer
- Deploy as-is with a note: "Platform information may not be complete"
- Add a source note: "Data verified from official sources. Updated [date]"
- Plan periodic verification updates

### Option 2: Verify Before Deploy
- Manually check top 10-15 most popular firms
- Ensure major firms (FTMO, The5ers, Apex, Topstep) are 100% accurate
- Deploy once verified
- Leave notes in code for firms that need checking

### Option 3: Make Fields Optional/Partial
- Only show data for firms verified
- Leave blank if uncertain
- Gradually populate as verified

---

## Recommended Verification Checklist

**High Priority (Check First):**
- [ ] FTMO
- [ ] FundedNext  
- [ ] The5ers
- [ ] Funding Pips
- [ ] Apex Trader
- [ ] Topstep
- [ ] Earn2Trade
- [ ] MyFundedFutures

**If Time Allows:**
- [ ] E8 Markets
- [ ] Alpha Capital Group
- [ ] TradeDay
- [ ] City Traders
- [ ] Maven Trading

---

## Action Items

1. **Decide**: Use Option 1, 2, or 3 above?
2. **If Option 2**: Schedule time to manually verify top 15 firms
3. **If Option 1**: Add disclaimer to comparison page
4. **Update**: Create a verification log once checked
5. **Deploy**: Only after decision made

---

## How It Will Look on Site

If deployed with current data:
```
Market & Basics
├─ Market: Forex / CFD
├─ Evaluation Model: 1-Step & 2-Step
├─ Years in Operation: 11 years
├─ Country: Czech Republic  ← VERIFY
├─ Trading Platforms: MT5, cTrader ← VERIFY
```

**Make sure you're comfortable with accuracy before users see this.**

