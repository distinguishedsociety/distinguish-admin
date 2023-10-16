import "./dashboard.css";
import { Helmet } from "react-helmet";

const Dashboard = () => {
  const getStartedData = [
    {
      icon: (
        <i
          className="ri-star-smile-line me-3"
          style={{ fontSize: "38px", color: "#eb5424" }}
        ></i>
      ),
      title: "Branding",
      description:
        "Customize pages like login, registration, forgot password, dashboard. Modify Organisation Name, Button Color, Logo, etc. based on your needs.",
      buttonText: "Customize",
    },
    {
      icon: (
        <i
          className="ri-profile-line me-3"
          style={{ fontSize: "38px", color: "#eb5424" }}
        ></i>
      ),
      title: "Add Identity Source",
      description:
        "Create/manage user identities using our IDP service. Connect with an Identity Provider using multiple protocols like SAML, Oauth, OpenID and CAS.",
      buttonText: "Setup",
    },
    {
      icon: (
        <i
          className="ri-user-add-line me-3"
          style={{ fontSize: "38px", color: "#eb5424" }}
        ></i>
      ),
      title: "Add/Import Users",
      description:
        "Create, update & delete users, sync passwords, etc. and import users/groups with Provisioning. Perform events like hiring, promotion, transfer with ease.",
      buttonText: "Setup",
    },
    {
      icon: (
        <i
          className="ri-apps-line me-3"
          style={{ fontSize: "38px", color: "#eb5424" }}
        ></i>
      ),
      title: "Setup App",
      description:
        "Enable SSO into 5000+ pre-integrated apps. Select the application type from SAML, OAuth, JWT, RADIUS, etc. for a quick and effortless setup.",
      buttonText: "Setup",
    },
    {
      icon: (
        <i
          className="ri-lock-password-line me-3"
          style={{ fontSize: "38px", color: "#eb5424" }}
        ></i>
      ),
      title: "Setup 2FA",
      description:
        "Two-step verification process. Add an extra layer of security to protect your apps by using 15+ authentication methods like SMS/ email/ authenticator app etc.",
      buttonText: "Setup",
    },
    {
      icon: (
        <i
          className="ri-shield-check-line me-3"
          style={{ fontSize: "38px", color: "#eb5424" }}
        ></i>
      ),
      title: "Adaptive Authentication",
      description:
        "An advanced form of MFA. Authentication factor is selected based on the user's risk profile based on their IP address, device, behavior, etc.",
      buttonText: "Setup",
    },
  ];

  return (
    <div className="mainpage">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      Dashboard
    </div>
  );
};

export default Dashboard;
