using BiYeSheJi.Entity;
using BiYeSheJi.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;

namespace BiYeSheJi.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PostController : ControllerBase
    {
        private readonly SqlDbContext _context;

        public PostController(SqlDbContext context)
        {
            _context = context;
        }

        [HttpPost("CreatePost")]
        public IActionResult CreatePost([FromBody] Post post)
        {
            if (post == null)
            {
                return BadRequest(new { success = false, message = "帖子数据不能为空" });
            }

            _context.Posts.Add(post);
            _context.SaveChanges();

            return Ok(new { success = true, message = "帖子发布成功" });
        }

        [HttpGet("GetPosts")]
        public IActionResult GetPosts()
        {
            var posts = _context.Posts.ToList();
            return Ok(posts);
        }

        [HttpGet("GetRandomPosts")]
        public IActionResult GetRandomPosts()
        {
            var allPosts = _context.Posts.ToList();
            var randomPosts = new List<Post>();
            var random = new Random();

            while (randomPosts.Count < 5 && allPosts.Count > 0)
            {
                var randomIndex = random.Next(0, allPosts.Count);
                randomPosts.Add(allPosts[randomIndex]);
                allPosts.RemoveAt(randomIndex);
            }

            return Ok(randomPosts);
        }
        [HttpPost("CreateComment")]
        public IActionResult CreateComment([FromBody] Comment comment)
        {
            if (comment == null)
            {
                return BadRequest(new { success = false, message = "评论数据不能为空" });
            }

            _context.Comments.Add(comment);
            _context.SaveChanges();

            return Ok(new { success = true, message = "评论发布成功" });
        }

        // 新增接口，用于创建回复
        [HttpPost("CreateReply")]
        public IActionResult CreateReply([FromBody] Reply reply)
        {
            if (reply == null)
            {
                return BadRequest(new { success = false, message = "回复数据不能为空" });
            }

            _context.Replies.Add(reply);
            _context.SaveChanges();

            return Ok(new { success = true, message = "回复发布成功" });
        }

        // 新增接口，用于获取帖子的评论和回复
        [HttpGet("GetPostCommentsAndReplies/{postId}")]
        public IActionResult GetPostCommentsAndReplies(int postId)
        {
            var post = _context.Posts
                .Include(p => p.Comments)
                    .ThenInclude(c => c.Replies)
                .FirstOrDefault(p => p.PostId == postId);

            if (post == null)
            {
                return NotFound(new { success = false, message = "帖子未找到" });
            }

            return Ok(post.Comments);
        }
    }
}