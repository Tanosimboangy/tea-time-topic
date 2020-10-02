// import { form, input, submiBtn, nextTopicsLists, pastTopicsLists } from '../lib/';

// // Storing the data into the local storage
// export const initLocalStorage = () => {
//     const stringFromLS = localStorage.getItem('items');
//     const lsItems = JSON.parse(stringFromLS);
//     if (lsItems) {
//         items = lsItems;
//         showPeople(items);
//     }
//     nextTopicsLists.dispatchEvent(new CustomEvent('listUpdated'));
// };
// export const updateLocalStorage = () => {
//     localStorage.setItem('items', JSON.stringify(items));
// };
// // ADDING EVENTLISTENER IN THE LOCALSTORAGE
// nextTopicsLists.addEventListener("listUpdated", updateLocalStorage);
// initLocalStorage();
