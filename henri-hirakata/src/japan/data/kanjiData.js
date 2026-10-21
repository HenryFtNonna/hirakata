// Data Kanji Lengkap JLPT N5 (~105 Kanji Inti beserta Arti Bahasa Indonesia, Cara Baca, & Contoh Kata)

export const KANJI_N5_CATEGORIES = [
  { id: 'all', name: 'Semua Kanji N5', count: 105 },
  { id: 'angka', name: 'Angka & Uang', count: 14 },
  { id: 'waktu_alam', name: 'Waktu & Alam', count: 20 },
  { id: 'manusia', name: 'Manusia & Tubuh', count: 13 },
  { id: 'arah_tempat', name: 'Arah & Tempat', count: 19 },
  { id: 'kata_kerja', name: 'Kata Kerja', count: 16 },
  { id: 'sifat_kehidupan', name: 'Kata Sifat & Benda', count: 23 },
];

export const KANJI_N5_DATA = [
  // ================= ANGKA & UANG =================
  { id: 'k1', char: '一', meaning: 'Satu', onyomi: 'ICHI, ITSU', kunyomi: 'hito(tsu)', strokes: 1, category: 'angka', example: '一つ (hitotsu / satu buah), 一日 (tsuitachi / tgl 1)' },
  { id: 'k2', char: '二', meaning: 'Dua', onyomi: 'NI', kunyomi: 'futa(tsu)', strokes: 2, category: 'angka', example: '二つ (futatsu / dua buah), 二人 (futari / dua orang)' },
  { id: 'k3', char: '三', meaning: 'Tiga', onyomi: 'SAN', kunyomi: 'mit(tsu)', strokes: 3, category: 'angka', example: '三つ (mittsu / tiga buah), 三日 (mikka / tgl 3)' },
  { id: 'k4', char: '四', meaning: 'Empat', onyomi: 'SHI', kunyomi: 'yon, yot(tsu)', strokes: 5, category: 'angka', example: '四つ (yottsu / empat buah), 四月 (shigatsu / April)' },
  { id: 'k5', char: '五', meaning: 'Lima', onyomi: 'GO', kunyomi: 'itsu(tsu)', strokes: 4, category: 'angka', example: '五つ (itsutsu / lima buah), 五日 (itsuka / tgl 5)' },
  { id: 'k6', char: '六', meaning: 'Enam', onyomi: 'ROKU', kunyomi: 'mut(tsu)', strokes: 4, category: 'angka', example: '六つ (muttsu / enam buah), 六日 (muika / tgl 6)' },
  { id: 'k7', char: '七', meaning: 'Tujuh', onyomi: 'SHICHI', kunyomi: 'nana(tsu)', strokes: 2, category: 'angka', example: '七つ (nanatsu / tujuh buah), 七月 (shichigatsu / Juli)' },
  { id: 'k8', char: '八', meaning: 'Delapan', onyomi: 'HACHI', kunyomi: 'yat(tsu)', strokes: 2, category: 'angka', example: '八つ (yattsu / delapan buah), 八日 (youka / tgl 8)' },
  { id: 'k9', char: '九', meaning: 'Sembilan', onyomi: 'KU, KYUU', kunyomi: 'kokono(tsu)', strokes: 2, category: 'angka', example: '九日 (kokonoka / tgl 9), 九月 (kugatsu / September)' },
  { id: 'k10', char: '十', meaning: 'Sepuluh', onyomi: 'JUU', kunyomi: 'tou', strokes: 2, category: 'angka', example: '十日 (tooka / tgl 10), 十 (juu / sepuluh)' },
  { id: 'k11', char: '百', meaning: 'Ratus', onyomi: 'HYAKU', kunyomi: 'momo', strokes: 6, category: 'angka', example: '三百 (sanbyaku / 300), 六百 (roppyaku / 600)' },
  { id: 'k12', char: '千', meaning: 'Ribu', onyomi: 'SEN', kunyomi: 'chi', strokes: 3, category: 'angka', example: '三千 (sanzen / 3000), 千葉 (Chiba)' },
  { id: 'k13', char: '万', meaning: 'Sepuluh Ribu', onyomi: 'MAN, BAN', kunyomi: '-', strokes: 3, category: 'angka', example: '一万円 (ichiman-en / 10.000 yen)' },
  { id: 'k14', char: '円', meaning: 'Yen / Lingkaran', onyomi: 'EN', kunyomi: 'maru(i)', strokes: 4, category: 'angka', example: '百円 (hyaku-en / 100 yen), 円い (marui / bundar)' },

  // ================= WAKTU & ALAM =================
  { id: 'k15', char: '日', meaning: 'Hari, Matahari', onyomi: 'NICHI, JITSU', kunyomi: 'hi, -ka', strokes: 4, category: 'waktu_alam', example: '日本 (Nihon / Jepang), 日曜日 (Nichiyoubi / Minggu)' },
  { id: 'k16', char: '月', meaning: 'Bulan', onyomi: 'GETSU, GATSU', kunyomi: 'tsuki', strokes: 4, category: 'waktu_alam', example: '月曜日 (Getsuyoubi / Senin), 今月 (kongetsu / bulan ini)' },
  { id: 'k17', char: '火', meaning: 'Api', onyomi: 'KA', kunyomi: 'hi', strokes: 4, category: 'waktu_alam', example: '火曜日 (Kayoubi / Selasa), 火事 (kaji / kebakaran)' },
  { id: 'k18', char: '水', meaning: 'Air', onyomi: 'SUI', kunyomi: 'mizu', strokes: 4, category: 'waktu_alam', example: '水曜日 (Suiyoubi / Rabu), お水 (omizu / air minum)' },
  { id: 'k19', char: '木', meaning: 'Pohon, Kayu', onyomi: 'MOKU, BOKU', kunyomi: 'ki', strokes: 4, category: 'waktu_alam', example: '木曜日 (Mokuyoubi / Kamis), 木 (ki / pohon)' },
  { id: 'k20', char: '金', meaning: 'Emas, Uang', onyomi: 'KIN, KON', kunyomi: 'kane', strokes: 8, category: 'waktu_alam', example: '金曜日 (Kinyoubi / Jumat), お金 (okane / uang)' },
  { id: 'k21', char: '土', meaning: 'Tanah', onyomi: 'DO, TO', kunyomi: 'tsuchi', strokes: 3, category: 'waktu_alam', example: '土曜日 (Doyoubi / Sabtu), 土地 (tochi / tanah)' },
  { id: 'k22', char: '年', meaning: 'Tahun', onyomi: 'NEN', kunyomi: 'toshi', strokes: 6, category: 'waktu_alam', example: '今年 (kotoshi / tahun ini), 来年 (rainen / tahun depan)' },
  { id: 'k23', char: '時', meaning: 'Waktu, Jam', onyomi: 'JI', kunyomi: 'toki', strokes: 10, category: 'waktu_alam', example: '一時 (ichiji / jam 1), 時間 (jikan / durasi waktu)' },
  { id: 'k24', char: '分', meaning: 'Menit, Bagian', onyomi: 'FUN, PUN, BUN', kunyomi: 'wa(karu)', strokes: 4, category: 'waktu_alam', example: '十分 (juppun / 10 menit), 分かる (wakaru / paham)' },
  { id: 'k25', char: '今', meaning: 'Sekarang', onyomi: 'KON, KIN', kunyomi: 'ima', strokes: 4, category: 'waktu_alam', example: '今 (ima / sekarang), 今日 (kyou / hari ini)' },
  { id: 'k26', char: '朝', meaning: 'Pagi', onyomi: 'CHOU', kunyomi: 'asa', strokes: 12, category: 'waktu_alam', example: '今朝 (kesa / pagi ini), 毎朝 (maiasa / setiap pagi)' },
  { id: 'k27', char: '昼', meaning: 'Siang', onyomi: 'CHUU', kunyomi: 'hiru', strokes: 9, category: 'waktu_alam', example: '昼ご飯 (hirugohan / makan siang)' },
  { id: 'k28', char: '夜', meaning: 'Malam', onyomi: 'YA', kunyomi: 'yoru, yo', strokes: 8, category: 'waktu_alam', example: '今夜 (konya / malam ini), 夜 (yoru / malam)' },
  { id: 'k29', char: '山', meaning: 'Gunung', onyomi: 'SAN, ZAN', kunyomi: 'yama', strokes: 3, category: 'waktu_alam', example: '富士山 (Fujisan / Gn. Fuji), 山 (yama / gunung)' },
  { id: 'k30', char: '川', meaning: 'Sungai', onyomi: 'SEN', kunyomi: 'kawa, gawa', strokes: 3, category: 'waktu_alam', example: '小川 (ogawa / sungai kecil), 川 (kawa / sungai)' },
  { id: 'k31', char: '雨', meaning: 'Hujan', onyomi: 'U', kunyomi: 'ame', strokes: 8, category: 'waktu_alam', example: '大雨 (ooame / hujan lebat), 雨 (ame / hujan)' },
  { id: 'k32', char: '天', meaning: 'Langit, Surga', onyomi: 'TEN', kunyomi: 'ama', strokes: 4, category: 'waktu_alam', example: '天気 (tenki / cuaca), 天国 (tengoku / surga)' },
  { id: 'k33', char: '気', meaning: 'Semangat, Udara', onyomi: 'KI, KE', kunyomi: '-', strokes: 6, category: 'waktu_alam', example: '元気 (genki / sehat, semangat), 気をつける (hati-hati)' },
  { id: 'k34', char: '空', meaning: 'Langit Kosong', onyomi: 'KUU', kunyomi: 'sora, a(ku)', strokes: 8, category: 'waktu_alam', example: '青空 (aozora / langit biru), 空港 (kuukou / bandara)' },

  // ================= MANUSIA & TUBUH =================
  { id: 'k35', char: '人', meaning: 'Orang', onyomi: 'JIN, NIN', kunyomi: 'hito', strokes: 2, category: 'manusia', example: '日本人 (Nihonjin / orang Jepang), 一人 (hitori / sendirian)' },
  { id: 'k36', char: '男', meaning: 'Laki-laki', onyomi: 'DAN, NAN', kunyomi: 'otoko', strokes: 7, category: 'manusia', example: '男の人 (otoko no hito / pria), 男子 (danshi / anak laki-laki)' },
  { id: 'k37', char: '女', meaning: 'Perempuan', onyomi: 'JO, NYO', kunyomi: 'onna', strokes: 3, category: 'manusia', example: '女の人 (onna no hito / wanita), 彼女 (kanojo / dia/pacar)' },
  { id: 'k38', char: '子', meaning: 'Anak', onyomi: 'SHI, SU', kunyomi: 'ko', strokes: 3, category: 'manusia', example: '子ども (kodomo / anak-anak), 女の子 (onna no ko / gadis)' },
  { id: 'k39', char: '父', meaning: 'Ayah', onyomi: 'FU', kunyomi: 'chichi, tou', strokes: 4, category: 'manusia', example: 'お父さん (otousan / ayah), 父親 (chichioya / ayah kandung)' },
  { id: 'k40', char: '母', meaning: 'Ibu', onyomi: 'BO', kunyomi: 'haha, kaa', strokes: 5, category: 'manusia', example: 'お母さん (okaasan / ibu), 母国 (bokoku / tanah air)' },
  { id: 'k41', char: '友', meaning: 'Teman', onyomi: 'YUU', kunyomi: 'tomo', strokes: 4, category: 'manusia', example: '友達 (tomodachi / teman), 友人 (yuujin / kawan)' },
  { id: 'k42', char: '目', meaning: 'Mata', onyomi: 'MOKU', kunyomi: 'me', strokes: 5, category: 'manusia', example: '目 (me / mata), 目薬 (megusuri / obat tetes mata)' },
  { id: 'k43', char: '耳', meaning: 'Telinga', onyomi: 'JI', kunyomi: 'mimi', strokes: 6, category: 'manusia', example: '耳 (mimi / telinga)' },
  { id: 'k44', char: '口', meaning: 'Mulut, Pintu Keluar', onyomi: 'KOU, KU', kunyomi: 'kuchi, guchi', strokes: 3, category: 'manusia', example: '出口 (deguchi / pintu keluar), 入口 (iriguchi / pintu masuk)' },
  { id: 'k45', char: '手', meaning: 'Tangan', onyomi: 'SHU', kunyomi: 'te', strokes: 4, category: 'manusia', example: 'お手洗い (otearai / toilet), 手紙 (tegami / surat)' },
  { id: 'k46', char: '足', meaning: 'Kaki, Cukup', onyomi: 'SOKU', kunyomi: 'ashi, ta(riru)', strokes: 7, category: 'manusia', example: '足 (ashi / kaki), 足りる (tariru / cukup)' },
  { id: 'k47', char: '体', meaning: 'Tubuh', onyomi: 'TAI', kunyomi: 'karada', strokes: 7, category: 'manusia', example: '体 (karada / tubuh), 体重 (taijuu / berat badan)' },

  // ================= ARAH & TEMPAT =================
  { id: 'k48', char: '上', meaning: 'Atas', onyomi: 'JOU', kunyomi: 'ue, a(garu)', strokes: 3, category: 'arah_tempat', example: '机の上 (tsukue no ue / atas meja), 上手 (jouzu / pandai)' },
  { id: 'k49', char: '下', meaning: 'Bawah', onyomi: 'KA, GE', kunyomi: 'shita, sa(garu)', strokes: 3, category: 'arah_tempat', example: '下 (shita / bawah), 下手 (heta / tidak pandai)' },
  { id: 'k50', char: '左', meaning: 'Kiri', onyomi: 'SA', kunyomi: 'hidari', strokes: 5, category: 'arah_tempat', example: '左手 (hidarite / tangan kiri)' },
  { id: 'k51', char: '右', meaning: 'Kanan', onyomi: 'U, YUU', kunyomi: 'migi', strokes: 5, category: 'arah_tempat', example: '右手 (migite / tangan kanan), 右側 (migigawa / sisi kanan)' },
  { id: 'k52', char: '中', meaning: 'Dalam, Tengah', onyomi: 'CHUU', kunyomi: 'naka', strokes: 4, category: 'arah_tempat', example: '部屋の中 (heya no naka / dalam kamar), 一日中 (ichinichijuu / seharian)' },
  { id: 'k53', char: '前', meaning: 'Depan, Sebelum', onyomi: 'ZEN', kunyomi: 'mae', strokes: 9, category: 'arah_tempat', example: '駅の前 (eki no mae / depan stasiun), 午前 (gozen / AM)' },
  { id: 'k54', char: '後', meaning: 'Belakang, Setelah', onyomi: 'GO, KOU', kunyomi: 'ushi(ro), ato', strokes: 9, category: 'arah_tempat', example: '後ろ (ushiro / belakang), 午後 (gogo / PM)' },
  { id: 'k55', char: '東', meaning: 'Timur', onyomi: 'TOU', kunyomi: 'higashi', strokes: 8, category: 'arah_tempat', example: '東京 (Toukyou / Tokyo), 東口 (higashiguchi / pintu timur)' },
  { id: 'k56', char: '西', meaning: 'Barat', onyomi: 'SEI, SAI', kunyomi: 'nishi', strokes: 6, category: 'arah_tempat', example: '西口 (nishiguchi / pintu barat), 西洋 (seiyou / bangsa barat)' },
  { id: 'k57', char: '南', meaning: 'Selatan', onyomi: 'NAN', kunyomi: 'minami', strokes: 9, category: 'arah_tempat', example: '南口 (minamiguchi / pintu selatan), 南 (minami / selatan)' },
  { id: 'k58', char: '北', meaning: 'Utara', onyomi: 'HOKU', kunyomi: 'kita', strokes: 5, category: 'arah_tempat', example: '北海道 (Hokkaidou / Hokkaido), 北口 (kitaguchi / pintu utara)' },
  { id: 'k59', char: '外', meaning: 'Luar', onyomi: 'GAI, GE', kunyomi: 'soto', strokes: 5, category: 'arah_tempat', example: '外国 (gaikoku / luar negeri), 外 (soto / luar)' },
  { id: 'k60', char: '内', meaning: 'Dalam', onyomi: 'NAI', kunyomi: 'uchi', strokes: 4, category: 'arah_tempat', example: '案内 (annai / panduan), 国内 (kokunai / domestik)' },
  { id: 'k61', char: '国', meaning: 'Negara', onyomi: 'KOKU', kunyomi: 'kuni', strokes: 8, category: 'arah_tempat', example: '外国 (gaikoku / negara asing), 国 (kuni / negara)' },
  { id: 'k62', char: '町', meaning: 'Kota / Desa', onyomi: 'CHOU', kunyomi: 'machi', strokes: 7, category: 'arah_tempat', example: '町 (machi / kota, pemukiman)' },
  { id: 'k63', char: '店', meaning: 'Toko', onyomi: 'TEN', kunyomi: 'mise', strokes: 8, category: 'arah_tempat', example: '店員 (ten\'in / pelayan toko), 本店 (honten / toko buku)' },
  { id: 'k64', char: '駅', meaning: 'Stasiun', onyomi: 'EKI', kunyomi: '-', strokes: 14, category: 'arah_tempat', example: '駅前 (ekimae / depan stasiun), 東京駅 (Toukyou-eki / Stasiun Tokyo)' },
  { id: 'k65', char: '社', meaning: 'Perusahaan / Kuil', onyomi: 'SHA', kunyomi: 'yashiro', strokes: 7, category: 'arah_tempat', example: '会社 (kaisha / perusahaan), 社長 (shachou / direktur)' },
  { id: 'k66', char: '校', meaning: 'Sekolah', onyomi: 'KOU', kunyomi: '-', strokes: 10, category: 'arah_tempat', example: '学校 (gakkou / sekolah), 小学校 (shougakkou / SD)' },

  // ================= KATA KERJA UTAMA =================
  { id: 'k67', char: '見', meaning: 'Melihat', onyomi: 'KEN', kunyomi: 'mi(ru)', strokes: 7, category: 'kata_kerja', example: '見る (miru / menonton, melihat), 見せる (miseru / memperlihatkan)' },
  { id: 'k68', char: '聞', meaning: 'Mendengar, Bertanya', onyomi: 'BUN, MON', kunyomi: 'ki(ku)', strokes: 14, category: 'kata_kerja', example: '聞く (kiku / mendengar/tanya), 新聞 (shinbun / koran)' },
  { id: 'k69', char: '行', meaning: 'Pergi', onyomi: 'KOU, GYOU', kunyomi: 'i(ku), oKona(u)', strokes: 6, category: 'kata_kerja', example: '行く (iku / pergi), 銀行 (ginkou / bank)' },
  { id: 'k70', char: '来', meaning: 'Datang', onyomi: 'RAI', kunyomi: 'ku(ru), ki(taru)', strokes: 7, category: 'kata_kerja', example: '来る (kuru / datang), 来年 (rainen / tahun depan)' },
  { id: 'k71', char: '帰', meaning: 'Pulang', onyomi: 'KI', kunyomi: 'kae(ru)', strokes: 10, category: 'kata_kerja', example: '帰る (kaeru / pulang ke rumah), 帰国 (kikoku / pulang ke tanah air)' },
  { id: 'k72', char: '食', meaning: 'Makan', onyomi: 'SHOKU', kunyomi: 'ta(beru)', strokes: 9, category: 'kata_kerja', example: '食べる (taberu / makan), 食堂 (shokudou / kantin)' },
  { id: 'k73', char: '飲', meaning: 'Minum', onyomi: 'IN', kunyomi: 'no(mu)', strokes: 12, category: 'kata_kerja', example: '飲む (nomu / minum), 飲み物 (nomimono / minuman)' },
  { id: 'k74', char: '買', meaning: 'Membeli', onyomi: 'BAI', kunyomi: 'ka(u)', strokes: 12, category: 'kata_kerja', example: '買う (kau / membeli), 買い物 (kaimono / berbelanja)' },
  { id: 'k75', char: '書', meaning: 'Menulis, Buku', onyomi: 'SHO', kunyomi: 'ka(ku)', strokes: 10, category: 'kata_kerja', example: '書く (kaku / menulis), 辞書 (jisho / kamus)' },
  { id: 'k76', char: '読', meaning: 'Membaca', onyomi: 'DOKU', kunyomi: 'yo(mu)', strokes: 14, category: 'kata_kerja', example: '読む (yomu / membaca), 読書 (dokusho / membaca buku)' },
  { id: 'k77', char: '話', meaning: 'Berbicara, Cerita', onyomi: 'WA', kunyomi: 'hana(su), hanashi', strokes: 13, category: 'kata_kerja', example: '話す (hanasu / berbicara), 会話 (kaiwa / percakapan)' },
  { id: 'k78', char: '立', meaning: 'Berdiri', onyomi: 'RITSU', kunyomi: 'ta(tsu)', strokes: 5, category: 'kata_kerja', example: '立つ (tatsu / berdiri), 国立 (kokuritsu / nasional/negeri)' },
  { id: 'k79', char: '会', meaning: 'Bertemu', onyomi: 'KAI', kunyomi: 'a(u)', strokes: 6, category: 'kata_kerja', example: '会う (au / bertemu), 会社 (kaisha / perusahaan)' },
  { id: 'k80', char: '入', meaning: 'Masuk', onyomi: 'NYUU', kunyomi: 'hai(ru), i(reru)', strokes: 2, category: 'kata_kerja', example: '入る (hairu / masuk), 入口 (iriguchi / pintu masuk)' },
  { id: 'k81', char: '出', meaning: 'Keluar', onyomi: 'SHUTSU', kunyomi: 'de(ru), da(su)', strokes: 5, category: 'kata_kerja', example: '出る (deru / keluar), 出口 (deguchi / pintu keluar)' },
  { id: 'k82', char: '休', meaning: 'Istirahat, Libur', onyomi: 'KYUU', kunyomi: 'yasu(mu)', strokes: 6, category: 'kata_kerja', example: '休む (yasumu / beristirahat), 休日 (kyuujitsu / hari libur)' },

  // ================= KATA SIFAT & BENDA KEHIDUPAN =================
  { id: 'k83', char: '学', meaning: 'Belajar, Ilmu', onyomi: 'GAKU', kunyomi: 'mana(bu)', strokes: 8, category: 'sifat_kehidupan', example: '学生 (gakusei / murid), 大学 (daigaku / universitas)' },
  { id: 'k84', char: '生', meaning: 'Hidup, Lahir', onyomi: 'SEI, SHOU', kunyomi: 'i(kiru), u(mareru)', strokes: 5, category: 'sifat_kehidupan', example: '先生 (sensei / guru), 誕生日 (tanjoubi / ulang tahun)' },
  { id: 'k85', char: '先', meaning: 'Sebelum, Lebih Dulu', onyomi: 'SEN', kunyomi: 'saki', strokes: 6, category: 'sifat_kehidupan', example: '先週 (senshuu / minggu lalu), 先 (saki / depan/duluan)' },
  { id: 'k86', char: '車', meaning: 'Mobil, Roda', onyomi: 'SHA', kunyomi: 'kuruma', strokes: 7, category: 'sifat_kehidupan', example: '車 (kuruma / mobil), 電車 (densha / kereta listrik)' },
  { id: 'k87', char: '電', meaning: 'Listrik', onyomi: 'DEN', kunyomi: '-', strokes: 13, category: 'sifat_kehidupan', example: '電気 (denki / lampu/listrik), 電話 (denwa / telepon)' },
  { id: 'k88', char: '道', meaning: 'Jalan, Cara', onyomi: 'DOU', kunyomi: 'michi', strokes: 12, category: 'sifat_kehidupan', example: '道 (michi / jalanan), 水道 (suidou / air ledeng)' },
  { id: 'k89', char: '本', meaning: 'Buku, Asal', onyomi: 'HON', kunyomi: 'moto', strokes: 5, category: 'sifat_kehidupan', example: '本 (hon / buku), 日本 (Nihon / Jepang)' },
  { id: 'k90', char: '名', meaning: 'Nama, Terkenal', onyomi: 'MEI, MYOU', kunyomi: 'na', strokes: 6, category: 'sifat_kehidupan', example: '名前 (namae / nama), 有名 (yuumei / terkenal)' },
  { id: 'k91', char: '語', meaning: 'Bahasa, Kata', onyomi: 'GO', kunyomi: 'kata(ru)', strokes: 14, category: 'sifat_kehidupan', example: '日本語 (Nihongo / Bhs. Jepang), 英語 (Eigo / Bhs. Inggris)' },
  { id: 'k92', char: '何', meaning: 'Apa', onyomi: 'KA', kunyomi: 'nani, nan', strokes: 7, category: 'sifat_kehidupan', example: '何時 (nanji / jam berapa), 何 (nani / apa)' },
  { id: 'k93', char: '大', meaning: 'Besar', onyomi: 'DAI, TAI', kunyomi: 'oo(kii)', strokes: 3, category: 'sifat_kehidupan', example: '大きい (ookii / besar), 大変 (taihen / sulit/gawat)' },
  { id: 'k94', char: '小', meaning: 'Kecil', onyomi: 'SHOU', kunyomi: 'chii(sai), ko', strokes: 3, category: 'sifat_kehidupan', example: '小さい (chiisai / kecil), 小学生 (shougakusei / murid SD)' },
  { id: 'k95', char: '長', meaning: 'Panjang, Pemimpin', onyomi: 'CHOU', kunyomi: 'naga(i)', strokes: 8, category: 'sifat_kehidupan', example: '長い (nagai / panjang), 社長 (shachou / direktur)' },
  { id: 'k96', char: '高', meaning: 'Tinggi, Mahal', onyomi: 'KOU', kunyomi: 'taka(i)', strokes: 10, category: 'sifat_kehidupan', example: '高い (takai / tinggi/mahal), 高校 (koukou / SMA)' },
  { id: 'k97', char: '安', meaning: 'Murah, Tenang', onyomi: 'AN', kunyomi: 'yasu(i)', strokes: 6, category: 'sifat_kehidupan', example: '安い (yasui / murah), 安心 (anshin / lega)' },
  { id: 'k98', char: '新', meaning: 'Baru', onyomi: 'SHIN', kunyomi: 'atara(shii)', strokes: 13, category: 'sifat_kehidupan', example: '新しい (atarashii / baru), 新聞 (shinbun / koran)' },
  { id: 'k99', char: '古', meaning: 'Tua, Lama', onyomi: 'KO', kunyomi: 'furu(i)', strokes: 5, category: 'sifat_kehidupan', example: '古い (furui / tua/lama)' },
  { id: 'k100', char: '多', meaning: 'Banyak', onyomi: 'TA', kunyomi: 'oo(i)', strokes: 6, category: 'sifat_kehidupan', example: '多い (ooi / banyak)' },
  { id: 'k101', char: '少', meaning: 'Sedikit', onyomi: 'SHOU', kunyomi: 'suku(nai), suko(shi)', strokes: 4, category: 'sifat_kehidupan', example: '少し (sukoshi / sedikit), 少年 (shounen / remaja)' },
  { id: 'k102', char: '白', meaning: 'Putih', onyomi: 'HAKU', kunyomi: 'shiro(i)', strokes: 5, category: 'sifat_kehidupan', example: '白い (shiroi / putih), 白黒 (shirokuro / monokrom)' },
  { id: 'k103', char: '赤', meaning: 'Merah', onyomi: 'SEKI', kunyomi: 'aka(i)', strokes: 7, category: 'sifat_kehidupan', example: '赤い (akai / merah), 赤ちゃん (akachan / bayi)' },
  { id: 'k104', char: '青', meaning: 'Biru', onyomi: 'SEI', kunyomi: 'ao(i)', strokes: 8, category: 'sifat_kehidupan', example: '青い (aoi / biru), 青空 (aozora / langit biru)' },
  { id: 'k105', char: '魚', meaning: 'Ikan', onyomi: 'GYO', kunyomi: 'sakana', strokes: 11, category: 'sifat_kehidupan', example: '魚 (sakana / ikan), 金魚 (kingyo / ikan mas)' },
];

export function getKanjiByCategory(cat = 'all') {
  if (cat === 'all') return [...KANJI_N5_DATA];
  return KANJI_N5_DATA.filter((k) => k.category === cat);
}

export function shuffleKanji(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

