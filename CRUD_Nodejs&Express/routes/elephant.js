const express = require('express')
const router = express.Router()
const fs = require('fs');
const path = require('path');

const elephantModel = require('../models/elephant')

const fetch = require('node-fetch');

//Read json from url 

let url = "https://elephant-api.herokuapp.com/elephants"

fetch(url)
.then(res => res.json())
.then((out) => {

  fs.writeFileSync(path.resolve('./','elephant.json'),JSON.stringify(out))
})
.catch(err => { throw err })


router.get('/',async(req,res) =>{

  const fs = require('fs')

  let rawdata = fs.readFileSync('./elephant.json')
  let elephants = JSON.parse(rawdata)
  res.send(elephants)
  try{
    const getData = await elephantModel.find()
    res.json(getData)
    console.log(getData)
  }catch(err){
    res.send("ERROR" + err)
    console.log(getData)
  }
})

router.post('/',async(req,res) =>{
  const elephants = new elephantModel({
    id: req.body.id,
    name : req.body.name,
    species: req.body.species,
    sex : req.body.sex,
    image : req.body.image,
    wikilink : req.body.wikilink
  })
  try{
    const postData = await elephants.save()
    res.json(postData)
    console.log(postData)
  }catch(err){
    res.send("ERROR" + err )
    console.log(postData)
  }
})

router.patch('/:id', async(req,res) =>{
  try{
    const patchData = await elephantModel.updateOne(
      {_id : req.params.id},
      {$set: {name: req.body.name}}
      
      )

    res.json(patchData)
    console.log(patchData)
  }catch(err){
    res.send('ERROR')
    console.log(patchData)
  }
})


router.delete('/:id', async(req,res)=>{
  try{
    const removeData = await elephantModel.remove({_id : req.params.id})
    res.json(removeData)
    console.log(removeData)
  }catch(err){
    res.send('ERROR'+ err)
    console.log(removeData)
  }
})

module.exports = router