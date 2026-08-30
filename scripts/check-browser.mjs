import puppeteer from "puppeteer-core";

const browser = await puppeteer.launch({
  executablePath: "/usr/bin/chromium-browser",
  headless: true,
  args: [
    "--no-sandbox",
    "--enable-unsafe-swiftshader",
    "--use-angle=swiftshader",
  ],
});

const page = await browser.newPage();
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1 });

const errors = [];
page.on("pageerror", (error) => {
  errors.push(error.message);
  console.error("[pageerror]", error.message);
});
page.on("console", (message) => {
  const text = message.text();
  if (message.type() === "error") {
    errors.push(text);
    console.error("[console]", text);
  }
});

await page.goto("http://127.0.0.1:5173/", {
  waitUntil: "networkidle0",
});
await page.screenshot({ path: "/tmp/odisseia-home.png" });

await page.click(".primary-button");
await new Promise((resolve) => setTimeout(resolve, 900));
await page.screenshot({ path: "/tmp/odisseia-sailing.png" });

await page.keyboard.down("ArrowUp");
await new Promise((resolve) => setTimeout(resolve, 9000));
await page.keyboard.up("ArrowUp");
await new Promise((resolve) => setTimeout(resolve, 500));
await page.screenshot({ path: "/tmp/odisseia-island.png" });

const prompt = await page.$(".interaction-prompt");
if (prompt) {
  await prompt.click();
  await new Promise((resolve) => setTimeout(resolve, 3600));
  await page.screenshot({ path: "/tmp/odisseia-cave.png" });
  const encounter = await page.$(".encounter-panel");
  if (!encounter) {
    errors.push("A cena da caverna não concluiu a transição.");
  }
} else {
  errors.push("O prompt para entrar na caverna não apareceu.");
}

await browser.close();

if (errors.length > 0) {
  for (const error of errors) {
    console.error(`[validation] ${error}`);
  }
  console.error(`Validação terminou com ${errors.length} erro(s).`);
  process.exitCode = 1;
} else {
  console.log("Fluxo inicial validado no Chromium sem erros de console.");
}
