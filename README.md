# Ne Dendy? - Anket Analiz Paneli

Anket katilimcilarindan toplanan yanitlarin analiz edilerek anlamli icgorulere donusturuldugu, yoneticilerin bir bakista durumu kavrayabildigi bir dashboard uygulamasi.

## Calistirma

```bash
git clone https://github.com/MoayadAbbara/Data-Fors-Task.git
cd Data-Fors-Task
npm install
npm run dev
```

Uygulama varsayilan olarak `http://localhost:5173` adresinde ayaga kalkar.

## Teknik Tercihler

### Teknoloji

- **React 19 + Vite** - Hizli gelistirme deneyimi ve modern React ozellikleri icin tercih edildi.
- **Redux Toolkit** - State yonetimi icin kullanildi. `createSelector` ile memoize edilmis selectorler sayesinde gereksiz yeniden hesaplama onlendi. Chart ve istatistik selectorleri tum veriden, tablo ise filtrelenmis veriden beslenir; boylece yonetici her zaman buyuk resmi gorur.
- **shadcn/ui (Base UI)** - Tutarli ve ozellestirilmis bir UI icin kullanildi. Tum butonlar, tablolar, selectler, popoverlar shadcn componentleri uzerinden render edilir.
- **Tailwind CSS v4** - CSS degiskenleri ile tema yonetimi. Light/dark mode destegi `oklch` renk uzayinda tanimli CSS custom properties ile saglanir.
- **Recharts** - Duygu dagilimi (donut chart) ve skor dagilimi (histogram) icin kullanildi. Tema dagilimi ise daha hafif bir cozum olarak custom CSS progress bar'lar ile gosterilir.
- **PapaParse** - CSV dosyasinin client-side parse edilmesi icin. Bos degerler `null` olarak korunur, gercek sifir degerleri kaybedilmez.

### Mimari Kararlar

- **Tek kaynak sabitleri**: Tum renk kodlari, label map'leri, esik degerleri ve sayfa boyutu `constants/index.js` dosyasinda merkezlestirildi. Kodda magic number veya hardcoded string bulunmaz.
- **Null-aware ortalamalar**: Bos degerler (`""`, `null`, `—`) ortalama hesaplamalarindan dislanir, gercek `0` degerleri korunur. Bu sayede istatistikler yaniltici olmaz.
- **Excel benzeri kolon filtreleri**: Genel amacli, props-driven `ColumnFilter` componenti; herhangi bir kolona uygulanabilir. `Set` optimizasyonu ile buyuk veri setlerinde performansli calisir.
- **Cached selector factory**: `selectColumnOptions` her kolon icin bir `createSelector` olusturur ve cache'ler. Tekrar cagirildiginda yeni selector yaratmaz, memory leak'i onler.
- **Dashboard vs tablo ayirimi**: Chart ve ozet istatistikler tum veriden hesaplanir (genel resim), tablo ise filtrelenmis veriyi gosterir (detay inceleme). Bu yonetici dashboardu icin daha anlamli bir yaklasimdir.

### Ozellikler

- 6 ozet istatistik karti (min/ort/maks dropdown destegi)
- 5 gorselletirme: Duygu dagilimi, Skor dagilimi, Tema dagilimi, Duygu x Eylem matrisi, Risk analizi
- `survey_id`, `sentiment`, `action` bazinda Excel-like kolon filtreleri
- Gorunum filtresi (One Cikanlar / Tum Yanitlar) ve Risk filtresi
- Tablo icinde arama, sayfalama (akilli sayfa numaralari)
- Dark mode (localStorage ile kalici, sistem tercihine duyarli)
- Tamamen Turkce arayuz
