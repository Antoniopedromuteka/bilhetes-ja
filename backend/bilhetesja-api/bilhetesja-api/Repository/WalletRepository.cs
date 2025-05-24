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
            _context.Wallets.Add(wallet);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateAsync(Wallet wallet)
        {
            _context.Wallets.Update(wallet);
            await _context.SaveChangesAsync();
        }
    }
}
