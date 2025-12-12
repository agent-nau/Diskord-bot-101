import {
  Client,
  GatewayIntentBits,
  Partials,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  Events,
  SlashCommandBuilder,
} from "discord.js";
import dotenv from "dotenv";

dotenv.config();

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ],
  partials: [Partials.Message, Partials.Channel],
});

const verifSettings = new Map();
const verifCodes = new Map();
const joinSettings = new Map();

function generateCode(len = 6) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

const commands = [
  new SlashCommandBuilder()
    .setName("verify")
    .setDescription("Verification system")
    .addSubcommand(sub =>
      sub
        .setName("setup")
        .setDescription("Post verification panel")
        .addChannelOption(o =>
          o
            .setName("channel")
            .setDescription("Panel channel")
            .setRequired(true)
            .addChannelTypes(ChannelType.GuildText)
        )
        .addRoleOption(o =>
          o
            .setName("verified_role")
            .setDescription("Role to add on success")
            .setRequired(true)
        )
        .addRoleOption(o =>
          o
            .setName("unverified_role")
            .setDescription("Role to remove on success")
            .setRequired(true)
        )
    ),

  new SlashCommandBuilder()
    .setName("help")
    .setDescription("Command list"),

  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Ping"),

  new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Bot statistics"),

  new SlashCommandBuilder()
    .setName("autojoin")
    .setDescription("Auto‑assign a role when users join")
    .addSubcommand(sub =>
      sub
        .setName("setup")
        .setDescription("Enable auto‑assign and choose role")
        .addRoleOption(o =>
          o
            .setName("role")
            .setDescription("Role to assign on join")
            .setRequired(true)
        )
    )
    .addSubcommand(sub =>
      sub
        .setName("off")
        .setDescription("Disable auto‑assign")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageRoles),
];

client.once("ready", async () => {
  console.log(`Logged in as ${client.user.tag}`);

  const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
  const body = commands.map(c => c.toJSON());

  try {
    await rest.put(Routes.applicationCommands(client.user.id), { body });
    console.log("🌍 Global commands registered");
  } catch (e) {
    console.error("❌ Command registration error:", e);
  }
});

client.on("interactionCreate", async i => {
  try {
    if (!i.isChatInputCommand()) return;

    const cmd = i.commandName;

    if (cmd === "help") {
      const embed = new EmbedBuilder()
        .setTitle("📖 Bot Commands")
        .setDescription("Here’s a list of available commands:")
        .addFields(
          { name: "/verify setup", value: "Post a verification panel in a channel." },
          { name: "/ping", value: "Check if the bot is online." },
          { name: "/stats", value: "View bot statistics." },
          { name: "/autojoin setup", value: "Enable auto‑assign role on join." },
          { name: "/autojoin off", value: "Disable auto‑assign role." }
        )
        .setColor("#00aaff");

      await i.reply({ embeds: [embed], ephemeral: true });
    }

    if (cmd === "verify") {
      if (i.options.getSubcommand() === "setup") {
        const channel = i.options.getChannel("channel");
        const verifiedRole = i.options.getRole("verified_role");
        const unverifiedRole = i.options.getRole("unverified_role");

        verifSettings.set(i.guild.id, {
          channelId: channel.id,
          verifiedRoleId: verifiedRole.id,
          unverifiedRoleId: unverifiedRole.id,
        });

        const embed = new EmbedBuilder()
          .setTitle("🔒 Verification")
          .setDescription("Press the button to begin verification.\nYou will get a short code to enter (e.g., sx24ls).")
          .setColor("#00ff66");

        const row = new ActionRowBuilder().addComponents(
          new ButtonBuilder()
            .setCustomId(`verif_start_${i.guild.id}`)
            .setLabel("Verify")
            .setStyle(ButtonStyle.Primary)
        );

        await channel.send({ embeds: [embed], components: [row] });
        await i.reply({ content: "✅ Verification panel posted.", ephemeral: true });
      }
    }

    if (cmd === "ping") {
      await i.reply({ content: "🏓 Pong!", ephemeral: true });
    }

    if (cmd === "stats") {
      await i.reply({
        content: `📊 Servers: ${client.guilds.cache.size}\n👥 Users: ${client.users.cache.size}`,
        ephemeral: true,
      });
    }

    if (cmd === "autojoin") {
      const sub = i.options.getSubcommand();
      if (sub === "setup") {
        const role = i.options.getRole("role");
        joinSettings.set(i.guild.id, role.id);
        await i.reply({ content: `✅ Auto‑join enabled. New members will get ${role.name}.`, ephemeral: true });
      }
      if (sub === "off") {
        joinSettings.delete(i.guild.id);
        await i.reply({ content: "❌ Auto‑join disabled.", ephemeral: true });
      }
    }
  } catch (err) {
    console.error("Error in interactionCreate:", err);
    if (i.replied || i.deferred) {
      await i.followUp({ content: "❌ Something went wrong.", ephemeral: true });
    } else {
      await i.reply({ content: "❌ Something went wrong.", ephemeral: true });
    }
  }
});

client.login(process.env.TOKEN);