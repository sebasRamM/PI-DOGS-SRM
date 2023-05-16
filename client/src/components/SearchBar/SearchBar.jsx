import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getNameDogs } from '../../actions'
import style from "../SearchBar/SearchBar.module.css"


function SearchBar() {
    const dispatch = useDispatch()
    const [ name, setName] = useState("")

    const handlerInputChange = (e) => {
        e.preventDefault()
        setName(e.target.value) //agarro el value del input con este estado
    }

    const handlerSubmit = (e) => {
        e.preventDefault()
        dispatch(getNameDogs(name)) // voy guardando lo que esta escribiendo el usuario en mi estado local para que le llegue a mi accion y busque en el back
    }

    return (
        <div className={style.searchbar}>
            <input className={style.input} type='text' placeholder='Buscar...' onChange={e => handlerInputChange(e)} />
            <button className={style.button_search} type='submit' onClick={e => handlerSubmit(e)}>Buscar</button>
        </div>
    )

}

export default SearchBar
