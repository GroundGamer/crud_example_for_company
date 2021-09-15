import React from "react";
import { Context } from "../../context";

import "./modaledit.scss";

export default function ModalEdit({ id }) {
  const {
    userProf,
    setUserProf,
    formValid,
    setFormValid,
    editUserModal,
    setEditUserModal,
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

  React.useEffect(() => {
    userProf.forEach((item) => {
      if (item.id === id) {
        setLastName(item.Last_name);
        setFirstName(item.First_Name);
        setSurName(item.Surname);
        setEmail(item.E_mail);
        setLogin(item.login);

        setLastNameError("");
        setFirstNameError("");
        setSurNameError("");
        setEmailError("");
        setLoginError("");
      }
    });
  }, [editUserModal]);

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
  }, [lastName, firstName, surName, email, login, setFormValid, editUserModal]);

  const onEditUser = () => {
    let updatedUser = {
      id: id,
      Last_name: lastName,
      First_Name: firstName,
      Surname: surName !== "" ? surName : "-",
      E_mail: email,
      login: login
    };

    setUserProf(userProf.map((user) => (user.id === id ? updatedUser : user)));

    setLastName("");
    setFirstName("");
    setSurName("");
    setEmail("");
    setLogin("");
    setLastNameError("Заполните данное поле!");
    setFirstNameError("Заполните данное поле!");
    setSurNameError("Заполните данное поле!");
    setEmailError("Заполните данное поле!");
    setLoginError("Заполните данное поле!");
    setFormValid(false);
    setEditUserModal(!editUserModal);
  };

  const closeEditModule = () => {
    setLastName("");
    setFirstName("");
    setSurName("");
    setEmail("");
    setLogin("");
    setLastNameError("Заполните данное поле!");
    setFirstNameError("Заполните данное поле!");
    setSurNameError("Заполните данное поле!");
    setEmailError("Заполните данное поле!");
    setLoginError("Заполните данное поле!");
    setFormValid(false);
    setEditUserModal(!editUserModal);
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
            <p className="modal__header-name">Редактирование пользователя</p>
            <svg
              onClick={() => closeEditModule()}
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
                  {!surNameDirty && surNameError && (
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
              <button onClick={onEditUser} className="modal__button_create">
                Сохранить
              </button>
            ) : (
              <button className="modal__button_create locked">Сохранить</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
