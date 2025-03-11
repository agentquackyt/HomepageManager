import { JWT, Router } from "husky-routing";
import Content from "../util/ContentType"
import { ViewHtml } from "viewhtml";
import { getUserLanguage } from "../util/LanguageUtils";


const data = {
    app_title: "Deltos Solutions",
    site_logo: "SchoolSite CMS <h3 style='color: #888; font-size: small'>by Deltos Solutions</h3>",
    // poly data
    news_count: 12,
    news_trend: "+5 last week",
    teacher_count: 51,
    department_count: 5,
    visit_count: 12504,
    news: [
        { news_title: "School resumes", news_date: "2024-09-01", news_author: "Jonas Gaden" },
        { news_title: "Parent-Teacher Conference", news_date: "2024-10-15", news_author: "Maria Chen" },
        { news_title: "Winter Break Schedule", news_date: "2024-11-20", news_author: "David Wilson" },
        { news_title: "Science Fair Winners", news_date: "2024-10-05", news_author: "Sarah Johnson" },
        { news_title: "Sports Day Announcement", news_date: "2024-09-25", news_author: "Michael Torres" },
        { news_title: "New Library Resources", news_date: "2024-09-10", news_author: "Emma Rodriguez" }
    ],
    orders: [ // states: paid, failed, pending
        {order_id: 1, order_date: "2021-01-01", customer_name: "Jonas Gaden", state: "paid", order_amount: 100.00},
        {order_id: 2, order_date: "2021-02-15", customer_name: "Maria Chen", state: "pending", order_amount: 245.99},
        {order_id: 3, order_date: "2021-03-22", customer_name: "Alex Johnson", state: "paid", order_amount: 89.50},
        {order_id: 4, order_date: "2021-04-10", customer_name: "Sarah Williams", state: "failed", order_amount: 175.25},
        {order_id: 5, order_date: "2021-05-05", customer_name: "Jonas Gaden", state: "paid", order_amount: 320.75},
        {order_id: 6, order_date: "2021-06-18", customer_name: "Emma Rodriguez", state: "pending", order_amount: 150},
        {order_id: 7, order_date: "2021-07-30", customer_name: "Michael Brown", state: "paid", order_amount: 430.5}
    ]
} as Record<string, any>;

const router = new Router("/api/html");
router
    .get("/dashboard", async (req) => {
        return new Response(
            await new ViewHtml(await Bun.file("./src/pages/dashboard/index.html").text(), '$')
                .interpret(data).s("%")
                .translate("./translations/dashboard.json", getUserLanguage(req))
                .then((html) => html.toHTML()),
            Content.HTML
        )
    })
    .get("/news", async (req) => {
        return new Response(
            await new ViewHtml(await Bun.file("./src/pages/dashboard/news.html").text(), '$')
                .interpret(data)
                .s("%").translate("./translations/dashboard.json", getUserLanguage(req))
                .then((html) => html.toHTML()),
            Content.HTML
        )
    })
    .get("/teachers", async (req) => {
        return new Response(
            await new ViewHtml(await Bun.file("./src/pages/dashboard/teachers.html").text(), '$')
                .interpret(data)
                .s("%").translate("./translations/dashboard.json", getUserLanguage(req))
                .then((html) => html.toHTML()),
            Content.HTML
        )
    })
    .get("/news/:id", async (req, params) => {
        return new Response(JSON.stringify(data.news[params.id]), Content.JSON)
    })
    .get("/teacher", async (req) => {
        return new Response(JSON.stringify(data.teacher_count), Content.JSON)
    })
    .get("/department", async (req) => {
        return new Response(JSON.stringify(data.department_count), Content.JSON)
    })
    .get("/department/:id", async (req, params) => {
        return new Response(JSON.stringify(data.visit_count), Content.JSON)
    })
    .get("/pages", async (req) => {
        return new Response(JSON.stringify(data.visit_count), Content.JSON)
    })
    .get("/pages/:id", async (req, params) => {
        return new Response(JSON.stringify(data.visit_count), Content.JSON)
    })
    .get("/events", async (req) => {
        return new Response(JSON.stringify(data.visit_count), Content.JSON)
    })
    .get("/events/:id", async (req, params) => {
        return new Response(JSON.stringify(data.visit_count), Content.JSON)
    });

export default router;