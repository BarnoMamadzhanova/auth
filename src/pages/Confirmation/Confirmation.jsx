import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
import { useToken } from "./useToken";
import { useAppDispatch } from "../../store/main";
import { confirmEmail } from "../../store/auth/authReducer";
import classes from "./Confirmation.module.css";
import { Hero } from "../../components/Hero/Hero";
import ConfirmationForm from "../../components/ConfirmationForm/ConfirmationForm";
import Modal from "../../components/Modal/Modal";

function Confirmation() {
  const token = useToken();
  const dispatch = useAppDispatch();
  const [modalActive, setModalActive] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    if (token) {
      dispatch(confirmEmail(token))
        .then(() => {
          setModalMessage("Почта успешно подтверждена.");
          setModalActive(true);
        })
        .catch((error) => {
          setModalMessage("Что-то пошло не так, попробуй еще раз))");
          setModalActive(true);
        });
    }
  }, [token, dispatch]);

  const handleModalClose = () => {
    setModalActive(false);
  };

  const handleConfirmSuccess = () => {
    setModalMessage("Мы выслали еще одно письмо на указанную почту.");
    setModalActive(true);
  };

  const handleConfirmError = () => {
    setModalMessage("Что-то пошло не так, попробуй еще раз))");
    setModalActive(true);
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
          {modalMessage && (
            <div className={classes.modal__message}>
              <p>{modalMessage}</p>
              <button onClick={handleModalClose}>Понятно</button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

export default Confirmation;
