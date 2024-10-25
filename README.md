# UsernameSnipe

**UsernameSnipe** is a simple Discord bot I made for fun designed to scrape a gaming site for specific usernames and notify the user who requested it via DM as well as in the requested channel when they come online. This uses a headless browser to scrape and navigate the site. It doesn't work on all sites, only a select few gaming forums. 

## Features
The bot currently supports two main commands:
1. **`/snipe`**: Allows users to store up to 5 usernames to monitor. The bot will check the site every few minutes for all saved usernames. When a username is found, it notifies the user, then removes the username from their list.
2. **`/cancel`**: Allows users to clear their snipe list, deleting all saved usernames from the database.

## Dependencies
The bot requires the following dependencies:
- [Discord.js](https://discord.js.org/) - for interaction with the Discord API.
- [MongoDB](https://www.mongodb.com/) - for storing sniped usernames.
- [Puppeteer](https://pptr.dev/) - for navigating and scraping the specified site.

## Setup
### Requirements
- **Node.js** - Recommended version 16 or higher
- **MongoDB URI** - A valid MongoDB URI for database connection
- **Discord Bot Token** - Token for your bot application

### Installation
1. **Clone the repository**:
   ```bash
   git clone https://github.com/cloudali/UsernameSnipe.git
   cd UsernameSnipe
2. Install dependencies:
   ```bash
   npm install
3. Configure `config.json`
- Open config.json and update it with your bot's settings:
    - mongodb: Your MongoDB URI
    - username and password: Credentials to log into the gaming site you’re scraping
    - clientId and guildId: IDs of your Discord application and server (guild)
    - token: Your Discord bot token
4. After these steps, you’ll be ready to launch and use UsernameSnipe!

   
