using bilhetesja_api.DTOs.TicketType;
using FluentValidation;

namespace bilhetesja_api.Validators
{
    public class TicketTypeCreateDtoValidator : AbstractValidator<TicketTypeCreateDto>
    {
        public TicketTypeCreateDtoValidator()
        {
            RuleFor(x => x.Nome).NotEmpty().MaximumLength(100);
            RuleFor(x => x.Preco).GreaterThan(0);
            RuleFor(x => x.Quantidade).GreaterThan(0);
            RuleFor(x => x.EventoId).NotEmpty();
        }
    }

}
