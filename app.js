let dati = [];
let ls = window.localStorage;
const tabella = document.getElementById('tabellaDati');

const generaId = () => {
  return '_' + Math.random().toString(36).substr(2, 9);
};

const newAnagrafica = () => {
  const fldNome = document.getElementById('nome');
  const fldCognome = document.getElementById('cognome');

  const record = {
    id: generaId(),
    nome: fldNome.value,
    cognome: fldCognome.value
  };

  dati.push(record);
  ls.setItem(`record_${ dati.length }`, anagraficaStringa(record));
  ls.setItem('nRecord', dati.length + '');

  tabella.appendChild(generaRiga(record));

  fldNome.value = '';
  fldCognome.value = '';
};


const generaRiga = ({ nome, cognome/*, id*/ }) => { //record -> nome, cognome, id
  let tr = document.createElement('tr');
  tr.innerHTML = `
    <tr>
        <td>${ nome }</td>
        <td>${ cognome }</td>
    </tr>
  `;
  return tr;
};

const recuperaDati = () => {
  console.log(ls);
  const nRecord = ls.getItem('nRecord');
  for (let i = 1; i <= nRecord; i++) {
    if (ls.getItem(`record_${ i }`)) {
      const record = parseAnagrafica(ls.getItem(`record_${ i }`));
      dati.push(record);
      tabella.appendChild(generaRiga(record));
    }
  }
  document.getElementById('btnCarica').disabled = true;
};

const anagraficaStringa = ({ nome, cognome, id }) => {
  return `${ nome }###${ cognome }###${ id }`;
};

const parseAnagrafica = strAnagrafica => {
  const arrAnagrafica = strAnagrafica.split('###');
  return {
    nome: arrAnagrafica[0],
    cognome: arrAnagrafica[1],
    id: arrAnagrafica[2]
  };
};

/*
 @fixme: gestione corretta dell'eliminazione nel local storage
 * */
/*
 const deleteAnagrafica = id => {
 console.log(id);
 console.log(dati);
 let trovato = null;
 let i = 0;
 while (!trovato && i < dati.length) {
 if (dati[i].id === id) {
 dati.splice(i, 1);
 tabella.removeChild(tabella.childNodes[i]);
 if (ls.getItem(`record_${ i + 1 }`)) {
 ls.removeItem(`record_${ i + 1 }`);
 console.log(ls);
 }
 trovato = true;
 }
 }
 if (!trovato)
 alert('errore, id non trovato');
 };
 */


document
  .getElementById('btnSalva')
  .addEventListener('click', newAnagrafica);

document
  .getElementById('btnCarica')
  .addEventListener('click', recuperaDati);