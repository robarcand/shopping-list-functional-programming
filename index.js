'use strict';

const STORE = [
  {id: cuid(), name: "apples", checked: false},
  {id: cuid(), name: "oranges", checked: false},
  {id: cuid(), name: "milk", checked: true},
  {id: cuid(), name: "bread", checked: false} 
];

function generateItemElement(item) {
  return `
  <li data-item-id="${item.id}">
  <span class="shopping-item js-shopping-item
  ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
  <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
  </div>
  </li>`;
}

function generateShoppingItemString(shoppingList) {
  console.log('Generating shopping list element');

    const items = shoppingList.map((item, index) =>
    generateItemElement(item, index));
    return items.join('');

}

function renderShoppingList() {
  console.log('`renderShoppingList` ran');
  const shoppingListItemsString = generateShoppingItemString(STORE);

  
  $('.js-shopping-list').html(shoppingListItemsString);
}

function addItemToShoppingList(itemName) {
  console.log(`Adding "${itemName}" to shopping list`);
  STORE.push({id: cuid(), name: itemName, checked: false});
}

function handleNewItemSubmit() {
  console.log('`handleNewItemSubmit` ran');

  $('#js-shopping-list-form').submit(event => {
    event.preventDefault();
    const newItemName = $('.js-shopping-list-entry').val();
    console.log(newItemName);
    $('.js-shopping-list-entry').val('');
    addItemToShoppingList(newItemName);
    renderShoppingList();
})
}

function toggleCheckedForListItem(itemId) {
  console.log('Toggling checked property for item with id' + itemId);
  const item = STORE.find(item => item.id === itemId);
  item.checked = !item.checked;
}

function getItemIdFromElement(item) {
  return $(item)
  .closest('li')
  .data('item-id');
}

function handleItemCheckClicked() {
  

  $('.js-shopping-list').on('click', '.js-item-toggle', event => {
    console.log('`handleItemCheckClicked` ran');
    const id = getItemIdFromElement(event.currentTarget);
    toggleCheckedForListItem(id);
    renderShoppingList();
  })


}

function checkForListItem(itemId) {
  console.log()
}


function deleteListItem(itemId) {
  const itemIndex = item => item.id === itemId;
  STORE.splice(itemIndex, 1);
}

function handleDeleteItemClicked() {

  $('.js-shopping-list').on('click', '.js-item-delete', event => {
    const itemIndex = getItemIdFromElement(event.currentTarget);
    deleteListItem(itemIndex);
    renderShoppingList();
  })
  
}

function handleShoppingList() {
  renderShoppingList();
  handleNewItemSubmit();
  handleItemCheckClicked();
  handleDeleteItemClicked();
}

$(handleShoppingList);