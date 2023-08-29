// import todoLocales from '../../Todo/locales'
import { navLocales } from '../../layout/locales'
import { errorLocales } from '../../error/locals'
// import {pensionLocales} from '../../backoffice/pension/locales'
import { authenticationLocales } from '../../authentification/locals'
import { notFoundLocales } from '../../404/locales'

export class LocalUtils {
	static allLocales = [
		navLocales,
		errorLocales,
		// pensionLocales,
		authenticationLocales,
		notFoundLocales,
		// todoLocales,
		{
			fr: {
				hello: 'Bonjour en francais',
				loading: 'Chargement',
			},
			en: {
				hello: 'Hello ! in english ',
				loading: 'Loading',
			},
			nl: {
				hello: 'Halo ! in het vlaams',
				loading: 'Laden',
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
