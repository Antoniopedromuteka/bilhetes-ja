namespace bilhetesja_api.Validators
{
    using bilhetesja_api.DTOs.User;
    using FluentValidation;

    public class UserCreateDtoValidator : AbstractValidator<UserCreateDto>
    {
        public UserCreateDtoValidator()
        {
            RuleFor(x => x.Nome)
                .NotEmpty().WithMessage("O nome é obrigatório.")
                .MaximumLength(255);

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("O email é obrigatório.")
                .EmailAddress().WithMessage("Email inválido.")
                .MaximumLength(255);

            RuleFor(x => x.Telefone)
                .MaximumLength(20).When(x => !string.IsNullOrEmpty(x.Telefone));

            RuleFor(x => x.Senha)
                .NotEmpty().WithMessage("A senha é obrigatória.")
                .MinimumLength(6).WithMessage("A senha deve ter no mínimo 6 caracteres.");

            RuleFor(x => x.TipoUsuario)
                .IsInEnum().WithMessage("Tipo de usuário inválido.");
        }
    }

}
