using bilhetesja_api.DTOs.Payment;
using bilhetesja_api.Entities;
using bilhetesja_api.Repository.Interfaces;
using bilhetesja_api.Services.Interface;


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
        private readonly IEmailService _emailService;

        public PaymentService(
            IStripeService stripeService,
            IUserRepository userRepository,
            ITicketTypeRepository ticketTypeRepo,
            IWalletRepository walletRepo,
            IWalletTransactionRepository walletTransactionRepo,
            ITicketRepository ticketRepo,
            IPaymentRepository paymentRepo,
            IEmailService emailService)
        {
            _stripeService = stripeService;
            _userRepository = userRepository;
            _ticketTypeRepo = ticketTypeRepo;
            _walletRepo = walletRepo;
            _walletTransactionRepo = walletTransactionRepo;
            _ticketRepo = ticketRepo;
            _paymentRepo = paymentRepo;
            _emailService = emailService;
        }

        public async Task ProcessarPagamentoAsync(CreatePaymentRequestDto dto)
        {
            var user = await _userRepository.GetByEmailAsync(dto.Email);

            if (user == null)
            {
                user = new User
                {
                    Nome = dto.Nome,
                    Email = dto.Email,
                    SenhaHash = BCrypt.Net.BCrypt.HashPassword(Guid.NewGuid().ToString()),
                    TipoUsuario = TipoUsuario.usuario,
                    DataCriacao = DateTime.UtcNow
                };

                await _userRepository.CreateAsync(user);
            }

            var ticketType = await _ticketTypeRepo.GetByIdAsync(dto.TicketTypeId);
            if (ticketType == null || ticketType.Quantidade <= 0)
                throw new Exception("Tipo de bilhete inválido ou esgotado.");

            var stripePaymentId = await _stripeService.ProcessarPagamentoAsync(
                ticketType.Preco,
                "eur",
                $"Bilhete {ticketType.Nome}",
                dto.Email,
                dto.PaymentMethodId
            );

            var ticket = new Ticket
            {
                UsuarioId = user.Id,
                TipoId = ticketType.Id,
                Status = StatusBilhete.Ativo,
                DataCompra = DateTime.UtcNow,
                CodigoQR = Guid.NewGuid().ToString()
            };
            await _ticketRepo.AddAsync(ticket);

            var comissao = ticketType.Preco * 0.1m;
            var valorLiquido = ticketType.Preco - comissao;

            var pagamento = new Payment
            {
                TicketId = ticket.Id,
                ValorTotal = ticketType.Preco,
                Comissao = comissao,
                ValorLiquido = valorLiquido,
                Metodo = "Stripe",
                StripeId = stripePaymentId,
                Status = StatusPagamento.Sucesso,
                DataPagamento = DateTime.UtcNow
            };
            await _paymentRepo.AddAsync(pagamento);

            var organizador = ticketType.Evento!.Organizador!;
            if (organizador.Carteira == null)
            {
                organizador.Carteira = new Wallet
                {
                    UsuarioId = organizador.Id,
                    SaldoDisponivel = 0
                };
                await _walletRepo.AddAsync(organizador.Carteira);
            }

            organizador.Carteira.SaldoDisponivel += valorLiquido;
            await _walletRepo.UpdateAsync(organizador.Carteira);

            var transacao = new WalletTransaction
            {
                WalletId = organizador.Carteira.Id,
                Valor = valorLiquido,
                Descricao = $"Venda de bilhete '{ticketType.Nome}' para evento '{ticketType.Evento.Nome}'",
                Data = DateTime.UtcNow,
                TicketId = ticket.Id,
                EventoId = ticketType.Evento.Id
            };
            await _walletTransactionRepo.AddAsync(transacao);

            if (user != null)
            {
                await _emailService.SendEmailAsync(
                    to: user.Email,
                    subject: "Bem-vindo à BilhetesJá!",
                    body: $"<p>Olá {user.Nome}, sua conta foi criada com sucesso!</p>"
                );
            }

        }
    }

}
