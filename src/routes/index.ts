import express from 'express';
import { readFile, writeFile } from 'fs/promises';

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

  // processamento dos dados
  let list: string[] = [];

  //formatação de texto
  try {
    const data = await readFile(dataSource, {encoding: 'utf-8'});
    list = data.split('\n');
  } catch(err) {}

  list.push(name);
  await writeFile(dataSource, list.join('\n'));

  res.status(201).json({ contato: name });

});

export default router;