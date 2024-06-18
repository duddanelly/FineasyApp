using fineasy_api.Database;

namespace fineasy_api.Entities
{
    public class Transaction : BaseEntity
    {
        public User User { get; set; }
        public float Value { get; set; }
        public DateTime Date { get; set; }
        public Category Category { get; set; }
        public bool IsRecurrent { get; set; }
        public string Description { get; set; }
    }
}
