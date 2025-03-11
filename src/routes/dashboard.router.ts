import { JWT, Router } from "husky-routing";
import Content from "../util/ContentType"
import { ViewHtml } from "viewhtml";
import { getUserLanguage } from "../util/LanguageUtils";

const data = {
    app_title: "Deltos Solutions",
    site_logo: "SchoolSite CMS <h3 style='color: #888; font-size: small'>by Deltos Solutions</h3>",
    nav_links: [
        { icon: "📊", label: "dashboard" },
        { icon: "📰", label: "news" },
        { icon: "👩‍🏫", label: "teachers", },
        // { icon: "🏫", label: "departments" },
        // { icon: "📅", label: "events" },
        // { icon: "📑", label: "pages" },
        // { icon: "⚙️", label: "settings" }

    ]
} as Record<string, any>;
const dashboardHtml = await Bun.file("./src/pages/dashboard.html").text();

const router = new Router("/dashboard");
// router.use(JWT.middleware("/login"));
router.get("/", async (req) => {
    return getDashboardFile(req, { path: "dashboard" })
})

router
    .get("/news", async (req) => {
        return getDashboardFile(req, { path: "news" })
    })
    .get("/news/:id", async (req, params) => {
        return getDashboardFile(req, { path: "news", id: params.id })
    })
    .get("/teachers", async (req) => {
        return getDashboardFile(req, { path: "teachers" })
    })
    .get("/department", async (req) => {
        return getDashboardFile(req, { path: "department" })
    })
    .get("/department/:id", async (req, params) => {
        return getDashboardFile(req, { path: "department", id: params.id })
    })
    .get("/pages", async (req) => {
        return getDashboardFile(req, { path: "pages" })
    })
    .get("/pages/:id", async (req, params) => {
        return getDashboardFile(req, { path: "pages", id: params.id })
    })
    .get("/events", async (req) => {
        return getDashboardFile(req, { path: "events" })
    })
    .get("/events/:id", async (req, params) => {
        return getDashboardFile(req, { path: "events", id: params.id })
    });


const getDashboardFile = async (req: Request, params) => {
    return new Response(
        await new ViewHtml(dashboardHtml, '$')
            .interpret({ ...data, link: `/api/html/${params.path}${params.id ? '/' + params.id : ''}` }).s("%")
            .translate("./translations/dashboard.json", getUserLanguage(req))
            .then((html) => html.toHTML()),
        Content.HTML
    )
}


export default router;