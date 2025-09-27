import { v4 as uuidv4 } from "uuid";
import { Router } from "express";
import models from "../models";

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

router.post("/", (req, res) => {
  const id = uuidv4();
  const message = {
    id,
    text: req.body.text,
    userId: req.context.me.id,
  };

  req.context.models.messages[id] = message;

  return res.send(message);
});

router.delete("/:messageId", (req, res) => {
  const { [req.params.messageId]: message, ...otherMessages } =
    req.context.models.messages;

  req.context.models.messages = otherMessages;

  return res.send(message);
});

export default router;
