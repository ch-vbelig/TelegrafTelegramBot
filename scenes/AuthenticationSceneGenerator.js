const { Scenes, Markup } = require('telegraf')
const constants = require("../constants");
const format = require('string-format')

format.extend(String.prototype, {})

const removeKeyboardMarkup = Markup.removeKeyboard()

class AuthenticationSceneGenerator {

    LoginScene() {
        // Create
        const loginScene = new Scenes.BaseScene(constants.ID_LOGIN_SCENE)

        //Enter
        loginScene.enter( async (ctx) => {

            // Ask login
            ctx.scene.state.message ? await ctx.reply(ctx.scene.state.message)
                : await ctx.reply(constants.TEXT_ASK_LOGIN, removeKeyboardMarkup)
        })

        // On type "text"
        loginScene.on("text", async (ctx) => {
            const givenLogin = ctx.message.text
            await ctx.scene.enter("token", { login: givenLogin })
        })

        // On message
        loginScene.on("message", (ctx) => ctx.reply(constants.TEXT_NOT_LOGIN))
        return loginScene
    }

    TokenScene() {

        // Create
        const tokenScene = new Scenes.BaseScene(constants.ID_TOKEN_SCENE)

        // Enter
        tokenScene.enter( async (ctx) => {

            // Ask token
            await ctx.reply(constants.TEXT_ASK_TOKEN)
        })

        // On type "text"
        tokenScene.on("text", async (ctx) => {

            // Get login and token
            const givenLogin = ctx.scene.state.login
            const givenToken = ctx.message.text

            if (givenLogin === "bbc7@tpu.ru" && givenToken === "1111"){
                console.log(`LOG: user_login is ${givenLogin}\nuser_token is ${givenToken}`)

                // Remember user
                ctx.session.user = {
                    login: givenLogin,
                    token: givenToken,
                    isLogged: true
                }

                await ctx.scene.enter('welcome')
            } else {

                // Ask login again
                await ctx.scene.enter('login', {
                    message: constants.TEXT_INCORRECT_LOGIN_OR_TOKEN})
            }
        })
        tokenScene.on("message", (ctx) => ctx.reply(constants.TEXT_NOT_TOKEN))
        return tokenScene
    }

}

module.exports = AuthenticationSceneGenerator