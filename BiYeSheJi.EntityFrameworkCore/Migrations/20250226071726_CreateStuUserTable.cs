using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BiYeSheJi.EntityFrameworkCore.Migrations
{
    /// <inheritdoc />
    public partial class CreateStuUserTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "StuUsers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserAccount = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserPwd = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StuUsers", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "StuUsers");
        }
    }
}
