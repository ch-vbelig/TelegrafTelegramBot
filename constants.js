// Bot phrases
constants = {

    INTRODUCTION: "Привет, {0.firstName}! " +
        "Я <b>{1}</b> 🐺, бот к вашим услугам 🤙\n" +
        "FFF это платформа, где Вы можете найти новые вакансии, созданная для студентов ТПУ 😎\n" +
        "Короче, у нас есть <b>{2}</b> работ над которыми Вы сможете поработать😏\n" +
        "Осталось только выбрать,как нужно их отсортировать🤓:",


    TEXT_CHAT_NOT_PRIVATE : "Оу сори 😢, не могу показывать данные в группах и каналах 😢",
    TEXT_NOT_LOGGED_IN: "Здрасте, А Вы кто? Учетную запись то не привязали?🤔 ",
    TEXT_ASK_LOGIN : " 🔑Аунтефицироваться то всегда нужно🦖\nОтправьте мне ваш логин🤓:",
    TEXT_ASK_TOKEN : "Кайф! Теперь мне нужен тот самый токен🤙",
    TEXT_INCORRECT_LOGIN_OR_TOKEN : "Эмм 🤔, возможно вы неправильно указали логин или токен .\nВведите логин заново 🤦‍♂",
    TEXT_NOT_LOGIN: "Это же не логин🤨 ",
    TEXT_NOT_TOKEN: "Ну это точно не токен! 🤨 ",
    TEXT_PROFILE_NOT_FOUND : "Оу сори ☹, не нашел информацию о вашем профиле 🤷🏻‍♂",

    TEXT_VACANCY_LIST_BY_COMPANIES : "Вот, отсортировал вакансии по компаниям🤓",
    TEXT_VACANCY_LIST_BY_NAMES : "А вот, отсортировал по названиям👀",
    TEXT_VACANCY_LIST_BY_TAGS : "Вот, список работ по тегам🤪",
    TEXT_VACANCY_APPLICATION_SUCCESS : "Ухухух, вы приняты)",
    TEXT_VACANCY_APPLICATION_CANCEL : "Окей, мб найдется что-то еще? 🤞",

    ID_WELCOME_SCENE: 'welcome',
    ID_LOGIN_SCENE: 'login',
    ID_TOKEN_SCENE: 'token',
    ID_SORT_BY_COMPANY_SCENE: 'sort_by_company',
    ID_SORT_BY_VACANCY_SCENE: 'sort_by_vacancy',
    ID_SORT_BY_TAGS_SCENE: 'sort_by_tags',
    ID_PROFILE_SCENE: 'profile',
    ID_SHOW_VACANCY_SCENE: 'show_vacancy',
    ID_APPLY_VACANCY_SCENE: 'apply_vacancy',

    STICKER_ID_HELLO: "CAACAgIAAxkBAAIJl2FLk3dMUC0v0ZuPdrBwA3GkcvgPAAKwDAAC1c7YSRgEfwPw-wzfIQQ",
    STICKER_ID_DANCE: "CAACAgIAAxkBAAIJk2FLk2xoWNZE3jz-97OvdOf-dbEDAAJVEQACj5nhSiIeHICga4P0IQQ",
    STICKER_ID_COOL: "CAACAgIAAxkBAAIJkWFLk2tjt4SRO7gqMfWwcYJeoeT6AAJ4DwACQSVISwABxSLmQfOYhiEE",
    STICKER_ID_COW: "CAACAgIAAxkBAAIJj2FLk06bEFWfhI1_-CiwZFA80Fh-AAJcBAACnNbnClokfVuRQO25IQQ",
    STICKER_ID_MONKEY: "CAACAgIAAxkBAAIJjWFLk0mcveDX9bWUQ6tzrFvjN5S9AAIMAwACbbBCA1R-zEHxl4T7IQQ",
    STICKER_ID_DONT_KNOW: "CAACAgIAAxkBAAIJmWFLk3v8977Mr2I4uBOIHvWwfR8IAALRDAACovthSgcRPxdEzhvCIQQ",
    STICKER_ID_OK: "CAACAgIAAxkBAAIJrWFLk7qmuP9ii-4eTI5jePgAAejzOgACdQ8AAr0nEUoDQnRWf0YLYSEE",
    STICKER_ID_NOT_LOGGED: "CAACAgIAAxkBAAIJp2FLk6NawsbgQ078rCE6wwmRr7aDAAIvBwACXAJlAyO_3KycROFVIQQ",


// Button texts
    BUTTON_TEXT_SORT_BY_COMPANIES : "Сортировать по компаниям",
    BUTTON_TEXT_SORT_BY_POSITIONS : "Сортировать по вакансиям",
    BUTTON_TEXT_SORT_BY_TAGS : "Сортировать по тегам",
    BUTTON_TEXT_SHOW_PROFILE : "Показать профиль",

// Errors
    ERROR : "Ошибка: что-то пошло не так",

// data
    my_telegram_id : 819382563,
    employer_chat_id : -1001537684060,
    users : [
        {
            user_id: 1,
            user_telegram_id: 819382563,
            first_name: "Belig",
            last_name: "Chimitov",
            email: "bbc7@tpu.ru",
            token: "1234",
            age: 20,
            is_student: true,
            vacancies: []
        },
        {
            user_id: 2,
            user_telegram_id: null,
            first_name: "Sasha",
            last_name: "Ivanov",
            email: "ccc1@tpu.ru",
            token: "1234",
            age: 18,
            has_telegram: false,
            is_student: true,
            vacancies: []
        },
        {
            user_id: 3,
            user_telegram_id: null,
            first_name: "Alexey",
            last_name: "Smirnov",
            email: "alex@tpu.ru",
            token: "1234",
            age: 40,
            has_telegram: false,
            is_student: false,
            vacancies: []
        }
    ],


    records : [
        {
            vacancy_id: 1,
            vacancy: "Software Engineer",
            company: "Google",
            description: "Нам нужна срочная помощь ассистента в части фроненда в нашем новейшем сервисе.",
            date: "01.08.2021",
            tags: ["Frontend", "React", "JS", "Design"],
            click: "/vacancy_1",
            employer_chat_id: -1001537684060
        },
        {
            vacancy_id: 2,
            vacancy: "UI Tester",
            company: "Google",
            description: "Разработка нового приолжения уже на грани выпуска, нам нужен хороший UI тестер для выпуска " +
                "приложения в продакшн.",
            date: "01.08.2021",
            tags: ["Backend", "Kotlin", "Spring", "MySQL"],
            click: "/vacancy_2",
            employer_chat_id: -1001537684060
        },
        {
            vacancy_id: 3,
            vacancy: "Android Developer",
            company: "Yandex",
            description: "Мы собираемся добавить новый функционал в уже существующую платформу Яндекс Такси, однако, но" +
                " нам не достает свободных рук в офисе.",
            date: "01.08.2021",
            tags: ["Android", "Kotlin"],
            click: "/vacancy_3",
            employer_chat_id: -1001537684060
        },
        {
            vacancy_id: 4,
            vacancy: "Data Scientist",
            company: "Yandex",
            description: "Благодаря недавнему прорыву в области разработки вакцины для граждан " +
                "мы пытаемся выяснить вероятность, что вакцина может успешно справится с новыми мутациями вируса",
            date: "01.08.2021",
            tags: ["Backend", "Excel", "Python", "MySQL"],
            click: "/vacancy_4",
            employer_chat_id: -1001537684060
        },
        {
            vacancy_id: 5,
            vacancy: "Android Developer",
            company: "Cube",
            description: "Открытая вакансия. Пожалуйста, пришлите ваше резюме лично в офис",
            date: "01.08.2021",
            tags: ["Android", "Kotlin"],
            click: "/vacancy_5",
            employer_chat_id: -1001537684060
        },
        {
            vacancy_id: 6,
            vacancy: "Telegram Bot Developer",
            company: "Cube",
            description: "Мы отурываем онлайн кофешоп. Поэтому, мы пытаемя найти разработчика ботов, " +
                "чтобы посетители могли сделать заказ с помощью телеграм бота",
            date: "01.08.2021",
            tags: ["Telegram", "Bot"],
            click: "/vacancy_6",
            employer_chat_id: -1001537684060
        },

    ]
}

module.exports = constants