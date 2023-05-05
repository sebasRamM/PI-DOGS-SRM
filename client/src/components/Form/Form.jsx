import React from "react"
import { useState, useEffect } from "react"
import { useHistory, Link} from 'react-router-dom'
import { postDog, getTemperaments } from "../../actions/index"
import { useDispatch, useSelector } from 'react-redux'

function validate(form) {
    let errors = {}
    if(!form.name) {
        errors.name = 'Se requiere un Nombre'
    }
    if(!form.min_height || !form.max_height) {
        errors.height = "Se requieren alturas Minima y Máxima"
    }
    if(!form.min_weight || !form.max_weight) {
        errors.weight = "Se requieren pesos Minimos y Máximos"
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
    const [ errors, setErrors] = useState({})

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

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])

    return (
        <div>
            <Link to='/home'>
                <button>Volver a la Perrera</button>
            </Link>
            <h1>Crea tu amigo Perruno</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <div>
                    <label>Nombre</label>
                    <input type="text" value={form.name} name="name" onChange={e => handleChange(e)}/>
                    {errors.name && (
                        <p>{errors.name}</p>
                    )}
                </div>
                <div>
                    <label>Min Height</label>
                    <input type="text" value={form.min_height} name="min_height" onChange={e => handleChange(e)}/>
                </div>
                <div>
                    <label>Max Height</label>
                    <input type="text" value={form.max_height} name="max_height" onChange={e => handleChange(e)}/>
                    {errors.height && (
                        <p>{errors.height}</p>
                    )}
                </div>
                <div>
                    <label>Min Weight</label>
                    <input type="text" value={form.min_weight} name="min_weight" onChange={e => handleChange(e)}/>
                </div>
                <div>
                    <label>Max Weight</label>
                    <input type="text" value={form.max_weight} name="max_weight" onChange={e => handleChange(e)}/>
                    {errors.weight && (
                        <p>{errors.weight}</p>
                    )}
                </div>
                <div>
                    <label>Años de vida</label>
                    <input type="text" value={form.life_span} name="life_span" onChange={e => handleChange(e)}/>
                    {errors.life_span && (
                        <p>{errors.life_span}</p>
                    )}
                </div>
                <div>
                    <label>Imagen</label>
                    <input type="text" value={form.image}  name="image" onChange={e => handleChange(e)}/>
                </div>
                <div>
                    <h3>Selecciona Temperamentos</h3>
                </div>
                <select onChange={e => handleSelect(e)}>
                    <option disabled selected>Temperamentos</option>
                    {
                        allTemperaments.map(e => (
                            <option value={e.name} key={e.name} >{e.name}</option>
                        ))
                    }
                </select>
                <ul>
                    <li>
                        {
                            form.temperaments.map(el => el + " ,")
                        }
                    </li>
                </ul>
                <button type="submit">Crear tu amigo Perruno</button>
            </form>

            {
                form.temperaments.map(e => 
                    <div>
                        <p>{e}</p>
                        <button onClick={() => handleDelete(e)}>X</button>
                    </div>
            )}

        </div>
    )
}

export default Form