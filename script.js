// IMPORTING THESE ELEMENTS
import { form, input, submiBtn, nextTopicsLists, pastTopicsLists } from './lib/elements.js';

// Declaring the API link as a variable
const endpoints = "https://gist.githubusercontent.com/Pinois/93afbc4a061352a0c70331ca4a16bb99/raw/6da767327041de13693181c2cb09459b0a3657a1/topics.json";
let items = [];

// Fetching the data form the API
async function fetchdata() {
    const response = await fetch(endpoints);
    const data = await response.json();
    items.push(...data);
    showLists(items);
}

// Mapping through the items
function showLists(items) {
    const notdDiscussed = items.filter(person => !person.discussedOn);
    const sortTheList = notdDiscussed.sort(function(a, b) {
        const plusa = a.upvotes;
        const minusa = a.downvotes;
        const differncea = plusa - minusa;
        const plusb = b.upvotes;
        const minusb = b.downvotes;
        const differenceb = plusb - minusb;
        return differenceb - differncea;
      });
    const html = sortTheList.map(person => {
    return `<article data-id="${person.id}" value="${person.id}" class="article">
            <ul>
                <li>
                    <ul class="title">
                        <li><p>${person.title}</p></li>
                        <li><button type="button" class="acrchive"> Archive </button></li>
                    </ul>
                </li>
                <li>
                    <ul>
                        <li><button type="button" class="increase">Increase</button></li>
                        <li><span>${person.upvotes}<span></li>
                    </ul>
                    <ul>
                        <li><button type="button" class="decrease">Decrease</button></li>
                        <li>${person.downvotes}</li>
                    </ul>
                </li>
            </ul>
        </article>
        `
    }).join("");
    nextTopicsLists.innerHTML = html;
    // Filter for the discuseed ones
    const discussedTopics = items.filter(person => person.discussedOn);
    const newHMTL = discussedTopics.map(person => {
    return `
        <article data-id="${person.id}" value="${person.id}" class="article">
            <ul>
                <li>
                    <ul class="title">
                        <li><p>${person.title}</p></li>
                        <li><li><button type="button" class="delete">Delete</button></li></li>
                    </ul>
                </li>
                <li>
                    <ul>
                        <li><button type="button" class="decrease">Decrease</button></li>
                    </ul>
                </li>
            </ul>
        </article>`}).join("");
    pastTopicsLists.innerHTML = newHMTL;
}


//***************** LOCAL STORAGE *********************// 

// Storing the data into the local storage
const initLocalStorage = () => {
    const stringFromLS = localStorage.getItem('items');
    const lsItems = JSON.parse(stringFromLS);
    if (lsItems) {
        items = lsItems;
        showLists(items);
        console.log(items);
    }
    nextTopicsLists.dispatchEvent(new CustomEvent('listUpdated'));
    pastTopicsLists.dispatchEvent(new CustomEvent('listUpdated'));
};
const updateLocalStorage = () => {
    localStorage.setItem('items', JSON.stringify(items));
};
initLocalStorage();
// ADDING EVENTLISTENER IN THE LOCALSTORAGE
nextTopicsLists.addEventListener("listUpdated", updateLocalStorage);
pastTopicsLists.addEventListener("listUpdated", updateLocalStorage);


//*************** ADDING NEW LIST ******************//

// ADDING NEW LIST
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const el = e.target;
    const inputValue = el.input.value;

    // CREATING A NEW ITEM
    const newList = {
        id: Date.now(),
        title: inputValue,
        downvotes: 0,
        discussedOn: "",
        upvotes: 0,
    }
    // PUSH THE NEW ITEM INNTO THE ITEMS LISTS
    items.push(newList);
    nextTopicsLists.dispatchEvent(new CustomEvent('listUpdated'));
    showLists(items);
});

function handleClick(e) {
    if (e.target.matches(".increase")) {
        const plusButton = e.target.dataset.id;
        items.map(person => {
          if (person.id === plusButton) {
            person.upvotes++;
          }
        })
        showLists(items);
      }
    
      if (e.target.matches(".decrease")) {
        const minusButton = e.target.dataset.id;
        listOfTopics.map(person => {
          if (person.id === minusButton) {
            person.downvotes--;
          }
        })
        showLists(items);
      }
}

window.addEventListener("submit", handleClick);
fetchdata();

