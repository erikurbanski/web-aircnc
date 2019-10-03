import React, { useState, useMemo } from "react";

import API from "../../services/api";
import IMG from "../../assets/camera.svg";

import "./styles.css";

export default function New({ history }) {
  const [company, setCompany] = useState("");
  const [techs, setTechs] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    const user_id = localStorage.getItem("@user:aircnc");

    data.append("techs", techs);
    data.append("price", price);
    data.append("company", company);
    data.append("thumbnail", thumbnail);

    await API.post("/spots", data, {
      headers: { user_id }
    });

    history.push("/dashboard");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label
        id="thumbnail"
        style={{ backgroundImage: `url(${preview})` }}
        className={thumbnail ? "has-thumbnail" : ""}
      >
        <input type="file" onChange={e => setThumbnail(e.target.files[0])} />
        <img src={IMG} alt="Selecionar uma imagem..." />
      </label>

      <label htmlFor="company">EMPRESA *</label>
      <input
        id="company"
        name="company"
        placeholder="Sua empresa..."
        value={company}
        onChange={e => setCompany(e.target.value)}
        type="text"
      />

      <label htmlFor="company">
        TECNOLOGIAS * <span>(separadas por vírgula)</span>
      </label>

      <input
        id="techs"
        name="techs"
        placeholder="Quais tecnologias usam?"
        value={techs}
        onChange={e => setTechs(e.target.value)}
        type="text"
      />

      <label htmlFor="company">
        VALOR DA DIÁRIA * <span>(em branco para GRATUITO)</span>
      </label>

      <input
        id="price"
        name="price"
        placeholder="Valor cobrando por dia"
        value={price}
        onChange={e => setPrice(e.target.value)}
        type="text"
      />

      <button type="submit" className="btn">
        Cadastrar
      </button>
    </form>
  );
}
