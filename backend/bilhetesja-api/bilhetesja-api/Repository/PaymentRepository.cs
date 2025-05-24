using bilhetesja_api.Data;
using bilhetesja_api.Entities;
using bilhetesja_api.Repository.Interfaces;
using System;

namespace bilhetesja_api.Repository
{
    public class PaymentRepository : IPaymentRepository
    {
        private readonly BilheteJaDbContext _context;
        public PaymentRepository(BilheteJaDbContext context) => _context = context;

        public async Task AddAsync(Payment payment)
        {
            _context.Payments.Add(payment);
            await _context.SaveChangesAsync();
        }
    }
}
