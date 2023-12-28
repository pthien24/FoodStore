using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FoodStore.Web.Migrations
{
    /// <inheritdoc />
    public partial class InitialFixReview : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PokemonId",
                table: "Review");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PokemonId",
                table: "Review",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
