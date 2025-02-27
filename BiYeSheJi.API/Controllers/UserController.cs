// BiYeSheJi.API/Controllers/UserController.cs
using BiYeSheJi.Entity;
using BiYeSheJi.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BiYeSheJi.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly SqlDbContext _context;

        public UserController(SqlDbContext context)
        {
            _context = context;
        }

        [HttpPost("Login")]
        public IActionResult Login([FromBody] LoginRequest request)
        {
            var user = _context.StuUsers.FirstOrDefault(u => u.UserAccount == request.UserAccount && u.UserPwd == request.UserPwd);
            if (user != null)
            {
                return Ok(new { success = true });
            }
            else
            {
                return Ok(new { success = false, message = "用户名或密码错误" });
            }
        }

        [HttpPost("Register")]
        public IActionResult Register([FromBody] RegisterRequest request)
        {
            // 验证用户名是否已存在
            if (_context.StuUsers.Any(u => u.UserAccount == request.Username))
            {
                return BadRequest(new { success = false, message = "用户名已存在" });
            }

            var newUser = new StuUser
            {
                UserAccount = request.Username,
                UserPwd = request.Password,
                AvatarUrl = "", // 提供默认值
                Nickname = "",
                Gender = 0,
                Signature = "",
                Phone = ""
            };

            _context.StuUsers.Add(newUser);
            _context.SaveChanges();

            return Ok(new { success = true, message = "注册成功" });
        }

        // 新增获取用户信息的接口
        [HttpGet("GetUserInfo")]
        public IActionResult GetUserInfo(string userAccount)
        {
            var user = _context.StuUsers.FirstOrDefault(u => u.UserAccount == userAccount);
            if (user != null)
            {
                return Ok(new
                {
                    avatarUrl = user.AvatarUrl,
                    nickname = user.Nickname,
                    gender = user.Gender,
                    signature = user.Signature,
                    phone = user.Phone
                });
            }
            else
            {
                return NotFound(new { success = false, message = "用户信息未找到" });
            }
        }
    }

    public class LoginRequest
    {
        public string UserAccount { get; set; }
        public string UserPwd { get; set; }
    }

    public class RegisterRequest
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}