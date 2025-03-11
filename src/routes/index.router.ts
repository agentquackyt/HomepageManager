import { JWT, Router } from "husky-routing";
import { ViewHtml } from "viewhtml";
import { getUserLanguage } from "../util/LanguageUtils";
import Content from "../util/ContentType"

import LoginHtmlRaw from "./../pages/login.html" with { type: "text" };
import LandingHtmlRaw from "./../pages/index.html" with { type: "text" };

/*await Bun.file("./src/pages/login.html").text() */
const data = {
    app_title: "Deltos Solutions",
    site_logo: "SchoolSite CMS <span style='color: #888; font-size: small'>by Deltos Solutions</span>",
    hero_image_url: "/img/hero.png",
}
const loginHtml = new ViewHtml(LoginHtmlRaw, '$').interpret(data).toHTML();
const landingHtml = new ViewHtml(LandingHtmlRaw, '$').interpret(data).toHTML();

const router = new Router("")
    .get("/", async (req) => {
        return new Response(
            await new ViewHtml(landingHtml, '%').translate("./translations/landing.json", getUserLanguage(req)).then((html) => html.toHTML()),
        Content.HTML)
    })
    .get("/login", async (req) => {
        return new Response(
            await new ViewHtml(loginHtml, '%').translate("./translations/login.json", getUserLanguage(req)).then((html) => html.toHTML()),
        Content.HTML)
    })
    .post("/login", (req) => {

        // do login stuff
        // if login is successful
        JWT.sign
        return Response.redirect("/dashboard")
    });

router.get("/css/styles.css", (req) => new Response(Bun.file("./src/static/styles.css"), { headers: { "Content-Type": "text/css" } }))
router.get("/js/htmx.min.js", (req) => new Response(Bun.file("./src/static/htmx.min.js"), { headers: { "Content-Type": "text/javascript" } }))
router.get("/img/:file", async (req, params) => {
    let { file } = params;
    if ( !(/\.(png|jpg|jpeg|gif|svg)$/i.test(file))) return new Response("Invalid file type", { status: 400 });
    console.log(file);
    if (await Bun.file(`./src/img/${file}`).exists()) return new Response(Bun.file(`./src/img/${file}`));
    return new Response("File not found", { status: 404 });
});


export default router;