import { form, input, submiBtn, nextTopicsLists, pastTopicsLists } from './lib/elements.js';
console.log(form, input, submiBtn, nextTopicsLists, pastTopicsLists);



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
    function showLists() {
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
    // Displaying the lists
    const showPeople = () => {
        const html = showLists(items);
        nextTopicsLists.innerHTML = html;
    }
    showPeople();

    // const initLocalStorage = () => {
    //     const stringFromLS = localStorage.getItem('data');
    //     const lsItems = JSON.parse(stringFromLS);
    //     if (lsItems) {
    //         data = lsItems;
    //         showPeople();
    //     }
    //     nextTopicsLists.dispatchEvent(new CustomEvent('listUpdated'));
    // };
    
    // const updateLocalStorage = () => {
    //     localStorage.setItem('data', JSON.stringify(data));
    // };
    // // Adding eventListner in the updateLocalStorage
    // nextTopicsLists.addEventListener("listUpdated", updateLocalStorage);
    // initLocalStorage();
}

fetchdata();


















