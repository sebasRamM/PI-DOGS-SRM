import React from "react";
import style from '../Pagination/Pagination.module.css'

function Pagination({dogsPerPage, allDogs, pagination}) {
    const pageNumber = [] 

    for (let i =1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
        pageNumber.push(i) // aqui se guarda el resultado de la division entre todos los perros y los perros por pagina
    }

    return (
        <nav className={style.container} >
            <ul className={style.ul}>
                {   
                    pageNumber && 
                    pageNumber.map( number => (
                        <li className={style.li}>
                            <button onClick={() => pagination(number)}>{number}</button>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Pagination