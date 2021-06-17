let pokemonRepository = (function(){
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
  
//add all height values
let totalHeight = pokemonList.reduce((acc, curr)=> curr.height + acc, 0); //3.3
//get number of object inside the array
let itemCount = pokemonList.length; //4 

//calculate the average height 
let averageHeight = totalHeight/itemCount; //0.825

// variable using this to be accessible in global context
this.positiveRange = .2 + averageHeight; //1.025
this.negitiveRange = averageHeight - .2;  //0.625


  function getAll(){
    return pokemonList;
  }
  function add(item){
    return pokemonList.push(item)
  }
  return{
    add: add,
    getAll: getAll
  }
})();

console.log(pokemonRepository.add({name: 'Takka', height: 1.82}));
console.log(pokemonRepository.getAll());

// pokemonList is removed from global context
// pokemonRepository.getAll() is how it can be accessed
pokemonRepository.getAll().forEach(element => {
  if(element.height < negitiveRange){
    document.write(`${element.name} is below the set average height. <br>`)
  }else if(element.height > positiveRange){
    document.write(`${element.name} is well above the set average height. <br>`)
  }else{
    document.write(`${element.name} is closest to the set average height. <br>`)
  }
});