using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace ArcgisMapsTest.Controllers
{
  public class MapController : Controller
  {
    // GET: Map
    public ActionResult ViewMap()
    {
      return View();
    }

    public ActionResult ViewOpenMap()
    {
      return View();
    }

    public ActionResult ViewOpenMapAngular()
    {
      return View();
    }
  }
}