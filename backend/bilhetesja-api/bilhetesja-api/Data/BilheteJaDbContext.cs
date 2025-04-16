﻿using bilhetesja_api.Entities;
using Microsoft.EntityFrameworkCore;

namespace bilhetesja_api.Data
{
    public class BilheteJaDbContext : DbContext
    {
        public BilheteJaDbContext(DbContextOptions<BilheteJaDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<TicketType> TicketTypes { get; set; }
        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<Payment> Payments { get; set; }
        public DbSet<OrganizerRequest> OrganizerRequests { get; set; }
        public DbSet<Wallet> Wallets { get; set; }
        public DbSet<WalletTransaction> WalletTransactions { get; set; }
        public DbSet<Image> Images { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<Event>(entity =>
            {
                entity.Property(e => e.Status)
                .HasDefaultValue(StatusEvento.Pendente);
            });

            modelBuilder.Entity<User>()
                .HasOne(u => u.OrganizerRequest)
                .WithOne(o => o.Usuario)
                .HasForeignKey<OrganizerRequest>(o => o.UsuarioId);

            modelBuilder.Entity<User>()
                .HasOne(u => u.Carteira)
                .WithOne(w => w.Usuario)
                .HasForeignKey<Wallet>(w => w.UsuarioId);

            modelBuilder.Entity<User>()
           .HasOne(u => u.Imagem)
           .WithMany(i => i.Usuarios)
           .HasForeignKey(u => u.ImagemId)
           .OnDelete(DeleteBehavior.SetNull);

            modelBuilder.Entity<Event>()
           .HasOne(e => e.Imagem)
           .WithMany(i => i.Eventos)
           .HasForeignKey(e => e.ImagemId)
           .OnDelete(DeleteBehavior.SetNull);
        }

    }
}
