import { Color, Husky, Output } from "husky-routing";

const app = new Husky({
    logging: {
        allowError: true,
        allowInfo: true,
        allowHTTP: true,
        allowWS: false
    }
});

// adding routers
import indexRouter from "./src/routes/index.router";
app.use(indexRouter);

import dashboardRouter from "./src/routes/dashboard.router";
app.use(dashboardRouter);

import apiRouter from "./src/routes/api.router";
app.use(apiRouter);

// logging
console.log(Color.cyan);
Output.center(Color.magenta+"Welcome to Husky-Routing!"+Color.cyan, true);
const serverInstance = app.start({ port: 3000, callback: (port) => Output.info(`Server started on port ${port}`)});