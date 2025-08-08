import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { DBHero } from "../../sections/dashboardSections/DBHero/DBHero";
import { DBDirection } from "../../sections/dashboardSections/DBDirection/DBDirection";

export default function Dashboard() {
  return (
    <section className="display-column">
      <DBHero />
      <DBDirection />
    </section>
  );
}
