import classes from "./Hero.module.css";
import { hero } from "../../assets";

export const Hero = () => {
  return (
    <div className={classes.hero}>
      <img src={hero} alt="Lorby" />
      <div className={classes.info__box}>
        <h2>Lorby</h2>
        <p>Твой личный репетитор</p>
      </div>
    </div>
  );
};
