using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace fineasy_api.Migrations
{
    /// <inheritdoc />
    public partial class UserRelations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "UserId",
                schema: "identity",
                table: "Transactions",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "UserId",
                schema: "identity",
                table: "Categories",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Transactions_UserId",
                schema: "identity",
                table: "Transactions",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Categories_UserId",
                schema: "identity",
                table: "Categories",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Categories_AspNetUsers_UserId",
                schema: "identity",
                table: "Categories",
                column: "UserId",
                principalSchema: "identity",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Transactions_AspNetUsers_UserId",
                schema: "identity",
                table: "Transactions",
                column: "UserId",
                principalSchema: "identity",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Categories_AspNetUsers_UserId",
                schema: "identity",
                table: "Categories");

            migrationBuilder.DropForeignKey(
                name: "FK_Transactions_AspNetUsers_UserId",
                schema: "identity",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Transactions_UserId",
                schema: "identity",
                table: "Transactions");

            migrationBuilder.DropIndex(
                name: "IX_Categories_UserId",
                schema: "identity",
                table: "Categories");

            migrationBuilder.DropColumn(
                name: "UserId",
                schema: "identity",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "UserId",
                schema: "identity",
                table: "Categories");
        }
    }
}
