import React from "react";
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { dogDetails } from '../../actions/index'
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import style from "../Details/Details.module.css"

function Detail() {
    const dispatch = useDispatch();
    let { id } = useParams();

    useEffect(() => {
        dispatch(dogDetails(id));
    }, [dispatch, id]);

    const details = useSelector(state => state.details)

    let nameDog, imageDog, temperamentDog = [], heightDog, weightDog, lifeSpanDog, idDog;

    if (details[0]) {
        idDog = details[0].id
        nameDog = details[0].name;
        imageDog = details[0].image;
        heightDog = details[0].height;
        weightDog = details[0].weight;
        lifeSpanDog = details[0].life_span;

        if (details[0].temperaments[0]) { 
            temperamentDog = [...details[0].temperaments]
        }

        if (details[0].temperaments[0].name) {
            temperamentDog = details[0].temperaments.map(temp => temp.name)
        }
    };

    

    return(
        <div className={style.container}>
            <Link to="/home">
                <button className={style.button_back}>Vuelve a la Perrera</button>
            </Link>
            <div className={style.container_dos}>
                <div className={style.container_cards}>
                    <div className={style.img} >
                        <img src={imageDog} alt={`imagen de ${nameDog}`}/>
                    </div>
                    <div className={style.container_card}>
                        <h2>ID: #{idDog}</h2>
                        <h1>{nameDog}</h1>
                        <h3>{`Altura: ${heightDog && heightDog[0]} - ${heightDog && heightDog[1]} CM`}</h3>
                        <h3>{`Peso: ${heightDog &&  weightDog[0]} - ${weightDog && weightDog[1]} KG`}</h3>
                        <h3>{`Lifespan: ${lifeSpanDog}`}</h3>
                        <div>
                            <h3>Temperaments</h3>
                            <ul className={style.temperaments}>
                                {temperamentDog.map(t => <li key={t}>{t}</li>)}
                            </ul>
                        </div>
                    </div>   
                </div>
            </div>
        </div>
    )
}

export default Detail