import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios';

export const DartsSinglePage = () => {
    const { DartsId } = useParams();
    const [darts, setDarts] = useState(null);
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        const fetchDarts = async () => {
            setPending(true);
            try {
                const response = await axios.get(`https://darts.sulla.hu/darts/${DartsId}`);
                setDarts(response.data);
            } catch (error) {
                console.error("Hiba történt az adatok lekérésekor:", error);
            } finally {
                setPending(false);
            }
        };
        fetchDarts();
    }, [DartsId]);

    return (
        <div className="p-5 m-auto text-center content bg-lavender">
            {isPending || !darts ? (
                <div className="spinner-border"></div>
            ) : (
                <div className="card p-3">
                    <div className="card-body">
                        <h5 className="card-title">Dartsozó neve: {darts.name}</h5>
                        <div className="lead">Születési éve: {darts.birth_date}</div>
                        <div className="lead">Nyert világbajnokságai: {darts.world_ch_won}</div>
                        {darts.profile_url.startsWith('http') ? (
                            <a href={darts.profile_url} target="_blank" rel="noopener noreferrer">
                                Profile link
                            </a>
                        ) : (
                            <NavLink to={darts.profile_url}>Profile link</NavLink>
                        )}
                        <br />
                        <NavLink to={`/darts/${darts.id}`}>
                            <img 
                                alt={darts.name} 
                                className="img-fluid" 
                                style={{ maxHeight: 200 }} 
                                src={darts.image_url || "https://via.placeholder.com/400x800"} 
                            />
                        </NavLink>
                        <br />
                        <NavLink to="/"><button className="btn btn-primary"><i className="bi bi-text-paragraph"/></button></NavLink>&nbsp;&nbsp;
                        <NavLink to={`/mod-darts/${darts.id}`}><button className='btn btn-warning'><i className="bi bi-pencil-square"/></button></NavLink>&nbsp;&nbsp;
                        <NavLink to={`/del-darts/${darts.id}`}><button className='btn btn-danger'><i className="bi bi-trash3"/></button></NavLink>&nbsp;&nbsp;
                    </div>
                </div>
            )}
        </div>
    );
};
