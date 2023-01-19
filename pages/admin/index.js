import Link from "next/link";
import axios from "axios";
import { useRouter } from 'next/router'
import { useState } from "react";

function admin({ menu_favorit }) {
  const router = useRouter()
  async function deletemenu_favorit(id) {
    const res = await axios.delete(
      `http://localhost:1337/api/menu-favorits/${id}`
    );
    alert("DATA BERHASIL DIDELETE");
    router.replace("/admin");
  }
  const [namamenu_favorit, setNama] = useState("");
  function change(e) {
    setNama(e.target.value);
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
       
      </nav>
      <div className="container-fluid">
        <form>
          <div className="row d-flex justify-content-center">
            <div className="mb-3 col-lg-4">  
            </div>
          </div>
          <div className="mb-3 col-lg-4"></div>
          <div className="row col-lg-4"></div>
        </form>
        <table className="table">
          <thead className="table-primary">
            <tr>
              <th scope="col">No</th>
              <th scope="col">Menu Favorit</th>
              <th scope="col">Tindakan</th>
            </tr>
          </thead>
          <tbody>
            {menu_favorit.data.map((datamenu_favorit, index) => {
              // console.log(datacategory)
              return (
                <tr>
                  <th scope="row">{index + 1}</th>
                  <td>{datamenu_favorit.attributes.name}</td>
                  <td>
                    <Link  className="btn btn-primary mt-3 me-3" href={`/admin/edit/${datamenu_favorit.id}`}>Edit</Link>
                    {/* <button
                      type="submit"
                      className="btn btn-outline-warning mt-3 me-3"
                    >
                      Edit
                    </button> */}
                    <button
                      type="submit"
                      className="btn btn-danger mt-3 me-3"
                      onClick={function () {
                        deletemenu_favorit(datamenu_favorit.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export default admin;

export async function getServerSideProps(context) {
  const res = await axios.get("http://localhost:1337/api/menu-favorits");
  const menu_favorit = res.data;
  return {
    props: { menu_favorit }, // will be passed to the page component as props
  };
}
