import React, { useState } from "react";
import classes from "./Profile.module.css";
import { hero } from "../../assets";
import { useAppDispatch } from "../../store/main";
import { logoutUser } from "../../store/auth/authReducer";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/Modal";

function Profile() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isModalActive, setIsModalActive] = useState(false);

  const openModal = () => {
    setIsModalActive(true);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
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
        <div>
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
