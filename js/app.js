// const fetch = require('node-fetch');   
let repository = (function(){
  let pokemonDetails = [{"id": '',"imgUrl": '', "name":'',"height":'',"weight":'',"abilities":'',"png":'',"types":''}];
  const URL = 'https://pokeapi.co/api/v2/pokemon/';
  
  let indicatorNum = 0;
  
  
  // Main functions
  function buildCarosel(){
    const root = document.querySelector('#root');
    const carousel = ` 
    <div class="container">
      <ul class="nav justify-content-end">
        <li class="nav-item">
          <a class="nav-link active" href="#">Github</a>
        </li>
      </ul>
      <div id="carouselExampleIndicators" class="carousel slide h-100" data-ride="carousel">
        <ol class="carousel-indicators">
          
        </ol>
        <div class="carousel-inner">
        
        
        
        <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Prev</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
      </div>
    </div>`
    // root.appendChild(carousel)
    root.insertAdjacentHTML('beforeend', carousel)
    // showLoadingMessage('.container', 'container')
    loadApi()
  }
  function loadApi(){
    // hideLoadingMessage('container')
    fetch(URL).then(function(res){
      return res.json();
    }).then(function(json){
      
      json.results.forEach(function(item){
        let pokemon = {
          name: item.name,
          url: item.url
        }
        loadDetails(item.url)
      })
    })
  }
  function loadDetails(pokemon){
    fetch(pokemon).then(function(res){
      // console.log(res.json())
      return res.json();
    }).then(function(json){
      let details = {
        id: json.id,
        imgUrl: json.sprites.other.dream_world.front_default,
        name: json.name,
        height: json.height,
        weight: json.weight,
        abilities: json.abilities,
        png: json.sprites.front_default,
        types: json.types
      }
      // pokemonDetails.push(details);
      validateObject(details)
    })
  }
  function validateObject(item){
    if(!item || item == undefined){
      document.write('Make sure your passing an object and that it is not empty <br>')
      document.write('Also make sure your passing [name: string, height: int, type: object]')
      throw new Error('This add function only takes objects.<br>')
    }else if(typeof(item) == 'object'){
      let itemKeys = Object.keys(item);
      let detailsKeys = Object.keys(pokemonDetails[0]);
      let listKeys = Object.keys(list[0]);
      let addToList = true;
      
      itemKeys.forEach((key, i) => {
        if(key != detailsKeys[i]){
          addToList = false;
          document.write(`'keys need to match [${listKeys}] <br>`);
          throw new Error(`'keys need to match [${listKeys}] <br>`)
        }
      });
      if(addToList){
        pokemonDetails.push(item);
        buildIndicators(item, indicatorNum)
        indicatorNum++;
        buildCarouselItems(item)
      }
    }
  }
  function buildCarouselItems(details){
    let checkForActiveClass = document.querySelector('.carousel-item');
      let itemHook = document.querySelector('.carousel-inner')
      
      let name = details.name;
      let img = details.imgUrl;
      name = capitalize(name)
      showLoadingMessage('.main-img', 'main-img')
      let item = `<div class="carousel-item">
        <img class="d-block w-100 h-100 main-img" src="${img}" alt="${name} slide">
        <div class="carousel-caption d-xs-block mb-5">
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal2" onclick="repository.getInfo()">
            ${name}
          </button>
        </div>
      </div>`
      
      itemHook.insertAdjacentHTML('beforeend', item)
      hideLoadingMessage('main-img')
      if(!checkForActiveClass){
        document.querySelector('.carousel-item').classList.add('active')
      }
      // console.log(img)
      
  }
  function buildIndicators(details, index){
    let indicatorHook = document.querySelector('.carousel-indicators')
    showLoadingMessage('.carousel-indicators', 'indicator-loader')
    let carouselIndicators = `<li data-target="#carouselExampleIndicators" data-slide-to="${index}" class="carousel-indicator"><img class="indicator-img w-100" src="${details.png}" alt="${details.name}"/></li>`;
    hideLoadingMessage('indicator-loader')
    indicatorHook.insertAdjacentHTML('beforeend', carouselIndicators)
  }
  
  
  // Utility functions
  function showLoadingMessage(selector, id){
    // create the element
    let el = document.createElement('h1');
    // set it's inside text
    el.innerHTML = `<h1 class='loading' id="${id}">Loading</h1>`;
    //place it
    document.querySelector('.carousel-inner').append( el)
  }
  function hideLoadingMessage(id){    
    let el = document.getElementById(id);
    return el.remove();
  }
  function getInfo(){
    let active = document.querySelector('div.active div button').innerText;
    console.log(active)
    for(var i = 0; i < pokemonDetails.length; i++){
      let listName = capitalize(pokemonDetails[i].name)
      if(listName === active){
        console.log(listName)
        let currentModal = document.querySelector('.modal')
        if(currentModal){
          //removes the modal if there is one in the DOM
          console.log('removing modal')
          document.querySelector('.modal').remove()
        }
        let result = pokemonDetails[i];
        return createModal(result)
      }
    }
  }
  function capitalize(str){
    String(str)
    let lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1)
  }
  function findByName(){
    let value = document.querySelector("#search").value
    let searchResults = pokemonDetails.filter(pokemon=>pokemon.name === value)
    console.log(searchResults)
    if(searchResults.length == 0){
      console.log('error')
    }else{
      let searchHook = document.querySelector('#search-result');
      searchHook.innerText = searchResults[0].name
      // let result = document.createElement('img')
      let result = `
        <div class="search-display">
          <img class="search-display__img" src="${searchResults[0].imgUrl}" />
        </div>
      `
      searchHook.insertAdjacentHTML('beforeend', result)
      console.log(searchResults)
    }
  }
  
  
  // Modal functions 
  function createModal(details){
    let name = capitalize(details.name)
      const modal = `<div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModal2Label" aria-hidden="true">
                          <div class="modal-dialog modal-dialog-centered" role="document">
                              <div class="modal-content">
                                  <div class="modal-header">
                                      <h5 class="modal-title display-3 " id="exampleModal2Label">${name}</h5>
                                      <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                          <span aria-hidden="true">&times;</span>
                                      </button>
                                  </div>
                                  <div class="modal-body">
                                      <img class="w-100"  src="${details.imgUrl}" />
                                      <h5 class="text-dark">Abilities</h5>
                                      <ul class="list-group list-group-flush ability-list">
                                        
                                      </ul>
                                      <hr>
                                      <h5 class="text-dark">Types</h5>
                                      <ul class="list-group list-group-flush type-list">
                                        
                                      </ul>
                                  </div>
                                  <div class="modal-footer">
                                    <h5>Height:</h5>
                                    <p class="text-primary">${details.height}</p>
                                    <h5>Weight:</h5>
                                    <p class="text-primary">${details.weight}</p>
                                  </div>
                              </div>
                          </div>
                      </div>`
        root.insertAdjacentHTML('beforeend', modal);
        let modalContainer = document.querySelector('.modal-content')
        buildAbilities(details.abilities)
        buildTypes(details.types)
        modalContainer.setAttribute('style', `background-image: linear-gradient(to left bottom, hsla(6, 83%, 43%, 1), hsla(0, 0%, 91%, .6)), url(${details.imgUrl});`)
        // modalEvents()
      // setTimeout(function(){
      //   modalEvents()
      //   }, 2000)
  }
  let buildAbilities = (array)=>{
    let hook = document.querySelector('.ability-list')
    let li = `<li class="text-dark list-group-item"></li>`
    for(var i = 0; i < array.length; i++){
      let li = `<li class="text-dark list-group-item">${array[i].ability.name}</li>`
      hook.insertAdjacentHTML('afterbegin', li)
    }
  }
  function buildTypes(array){
    let hook = document.querySelector('.type-list')
    let li = `<li class="text-dark list-group-item"></li>`
    for(var i = 0; i < array.length; i++){
      let li = `<li class="text-dark list-group-item">${array[i].type.name}</li>`
      hook.insertAdjacentHTML('afterbegin', li)
    }
  }
  
  
  return{
    buildCarosel : buildCarosel,
    getInfo : getInfo,
    findByName : findByName
  }
})();
repository.buildCarosel()