import 'reflect-metadata';
import app from "./src/core/express";
import config from "./src/config/config";
import cron from "node-cron"
import Notification from "./src/util/notification";

const port = config.port

if (!module.parent){
    cron.schedule('* * * * *', () => {
        console.log(`Running cronjob at ${(new Date()).toUTCString()}`)
        const notification = new Notification()
        notification.sendAll()
    })

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}

export default app
