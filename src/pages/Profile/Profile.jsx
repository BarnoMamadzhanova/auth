import React from "react";
import classes from "./Profile.module.css";
import { hero } from "../../assets";
import { Link } from "react-router-dom";

function Profile() {
  return (
    <div className={classes.profile}>
      <div className={classes.profileInfo}>
        <h2 className={classes.profileTitle}>С возвращением!</h2>
        <p className={classes.profileText}>Lorby - твой личный репетитор</p>
      </div>
      <img src={hero} alt="hero" className={classes.profileImg} />
      <Link className={classes.profileLink}>Выйти</Link>
    </div>
  );
}

export default Profile;
