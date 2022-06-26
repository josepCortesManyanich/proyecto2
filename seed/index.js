require('dotenv').config();
const mongoose = require('mongoose');

// Add the model and array you want to seed
const products = [
  {name: "AmnesiaCBD", class: "sativa", price = 4.95€/g, cbd = 18% , image:"../images/Flower1.jpg", description: "Balanced and invigorating effect moves away from the potency of the illegal THC-type variety, and its high levels of cannabidiol guarantee a much more controlled experience." },
  {name: "PistachoCBD", class: "sativa", price = 4.95€/g, cbd = 20% , image:"../images/Flower2.jpg", description: "This flower has a lot of cbd percentage, this means that his physical effects are extremly hard. We recomend his use for the people who wants to calm physical issues"},
  {name: "CriticalCBD", class: "sativa/indica", price = 5.85€/g, cbd = 16% , image:"../images/Flower3.jpg" , description: "It can be described calming and superbly balanced. It smells like  cherries, citrus with a sweet earthy mix. Some people may find Critical CBD Legal Marijuana Buds helpful in helping to reduce stomachache"},
  {name: "AmnesiaCBD", class: "sativa", price = 4,95€/g, cbd = 18% , image:"../images/Flower3.jpg", description: "Balanced and invigorating effect moves away from the potency of the illegal THC-type variety, and its high levels of cannabidiol guarantee a much more controlled experience."}
  {name: "AmnesiaCBD", class: "sativa", price = 4,95€/g, cbd = 18% , image:"../images/Flower4.jpg", description: "Balanced and invigorating effect moves away from the potency of the illegal THC-type variety, and its high levels of cannabidiol guarantee a much more controlled experience."}
  {name: "AmnesiaCBD", class: "sativa", price = 4,95€/g, cbd = 18% , image:"../images/Flower5.jpg", description: "Balanced and invigorating effect moves away from the potency of the illegal THC-type variety, and its high levels of cannabidiol guarantee a much more controlled experience."}
  {name: "AmnesiaCBD", class: "sativa", price = 4,95€/g, cbd = 18% , image:"../images/Flower6.jpg", description: "Balanced and invigorating effect moves away from the potency of the illegal THC-type variety, and its high levels of cannabidiol guarantee a much more controlled experience."}
  {name: "AmnesiaCBD", class: "sativa", price = 4,95€/g, cbd = 18% , image:"../images/Flower7.jpg", description: "Balanced and invigorating effect moves away from the potency of the illegal THC-type variety, and its high levels of cannabidiol guarantee a much more controlled experience."}
  {name: "AmnesiaCBD", class: "sativa", price = 4,95€/g, cbd = 18% , image:"../images/Flower8.jpg", description: "Balanced and invigorating effect moves away from the potency of the illegal THC-type variety, and its high levels of cannabidiol guarantee a much more controlled experience."}

]



mongoose.connect(process.env.MONGO_URL)
  .then(x => console.log(`Connected to ${x.connection.name}`))
  .then(() => {
    return // Code to create elements in the DB
  })
  .then(() => {
    console.log('Seed done 🌱');
  })
  .catch(e => console.log(e))
  .finally(() => {
    console.log('Closing connection');
    mongoose.connection.close();
  })