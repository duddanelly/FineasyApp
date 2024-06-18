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
    public class TransactionController : ControllerBase
    {

        private readonly ApplicationDbContext _context;
        private readonly UserManager<User> _userManager;
        public TransactionController(ApplicationDbContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpPost]
        [Authorize]
        public void Create([FromBody] CreateTransactionRequest request)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            User user = _context.Users.FirstOrDefault(user => user.Id == userId);

            Category category = _context.Categories.FirstOrDefault(category => category.Id == request.CategoryId);

            var transaction = new Transaction
            {
                Category = category,
                User = user,
                Value = request.Value,
                IsRecurrent = request.IsRecurrent,
                Date = request.Date,
                Description = request.Description,
            };

            user.Balance = user.Balance + request.Value;
            _context.Users.Update(user);

            _context.Transactions.Add(transaction);

            _context.SaveChanges();
        }

        [HttpGet]
        [Authorize]
        public IList<Transaction> GetAll()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            return _context.Transactions.Where(transaction => transaction.User.Id == userId).Include(t => t.Category).ToList();
        }

        public record CreateTransactionRequest(float Value, Guid CategoryId, bool IsRecurrent, DateTime Date, string Description);
    }
}
