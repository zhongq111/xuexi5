using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BiYeSheJi.EntityFrameworkCore.Migrations
{
    /// <inheritdoc />
    public partial class AddUserInfoFieldsToStuUser : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AvatarUrl",
                table: "StuUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Class",
                table: "StuUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "Gender",
                table: "StuUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Nickname",
                table: "StuUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "StuUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Signature",
                table: "StuUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvatarUrl",
                table: "StuUsers");

            migrationBuilder.DropColumn(
                name: "Class",
                table: "StuUsers");

            migrationBuilder.DropColumn(
                name: "Gender",
                table: "StuUsers");

            migrationBuilder.DropColumn(
                name: "Nickname",
                table: "StuUsers");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "StuUsers");

            migrationBuilder.DropColumn(
                name: "Signature",
                table: "StuUsers");
        }
    }
}
