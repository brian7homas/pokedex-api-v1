let pokemonRepository = (function(){
  let pokemonList = [
    {
      name: '',
      url: ''
    }
  ];
  
//add all height values
let totalHeight = pokemonList.reduce((acc, curr)=> curr.height + acc, 0); 
//get number of object inside the array
let itemCount = pokemonList.length; 

//calculate the average height 
let averageHeight = totalHeight/itemCount; //?

//removed this
let positiveRange = .2 + averageHeight;
let negitiveRange = averageHeight - .2;

  function load(){
    return fetch('https://pokeapi.co/api/v2/pokemon/').then(function(res){
      return res.json();
    }).then(function (json){
      json.results.forEach(function (item){
        let pokemon = {
          name: item.name,
          url: item.url
        }
        add(pokemon)
        loadDetails(pokemon.url)
      })
    })
  }
  function loadDetails(pokemon){
    return pokemon.url;
  }
  function getAll(){
    return pokemonList;
  }
  function add(item){
    // Check for object type and if the object is empty
    if(typeof(item) == 'object' && item != undefined){
      let itemKeys = Object.keys(item)
      let listKeys = Object.keys(pokemonList[0])
      let addToList = true;
      itemKeys.forEach((key, i) => {
        if(key != listKeys[i]){
          addToList = false;
          document.write(`'keys need to match [${listKeys}] <br>`);
          throw new Error(`'keys need to match [${listKeys}] <br>`)
        }
      });
      if(addToList){
        pokemonList.push(item);
        addListItem(item)
      }
      
    //! if the item is an empty object or not an object at all
    }else if(item == undefined ){
      document.write('Make sure your passing an object and that it is not empty <br>')
      document.write('Also make sure your passing [name: string, height: int, type: object]')
      throw new Error('This add function only takes objects.<br>')
    }
  }
  function filterByName(name){
    // store the filtered array in filtered variable
    let filtered = pokemonList.filter(pokemon => {
      if(pokemon.name == name){
        return true;
      }
    })
    // if there is a match, the filtered array will store it in the 1st position
    if(filtered[0]){
      //select node to be used
      let filteredListItem = document.createElement('li');
      let button = document.createElement('button');
      let pokemonListNode = document.querySelector('.pokemon-list');
      let filteredList = document.createElement('ul');
      
      // insert new list item alongside the pokemonListNode
      pokemonListNode.insertAdjacentElement('afterend', filteredList)
      
      // add classes
      filteredList.classList.add('filtered-list')
      filteredListItem.classList.add('filtered-item')
      button.classList.add('btn--filtered')
      
      // append
      filteredListItem.append(button)
      filteredList.append(filteredListItem)
      
      //insert text
      button.innerText = `You Selected ${filtered[0].name}`;
      
      //add event
      events(button, filtered[0])
    }else{
      document.write(`Sorry there is no pokemon by that name in my list. <br>` )
    }
  }
  function addListItem(pokemon){  
    //select/create nodes to be used
    let pokemonListNode = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = `${pokemon.name} is a new pokemon`;
    // if(pokemon.height < pokemonRepository.positiveRange){
    //   button.innerText = `${pokemon.name} is below the set average height.`;
    // }else if(pokemon.height > pokemonRepository.positiveRange){
    //   button.innerText = `${pokemon.name} is well above the set average height.`;
    // }else{
    //   button.innerText = `${pokemon.name} is closest to the set average height.`;
    // }
    button.classList.add('btn')
    listItem.append(button)
    pokemonListNode.append(listItem)
    // call the events function
    events(button, pokemon);
  }
  function showDetails(pokemon){
    console.log(pokemon)
  }
  function events(button, pokemon){
    button.addEventListener("click", ()=>{
      return showDetails(pokemon);
    })
  }
  return{
    add: add,
    getAll: getAll,
    filterByName: filterByName,
    addListItem: addListItem,
    load:load,
    positiveRange: positiveRange,
    negitiveRange: negitiveRange
  }
})();
pokemonRepository.add({name:'', url:''})
pokemonRepository.load()
//add new pokemon



//? SORT THROUGH ARRAY BASED ON HEIGHT
// pokemonList is removed from global context
// pokemonRepository.getAll() is how it can be accessed
// pokemonRepository.getAll().forEach(element => {
//   console.log(element)
//   pokemonRepository.addListItem(element)
// });

//filter pokemon from the pokemon list
// pokemonRepository.filterByName('bulbasaur')

//display the entire list of pokemon
// console.log(pokemonRepository.getAll());