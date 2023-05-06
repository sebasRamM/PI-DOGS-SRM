import React from "react";
import style from '../Card/Card.module.css'


function Card({image, name, temperaments, height, weight}) {

    return (
        <div className={style.container}>
            <div className={style.container_img}>
                <img className={style.img} src={image} alt="img not found" />
            </div>
            <h3>Raza: {name}</h3>
                <h3>Temperamentos</h3>
            <div className={style.details}>
            {
                 temperaments.map(temps => <h4 key={temps}>{temps}</h4>)
            }
            </div>
                <h3>Peso</h3>
            <div className={style.details_hyw}>
            <h4>{`Peso: ${weight && weight[0]} - ${weight && weight[1]} KG`}</h4>

            </div>
        </div>
    )
}


export default Card;

