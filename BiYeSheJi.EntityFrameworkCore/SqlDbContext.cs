
using BiYeSheJi.Entity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BiYeSheJi.EntityFrameworkCore
{
    public class SqlDbContext : DbContext
    {
        //数据库连接字符串
        public SqlDbContext(DbContextOptions options )
            :base(options)
        {

        }
        public DbSet<StuUser> StuUsers { get; set; }
        public DbSet<Post> Posts { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Reply> Replies { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            //全局关闭EF Core数据跟踪
            optionsBuilder.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);//关闭所有查询的状态跟踪
            base.OnConfiguring(optionsBuilder);

        }
    }
}
