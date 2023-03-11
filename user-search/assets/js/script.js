let allUsers = [];

let inputSearchUser = null;
let btnSearchUser = null;
let tabUsers = null;
let tabStatics = null;
let spinnerLoading = null;

let countUsers = 0;

const MINIMUM_LENGTH_SEARCH = 1;

const formatter = Intl.NumberFormat('pt-BR');

let countMale = 0;
let countFemale = 0;
let sumAges = 0;
let averageAges = 0;

window.addEventListener('load', () => {
  fetchUsers();

  parseHTMLToJS();
  addEvents();
  enableControls();

  showNoUsers();
  showNoStatistics();
});

async function fetchUsers() {
  const res = await fetch('https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo');
  const json = await res.json();

  // prettier-ignore
  allUsers = json.results.map(user => {
    const { login, name, dob, gender, picture } = user;
    const {first, last} = name;

    return {
      id: login.uuid,
      name: `${name.first} ${name.last}`,
      gender,
      age: dob.age,
      picture: picture.large,
    };
  });
}

function parseHTMLToJS() {
  inputSearchUsers = document.querySelector('#inputSearchUser');
  btnSearchUsers = document.querySelector('#btnSearchUser');
  countUsers = document.querySelector('#countUsers');
  tabUsers = document.querySelector('#tabUsers');
  tabStatics = document.querySelector('#tabStatics');
  spinnerLoading = document.querySelector('#spinnerLoading');
  totalGenderM = document.querySelector('#totalGenderM');
  totalGenderF = document.querySelector('#totalGenderF');
  sumAges = document.querySelector('#sumAges');
  averageAges = document.querySelector('#averageAges');
}

function addEvents() {
  inputSearchUsers.addEventListener('keyup', handleInputChange);
  btnSearchUsers.addEventListener('click', () => filterUsers(prepareSearch(inputSearchUsers.value)));
}

function handleInputChange({ target }) {
  const searchText = prepareSearch(target.value);
  const length = searchText.length;

  btnSearchUsers.disabled = length < MINIMUM_LENGTH_SEARCH;

  if (event.key !== 'Enter') {
    return;
  }
  if (length < MINIMUM_LENGTH_SEARCH) {
    return;
  }

  filterUsers(searchText);
}

function filterUsers(searchText) {
  const lowerCaseSearchText = searchText.toLowerCase();

  const filteredUsers = users.filter((user) => {
    return user.filterName.includes(lowerCaseSearchText);
  });

  handleFilteredUsers(filteredUsers);
}

function handleFilteredUsers(users) {
  if (users.length === 0) {
    showNoUsers();
    showNoStatistics();
  }

  showUsers(users);
  showStatisticsFrom(users);
}

function showNoStatistics() {
  divStatistics.innerHTML = `<h2>Nada a ser exibido</h2>`;
}

function showNoUsers() {
  divUsers.innerHTML = `<h2>Nenhum usuário filtrado</h2>`;
}

function showUsers(users) {
  const h2 = document.createElement('h2');
  h2.textContent = users.length + ' usuário(s) encontrado(s)';

  const ul = document.createElement('ul');

  users.map(({ name, picture, age }) => {
    const li = document.createElement('li');
    li.classList.add('flex-row');

    const img = `<img class='avatar' src='${picture}' alt='${name}' />`;
    const span = `<span>${name}, ${age} anos</span>`;

    li.innerHTML = `${img} ${span}`;

    ul.appendChild(li);
  });

  divUsers.innerHTML = '';
  divUsers.appendChild(h2);
  divUsers.appendChild(ul);
}

function showStatisticsFrom(users) {
  const countMale = users.filter((user) => user.gender === 'male').length;
  const countFemale = users.filter((user) => user.gender === 'female').length;
  const sumAges = users.reduce((acc, curr) => acc + curr.age, 0);
  const averageAges = parseFloat((sumAges / users.length || 0).toFixed(2), 10);
  console.log(averageAges);

  divStatistics.innerHTML = `
      <h2>Estatísticas</h2>

      <ul>
        <li>Sexo masculino: <strong>${countMale}</strong></li>
        <li>Sexo feminino: <strong>${countFemale}</strong></li>
        <li>Soma das idades: <strong>${formatValue(sumAges)}</strong></li>
        <li>Média das idades: <strong>${formatValue(averageAges)}</strong></li>
      </ul>    
    `;
}

function formatValue(value) {
  return formatter.format(value);
}
