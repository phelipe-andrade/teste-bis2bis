import schedule from "node-schedule";
import StartCollect from "./StartCollect.js";
export default function () {
  schedule.scheduleJob('01 * * * * *', async () => await new StartCollect().init());
}