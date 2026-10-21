// Data Kosakata Penting JLPT N5 (~80 Kosakata Inti yang Paling Sering Muncul)

export const KOSAKATA_CATEGORIES = [
  { id: 'all', name: 'Semua Kosakata', count: 80 },
  { id: 'salam', name: 'Salam & Sapaan', count: 12 },
  { id: 'kata_kerja', name: 'Kata Kerja (Doushi)', count: 20 },
  { id: 'kata_sifat', name: 'Kata Sifat (Keiyoushi)', count: 18 },
  { id: 'waktu', name: 'Waktu & Frekuensi', count: 14 },
  { id: 'kehidupan', name: 'Tempat & Makanan', count: 16 },
];

export const KOSAKATA_DATA = [
  // SALAM & SAPAAN
  { id: 'v1', kana: 'おはようございます', romaji: 'ohayou gozaimasu', kanji: '-', arti: 'Selamat pagi (sopan)', category: 'salam' },
  { id: 'v2', kana: 'こんにちは', romaji: 'konnichiwa', kanji: '-', arti: 'Halo / Selamat siang', category: 'salam' },
  { id: 'v3', kana: 'こんばんは', romaji: 'konbanwa', kanji: '-', arti: 'Selamat malam', category: 'salam' },
  { id: 'v4', kana: 'ありがとう', romaji: 'arigatou', kanji: '-', arti: 'Terima kasih', category: 'salam' },
  { id: 'v5', kana: 'すみません', romaji: 'sumimasen', kanji: '-', arti: 'Permisi / Maaf', category: 'salam' },
  { id: 'v6', kana: 'ごめんなさい', romaji: 'gomennasai', kanji: '-', arti: 'Mohon maaf', category: 'salam' },
  { id: 'v7', kana: 'さようなら', romaji: 'sayounara', kanji: '-', arti: 'Selamat tinggal', category: 'salam' },
  { id: 'v8', kana: 'はじめまして', romaji: 'hajimemashite', kanji: '初めまして', arti: 'Senang berkenalan dengan Anda', category: 'salam' },
  { id: 'v9', kana: 'よろしくおねがいします', romaji: 'yoroshiku onegaishimasu', kanji: 'よろしくお願いします', arti: 'Mohon bantuannya / kerja samanya', category: 'salam' },
  { id: 'v10', kana: 'いただきます', romaji: 'itadakimasu', kanji: '-', arti: 'Selamat makan (ungkapan terima kasih sebelum makan)', category: 'salam' },
  { id: 'v11', kana: 'ごちそうさまでした', romaji: 'gochisousama deshita', kanji: '-', arti: 'Terima kasih atas hidangannya (setelah makan)', category: 'salam' },
  { id: 'v12', kana: 'いってきます', romaji: 'ittekimasu', kanji: '-', arti: 'Saya berangkat dulu', category: 'salam' },

  // KATA KERJA (DOUSHI)
  { id: 'v13', kana: 'たべる', romaji: 'taberu', kanji: '食べる', arti: 'Makan', category: 'kata_kerja' },
  { id: 'v14', kana: 'のむ', romaji: 'nomu', kanji: '飲む', arti: 'Minum', category: 'kata_kerja' },
  { id: 'v15', kana: 'いく', romaji: 'iku', kanji: '行く', arti: 'Pergi', category: 'kata_kerja' },
  { id: 'v16', kana: 'くる', romaji: 'kuru', kanji: '来る', arti: 'Datang', category: 'kata_kerja' },
  { id: 'v17', kana: 'かえる', romaji: 'kaeru', kanji: '帰る', arti: 'Pulang ke rumah', category: 'kata_kerja' },
  { id: 'v18', kana: 'みる', romaji: 'miru', kanji: '見る', arti: 'Melihat / Menonton', category: 'kata_kerja' },
  { id: 'v19', kana: 'きく', romaji: 'kiku', kanji: '聞く', arti: 'Mendengar / Bertanya', category: 'kata_kerja' },
  { id: 'v20', kana: 'かく', romaji: 'kaku', kanji: '書く', arti: 'Menulis / Menggambar', category: 'kata_kerja' },
  { id: 'v21', kana: 'よむ', romaji: 'yomu', kanji: '読む', arti: 'Membaca', category: 'kata_kerja' },
  { id: 'v22', kana: 'はなす', romaji: 'hanasu', kanji: '話す', arti: 'Berbicara', category: 'kata_kerja' },
  { id: 'v23', kana: 'かう', romaji: 'kau', kanji: '買う', arti: 'Membeli', category: 'kata_kerja' },
  { id: 'v24', kana: 'ねる', romaji: 'neru', kanji: '寝る', arti: 'Tidur', category: 'kata_kerja' },
  { id: 'v25', kana: 'おきる', romaji: 'okiru', kanji: '起きる', arti: 'Bangun tidur', category: 'kata_kerja' },
  { id: 'v26', kana: 'あう', romaji: 'au', kanji: '会う', arti: 'Bertemu', category: 'kata_kerja' },
  { id: 'v27', kana: 'あそぶ', romaji: 'asobu', kanji: '遊ぶ', arti: 'Bermain / Bersenang-senang', category: 'kata_kerja' },
  { id: 'v28', kana: 'まつ', romaji: 'matsu', kanji: '待つ', arti: 'Menunggu', category: 'kata_kerja' },
  { id: 'v29', kana: 'およぐ', romaji: 'oyogu', kanji: '泳ぐ', arti: 'Berenang', category: 'kata_kerja' },
  { id: 'v30', kana: 'べんきょうする', romaji: 'benkyou suru', kanji: '勉強する', arti: 'Belajar', category: 'kata_kerja' },
  { id: 'v31', kana: 'する', romaji: 'suru', kanji: '-', arti: 'Melakukan / Mengerjakan', category: 'kata_kerja' },
  { id: 'v32', kana: 'つくる', romaji: 'tsukuru', kanji: '作る', arti: 'Membuat', category: 'kata_kerja' },

  // KATA SIFAT (I & NA KEIYOUSHI)
  { id: 'v33', kana: 'おおきい', romaji: 'ookii', kanji: '大きい', arti: 'Besar', category: 'kata_sifat' },
  { id: 'v34', kana: 'ちいさい', romaji: 'chiisai', kanji: '小さい', arti: 'Kecil', category: 'kata_sifat' },
  { id: 'v35', kana: 'たかい', romaji: 'takai', kanji: '高い', arti: 'Tinggi / Mahal', category: 'kata_sifat' },
  { id: 'v36', kana: 'やすい', romaji: 'yasui', kanji: '安い', arti: 'Murah', category: 'kata_sifat' },
  { id: 'v37', kana: 'あたらしい', romaji: 'atarashii', kanji: '新しい', arti: 'Baru', category: 'kata_sifat' },
  { id: 'v38', kana: 'ふるい', romaji: 'furui', kanji: '古い', arti: 'Lama / Kuno', category: 'kata_sifat' },
  { id: 'v39', kana: 'いい', romaji: 'ii', kanji: '良い', arti: 'Bagus / Baik', category: 'kata_sifat' },
  { id: 'v40', kana: 'わるい', romaji: 'warui', kanji: '悪い', arti: 'Buruk / Jelek', category: 'kata_sifat' },
  { id: 'v41', kana: 'おいしい', romaji: 'oishii', kanji: '美味しい', arti: 'Enak / Lezat', category: 'kata_sifat' },
  { id: 'v42', kana: 'むずかしい', romaji: 'muzukashii', kanji: '難しい', arti: 'Sulit / Sukar', category: 'kata_sifat' },
  { id: 'v43', kana: 'やさしい', romaji: 'yasashii', kanji: '優しい', arti: 'Mudah / Ramah', category: 'kata_sifat' },
  { id: 'v44', kana: 'あつい', romaji: 'atsui', kanji: '暑い', arti: 'Panas (suhu)', category: 'kata_sifat' },
  { id: 'v45', kana: 'さむい', romaji: 'samui', kanji: '寒い', arti: 'Dingin (suhu udara)', category: 'kata_sifat' },
  { id: 'v46', kana: 'しずか', romaji: 'shizuka', kanji: '静か', arti: 'Tenang / Sunyi', category: 'kata_sifat' },
  { id: 'v47', kana: 'にぎやか', romaji: 'nigiyaka', kanji: '賑やか', arti: 'Ramai', category: 'kata_sifat' },
  { id: 'v48', kana: 'きれい', romaji: 'kirei', kanji: '綺麗', arti: 'Cantik / Indah / Bersih', category: 'kata_sifat' },
  { id: 'v49', kana: 'げんき', romaji: 'genki', kanji: '元気', arti: 'Sehat / Bersemangat', category: 'kata_sifat' },
  { id: 'v50', kana: 'すき', romaji: 'suki', kanji: '好き', arti: 'Suka / Gemar', category: 'kata_sifat' },

  // WAKTU & FREKUENSI
  { id: 'v51', kana: 'いま', romaji: 'ima', kanji: '今', arti: 'Sekarang', category: 'waktu' },
  { id: 'v52', kana: 'きょう', romaji: 'kyou', kanji: '今日', arti: 'Hari ini', category: 'waktu' },
  { id: 'v53', kana: 'あした', romaji: 'ashita', kanji: '明日', arti: 'Besok', category: 'waktu' },
  { id: 'v54', kana: 'きのう', romaji: 'kinou', kanji: '昨日', arti: 'Kemarin', category: 'waktu' },
  { id: 'v55', kana: 'あさ', romaji: 'asa', kanji: '朝', arti: 'Pagi hari', category: 'waktu' },
  { id: 'v56', kana: 'ひる', romaji: 'hiru', kanji: '昼', arti: 'Siang hari', category: 'waktu' },
  { id: 'v57', kana: 'よる', romaji: 'yoru', kanji: '夜', arti: 'Malam hari', category: 'waktu' },
  { id: 'v58', kana: 'まいあさ', romaji: 'maiasa', kanji: '毎朝', arti: 'Setiap pagi', category: 'waktu' },
  { id: 'v59', kana: 'まいにち', romaji: 'mainichi', kanji: '毎日', arti: 'Setiap hari', category: 'waktu' },
  { id: 'v60', kana: 'せんしゅう', romaji: 'senshuu', kanji: '先週', arti: 'Minggu lalu', category: 'waktu' },
  { id: 'v61', kana: 'こんしゅう', romaji: 'konshuu', kanji: '今週', arti: 'Minggu ini', category: 'waktu' },
  { id: 'v62', kana: 'らいしゅう', romaji: 'raishuu', kanji: '来週', arti: 'Minggu depan', category: 'waktu' },
  { id: 'v63', kana: 'いつも', romaji: 'itsumo', kanji: '-', arti: 'Selalu', category: 'waktu' },
  { id: 'v64', kana: 'ときどき', romaji: 'tokidoki', kanji: '時々', arti: 'Kadang-kadang', category: 'waktu' },

  // TEMPAT, MAKANAN & KEHIDUPAN
  { id: 'v65', kana: 'がっこう', romaji: 'gakkou', kanji: '学校', arti: 'Sekolah', category: 'kehidupan' },
  { id: 'v66', kana: 'うち', romaji: 'uchi', kanji: '家', arti: 'Rumah', category: 'kehidupan' },
  { id: 'v67', kana: 'えき', romaji: 'eki', kanji: '駅', arti: 'Stasiun', category: 'kehidupan' },
  { id: 'v68', kana: 'びょういん', romaji: 'byouin', kanji: '病院', arti: 'Rumah sakit', category: 'kehidupan' },
  { id: 'v69', kana: 'へや', romaji: 'heya', kanji: '部屋', arti: 'Kamar', category: 'kehidupan' },
  { id: 'v70', kana: 'みず', romaji: 'mizu', kanji: '水', arti: 'Air', category: 'kehidupan' },
  { id: 'v71', kana: 'ごはん', romaji: 'gohan', kanji: 'ご飯', arti: 'Nasi / Makanan', category: 'kehidupan' },
  { id: 'v72', kana: 'おちゃ', romaji: 'ocha', kanji: 'お茶', arti: 'Teh hijau', category: 'kehidupan' },
  { id: 'v73', kana: 'にく', romaji: 'niku', kanji: '肉', arti: 'Daging', category: 'kehidupan' },
  { id: 'v74', kana: 'さかな', romaji: 'sakana', kanji: '魚', arti: 'Ikan', category: 'kehidupan' },
  { id: 'v75', kana: 'たまご', romaji: 'tamago', kanji: '卵', arti: 'Telur', category: 'kehidupan' },
  { id: 'v76', kana: 'ほん', romaji: 'hon', kanji: '本', arti: 'Buku', category: 'kehidupan' },
  { id: 'v77', kana: 'でんしゃ', romaji: 'densha', kanji: '電車', arti: 'Kereta listrik', category: 'kehidupan' },
  { id: 'v78', kana: 'くるま', romaji: 'kuruma', kanji: '車', arti: 'Mobil', category: 'kehidupan' },
  { id: 'v79', kana: 'ともだち', romaji: 'tomodachi', kanji: '友達', arti: 'Teman', category: 'kehidupan' },
  { id: 'v80', kana: 'せんせい', romaji: 'sensei', kanji: '先生', arti: 'Guru / Pengajar', category: 'kehidupan' },
];

export function getKosakataByCategory(cat = 'all') {
  if (cat === 'all') return [...KOSAKATA_DATA];
  return KOSAKATA_DATA.filter((v) => v.category === cat);
}

export function shuffleKosakata(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

