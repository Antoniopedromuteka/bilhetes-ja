namespace bilhetesja_api.Validators
{
    using FluentValidation;
    using bilhetesja_api.DTOs.Ticket;

    public class TicketCreateDtoValidator : AbstractValidator<TicketCreateDto>
    {
        public TicketCreateDtoValidator()
        {
            RuleFor(x => x.UsuarioId).NotEmpty();
            RuleFor(x => x.TipoId).NotEmpty();
        }
    }

}
