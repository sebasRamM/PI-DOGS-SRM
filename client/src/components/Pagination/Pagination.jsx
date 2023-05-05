import React from "react";

function Pagination({dogsPerPage, allDogs, pagination}) {
    const pageNumber = [] 

    for (let i =1; i <= Math.ceil(allDogs / dogsPerPage); i++) {
        pageNumber.push(i) // aqui se guarda el resultado de la division entre todos los perros y los perros por pagina
    }

    return (
        <nav>
            <ul className="pagination">
                {   
                    pageNumber && 
                    pageNumber.map( number => (
                        <li className="number">
                            <a onClick={() => pagination(number)}>{number}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}

export default Pagination