using bilhetesja_api.Entities;

namespace bilhetesja_api.Repository.Interfaces
{
    public interface IPaymentRepository
    {
        Task AddAsync(Payment payment);
    }
}
