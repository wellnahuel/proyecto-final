import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postActivity } from "../redux/actions/activitiesActions";
import upImage from "./CreateProduct/cloudinary";
export default function ActivityCreate() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    detail: "",
    days: "",
    times: "",
    img: "",
  });

  // console.log(input, "inputttt");

  function validate(input) {
    const errors = {};
    if (!input.name)
      errors.name = "Please complete with the name of the activity";
    if (!input.detail)
      errors.detail = "Please complete with the details of the activity";
    if (!input.days)
      errors.days = "Add the days on which the activity will take place";
    if (!input.times) errors.times = "Required schedule";
    if (!input.img) errors.img = "Please add an image about the activity";
    return errors;
  }
  const handleImg = async (e) => {
    const upLoeadedImg = await upImage(e.target.files[0]);

    setInput({
      ...input,
      img: upLoeadedImg.url,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  const handleChange = (e) => {
    setInput((prevInput) => {
      const newInput = {
        ...prevInput,
        [e.target.name]: e.target.value,
      };
      const validations = validate(newInput);
      setErrors(validations);
      return newInput;
    });
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (Object.values(errors).length > 0) {
      alert("Please complete the information required");
    } else if (
      input.name === "" &&
      input.detail === "" &&
      input.days === "" &&
      input.times === "" &&
      input.img === ""
    ) {
      alert("Please complete the form");
    } else {
      dispatch(postActivity(input));
      alert("Created Succesfully!");
      setInput({
        name: "",
        detail: "",
        days: "",
        times: "",
        img: "",
      });
      navigate("/");
    }
  }

  return (
    <div>
      <Link to="/actividades">
        <button> Go Back </button>
      </Link>
      <div className="activityCreate">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div
            className="mb-3"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div
              className="mb-3"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <label htmlFor="name" className="form-label">
                Nombre de actividad
              </label>
              <input
                style={{ width: "600px" }}
                type="text"
                className="form-control mb-3"
                id="name"
                aria-describedby="name"
                placeholder="Name..."
                value={input.name}
                name="name"
                required
                onChange={(e) => handleChange(e)}
              />
              {errors.name && <p>{errors.name}</p>}
            </div>

            <div
              className="mb-3"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <label htmlFor="detail" className="form-label">
                Detalle de la actividad
              </label>
              <input
                style={{ width: "600px" }}
                type="text"
                className="form-control mb-3"
                id="detail"
                aria-describedby="detail"
                placeholder="Detail..."
                value={input.detail}
                name="detail"
                required
                onChange={(e) => handleChange(e)}
              />
              {errors.detail && <p>{errors.detail}</p>}
            </div>

            <div
              className="mb-3"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <label htmlFor="days" className="form-label">
                Days
              </label>
              <input
                style={{ width: "600px" }}
                type="text"
                className="form-control mb-3"
                id="days"
                aria-describedby="days"
                placeholder="Days..."
                value={input.days}
                name="days"
                required
                onChange={(e) => handleChange(e)}
              />
              {errors.days && <p>{errors.days}</p>}
            </div>

            <div
              className="mb-3"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <label htmlFor="times" className="form-label">
                Horarios
              </label>
              <input
                style={{ width: "600px" }}
                type="number"
                className="form-control mb-3"
                id="times"
                placeholder="Times..."
                value={input.times}
                name="times"
                required
                onChange={(e) => handleChange(e)}
              />
              {errors.times && <p>{errors.times}</p>}
            </div>

            <div
              className="mb-3"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <label htmlFor="img" className="form-label">
                Imagen
              </label>
              <input
                style={{ width: "600px" }}
                type="file"
                className="form-control"
                id="img"
                placeholder="Image..."
                name="img"
                onChange={(e) => handleImg(e)}
              />
              {errors.img && <p>{errors.img}</p>}
            </div>
            <br />
            <button type="submit" className="btn btn-primary">
              Crear
            </button>
            <br />
          </div>
        </form>
      </div>
    </div>
  );
}
