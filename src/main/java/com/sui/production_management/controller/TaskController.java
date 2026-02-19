package com.sui.production_management.controller;

import com.sui.production_management.Entity.Task;
import com.sui.production_management.repository.TaskRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TaskController {

  @Autowired
  TaskRepository taskRepository;

  @GetMapping("/order")
  public List<Task> getAllTasks() {
    return taskRepository.findAll();
  }


  @PostMapping("/order")
  public Task createTask(@RequestBody Task task){
    return  taskRepository.save(task);
  }
}
