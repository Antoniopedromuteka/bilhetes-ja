namespace bilhetesja_api.Entities
{
    public class Wallet
    {
        public int Id { get; set; }

        public decimal SaldoDisponivel { get; set; }

        public required int UsuarioId { get; set; }
        public User? Usuario { get; set; }

        public ICollection<WalletTransaction> Transacoes { get; set; } = new List<WalletTransaction>();

    }

}
