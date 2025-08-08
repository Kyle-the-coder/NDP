import { DBHero } from "../../sections/dashboardSections/DBHero/DBHero";
import { DBDirection } from "../../sections/dashboardSections/DBDirection/DBDirection";
import dashboardBg from "../../assets/decor/imgs/NDPAboutBg.png";
import "./dashboard.css";

export default function Dashboard() {
  return (
    <section className="display-column dashboard-main">
      <img className="dashboard-bg" src={dashboardBg} />
      <DBHero />
      <DBDirection />
    </section>
  );
}
