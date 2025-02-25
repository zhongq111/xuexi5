using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BiYeSheJi.Entity
{
    public class PageData<TEnity>
    {
        public List<TEnity> List{ get; set; }
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int Total { get; set; } 
    }
}
