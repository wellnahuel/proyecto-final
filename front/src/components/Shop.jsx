import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "./Pagination";
import { addCart } from "../redux/actions/index";
import {
  getProducts,
  orderByName,
  orderByPrice,
  filterByCategories,
  getCategories,
  filterByPrice,
} from "../redux/actionsCreator/productsActions";
import SearchBar from "./SearchBar";
import { Link } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from "./Login/LoginButton";

function Shop() {
  //----------- Utils -----------------
  const dispatch = useDispatch();

  // --------- Global states ---------------
  const products = useSelector((state) => state.productsReducer.showProducts);
  const category = useSelector((state) => state.productsReducer.categories);
  const price = useSelector((state) => state.productsReducer.filterByPrice);
  const byCategories = useSelector(
    (state) => state.productsReducer.byCategories
  );

  // --------------- Pagination --------------
  const productsPerPage = 12;

  const totalPages =
    byCategories.length > 0
      ? Math.ceil(byCategories?.length / productsPerPage)
      : price.length > 0
      ? Math.ceil(price?.length / productsPerPage)
      : Math.ceil(products?.length / productsPerPage);

  const [, setOrder] = useState();
  const [input, setInput] = useState({
    min: "",
    max: "",
  });

  const [page, setPage] = useState(1);
  const first = (page - 1) * productsPerPage;
  const last = page * productsPerPage;
  let productsPage =
    byCategories.length > 0
      ? byCategories?.slice(first, last)
      : price.length > 0
        ? price?.slice(first, last)
        : products?.slice(first, last);

  // --------------- Data call -------------

  //Categories
  useEffect(() => {
    if (category?.length === 0) {
      dispatch(getCategories());
    }
  }, [dispatch, category]);
  
  //Products
  useEffect(() => {
    if (category?.length > 0) {
      dispatch(getProducts());
    }
  }, [dispatch, category]);

  // --------------- Cart function ----------------
  const addProduct = (product) => {
    dispatch(addCart(product));
  };

  // -------------- sort functions ------------
  const orderName = function (e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setOrder(e.target.value);
  };

  const orderPrice = function (e) {
    e.preventDefault();
    dispatch(orderByPrice(e.target.value));
    setOrder(e.target.value);
  };

  const order = function (e) {
    setPage(1);
    if (e.target.value === "A/Z" || e.target.value === "Z/A") {
      orderName(e);
    }
    if (e.target.value === "MAX/MIN" || e.target.value === "MIN/MAX") {
      orderPrice(e);
    }
  };

  // ----------------- filter functions ------------------
  const filterCategories = (e) => {
    e.preventDefault();
    setPage(1);
    dispatch(filterByCategories(e.target.value));
  };

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  const handleSumit = (e) => {
    e.preventDefault();
    setPage(1);
    if (byCategories.length > 0) {
      const filteredCategories = byCategories?.filter((c) => {
        return parseInt(c.price) > input.min && parseInt(c.price) < input.max;
      });
      dispatch(filterByPrice(filteredCategories));
    } else {
      const filteredAll = products?.filter((p) => {
        return parseInt(p.price) > input.min && parseInt(p.price) < input.max;
      });
      dispatch(filterByPrice(filteredAll));
    }
  };

  //--------------- clean sort and filters function --------------------
  const cleanFilters = (e) => {
    e.preventDefault();
    setPage(1);
    dispatch(getProducts());
    dispatch(filterByPrice([]));
    dispatch(filterByCategories([]));
  };

  const {user, isAuthenticated} = useAuth0()

  return (
    isAuthenticated?
    <><>
      <div>
        <nav class="navbar navbar-light bg-light">
          <div
            class="container-fluid"
            style={{
              background: "linear-gradient(270deg, rgba(255,255,255,1) 0%, rgba(191,173,183,1) 52%, rgba(255,173,182,1) 66%, rgba(255,255,255,1) 83%)",
              padding: "1rem",
            }}
          >
            <select
              onChange={order}
              class="btn btn-secondary dropdown-toggle"
              style={{
                backgroundColor: "#FFFCF9",
                color: "#352D39",
              }}
            >
              <option defaultValue="ordenar">Ordenar por:</option>
              <option value="A/Z">A/Z</option>
              <option value="Z/A">Z/A</option>
              <option value="MIN/MAX">MIN/MAX</option>
              <option value="MAX/MIN">MAX/MIN</option>
            </select>
            <select
              onChange={filterCategories}
              class="btn btn-secondary dropdown-toggle"
              style={{
                backgroundColor: "#FFFCF9",
                color: "#352D39",
              }}
            >
              <option defaultValue="Categories">Filtrar categorías</option>
              {category?.map((c) => (
                <option name={c.name} key={c.id} value={c.name}>
                  {c.name}
                </option>
              ))}
            </select>
            <form onSubmit={handleSumit}>
              <label>Precio:  </label>
              <input
                type="text"
                placeholder="Min..."
                name="min"
                onChange={handleChange}
                value={input.min}
                class="btn btn-secondary dropdown-toggle"
                style={{
                  backgroundColor: "#FFFCF9",
                  color: "#352D39",
                  maxWidth: "5rem"
                }}
              ></input>
              <input
                type="text"
                placeholder="Max..."
                name="max"
                onChange={handleChange}
                value={input.max}
                class="btn btn-secondary dropdown-toggle"
                style={{
                  backgroundColor: "#FFFCF9",
                  color: "#352D39",
                  maxWidth: "5rem"
                }}
              ></input>
              <input type="submit" value="Buscar" class="btn btn-secondary dropdown-toggle"
              style={{
                backgroundColor: "#FFFCF9",
                color: "#352D39",
              }}/>
            </form>
            <SearchBar />
            <button
            onClick={cleanFilters}
            class="btn btn-outline-success"
            style={{
              backgroundColor: "#FFFCF9",
              color: "#352D39",
            }}
          >
            Borrar filtros
          </button>
          <Link class="nav-link" to="/crearProducto">
              Crear Producto
            </Link>
          </div>
        </nav>
        <div>
        </div>
      </div>
      <div
        className="grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "3rem",
          margin: "2rem",
        }}
      >
        {productsPage?.map((p) => (
          <Link to = {'/tienda/' + p.id}>
            <div key={p.id} className="col card border-info mb-3" style={{
              border: "none",
              boxShadow: "25px 30px 70px -20px rgba(0,0,0,0.5)"
            }}>
              <div className="card h-100" style ={{border: "none"}}>
                <div style={{
                      width: "200px",
                      height: "200px",
                      overflow: "hidden",
                      margin: "10px",
                      position: "relative"
                }}>
                  <img
                    style={{ 
                      position:"absolute",
                      left: "-100%",
                      right: "-100%",
                      top: "-100%",
                      bottom: "-100%",
                      margin: "auto",
                      maxHeigth: "200px",
                      minHeight: "100%",
                      minWidth: "100%",
                      }}
                    src={p.image}
                    className="card-img-top"
                    alt={p.name} />
                </div>
                <div className="card-body">
                  <h4 className="card-title">{p.name}</h4>
                  <h4>$ {p.price}</h4>
                  {/* <p className="card-text">{p.detail}</p> */}
                </div>
                <div className="card-footer d-flex justify-content-around">
                  <button
                    className="btn btn-outline-dark px-4 py-2"
                    onClick={() => addProduct(p)}
                  >
                    Agregar al carrito
                  </button>
                </div>
              </div>
            </div>
          </Link>
          ))}
      </div>
    </>
    <Pagination totalPages={totalPages} page={page} setPage={setPage} /></>
    :
    <div>
    <h3>need to login, click here </h3> <LoginButton />
    <hr />
    </div>
  );
}

export default Shop;
