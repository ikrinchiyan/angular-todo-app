using System.Collections.Generic;
using TodoApp.Api.Models;

namespace TodoApp.Api.DataAccess
{
    public interface ITodoItemsRepository
    {
        TodoItemModel Add(TodoItemModel item);
        bool Delete(int id);
        IEnumerable<TodoItemModel> GetAll();
        TodoItemModel GetById(int id);
        TodoItemModel Update(TodoItemModel item);
    }
}