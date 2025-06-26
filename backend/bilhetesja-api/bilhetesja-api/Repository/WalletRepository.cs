using bilhetesja_api.Data;
using bilhetesja_api.Entities;
using bilhetesja_api.Repository.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace bilhetesja_api.Repository
{
    public class WalletRepository : IWalletRepository
    {
        private readonly BilheteJaDbContext _context;
        public WalletRepository(BilheteJaDbContext context) => _context = context;

        public async Task<Wallet?> GetByUserIdAsync(int userId) =>
            await _context.Wallets.Include(w => w.Transacoes).FirstOrDefaultAsync(w => w.UsuarioId == userId);

        public async Task AddAsync(Wallet wallet)
        {
            await _context.Wallets.AddAsync(wallet);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Wallet wallet)
        {
            _context.Wallets.Update(wallet);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateBalanceAsync(int walletId, decimal amountToAdd)
        {
            await _context.Database.ExecuteSqlInterpolatedAsync(
                $"UPDATE Wallets SET SaldoDisponivel = SaldoDisponivel + {amountToAdd} WHERE Id = {walletId}"
            );
        }

        public async Task<int> GetOrCreateWalletIdAsync(int userId)
        {
            var walletId = await _context.Wallets
                .Where(w => w.UsuarioId == userId)
                .Select(w => w.Id)
                .FirstOrDefaultAsync();

            if (walletId > 0) return walletId;

            var newWallet = new Wallet
            {
                UsuarioId = userId,
                SaldoDisponivel = 0
            };

            _context.Wallets.Add(newWallet);
            await _context.SaveChangesAsync();

            return newWallet.Id;
        }
    }
}
