import axios from "axios";
import { useState } from "react";
import Link from "next/link";


const Home = ({ restaurants }) => {

  const [resto, setresto] = useState(restaurants);
  const [cari, setCari] = useState("");
  function find(e) {
    setCari(e.target.value);
  }

  function submit(e) {
    e.preventDefault();
    const datafind = restaurants.data.filter(function (list) {
      return list.attributes.name.toLowerCase().includes(cari.toLowerCase());
    });
    setresto({ data: datafind });
  }
  return (
    <div>
      {/* Navigation*/}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
        <div className="container px-4 px-lg-5">
          <a className="navbar-brand" href="/">
            Restaurant
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
          ></div>
        </div>
        <form
          className="d-flex"
          role="search"
          onSubmit={function (e) {
            submit(e);
          }}
        >
          <input
            onChange={function (e) {
              find(e);
            }}
            className="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <button className="btn btn-outline-warning" type="submit">
            Search
          </button>
        </form>
      </nav>
      {/* Header*/}
<header class="masthead">
  <div class="container h-100">
    <div class="row h-100 align-items-center">
      <div class="col-12 text-center">
        <h1 class="fw-light">Restaurant Lord Kelvin</h1>
        <p class="lead">Bagi pecinta micin, silakan datang di Restaurant ini.</p>
      </div>
    </div>
  </div>
</header>

      {/* Section*/}
      <section className="py-5">
        <div className="container px-4 px-lg-5 mt-5">
          <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
            {resto.data.length > 0 ? (
              resto.data.map((resto,index) => {
                return (
                  <div key={index} className="col mb-5">
                    <div className="card h-100">
                      {/* Product image*/}
                      { <img
                        className="card-img-top"
                        src={`http://localhost:1337${resto.attributes.images.data.attributes.formats.thumbnail.url}`}
                        alt="..."
                      /> }
                      {/* Product details*/}
                      <div className="card-body p-4">
                        <div className="text-center">
                          {/* Product name*/}
                          <h5 className="fw-bolder">{resto.attributes.name}</h5>
                          {/* Product desc*/}
                          {resto.attributes.description}
                          <hr/>
                          {resto.attributes.categories.data.map(
                            (cat) => cat.attributes.name
                          )}
                          <hr/>
                          <h6>menu favorits : {resto.attributes.menu_favorits.data.map(
                            (cat) => cat.attributes.name 
                          )}</h6>
                          
                           <hr/>
                           <p>Harga : {resto.attributes.menu_favorits.data.map(
                            (cat) => cat.attributes.harga
                            
                          )}</p>
                          <hr/>
                          <p>Hari Operasional {resto.attributes.restaurant_hours.map((wkt) => wkt.day_interval)}
                          {resto.attributes.restaurant_hours.map((wkt) => wkt.opening_hours)}
                          {resto.attributes.restaurant_hours.map((wkt) => wkt.closing_hours)} </p>
                          
                        </div>
                      </div>
                      {/* Product actions*/}
                      <div className="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div className="text-center">
                           
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h2>
                <b>NOT FOUND</b>
              </h2>
            )}
          </div>
        </div>
      </section>
      {/* Footer*/}
     <footer className="w-100 py-4 flex-shrink-0">
  <div className="container py-4">
    <div className="row gy-4 gx-5">
      <div className="col-lg-4 col-md-6">
        <h5 className="h1 text-white">FB.</h5>
        <p className="small text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
        <p className="small text-muted mb-0">Restaurant Pecinta Micin. <a>Kelvin Rahmadhani Simamora</a></p>
      </div>
      <div className="col-lg-2 col-md-6">
        <h5 className="text-white mb-3">Quick links</h5>
        <ul className="list-unstyled text-muted">
          <li><a href="#">Home</a></li>
        
        </ul>
      </div>
      <div className="col-lg-2 col-md-6">
        <h5 className="text-white mb-3">Quick links</h5>
        <ul className="list-unstyled text-muted">
          <li><a href="#">Home</a></li>
        
        </ul>
      </div>
      <div className="col-lg-4 col-md-6">
        <h5 className="text-white mb-3">Newsletter</h5>
        <p className="small text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt.</p>
        <form action="#">
        </form>
      </div>
    </div>
  </div>
</footer>

    </div>
  );
};
export default Home;

export async function getServerSideProps(context) {
  const res = await axios.get(
    "http://localhost:1337/api/restaurants?populate=*"
  );
  const restaurants = res.data;
  return {
    props: { restaurants }, // will be passed to the page component as props
  };
}
