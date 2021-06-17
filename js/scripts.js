//data
let pokemonList = [
  {
    name: 'Charmandoer',
    height: 0.6,
    types: [
      'fire',
      'speed'
    ]
  },
  {
    name: 'Pidgey',
    height: 0.3,
    types: [
      'flying',
      'normal'
    ]
  },
  {
    name: 'Nidoking',
    height: 1.4,
    types: [
      'ground',
      'poison'
    ]
  },
  {
    name: 'Weepinbell',
    height: 1,
    types: [
      'grass',
      'poison'
    ]
  },
];


//define variables in the global scope 

/*
  reduce adds the current height(curr.height)
  to the accelorator (acc)
*/

//add all height values
let totalHeight = pokemonList.reduce((acc, curr)=> curr.height + acc, 0); //3.3
//get number of object inside the array
let itemCount = pokemonList.length; //4 

//calculate the average height 
let averageHeight = totalHeight/itemCount; //0.825

//set a range of .2 ABOVE the average height
let positiveRange = .2 + averageHeight //1.025

//set a range of .2 BELOW the average height
let negitiveRange = averageHeight - .2  //0.625

pokemonList.forEach(element => {
  if(element.height < negitiveRange){
    document.write(`${element.name} is below the set average height. <br>`)
  }else if(element.height > positiveRange){
    document.write(`${element.name} is well above the set average height. <br>`)
  }else{
    document.write(`${element.name} is closest to the set average height. <br>`)
  }
});