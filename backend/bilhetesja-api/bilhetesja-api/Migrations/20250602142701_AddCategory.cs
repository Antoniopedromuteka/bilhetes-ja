using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace bilhetesja_api.Migrations
{
    /// <inheritdoc />
    public partial class AddCategory : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Categoria",
                table: "Events");

            migrationBuilder.AddColumn<int>(
                name: "CategoriaId",
                table: "Events",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Nome = table.Column<string>(type: "TEXT", nullable: false),
                    IconUrl = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Events_CategoriaId",
                table: "Events",
                column: "CategoriaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Events_Categories_CategoriaId",
                table: "Events",
                column: "CategoriaId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Events_Categories_CategoriaId",
                table: "Events");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropIndex(
                name: "IX_Events_CategoriaId",
                table: "Events");

            migrationBuilder.DropColumn(
                name: "CategoriaId",
                table: "Events");

            migrationBuilder.AddColumn<string>(
                name: "Categoria",
                table: "Events",
                type: "TEXT",
                maxLength: 100,
                nullable: false,
                defaultValue: "");
        }
    }
}
