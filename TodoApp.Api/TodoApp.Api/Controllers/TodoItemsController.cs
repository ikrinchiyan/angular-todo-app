using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using TodoApp.Api.DataAccess;
using TodoApp.Api.Models;

namespace TodoApp.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TodoItemsController : ControllerBase
    {
        private readonly ILogger<TodoItemsController> _logger;
        private readonly ITodoItemsRepository _repo;

        public TodoItemsController(ILogger<TodoItemsController> logger, ITodoItemsRepository repo)
        {
            _logger = logger;
            _repo = repo;
        }

        [HttpGet]
        public ActionResult<IEnumerable<TodoItemModel>> Get()
        {
            return Ok(_repo.GetAll());
        }

        [HttpPost]
        public ActionResult<TodoItemModel> Post([FromBody] TodoItemModel item)
        {
            if(item == null)
            {
                throw new ArgumentException(nameof(item));
            }

            return _repo.Add(item);
        }
    }
}
