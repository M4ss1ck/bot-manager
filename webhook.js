const axios = require("axios");
const { loadEnvConfig } = require("@next/env");
loadEnvConfig(process.cwd());

const token = process.env.TOKEN;
const domain = process.env.NEXT_PUBLIC_DOMAIN;

const setWH = async () => {
  const cleanDomain = domain.replace(/^http(s)?:\/\//, "");
  try {
    const webhook = await axios.get(
      `https://api.telegram.org/bot${token}/setWebhook?url=https://${cleanDomain}/api/bot`
    );
    console.log(webhook.data);
  } catch (error) {
    console.error(error);
  }
};

setWH();
