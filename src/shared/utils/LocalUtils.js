import { navLocales } from '../../layout/locales'
import { errorLocales } from '../../error/locals'

import { authenticationLocales } from '../../authentification/locals'
import { notFoundLocales } from '../../404/locales'
import { rgpdLocales } from '../../rgpd/Locals'

export class LocalUtils {
	static allLocales = [
		navLocales,
		errorLocales,
		authenticationLocales,
		notFoundLocales,
		rgpdLocales,
		{
			fr: {
				hello: 'Bonjour en francais',
				loading: 'Chargement',
				authentication_notAuthenticated: 'Veuillez vous identifier',
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
