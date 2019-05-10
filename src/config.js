var url = 'https://schranky.nastojte.cz';
var title = 'Mapa poštovních schránek';
var author = 'Adam Kučera';
var description = 'Mapa poštovních schránek v ČR. Najděte snadno nejbližší poštovní schránku. Využívá data zveřejňovaná Českou poštou a podklady Mapy.cz včetně virtuální procházky.';
var keywords = 'poštovní schránka,poloha,poštovní schránky,mapa poštovních schránek,poloha poštovních schránek';
var locale = 'cs_CZ';
var lang = 'cs';

var routesToPrerender = ['/'];

// do not touch code bellow if not necessary
// this is loaded into the webpack.config.js

module.exports = {
    routesToPrerender,
    title,
    lang,
    meta: {
        viewport: 'width=device-width, initial-scale=1, maximum-scale=1',
        author,
        description,
        keywords,
    },
    social: {
        appUrl: url,
        facebook: {
            'og:url': url,
            'og:type': 'website',
            'og:title': title,
            'og:image': './assets/favicon.png',
            'og:description': description,
            'og:site_name': title,
            'og:locale': locale,
            'og:article:author': author,
        },
        twitter: {
            'twitter:card': description,
            'twitter:url': url,
            'twitter:title': title,
            'twitter:description': description,
            'twitter:image': './assets/favicon.png'
        },
    }
}