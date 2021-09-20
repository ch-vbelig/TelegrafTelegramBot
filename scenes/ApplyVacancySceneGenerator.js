const { Scenes, Markup } = require('telegraf')
const format = require('string-format')
const constants = require('../constants')
const { Buffer } = require('buffer')

format.extend(String.prototype, {})

const markup_sort = Markup.keyboard(    [
    [
        constants.BUTTON_TEXT_SORT_BY_COMPANIES,
        constants.BUTTON_TEXT_SORT_BY_POSITIONS,
        constants.BUTTON_TEXT_SORT_BY_TAGS],
    [
        constants.BUTTON_TEXT_SHOW_PROFILE
    ]
])
    .resize(true)

const markup_agree = Markup.keyboard([ "Да", "Нет"]).resize(true)

class ApplyVacancySceneGenerator {

    ApplyVacancyScene() {

        // Create
        const applyVacancyScene = new Scenes.BaseScene( constants.ID_APPLY_VACANCY_SCENE )

        // Enter
        applyVacancyScene.enter( async (ctx) => {

            // Decode message
            const decodedStr = new Buffer
                                    .from(ctx.scene.state.message, 'base64')
                                    .toString('ascii');

            // Find record
            const records = constants.records.filter( record => record.click.includes(decodedStr))
            console.log("LOG:", ctx.scene.state.records)

            // Check if record is found
            if (records.length === 0) {
                await ctx.reply("Not found")
                await ctx.scene.leave()
            } else {
                ctx.scene.state.record = records[0]
                await ctx.reply(`Вы действительно хотите отправить заявку на ${ctx.scene.state.record.vacancy}?`, markup_agree)
            }

        })

        // On text,
        applyVacancyScene.on("text", async (ctx) => {
            if (ctx.message.text === "Да") {

                // Set vacancy in user's data
                let is_set = false
                constants.users.forEach( user => {
                    if (user["user_telegram_id"] === ctx.message.from.id){

                        // Check if user has already applied
                        if (!user["vacancies"].includes(ctx.scene.state.record.vacancy_id)){
                            user["vacancies"].push(ctx.scene.state.record.vacancy_id)
                            is_set = true
                        } else {
                            ctx.reply("Вы уже откликнулись на данную вакансию", markup_sort)
                        }
                    }
                })

                // Notify employer
                if (is_set) {
                    const employer_chat_id = ctx.scene.state.record.employer_chat_id
                    const username = ctx.message.from.username
                    const recordVacancy = ctx.scene.state.record["vacancy"]

                    await ctx.telegram.sendMessage(employer_chat_id, "Отклик от пользователя @{0} на роль {1} ".format(username, recordVacancy))
                    await ctx.reply("Одобрено", markup_sort)
                }

                await ctx.scene.leave()

            } else if (ctx.message.text === "Нет") {
                await ctx.reply("Отменено", markup_sort)
                await ctx.scene.leave()
            }
        })

        applyVacancyScene.on("message", (ctx) => ctx.reply("Отправьте текст"))
        return applyVacancyScene
    }


}

module.exports = ApplyVacancySceneGenerator