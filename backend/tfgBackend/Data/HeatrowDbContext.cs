using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;


namespace tfgBackend.Data
{
    public class HeatrowDbContext : DbContext
    {
        public HeatrowDbContext(DbContextOptions<HeatrowDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Dj> Djs { get; set; }
        public DbSet<Event> Events { get; set; }
        public DbSet<Subscriber> Subscribers { get; set; }
        public DbSet<EventDj> events_djs { get; set; }
        public DbSet<GalleryItem> GalleryItems { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EventDj>()
                .HasKey(ed => new { ed.event_id, ed.dj_id });

            modelBuilder.Entity<EventDj>()
                .HasOne(ed => ed.Event)
                .WithMany(e => e.events_djs)
                .HasForeignKey(ed => ed.event_id);

            modelBuilder.Entity<EventDj>()
                .HasOne(ed => ed.Dj)
                .WithMany(d => d.events_djs)
                .HasForeignKey(ed => ed.dj_id);
        }
    }

    public class User
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Role { get; set; }
        public DateTime? Created_At { get; set; }
    }

    public class Dj
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Bio { get; set; }
        public string? Image { get; set; }
        public ICollection<EventDj> events_djs { get; set; }
    }

    public class Event
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public DateTime? Date { get; set; }
        public string? Location { get; set; }
        public string? Image { get; set; }
        public string? Dice_Link { get; set; }
        public DateTime? Created_At { get; set; }
        public bool IsActive { get; set; } = true;
        public string? TimeSlot { get; set; }
        public ICollection<EventDj> events_djs { get; set; }
    }

    public class EventDj
    {
        public int event_id { get; set; }
        public Event Event { get; set; }
        public int dj_id { get; set; }
        public Dj Dj { get; set; }
    }

    public class Subscriber
    {
        public int Id { get; set; }
        public string? Email { get; set; }
        [Column("subscribed_at")]
        public DateTime? SubscribedAt { get; set; }
        public bool Active { get; set; }
    }

    [Table("gallery_items")]
    public class GalleryItem
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Type { get; set; }
        [Column("file_path")]
        public string? FilePath { get; set; }
        [Column("created_at")]
        public DateTime CreatedAt { get; set; }
        [Column("is_active")]
        public bool IsActive { get; set; } = true;
    }
}
