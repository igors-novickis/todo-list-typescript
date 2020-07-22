import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { validate } from "class-validator";
import { FindManyOptions } from "typeorm";

import { ToDo } from "../entity/ToDo";

class ToDoController {
  static list = async (req: Request, res: Response): Promise<Response> => {
    const { status, skip, take } = req.query;
    const toDoRepository = getRepository(ToDo);
    const userId = res.locals.jwtPayload.userId;

    const options = <FindManyOptions<ToDo>>{
      select: ["id", "task", "status", "created_at", "updated_at"],
      where: { user_id: userId }
    };

    // Add status parameter to query, only if it is specified in request
    if (status) {
      options.where = { user_id: userId, status: Number(status) };
    }

    // Add skipping specified count of entries, if it was specified
    if (skip) {
      options.skip = Number(skip);
    }

    // Take only specified amount of entries, if it was specified
    if (take) {
      options.take = Number(take);
    }

    const toDoList = await toDoRepository.find(options);

    // Return list of task entries
    res.send(toDoList);
    return;
  };

  static add = async (req: Request, res: Response): Promise<Response> => {
    const userId = res.locals.jwtPayload.userId; // Get authorized user ID from JWT payload

    const { task } = req.body;
    const toDo = new ToDo();

    toDo.task = task;
    toDo.user_id = userId;

    // Validate data
    const errors = await validate(toDo);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    const toDoRepository = getRepository(ToDo);
    try {
      await toDoRepository.save(toDo);
    } catch (e) {
      res
        .status(400)
        .send(
          "Error occurred when trying to save new task. Please try again or contact administrator."
        );
      return;
    }

    // Return successful status and newly created data
    res.status(201).send(toDo);
    return;
  };

  static update = async (req: Request, res: Response): Promise<Response> => {
    const userId = res.locals.jwtPayload.userId; // Get authorized user ID from JWT payload
    const id = req.params.id; // Get ID from URL param
    const { status, task } = req.body;

    const toDoRepository = getRepository(ToDo);
    let toDo: ToDo;
    try {
      toDo = await toDoRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("ToDo task not found");
      return;
    }

    // Validate if task belongs to authorized user
    if (toDo.user_id !== userId) {
      res.status(404).send("ToDo task not found");
    }

    // Update task data
    if (status) {
      toDo.status = status;
    }

    if (task) {
      toDo.task = task;
    }

    const errors = await validate(toDo);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    try {
      await toDoRepository.save(toDo);
    } catch (e) {
      res
        .status(400)
        .send(
          "Error occurred when trying to save new task. Please try again or contact administrator."
        );
      return;
    }

    res.status(204).send();
    return;
  };

  static delete = async (req: Request, res: Response): Promise<Response> => {
    const userId = res.locals.jwtPayload.userId; // Get authorized user ID from JWT payload
    const id = req.params.id; // Get ID from URL param

    const toDoRepository = getRepository(ToDo);
    let toDo: ToDo;

    // Validate if task exists
    try {
      toDo = await toDoRepository.findOneOrFail(id);
    } catch (error) {
      res.status(404).send("ToDo task not found");
      return;
    }

    // Validate if task belongs to authorized user
    if (toDo.user_id !== userId) {
      res.status(404).send("ToDo task not found");
    }

    // Delete task
    await toDoRepository.delete(id);

    res.status(204).send();
    return;
  };
}

export default ToDoController;
