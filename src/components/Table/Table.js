import React from "react";
import { Context } from "../../context";
import { useTable } from "react-table";

import "./table.scss";

function TableRender({ columns, data, userId, dataUser }) {
  const {
    editUserModal,
    setEditUserModal,
    deleteUserModal,
    setDeleteUserModal
  } = React.useContext(Context);

  const handleGetId = (id, choice) => {
    userId(id);

    switch (choice) {
      case "edit":
        setEditUserModal(!editUserModal);
        break;

      case "delete":
        setDeleteUserModal(!deleteUserModal);
        break;

      default:
    }
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data
  });
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
            <th></th>
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <>
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
                <td className="content__table-button-right">
                  <button
                    onClick={() => handleGetId(row.original.id, "edit")}
                    className="content__table-button_edit"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.5 16.875H3.75C3.58424 16.875 3.42527 16.8092 3.30806 16.692C3.19085 16.5748 3.125 16.4158 3.125 16.25V12.7589C3.125 12.6768 3.14117 12.5956 3.17258 12.5197C3.20398 12.4439 3.25002 12.375 3.30806 12.317L12.6831 2.94197C12.8003 2.82476 12.9592 2.75891 13.125 2.75891C13.2908 2.75891 13.4497 2.82476 13.5669 2.94197L17.0581 6.43309C17.1753 6.5503 17.2411 6.70927 17.2411 6.87503C17.2411 7.04079 17.1753 7.19976 17.0581 7.31697L7.5 16.875Z"
                        stroke="#B8C1CC"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M10.625 5L15 9.375"
                        stroke="#B8C1CC"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M16.875 16.875H7.50003L3.16479 12.5398"
                        stroke="#B8C1CC"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleGetId(row.original.id, "delete")}
                    className="content__table-button_delete"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.8747 4.375L3.12469 4.37501"
                        stroke="#B8C1CC"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8.125 8.125V13.125"
                        stroke="#B8C1CC"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M11.875 8.125V13.125"
                        stroke="#B8C1CC"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M15.6247 4.375V16.25C15.6247 16.4158 15.5588 16.5747 15.4416 16.6919C15.3244 16.8092 15.1655 16.875 14.9997 16.875H4.99969C4.83393 16.875 4.67496 16.8092 4.55775 16.6919C4.44054 16.5747 4.37469 16.4158 4.37469 16.25V4.375"
                        stroke="#B8C1CC"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M13.125 4.375V3.125C13.125 2.79348 12.9933 2.47554 12.7589 2.24112C12.5245 2.0067 12.2065 1.875 11.875 1.875H8.125C7.79348 1.875 7.47554 2.0067 7.24112 2.24112C7.0067 2.47554 6.875 2.79348 6.875 3.125V4.375"
                        stroke="#B8C1CC"
                        stroke-width="1.2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </>
          );
        })}
      </tbody>
    </table>
  );
}

export default function Table({ currentUserId }) {
  const { userProf, openModal, setOpenModal } = React.useContext(Context);

  const columns = React.useMemo(
    () => [
      {
        Header: "Фамилия",
        accessor: "Last_name"
      },
      {
        Header: "Имя",
        accessor: "First_Name"
      },
      {
        Header: "Отчество",
        accessor: "Surname"
      },
      {
        Header: "E-mail",
        accessor: "E_mail"
      },
      {
        Header: "Логин",
        accessor: "login"
      }
    ],
    []
  );

  const data = React.useMemo(() => userProf, [userProf]);

  const userId = (obj) => {
    currentUserId(obj);
  };

  return (
    <>
      <div className="content__sub-header">
        <p className="content__sub-header-name">Пользователи</p>
        <button
          onClick={() => setOpenModal(!openModal)}
          className="content__button"
        >
          <svg
            className="content__button-plus"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M16.9979 10.627C17.3293 10.6283 17.599 10.3607 17.6003 10.0293C17.6016 9.69794 17.334 9.42826 17.0026 9.42697L10.6024 9.402L10.6274 3.0018C10.6287 2.67043 10.3611 2.40076 10.0297 2.39947C9.69836 2.39817 9.42869 2.66575 9.42739 2.99712L9.40242 9.39731L3.00223 9.37234C2.67086 9.37105 2.40119 9.63863 2.39989 9.96999C2.3986 10.3014 2.66618 10.571 2.99755 10.5723L9.39774 10.5973L9.37277 16.9975C9.37147 17.3289 9.63905 17.5985 9.97042 17.5998C10.3018 17.6011 10.5715 17.3335 10.5728 17.0022L10.5977 10.602L16.9979 10.627Z"
              fill="white"
            />
          </svg>
          Добавить
        </button>
      </div>
      <div className="content__table">
        {userProf.length > 0 ? (
          <TableRender
            columns={columns}
            data={data}
            userId={(obj) => userId(obj)}
          />
        ) : (
          <div className="content__empty">
            <p>Список пользователей пуст!</p>
          </div>
        )}
      </div>
    </>
  );
}
