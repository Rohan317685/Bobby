require("dotenv").config();

const { App } = require("@slack/bolt");

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  appToken: process.env.SLACK_APP_TOKEN,
  socketMode: true
});

app.command("/bobby-ping", async ({ command, ack, respond }) => {
  const start = Date.now();
  await ack();
  const latency = Date.now() - start;
  await respond({ text: `Pong!\nLatency: ${latency}ms` });
});

app.command("/bobby-catpics", async ({command, ack, respond}) => {
    await ack();

    const res = await fetch("https://api.thecatapi.com/v1/images/search", {
        headers: { "x-api-key": process.env.CAT_API}
    });

    const data = await res.json();


    await respond({
        response_type: "in_channel",
        blocks: [{
            type: "image",
            image_url: data[0].url, 
            alt_text: "Cat picture hehe"
        }]
    });
});


app.command("/bobby-fact-of-the-day", async({ command, ack, respond}) => {
    await ack();

    const res = await fetch("https://uselessfacts.jsph.pl/api/v2/facts/today?language=en");
    const data = await res.json();

    await respond({
        response_type: "in channel",
        text: ` *Fact of the day!* \n${data.text} `
    });
});

(async () => {
  await app.start();
  console.log("bot is running!");
})();

