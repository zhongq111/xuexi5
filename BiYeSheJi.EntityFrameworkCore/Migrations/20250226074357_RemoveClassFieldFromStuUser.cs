using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BiYeSheJi.EntityFrameworkCore.Migrations
{
    /// <inheritdoc />
    public partial class RemoveClassFieldFromStuUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Class",
                table: "StuUsers");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Class",
                table: "StuUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
