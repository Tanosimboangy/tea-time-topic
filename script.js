// IMPORTING THESE ELEMENTS
import { form, input, submiBtn, nextTopicsLists, pastTopicsLists } from './lib/elements.js';

// Declaring the API link as a variable
const endpoints = "https://gist.githubusercontent.com/Pinois/93afbc4a061352a0c70331ca4a16bb99/raw/6da767327041de13693181c2cb09459b0a3657a1/topics.json";
let items;

// Fetching the data form the API
async function fetchdata() {
    const response = await fetch(endpoints);
    const data = await response.json();
    items = data;
    console.log(items);

    // Mapping through the items
    function showLists(items) {
        return items.map(person => { 
            return `
            <article data-id="${person.id}" value="${person.id}" class="article">
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
                            <li>${person.upvotes}</li>
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
    }
    // DISPLAY THE LISTS
    const showPeople = () => {
        const html = showLists(items);
        nextTopicsLists.innerHTML = html;
        nextTopicsLists.dispatchEvent(new CustomEvent('listUpdated'));
    }
    showPeople();

    //***************** LOCAL STORAGE *********************// 

    // Storing the data into the local storage
    const initLocalStorage = () => {
        const stringFromLS = localStorage.getItem('items');
        const lsItems = JSON.parse(stringFromLS);
        if (lsItems) {
            items = lsItems;
            showPeople(items);
        }
        nextTopicsLists.dispatchEvent(new CustomEvent('listUpdated'));
    };
    const updateLocalStorage = () => {
        localStorage.setItem('items', JSON.stringify(items));
    };
    // ADDING EVENTLISTENER IN THE LOCALSTORAGE
    nextTopicsLists.addEventListener("listUpdated", updateLocalStorage);
    initLocalStorage();

    // *************** ADDING NEW LIST ******************//

    // ADDING NEW LIST
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log(e.target.input.value);
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
        showPeople(items);
    });
}

fetchdata();


















