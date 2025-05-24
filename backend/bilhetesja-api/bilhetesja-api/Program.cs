using bilhetesja_api.Data;
using bilhetesja_api.Services.Interface;
using bilhetesja_api.Services;
using bilhetesja_api.Validators;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using bilhetesja_api.Repository.Interfaces;
using bilhetesja_api.Repository;
using Microsoft.Extensions.FileProviders;
using bilhetesja_api.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using bilhetesja_api.Middlewares;
using Stripe;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<BilheteJaDbContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddValidatorsFromAssemblyContaining<UserCreateDtoValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<UserUpdateDtoValidator>();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddScoped<IEventRepository, EventRepository>();
builder.Services.AddScoped<IEventService, bilhetesja_api.Services.EventService>();
builder.Services.AddValidatorsFromAssemblyContaining<EventCreateDtoValidator>();

builder.Services.AddScoped<IOrganizerRequestRepository, OrganizerRequestRepository>();
builder.Services.AddScoped<IOrganizerRequestService, OrganizerRequestService>();
builder.Services.AddValidatorsFromAssemblyContaining<OrganizerRequestCreateDtoValidator>();

builder.Services.AddScoped<ITicketTypeRepository, TicketTypeRepository>();
builder.Services.AddScoped<ITicketTypeService, TicketTypeService>();
builder.Services.AddValidatorsFromAssemblyContaining<TicketTypeCreateDtoValidator>();

builder.Services.AddScoped<ITicketRepository, TicketRepository>();
builder.Services.AddScoped<ITicketService, TicketService>();
builder.Services.AddValidatorsFromAssemblyContaining<TicketCreateDtoValidator>();

builder.Services.AddScoped<IWalletRepository, WalletRepository>();
builder.Services.AddScoped<IWalletTransactionRepository, WalletTransactionRepository>();
builder.Services.AddScoped<ITicketRepository, TicketRepository>();
builder.Services.AddScoped<IPaymentRepository, PaymentRepository>();
builder.Services.AddScoped<IStripeService, StripeService>();

builder.Services.AddScoped<IEmailService, EmailService>();


builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddSingleton<JwtTokenGenerator>();

object value = builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
        };
    });

StripeConfiguration.ApiKey = builder.Configuration["Stripe:SecretKey"];
builder.Services.AddHttpContextAccessor();
builder.Services.AddDirectoryBrowser(); 
builder.Services.AddCors(); 



builder.Services.AddControllers();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseDefaultFiles();
app.UseStaticFiles();

app.UseDirectoryBrowser(new DirectoryBrowserOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "uploads")),
    RequestPath = "/uploads"
});

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();
app.UseMiddleware<ExceptionMiddleware>();
app.UseAuthorization();
app.UseAuthorization();


app.MapControllers();

app.Run();
