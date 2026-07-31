import Link from "next/link";

export default function Nav() {
  return (
    <nav>
      <div className="nav-inner">
        <Link className="logo" href="/">
          Prop<span>fundsy</span>
        </Link>
        <div className="nav-links">
          <Link href="/#firms">Firms</Link>
          <Link href="/#plans">Compare Plans</Link>
          <Link href="/#why">Why Propfundsy</Link>
          <Link href="/#faq">FAQ</Link>
          <Link className="nav-cta" href="/#plans">Find Your Firm</Link>
        </div>
      </div>
    </nav>
  );
}
