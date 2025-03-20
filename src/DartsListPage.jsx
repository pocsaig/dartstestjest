import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

export const DartsListPage = () => {
  const [darts, setDarts] = useState([]);
  const [isFetchPending, setFetchPending] = useState(false);

  useEffect(() => {
    setFetchPending(true);
    axios.get("https://darts.sulla.hu/darts")
      .then((response) => setDarts(response.data))
      .catch(console.log)
      .finally(() => {
        setFetchPending(false);
      });
  }, []);

  return (
    <div className="p-5 m-auto text-center content bg-ivory">
      {isFetchPending ? (
        <div className="spinner-border" role="status"></div>
      ) : (
        <div>
          <h2>Dartsozók</h2>
          {darts.map((darts, index) => (
            <div className="card col-sm-3 d-inline-block m-1 p-2" key={index} role="group">
              <p className="text-dark">Dartsozó neve: {darts.name}</p>
              <p className="text-danger">Születési éve: {darts.birth_date}</p>
              <p className="text-danger">Nyert világbajnokságai: {darts.world_ch_won}</p>
              <div className="card-body">
                {darts.profile_url.startsWith('http') ? (
                  <a href={darts.profile_url} target="_blank" rel="noopener noreferrer">
                    Profile link
                  </a>
                ) : (
                  <NavLink to={darts.profile_url}>Profile link</NavLink>
                )}
                <br />
                <NavLink to={"/darts/" + darts.id}>
                  <img alt={darts.name} className="img-fluid" style={{ maxHeight: 200 }} src={darts.image_url || "https://via.placeholder.com/400x800"} />
                </NavLink>
                <br />
                <NavLink to={"/darts/" + darts.id}>
                  <button className="btn btn-primary">Részletek</button>
                </NavLink>&nbsp;&nbsp;
                <NavLink to={"/mod-darts/" + darts.id}>
                  <button className="btn btn-warning">Szerkesztés</button>
                </NavLink>&nbsp;&nbsp;
                <NavLink to={"/del-darts/" + darts.id}>
                  <button className="btn btn-danger">Törlés</button>
                </NavLink>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};