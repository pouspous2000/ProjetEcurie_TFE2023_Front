import postLocales from '../../Post/locales'

export class LocalUtils {
	static allLocales = [
		postLocales,
		{
			fr: {
				hello: 'Bonjour en francais',
			},
			en: {
				hello: 'Hello ! in english ',
			},
			nl: {
				hello: 'Halo ! in het vlaams',
			},
		},
	]

	static getLocales() {
		// merge all locale files and returns the result of the merge
		let locales = { fr: {}, en: {}, nl: {} }
		this.allLocales.forEach(locale => {
			for (const lang in locale) {
				locales[lang] = { ...locales[lang], ...locale[lang] }
			}
		})
		return locales
	}
}
