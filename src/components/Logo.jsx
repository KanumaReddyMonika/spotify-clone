import logo from "../../public/Vector.png";
import profile from "../../public/Profile.png";
import "./Logo.css";

export default function Logo() {
  return (
    <div className="logo">
      <img className="logo-img" src={logo} />
      <img className="profile-img" src={profile} />
    </div>
  );
}
