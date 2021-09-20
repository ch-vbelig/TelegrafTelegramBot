const { Scenes, Markup } = require('telegraf')
const format = require('string-format')
const constants = require('../constants')

format.extend(String.prototype, {})

class ProfileSceneGenerator {

    ProfileScene() {

        // Create
        const profileScene = new Scenes.BaseScene( constants.ID_PROFILE_SCENE )

        // Enter
        profileScene.enter( async (ctx) => {

            console.log("Telegram Id: {0}".format(ctx.message.from.id))
            const user = getProfile(ctx.message.from.id)

            // Check user is null
            if (user === null) {
                await ctx.reply(constants.TEXT_PROFILE_NOT_FOUND)
                await ctx.scene.leave()
            } else {
                let msg = "Ваш профиль:\n"
                msg += "\t\t\t\t👤 Имя: {0}\n".format(user["first_name"])
                msg += "\t\t\t\t📝 Фамилия: {0}\n".format(user["last_name"])
                msg += "\t\t\t\t💼 Email: {0}\n".format(user["email"])
                msg += "\t\t\t\t📍 Возраст: {0}\n".format(user["age"])
                console.log(user["vacancies"])
                msg += "\t\t\t\t👌 Активные отклики: {0}".format(user["vacancies"].join(", "))
                await ctx.reply( msg )
                await ctx.scene.leave()
            }

        })

        return profileScene
    }


}

function getProfile(userTelegramId){
    let returnedUser = null
    constants.users.forEach( user => {
        if (user["user_telegram_id"] === userTelegramId) {
            console.log("FOUND")
            returnedUser = user
        }
    })
    return returnedUser
}


module.exports = ProfileSceneGenerator