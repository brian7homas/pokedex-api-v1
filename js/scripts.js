
let pokemonRepository = (function(){
  let pokemonList = [
    {
      name: '',
      url: ''
    }
  ];
  
  // THESE ARE NOT BEING USED JUST YET
  // let totalHeight = pokemonList.reduce((acc, curr)=> curr.height + acc, 0); 
  // //get number of object inside the array
  // let itemCount = pokemonList.length; 
  // //calculate the average height 
  // let averageHeight = totalHeight/itemCount;
  // //removed this
  // let positiveRange = 2 + averageHeight;
  // let negitiveRange = averageHeight - 2;
  
  
  const URL = 'https://pokeapi.co/api/v2/pokemon/';
  //1
  function load(){
    showLoadingMessage('.pokemon-list')
    fetch(URL).then(function(res){
      hideLoadingMessage()
      return res.json();
    })
    .then(function (json){  
      json.results.forEach(function (item){
        
        let pokemon = {
          name: item.name,
          url: item.url
        }
        add(pokemon);  
      })
    })
    .catch(function(error){
        hideLoadingMessage()
        console.log(error)
    })
  }
  function loadDetails(pokemon){
    showLoadingMessage('.filtered-list')
    fetch(pokemon).then(function(res){
      hideLoadingMessage('.filtered-list')
      return res.json();
    })
    .then(function (json){  
      let details = {
        height: json.height,
        imgUrl: json.sprites.front_default
      }
      console.log(details)
      addListItem('', details)
      getAll()
      // extractDetails(details)
    })
    .catch(function(error){
      hideLoadingMessage()
      console.log(error)
    })
  }
  function getAll(){
    return pokemonList;
  }
  //2
  function add(item){
    // Check for object type and if the object is empty
    if(typeof(item) == 'object' && item != undefined){
      let itemKeys = Object.keys(item)
      // add pattern for name and url keys here
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
        addListItem(item, '');
        return pokemonList;
      }  
      //! if the item is an empty object or not an object at all
    }else if(item == undefined ){
      document.write('Make sure your passing an object and that it is not empty <br>')
      document.write('Also make sure your passing [name: string, height: int, type: object]')
      throw new Error('This add function only takes objects.<br>')
    }
  }
  function buildSelectedField(filteredName){
    let filteredListItem = document.createElement('li');
    let button = document.createElement('button');
    let pokemonListNode = document.querySelector('.pokemon-list');
    let filteredList = document.createElement('ul');
    pokemonListNode.insertAdjacentElement('afterend', filteredList)
    filteredList.classList.add('filtered-list')
    filteredListItem.classList.add('filtered-item')
    button.classList.add('btn--filtered')
    filteredListItem.append(button)
    filteredList.append(filteredListItem)
    button.innerText = `You Selected ${filteredName}`;
  }
  function filterByName(name){
    buildSelectedField()
    showLoadingMessage('.filtered-list')
    setTimeout(()=>{
      // store the filtered array in filtered variable
      let filtered = pokemonList.filter(pokemon => {
      if(pokemon.name == name){
        return true;
      }
    })
    // if there is a match, the filtered array will store it in the 1st position
    if(filtered[0]){
      buildSelectedField()
      let button = document.querySelector('.btn--filtered');
      filterLoadingMessage();
      
      buildSelectedField(filtered[0].name)
      //insert text
      
      //add event
      events(button, filtered[0])
    }else{
      document.write(`Sorry there is no pokemon by that name in my list. <br>` )
    }
    }, 2200)
    
  
  }
  function showLoadingMessage(selector){
    let loader = `<div class="loading">Loading</div>`;
    return document.querySelector(!selector ? 'body' : selector).innerHTML = loader;
  }
  function hideLoadingMessage(selector){
    document.querySelector(!selector ? '.loading' : selector).innerHTML = '';
  }
  function filterLoadingMessage(){
    let filterLoading = document.querySelector('.filtered-list > .loading');
    filterLoading.remove();
  }
  // THIS FUNCTION ADDS BUTTONS WHEN CLICKING ON POKEMON
  // POKEMON OBJECT COMES FROM LOAD() AND DETAILS COMES FROM LOADDETAILS()
  //3
  function addListItem(pokemon = null, details = null){
    let totalHeight = pokemonList.reduce((acc, curr)=> curr.height + acc, 0); 
    //get number of object inside the array
    let itemCount = pokemonList.length; 
    //calculate the average height 
    let averageHeight = totalHeight/itemCount;
    //removed this
    let positiveRange = 2 + averageHeight;
    let negitiveRange = averageHeight - 2;
    
    //select/create nodes to be used
    let pokemonListNode = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    
    
    if(details.height < negitiveRange){
      button.innerText = `${pokemon.name} is below the set average height.`;
    }else if(details.height > positiveRange){
      button.innerText = `${pokemon.name} is well above the set average height.`;
    }else{
      button.innerText = `${pokemon.name} height will be calculated soon`;
    }
    
    
    button.classList.add('btn')
    listItem.append(button)
    pokemonListNode.append(listItem)
    // call the events function
    events(button, pokemon);
  }
  function showDetails(pokemon){
    return loadDetails(pokemon)
    // console.log(pokemon)
  }
  //4
  function events(button, pokemon){
    button.addEventListener("click", ()=>{
      return showDetails(pokemon.url);
    })
  }
  return{
    add: add,
    getAll: getAll,
    filterByName: filterByName,
    addListItem: addListItem,
    load:load,
    loadDetails: loadDetails,
    showLoadingMessage : showLoadingMessage,
    URL : URL
  }
})();
pokemonRepository.load()

//filter pokemon from the pokemon list
pokemonRepository.filterByName('bulbasaur')

//display the entire list of pokemon
// console.log(pokemonRepository.getAll());