using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Web_Project.Models;

namespace Web_Project.Controllers
{
    public class HomeController : Controller
    {
        private Random rand = new Random(DateTime.Now.Millisecond);
        private int MaxStar = 5;
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult AboutOnePiece()
        {
            return View();
        }

        [HttpGet]
        public ActionResult AddImage()
        {
            return View();
        }
        [HttpPost]
        public ActionResult AddImage(string name)
        {
            var path = Server.MapPath("~/");            
            var f = Request.Files;
            var img = f[0];
            var ext = Path.GetExtension(f[0].FileName);
            var imgPath = Path.Combine(path, "Images", name + ext);
            img.SaveAs(imgPath);
            return View();
        }

        public JsonResult JsonList()
        {
            var path = Server.MapPath("~/"); 
            var imgPath = Path.Combine(path, "Images");
            var list = Directory.GetFiles(imgPath);
            var listImg = list.Select(BuildImage);
            return Json(listImg, JsonRequestBehavior.AllowGet);
        }

        public Image BuildImage(string path)
        {
            var filename = Path.GetFileName(path);
            Image image = new Image
            {
                Name = Path.GetFileNameWithoutExtension(filename),
                Extension = Path.GetExtension(path),
                Url = Url.Content("~/Images/" + filename),
                Star = rand.Next(MaxStar)
            };
            return image;
        }
        [HttpPost]
        public ActionResult RemoveImage(string url)
        {
            var path = Server.MapPath(url);
            System.IO.File.Delete(path);

            //return Json(true);
            return View("Index");
        }


	}
}