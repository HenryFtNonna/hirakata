// Data Lengkap Katakana (104 Huruf: Seion 46, Dakuon & Handakuon 25, Yoon 33)

export const KATAKANA_CATEGORIES = [
  { id: 'all', name: 'Semua Huruf', count: 104, desc: 'Latihan campuran seluruh huruf Katakana' },
  { id: 'seion', name: 'Huruf Dasar (Seion)', count: 46, desc: 'Huruf vokal & konsonan dasar (ア - ン)' },
  { id: 'dakuon', name: 'Tenten & Maru (Dakuon)', count: 25, desc: 'Tanda petik (ﾞ) & lingkaran (ﾟ) seperti ガ, ザ, パ' },
  { id: 'yoon', name: 'Kombinasi (Yōon)', count: 33, desc: 'Gabungan huruf kecil ya, yu, yo seperti キャ, シュ' },
];

export const KATAKANA_DATA = [
  // ================= SEION (46 HURUF DASAR) =================
  // Baris Vokal
  { id: 'k_a', char: 'ア', romaji: 'a', alts: [], type: 'seion', row: 'vowel', example: 'アイス (Aisu / Es Krim)' },
  { id: 'k_i', char: 'イ', romaji: 'i', alts: [], type: 'seion', row: 'vowel', example: 'インド (Indo / India)' },
  { id: 'k_u', char: 'ウ', romaji: 'u', alts: [], type: 'seion', row: 'vowel', example: 'ウェブ (Webu / Web)' },
  { id: 'k_e', char: 'エ', romaji: 'e', alts: [], type: 'seion', row: 'vowel', example: 'エレベーター (Erebeetaa / Lift)' },
  { id: 'k_o', char: 'オ', romaji: 'o', alts: [], type: 'seion', row: 'vowel', example: 'オレンジ (Orenji / Jeruk)' },

  // Baris K
  { id: 'k_ka', char: 'カ', romaji: 'ka', alts: [], type: 'seion', row: 'k', example: 'カメラ (Kamera / Kamera)' },
  { id: 'k_ki', char: 'キ', romaji: 'ki', alts: [], type: 'seion', row: 'k', example: 'キッチン (Kicchin / Dapur)' },
  { id: 'k_ku', char: 'ク', romaji: 'ku', alts: [], type: 'seion', row: 'k', example: 'クラス (Kurasu / Kelas)' },
  { id: 'k_ke', char: 'ケ', romaji: 'ke', alts: [], type: 'seion', row: 'k', example: 'ケーキ (Keeki / Kue)' },
  { id: 'k_ko', char: 'コ', romaji: 'ko', alts: [], type: 'seion', row: 'k', example: 'コーヒー (Koohii / Kopi)' },

  // Baris S
  { id: 'k_sa', char: 'サ', romaji: 'sa', alts: [], type: 'seion', row: 's', example: 'サラダ (Sarada / Salad)' },
  { id: 'k_shi', char: 'シ', romaji: 'shi', alts: ['si'], type: 'seion', row: 's', example: 'シャツ (Shatsu / Kemeja)' },
  { id: 'k_su', char: 'ス', romaji: 'su', alts: [], type: 'seion', row: 's', example: 'スーパー (Suupaa / Supermarket)' },
  { id: 'k_se', char: 'セ', romaji: 'se', alts: [], type: 'seion', row: 's', example: 'セーター (Seetaa / Sweter)' },
  { id: 'k_so', char: 'ソ', romaji: 'so', alts: [], type: 'seion', row: 's', example: 'ソファー (Sofaa / Sofa)' },

  // Baris T
  { id: 'k_ta', char: 'タ', romaji: 'ta', alts: [], type: 'seion', row: 't', example: 'タクシー (Takushii / Taksi)' },
  { id: 'k_chi', char: 'チ', romaji: 'chi', alts: ['ti'], type: 'seion', row: 't', example: 'チーズ (Chiizu / Keju)' },
  { id: 'k_tsu', char: 'ツ', romaji: 'tsu', alts: ['tu'], type: 'seion', row: 't', example: 'ツアー (Tsuaa / Tur)' },
  { id: 'k_te', char: 'テ', romaji: 'te', alts: [], type: 'seion', row: 't', example: 'テレビ (Terebi / Televisi)' },
  { id: 'k_to', char: 'ト', romaji: 'to', alts: [], type: 'seion', row: 't', example: 'トイレ (Toire / Toilet)' },

  // Baris N
  { id: 'k_na', char: 'ナ', romaji: 'na', alts: [], type: 'seion', row: 'n', example: 'ナイフ (Naifu / Pisau)' },
  { id: 'k_ni', char: 'ニ', romaji: 'ni', alts: [], type: 'seion', row: 'n', example: 'ニュース (Nyuusu / Berita)' },
  { id: 'k_nu', char: 'ヌ', romaji: 'nu', alts: [], type: 'seion', row: 'n', example: 'ヌードル (Nuudoru / Mi)' },
  { id: 'k_ne', char: 'ネ', romaji: 'ne', alts: [], type: 'seion', row: 'n', example: 'ネクタイ (Nekutai / Dasi)' },
  { id: 'k_no', char: 'ノ', romaji: 'no', alts: [], type: 'seion', row: 'n', example: 'ノート (Nooto / Buku Catatan)' },

  // Baris H
  { id: 'k_ha', char: 'ハ', romaji: 'ha', alts: [], type: 'seion', row: 'h', example: 'ハンバーガー (Hanbaagaa / Hamburger)' },
  { id: 'k_hi', char: 'ヒ', romaji: 'hi', alts: [], type: 'seion', row: 'h', example: 'ヒーター (Hiitaa / Pemanas)' },
  { id: 'k_fu', char: 'フ', romaji: 'fu', alts: ['hu'], type: 'seion', row: 'h', example: 'フォーク (Fooku / Garpu)' },
  { id: 'k_he', char: 'ヘ', romaji: 'he', alts: [], type: 'seion', row: 'h', example: 'ヘリコプター (Herikoputaa / Helikopter)' },
  { id: 'k_ho', char: 'ホ', romaji: 'ho', alts: [], type: 'seion', row: 'h', example: 'ホテル (Hoteru / Hotel)' },

  // Baris M
  { id: 'k_ma', char: 'マ', romaji: 'ma', alts: [], type: 'seion', row: 'm', example: 'マスク (Masuku / Masker)' },
  { id: 'k_mi', char: 'ミ', romaji: 'mi', alts: [], type: 'seion', row: 'm', example: 'ミルク (Miruku / Susu)' },
  { id: 'k_mu', char: 'ム', romaji: 'mu', alts: [], type: 'seion', row: 'm', example: 'ムービー (Muubii / Film)' },
  { id: 'k_me', char: 'メ', romaji: 'me', alts: [], type: 'seion', row: 'm', example: 'メニュー (Menyuu / Menu)' },
  { id: 'k_mo', char: 'モ', romaji: 'mo', alts: [], type: 'seion', row: 'm', example: 'モデル (Moderu / Model)' },

  // Baris Y
  { id: 'k_ya', char: 'ヤ', romaji: 'ya', alts: [], type: 'seion', row: 'y', example: 'ヤング (Yangu / Muda)' },
  { id: 'k_yu', char: 'ユ', romaji: 'yu', alts: [], type: 'seion', row: 'y', example: 'ユニフォーム (Yunifoomu / Seragam)' },
  { id: 'k_yo', char: 'ヨ', romaji: 'yo', alts: [], type: 'seion', row: 'y', example: 'ヨーグルト (Yooguruto / Yogurt)' },

  // Baris R
  { id: 'k_ra', char: 'ラ', romaji: 'ra', alts: [], type: 'seion', row: 'r', example: 'ラジオ (Rajio / Radio)' },
  { id: 'k_ri', char: 'リ', romaji: 'ri', alts: [], type: 'seion', row: 'r', example: 'リンゴ (Ringo / Apel)' },
  { id: 'k_ru', char: 'ル', romaji: 'ru', alts: [], type: 'seion', row: 'r', example: 'ルール (Ruuru / Aturan)' },
  { id: 'k_re', char: 'レ', romaji: 're', alts: [], type: 'seion', row: 'r', example: 'レストラン (Resutoran / Restoran)' },
  { id: 'k_ro', char: 'ロ', romaji: 'ro', alts: [], type: 'seion', row: 'r', example: 'ロボット (Robotto / Robot)' },

  // Baris W & N
  { id: 'k_wa', char: 'ワ', romaji: 'wa', alts: [], type: 'seion', row: 'w', example: 'ワイン (Wain / Anggur)' },
  { id: 'k_wo', char: 'ヲ', romaji: 'wo', alts: ['o'], type: 'seion', row: 'w', example: 'ヲ (Wo / Partikel jarang)' },
  { id: 'k_n', char: 'ン', romaji: 'n', alts: ['nn'], type: 'seion', row: 'n-end', example: 'パン (Pan / Roti)' },

  // ================= DAKUON (20 HURUF TENTEN ﾞ) =================
  // Baris G
  { id: 'k_ga', char: 'ガ', romaji: 'ga', alts: [], type: 'dakuon', row: 'g', example: 'ガラス (Garasu / Kaca)' },
  { id: 'k_gi', char: 'ギ', romaji: 'gi', alts: [], type: 'dakuon', row: 'g', example: 'ギター (Gitaa / Gitar)' },
  { id: 'k_gu', char: 'グ', romaji: 'gu', alts: [], type: 'dakuon', row: 'g', example: 'グループ (Guruupu / Kelompok)' },
  { id: 'k_ge', char: 'ゲ', romaji: 'ge', alts: [], type: 'dakuon', row: 'g', example: 'ゲーム (Geemu / Game)' },
  { id: 'k_go', char: 'ゴ', romaji: 'go', alts: [], type: 'dakuon', row: 'g', example: 'ゴルフ (Gorufu / Golf)' },

  // Baris Z
  { id: 'k_za', char: 'ザ', romaji: 'za', alts: [], type: 'dakuon', row: 'z', example: 'デザート (Dezaato / Makanan Penutup)' },
  { id: 'k_ji_z', char: 'ジ', romaji: 'ji', alts: ['zi'], type: 'dakuon', row: 'z', example: 'ジュース (Juusu / Jus)' },
  { id: 'k_zu_z', char: 'ズ', romaji: 'zu', alts: [], type: 'dakuon', row: 'z', example: 'ズボン (Zubon / Celana)' },
  { id: 'k_ze', char: 'ゼ', romaji: 'ze', alts: [], type: 'dakuon', row: 'z', example: 'ゼロ (Zero / Nol)' },
  { id: 'k_zo', char: 'ゾ', romaji: 'zo', alts: [], type: 'dakuon', row: 'z', example: 'ゾンビ (Zonbi / Zombie)' },

  // Baris D
  { id: 'k_da', char: 'ダ', romaji: 'da', alts: [], type: 'dakuon', row: 'd', example: 'ダンス (Dansu / Tarian)' },
  { id: 'k_ji_d', char: 'ヂ', romaji: 'ji', alts: ['di'], type: 'dakuon', row: 'd', example: 'ラジオ (Jarang dipakai)' },
  { id: 'k_zu_d', char: 'ヅ', romaji: 'zu', alts: ['du'], type: 'dakuon', row: 'd', example: 'ツヅ (Jarang dipakai)' },
  { id: 'k_de', char: 'デ', romaji: 'de', alts: [], type: 'dakuon', row: 'd', example: 'デパート (Depaato / Mal)' },
  { id: 'k_do', char: 'ド', romaji: 'do', alts: [], type: 'dakuon', row: 'd', example: 'ドア (Doa / Pintu)' },

  // Baris B
  { id: 'k_ba', char: 'バ', romaji: 'ba', alts: [], type: 'dakuon', row: 'b', example: 'バス (Basu / Bus)' },
  { id: 'k_bi', char: 'ビ', romaji: 'bi', alts: [], type: 'dakuon', row: 'b', example: 'ビール (Biiru / Bir)' },
  { id: 'k_bu', char: 'ブ', romaji: 'bu', alts: [], type: 'dakuon', row: 'b', example: 'ベッド (Beddo / Tempat Tidur)' },
  { id: 'k_be', char: 'ベ', romaji: 'be', alts: [], type: 'dakuon', row: 'b', example: 'ベル (Beru / Bel)' },
  { id: 'k_bo', char: 'ボ', romaji: 'bo', alts: [], type: 'dakuon', row: 'b', example: 'ボタン (Botan / Tombol)' },

  // ================= HANDAKUON (5 HURUF MARU ﾟ) =================
  // Baris P
  { id: 'k_pa', char: 'パ', romaji: 'pa', alts: [], type: 'dakuon', row: 'p', example: 'パン (Pan / Roti)' },
  { id: 'k_pi', char: 'ピ', romaji: 'pi', alts: [], type: 'dakuon', row: 'p', example: 'ピアノ (Piano / Piano)' },
  { id: 'k_pu', char: 'プ', romaji: 'pu', alts: [], type: 'dakuon', row: 'p', example: 'プール (Puuru / Kolam Renang)' },
  { id: 'k_pe', char: 'ペ', romaji: 'pe', alts: [], type: 'dakuon', row: 'p', example: 'ペン (Pen / Pulpen)' },
  { id: 'k_po', char: 'ポ', romaji: 'po', alts: [], type: 'dakuon', row: 'p', example: 'ポスト (Posuto / Kotak Pos)' },

  // ================= YOON (33 HURUF KOMBINASI) =================
  // K
  { id: 'k_kya', char: 'キャ', romaji: 'kya', alts: [], type: 'yoon', row: 'ky', example: 'キャンプ (Kyanpu / Kemah)' },
  { id: 'k_kyu', char: 'キュ', romaji: 'kyu', alts: [], type: 'yoon', row: 'ky', example: 'キュー (Kyuu / Isyarat)' },
  { id: 'k_kyo', char: 'キョ', romaji: 'kyo', alts: [], type: 'yoon', row: 'ky', example: 'キロ (Kiro / Kilo)' },

  // S
  { id: 'k_sha', char: 'シャ', romaji: 'sha', alts: ['sya'], type: 'yoon', row: 'sh', example: 'シャワー (Shawaa / Pancuran)' },
  { id: 'k_shu', char: 'シュ', romaji: 'shu', alts: ['syu'], type: 'yoon', row: 'sh', example: 'シューズ (Shuuzu / Sepatu)' },
  { id: 'k_sho', char: 'ショ', romaji: 'sho', alts: ['syo'], type: 'yoon', row: 'sh', example: 'シャツ (Shatsu / Kemeja)' },

  // T
  { id: 'k_cha', char: 'チャ', romaji: 'cha', alts: ['tya'], type: 'yoon', row: 'ch', example: 'チャンス (Chansu / Kesempatan)' },
  { id: 'k_chu', char: 'チュ', romaji: 'chu', alts: ['tyu'], type: 'yoon', row: 'ch', example: 'チューブ (Chuubu / Tabung)' },
  { id: 'k_cho', char: 'チョ', romaji: 'cho', alts: ['tyo'], type: 'yoon', row: 'ch', example: 'チョコレート (Chokoreeto / Cokelat)' },

  // N
  { id: 'k_nya', char: 'ニャ', romaji: 'nya', alts: [], type: 'yoon', row: 'ny', example: 'ニャン (Nyan / Meong)' },
  { id: 'k_nyu', char: 'ニュ', romaji: 'nyu', alts: [], type: 'yoon', row: 'ny', example: 'ニュース (Nyuusu / Berita)' },
  { id: 'k_nyo', char: 'ニョ', romaji: 'nyo', alts: [], type: 'yoon', row: 'ny', example: 'ニョ (Nyo)' },

  // H
  { id: 'k_hya', char: 'ヒャ', romaji: 'hya', alts: [], type: 'yoon', row: 'hy', example: 'ヒャ (Hya)' },
  { id: 'k_hyu', char: 'ヒュ', romaji: 'hyu', alts: [], type: 'yoon', row: 'hy', example: 'ヒュ (Hyu)' },
  { id: 'k_hyo', char: 'ヒョ', romaji: 'hyo', alts: [], type: 'yoon', row: 'hy', example: 'ヒョ (Hyo)' },

  // M
  { id: 'k_mya', char: 'ミャ', romaji: 'mya', alts: [], type: 'yoon', row: 'my', example: 'ミャンマー (Myanmaa / Myanmar)' },
  { id: 'k_myu', char: 'ミュ', romaji: 'myu', alts: [], type: 'yoon', row: 'my', example: 'ミュージカル (Myuujikaru / Musikal)' },
  { id: 'k_myo', char: 'ミョ', romaji: 'myo', alts: [], type: 'yoon', row: 'my', example: 'ミョ (Myo)' },

  // R
  { id: 'k_rya', char: 'リャ', romaji: 'rya', alts: [], type: 'yoon', row: 'ry', example: 'リャ (Rya)' },
  { id: 'k_ryu', char: 'リュ', romaji: 'ryu', alts: [], type: 'yoon', row: 'ry', example: 'リュック (Ryukku / Ransel)' },
  { id: 'k_ryo', char: 'リョ', romaji: 'ryo', alts: [], type: 'yoon', row: 'ry', example: 'リョ (Ryo)' },

  // G
  { id: 'k_gya', char: 'ギャ', romaji: 'gya', alts: [], type: 'yoon', row: 'gy', example: 'ギャラリー (Gyararii / Galeri)' },
  { id: 'k_gyu', char: 'ギュ', romaji: 'gyu', alts: [], type: 'yoon', row: 'gy', example: 'ギュ (Gyu)' },
  { id: 'k_gyo', char: 'ギョ', romaji: 'gyo', alts: [], type: 'yoon', row: 'gy', example: 'ギョ (Gyo)' },

  // J
  { id: 'k_ja', char: 'ジャ', romaji: 'ja', alts: ['jya'], type: 'yoon', row: 'j', example: 'ジャケット (Jaketto / Jaket)' },
  { id: 'k_ju', char: 'ジュ', romaji: 'ju', alts: ['jyu'], type: 'yoon', row: 'j', example: 'ジュース (Juusu / Jus)' },
  { id: 'k_jo', char: 'ジョ', romaji: 'jo', alts: ['jyo'], type: 'yoon', row: 'j', example: 'ジョギング (Jogingu / Joging)' },

  // B
  { id: 'k_bya', char: 'ビャ', romaji: 'bya', alts: [], type: 'yoon', row: 'by', example: 'ビャ (Bya)' },
  { id: 'k_byu', char: 'ビュ', romaji: 'byu', alts: [], type: 'yoon', row: 'by', example: 'ビュッフェ (Byuffe / Prasmanan)' },
  { id: 'k_byo', char: 'ビョ', romaji: 'byo', alts: [], type: 'yoon', row: 'by', example: 'ビョ (Byo)' },

  // P
  { id: 'k_pya', char: 'ピャ', romaji: 'pya', alts: [], type: 'yoon', row: 'py', example: 'ピャ (Pya)' },
  { id: 'k_pyu', char: 'ピュ', romaji: 'pyu', alts: [], type: 'yoon', row: 'py', example: 'ピューター (Pyuutaa)' },
  { id: 'k_pyo', char: 'ピョ', romaji: 'pyo', alts: [], type: 'yoon', row: 'py', example: 'ピョン (Pyon)' },
];

export function getKatakanaByCategory(category = 'all') {
  if (category === 'all') return [...KATAKANA_DATA];
  return KATAKANA_DATA.filter((item) => item.type === category);
}

export function shuffleKatakana(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function checkKatakanaAnswer(input, item) {
  if (!input || !item) return false;
  const clean = input.trim().toLowerCase();
  if (clean === item.romaji.toLowerCase()) return true;
  if (item.alts && item.alts.some((alt) => alt.toLowerCase() === clean)) {
    return true;
  }
  return false;
}
