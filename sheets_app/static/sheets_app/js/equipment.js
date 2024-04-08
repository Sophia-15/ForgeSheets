const name = document.querySelector('input[name="name"]');
const quantity = document.querySelector('input[name="quantity"]');
const attack = document.querySelector('input[name="attack"]');
const defense = document.querySelector('input[name="defense"]');

const editName = document.querySelector('input[name="editName"]');
const editQuantity = document.querySelector('input[name="editQuantity"]');
const editAttack = document.querySelector('input[name="editAttack"]');
const editDefense = document.querySelector('input[name="editDefense"]');

const addEquipmentBtn = document.querySelector('#addEquipmentBtn');
const closeEquipmentBtn = document.querySelector('#closeEquipmentBtn')

const editEquipmentBtn = document.querySelector('#editEquipmentBtn');
const closeEditEquipmentBtn = document.querySelector('#closeEditEquipmentBtn')

const openEquipmentModal = document.querySelector('.openEquipmentBtn')
const openEditEquipmentBtn = document.querySelector('.editEquipment');
const removeEquipmentBtn = document.querySelector('.removeEquipment')

const equipmentModal = document.querySelector('.equipmentModal')
const editEquipmentModal = document.querySelector('.editEquipmentModal')

let context = document.getElementById('context').getAttribute('data-context');
if (context) {
  context = JSON.parse(context.replace(/'/g, '"'));
}

let equipmentString = '';
let equipmentList = [];
let selectedEquipmentToEdit;
let equipmentNode;


const StorageService = {
  saveData() {
    localStorage.setItem('equipments', JSON.stringify(equipmentList))
  },
  getData() {
    return  JSON.parse(localStorage.getItem('equipments')) || []
  },
  removeData() {
    localStorage.removeItem('equipments')
  }
}

function areEqual(num1, num2) {
  const epsilon = 0.0000001; // Define uma margem de erro para a comparação
  return Math.abs(num1 - num2) < epsilon;
}


function handleCloseEquipmentModal() {
  equipmentModal.style.display = 'none';
}

function handleOpenEquipmentModal() {
  equipmentModal.style.display = 'flex';
}

function handleCloseEditEquipmentModal() {
  editEquipmentModal.style.display = 'none';
}

function handleOpenEditEquipmentModal(selectedEquipment) {
  editEquipmentModal.style.display = 'flex';
  editName.value = selectedEquipment.name;
  editQuantity.value = selectedEquipment.quantity;
  editAttack.value = selectedEquipment.attack;
  editDefense.value = selectedEquipment.defense;
}

function handleError(message, className) {
  const error =       
  `
    <span> 
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-octagon-alert"><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
      ${message}
    </span>
  `
  const node = new DOMParser().parseFromString(error, 'text/html').body.firstElementChild
  document.querySelector(`.${className}`).appendChild(node)
}

function handleLoadHtmlList(equipment) {
  return (
    `
      <li data-id="${equipment.local_id}">
      <div>
        <input type="hidden" name="equipmentName" value="${equipment.name}" />
        <input type="hidden" name="equipmentQnt" value="${equipment.quantity}" />
        <input type="hidden" name="equipmentAtk" value="${equipment.attack}" />
        <input type="hidden" name="equipmentDef" value="${equipment.defense}" />
      </div>
      ${equipment.quantity}x ${equipment.name}- Atk: ${equipment.attack} | Def: ${equipment.defense}
      <button type="button" class="editEquipment">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
      </button>
      <button type="button" class="removeEquipment" onclick="handleGetEditEquipmentInfo(this)">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
      </button>
    </li>
    `
  )
}

function handleAddEquipmentToList() {
  const equipment = {
    local_id: Math.random(),
    name: name.value,
    quantity: Number(quantity.value), 
    attack: Number(attack.value),
    defense: Number(defense.value)
  };

  const nameExists = equipmentList.some(
    (equipmentItem) => equipmentItem.name.toLowerCase() === equipment.name.toLowerCase());

  if (equipment.name === '') {
    handleError('Esse campo não pode ser vazio', 'equipmentName')
    return
  }
  if (nameExists) {
    handleError('Esse equipamento já existe', 'equipmentName')
    return
  }
  if (equipment.name.length > 55) {
    handleError('O nome deve ser menor que 55 caracteres', 'equipmentName')
    return
  }
  if (equipment.name.length < 2) {
    handleError('Este campo deve ter mais de 2 caracteres', 'equipmentName')
    return
  }

  if (equipment.quantity < 1) {
    handleError('A quantidade não pode ser inferior a 1', 'equipmentQuantity')
    return
  }

  if (equipment.attack < 0) {
    handleError('O valor de ataque não pode ser inferior a 0', 'equipmentAttack')
    return
  }

  if (equipment.defense < 0) {
    handleError('O valor de defesa não pode ser inferior a 0', 'equipmentDefense')
    return
  }

  if (!Number.isInteger(equipment.quantity)) {
    handleError('Utilize apenas números inteiros', 'equipmentQuantity')
    return
  }

  if (!Number.isInteger(equipment.attack)) {
    handleError('Utilize apenas números inteiros', 'equipmentAttack')
    return
  }

  if (!Number.isInteger(equipment.defense)) {
    handleError('Utilize apenas números inteiros', 'equipmentDefense')
    return
  }

  equipmentList.push(equipment);
  StorageService.saveData();

  equipmentString += handleLoadHtmlList(equipment);

  const node = new DOMParser().parseFromString(equipmentString, 'text/html').body.firstElementChild
  document.querySelector('.equipmentList').appendChild(node)
  handleCloseEquipmentModal();
  equipmentString = ''; 
  name.value = '';
  quantity.value = 1;
  attack.value = 0;
  defense.value = 0;
}

function handleGetEditEquipmentInfo(equipment) {
  const selectedEquipmentId = equipment.parentNode.getAttribute('data-id');
  equipmentNode = equipment.parentNode;

  const selectedEquipment = equipmentList.filter((equipmentItem) => equipmentItem.local_id == selectedEquipmentId)[0];
  selectedEquipmentToEdit = selectedEquipment;

  handleOpenEditEquipmentModal(selectedEquipment)
}

function handleEditEquipment() {
  selectedEquipmentToEdit.name = editName.value; 
  selectedEquipmentToEdit.quantity = Number(editQuantity.value); 
  selectedEquipmentToEdit.attack = Number(editAttack.value); 
  selectedEquipmentToEdit.defense = Number(editDefense.value); 

  const equipmentListFiltered = equipmentList.filter((item, index, self) =>
    index === self.findIndex((t) => (
      areEqual(t.local_id, item.local_id)
    ))
  );

  StorageService.removeData();
  StorageService.saveData();

  document.querySelector('.equipmentList').innerHTML = '';

  equipmentListFiltered.forEach((equipmentItem) => {
    equipmentString += handleLoadHtmlList(equipmentItem);
  })

  document.querySelector('.equipmentList').innerHTML = equipmentString;
  equipmentString = '';
  handleCloseEditEquipmentModal();
}

function handleDeleteEquipment(equipment) {
  const selectedEquipmentId = equipment.parentNode.getAttribute('data-id');
  equipmentList.filter((equipmentItem) => selectedEquipmentId !== equipmentItem.local_id)
  console.log(selectedEquipmentId)
}

openEquipmentModal?.addEventListener('click', () => handleOpenEquipmentModal());
addEquipmentBtn?.addEventListener('click', () => handleAddEquipmentToList());
removeEquipmentBtn?.addEventListener('click', () => handleDeleteEquipment(this));
editEquipmentBtn?.addEventListener('click', () => handleEditEquipment());
openEditEquipmentBtn?.addEventListener('click', () => handleEditEquipment(this));
closeEquipmentBtn?.addEventListener('click', () => handleCloseEquipmentModal());
closeEditEquipmentBtn?.addEventListener('click', () => handleCloseEditEquipmentModal());
