// Grabbing these elements
const form = document.querySelector("form.form");
const input = document.querySelector("input.add");
const submitBtn = document.querySelector("button.submit");
const nextTopicsLists = document.querySelector(".next");
const pastTopicsLists = document.querySelector(".past");

// Declaring the API link as a variable
const endpoints = "https://gist.githubusercontent.com/Pinois/93afbc4a061352a0c70331ca4a16bb99/raw/6da767327041de13693181c2cb09459b0a3657a1/topics.json";
let items = [];

// Fetching the data form the API
async function fetchdata() {
    const response = await fetch(endpoints);
    const data = await response.json();
    console.log(data);

    // Displaying the lists
    function showLists() {
        return data.map(person => { 
            return `
            <article data-id="${person.id}" value="${person.id}" class="article">
                <ul>
                    <li>
                        <li><p>${person.title}</p></li>
                        <li><button type="button" class="acrchive"> Archive </button></li>
                    </li>
                    <li>
                        <li>
                            <ul>
                                <li><button type="button" class="increase">Increase</button></li>
                                <li>${person.upvotes}</li>
                            </ul>
                        </li>
                        <li>
                            <ul>
                                <li><button type="button" class="decrease">Decrease</button></li>
                                <li>${person.downvotes}</li>
                            </ul>
                        </li>
                    </li>
                </ul>
            </article>
            `
        }).join("");
    }
    const showPeople = () => {
        const html = showLists(items);
        nextTopicsLists.innerHTML = html;
    }
    showPeople();
}



fetchdata();

















// const initLocalStorage = () => {
//     const stringFromLS = localStorage.getItem('persons');
//     const lsItems = JSON.parse(stringFromLS);
//     if (lsItems) {
//         persons = lsItems;
//         showPeople();
//     }
//     container.dispatchEvent(new CustomEvent('listUpdated'));
// };
// const updateLocalStorage = () => {
//     localStorage.setItem('persons', JSON.stringify(persons));
// };
// // Adding eventListner in the updateLocalStorage
// container.addEventListener("listUpdated", updateLocalStorage);
// initLocalStorage();
