import React from "react";
import { Context } from "./context";
import Table from "./components/Table/Table";
import ModalAdd from "./components/ModalAdd/ModalAdd";
import ModalEdit from "./components/ModalEdit/ModalEdit";
import ModalDelete from "./components/ModalDelete/ModalDelete";

import "./styles.scss";

export default function App() {
  const [userProf, setUserProf] = React.useState([
    {
      id: "1",
      Last_name: "Иванов",
      First_Name: "Иван",
      Surname: "Иванович",
      E_mail: "mail1@mail.com",
      login: "user1"
    },
    {
      id: "2",
      Last_name: "Петров",
      First_Name: "Петр",
      Surname: "Сергеевич",
      E_mail: "mail2@mail.com",
      login: "user2"
    },
    {
      id: "3",
      Last_name: "Сергеев",
      First_Name: "Григорий",
      Surname: "Викторович",
      E_mail: "mail3@mail.com",
      login: "user3"
    },
    {
      id: "4",
      Last_name: "Федоров",
      First_Name: "Виктор",
      Surname: "Федорович",
      E_mail: "mail4@mail.com",
      login: "user4"
    },
    {
      id: "5",
      Last_name: "Хвастунов",
      First_Name: "Сергей",
      Surname: "Петрович",
      E_mail: "mail5@mail.com",
      login: "user5"
    },
    {
      id: "6",
      Last_name: "Григорьев",
      First_Name: "Федор",
      Surname: "Григорьевич",
      E_mail: "mail6@mail.com",
      login: "user6"
    }
  ]);
  const [formValid, setFormValid] = React.useState(false);

  const [lastName, setLastName] = React.useState("");
  const [lastNameDirty, setLastNameDirty] = React.useState(false);
  const [lastNameError, setLastNameError] = React.useState(
    "Заполните данное поле!"
  );

  const [firstName, setFirstName] = React.useState("");
  const [firstNameDirty, setFirstNameDirty] = React.useState(false);
  const [firstNameError, setFirstNameError] = React.useState(
    "Заполните данное поле!"
  );

  const [surName, setSurName] = React.useState("");
  const [surNameDirty, setSurNameDirty] = React.useState(false);
  const [surNameError, setSurNameError] = React.useState(
    "Заполните данное поле!"
  );

  const [email, setEmail] = React.useState("");
  const [emailDirty, setEmailDirty] = React.useState(false);
  const [emailError, setEmailError] = React.useState("Заполните данное поле!");

  const [login, setLogin] = React.useState("");
  const [loginDirty, setLoginDirty] = React.useState(false);
  const [loginError, setLoginError] = React.useState("Заполните данное поле!");

  const [openModal, setOpenModal] = React.useState(false);
  const [editUserModal, setEditUserModal] = React.useState(false);
  const [deleteUserModal, setDeleteUserModal] = React.useState(false);

  const [userId, setUserId] = React.useState("");

  const currentUserId = (obj) => {
    setUserId(obj);
  };

  return (
    <Context.Provider
      value={{
        userProf,
        setUserProf,
        formValid,
        setFormValid,
        openModal,
        setOpenModal,
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
        setLoginError,
        deleteUserModal,
        setDeleteUserModal
      }}
    >
      <div className="App">
        <header className="header"></header>
        <div className="content">
          <div className="content__menu"></div>
          <div className="content__area-users">
            <Table currentUserId={(obj) => currentUserId(obj)} />
          </div>
        </div>
        {openModal ? <ModalAdd /> : ""}
        {editUserModal ? <ModalEdit id={userId} /> : ""}
        {deleteUserModal ? <ModalDelete id={userId} /> : ""}
      </div>
    </Context.Provider>
  );
}
