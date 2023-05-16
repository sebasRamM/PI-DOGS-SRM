import React from "react";
import {useState, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { getDogs, filteredByTemperament, getTemperaments, orderByName, orderByWeight, filteredCreated } from "../../actions";
import {Link} from 'react-router-dom'
import Card from "../Card/Card";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import Loading from "../Loading/Loading";
import style from '../Home/Home.module.css'

function Home () {

    const dispatch = useDispatch() // para despachar mis acciones
    const allDogs = useSelector(state => state.dogs)  //con useSelector traigo todo lo que esta en el state dogs
    const allTemperaments = useSelector(state => state.temperaments)
 

    const [currentPage, setCurrentPage] = useState(1) // numero de pagina actual
    const dogsPerPage = 8 // cantidad de dogs que quiero por pagina
    const indexOfLastDog = currentPage * dogsPerPage
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog)

    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const [order, setOrder] = useState("")

    const [loading, setLoading] = useState(false)

     useEffect(() => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false)
        }, 3000)
         dispatch(getDogs())
         dispatch(getTemperaments())
     },[dispatch])

     useEffect(() => {
        setCurrentPage(1)
     }, [allDogs.length])

     const handleClick = (e) => {
         e.preventDefault()
         dispatch(getDogs())
         setCurrentPage(1)
     }

     const handleFilterTemperaments = (e) => {
        e.preventDefault()
        dispatch(filteredByTemperament(e.target.value))
        setCurrentPage(1)
     }

     const handleOrderByName = (e) => {
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`)
      };
    
      const handleOrderByWeight = (e) => {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setCurrentPage(1)
        setOrder(`Ordenado ${e.target.value}`);
      };

      const handleCreated = (e) => {
        e.preventDefault()
        dispatch(filteredCreated(e.target.value))
        setCurrentPage(1)
      }

    return (
        <>
            <header className={style.header}>
                <div className={style.header_container}>
                    <Link to='/'>
                    <div className={style.logo_title}>DOG-GO</div>
                    </Link>
                    <div className={style.header_left} >
                        <SearchBar/>  
                    </div>
                    <div className={style.container_filters}>
                        <select onChange={handleOrderByName}>
                            <option value='asc'>A-Z</option>
                            <option value='desc'>Z-A</option>
                        </select>
                        <select onChange={handleOrderByWeight}>
                            <option disabled selected defaultValue>Filtrar por Peso</option>
                            <option value='max-weight'>Max</option>
                            <option value='min-weight'>Min</option>
                        </select>
                        <select onChange={e => handleCreated(e)}>
                            <option value='Todos'>Todos</option>
                            <option value='created'>Creados</option>
                            <option value='api'>Api</option>
                        </select>
                        <select onChange={handleFilterTemperaments}>
                            <option disabled selected defaultValue>Temperamentos</option>
                            <option value="Todos">Todos</option>
                            {
                                allTemperaments.map(tempe => (
                                    <option value={tempe.name} key={tempe.id}>{tempe.name}</option>
                                ))
                            } 
                        </select>
                    </div>    
                </div>
            </header>
                <div className={style.cargar}>
                        <button className={style.button_cargar} onClick={e => {handleClick(e)}}>
                            Volver a cargar Dogs
                        </button>    
                </div>
                <div className={style.crear}>
                    <Link to='/dog'>
                        <button className={style.button_crear}>CREAR PERRO</button>
                    </Link>
                </div>
                <div className={style.container}>
                    <div className={style.cards_container}>
                        {
                            loading ? (
                                <Loading/>
                            ) :
                            currentDogs?.map( el => {
                                return(
                                    <div className={style.card_container}>
                                        <Link to={'/dogDetail/' + el.id}>
                                            {
                                                <Card key={el.id} name={el.name} image={el.image} 
                                                temperaments={el.temperaments[0].name ? el.temperaments.map((el) => el.name) 
                                                : el.temperaments} weight={el.weight} height={el.height}/> 
                                            }                           
                                        </Link>                               
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className={style.pagination}>
                        <Pagination dogsPerPage={dogsPerPage} allDogs={allDogs.length} pagination={pagination} />
                    </div>
                </div>
        </>

  )
 }

export default Home;
