import React, { useState } from "react";
import classes from "./Profile.module.css";
import { hero } from "../../assets";
import { useAppDispatch } from "../../store/main";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";
import { logoutUser } from "../../store/auth/authReducer";

// Simulate logoutUser function
// const logoutUser = () => async (dispatch) => {
//   console.log("User logged out");
//   dispatch(logoutSuccess());
// };

function Profile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isModalActive, setIsModalActive] = useState(false);

  const openModal = () => {
    setIsModalActive(true);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    console.log("Navigating to main page");
    navigate("/");
  };

  return (
    <div className={classes.profile}>
      <div className={classes.profileInfo}>
        <h2 className={classes.profileTitle}>С возвращением!</h2>
        <p className={classes.profileText}>Lorby - твой личный репетитор</p>
      </div>
      <img src={hero} alt="hero" className={classes.profileImg} />
      <button className={classes.profileBtn} onClick={openModal}>
        Выйти
      </button>
      <Modal active={isModalActive} setActive={setIsModalActive}>
        <div className={classes.modal__message}>
          <p>Выйти?</p>
          <button
            onClick={() => {
              handleLogout();
              setIsModalActive(false);
            }}
          >
            Да, точно
          </button>
          <button onClick={() => setIsModalActive(false)}>Нет, остаться</button>
        </div>
      </Modal>
    </div>
  );
}

export default Profile;
