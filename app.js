const { Telegraf, Scenes, session } = require('telegraf')
require('dotenv/config')
const constants = require('./constants')
const AuthenticationSceneGenerator = require('./scenes/AuthenticationSceneGenerator')
const WelcomeSceneGenerator = require('./scenes/WelcomeSceneGenerator')
const SortSceneGenerator = require('./scenes/SortSceneGenerator')
const ShowVacancySceneGenerator = require('./scenes/ShowVacancySceneGenerator')
const ApplyVacancySceneGenerator = require('./scenes/ApplyVacancySceneGenerator')
const ProfileSceneGenerator = require('./scenes/ProfileSceneGenerator')
const format = require('string-format')

format.extend(String.prototype, {})

const authSceneGenerator = new AuthenticationSceneGenerator()
const welcomeSceneGenerator = new WelcomeSceneGenerator()
const sortSceneGenerator = new SortSceneGenerator()
const showVacancySceneGenerator = new ShowVacancySceneGenerator()
const applyVacancySceneGenerator = new ApplyVacancySceneGenerator()
const profileSceneGenerator = new ProfileSceneGenerator()

// Scenes
const loginScene = authSceneGenerator.LoginScene()
const tokenScene = authSceneGenerator.TokenScene()
const welcomeScene = welcomeSceneGenerator.WelcomeScene()
const sortByCompanyScene = sortSceneGenerator.SortByCompanyScene()
const sortByVacancyScene = sortSceneGenerator.SortByVacancyScene()
const sortByTagsScene = sortSceneGenerator.SortByTagsScene()
const showVacancyScene = showVacancySceneGenerator.ShowVacancyScene()
const applyVacancyScene = applyVacancySceneGenerator.ApplyVacancyScene()
const profileScene = profileSceneGenerator.ProfileScene()

const bot = new Telegraf(process.env.BOT_TOKEN)

// Include all scenes
const stage = new Scenes.Stage(
    [loginScene, tokenScene, welcomeScene, sortByCompanyScene,
        sortByVacancyScene, sortByTagsScene, showVacancyScene, profileScene, applyVacancyScene])

// Middlewares
bot.use(Telegraf.log())
bot.use(session())
bot.use(stage.middleware())

// Middleware: Check if chat type is private
bot.use((ctx, next) => ctx.chat.type !== "private" ? ctx.reply(constants.TEXT_CHAT_NOT_PRIVATE) : next())

// Middleware: Check if user is authenticated
bot.use(async (ctx, next) => {
    if ( ctx.session.user === undefined) {
        await ctx.reply(constants.TEXT_NOT_LOGGED_IN)
        ctx.scene.enter('login')
    } else if (ctx.session.user.isLogged) {
        next()
    }
})

// Middleware: Check if user is applying to a vacancy
bot.use(async (ctx, next) => {

    ctx.message && ctx.message.text.includes("/ar_")
        ? ctx.scene.enter(constants.ID_APPLY_VACANCY_SCENE, {
            message: ctx.message.text.substr(4)
        })
        : next()

})


// Commands
bot.start(async (ctx) => await ctx.scene.enter(constants.ID_WELCOME_SCENE))
bot.hears(constants.BUTTON_TEXT_SORT_BY_COMPANIES, (ctx) => ctx.scene.enter(constants.ID_SORT_BY_COMPANY_SCENE))
bot.hears(constants.BUTTON_TEXT_SORT_BY_POSITIONS, (ctx) => ctx.scene.enter(constants.ID_SORT_BY_VACANCY_SCENE))
bot.hears(constants.BUTTON_TEXT_SORT_BY_TAGS, (ctx) => ctx.scene.enter(constants.ID_SORT_BY_TAGS_SCENE))
bot.hears(constants.BUTTON_TEXT_SHOW_PROFILE, (ctx) => ctx.scene.enter(constants.ID_PROFILE_SCENE))
bot.on('callback_query', (ctx) => ctx.scene.enter(constants.ID_SHOW_VACANCY_SCENE))
// bot.help((ctx) => ctx.reply('Send me a sticker'))


bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))
