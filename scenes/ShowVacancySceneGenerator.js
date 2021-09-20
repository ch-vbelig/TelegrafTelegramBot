const { Scenes, Markup } = require('telegraf')
const format = require('string-format')
const constants = require('../constants')
const { Buffer } = require('buffer')

format.extend(String.prototype, {})

class ShowVacancySceneGenerator {

    ShowVacancyScene() {

        // Create
        const showVacancyScene = new Scenes.BaseScene( constants.ID_SHOW_VACANCY_SCENE )

        //Enter
        showVacancyScene.enter( async (ctx) => {
            if (ctx.update.callback_query === undefined) {
                await ctx.scene.leave()
            } else {

                // Get data from call back
                const data = ctx.update.callback_query.data.split("/")
                const key = data[1]
                const value = data[2]
                console.log("CALLBACK key: {0} value: {1}".format(key, value))

                const filteredList = getVacanciesSorted(key, value)

                let msg = "💼 Searched by:`{0}` <b>{1}</b>:\n".format(key, value);
                filteredList.forEach( record => {
                    msg += "👉🏼 <b>{0}</b>\n".format(record['vacancy'])
                    msg += "\t\t\t\t📍 Компания: {0}\n".format(record['company'])
                    msg += "\t\t\t\t📍 Описание: {0}\n".format(record['description'])
                    msg += "\t\t\t\t📍 Теги: {0}\n".format((record['tags'].join(", ")))
                    // encode
                    const encoded = new Buffer(record['click']).toString('base64');
                    const click = "/ar_" + encoded.substr(0, encoded.length-2);

                    msg += "\t\t\t\t📍 Откликнуться: {0}\n\n\n".format("{0}".format(click))
                })

                await ctx.reply(msg, {parse_mode: 'HTML'})
                await ctx.scene.leave()

            }

        })

        return showVacancyScene
    }


}


function getVacanciesSorted(column, value){
    return constants.records.filter( record => {
       return (record[column] instanceof Array) && (record[column].includes(value)) ||
           !(record[column] instanceof Array) && record[column].toLowerCase() === value.toLowerCase()
    })
}


module.exports = ShowVacancySceneGenerator