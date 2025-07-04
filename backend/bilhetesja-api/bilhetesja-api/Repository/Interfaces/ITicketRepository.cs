﻿namespace bilhetesja_api.Repository.Interfaces
{
    using bilhetesja_api.Entities;

    public interface ITicketRepository
    {
        Task<IEnumerable<Ticket>> GetAllAsync();
        Task<Ticket?> GetByIdAsync(int id);
        Task AddAsync(Ticket ticket);
        void Delete(Ticket ticket);
        Task<bool> SaveChangesAsync();

        Task<IEnumerable<Ticket?>> GetByEventId(int id);

        Task<IEnumerable<Ticket?>> GetByUserId(int id);

        Task<IEnumerable<Ticket>> GetAllAsync(StatusBilhete? status);
        Task UpdateAsync(Ticket ticket);

        Task<bool> ExistsAsync(int id);

    }

}
