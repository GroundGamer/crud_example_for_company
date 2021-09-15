import React from "react";
import { Context } from "../../context";

import "./modaladd.scss";

export default function ModalAdd() {
  const {
    userProf,
    setUserProf,
    formValid,
    setFormValid,
    openModal,
    setOpenModal,
    lastName,
    setLastName,
    firstName,
    setFirstName,
    surName,
    setSurName,
    email,
    setEmail,
    login,
    setLogin,
    lastNameDirty,
    setLastNameDirty,
    lastNameError,
    setLastNameError,
    firstNameDirty,
    setFirstNameDirty,
    firstNameError,
    setFirstNameError,
    surNameDirty,
    setSurNameDirty,
    surNameError,
    setSurNameError,
    emailDirty,
    setEmailDirty,
    emailError,
    setEmailError,
    loginDirty,
    setLoginDirty,
    loginError,
    setLoginError
  } = React.useContext(Context);

  const refModal = React.useRef();

  const lastNameHandler = (e) => {
    setLastName(e.target.value);
    const re = /^[a-zA-Zа-яА-Я]+$/;
    if (e.target.value.length < 2) {
      setLastNameError("Фамилия не может быть короче 2 букв!");
    } else if (e.target.value.length >= 15) {
      setLastNameError("Фамилия не может быть больше 15 букв!");
    } else if (!re.test(String(e.target.value).toLowerCase())) {
      setLastNameError("Фамилия не может состоять из цифр!");
    } else {
      setLastNameError("");
    }
  };

  const firstNameHandler = (e) => {
    setFirstName(e.target.value);
    const re = /^[a-zA-Zа-яА-Я]+$/;
    if (e.target.value.length < 2) {
      setFirstNameError("Имя не может быть короче 2 букв!");
    } else if (e.target.value.length >= 15) {
      setFirstNameError("Имя не может быть больше 15 букв!");
    } else if (!re.test(String(e.target.value).toLowerCase())) {
      setFirstNameError("Имя не может состоять из цифр!");
    } else {
      setFirstNameError("");
    }
  };

  const surNameHandler = (e) => {
    setSurName(e.target.value);
    const re = /^[a-zA-Zа-яА-Я]+$/;
    if (e.target.value.length < 2) {
      setSurNameError("Отчетсво не может быть короче 2 букв!");
    } else if (e.target.value.length >= 15) {
      setSurNameError("Отчество не может быть больше 15 букв!");
    } else if (!re.test(String(e.target.value).toLowerCase())) {
      setSurNameError("Отчество не может состоять из цифр!");
    } else {
      setSurNameError("");
    }

    if (e.target.value.length === 0) {
      setSurNameError("");
    }
  };

  const emailHandler = (e) => {
    setEmail(e.target.value);
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(String(e.target.value).toLowerCase())) {
      setEmailError("Некорректный e-mail!");
    } else {
      setEmailError("");
    }
  };

  const loginHandler = (e) => {
    setLogin(e.target.value);
    const re = /^[a-zA-Z0-9\-]+$/;
    if (e.target.value.length < 3) {
      setLoginError("Логин не может быть короче 2 букв!");
    } else if (!re.test(String(e.target.value).toLowerCase())) {
      setLoginError("Логин не может состоять из русских букв!");
    } else if (e.target.value.length >= 10) {
      setLoginError("Логин не может быть больше 10 букв!");
    } else {
      setLoginError("");
    }
  };

  React.useEffect(() => {
    let data = [];

    refModal.current.childNodes.forEach((item) => {
      if (item.lastChild.value !== "") {
        data.push(item.lastChild.value);
      } else if (
        item.lastChild.value === "" &&
        item.textContent === "Отчество"
      ) {
        data.push(item.lastChild.value);
      }
    });

    if (data.length >= 4) {
      setFormValid(true);
    }

    if (data.length <= 4) {
      setFormValid(false);
    }

    if (
      lastNameError ||
      firstNameError ||
      surNameError ||
      emailError ||
      loginError
    ) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }
  }, [lastName, firstName, surName, email, login, setFormValid]);

  const onAddUser = () => {
    setUserProf((prev) => [
      {
        id:
          userProf.length === 0
            ? String(Number(userProf.length + 1))
            : String(Number(userProf[userProf.length - 1].id) + 1),
        Last_name: lastName,
        First_Name: firstName,
        Surname: surName !== "" ? surName : "-",
        E_mail: email,
        login: login
      },
      ...prev
    ]);
    setLastName("");
    setFirstName("");
    setSurName("");
    setEmail("");
    setLogin("");
    // setLastNameError("Заполните данное поле!");
    // setFirstNameError("Заполните данное поле!");
    // setSurNameError("Заполните данное поле!");
    // setEmailError("Заполните данное поле!");
    // setLoginError("Заполните данное поле!");
    setFormValid(false);
    setOpenModal(!openModal);
  };

  const closeAddModule = () => {
    setLastName("");
    setFirstName("");
    setSurName("");
    setEmail("");
    setLogin("");
    // setLastNameError("Заполните данное поле!");
    // setFirstNameError("Заполните данное поле!");
    // setSurNameError("Заполните данное поле!");
    // setEmailError("Заполните данное поле!");
    // setLoginError("Заполните данное поле!");
    setFormValid(false);
    setOpenModal(!openModal);
  };

  const blurHandler = (e) => {
    switch (e.target.id) {
      case "lastname":
        setLastNameDirty(true);
        break;

      case "firstname":
        setFirstNameDirty(true);
        break;

      case "email":
        setEmailDirty(true);
        break;

      case "surname":
        setSurNameDirty(true);
        break;

      case "login":
        setLoginDirty(true);
        break;

      default:
    }
  };

  return (
    <div className="modal">
      <div className="modal__overlay">
        <div className="modal__drawer">
          <div className="modal__header">
            <p className="modal__header-name">Создание пользователя</p>
            <svg
              onClick={() => closeAddModule()}
              className="modal__button_close"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.5 5.5L5.5 14.5"
                stroke="#B8C1CC"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M14.5 14.5L5.5 5.5"
                stroke="#B8C1CC"
                stroke-width="1.2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div className="modal__place">
            <form className="modal__place-form" ref={refModal}>
              <div className="modal__area">
                <div className="modal__separete">
                  <label>Фамилия</label>
                  {lastNameDirty && lastNameError && (
                    <div className="modal__error">{lastNameError}</div>
                  )}
                </div>
                <input
                  onBlur={(e) => blurHandler(e)}
                  placeholder="Введите фамилию"
                  className="modal__input"
                  type="text"
                  id="lastname"
                  value={lastName}
                  onChange={(e) => lastNameHandler(e)}
                />
              </div>
              <div className="modal__area">
                <div className="modal__separete">
                  <label>Имя</label>
                  {firstNameDirty && firstNameError && (
                    <div className="modal__error">{firstNameError}</div>
                  )}
                </div>
                <input
                  onBlur={(e) => blurHandler(e)}
                  placeholder="Введите имя"
                  className="modal__input"
                  type="text"
                  id="firstname"
                  value={firstName}
                  onChange={(e) => firstNameHandler(e)}
                />
              </div>
              <div className="modal__area">
                <div className="modal__separete">
                  <label>Отчество</label>
                  {surNameDirty && surNameError && (
                    <div className="modal__error">{surNameError}</div>
                  )}
                </div>
                <input
                  placeholder="Введите отчество"
                  className="modal__input"
                  type="text"
                  id="surname"
                  value={surName}
                  onChange={(e) => surNameHandler(e)}
                />
              </div>
              <div className="modal__area">
                <div className="modal__separete">
                  <label>E-mail</label>
                  {emailDirty && emailError && (
                    <div className="modal__error">{emailError}</div>
                  )}
                </div>
                <input
                  placeholder="Введите электронную почту"
                  className="modal__input"
                  type="email"
                  id="email"
                  value={email}
                  onBlur={(e) => blurHandler(e)}
                  onChange={(e) => emailHandler(e)}
                />
              </div>
              <div className="modal__area">
                <div className="modal__separete">
                  <label>Логин</label>
                  {loginDirty && loginError && (
                    <div className="modal__error">{loginError}</div>
                  )}
                </div>
                <input
                  onBlur={(e) => blurHandler(e)}
                  placeholder="Введите логин"
                  className="modal__input"
                  type="text"
                  id="login"
                  value={login}
                  onChange={(e) => loginHandler(e)}
                />
              </div>
            </form>
          </div>
          <div className="modal__footer">
            {formValid ? (
              <button onClick={onAddUser} className="modal__button_create">
                Создать
              </button>
            ) : (
              <button className="modal__button_create locked">Создать</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
