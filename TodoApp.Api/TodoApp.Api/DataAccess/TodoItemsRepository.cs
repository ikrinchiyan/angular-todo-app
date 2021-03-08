using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using TodoApp.Api.Exceptions;
using TodoApp.Api.Models;

namespace TodoApp.Api.DataAccess
{
    public class TodoItemsRepository : ITodoItemsRepository
    {
        //Immitation of a db
        private List<TodoItemModel> _items = new List<TodoItemModel>
        {
            new TodoItemModel()
            {
                Id = 1,
                IsChecked = false,
                Name = "Add a Todo item"
            },

            new TodoItemModel()
            {
                Id = 2,
                IsChecked = true,
                Name = "Mark Item as Completed"
            }
        };

        /// <summary>
        /// Get all items
        /// </summary>
        public IEnumerable<TodoItemModel> GetAll()
        {
            return _items;
        }

        /// <summary>
        /// Get item by id
        /// </summary>
        /// <param name="id">Todo item's id</param>
        public TodoItemModel GetById(int id)
        {
            var item = _items.FirstOrDefault(x => x.Id == id);
            if (item == null)
            {
                throw new NotFoundException($"Item with id = {id} not found");
            }
            return item;
        }

        /// <summary>
        /// Add a new item
        /// </summary>
        /// <param name="item">Item to add</param>
        public TodoItemModel Add(TodoItemModel item)
        {
            if (item == null)
            {
                throw new ArgumentNullException(nameof(item));
            }

            var lastId = _items.LastOrDefault()?.Id ?? 0;
            item.Id = lastId + 1;

            item.Name = CleanItemName(item.Name);

            _items.Add(item);
            return item;
        }

        /// <summary>
        /// Update an existing item
        /// </summary>
        /// <param name="item">Item to update</param>
        public TodoItemModel Update(TodoItemModel item)
        {
            var itemIndex = _items.FindIndex(x => x.Id == item.Id);

            if (itemIndex < 0)
            {
                throw new NotFoundException($"Item with id = {item.Id} not found");
            }

            item.Name = CleanItemName(item.Name);

            _items[itemIndex] = item;
            return item;
        }

        /// <summary>
        /// Delete an existing item
        /// </summary>
        /// <param name="id">id of item to delete</param>
        public bool Delete(int id)
        {
            var itemToDelete = GetById(id);
            _items.Remove(itemToDelete);

            return true;
        }

        private string CleanItemName(string name)
        {
            return Regex.Replace(name, @"[<>]", "");
        }
    }
}
