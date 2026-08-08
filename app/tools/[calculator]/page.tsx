"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Link from "next/link";
import { useParams } from "next/navigation";

const calculators = {
  leverage: {
    title: "Leverage Impact Calculator",
    description: "See how leverage amplifies both gains AND losses",
    component: LeverageCalculator,
  },
  recovery: {
    title: "Loss Recovery Calculator",
    description: "Calculate the gain needed to recover from losses",
    component: RecoveryCalculator,
  },
  edge: {
    title: "Win Rate × R:R Edge Calculator",
    description: "Determine if your strategy has a mathematical edge",
    component: EdgeCalculator,
  },
  position: {
    title: "Position Size Calculator",
    description: "Calculate optimal position size based on risk",
    component: PositionCalculator,
  },
  compound: {
    title: "Compounding Calculator",
    description: "Visualize exponential growth of your trading returns",
    component: CompoundingCalculator,
  },
};

function LeverageCalculator() {
  const [accountSize, setAccountSize] = useState(10000);
  const [leverage, setLeverage] = useState(2);
  const [movePercent, setMovePercent] = useState(5);

  const leveragedAmount = accountSize * leverage;
  const profitAmount = leveragedAmount * (movePercent / 100);
  const profitPercent = (profitAmount / accountSize) * 100;

  return (
    <div className="calculator-card">
      <div className="calculator-input-group">
        <label>Account Size: ${accountSize.toLocaleString()}</label>
        <input
          type="range"
          min="1000"
          max="1000000"
          step="1000"
          value={accountSize}
          onChange={(e) => setAccountSize(Number(e.target.value))}
          className="calculator-slider"
        />
        <input
          type="number"
          value={accountSize}
          onChange={(e) => setAccountSize(Number(e.target.value))}
          className="calculator-input"
        />
      </div>

      <div className="calculator-input-group">
        <label>Leverage: {leverage}x</label>
        <input
          type="range"
          min="1"
          max="50"
          step="0.5"
          value={leverage}
          onChange={(e) => setLeverage(Number(e.target.value))}
          className="calculator-slider"
        />
        <input
          type="number"
          value={leverage}
          onChange={(e) => setLeverage(Number(e.target.value))}
          className="calculator-input"
          step="0.5"
        />
      </div>

      <div className="calculator-input-group">
        <label>Price Move: {movePercent}%</label>
        <input
          type="range"
          min="-20"
          max="20"
          step="0.1"
          value={movePercent}
          onChange={(e) => setMovePercent(Number(e.target.value))}
          className="calculator-slider"
        />
        <input
          type="number"
          value={movePercent}
          onChange={(e) => setMovePercent(Number(e.target.value))}
          className="calculator-input"
          step="0.1"
        />
      </div>

      <div className="calculator-results">
        <div className="result-item">
          <label>Controlled Capital</label>
          <div className="result-value">${leveragedAmount.toLocaleString()}</div>
        </div>
        <div className="result-item">
          <label>Profit/Loss</label>
          <div className={`result-value ${profitAmount >= 0 ? "positive" : "negative"}`}>
            ${profitAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </div>
        </div>
        <div className="result-item">
          <label>Return on Account</label>
          <div className={`result-value ${profitPercent >= 0 ? "positive" : "negative"}`}>
            {profitPercent.toFixed(2)}%
          </div>
        </div>
      </div>

      <div className="calculator-warning">
        <strong>⚠️ Remember:</strong> With {leverage}x leverage, a {Math.abs(movePercent).toFixed(1)}% move in the opposite direction would wipe out {((leverage * movePercent) / 100) * 100}% of your account.
      </div>
    </div>
  );
}

function RecoveryCalculator() {
  const [accountSize, setAccountSize] = useState(10000);
  const [loss, setLoss] = useState(20);

  const lossAmount = accountSize * (loss / 100);
  const remainingAccount = accountSize - lossAmount;
  const gainNeeded = (lossAmount / remainingAccount) * 100;
  const gainAmount = lossAmount;

  return (
    <div className="calculator-card">
      <div className="calculator-input-group">
        <label>Starting Account: ${accountSize.toLocaleString()}</label>
        <input
          type="range"
          min="1000"
          max="1000000"
          step="1000"
          value={accountSize}
          onChange={(e) => setAccountSize(Number(e.target.value))}
          className="calculator-slider"
        />
        <input
          type="number"
          value={accountSize}
          onChange={(e) => setAccountSize(Number(e.target.value))}
          className="calculator-input"
        />
      </div>

      <div className="calculator-input-group">
        <label>Loss: {loss}%</label>
        <input
          type="range"
          min="1"
          max="99"
          step="1"
          value={loss}
          onChange={(e) => setLoss(Number(e.target.value))}
          className="calculator-slider"
        />
        <input
          type="number"
          value={loss}
          onChange={(e) => setLoss(Number(e.target.value))}
          className="calculator-input"
        />
      </div>

      <div className="calculator-results">
        <div className="result-item">
          <label>Amount Lost</label>
          <div className="result-value negative">${lossAmount.toLocaleString()}</div>
        </div>
        <div className="result-item">
          <label>Remaining Account</label>
          <div className="result-value">${remainingAccount.toLocaleString()}</div>
        </div>
        <div className="result-item">
          <label>Gain Needed to Recover</label>
          <div className="result-value positive">{gainNeeded.toFixed(2)}%</div>
        </div>
        <div className="result-item">
          <label>Dollar Amount Needed</label>
          <div className="result-value positive">${gainAmount.toLocaleString()}</div>
        </div>
      </div>

      <div className="calculator-chart">
        <div className="chart-bar-container">
          <div className="chart-label">Loss Impact</div>
          <div className="chart-bars">
            <div className="chart-bar positive" style={{ width: `${(remainingAccount / accountSize) * 100}%` }}></div>
            <div className="chart-bar negative" style={{ width: `${(lossAmount / accountSize) * 100}%` }}></div>
          </div>
          <div className="chart-values">
            <span>{((remainingAccount / accountSize) * 100).toFixed(1)}% left</span>
            <span>{loss}% lost</span>
          </div>
        </div>
      </div>

      <div className="calculator-warning">
        <strong>💡 Key Insight:</strong> A {loss}% loss requires {gainNeeded.toFixed(1)}% gain to break even. The larger your loss, the harder it is to recover.
      </div>
    </div>
  );
}

function EdgeCalculator() {
  const [winRate, setWinRate] = useState(50);
  const [riskReward, setRiskReward] = useState(2);

  const winRateDecimal = winRate / 100;
  const lossRateDecimal = 1 - winRateDecimal;
  const expectancy = winRateDecimal * riskReward - lossRateDecimal * 1;
  const hasEdge = expectancy > 0;

  return (
    <div className="calculator-card">
      <div className="calculator-input-group">
        <label>Win Rate: {winRate}%</label>
        <input
          type="range"
          min="1"
          max="99"
          step="1"
          value={winRate}
          onChange={(e) => setWinRate(Number(e.target.value))}
          className="calculator-slider"
        />
        <input
          type="number"
          value={winRate}
          onChange={(e) => setWinRate(Number(e.target.value))}
          className="calculator-input"
        />
      </div>

      <div className="calculator-input-group">
        <label>Risk : Reward Ratio (1:{riskReward})</label>
        <input
          type="range"
          min="0.5"
          max="10"
          step="0.1"
          value={riskReward}
          onChange={(e) => setRiskReward(Number(e.target.value))}
          className="calculator-slider"
        />
        <input
          type="number"
          value={riskReward}
          onChange={(e) => setRiskReward(Number(e.target.value))}
          className="calculator-input"
          step="0.1"
        />
      </div>

      <div className="calculator-results">
        <div className="result-item">
          <label>Expectancy per Trade</label>
          <div className={`result-value ${hasEdge ? "positive" : "negative"}`}>
            {expectancy.toFixed(4)} R
          </div>
        </div>
        <div className="result-item">
          <label>Edge Status</label>
          <div className={`result-value ${hasEdge ? "positive" : "negative"}`}>
            {hasEdge ? "✓ POSITIVE EDGE" : "✗ NO EDGE"}
          </div>
        </div>
        <div className="result-item">
          <label>Expected Return per 100 Trades</label>
          <div className={`result-value ${hasEdge ? "positive" : "negative"}`}>
            {(expectancy * 100).toFixed(2)} R
          </div>
        </div>
      </div>

      <div className="calculator-warning">
        <strong>📊 Formula:</strong> (Win% × Reward Ratio) - (Loss% × Risk) = {expectancy.toFixed(4)} R
        <br />
        {hasEdge ? (
          <>
            <strong>✓ This strategy has a mathematical edge!</strong> Over 100 trades at 1R risk, you'd expect {(expectancy * 100).toFixed(1)} R profit.
          </>
        ) : (
          <>
            <strong>✗ This strategy has negative expectancy.</strong> Improve your win rate or increase your R:R ratio.
          </>
        )}
      </div>
    </div>
  );
}

function PositionCalculator() {
  const [accountSize, setAccountSize] = useState(10000);
  const [riskPercent, setRiskPercent] = useState(2);
  const [entryPrice, setEntryPrice] = useState(100);
  const [stopLoss, setStopLoss] = useState(98);

  const riskAmount = accountSize * (riskPercent / 100);
  const priceDifference = Math.abs(entryPrice - stopLoss);
  const positionSize = riskAmount / priceDifference;
  const totalExposure = positionSize * entryPrice;

  return (
    <div className="calculator-card">
      <div className="calculator-input-group">
        <label>Account Size: ${accountSize.toLocaleString()}</label>
        <input
          type="range"
          min="1000"
          max="1000000"
          step="1000"
          value={accountSize}
          onChange={(e) => setAccountSize(Number(e.target.value))}
          className="calculator-slider"
        />
        <input
          type="number"
          value={accountSize}
          onChange={(e) => setAccountSize(Number(e.target.value))}
          className="calculator-input"
        />
      </div>

      <div className="calculator-input-group">
        <label>Risk per Trade: {riskPercent}%</label>
        <input
          type="range"
          min="0.1"
          max="5"
          step="0.1"
          value={riskPercent}
          onChange={(e) => setRiskPercent(Number(e.target.value))}
          className="calculator-slider"
        />
        <input
          type="number"
          value={riskPercent}
          onChange={(e) => setRiskPercent(Number(e.target.value))}
          className="calculator-input"
          step="0.1"
        />
      </div>

      <div className="calculator-input-group">
        <label>Entry Price</label>
        <input
          type="number"
          value={entryPrice}
          onChange={(e) => setEntryPrice(Number(e.target.value))}
          className="calculator-input"
          step="0.01"
        />
      </div>

      <div className="calculator-input-group">
        <label>Stop Loss Price</label>
        <input
          type="number"
          value={stopLoss}
          onChange={(e) => setStopLoss(Number(e.target.value))}
          className="calculator-input"
          step="0.01"
        />
      </div>

      <div className="calculator-results">
        <div className="result-item">
          <label>Risk Amount</label>
          <div className="result-value negative">${riskAmount.toLocaleString()}</div>
        </div>
        <div className="result-item">
          <label>Position Size</label>
          <div className="result-value">{positionSize.toFixed(4)} units</div>
        </div>
        <div className="result-item">
          <label>Total Exposure</label>
          <div className="result-value">${totalExposure.toLocaleString()}</div>
        </div>
        <div className="result-item">
          <label>Price Distance to SL</label>
          <div className="result-value">${priceDifference.toFixed(2)}</div>
        </div>
      </div>

      <div className="calculator-warning">
        <strong>✓ Position Sized Correctly:</strong> Buy {positionSize.toFixed(4)} units. If stop at ${stopLoss.toFixed(2)}, you risk exactly ${riskAmount.toLocaleString()}.
      </div>
    </div>
  );
}

function CompoundingCalculator() {
  const [startingAccount, setStartingAccount] = useState(10000);
  const [monthlyReturn, setMonthlyReturn] = useState(5);
  const [years, setYears] = useState(5);

  const months = years * 12;
  const monthlyMultiplier = 1 + monthlyReturn / 100;
  const finalAmount = startingAccount * Math.pow(monthlyMultiplier, months);
  const totalProfit = finalAmount - startingAccount;

  return (
    <div className="calculator-card">
      <div className="calculator-input-group">
        <label>Starting Account: ${startingAccount.toLocaleString()}</label>
        <input
          type="range"
          min="1000"
          max="1000000"
          step="1000"
          value={startingAccount}
          onChange={(e) => setStartingAccount(Number(e.target.value))}
          className="calculator-slider"
        />
        <input
          type="number"
          value={startingAccount}
          onChange={(e) => setStartingAccount(Number(e.target.value))}
          className="calculator-input"
        />
      </div>

      <div className="calculator-input-group">
        <label>Monthly Return: {monthlyReturn}%</label>
        <input
          type="range"
          min="0.5"
          max="20"
          step="0.5"
          value={monthlyReturn}
          onChange={(e) => setMonthlyReturn(Number(e.target.value))}
          className="calculator-slider"
        />
        <input
          type="number"
          value={monthlyReturn}
          onChange={(e) => setMonthlyReturn(Number(e.target.value))}
          className="calculator-input"
          step="0.5"
        />
      </div>

      <div className="calculator-input-group">
        <label>Time Period: {years} years</label>
        <input
          type="range"
          min="1"
          max="30"
          step="1"
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          className="calculator-slider"
        />
        <input
          type="number"
          value={years}
          onChange={(e) => setYears(Number(e.target.value))}
          className="calculator-input"
        />
      </div>

      <div className="calculator-results">
        <div className="result-item">
          <label>Final Amount</label>
          <div className="result-value positive">${finalAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
        </div>
        <div className="result-item">
          <label>Total Profit</label>
          <div className="result-value positive">${totalProfit.toLocaleString(undefined, { maximumFractionDigits: 2 })}</div>
        </div>
        <div className="result-item">
          <label>Return Multiple</label>
          <div className="result-value">{(finalAmount / startingAccount).toFixed(2)}x</div>
        </div>
        <div className="result-item">
          <label>Annualized Return</label>
          <div className="result-value positive">{((Math.pow(monthlyMultiplier, 12) - 1) * 100).toFixed(2)}%</div>
        </div>
      </div>

      <div className="calculator-chart">
        <div className="growth-visualization">
          <div className="growth-initial">${startingAccount.toLocaleString()}</div>
          <div className="growth-arrow">→</div>
          <div className="growth-final">${finalAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
        </div>
      </div>

      <div className="calculator-warning">
        <strong>💹 The Power of Compounding:</strong> {monthlyReturn}% monthly return over {years} years turns ${startingAccount.toLocaleString()} into ${finalAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}. That's {(finalAmount / startingAccount).toFixed(1)}x your initial investment!
      </div>
    </div>
  );
}

export default function CalculatorPage() {
  const params = useParams();
  const calculatorId = params.calculator as string;
  const calc = calculators[calculatorId as keyof typeof calculators];

  if (!calc) {
    return (
      <>
        <Nav />
        <section style={{ padding: "60px 20px", textAlign: "center" }}>
          <h1>Calculator Not Found</h1>
          <p>
            <Link href="/tools">← Back to Tools</Link>
          </p>
        </section>
        <Footer />
      </>
    );
  }

  const Component = calc.component;

  return (
    <>
      <Nav />

      <section className="calculator-hero">
        <div className="calculator-hero-content">
          <Link href="/tools" className="calculator-back">
            ← Back to Tools
          </Link>
          <h1>{calc.title}</h1>
          <p>{calc.description}</p>
        </div>
      </section>

      <section className="calculator-section">
        <div className="calculator-wrapper">
          <Component />
        </div>
      </section>

      <Footer />
    </>
  );
}
