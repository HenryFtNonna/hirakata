// Data Lengkap Hiragana (104 Huruf: Seion 46, Dakuon & Handakuon 25, Yoon 33)

export const HIRAGANA_CATEGORIES = [
  { id: 'all', name: 'Semua Huruf', count: 104, desc: 'Latihan campuran seluruh huruf Hiragana' },
  { id: 'seion', name: 'Huruf Dasar (Seion)', count: 46, desc: 'Huruf vokal & konsonan dasar (あ - ん)' },
  { id: 'dakuon', name: 'Tenten & Maru (Dakuon)', count: 25, desc: 'Tanda petik (ﾞ) & lingkaran (ﾟ) seperti が, ざ, ぱ' },
  { id: 'yoon', name: 'Kombinasi (Yōon)', count: 33, desc: 'Gabungan huruf kecil ya, yu, yo seperti きゃ, しゅ' },
];

export const HIRAGANA_DATA = [
  // ================= SEION (46 HURUF DASAR) =================
  // Baris Vokal
  { id: 'a', char: 'あ', romaji: 'a', alts: [], type: 'seion', row: 'vowel', example: 'ありがとう (Arigatou / Terima kasih)' },
  { id: 'i', char: 'い', romaji: 'i', alts: [], type: 'seion', row: 'vowel', example: 'いぬ (Inu / Anjing)' },
  { id: 'u', char: 'う', romaji: 'u', alts: [], type: 'seion', row: 'vowel', example: 'うみ (Umi / Laut)' },
  { id: 'e', char: 'え', romaji: 'e', alts: [], type: 'seion', row: 'vowel', example: 'えき (Eki / Stasiun)' },
  { id: 'o', char: 'お', romaji: 'o', alts: [], type: 'seion', row: 'vowel', example: 'おちゃ (Ocha / Teh)' },

  // Baris K
  { id: 'ka', char: 'か', romaji: 'ka', alts: [], type: 'seion', row: 'k', example: 'かわ (Kawa / Sungai)' },
  { id: 'ki', char: 'き', romaji: 'ki', alts: [], type: 'seion', row: 'k', example: 'きのう (Kinou / Kemarin)' },
  { id: 'ku', char: 'く', romaji: 'ku', alts: [], type: 'seion', row: 'k', example: 'くるま (Kuruma / Mobil)' },
  { id: 'ke', char: 'け', romaji: 'ke', alts: [], type: 'seion', row: 'k', example: 'けさ (Kesa / Pagi ini)' },
  { id: 'ko', char: 'こ', romaji: 'ko', alts: [], type: 'seion', row: 'k', example: 'こども (Kodomo / Anak-anak)' },

  // Baris S
  { id: 'sa', char: 'さ', romaji: 'sa', alts: [], type: 'seion', row: 's', example: 'さくら (Sakura / Bunga Sakura)' },
  { id: 'shi', char: 'し', romaji: 'shi', alts: ['si'], type: 'seion', row: 's', example: 'しろ (Shiro / Putih)' },
  { id: 'su', char: 'す', romaji: 'su', alts: [], type: 'seion', row: 's', example: 'すし (Sushi / Sushi)' },
  { id: 'se', char: 'せ', romaji: 'se', alts: [], type: 'seion', row: 's', example: 'せんせい (Sensei / Guru)' },
  { id: 'so', char: 'そ', romaji: 'so', alts: [], type: 'seion', row: 's', example: 'そら (Sora / Langit)' },

  // Baris T
  { id: 'ta', char: 'た', romaji: 'ta', alts: [], type: 'seion', row: 't', example: 'たまご (Tamago / Telur)' },
  { id: 'chi', char: 'ち', romaji: 'chi', alts: ['ti'], type: 'seion', row: 't', example: 'ちち (Chichi / Ayah)' },
  { id: 'tsu', char: 'つ', romaji: 'tsu', alts: ['tu'], type: 'seion', row: 't', example: 'つき (Tsuki / Bulan)' },
  { id: 'te', char: 'て', romaji: 'te', alts: [], type: 'seion', row: 't', example: 'て (Te / Tangan)' },
  { id: 'to', char: 'と', romaji: 'to', alts: [], type: 'seion', row: 't', example: 'ともだち (Tomodachi / Teman)' },

  // Baris N
  { id: 'na', char: 'な', romaji: 'na', alts: [], type: 'seion', row: 'n', example: 'なつ (Natsu / Musim Panas)' },
  { id: 'ni', char: 'に', romaji: 'ni', alts: [], type: 'seion', row: 'n', example: 'にほん (Nihon / Jepang)' },
  { id: 'nu', char: 'ぬ', romaji: 'nu', alts: [], type: 'seion', row: 'n', example: 'ぬいぐるみ (Nuigurumi / Boneka)' },
  { id: 'ne', char: 'ね', romaji: 'ne', alts: [], type: 'seion', row: 'n', example: 'ねこ (Neko / Kucing)' },
  { id: 'no', char: 'の', romaji: 'no', alts: [], type: 'seion', row: 'n', example: 'のみもの (Nomimono / Minuman)' },

  // Baris H
  { id: 'ha', char: 'は', romaji: 'ha', alts: [], type: 'seion', row: 'h', example: 'はな (Hana / Bunga)' },
  { id: 'hi', char: 'ひ', romaji: 'hi', alts: [], type: 'seion', row: 'h', example: 'ひと (Hito / Orang)' },
  { id: 'fu', char: 'ふ', romaji: 'fu', alts: ['hu'], type: 'seion', row: 'h', example: 'ふゆ (Fuyu / Musim Dingin)' },
  { id: 'he', char: 'へ', romaji: 'he', alts: [], type: 'seion', row: 'h', example: 'へや (Heya / Kamar)' },
  { id: 'ho', char: 'ほ', romaji: 'ho', alts: [], type: 'seion', row: 'h', example: 'ほん (Hon / Buku)' },

  // Baris M
  { id: 'ma', char: 'ま', romaji: 'ma', alts: [], type: 'seion', row: 'm', example: 'まち (Machi / Kota)' },
  { id: 'mi', char: 'み', romaji: 'mi', alts: [], type: 'seion', row: 'm', example: 'みず (Mizu / Air)' },
  { id: 'mu', char: 'む', romaji: 'mu', alts: [], type: 'seion', row: 'm', example: 'むし (Mushi / Serangga)' },
  { id: 'me', char: 'め', romaji: 'me', alts: [], type: 'seion', row: 'm', example: 'め (Me / Mata)' },
  { id: 'mo', char: 'も', romaji: 'mo', alts: [], type: 'seion', row: 'm', example: 'もり (Mori / Hutan)' },

  // Baris Y
  { id: 'ya', char: 'や', romaji: 'ya', alts: [], type: 'seion', row: 'y', example: 'やま (Yama / Gunung)' },
  { id: 'yu', char: 'ゆ', romaji: 'yu', alts: [], type: 'seion', row: 'y', example: 'ゆき (Yuki / Salju)' },
  { id: 'yo', char: 'よ', romaji: 'yo', alts: [], type: 'seion', row: 'y', example: 'よる (Yoru / Malam)' },

  // Baris R
  { id: 'ra', char: 'ら', romaji: 'ra', alts: [], type: 'seion', row: 'r', example: 'らいおん (Raion / Singa)' },
  { id: 'ri', char: 'り', romaji: 'ri', alts: [], type: 'seion', row: 'r', example: 'りんご (Ringo / Apel)' },
  { id: 'ru', char: 'る', romaji: 'ru', alts: [], type: 'seion', row: 'r', example: 'るす (Rusu / Tidak di rumah)' },
  { id: 're', char: 'れ', romaji: 're', alts: [], type: 'seion', row: 'r', example: 'れんしゅう (Renshuu / Latihan)' },
  { id: 'ro', char: 'ろ', romaji: 'ro', alts: [], type: 'seion', row: 'r', example: 'ろうそく (Rousoku / Lilin)' },

  // Baris W & N
  { id: 'wa', char: 'わ', romaji: 'wa', alts: [], type: 'seion', row: 'w', example: 'わたし (Watashi / Saya)' },
  { id: 'wo', char: 'を', romaji: 'wo', alts: ['o'], type: 'seion', row: 'w', example: 'みずをのむ (Mizu wo nomu / Minum air)' },
  { id: 'n', char: 'ん', romaji: 'n', alts: ['nn'], type: 'seion', row: 'n-end', example: 'にほん (Nihon / Jepang)' },

  // ================= DAKUON (20 HURUF TENTEN ﾞ) =================
  // Baris G
  { id: 'ga', char: 'が', romaji: 'ga', alts: [], type: 'dakuon', row: 'g', example: 'がっこう (Gakkou / Sekolah)' },
  { id: 'gi', char: 'ぎ', romaji: 'gi', alts: [], type: 'dakuon', row: 'g', example: 'ぎんこう (Ginkou / Bank)' },
  { id: 'gu', char: 'ぐ', romaji: 'gu', alts: [], type: 'dakuon', row: 'g', example: 'ぐあい (Guai / Kondisi)' },
  { id: 'ge', char: 'げ', romaji: 'ge', alts: [], type: 'dakuon', row: 'g', example: 'げんき (Genki / Sehat)' },
  { id: 'go', char: 'ご', romaji: 'go', alts: [], type: 'dakuon', row: 'g', example: 'ごはん (Gohan / Nasi)' },

  // Baris Z
  { id: 'za', char: 'ざ', romaji: 'za', alts: [], type: 'dakuon', row: 'z', example: 'ざっし (Zasshi / Majalah)' },
  { id: 'ji_z', char: 'じ', romaji: 'ji', alts: ['zi'], type: 'dakuon', row: 'z', example: 'じかん (Jikan / Waktu)' },
  { id: 'zu_z', char: 'ず', romaji: 'zu', alts: [], type: 'dakuon', row: 'z', example: 'ずぼん (Zubon / Celana)' },
  { id: 'ze', char: 'ぜ', romaji: 'ze', alts: [], type: 'dakuon', row: 'z', example: 'ぜんぶ (Zenbu / Semuanya)' },
  { id: 'zo', char: 'ぞ', romaji: 'zo', alts: [], type: 'dakuon', row: 'z', example: 'ぞう (Zou / Gajah)' },

  // Baris D
  { id: 'da', char: 'だ', romaji: 'da', alts: [], type: 'dakuon', row: 'd', example: 'だいがく (Daigaku / Universitas)' },
  { id: 'ji_d', char: 'ぢ', romaji: 'ji', alts: ['di'], type: 'dakuon', row: 'd', example: 'はなぢ (Hanaji / Mimisan)' },
  { id: 'zu_d', char: 'づ', romaji: 'zu', alts: ['du'], type: 'dakuon', row: 'd', example: 'つづく (Tsuzuku / Bersambung)' },
  { id: 'de', char: 'で', romaji: 'de', alts: [], type: 'dakuon', row: 'd', example: 'でんしゃ (Densha / Kereta)' },
  { id: 'do', char: 'ど', romaji: 'do', alts: [], type: 'dakuon', row: 'd', example: 'どこ (Doko / Di mana)' },

  // Baris B
  { id: 'ba', char: 'ば', romaji: 'ba', alts: [], type: 'dakuon', row: 'b', example: 'ばんごう (Bangou / Nomor)' },
  { id: 'bi', char: 'び', romaji: 'bi', alts: [], type: 'dakuon', row: 'b', example: 'びょういん (Byouin / Rumah Sakit)' },
  { id: 'bu', char: 'ぶ', romaji: 'bu', alts: [], type: 'dakuon', row: 'b', example: 'ぶた (Buta / Babi)' },
  { id: 'be', char: 'べ', romaji: 'be', alts: [], type: 'dakuon', row: 'b', example: 'べんきょう (Benkyou / Belajar)' },
  { id: 'bo', char: 'ぼ', romaji: 'bo', alts: [], type: 'dakuon', row: 'b', example: 'ぼうし (Boushi / Topi)' },

  // ================= HANDAKUON (5 HURUF MARU ﾟ) =================
  // Baris P
  { id: 'pa', char: 'ぱ', romaji: 'pa', alts: [], type: 'dakuon', row: 'p', example: 'ぱん (Pan / Roti)' },
  { id: 'pi', char: 'ぴ', romaji: 'pi', alts: [], type: 'dakuon', row: 'p', example: 'ぴあの (Piano / Piano)' },
  { id: 'pu', char: 'ぷ', romaji: 'pu', alts: [], type: 'dakuon', row: 'p', example: 'ぷれぜんと (Purezento / Hadiah)' },
  { id: 'pe', char: 'ぺ', romaji: 'pe', alts: [], type: 'dakuon', row: 'p', example: 'ぺん (Pen / Pulpen)' },
  { id: 'po', char: 'ぽ', romaji: 'po', alts: [], type: 'dakuon', row: 'p', example: 'ぽけっと (Poketto / Saku)' },

  // ================= YOON (33 HURUF KOMBINASI) =================
  // K
  { id: 'kya', char: 'きゃ', romaji: 'kya', alts: [], type: 'yoon', row: 'ky', example: 'きゃく (Kyaku / Tamu)' },
  { id: 'kyu', char: 'きゅ', romaji: 'kyu', alts: [], type: 'yoon', row: 'ky', example: 'きゅう (Kyuu / Sembilan)' },
  { id: 'kyo', char: 'きょ', romaji: 'kyo', alts: [], type: 'yoon', row: 'ky', example: 'きょう (Kyou / Hari ini)' },

  // S
  { id: 'sha', char: 'しゃ', romaji: 'sha', alts: ['sya'], type: 'yoon', row: 'sh', example: 'しゃしん (Shashin / Foto)' },
  { id: 'shu', char: 'しゅ', romaji: 'shu', alts: ['syu'], type: 'yoon', row: 'sh', example: 'しゅくだい (Shukudai / PR)' },
  { id: 'sho', char: 'しょ', romaji: 'sho', alts: ['syo'], type: 'yoon', row: 'sh', example: 'しょうゆ (Shouyu / Kecap Asin)' },

  // T
  { id: 'cha', char: 'ちゃ', romaji: 'cha', alts: ['tya'], type: 'yoon', row: 'ch', example: 'おちゃ (Ocha / Teh)' },
  { id: 'chu', char: 'ちゅ', romaji: 'chu', alts: ['tyu'], type: 'yoon', row: 'ch', example: 'ちゅうごく (Chuugoku / China)' },
  { id: 'cho', char: 'ちょ', romaji: 'cho', alts: ['tyo'], type: 'yoon', row: 'ch', example: 'ちょっと (Chotto / Sebentar)' },

  // N
  { id: 'nya', char: 'にゃ', romaji: 'nya', alts: [], type: 'yoon', row: 'ny', example: 'にゃー (Nyaa / Suara Kucing)' },
  { id: 'nyu', char: 'にゅ', romaji: 'nyu', alts: [], type: 'yoon', row: 'ny', example: 'ぎゅうにゅう (Gyuunyuu / Susu Sapi)' },
  { id: 'nyo', char: 'にょ', romaji: 'nyo', alts: [], type: 'yoon', row: 'ny', example: 'にょうぼう (Nyoubou / Istri)' },

  // H
  { id: 'hya', char: 'ひゃ', romaji: 'hya', alts: [], type: 'yoon', row: 'hy', example: 'ひゃく (Hyaku / Seratus)' },
  { id: 'hyu', char: 'ひゅ', romaji: 'hyu', alts: [], type: 'yoon', row: 'hy', example: 'ひゅー (Hyuu / Suara Angin)' },
  { id: 'hyo', char: 'ひょ', romaji: 'hyo', alts: [], type: 'yoon', row: 'hy', example: 'ひょう (Hyou / Tabel / Macan Tutul)' },

  // M
  { id: 'mya', char: 'みゃ', romaji: 'mya', alts: [], type: 'yoon', row: 'my', example: 'みゃく (Myaku / Denyut Nadi)' },
  { id: 'myu', char: 'みゅ', romaji: 'myu', alts: [], type: 'yoon', row: 'my', example: 'みゅーじかる (Myuujikaru / Musikal)' },
  { id: 'myo', char: 'みょ', romaji: 'myo', alts: [], type: 'yoon', row: 'my', example: 'みょうじ (Myouji / Nama Keluarga)' },

  // R
  { id: 'rya', char: 'りゃ', romaji: 'rya', alts: [], type: 'yoon', row: 'ry', example: 'りゃく (Ryaku / Singkatan)' },
  { id: 'ryu', char: 'りゅ', romaji: 'ryu', alts: [], type: 'yoon', row: 'ry', example: 'りゅう (Ryuu / Naga)' },
  { id: 'ryo', char: 'りょ', romaji: 'ryo', alts: [], type: 'yoon', row: 'ry', example: 'りょこう (Ryokou / Liburan)' },

  // G
  { id: 'gya', char: 'ぎゃ', romaji: 'gya', alts: [], type: 'yoon', row: 'gy', example: 'ぎゃく (Gyaku / Kebalikan)' },
  { id: 'gyu', char: 'ぎゅ', romaji: 'gyu', alts: [], type: 'yoon', row: 'gy', example: 'ぎゅうにく (Gyuuniku / Daging Sapi)' },
  { id: 'gyo', char: 'ぎょ', romaji: 'gyo', alts: [], type: 'yoon', row: 'gy', example: 'ぎょうざ (Gyouza / Gyoza)' },

  // J
  { id: 'ja', char: 'じゃ', romaji: 'ja', alts: ['jya'], type: 'yoon', row: 'j', example: 'じゃあね (Jaane / Sampai Nanti)' },
  { id: 'ju', char: 'じゅ', romaji: 'ju', alts: ['jyu'], type: 'yoon', row: 'j', example: 'じゅう (Juu / Sepuluh)' },
  { id: 'jo', char: 'じょ', romaji: 'jo', alts: ['jyo'], type: 'yoon', row: 'j', example: 'じょせい (Josei / Perempuan)' },

  // B
  { id: 'bya', char: 'びゃ', romaji: 'bya', alts: [], type: 'yoon', row: 'by', example: 'さんびゃく (Sanbyaku / 300)' },
  { id: 'byu', char: 'びゅ', romaji: 'byu', alts: [], type: 'yoon', row: 'by', example: 'びゅーてぃー (Byuutii / Beauty)' },
  { id: 'byo', char: 'びょ', romaji: 'byo', alts: [], type: 'yoon', row: 'by', example: 'びょういん (Byouin / Rumah Sakit)' },

  // P
  { id: 'pya', char: 'ぴゃ', romaji: 'pya', alts: [], type: 'yoon', row: 'py', example: 'ろっぴゃく (Roppyaku / 600)' },
  { id: 'pyu', char: 'ぴゅ', romaji: 'pyu', alts: [], type: 'yoon', row: 'py', example: 'ぴゅあ (Pyua / Murni / Pure)' },
  { id: 'pyo', char: 'ぴょ', romaji: 'pyo', alts: [], type: 'yoon', row: 'py', example: 'ぴょんぴょん (Pyonpyon / Melompat-lompat)' },
];

/**
 * Filter list hiragana berdasarkan kategori: 'all' | 'seion' | 'dakuon' | 'yoon'
 */
export function getHiraganaByCategory(category = 'all') {
  if (category === 'all') return [...HIRAGANA_DATA];
  return HIRAGANA_DATA.filter((item) => item.type === category);
}

/**
 * Mengacak array dengan Fisher-Yates shuffle
 */
export function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Validasi romaji yang diinput user
 * Support case-insensitive, trim spasi, dan romaji alternatif (seperti shi / si, fu / hu, tsu / tu)
 */
export function checkRomajiAnswer(input, item) {
  if (!input || !item) return false;
  const cleanInput = input.trim().toLowerCase();
  if (cleanInput === item.romaji.toLowerCase()) return true;
  if (item.alts && item.alts.some((alt) => alt.toLowerCase() === cleanInput)) {
    return true;
  }
  return false;
}

