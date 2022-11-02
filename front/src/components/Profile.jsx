import React, { useState } from "react";
import { Link } from 'react-router-dom'
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import generica from "../imagesTeam/Santi.png";
import {
  get_roles,
  get_users,
  get_users_by_id,
} from "../redux/actionsCreator/usersActions";
//import { useAuth0 } from '@auth0/auth0-react'; LO DEJO COMENTADO PERO ENTIENDO QUE LO VAMOS A USAR CUANDO ESTE TODO OK

export default function Perfil() {
  //NO DEBERIA GUARDARME EN UNA CONSTANTE UN ESTADO DONDE ESTE LA DATA DEL USUARIO¿¿
  const usersState = useSelector((state) => state.usersReducer.usersById);
  const roles = useSelector((state) => state.usersReducer.roles);
  const allUsers = useSelector((state) => state.usersReducer.users);
  const dispatch = useDispatch();

  useEffect(() => {
    if (allUsers?.length === 0) {
      dispatch(get_users());
    }
    if (roles?.length === 0) {
      dispatch(get_roles());
    }
    if (usersState?.length === 0) {
      dispatch(get_users_by_id(7));
    }
  }, [dispatch, allUsers, roles, usersState]);

  return (
    <div class="container-fluid">
      <div class="row flex-nowrap">
        <div class="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
          <div class="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
            <a
              href="/"
              class="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none"
            >
              <span class="fs-5 d-none d-sm-inline">Menu</span>
            </a>

            <ul

              class="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
              id="menu"
            >

              <li>
                <label class="nav-link align-middle px-0">
                  <div class="ms-1 d-none d-sm-inline">Perfil</div>
                </label>
              </li>

              <li>
                <Link to='/profile/actividades'>
                  <label class="nav-link align-middle px-0">
                    <div class="ms-1 d-none d-sm-inline">Actividades</div>
                  </label>
                </Link>
              </li>

              <li id="Historial de compras" >
                <Link to='/profile/historial'>
                  <label class="nav-link align-middle px-0">
                    <div class="ms-1 d-none d-sm-inline">
                      Historial de compras
                    </div>
                  </label>
                </Link>
              </li>

              <li id="Usuarios">
                <Link to='/listUsers'>
                  <label class="nav-link align-middle px-0">
                    <div class="ms-1 d-none d-sm-inline">Usuarios</div>
                  </label>
                </Link>
              </li>


              

              <li id="Productos">
                <Link to='/profile/productos'>
                  <label class="nav-link align-middle px-0">
                    <div class="ms-1 d-none d-sm-inline">Productos</div>
                  </label>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div class="col py-3">
          <div>
            <img src={generica} alt="generica" />
          </div>
          <div>
            <h3> Nombre completo: </h3>
            <h2>
              {usersState?.name} {usersState?.lastname}
            </h2>
          </div>
          <div>
            <h3> Email: </h3>
            <h2>{usersState?.email}</h2>
          </div>
          <div>
            <h3> Fecha de nacimiento: </h3>
            <h2>{usersState?.dateOfBirth}</h2>
          </div>
          <div>
            <h3> Télefono: </h3>
            <h2>{usersState?.phoneNumber}</h2>
          </div>
          <div>
            <h3> Dirección: </h3>
            <h2>{usersState?.address}</h2>
          </div>
          <div>
            <h3> postalCode: </h3>
            <h2>{usersState?.postalCode}</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
