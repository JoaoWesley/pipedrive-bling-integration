import "reflect-metadata";

import HttpApplication from "./app";

export async function startHttp(): Promise<void> {
  try {
    const app = new HttpApplication();
    await app.boot();
  } catch (err) {
    // tslint:disable-next-line:no-console
    console.error(`Impossible to load configuration (${err})`);
  }
}
