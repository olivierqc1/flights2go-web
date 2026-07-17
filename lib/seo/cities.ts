// Villes pour les pages SEO statiques (miroir de data/destinations.py)

export interface SeoCity {
  code: string; slug: string; flag: string;
  fr: string; en: string; es: string;
  cfr: string; cen: string; ces: string;
}

const C = (code: string, slug: string, flag: string,
  fr: string, en: string, es: string,
  cfr: string, cen: string, ces: string): SeoCity =>
  ({ code, slug, flag, fr, en, es, cfr, cen, ces });

export const CITIES: SeoCity[] = [
  C("BCN","barcelona","🇪🇸","Barcelone","Barcelona","Barcelona","Espagne","Spain","España"),
  C("MAD","madrid","🇪🇸","Madrid","Madrid","Madrid","Espagne","Spain","España"),
  C("VLC","valencia","🇪🇸","Valence","Valencia","Valencia","Espagne","Spain","España"),
  C("SVQ","seville","🇪🇸","Séville","Seville","Sevilla","Espagne","Spain","España"),
  C("AGP","malaga","🇪🇸","Malaga","Malaga","Málaga","Espagne","Spain","España"),
  C("BIO","bilbao","🇪🇸","Bilbao","Bilbao","Bilbao","Espagne","Spain","España"),
  C("PMI","palma-mallorca","🇪🇸","Palma de Majorque","Palma de Mallorca","Palma de Mallorca","Espagne","Spain","España"),
  C("IBZ","ibiza","🇪🇸","Ibiza","Ibiza","Ibiza","Espagne","Spain","España"),
  C("LIS","lisbon","🇵🇹","Lisbonne","Lisbon","Lisboa","Portugal","Portugal","Portugal"),
  C("OPO","porto","🇵🇹","Porto","Porto","Oporto","Portugal","Portugal","Portugal"),
  C("FAO","faro","🇵🇹","Faro","Faro","Faro","Portugal","Portugal","Portugal"),
  C("PAR","paris","🇫🇷","Paris","Paris","París","France","France","Francia"),
  C("MRS","marseille","🇫🇷","Marseille","Marseille","Marsella","France","France","Francia"),
  C("LYS","lyon","🇫🇷","Lyon","Lyon","Lyon","France","France","Francia"),
  C("NCE","nice","🇫🇷","Nice","Nice","Niza","France","France","Francia"),
  C("TLS","toulouse","🇫🇷","Toulouse","Toulouse","Toulouse","France","France","Francia"),
  C("BOD","bordeaux","🇫🇷","Bordeaux","Bordeaux","Burdeos","France","France","Francia"),
  C("LON","london","🇬🇧","Londres","London","Londres","Royaume-Uni","United Kingdom","Reino Unido"),
  C("EDI","edinburgh","🇬🇧","Édimbourg","Edinburgh","Edimburgo","Royaume-Uni","United Kingdom","Reino Unido"),
  C("DUB","dublin","🇮🇪","Dublin","Dublin","Dublín","Irlande","Ireland","Irlanda"),
  C("AMS","amsterdam","🇳🇱","Amsterdam","Amsterdam","Ámsterdam","Pays-Bas","Netherlands","Países Bajos"),
  C("BRU","brussels","🇧🇪","Bruxelles","Brussels","Bruselas","Belgique","Belgium","Bélgica"),
  C("BER","berlin","🇩🇪","Berlin","Berlin","Berlín","Allemagne","Germany","Alemania"),
  C("MUC","munich","🇩🇪","Munich","Munich","Múnich","Allemagne","Germany","Alemania"),
  C("HAM","hamburg","🇩🇪","Hambourg","Hamburg","Hamburgo","Allemagne","Germany","Alemania"),
  C("ZRH","zurich","🇨🇭","Zurich","Zurich","Zúrich","Suisse","Switzerland","Suiza"),
  C("GVA","geneva","🇨🇭","Genève","Geneva","Ginebra","Suisse","Switzerland","Suiza"),
  C("VIE","vienna","🇦🇹","Vienne","Vienna","Viena","Autriche","Austria","Austria"),
  C("ROM","rome","🇮🇹","Rome","Rome","Roma","Italie","Italy","Italia"),
  C("MIL","milan","🇮🇹","Milan","Milan","Milán","Italie","Italy","Italia"),
  C("VCE","venice","🇮🇹","Venise","Venice","Venecia","Italie","Italy","Italia"),
  C("FLR","florence","🇮🇹","Florence","Florence","Florencia","Italie","Italy","Italia"),
  C("NAP","naples","🇮🇹","Naples","Naples","Nápoles","Italie","Italy","Italia"),
  C("PMO","palermo","🇮🇹","Palerme","Palermo","Palermo","Italie","Italy","Italia"),
  C("PRG","prague","🇨🇿","Prague","Prague","Praga","Tchéquie","Czechia","Chequia"),
  C("BUD","budapest","🇭🇺","Budapest","Budapest","Budapest","Hongrie","Hungary","Hungría"),
  C("KRK","krakow","🇵🇱","Cracovie","Krakow","Cracovia","Pologne","Poland","Polonia"),
  C("WAW","warsaw","🇵🇱","Varsovie","Warsaw","Varsovia","Pologne","Poland","Polonia"),
  C("BTS","bratislava","🇸🇰","Bratislava","Bratislava","Bratislava","Slovaquie","Slovakia","Eslovaquia"),
  C("BUH","bucharest","🇷🇴","Bucarest","Bucharest","Bucarest","Roumanie","Romania","Rumanía"),
  C("SOF","sofia","🇧🇬","Sofia","Sofia","Sofía","Bulgarie","Bulgaria","Bulgaria"),
  C("ZAG","zagreb","🇭🇷","Zagreb","Zagreb","Zagreb","Croatie","Croatia","Croacia"),
  C("SPU","split","🇭🇷","Split","Split","Split","Croatie","Croatia","Croacia"),
  C("DBV","dubrovnik","🇭🇷","Dubrovnik","Dubrovnik","Dubrovnik","Croatie","Croatia","Croacia"),
  C("LJU","ljubljana","🇸🇮","Ljubljana","Ljubljana","Liubliana","Slovénie","Slovenia","Eslovenia"),
  C("ATH","athens","🇬🇷","Athènes","Athens","Atenas","Grèce","Greece","Grecia"),
  C("MLA","malta","🇲🇹","Malte","Malta","Malta","Malte","Malta","Malta"),
  C("CPH","copenhagen","🇩🇰","Copenhague","Copenhagen","Copenhague","Danemark","Denmark","Dinamarca"),
  C("OSL","oslo","🇳🇴","Oslo","Oslo","Oslo","Norvège","Norway","Noruega"),
  C("STO","stockholm","🇸🇪","Stockholm","Stockholm","Estocolmo","Suède","Sweden","Suecia"),
  C("HEL","helsinki","🇫🇮","Helsinki","Helsinki","Helsinki","Finlande","Finland","Finlandia"),
  C("TLL","tallinn","🇪🇪","Tallinn","Tallinn","Tallin","Estonie","Estonia","Estonia"),
  C("RIX","riga","🇱🇻","Riga","Riga","Riga","Lettonie","Latvia","Letonia"),
];

export const bySlug = (slug: string) =>
  CITIES.find((c) => c.slug === slug);

export const cityName = (c: SeoCity, lang: string) =>
  lang === "fr" ? c.fr : lang === "es" ? c.es : c.en;

export const countryName = (c: SeoCity, lang: string) =>
  lang === "fr" ? c.cfr : lang === "es" ? c.ces : c.cen;