import React from "react";
import { Context } from "../../context";

import "./modaldelete.scss";

export default function ModalDelete({ id }) {
  const { deleteUserModal, setDeleteUserModal, setUserProf } = React.useContext(
    Context
  );

  const onDeleteUser = () => {
    setUserProf((prev) =>
      prev.filter((item) => Number(item.id) !== Number(id))
    );
    setDeleteUserModal(!deleteUserModal);
  };

  return (
    <div className="modal__delete">
      <div className="modal__delete-overlay">
        <div className="modal__delete-drawer">
          <div className="modal__delete-header">
            <p className="modal__delete-header-name">Удаление пользователя</p>
          </div>
          <div className="modal__delete-place">
            <p className="modal__delete-text">
              Удалить выбранного пользователя ?
            </p>
          </div>
          <div className="modal__delete-footer">
            <button
              onClick={() => setDeleteUserModal(!deleteUserModal)}
              className="modal__delete-button_cansel"
            >
              Отмена
            </button>
            <button
              onClick={onDeleteUser}
              className="modal__delete-button_accept"
            >
              Удалить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
