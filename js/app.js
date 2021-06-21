// const fetch = require('node-fetch');   needed to run quokka js
let repository = (function(){
  let list = [{"name":'',"url": ''}];
  let pokemonDetails = [{"imgUrl": '',"height":'',"weight":''}];
  const URL = 'https://pokeapi.co/api/v2/pokemon/';
  function loadPage(){
    let ul = document.querySelector('.pokemon-list')
    let filteredList = document.createElement('ul');
    let li = window.document.createElement('li')
    let btn = window.document.createElement('button')
    let filteredListItem = document.createElement('li');
    let button = document.createElement('button');
    
    showLoadingMessage('.pokemon-list', 'list')
    
    ul.insertAdjacentElement('beforebegin', filteredList)
    
    filteredList.append(filteredListItem)
    filteredListItem.append(btn)
    
    li.classList.add('pokemon-list__item')
    button.classList.add('btn')
    
    filteredList.classList.add('filtered-list')
    filteredListItem.classList.add('filtered-item')
    btn.classList.add('btn--filtered')
    return loadApi();
  }
  function loadApi(){
    fetch(URL).then(function(res){
      return res.json();
    }).then(function(json){
      hideLoadingMessage('list')
      json.results.forEach(function(item){
        let pokemon = {
          name: item.name,
          url: item.url
        }
        add(pokemon)
      })
    })
  }
  function loadDetails(pokemon){
    showLoadingMessage('.filtered-list', 'details')
    fetch(pokemon).then(function(res){
      return res.json();
    }).then(function(json){
      hideLoadingMessage('details')
      let details = {
        imgUrl: json.sprites.other.dream_world.front_default,
        height: json.height,
        weight: json.weight
      }
      // createModal(details)
      // add(details)
    })
  }
  function add(item){
    if(typeof(item) == 'object' && item != undefined){
      let itemKeys = Object.keys(item);
      let detailsKeys = Object.keys(pokemonDetails[0]);
      let listKeys = Object.keys(list[0]);
      let addToList = true; 
      if(!item.name){
        console.log('detail list')
        itemKeys.forEach((key, i) => {
          if(key != detailsKeys[i]){
            addToList = false;
            document.write(`'keys need to match [${detailsKeys}] <br>`);
            throw new Error(`'keys need to match [${detailsKeys}] <br>`)
          }
        });
        if(addToList){
          pokemonDetails.push(item);
          // addListItem(item);
          // buildListElements(item);
          showDetails(item)
        }
      }else{
        console.log('normal list')
        itemKeys.forEach((key, i) => {
          if(key != listKeys[i]){
            addToList = false;
            document.write(`'keys need to match [${listKeys}] <br>`);
            throw new Error(`'keys need to match [${listKeys}] <br>`)
          }
        });
        if(addToList){
          list.push(item);
          addListItem(item);
          return list;
        }
      }
    }else if(item == undefined ){
      document.write('Make sure your passing an object and that it is not empty <br>')
      document.write('Also make sure your passing [name: string, height: int, type: object]')
      throw new Error('This add function only takes objects.<br>')
    }
  }
  function filterByName(name){
    showLoadingMessage('.btn--filtered')
    setTimeout(()=>{
      // store the filtered array in filtered variable
      let filtered = list.filter(pokemon => {
      if(pokemon.name == name){
        return true;
      }
    })
    // if there is a match, the filtered array will store it in the 1st position
    if(filtered[0]){
      hideLoadingMessage();
      let button = document.querySelector('.btn--filtered');
      button.innerText = `You selected ${name} using the filter by name function on line 169`
      events(button, filtered[0])
    }else{
      document.write(`Sorry there is no pokemon by that name in my list. <br>` )
    }
    }, 2200)
  }
  function buildListElements(pokemon){
    let pokemonListNode = document.querySelector('.filtered-list');
    let listItem = document.createElement('li');
    let listItem2 = document.createElement('li');
    let pokemonImg = document.createElement('img');
    
    listItem.innerText = `Height:  ${pokemon.height}`;
    listItem2.innerText = `Weight:  ${pokemon.weight}`;
    
    //attacth the listitem to the list iteself
    pokemonImg.setAttribute('src', `${pokemon.imgUrl}`)
    
    listItem.appendChild(pokemonImg);
    listItem.appendChild(listItem2);
    pokemonListNode.appendChild(listItem)
  }
  function addListItem(item){
    let pokemonListNode = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let btn = document.createElement('button')
    pokemonListNode.appendChild(listItem)
    //attacth the listitem to the list iteself
    btn.innerText = `${item.name}`;
    btn.classList.add('btn');
    listItem.appendChild(btn);
    events(btn, item)
  }
  function showLoadingMessage(selector, id){    
    let el = document.querySelector(selector);
    return el.innerHTML = `<h1 class='loading' id="${id}">Loading</h1>`;
  }
  function hideLoadingMessage(id){
    let el = document.querySelector(`.loading[id="${id}"]`);
    return el.remove();
  }
  function showDetails(pokemon){
    createModal()
    modalEvents()
    return loadDetails(pokemon)
  }
  function modalEvents(){
    let modal = document.querySelector('.modal');
    let closeBtn = document.querySelector('.modal__close');
    
    closeBtn.addEventListener('click', function(){
      console.log(modal)
      return closeModal()
    })
  }
  function events(button, pokemon){
    button.addEventListener("click", ()=>{
      return showDetails(pokemon.url);
    })  
    //!FOR QUOKKA TESTING
    // return showDetails(pokemon.url);
  }
  function createModal(){
    let mainContainer = document.querySelector('.container');
    let modal = document.createElement('div');
    let modalCloseBtn = document.createElement('span');
    let modalContainer = document.createElement('div');
    let modalHeadline = document.createElement('h1');
    let modalImg = document.createElement('img');
    let modalCopy = document.createElement('p');

    mainContainer.insertAdjacentElement('afterend', modal);
    modal.append(modalContainer);
    modalContainer.appendChild(modalCloseBtn);
    modalContainer.appendChild(modalHeadline);
    modalContainer.appendChild(modalImg);
    modalContainer.appendChild(modalCopy);
    
    //add classes to new elements
    modal.classList.add('modal');
    modalCloseBtn.classList.add('modal__close');
    modalContainer.classList.add('modal__container');
    modalHeadline.classList.add('modal__headline');
    modalImg.classList.add('modal__img');
    modalCopy.classList.add('modal__copy');
    
    modalCloseBtn.innerText = `Close`;
    // modalHeadline.innerText = `Height:  ${details.height}`;
    // modalCopy.innerText = `Weight:  ${details.weight}`;
    // modalImg.setAttribute('src', `${details.imgUrl}`)
    modal.classList.add('modal--is-visible');
  }
  function closeModal(){
    return document.querySelector('.modal').classList.remove('modal--is-visible')
  }
  return{
    loadPage : loadPage,
    filterByName : filterByName,
  }
})();
repository.loadPage()
// repository.filterByName('bulbasaur')