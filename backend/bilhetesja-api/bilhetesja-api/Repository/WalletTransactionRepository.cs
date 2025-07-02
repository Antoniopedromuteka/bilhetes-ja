using bilhetesja_api.Data;
using bilhetesja_api.Entities;
using bilhetesja_api.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;
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

        public async Task<List<WalletTransaction>> GetByWalletIdAsync(int walletId)
        {
            return await _context.WalletTransactions
                .Where(t => t.WalletId == walletId)
                .OrderByDescending(t => t.Data)
                .ToListAsync();
        }

        public async Task<List<WalletTransaction>> GetByFilterAsync(int userId, string? period)
        {
            var query = _context.WalletTransactions
                .Where(wt => wt.Wallet!.UsuarioId == userId)
                .AsQueryable();

            var today = DateTime.UtcNow.Date;

            if (!string.IsNullOrWhiteSpace(period))
            {
                switch (period.ToLower())
                {
                    case "hoje":
                        query = query.Where(wt => wt.Data == today);
                        break;

                    case "esta_semana":
                        var startOfWeek = today.AddDays(-(int)today.DayOfWeek + (int)DayOfWeek.Monday);
                        var endOfWeek = startOfWeek.AddDays(7);
                        query = query.Where(wt => wt.Data >= startOfWeek && wt.Data < endOfWeek);
                        break;

                    case "este_mes":
                        query = query.Where(wt => wt.Data.Month == today.Month && wt.Data.Year == today.Year);
                        break;

                    case "este_ano":
                        query = query.Where(wt => wt.Data.Year == today.Year);
                        break;
                }
            }

            return await query
                .OrderByDescending(x => x.Data)
                .ToListAsync();
        }
    }
}
