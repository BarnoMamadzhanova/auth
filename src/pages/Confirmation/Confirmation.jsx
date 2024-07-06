import React, { useState } from "react";
import classes from "./Confirmation.module.css";
import { Hero } from "../../components/Hero/Hero";
import ConfirmationForm from "../../components/ConfirmationForm/ConfirmationForm";
import Modal from "../../components/Modal/Modal";

function Confirmation() {
  // const { token } = useParams();
  const [modalActive, setModalActive] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleConfirmSuccess = () => {
    setModalMessage("Мы выслали еще одно письмо на указанную почту.");
    setModalActive(true);
  };

  const handleConfirmError = () => {
    setModalMessage("Что-то пошло не так, попробуй еще раз))");
    setModalActive(true);
  };

  const handleModalClose = () => {
    setModalActive(false);
  };

  return (
    <div className={classes.confirmation}>
      <Hero />
      <ConfirmationForm
        onSubmitSuccess={handleConfirmSuccess}
        onSubmitError={handleConfirmError}
      />
      {modalActive && (
        <Modal active={modalActive} setActive={setModalActive}>
          {modalMessage ? (
            <div className={classes.modal__message}>
              <p>{modalMessage}</p>
              <button onClick={handleModalClose}>Понятно</button>
            </div>
          ) : (
            ""
          )}
        </Modal>
      )}
    </div>
  );
}

export default Confirmation;
