using fineasy_api.Database;
using fineasy_api.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Security.Claims;

namespace fineasy_api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CategoryController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        public CategoryController(ApplicationDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpPost]
        [Authorize]
        public Category Create([FromBody] CreateCategoryRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            User user = _context.Users.FirstOrDefault(user => user.Id == userId);

            var category = new Category
            {
                Color = request.Color,
                Description = request.Description,
                User = user
            };

            _context.Categories.Add(category);

            _context.SaveChanges();
            return category;
        }

        [Authorize]
        [HttpGet]
        public IList<Category> GetAll()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

             
            var categories = _context.Categories.Where(category => category.User.Id == userId).ToList();
            Console.WriteLine(categories);
            return categories;
        }

        public record CreateCategoryRequest(string Description, string Color);
    }
}
