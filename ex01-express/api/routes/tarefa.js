import { Router } from "express";
import models from "../models/index.js";

const router = Router();

router.get("/", async (req, res) => {
  const { userId } = req.query;
  const whereOptions = userId ? { where: { userId } } : {};

  const tarefas = await models.Tarefa.findAll(whereOptions);
  
  return res.status(200).send(tarefas);
});

router.get("/:tarefaId", async (req, res) => {
  const id = req.params.tarefaId;

  const tarefa = await models.Tarefa.findOne({
    where: { id: id },
  });

  if (tarefa == null) {
    return res.status(404).send("Tarefa não localizada");
  }

  return res.status(200).send(tarefa);
});

router.post("/", async (req, res) => {
  const data = req.body;

  const novaTarefa = await models.Tarefa.create(data);

  return res.status(201).send(novaTarefa);
});

router.put("/:tarefaId", async (req, res) => {
  const id = req.params.tarefaId;

  const tarefa = await models.Tarefa.findOne({
    where: { id: id },
  });

  if (tarefa == null) {
    return res.status(404).send("Tarefa não localizada");
  }

  const { descricao, concluida } = req.body;

  tarefa.set({
    descricao: descricao ?? tarefa.descricao,
    concluida: concluida ?? tarefa.concluida,
  });

  await tarefa.save();

  return res.status(200).send(tarefa);
});

router.delete("/:tarefaId", async (req, res) => {
  const id = req.params.tarefaId;

  await models.Tarefa.destroy({
    where: { id: id },
  });

  return res.status(204).send();
});

export default router;