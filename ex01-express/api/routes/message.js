import { Router } from "express";
import models from "../models";
import { where } from "sequelize";

const router = Router();

router.get("/", async (req, res) => {

  let {userId} = req.query

  let messages = await models.Message.findAll({
    where: {
      userId: userId
    }
  })
  return res.status(200).send(messages);
});

router.get("/:messageId", async (req, res) => {

  let id = req.params.messageId
  
  let message = await models.Message.findOne({
    where: {
      id: id
    }
  })

  if(message == null) return res.status(404).send("A mensagem não foi encontrada")
  return res.status(200).send(message)
});

router.post("/", async (req, res) => {
  let {userId} = req.query

  let message = await models.Message.create({
    text: req.body.text,
    userId: userId,
  })

  return res.status(201).send(message);
});

router.delete("/:messageId", (req, res) => {
  const { [req.params.messageId]: message, ...otherMessages } =
    req.context.models.messages;

  req.context.models.messages = otherMessages;

  return res.send(message);
});

export default router;
