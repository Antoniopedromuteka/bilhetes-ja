namespace bilhetesja_api.Validators
{
    using bilhetesja_api.DTOs.Event;
    using FluentValidation;

    public class EventCreateDtoValidator : AbstractValidator<EventCreateDto>
    {
        public EventCreateDtoValidator()
        {
            RuleFor(e => e.Nome).NotEmpty().MaximumLength(255);
            RuleFor(e => e.Descricao).NotEmpty();
            RuleFor(e => e.CategoriaId).NotEmpty();
            RuleFor(e => e.Local).MaximumLength(255);
            RuleFor(e => e.ImagemId)
            .GreaterThan(0)
            .When(e => e.ImagemId.HasValue);
            RuleFor(e => e.DataEvento).GreaterThan(DateTime.Now);
            RuleFor(e => e.LotacaoTotal).GreaterThan(0);
            RuleFor(e => e.OrganizadorId).NotEmpty();
        }
    }

}
