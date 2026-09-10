using ktr_back.Models;
using ktr_back.Services;

namespace ktr_back.Controllers
{
    public class AccessGrantsController : BaseCrudController<AccessGrant>
    {
        public AccessGrantsController(IGenericSupabaseService<AccessGrant> service) : base(service) { }
    }
    
    public class BookingsController : BaseCrudController<Booking>
    {
        public BookingsController(IGenericSupabaseService<Booking> service) : base(service) { }
    }
    
    public class EscrowAccountsController : BaseCrudController<EscrowAccount>
    {
        public EscrowAccountsController(IGenericSupabaseService<EscrowAccount> service) : base(service) { }
    }
    
    public class InstitutionsController : BaseCrudController<Institution>
    {
        public InstitutionsController(IGenericSupabaseService<Institution> service) : base(service) { }
    }
    
    public class PaymentTransactionsController : BaseCrudController<PaymentTransaction>
    {
        public PaymentTransactionsController(IGenericSupabaseService<PaymentTransaction> service) : base(service) { }
    }
    
    public class ResourceAllocationsController : BaseCrudController<ResourceAllocation>
    {
        public ResourceAllocationsController(IGenericSupabaseService<ResourceAllocation> service) : base(service) { }
    }
}
