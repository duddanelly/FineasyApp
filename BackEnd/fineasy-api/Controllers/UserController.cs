using fineasy_api.Database;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

[ApiController]
[Route("[controller]")]
public class UserController : ControllerBase
{



    private readonly ApplicationDbContext _context;
    private readonly UserManager<User> _userManager;
    public UserController(ApplicationDbContext context, UserManager<User> userManager)
    {
        _context = context;
        _userManager = userManager;
    }

    [Authorize]
    [HttpGet]
    public User Get()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return _context.Users.FirstOrDefault(user => user.Id == userId);
    }
}