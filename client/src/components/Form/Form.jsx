import React from "react"
import { useState, useEffect } from "react"
import { useHistory, Link} from 'react-router-dom'
import { postDog, getTemperaments } from "../../actions/index"
import { useDispatch, useSelector } from 'react-redux'
import style from '../Form/Form.module.css'

function validate(form) {
    let errors = {}
    if(!form.name) {
        errors.name = 'Se requiere un Nombre'
    }
    if(!form.min_height ) {
        errors.min_height = "Se requieren altura Minima"
    } else if (!/\d{1,2}/gi.test(form.min_height)) {
        errors.min_height = "Tiene que ser valor númerico"
    }
    if( !form.max_height) {
        errors.max_height = "Se requieren altura Maxima"
    } else if ((!/\d{1,2}/gi.test(form.max_height))) {
        errors.max_height = "Tiene que ser valor númerico"
    }
    if( !form.min_weight) {
        errors.min_weight = "Se requieren peso Minimo"
    } else if ((!/\d{1,2}/gi.test(form.min_weight))) {
        errors.min_weight = "Tiene que ser valor númerico"
    }
    if(!form.max_weight) {
        errors.max_weight = "Se requieren peso Maximo"
    } else if((!/\d{1,2}/gi.test(form.max_weight))) {
        errors.max_weight = "Tiene que ser valor númerico"
    }
    if(!form.life_span) {
        errors.life_span = "Se requiren años de vida"
    } 
    return errors
}

function Form() {
    const dispatch = useDispatch()
    const history = useHistory()
    const allTemperaments = useSelector(state => state.temperaments)
    const [ errors, setErrors] = useState({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span:  "",
        image: "",
    })

    const [ form, setForm] = useState({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span: "",
        image: "",
        temperaments: []
    })


    const handleChange = (e) => { // cada vez que ejecuto esta funcion le digo al estado form que ademas de lo que tiene, agarre el value del "name" que este modificando y lo guarde
        setForm({
            ...form,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...form,
            [e.target.name] : e.target.value
        }))
    }


    const handleSelect = (e) => {
        setForm({
            ...form,
            temperaments: [...form.temperaments, e.target.value] // traigo lo que ya tenia y concatenar el value, osea ir agragando en un arreglo todo lo que vaya seleccionando
        })
    }

    const handleDelete = (e) => {
        setForm({
            ...form,
            temperaments: form.temperaments.filter(t => t !== e) // me trae el estado nuevo sin el temperament que  clickee 
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!form.name || !form.max_height || !form.min_height || !form.max_weight || !form.min_weight ||!form.life_span) {
            alert('Faltan campos por completar')
            } else {
            dispatch(postDog(form))
            alert('Tu amigo perruno se ha creado')
            setForm({
                name: "",
                min_height: "",
                max_height: "",
                min_weight: "",
                max_weight: "",
                life_span: "",
                image: "",
                temperaments: []
        })
            history.push('/home')
        }
        
    }

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    return (
        <div className={style.main_container}>
            <div className={style.container}>
                <Link to='/home'>
                    <button className={style.button_back}>Volver a la Perrera</button>
                </Link>
                <h1>Crea tu amigo Perruno</h1>
                <form className={style.container_form} onSubmit={e => handleSubmit(e)}>
                    <div className={style.name}>
                        <label>Nombre</label>
                        <input className={style.input_name} type="text" value={form.name} name="name" onChange={e => handleChange(e)}/>
                        <div className={style.error_form}>
                            {errors.name && (
                                <p>{errors.name}</p>
                            )}
                        </div>
                    </div>
                    <div className={style.height}>
                        <div className={style.min_height}>
                            <label>Min Height</label>
                            <input type="text" value={form.min_height} name="min_height" onChange={e => handleChange(e)}/>
                            <div className={style.error_form}>
                                {errors.min_height && (
                                    <p>{errors.min_height}</p>
                                )}
                            </div>
                        </div>
                        <div className={style.max_height}>
                            <label>Max Height</label>
                            <input type="text" value={form.max_height} name="max_height" onChange={e => handleChange(e)}/>
                            <div className={style.error_form}>
                                {errors.max_height && (
                                    <p>{errors.max_height}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className={style.weight}>
                        <div className={style.min_weight}>
                            <label>Min Weight</label>
                            <input type="text" value={form.min_weight} name="min_weight" onChange={e => handleChange(e)}/>
                            <div className={style.error_form}>
                                {errors.min_weight && (
                                    <p>{errors.min_weight}</p>
                                )}
                            </div>
                        </div>
                        <div className={style.max_weight}>
                            <label>Max Weight</label>
                            <input type="text" value={form.max_weight} name="max_weight" onChange={e => handleChange(e)}/>
                            <div className={style.error_form}>
                                {errors.max_weight && (
                                    <p>{errors.max_weight}</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <label>Años de vida</label>
                        <input type="text" value={form.life_span} name="life_span" onChange={e => handleChange(e)}/>
                        <div className={style.error_form}>
                            {errors.life_span && (
                                <p>{errors.life_span}</p>
                            )}
                        </div>
                    </div>
                    <div>
                        <label>Imagen</label>
                        <input type="text" value={form.image}  name="image" onChange={e => handleChange(e)}/>
                    </div>
                    <div>
                        <h3>Selecciona Temperamentos</h3>
                    </div>
                    <select className={style.select_temperaments} onChange={e => handleSelect(e)}>
                        <option disabled selected>Temperamentos</option>
                        {
                            allTemperaments.map(e => (
                                <option className={style.option_temperament} value={e.name} key={e.name} >{e.name}</option>
                            ))
                        }
                    </select>
                    {/* <ul>
                        <li>
                            {
                                form.temperaments.map(el => el + " ,")
                            }
                        </li>
                    </ul> */}
                    <div className={style.container_button}>
                        <button className={style.button_add} type="submit">Crear tu amigo Perruno</button>
                    </div>
                </form>
                <div className={style.delete_temperaments}>
                    {
                        form.temperaments.map(e => 
                            <div className={style.element_temperament}>
                                <p>{e}</p>
                                <button onClick={() => handleDelete(e)}>X</button>
                            </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default Form