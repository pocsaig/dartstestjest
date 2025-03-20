import { useNavigate } from "react-router-dom";
import axios from "axios";

export const DartsCreatePage = () => {
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        const formData = {
            name: event.target.elements.name.value,
            birth_date: event.target.elements.birth_date.value,
            world_ch_won: event.target.elements.world_ch_won.value,
            profile_url: event.target.elements.profile_url.value,
            image_url: event.target.elements.image_url.value,
        };

        try {
            await axios.post("https://darts.sulla.hu/darts", formData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            navigate("/");
        } catch (error) {
            console.error("Error creating dart player:", error);
        }
    };

    return (
        <div className="p-5 content bg-whitesmoke text-center">
            <h2>Új Dartsozó</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Dartsozó neve:</label>
                    <div className="col-sm-9">
                        <input type="text" name="name" className="form-control" required />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Születési éve:</label>
                    <div className="col-sm-9">
                        <input type="number" name="birth_date" className="form-control" required />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Nyert világbajnokságai:</label>
                    <div className="col-sm-9">
                        <input type="number" name="world_ch_won" className="form-control" required />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Profil URL-je:</label>
                    <div className="col-sm-9">
                        <input type="text" name="profile_url" className="form-control" required />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Kép URL-je:</label>
                    <div className="col-sm-9">
                        <input type="text" name="image_url" className="form-control" required />
                    </div>
                </div>
                <button type="submit" className="btn btn-success">
                    Küldés
                </button>
            </form>
        </div>
    );
};
