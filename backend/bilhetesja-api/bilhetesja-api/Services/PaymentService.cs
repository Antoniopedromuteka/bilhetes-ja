using bilhetesja_api.Data;
using bilhetesja_api.DTOs.Payment;
using bilhetesja_api.Entities;
using bilhetesja_api.Repository.Interfaces;
using bilhetesja_api.Services.Interface;
using Microsoft.EntityFrameworkCore;

namespace bilhetesja_api.Services
{
    public class PaymentService : IPaymentService
    {
        private readonly IStripeService _stripeService;
        private readonly IUserRepository _userRepository;
        private readonly ITicketTypeRepository _ticketTypeRepo;
        private readonly IWalletRepository _walletRepo;
        private readonly IWalletTransactionRepository _walletTransactionRepo;
        private readonly ITicketRepository _ticketRepo;
        private readonly IPaymentRepository _paymentRepo;
        private readonly IEventRepository _eventRepo;
        private readonly BilheteJaDbContext _context;

        public PaymentService(
            IStripeService stripeService,
            IUserRepository userRepository,
            ITicketTypeRepository ticketTypeRepo,
            IWalletRepository walletRepo,
            IWalletTransactionRepository walletTransactionRepo,
            ITicketRepository ticketRepo,
            IPaymentRepository paymentRepo,
            IEventRepository eventRepo,
            BilheteJaDbContext context)
        {
            _stripeService = stripeService;
            _userRepository = userRepository;
            _ticketTypeRepo = ticketTypeRepo;
            _walletRepo = walletRepo;
            _walletTransactionRepo = walletTransactionRepo;
            _ticketRepo = ticketRepo;
            _paymentRepo = paymentRepo;
            _eventRepo = eventRepo;
            _context = context;
        }

        public async Task ProcessarPagamentoAsync(CreatePaymentRequestDto dto)
        {
            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                var userId = await _userRepository.GetIdByEmailAsync(dto.Email);
                if (userId == 0)
                    throw new Exception("Usuário não registrado. Crie uma conta antes de comprar.");

                var ticketTypeInfo = await _ticketTypeRepo.GetByIdAsync(dto.TicketTypeId);
                if (ticketTypeInfo == null || ticketTypeInfo.Quantidade <= 0)
                    throw new Exception("Tipo de bilhete inválido ou esgotado.");

                var stripePaymentId = await _stripeService.ProcessarPagamentoAsync(
                    ticketTypeInfo.Preco,
                    "eur",
                    $"Bilhete {ticketTypeInfo.Nome}",
                    dto.Email,
                    dto.PaymentMethodId
                );

                await _ticketTypeRepo.UpdateQuantityOnlyAsync(ticketTypeInfo.Id, ticketTypeInfo.Quantidade - 1);

                var ticketId = await CreateTicketDirectlyAsync(userId, ticketTypeInfo.Id);

                var comissao = ticketTypeInfo.Preco * 0.1m;
                var valorLiquido = ticketTypeInfo.Preco - comissao;

                await CreatePaymentDirectlyAsync(ticketId, ticketTypeInfo.Preco, comissao, valorLiquido, stripePaymentId);

                var organizadorId = await _eventRepo.GetOrganizerIdByEventIdAsync(ticketTypeInfo.EventoId);

                var walletId = await _walletRepo.GetOrCreateWalletIdAsync(organizadorId);

                await _walletRepo.UpdateBalanceAsync(walletId, valorLiquido);

                var eventoNome = await _eventRepo.GetEventNameByIdAsync(ticketTypeInfo.EventoId);
                await CreateWalletTransactionDirectlyAsync(
                    walletId,
                    valorLiquido,
                    $"Venda de bilhete '{ticketTypeInfo.Nome}' para evento '{eventoNome}'",
                    ticketId,
                    ticketTypeInfo.EventoId
                );

                await transaction.CommitAsync();
            }
            catch
            {
                await transaction.RollbackAsync();
                throw;
            }
        }

        private async Task<int> CreateTicketDirectlyAsync(int userId, int ticketTypeId)
        {
            var ticketId = _context.Tickets.Max(t => t.Id) + 1;
            var qrCode = Guid.NewGuid().ToString();
            var now = DateTime.UtcNow;

            await _context.Database.ExecuteSqlInterpolatedAsync(
                $@"INSERT INTO Tickets (Id, UsuarioId, TipoId, Status, DataCompra, CodigoQR)
                   VALUES ({ticketId}, {userId}, {ticketTypeId}, {(int)StatusBilhete.Ativo}, {now}, {qrCode})"
            );

            return ticketId;
        }

        private async Task CreatePaymentDirectlyAsync(
            int ticketId,
            decimal valorTotal,
            decimal comissao,
            decimal valorLiquido,
            string stripePaymentId)
        {
            var now = DateTime.UtcNow;

            await _context.Database.ExecuteSqlInterpolatedAsync(
                $@"INSERT INTO Payments (TicketId, ValorTotal, Comissao, ValorLiquido, Metodo, StripeId, Status, DataPagamento)
                   VALUES ({ticketId}, {valorTotal}, {comissao}, {valorLiquido}, 'Stripe', {stripePaymentId}, 
                           {(int)StatusPagamento.Sucesso}, {now})"
            );
        }

        private async Task CreateWalletTransactionDirectlyAsync(
            int walletId,
            decimal valor,
            string descricao,
            int ticketId,
            int eventoId)
        {
            var now = DateTime.UtcNow;

            await _context.Database.ExecuteSqlInterpolatedAsync(
                $@"INSERT INTO WalletTransactions (WalletId, Valor, Descricao, Data, TicketId, EventoId)
                   VALUES ({walletId}, {valor}, {descricao}, {now}, {ticketId}, {eventoId})"
            );
        }
    }
}