using NUnit.Framework;
using System;
using System.Linq;
using TodoApp.Api.DataAccess;
using TodoApp.Api.Models;

namespace TodoApp.Api.Tests
{
    [TestFixture]
    public class TodoItemsRepositoryTest
    {
        private ITodoItemsRepository _itemsRepository;

        [SetUp]
        public void Setup()
        {
            _itemsRepository = new TodoItemsRepository();
        }

        [Test]
        public void GetAll_WhenNoItemsAdded_ShouldReturnTwoItems()
        {
            var items = _itemsRepository.GetAll();

            Assert.NotNull(items);
            Assert.AreEqual(items.Count(), 2);
        }

        [Test]
        public void GetAll_WhenOneItemAdded_ShouldHaveThisItemSaved()
        {
            var items = _itemsRepository.GetAll();
            Assert.AreEqual(items.Count(), 2);

            var newItem = new TodoItemModel()
            {
                Id = 0,
                Name = "TestName",
                IsChecked = false
            };

            newItem = _itemsRepository.Add(newItem);
            Assert.IsTrue(newItem.Id > 0);

            items = _itemsRepository.GetAll();
            Assert.AreEqual(items.Count(), 3);

            var itemFromRepo = items.FirstOrDefault(x => x.Id == newItem.Id);
            Assert.NotNull(itemFromRepo);
        }

        [Test]
        public void Update_WhenUpdatingExisting_ShouldSucceed()
        {
            var items = _itemsRepository.GetAll();
            var lastItem = items.Last();

            lastItem.Name = "Name" + DateTime.Now.Ticks.ToString();
            _itemsRepository.Update(lastItem);

            var itemsAfterUpdate = _itemsRepository.GetAll();
            var updatedItem = itemsAfterUpdate.First(x => x.Id == lastItem.Id);

            Assert.NotNull(updatedItem);
            Assert.AreEqual(updatedItem.Name, lastItem.Name);
        }

        [Test]
        public void Delete_WhenOneItemDeleted_ShouldReturnProperListOfItems()
        {
            var items = _itemsRepository.GetAll();
            Assert.AreEqual(items.Count(), 2);

            var lastItem = items.Last();

            _itemsRepository.Delete(lastItem.Id);

            items = _itemsRepository.GetAll();
            Assert.AreEqual(items.Count(), 1);
        }
    }
}