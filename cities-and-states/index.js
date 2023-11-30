import { promises as fs } from 'fs';

init();

async function init() {
  await createFiles();
  // await getCitiesCount();
  // getStatesWithMoreOrLessCities(true);
  // getStatesWithMoreOrLessCities(false);
}

async function createFiles() {
  // Lendo o arquivo de Estados
  let data = await fs.readFile('./src/files/Estados.json');
  const states = JSON.parse(data);

  // Lendo o arquivo de Cidades
  data = await fs.readFile('./src/files/Cidades.json');
  const cities = JSON.parse(data);

  // Salvando arquivos de cada Estado com todas suas respectivas Cidades
  for (state of states) {
    const stateCities = cities.filter((city) => city.Estado === state.ID);
    await fs.writeFile(`./src/states/${state.Sigla}.json`, JSON.stringify(stateCities));
  }
}

/*
async function getCitiesCount(uf) {
  const data = await fs.readFile(`./src/states/${uf}.json`);
  const cities = JSON.parse(data);
  return cities.length;
}

async function getStatesWithMoreOrLessCities(more) {
  const states = JSON.parse(await fs.readFile('./src/files/Estados.json'));
  const list = [];

  for (state of states) {
    const count = await getCitiesCount(state.Sigla);
    list.push({ uf: state.Sigla, count });
  }

  list.sort((a, b) => {
    if (a.count < b.count) return 1;
    else if (a.count > b.count) return -1;
    else return 0;
  });

  const result = [];
  if (more) {
    list.slice(0, 5).forEach((item) => result.push(item.uf + ' = ' + item.count));
  } else {
    list.slice(-5).forEach((item) => result.push(item.uf + ' = ' + item.count));
  }

  console.log(results);
}

*/
