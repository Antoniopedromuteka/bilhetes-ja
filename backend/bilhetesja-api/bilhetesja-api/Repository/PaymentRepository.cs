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
            await _context.Payments.AddAsync(payment);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
