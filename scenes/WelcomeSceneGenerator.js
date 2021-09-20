const { Scenes, Markup } = require('telegraf')
const constants = require("../constants");
const format = require('string-format')

format.extend(String.prototype, {})

const markup = Markup.keyboard(    [
        [
            constants.BUTTON_TEXT_SORT_BY_COMPANIES,
            constants.BUTTON_TEXT_SORT_BY_POSITIONS,
            constants.BUTTON_TEXT_SORT_BY_TAGS],
        [
            constants.BUTTON_TEXT_SHOW_PROFILE
        ]
    ])
    .resize(true)

class WelcomeSceneGenerator {

    WelcomeScene(){
        // Create
        const welcomeScene = new Scenes.BaseScene(constants.ID_WELCOME_SCENE)

        // Enter
        welcomeScene.enter( async  (ctx) => {
            await ctx.reply( constants.INTRODUCTION.format(ctx.message.from, ctx.me, 6),  {
                parse_mode: 'HTML',
                reply_markup: markup.reply_markup
            })
            await welcomeScene.leave()
        })

        return welcomeScene
    }

}


module.exports = WelcomeSceneGenerator