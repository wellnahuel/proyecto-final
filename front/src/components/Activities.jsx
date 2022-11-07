import React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getActivities } from "../redux/actions/activitiesActions";
import { 
  get_users,
  get_roles,
  get_users_by_id
} from "../redux/actionsCreator/usersActions";
import { addUserActivity } from "../redux/actionsCreator/registerActivityActions";

export default function Activities() {
  const dispatch = useDispatch();



  const allActivities = useSelector((state) => state.activitiesReducer.activities);
  const usersState = useSelector((state) => state.usersReducer.usersById);
  const roles = useSelector((state) => state.usersReducer.roles);
  const allUsers = useSelector((state) => state.usersReducer.users);
  const register = useSelector((state) => state.registerActivityReducer.registerActivity)
 

// Add activities to a user - Register in an activity

useEffect(() => {
  dispatch(getActivities());
  dispatch(get_users());
}, [dispatch]);

  //User
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

function handleAddtoAct(activities) {
  if(usersState){
    const findReg = register.find( a => a.id === activities.id)
    if(findReg){
        alert("El usuario ya esta registrado")
    }else{
      dispatch(addUserActivity(activities, usersState.id));
     alert("Usuario registrado")
   }
 }}


  return (
    <div>
      <div className="container p-3">
        <div className="row">
          <div className="col">
            <h3 className="">Actividades del Club</h3>
            <p className="mb-0 ">
              En esta seccion usted podra informarse de todas las actividades
              que el club tiene disponible tanto de los días y horarios como del
              lugar donde se realizan.{" "}
            </p>
          </div>
          <div className="col">
            <img
              src="/img/natacion.jpg"
              alt="campeones2"
              style={{ width: "280px" }}
            />
          </div>

          <div className="col">
            <img
              src="/img/inf_camp.jpg"
              alt="campeones"
              style={{ width: "300px" }}
            />
          </div>
        </div>

        <div></div>

        <div></div>
      </div>

      <div className="row row-cols-1 row-cols-md-3 g-4 mb-4">
        {allActivities ? (
          allActivities.map((a) => {
            return (
              <div className="col" key={a.name}>
                <div
                  className="card h-100 m-2"
                  style={{
                    border: "1px solid black",
                  }}
                >
                  <img
                    src={a.img}
                    style={{ height: "250px", width: "100%" }}
                    className="card-img-top"
                    alt="..."
                  />

                  <div
                    className="card-body"
                    style={{
                      backgroundColor: "rgba(160, 160, 160, 0.788)",
                      padding: "0px",
                    }}
                  >
                    <h5 className="card-title">{a.name}</h5>
                    <p className="card-text">{a.detail}</p>
                    <p className="card-text">
                      <small className="text-muted">Días: {a.days}</small>
                    </p>
                    <p className="card-text">
                      <small className="text-muted">Horario: {a.times}</small>
                    </p>
                    <button type="button" className="btn btn-secondary" onClick={() => handleAddtoAct(a.id)}>
                      Inscribirse
                    </button>
                    <div
                      className="d-flex flex-column px-4"
                    >
                      <Link to="/crearCalificacion">
                        {" "}
                        <button
                          type="button"
                          className="btn btn-outline-dark ms-2"
                        >
                          Deja tu reseña
                        </button>{" "}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>Loading Activities....</div>
        )}
      </div>
      <Link to="/inscriptos">
        {" "}
        <button type="button" className="btn btn-outline-dark ms-2">
          Usuarios inscriptos
        </button>{" "}
      </Link>
    </div>
  );
}
