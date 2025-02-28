using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BiYeSheJi.Entity
{
    public class Comment
    {
        public int CommentId { get; set; }
        public int PostId { get; set; }
        public required string AvatarUrl { get; set; }
        public required string Nickname { get; set; }
        public required string CommentText { get; set; }
        public required Post Post { get; set; }
        public required List<Reply> Replies { get; set; }
    }
}
