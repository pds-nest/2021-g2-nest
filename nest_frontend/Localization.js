import LocalizedStrings from "react-localization"


/**
 * All strings contained in the app should be present in this dict.
 *
 * If a key is missing in a language, the italian one is displayed instead.
 *
 * Define format strings as in C#:
 * ```js
 * "Raggio di {number} km"
 * "{number} km radius"
 * ```
 */
export default new LocalizedStrings({
    // 🇮🇹
    it: {
        appName: "N.E.S.T.",
        appFullName: "Noi Estraiamo Statistiche Tweet",

        dashboard: "Dashboard",
        searchBy: "Ricerca per ",
        byZone: "area",
        byHashtag: "hashtag",
        byUser: "utente",
        byTimePeriod: "arco di tempo",
        timeBefore: "Prima",
        timeAfter: "Dopo",
        createRepo: "Crea repository",
        repoName: "Nome repository: ",

        repoMenu: "Menu repository",
        menuActive: "Le tue repository attive",
        menuArchived: "Le tue repository archiviate",
        delete: "Elimina",
        archive: "Archivia",
        edit: "Modifica",

        alerts: "Allarmi",
        alertTitle: "I tuoi allarmi",
        alertCreate: "Crea un allarme",

        settings: "Impostazioni",
        loggedInTitle: "Accesso effettuato",
        loggedInOn: "Al momento hai effettuato l'accesso su ",
        loggedInAs: " come ",
        logout: "Esci",
        switchTheme: "Cambia tema",
        alertSettings: "Impostazioni allarmi",
        changeEmail: "Cambia il tuo indirizzo email",
        changePasswd: "Cambia la tua password",

        manageUsers: "Gestisci utenti",
        userList: "Elenco utenti",
        userCreate: "Crea nuovo utente",
    },
    // 🇬🇧
    en: {
        appName: "N.E.S.T.",
        appFullName: "We Extract Statistics from Tweets",

        dashboard: "Dashboard",
        searchBy: "Search by ",
        byZone: "zone",
        byHashtag: "hashtag",
        byUser: "user",
        byTimePeriod: "time period",
        timeBefore: "Before",
        timeAfter: "After",
        createRepo: "Create repository",
        repoName: "Repository name: ",

        repoMenu: "Repositories menu",
        menuActive: "Your active repositories",
        menuArchived: "Your archived repositories",
        delete: "Delete",
        archive: "Archive",
        edit: "Edit",

        alerts: "Alerts",
        alertTitle: "Your alerts",
        alertCreate: "Create a new alert",

        settings: "Settings",
        loggedInTitle: "Logged in",
        loggedInOn: "You are currently logged in at ",
        loggedInAs: " as ",
        logout: "Logout",
        switchTheme: "Switch theme",
        alertSettings: "Alert settings",
        changeEmail: "Change your email address",
        changePasswd: "Change your password",

        manageUsers: "Manage users",
        userList: "User list",
        userCreate: "Create new user",
    },
    // 🇫🇮
    fi: {
        appName: "N.E.S.T.",
        appFullName: "Poimimme Twiittien Tilastot",

        dashboard: "Kojelauta",
        searchBy: "Haku ",
        byZone: "vyöhykkeen mukaan",
        byHashtag: "hashtagin mukaan",
        byUser: "käyttäjän mukaan",
        byTimePeriod: "aikajakson mukaan",
        timeBefore: "Ennen",
        timeAfter: "Jälkeen",
        createRepo: "Luo arkisto",
        repoName: "Arkiston nimi: ",
    }
})

