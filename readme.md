<a name="readme-top"></a>

<div align="center">
  <h1 align="center">Crouton</h1>

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

<br />
<br />

<h1 align="center">NOTICE</h1>
<p align="center">This project is being moved to the Arcturis Studio workspace. Please keep in mind this is a side project and is slow moving on development.</p>
<p align="center">Please see below for updated links to the project.</p>

<br/>

<div align="center">
   <a align="center" href="https://github.com/orgs/Arcturis-Studio/repositories">Arcturis Studio</a>
</div>

<br />
<br />
<br />

<!-- GETTING STARTED -->

## Getting Started

We are now referring to the project and bot as Crouton, the github repository is still currently named ewok-translator. The repository will be renamed to Crouton in the future.

While we currently use Supabase and Vercel to host our data and front-end, we will not be covering how to utilize Supabase and Vercel in your deployment. The quick start guide will only cover how to get started in a basic development environment at this time.

### Installation

1. First, we will clone the repo.
   ```sh
   git clone https://github.com/YourFavoriteKyle/ewok-translator.git
   ```
2. Next, we will install dependencies at the top level, and the `/bot` and `/site` directories.
   ```sh
   cd ewok-translator
   npm i
   cd bot && npm i
   cd ../site && npm i
   ```
3. We will need a `.env` file at the root of the project. This single file will be used for both `/bot` and `/site`.

   ```sh
   # Used by the bot
   BOT_TOKEN="your-extremely-sensitive-discord-bot-token"
   CLIENT_SECRET="your-very-secret-discord-client-secret"
   CLIENT_ID="your-discord-client-id"

   # Regardless if you are using Supabase, site expects this key
   # to be present unless you change it in the site code
   SUPABASE_DISCORD_AUTH_REDIRECT_URL="your-supabase-discord-oauth-redirect-url"
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>
