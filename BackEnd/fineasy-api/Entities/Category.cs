using fineasy_api.Database;

namespace fineasy_api.Entities
{
    public class Category : BaseEntity
    {
        public User User { get; set; }
        public string Description { get; set; }
        public string Color { get; set; }
    }
}
