// const fetch = require('node-fetch');   
let repository = (function(){
  let pokemonDetails = [{'id': '','imgUrl': '', 'name':'','height':'','weight':'','abilities':'','png':'','types':''}];
  const URL = 'https://pokeapi.co/api/v2/pokemon/';
  
  let indicatorNum = 0;
  let previousValue = document.querySelector('#search').value;
  let isWaiting = false;
  
  
  function loadApi(){
    fetch(URL).then(function(res){
      hideLoadingMessage('.body')
      return res.json();
    }).then(function(json){
      json.results.forEach(function(item){
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
      // validateObject(details)
      validate(details)
    })
  }
  
  
  
  
  function validate(item){
    const pokemon = typeof(item);
    let itemKeys = Object.keys(item);
    let detailsKeys = Object.keys(pokemonDetails[0]);
    switch(pokemon){
      case 'array':
        console.log('This is an array')
        break;
      case 'object':
        console.log('This is an object')
        itemKeys.forEach((key, i) => {
          if(key != detailsKeys[i]){
            document.write(`'keys need to match [${detailsKeys}] <br>`);
            throw new Error(`'keys need to match [${detailsKeys}] <br>`)
          }
        });
        isObject(item)
        break;
      case 'string':
          console.log('This is an string')
          break;
      case 'number':
        console.log('This is an number')
        break;
      case 'boolean':
        console.log('This is an bool')
        break;
      case 'undefined':
          console.log('You need to pass something')
          break;
      default:
        console.log('this is a ' + pokemon)
    }
  }
  function isObject(item){  
    console.log('success')
    // hideLoadingMessage('.carousel-inner-loader')
    pokemonDetails.push(item);
    console.log(pokemonDetails)
    // buildIndicators(item, indicatorNum)
    // buildCarouselItems(item)
  }
  
  function validateObject(item){
    
    //SUCCESS
    // if(typeof(item) === 'object'){
      
      // let itemKeys = Object.keys(item);
      // let detailsKeys = Object.keys(pokemonDetails[0]);
      // let addToList = true;
      // itemKeys.forEach((key, i) => {
      //   if(key != detailsKeys[i]){
      //     addToList = false;
      //     document.write(`'keys need to match [${detailsKeys}] <br>`);
      //     throw new Error(`'keys need to match [${detailsKeys}] <br>`)
      //   }
      // });
      // if(addToList){
      //   hideLoadingMessage('.carousel-inner-loader')
      //   pokemonDetails.push(item);
      //   //INDICATOR NUM IS NEEDED TO NUMBER THE data-slide-to IN THE CORRECT ORDER
      //   //indicatorNum IS INITIALIZED ON LINE 6
      //   buildIndicators(item, indicatorNum)
      //   indicatorNum++;
      //   buildCarouselItems(item)
      // }
    
    // }
    
    
    // if(!item || item == undefined){
    //   document.write('Make sure your passing an object and that it is not empty <br>')
    //   document.write('Also make sure your passing [name: string, height: int, type: object]')
    //   throw new Error('This add function only takes objects.<br>')
    // }else if(typeof(item) == 'object'){
    //   let itemKeys = Object.keys(item);
    //   let detailsKeys = Object.keys(pokemonDetails[0]);
    //   let addToList = true;
    //   itemKeys.forEach((key, i) => {
    //     if(key != detailsKeys[i]){
    //       addToList = false;
    //       document.write(`'keys need to match [${detailsKeys}] <br>`);
    //       throw new Error(`'keys need to match [${detailsKeys}] <br>`)
    //     }
    //   });
    //   if(addToList){
    //     hideLoadingMessage('.carousel-inner-loader')
    //     pokemonDetails.push(item);
    //     //INDICATOR NUM IS NEEDED TO NUMBER THE data-slide-to IN THE CORRECT ORDER
    //     //indicatorNum IS INITIALIZED ON LINE 6
    //     buildIndicators(item, indicatorNum)
    //     indicatorNum++;
    //     buildCarouselItems(item)
    //   }
    // }
  }
  
  
  function buildCarouselItems(details){
    let checkForActiveClass = document.querySelector('.carousel-item');
    let itemHook = document.querySelector('.carousel-inner')
    let name = details.name;
    let img = details.imgUrl;
    name = capitalize(name)
    // showLoadingMessage('.main-img')
    let item = `<div class="carousel-item">
      <img class="d-block w-100 h-100 main-img" src="${img}" alt="${name} slide">
      <div class="carousel-caption d-xs-block mb-5">
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal2" onclick="repository.getInfo()">
          ${name}
        </button>
      </div>
    </div>`
    
    itemHook.insertAdjacentHTML('beforeend', item)
    if(!checkForActiveClass){
      //IF THERE IS NO ACTIVE CLASS -- SET ONE
      document.querySelector('.carousel-item').classList.add('active')
    }
  }
  
  
  function buildIndicators(details, index){
    // showLoadingMessage('.carousel-indicators', 'indicators')
    let indicatorHook = document.querySelector('.carousel-indicators')
    // hideLoadingMessage('indicators')
    let carouselIndicators = `<li data-target="#carouselExampleIndicators" data-slide-to="${index}" class="carousel-indicator"><img class="indicator-img w-100" src="${details.png}" alt="${details.name}"/></li>`;
    
    indicatorHook.insertAdjacentHTML('beforeend', carouselIndicators)
  }
  
  
  // Utility functions -- functions 
  function showLoadingMessage(selector, id){
    // create the element
    let el = document.createElement('span');
    el.classList.add(`${id}`)
    // set it's inside text
    el.innerHTML = `<h1 id="${id}">Loading</h1>`;
    //place it
    document.querySelector(`${selector}`).insertAdjacentElement('beforeend', el)
    // document.querySelector('.container').insertAdjacentElement('beforeend', el)
  }
  function hideLoadingMessage(id){
    let el = document.querySelectorAll(`${id}`);
    el.forEach((e)=>{
      e.remove()
    })
  }
  function getInfo(search = null){
    // if the search item is clicked
    if(search != null){
      console.log('search is set')
      //active is the pokemon currently displayed in search result
      let active = document.querySelector('#search-result').innerText;
      active = active.trim()
      for(var i = 0; i < pokemonDetails.length; i++){
        let listName = pokemonDetails[i].name
        if(listName === active){
          let currentModal = document.querySelector('.modal')
          if(currentModal){
            //removes the modal if there is one in the DOM
            console.log('removing modal')
            document.querySelector('.modal').remove()
          }
          let result = pokemonDetails[i];
          return createModal(result)
          
        }else{
          console.log(active)
          console.log(active + ' is not the same as ' + listName)
        }
      }
    }else{
      //active is the pokemon currently displayed
      let active = document.querySelector('div.active div button').innerText;
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
  }
  function capitalize(str){
    String(str)
    let lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1)
  }
  // LIVE SEARCH
  function findByName(){
    // initialize timer, get the input value, filter through the Array
    let timer
    // GET WHAT IS BEING TYPED IN
    let value = document.querySelector('#search').value
    
    let searchHook = document.querySelector('#search-result');
    // COMPARE PREV VALUE TO TYPED VALUE
    if(previousValue != value){
      clearTimeout(timer)
      // IF THE VALUE IS NOT EMPTY
      if(value != ''){
        // WILL SHOW UNTIL THE SEARCHHOOK'S INNERTEXT IS OVERRIDDEN
        if(!isWaiting){
          searchHook.innerText = 'loading..'
        }
        
        // ALLOWS TIME TO TYPE BEFORE FILTERING THE ARRAY FOR THE NAME VALUE
        timer = setTimeout(()=>{
          let value = document.querySelector('#search').value.trim()
          let searchResults = pokemonDetails.filter(pokemon=>{
            if(pokemon.name === value){
              console.log(pokemon)
              return pokemon;
              }
            })
          let searchHook = document.querySelector('#search-result');
          
          // CHECK FOR ANY RESULTS IN THE CALLBACK
          if(searchResults.length != 0){
            searchHook.innerText = searchResults[0].name
            let result = `
              <a data-toggle="modal" data-target="#exampleModal2" onclick="repository.getInfo('${value}')" id="search-result" class="nav-link active" href="#">
                <div class="search-display">
                  <img class="search-display__img" src="${searchResults[0].imgUrl}" />
                </div>
              </a>
            `
            return searchHook.insertAdjacentHTML('beforeend', result)  
          }else{
            console.log('error')
            let searchHook = document.querySelector('#search-result');
            searchHook.innerText = '';
            let result = '<span>No results found. Please check your spelling.</span>'
            searchHook.insertAdjacentHTML('beforeend', result)
          }
        },450)
      }
      // SET PREV VALUE TO WHAT THE TYPED VALUE IS
      previousValue = value;
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
    let li = '<li class="text-dark list-group-item"></li>'
    for(var i = 0; i < array.length; i++){
      let li = `<li class="text-dark list-group-item">${array[i].ability.name}</li>`
      hook.insertAdjacentHTML('afterbegin', li)
    }
  }
  function buildTypes(array){
    let hook = document.querySelector('.type-list')
    let li = '<li class="text-dark list-group-item"></li>'
    for(var i = 0; i < array.length; i++){
      let li = `<li class="text-dark list-group-item">${array[i].type.name}</li>`
      hook.insertAdjacentHTML('afterbegin', li)
    }
  }
  
  
  return{
    // buildCarousel : buildCarousel,
    // getInfo : getInfo,
    // findByName : findByName,
    
    loadApi : loadApi
  }
})();
// repository.buildCarousel()
repository.loadApi()