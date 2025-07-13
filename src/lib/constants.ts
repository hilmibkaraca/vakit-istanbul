export const ISTANBUL_DISTRICTS = [
  { id: '1', name: 'Adalar', code: 'ADALAR' },
  { id: '2', name: 'Arnavutköy', code: 'ARNAVUTKOY' },
  { id: '3', name: 'Ataşehir', code: 'ATASEHIR' },
  { id: '4', name: 'Avcılar', code: 'AVCILAR' },
  { id: '5', name: 'Bağcılar', code: 'BAGCILAR' },
  { id: '6', name: 'Bahçelievler', code: 'BAHCELIEVLER' },
  { id: '7', name: 'Bakırköy', code: 'BAKIRKOY' },
  { id: '8', name: 'Başakşehir', code: 'BASAKSEHIR' },
  { id: '9', name: 'Bayrampaşa', code: 'BAYRAMPASA' },
  { id: '10', name: 'Beşiktaş', code: 'BESIKTAS' },
  { id: '11', name: 'Beykoz', code: 'BEYKOZ' },
  { id: '12', name: 'Beylikdüzü', code: 'BEYLIKDUZU' },
  { id: '13', name: 'Beyoğlu', code: 'BEYOGLU' },
  { id: '14', name: 'Büyükçekmece', code: 'BUYUKCEKMECE' },
  { id: '15', name: 'Çatalca', code: 'CATALCA' },
  { id: '16', name: 'Çekmeköy', code: 'CEKMEKOY' },
  { id: '17', name: 'Esenler', code: 'ESENLER' },
  { id: '18', name: 'Esenyurt', code: 'ESENYURT' },
  { id: '19', name: 'Eyüpsultan', code: 'EYUPSULTAN' },
  { id: '20', name: 'Fatih', code: 'FATIH' },
  { id: '21', name: 'Gaziosmanpaşa', code: 'GAZIOSMANPASA' },
  { id: '22', name: 'Güngören', code: 'GUNGOREN' },
  { id: '23', name: 'Kadıköy', code: 'KADIKOY' },
  { id: '24', name: 'Kağıthane', code: 'KAGITHANE' },
  { id: '25', name: 'Kartal', code: 'KARTAL' },
  { id: '26', name: 'Küçükçekmece', code: 'KUCUKCEKMECE' },
  { id: '27', name: 'Maltepe', code: 'MALTEPE' },
  { id: '28', name: 'Pendik', code: 'PENDIK' },
  { id: '29', name: 'Sancaktepe', code: 'SANCAKTEPE' },
  { id: '30', name: 'Sarıyer', code: 'SARIYER' },
  { id: '31', name: 'Silivri', code: 'SILIVRI' },
  { id: '32', name: 'Sultanbeyli', code: 'SULTANBEYLI' },
  { id: '33', name: 'Sultangazi', code: 'SULTANGAZI' },
  { id: '34', name: 'Şile', code: 'SILE' },
  { id: '35', name: 'Şişli', code: 'SISLI' },
  { id: '36', name: 'Tuzla', code: 'TUZLA' },
  { id: '37', name: 'Ümraniye', code: 'UMRANIYE' },
  { id: '38', name: 'Üsküdar', code: 'USKUDAR' },
  { id: '39', name: 'Zeytinburnu', code: 'ZEYTINBURNU' },
];

export const PRAYER_NAMES = {
  TR: {
    fajr: 'İmsak',
    sunrise: 'Güneş',
    dhuhr: 'Öğle',
    asr: 'İkindi',
    maghrib: 'Akşam',
    isha: 'Yatsı'
  },
  EN: {
    fajr: 'Fajr',
    sunrise: 'Sunrise',
    dhuhr: 'Dhuhr',
    asr: 'Asr',
    maghrib: 'Maghrib',
    isha: 'Isha'
  }
};

export const PRAYER_ICONS = {
  fajr: '🌅',
  sunrise: '☀️',
  dhuhr: '🌞',
  asr: '🌤️',
  maghrib: '🌆',
  isha: '🌙'
};

export const ADSENSE_SLOTS = {
  HEADER_BANNER: '1234567890',
  CONTENT_SQUARE: '0987654321',
  FOOTER_BANNER: '1122334455'
};

export const API_ENDPOINTS = {
  PRAYER_TIMES: '/api/prayer-times',
  DIYANET_API: 'https://ezanvakti.herokuapp.com/vakitler',
  FALLBACK_API: 'https://api.pray.zone/v2/times/today.json'
};