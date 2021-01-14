using Microsoft.EntityFrameworkCore.Migrations;

namespace FA20.P05.Web.Migrations
{
    public partial class tempRecords : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "StudentId",
                table: "TemperatureRecord",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StudentId",
                table: "TemperatureRecord");
        }
    }
}
