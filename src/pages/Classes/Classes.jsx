import { PageTitle } from "../../components/PageTitle/PageTitle";

import classesBg from "../../assets/decor/imgs/NDPAboutBg.png";
import "./classes.css";
import { Card } from "../../components/Card/Card";

export default function ClassesPage() {
  return (
    <section className="classes-main">
      <img src={classesBg} className="classes-bg" />
      <div className="classes-z-index">
        <PageTitle
          title="EXPLORE OUR GALACTIC MOVES"
          blerb="Choose Your Style. Step Into Your Power."
        />
        <div className="classes-grid">
          <Card png="" title="" blerb="" link="" />
        </div>
      </div>
    </section>
  );
}
