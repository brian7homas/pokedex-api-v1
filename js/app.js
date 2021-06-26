// const fetch = require('node-fetch');   
//   <div class="carousel-item active">
//     <img class="d-block w-100" src="" alt="First slide">
//   </div>
//   <div class="carousel-item">
//     <img class="d-block w-100" src="" alt="Second slide">
//   </div>
//   <div class="carousel-item">
//     <img class="d-block w-100" src="" alt="Third slide">
//   </div>
// </div>
let repository = (function(){
  let list = [{"name":'',"url": ''}];
  let pokemonDetails = [{"id": '',"imgUrl": '', "name":'',"height":'',"weight":'',"abilities":'',"png":''}];
  const URL = 'https://pokeapi.co/api/v2/pokemon/';
  
  //dragging active
  let isDragging = false;
  //where dragging starts
  let startPos = 0;
  //value for direction
  let currentTranslate = 0;
  let prevTranslate = 0;
  //animation will use requestanimation frame
  let animationID = 0;
  //current slide
  let currentIndex = 0;
  let indicatorNum = 0;
  function loadPage(){
    let ul = document.querySelector('.pokemon-list');

    let filteredList = document.createElement('ul');
    
    // showLoadingMessage('.pokemon-list', 'list')
    
    ul.insertAdjacentElement('beforebegin', filteredList)
    
    filteredList.classList.add('filtered-list')
    return loadApi();
  }
  function buildCarosel(){
    const root = document.querySelector('#root');
    const carousel = ` 
    <div class="container">
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
    loadApi()
  }
  function buildCarouselItems(details){
    let checkForActiveClass = document.querySelector('.carousel-item');
      let itemHook = document.querySelector('.carousel-inner')
      let name = details.name;
      function capitalize(str){
        String(str)
        let lower = str.toLowerCase();
        console.log(typeof(str))
        name = str.charAt(0).toUpperCase() + lower.slice(1)
      }
      capitalize(name)
      let item = `<div class="carousel-item">
        <img class="d-block w-100 h-100" src="${details.imgUrl}" alt="First slide">
        <div class="carousel-caption d-xs-block mb-5">
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal2">
            ${name}
          </button>
        </div>
      </div>`
      itemHook.insertAdjacentHTML('beforeend', item)
      if(!checkForActiveClass){
        document.querySelector('.carousel-item').classList.add('active')
      }
  }
  function modal(details){
    const root = document.querySelector('#root');
    //get info from array
    const modal = `<div class="modal fade" id="exampleModal2" tabindex="-1" role="dialog" aria-labelledby="exampleModal2Label" aria-hidden="true">
              <div class="modal-dialog" role="document">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title" id="exampleModal2Label">${details.name}</h5>
                          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div class="modal-body">
                          <h5>Popover in a modal</h5>
                          <p>This <a href="#" role="button" class="btn btn-secondary popover-test" title="Popover title" data-content="Popover body content is set in this attribute." data-toggle="popover" data-placement="right" data-trigger="hover">button</a> triggers a popover on click.</p>
                          <hr>
                          <h5>Tooltips in a modal</h5>
                          <p><a href="#" class="tooltip-test" title="Tooltip" data-toggle="tooltip" data-placement="top">This link</a> and <a href="#" class="tooltip-test" title="Tooltip" data-toggle="tooltip" data-placement="top">that link</a> have tooltips on hover.</p>
                      </div>
                      <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                          <button type="button" class="btn btn-primary">Save changes</button>
                      </div>
                  </div>
              </div>
          </div>`
    root.insertAdjacentHTML('beforeend', modal);
  }
  function buildIndicators(details, index){
    let indicatorHook = document.querySelector('.carousel-indicators')
    let carouselIndicators = `<li data-target="#carouselExampleIndicators" data-slide-to="${index}" class="carousel-indicator"><img class="indicator-img w-100" src="${details.png}" alt="${details.name}"/></li>`
    indicatorHook.insertAdjacentHTML('beforeend', carouselIndicators)
  }
  function loadApi(){
    fetch(URL).then(function(res){
      return res.json();
    }).then(function(json){
      // hideLoadingMessage('list')
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
        png: json.sprites.front_default
      }
      pokemonDetails.push(details);
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
        modal(item)
      }
    }
  }
  
  function filterByName(name){
    showLoadingMessage('.filtered-list', 'load-search')
    setTimeout(()=>{
      // store the filtered array in filtered variable
      
      let filtered = pokemonDetails.filter(pokemon => {
        console.log(pokemon.name)
      if(pokemon.name == name){
        return true;
      }
    })
    // if there is a match, the filtered array will store it in the 1st position
    if(filtered[0]){
      // hideLoadingMessage('load-search');
      let button = document.querySelector('.filtered-list');
      button.innerText = `You selected ${name} using the filter by name function on line 169`
      events(button, filtered[0])
    }else{
      document.write(`Sorry there is no pokemon by that name in my list. <br>` )
    }
    }, 2200)
  }
  
  
  
  /** */
  
  
  
  
  // MAIN BUTTON EVENT LISTENER
  function events(button, pokemon){
    button.addEventListener("click", ()=>{
      return showDetails(pokemon);
    })  
    //!FOR QUOKKA TESTING
    // return showDetails(pokemon.url);
  }
  // MODAL SPECIFIC EVENTS
  function modalEvents(){
    let modal = document.querySelector('.modal');
    let closeBtn = document.querySelector('.modal__close');
    window.addEventListener('keydown',(e)=>{
      if(e.key === 'Escape'){
        return closeModal();
      }
    })
    modal.addEventListener('click', function(e){
      let target = e.target
      if(target === modal){
        return closeModal();
      }
    })
    closeBtn.addEventListener('click', function(){
      return closeModal();
    })
  }
  function createModal(details){
    let mainContainer = document.querySelector('.container');
    let currentModal = document.querySelector('.modal')
    if(currentModal){
      //removes the modal if there is one in the DOM
      document.querySelector('.modal').remove()
    }else{
      let modal = document.createElement('div');
      mainContainer.insertAdjacentElement('afterend', modal);
      modal.classList.add('modal--is-visible');
      modal.classList.add('modal');
      showLoadingMessage('.modal', 'modal-container');
      setTimeout(function(){
        hideLoadingMessage('modal-container')
        let modalCloseBtn = document.createElement('span');
        let modalContainer = document.createElement('div');
        let modalHeadline = document.createElement('h1');
        let modalImg = document.createElement('img');
        let modalCopy = document.createElement('ul');
        modalContainer.setAttribute('style', `background-image: linear-gradient(to left bottom, hsla(6, 83%, 43%, 1), hsla(0, 0%, 91%, .6)), url(${details.imgUrl});`)
        
        
        modal.append(modalContainer);
        modalContainer.appendChild(modalCloseBtn);
        modalContainer.classList.add('modal__container');
        modalCloseBtn.classList.add('modal__close');
        modalContainer.appendChild(modalHeadline);
        modalContainer.appendChild(modalImg);
        modalContainer.appendChild(modalCopy);
        
        //add classes to new elements
        modalHeadline.classList.add('modal__headline');
        modalImg.classList.add('modal__img');
        modalCopy.classList.add('modal__copy');
        
        
        
        
        modalCloseBtn.innerText = `Close`;
        modalHeadline.innerText = `Name:  ${details.name}`;
        modalCopy.innerHTML = `
            <li>Weight:  ${details.weight}</li>
            <li>Height:  ${details.height}</li>
          `;
        modalImg.setAttribute('src', `${details.imgUrl}`)
        
        modalEvents()
        }, 2000)
      
      
        
        
      //add the text and img to the modal
      
    }
    
    
  }
  function closeModal(){
    document.querySelector('.modal').classList.remove('modal--is-visible');
    return document.querySelector('.modal').remove();
  }
  
  
  
  
  return{
    loadPage : loadPage,
    filterByName : filterByName,
    loadApi : loadApi,
    buildCarosel : buildCarosel,
    modal : modal
  }
})();
repository.buildCarosel()
// repository.modal()
// repository.filterByName('bulbasaur')