import { userIconUrl } from "../../assets/images/images";
import "../../styles/Header.css";
import { useEffect, useState } from "react";

interface headerProps {
  setJobsPage: () => void;
  setProfilePage: () => void;
}

const Header = (props: headerProps) => {
  const [profile, setProfile] = useState(false);

  useEffect(() => {
    const fetchJobs = async () => {
      const token = localStorage.getItem('token');
      setProfile(() => token ? true : false);
    }
    fetchJobs();
  }, []);

  const headerLogoHandler = () => {
    props.setJobsPage();
  }

  return (
    <div className="header">
      <div className="header__title">
        <img src={userIconUrl} alt="" onClick={headerLogoHandler} />
      </div>
      <div className="header__left">
        {profile && (
          <figure className="profile-photo" onClick={() => { props.setProfilePage() }}>
            <img src={userIconUrl} alt="" title="Profile" />
          </figure>
        )}
      </div>
    </div>
  );
};

export default Header;