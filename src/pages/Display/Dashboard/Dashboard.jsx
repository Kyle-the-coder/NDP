import { DBHero } from "../../../sections/dashboardSections/DBHero/DBHero";
import { DBDirection } from "../../../sections/dashboardSections/DBDirection/DBDirection";
import dashboardBg from "../../../assets/decor/imgs/NDPAboutBg.png";
import "./dashboard.css";
import { useRef } from "react";

export default function Dashboard() {
  const wrapperRef = useRef();
  return (
    <section className="display-column dashboard-main" ref={wrapperRef}>
      <img className="dashboard-bg" src={dashboardBg} />
      <DBHero wrapperRef={wrapperRef} />
      <DBDirection wrapperRef={wrapperRef} />
    </section>
  );
}
