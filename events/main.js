const { mongodb, username, password } = require("../config.json")
const puppeteer = require('puppeteer');
const snipe = require('../schemas/snipe');

module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        const mongoose = require("mongoose");
        mongoose.set("strictQuery", false);
        await mongoose.connect(mongodb)
        if (mongoose.connect) {
            console.log(`bot is online`)

            setInterval(() => {
                run(client)
            }, 180000); // every 1 minutes (180000 miliseconds)
        }
    }
}



async function run(client) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("SITE")

    await page.focus('#username');
    await page.keyboard.type(`${username}`);

    await page.screenshot({ path: 'test.png' })

    await page.focus('#password');
    await page.keyboard.type(`${password}`);

    await page.screenshot({ path: 'test2.png' })

    await page.click('button[name="login"]');

    await page.goto("SITE");


    const list = [];

    const data = await snipe.find({});
    data.forEach((document) => {
        list.push({
            Guild: document.Guild,
            Channel: document.Channel,
            Member: document.Member,
            Username: document.Username,
        });
    });

    await page.screenshot({ path: 'ewa.png' })

    await page.waitForSelector('.base-username');

    const elements = await page.$$('.base-username');

    for (const item of list) {
        const { Guild, Channel, Member, Username } = item;
        let found = false;

        for (const element of elements) {
            const text = await (await element.getProperty('textContent')).jsonValue();

            const lowercaseText = text.toLowerCase();
            const lowercaseUsername = Username.toLowerCase();

            if (lowercaseText === lowercaseUsername) {
                found = true;
                await snipe.deleteMany({ Username: Username })

                const guild = client.guilds.cache.get(`${Guild}`);
                const channel = guild.channels.cache.get(`${Channel}`);

                channel.send({
                    content: `<@${Member}>`,
                    embeds: [{
                        description: `<:online:1147203974668222498> **${text}** is online!`,
                        color: 0xFFA500,
                    }],
                });

                const user = await client.users.fetch(`${Member}`).catch(() => null);

                if (!user) return;

                await user.send({
                    content: `<@${Member}>`,
                    embeds: [{
                        description: `<:online:1147203974668222498> **${text}** is online!`,
                        color: 0xFFA500,
                    }],
                }).catch(() => { });

                break;
            }
        }

        if (!found) {
            console.log(`${Username} not found.`);
        }
    }

    await browser.close();
}