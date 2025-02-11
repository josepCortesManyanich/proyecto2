require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/producModel');

// Add the model and array you want to seed
const products = [
  {name: "Amnesia OIL", family: "sativa", price: 4.95, cbd:  18 , image:"/images/cbdnewoil.jpg", description: "Balanced and invigorating effect moves away from the potency of the illegal THC-type variety, and its high levels of cannabidiol guarantee a much more controlled experience." },
  {name: "Pistacho OIL", family: "sativa", price: 4.95, cbd: 20 , image:"/images/cbdnewoil2.jpg", description: "This flower has a lot of cbd percentage, this means that his physical effects are extremly hard. We recomend his use for the people who wants to calm physical issues"},
  {name: "Critical OIL", family: "sativa/indica", price: 5.85, cbd: 16 , image: "/images/cbdnewoil3.jpg", description: "It can be described calming and superbly balanced. It smells like  cherries, citrus with a sweet earthy mix. Some people may find Critical CBD Legal Marijuana Buds helpful in helping to reduce stomachache"},
  {name: "Jack Herer OIL", family: "sativa", price: 13.95, cbd:  14 , image:"/images/cbdnewoil4.jpg", description: "It is extracted from plants with so much resin that even the branches shine like crystals. These are buds loaded with crystals and resin, with an exquisite smell. An excellent variety."},
  {name: "Sweet Berry OIL", family: "indica", price: 5.95, cbd:  19 , image:"/images/cbdnewoil5.jpg", description: "The smell is sweet, delicate, smooth, almost velvety."},
  {name: "White Widow OIL", family: "sativa", price: 7.95, cbd: 18 , image:"/images/cbdnewoil6.jpg", description: "The similarity with our Gorilla Glue is often noted, with which it shares many flavor and olfactory characteristics. Its notes are woody, earthy, Scots pine with the softness of the aromas of exotic fruits."},
  {name: "AK47 OIL", family: "sativa", price: 3.95, cbd: 13 , image:"/images/cbdnewoil7.jpg", description: "When we bring it to our nose, we can feel sharp notes of pine and forest that mix with the calming tones of wood and fresh grass."},
  {name: "Orange OIL", family: "sativa", price: 14.95, cbd: 20 , image:"/images/cbdnewoil8.jpg", description: "This pungent citrus smells mellows in the aftertaste with a sweet and fruity aroma, with slight but unmistakable hints of clove and cinnamon."},
  {name: "Skizza OIL", family: "indica", price: 6.95, cbd:17 , image:"/images/cbdnewoil9.jpg", description: "it occurs mainly with light shades (more precisely green or green with yellow tones).Furthermore, the whole appears to be covered in trichomes that are also light in color (with a strong silver hue)."},
  {name: "JB OIL", family:"oil", price: 14.99, cbd:25, image:"/images/Oil1.jpg", description:"Given its slight CBD concentracion, it is an oil that is characterized by its lightness and is perfect if you want to give your days a touch of relaxation."},
  {name: "SativaCG OIL", family:"oil", price: 10.99, cbd:12, image:"/images/Oil2.jpg", description:"All processing phases are carefully controlled to ensure quality. To maximize the properties of CBG 5% oil, all ingredients in this product must be natural and minimally processed."},
  {name: "Sativa OIL", family:"oil", price: 17.99, cbd:5, image:"/images/Oil3.jpg", description:"It is characterized by the careful search and selection of the best ingredients, so that their properties do not change during the treatment phase. This allows to be able to guarantee the safety and efficacy of its CBD oils, always achieving high quality products."},
  {name: "Chinata OIL", family:"oil", price: 25.99, cbd:28, image:"/images/Oil4.jpg", description:"It is known for its anti-inflammatory effect, which makes it ideal for sensitive or irritated skin, helping to soothe the area"},
  {name: "Nature OIL", family:"oil", price: 47.99, cbd:36, image:"/images/Oil5.jpg", description:"t is an oil with a higher concentration than many other CBD oils, 36% of this relaxing cannabidiol from cannabis. It has no psycho-active effects, therefore, you will not notice any disabling or stimulating effects."}
  
]



mongoose.connect("mongodb+srv://Ali:Brrr123@ali.vfez7eh.mongodb.net/AliJosep")
  .then(x => console.log(`Connected to ${x.connection.name}`))
  .then(() => {
    return Product.create(products)
  })
  .then(() => {
    console.log('Seed done 🌱');
  })
  .catch(e => console.log(e))
  .finally(() => {
    console.log('Closing connection');
    mongoose.connection.close();
  })