<a name="readme-top"></a>

<div align="center">
  <h1 align="center">Crouton</h3>

  <p align="center">
    A bread themed Discord bot, a<u>bun</u>dantly full of bread puns!
    <br />
    <a href="https://ewok-translator.vercel.app"><strong>Live site »</strong></a>
  </p>
  <p>
  <a href="https://kit.svelte.dev/">Svelte+Kit</a>
  <span> · </span>
  <a href="https://discord.js.org/">Discord JS</a>
  <span> · </span>
  <a href="https://www.prisma.io/">Prisma</a>
  <span> · </span>
  <a href="https://supabase.com">Supabase</a>
  </p>
</div>

<!-- GETTING STARTED -->

## Getting Started

While we currently use Supabase and Vercel to host our data and front-end, we will not be covering how to utilize Supabase and Vercel in your deployment. The quick start guide will only cover how to get started in a basic development environment at this time.

### Installation

1. First, we will clone the repo.

   ```sh
   git clone https://github.com/YourFavoriteKyle/crouton.git
   ```

2. We will need a `.env` file at the root of the project. This single file will be used for both `/bot` and `/site`.

   ```sh
   # Used by the bot
   BOT_TOKEN="your-extremely-sensitive-discord-bot-token"
   CLIENT_SECRET="your-very-secret-discord-client-secret"
   CLIENT_ID="your-discord-client-id"

   # Regardless if you are using Supabase, site expects this key
   # to be present unless you change it in the site code
   SUPABASE_DISCORD_AUTH_REDIRECT_URL="your-supabase-discord-oauth-redirect-url"
   ```

   2.1 If you are using Docker, <a href="#docker">click here</a> to skip ahead.
   <br />

3. Finally, install the dependencies at the top level and the `/bot` and `/site` directories.

   ```sh
   npm i
   cd bot && npm i
   cd ../site && npm i
   ```

#### <p name="docker">Docker</p>

1. Using docker is pretty straightforward. There is no image unfortunately, so you will still need to clone the repository first. There are compose files for every function, or just each individual component.

   ```sh
   cd bot
   docker compose --env-file=../.env up
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>
