using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using TodoApp.Api.DataAccess;
using TodoApp.Api.Models;

namespace TodoApp.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TodoItemController : ControllerBase
    {
        private readonly ILogger<TodoItemController> _logger;
        private readonly ITodoItemsRepository _repo;

        public TodoItemController(ILogger<TodoItemController> logger, ITodoItemsRepository repo)
        {
            _logger = logger;
            _repo = repo;
        }

        [HttpPut]
        public ActionResult<TodoItemModel> Put([FromBody] TodoItemModel item)
        {
            if(item == null)
            {
                throw new ArgumentNullException(nameof(item));
            }

            if(item.Id <= 0)
            {
                throw new ArgumentException("Id must be > 0", nameof(item.Id));
            }

            return _repo.Update(item);
        }

        [HttpDelete("{id:long}")]
        public ActionResult<bool> Delete(int id)
        {
            if(id <= 0)
            {
                throw new ArgumentException("Id must be > 0", nameof(id));
            }

            return _repo.Delete(id);
        }
    }
}
