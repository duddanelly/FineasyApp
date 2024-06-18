using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace fineasy_api.Migrations
{
    /// <inheritdoc />
    public partial class DateCreated : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateCreated",
                schema: "identity",
                table: "Transactions",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DateCreated",
                schema: "identity",
                table: "Categories",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateCreated",
                schema: "identity",
                table: "Transactions");

            migrationBuilder.DropColumn(
                name: "DateCreated",
                schema: "identity",
                table: "Categories");
        }
    }
}
