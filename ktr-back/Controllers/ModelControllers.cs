using ktr_back.Models;
using ktr_back.Services;

namespace ktr_back.Controllers
{
    public class OrganizationsController : BaseCrudController<Organization>
    {
        public OrganizationsController(IGenericSupabaseService<Organization> service) : base(service) { }
    }
    
    public class EquipmentController : BaseCrudController<Equipment>
    {
        public EquipmentController(IGenericSupabaseService<Equipment> service) : base(service) { }
    }

    public class EquipmentAvailabilityController : BaseCrudController<EquipmentAvailability>
    {
        public EquipmentAvailabilityController(IGenericSupabaseService<EquipmentAvailability> service) : base(service) { }
    }
    
    public class BookingsController : BaseCrudController<Booking>
    {
        public BookingsController(IGenericSupabaseService<Booking> service) : base(service) { }
    }
    
    public class TransactionsController : BaseCrudController<Transaction>
    {
        public TransactionsController(IGenericSupabaseService<Transaction> service) : base(service) { }
    }
    
    public class UsageRecordsController : BaseCrudController<UsageRecord>
    {
        public UsageRecordsController(IGenericSupabaseService<UsageRecord> service) : base(service) { }
    }
}