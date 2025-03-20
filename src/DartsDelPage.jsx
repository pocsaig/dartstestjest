import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

export const DartsDelPage = () => {
    const { DartsId: id } = useParams();
    const navigate = useNavigate();
    const [darts, setDarts] = useState(null);
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        setPending(true);
        axios.get(`https://darts.sulla.hu/darts/${id}`)
            .then(res => setDarts(res.data))
            .catch(error => console.error(error))
            .finally(() => setPending(false));
    }, [id]);

    const handleDelete = async (event) => {
        event.preventDefault();
        try {
            await axios.delete(`https://darts.sulla.hu/darts/${id}`);
            navigate("/");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="p-5 m-auto text-center content bg-lavender">
            {isPending || !darts ? (
                <div className="spinner-border" role="status"></div>
            ) : (
                <div className="card p-3">
                    <div className="card-body">
                        <h5 className="card-title">Törlendő elem: {darts.name}</h5>
                        <div className="lead">Születési éve: {darts.birth_date}</div>
                        <div className="lead">Nyert világbajnokságok: {darts.world_ch_won}</div>
                        <div className="lead">Profil: {darts.profile_url}</div>
                        <img 
                            alt={darts.name}
                            className="img-fluid rounded"
                            style={{ maxHeight: "500px" }}
                            src={darts.image_url || "https://via.placeholder.com/400x800"} 
                        />
                    </div>
                    <form onSubmit={handleDelete}>
                        <div>
                            <NavLink to="/">
                                <button className='btn btn-warning'>
                                    <i className="bi bi-text-paragraph" /> Mégsem
                                </button>
                            </NavLink>
                            &nbsp;&nbsp;
                            <button className='btn btn-danger' type="submit">
                                <i className="bi bi-trash3" /> Törlés
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};