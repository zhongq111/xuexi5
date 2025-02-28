using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BiYeSheJi.Entity
{
    public class Reply
    {
        public int ReplyId { get; set; }
        public int CommentId { get; set; }
        public string Nickname { get; set; }
        public string ReplyText { get; set; }
        public Comment? Comment { get; set; }
    }
}
