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
    },
    // 🇬🇧
    en: {
        appName: "N.E.S.T.",
    },
    // 🇫🇮
    fi: {
        appName: "N.E.S.T.",
    }
})
