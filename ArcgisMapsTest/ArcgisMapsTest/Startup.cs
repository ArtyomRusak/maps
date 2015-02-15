using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(ArcgisMapsTest.Startup))]
namespace ArcgisMapsTest
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
