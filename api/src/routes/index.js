const { Router } = require('express');
const axios = require('axios')
const {API_KEY} = process.env
const { Dog, Temperaments} = require('../db')
const express = require('express')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const apiData = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const apiInfo = await apiData.data.map( e => {
        let arrayTemperament = []
        if(e.temperament) {
            arrayTemperament = e.temperament.split(', ')
        }
        let arrayHeight = []
        if(e.height.metric) {
            arrayHeight = e.height.metric.split( ' - ')
        }
        let arrayWeight = []
        if(e.weight.metric) {
            arrayWeight = e.weight.metric.split( ' - ' )
        }
        return {
            id: e.id,
            name: e.name,
            height: arrayHeight,
            weight: arrayWeight,
            temperaments: arrayTemperament,
            life_span: e.life_span,
            image: e.image.url
        }
    })
    return apiInfo
}

const getDbInfo = async () => {
    return await Dog.findAll({
        include: {
            model: Temperaments,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
}

 const getAllDogs = async () => {
    const apiInfo = await getApiInfo()
    const dbInfo = await getDbInfo()
    const allInfo = [...apiInfo, ...dbInfo]
    return allInfo
 }


// Rutas

router.get('/dogs', async (req, res) => {
    const { name } = req.query // Hago destructuring del name directamente en esta ruta 
    const allDogs = await getAllDogs()

    if (name) {
        const dogName = allDogs.filter( e => e.name.toLowerCase().includes(name.toLowerCase())) // Comparo el nombre del perro de la Api y el nombre pasado por query, buscandolo en minuscula para que coincidan
        dogName.length ? res.status(200).send(dogName) : res.status(404).send('Perro no encontrado')
    } else {
        res.status(200).send(allDogs) // si no hay un query mando todos los perros
    }
})

router.get('/dogs/:idRaza', async (req, res) => {
    const { idRaza } = req.params
    const allDogs = await getAllDogs()
    const dog = allDogs.filter( e => e.id == idRaza)
    if (dog.length) {
        res.status(200).json(dog)
    } else {
        res.status(404).send('El perro no se encontró')
    }
})

router.get('/temperament', async (req, res) => {
    const apiTemperament = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
    const allTemperaments = apiTemperament.data.map( t => t.temperament)
    const temperaments = allTemperaments.toString().split(',')
    temperaments.forEach( e => {
        let x = e.trim() // Quita los elementos que estan vacios 
        Temperaments.findOrCreate({
            where: { name: x }
        })
    })
    const temps = await Temperaments.findAll()
    res.send(temps)
})

router.post('/dog', async (req, res) => {
    let {name, min_height, max_height, min_weight, max_weight, life_span, temperaments, image, created} = req.body

    const heightArray = []
    const minHeight = min_height
    const maxHeight = max_height
    heightArray.push(minHeight, maxHeight)
 
    const weightArray = []
    const minWeight = min_weight
    const maxWeight = max_weight
    weightArray.push(minWeight, maxWeight)

    let dog = await Dog.create({
        name,
        height: heightArray,
        weight: weightArray,
        life_span: life_span,
        image: image ? image 
        : 'https://t0.gstatic.com/licensed-image?q=tbn:ANd9GcQkrjYxSfSHeCEA7hkPy8e2JphDsfFHZVKqx-3t37E4XKr-AT7DML8IwtwY0TnZsUcQ',
        created
    })

    let temps = await Temperaments.findAll({
        where: {
            name: temperaments
        }
    })

    dog.addTemperament(temps) // add es un metodo de sequelize que me trae la info de DB de la tabla que quiero

    res.status(200).send('Perro creado exitosamente')
})

router.use(express.json())

module.exports = router;
