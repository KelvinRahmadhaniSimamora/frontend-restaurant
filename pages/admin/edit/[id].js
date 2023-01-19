import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
function EditPage({ menu_favorit}) {
  console.log(menu_favorit);
  const [namamenu_favorit, setNama] = useState(menu_favorit.data.attributes.name);
  function change(e) {
    setNama(e.target.value);
  }
  const router = useRouter();
  async function send(e) {
    e.preventDefault();
    const putdata = await axios({
      url: `http://localhost:1337/api/menu-favorits/${menu_favorit.data.id}`,
      method: "PUT",
      data: {
        data: {
          name: namamenu_favorit,
        },
      },
    });
    alert("DATA BERHASIL DIEDIT");
    setNama("");
    router.replace("/admin");
  }
  console.log(namamenu_favorit);
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav"></div>
        </div>
      </nav>
      
        <form 
        onSubmit={function (e) {
          send(e);
        }}
        className="p-2">
          <div className="row d-flex justify-content-center">
            <div className="mb-3 col-lg-4">
              <label htmlFor="exampleInputEmail1" className="form-label">
              menu_favorit
              </label>
              <input
              value={namamenu_favorit}
                type="text"
                onChange={function (e) {
                  change(e);
                }}
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Resto"
              />
              <button type="submit" className="btn btn-primary mt-3">
                Edit
              </button>
            </div>
          </div>
          <div className="mb-3 col-lg-4"></div>
          <div className="row col-lg-4"></div>
        </form>
        <table className="table table-striped"></table>
      </div>
  );
}

export default EditPage;

export async function getServerSideProps(req, res) {
  const response = await axios.get(
    `http://localhost:1337/api/menu-favorits/${req.query.id}`
  );
  const menu_favorit = response.data;
  return {
    props: { menu_favorit }, // will be passed to the page component as props
  };
}
