import express from 'express';
import { readFile, writeFile } from 'fs/promises';
import { createContact, deleteContact, getContacts } from '../services/contact.js';

const dataSource = './data/list.txt';

const router = express.Router();


//teste de rota;
router.get('/ping', (req, res) => {
  console.log("executou o ping!");
  res.json({ pong: true });
});

//rota para inserir contato
router.post('/contato', async (req, res) => {
  const { name } = req.body;

  if(!name || name.length < 2) {
    res.json({ error: 'Nome precisa ter pelo menos 2 caracteres.'});
    return;
  }

  await createContact(name);

  res.status(201).json({ contato: name });

});

//rota para listar contato
router.get('/contatos', async (req, res) => {
  let list = await getContacts();
  res.json({ contatos: list });
});

//rota de deletar contato
router.delete('/contato', async (req, res) => {
  const { name } = req.query;
  
  if(!name) {
  return res.json({ error: 'Precisa mandar um nome para excluir.' });
  }

  await deleteContact(name as string);

  res.json({ contato: name });
});

export default router;