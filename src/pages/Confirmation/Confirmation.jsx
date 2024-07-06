import React from "react";
import classes from "./Confirmation.module.css";
import { Hero } from "../../components/Hero/Hero";
import ConfirmationForm from "../../components/ConfirmationForm/ConfirmationForm";

function Confirmation() {
  return (
    <div className={classes.confirmation}>
      <Hero />
      <ConfirmationForm />
    </div>
  );
}

export default Confirmation;
