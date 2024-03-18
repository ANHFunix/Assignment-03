import { Link } from "react-router-dom";

import Container from "../components/UI/Container";
import css from "./Footer.module.css";

const DUMMY_COL_1 = {
  name: "CUSTOMER SERVICES",
  links: [
    { path: "#", text: "Help & Contact Us" },
    { path: "#", text: "Returns & Refunds" },
    { path: "#", text: "Online Stores" },
    { path: "#", text: "Terms & Conditions" },
  ],
};

const DUMMY_COL_2 = {
  name: "COMPANY",
  links: [
    { path: "#", text: "What We Do" },
    { path: "#", text: "Available Services" },
    { path: "#", text: "Latest Posts" },
    { path: "#", text: "FAQs" },
  ],
};

const DUMMY_COL_3 = {
  name: "SOCIAL MEDIA",
  links: [
    { path: "#", text: "Twitter" },
    { path: "#", text: "Instagram" },
    { path: "#", text: "Facebook" },
    { path: "#", text: "Pinterest" },
  ],
};

const Footer = () => {
  // Render component
  return (
    <footer className={css["footer"]}>
      <Container>
        <div className="row g-5">
          <div className="col-sm-4">
            <h6>{DUMMY_COL_1.name}</h6>
            <ul>
              {/* Render first footer column */}
              {DUMMY_COL_1.links.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text--light">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-sm-4">
            <h6>{DUMMY_COL_2.name}</h6>
            <ul>
              {/* Render second footer column */}
              {DUMMY_COL_2.links.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text--light">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-sm-4">
            <h6>{DUMMY_COL_3.name}</h6>
            <ul>
              {/* Render third footer column */}
              {DUMMY_COL_3.links.map((link, index) => (
                <li key={index}>
                  <Link to={link.path} className="text--light">
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
