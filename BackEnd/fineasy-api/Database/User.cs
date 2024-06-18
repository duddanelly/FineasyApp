using Microsoft.AspNetCore.Identity;

namespace fineasy_api.Database
{
    public class User : IdentityUser
    {
        public float Balance { get; set; }
    }
}
