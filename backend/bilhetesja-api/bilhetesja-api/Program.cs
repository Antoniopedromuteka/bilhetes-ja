using bilhetesja_api.Data;
using bilhetesja_api.Services.Interface;
using bilhetesja_api.Services;
using bilhetesja_api.Validators;
using FluentValidation;
using Microsoft.EntityFrameworkCore;
using bilhetesja_api.Repository.Interfaces;
using bilhetesja_api.Repository;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<BilheteJaDbContext>(options => options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddAutoMapper(typeof(Program));

builder.Services.AddValidatorsFromAssemblyContaining<UserCreateDtoValidator>();
builder.Services.AddValidatorsFromAssemblyContaining<UserUpdateDtoValidator>();

builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddScoped<IEventRepository, EventRepository>();
builder.Services.AddScoped<IEventService, EventService>();
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

app.UseAuthorization();

app.MapControllers();

app.Run();
