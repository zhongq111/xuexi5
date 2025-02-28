using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BiYeSheJi.Entity
{
    public class Post
    {
        public int PostId { get; set; }
        public string? Title { get; set; }
        public string? Content { get; set; }
        public string? AvatarUrl { get; set; }
        public string? Nickname { get; set; }
        public string? UserAccount { get; set; }
        public List<Comment>? Comments { get; set; }
    }
}
