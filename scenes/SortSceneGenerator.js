const { Scenes, Markup } = require('telegraf')
const constants = require("../constants");
const format = require('string-format')

format.extend(String.prototype, {})


class SortSceneGenerator {

    SortByCompanyScene(){

        // Create
        const sortByCompanyScene = new Scenes.BaseScene(constants.ID_SORT_BY_COMPANY_SCENE)

        // Enter
        sortByCompanyScene.enter( async  (ctx) => {
            const shortList = getListCompany()
            await ctx.reply(constants.TEXT_VACANCY_LIST_BY_COMPANIES, getMarkupButtonList('company', shortList))
            await ctx.scene.leave()
        })

        return sortByCompanyScene
    }

    SortByVacancyScene(){

        // Create
        const sortByVacancyScene = new Scenes.BaseScene(constants.ID_SORT_BY_VACANCY_SCENE)

        // Enter
        sortByVacancyScene.enter( async  (ctx) => {
            const shortList = getListVacancy()
            await ctx.reply(constants.TEXT_VACANCY_LIST_BY_COMPANIES, getMarkupButtonList('vacancy', shortList))
            await ctx.scene.leave()
        })

        return sortByVacancyScene
    }

    SortByTagsScene(){
        // Create
        const sortByTagsScene = new Scenes.BaseScene(constants.ID_SORT_BY_TAGS_SCENE)

        // Enter
        sortByTagsScene.enter( async  (ctx) => {
            const shortList = getListTags()
            await ctx.reply(constants.TEXT_VACANCY_LIST_BY_COMPANIES, getMarkupButtonList('tags', shortList))
            await ctx.scene.leave()
        })

        return sortByTagsScene
    }



}

// Data-prepare functions
function getListCompany(){
    const records = constants.records
    let companyDict = {}
    records.forEach( record => {
        if ( ! (record.company in companyDict)) {
            companyDict[record['company']] = 0
        }
        companyDict[record['company']] += 1
    } )

    return companyDict
}

function getListVacancy(){
    const records = constants.records
    let vacancyDict = {}
    records.forEach( record => {
        if ( ! (record.vacancy in vacancyDict)) {
            vacancyDict[record['vacancy']] = 0
        }
        vacancyDict[record['vacancy']] += 1
    } )

    return vacancyDict
}

function getListTags(){
    const records = constants.records
    let tagsDict = {}
    records.forEach( record => {
        record['tags'].forEach(
            tag => {
                if ( ! (tag in tagsDict)) {
                    tagsDict[tag] = 0
                }
                tagsDict[tag] += 1
            }
        )

    } )

    return tagsDict
}

function getMarkupButtonList(column, shortlistDict){
    const buttons = []


    for (let name in shortlistDict) {
        let number = shortlistDict[name]
        const button = Markup.button.callback("{0} ({1})".format(name, number), "get_vacancies/{0}/{1}".format(column, name))

        buttons.push(button)

    }

    return Markup.inlineKeyboard(buttons, {
        columns: 2
    })

}

module.exports = SortSceneGenerator
