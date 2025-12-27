// Change the import from "@stacks/connect" to "@stacks/auth"
import { AppConfig, UserSession } from "@stacks/auth";

const appConfig = new AppConfig(["store_write", "publish_data"]);
export const userSession = new UserSession({ appConfig });