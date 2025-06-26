using bilhetesja_api.Data;
using bilhetesja_api.Entities;
using bilhetesja_api.Repository.Interfaces;
using System;

namespace bilhetesja_api.Repository
{
    public class WalletTransactionRepository : IWalletTransactionRepository
    {
        private readonly BilheteJaDbContext _context;
        public WalletTransactionRepository(BilheteJaDbContext context) => _context = context;

        public async Task AddAsync(WalletTransaction transaction)
        {
            await _context.WalletTransactions.AddAsync(transaction);
            await _context.SaveChangesAsync();
        }
    }
}
