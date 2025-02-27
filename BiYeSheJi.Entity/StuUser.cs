using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BiYeSheJi.Entity
{
    public class StuUser
    {
        public int Id { get; set; }
        public string UserAccount { get; set; }
        public string UserPwd { get; set; }
        public string AvatarUrl { get; set; } // 头像，存储Base64编码的图片数据
        public string Nickname { get; set; } // 昵称
        public int Gender { get; set; } // 性别，1 表示男，2 表示女，其他表示未知
        public string Signature { get; set; } // 签名
        public string Phone { get; set; } // 手机号
    }
}