# TaskMaster App - Görev & Zaman Yönetimi Uygulaması

Modern ve kullanıcı dostu bir görev yönetimi ve Pomodoro timer uygulaması. React hooks, Context API ve TailwindCSS kullanılarak geliştirilmiştir.

## 🚀 Özellikler

### 📋 Görev Yönetimi
- ✅ Görev ekleme, düzenleme ve silme
- 🏷️ Kategori bazında görev organizasyonu (İş, Kişisel, Acil, Alışveriş, Sağlık)
- 📅 Bitiş tarihi belirleme ve gecikmiş görev uyarıları
- 🔍 Durum ve kategori bazında filtreleme
- 💾 LocalStorage ile veri kalıcılığı

### ⏰ Pomodoro Timer
- 🎯 25 dakika çalışma / 5 dakika mola döngüsü
- ⏸️ Başlat, duraklat ve sıfırla kontrolleri
- 📊 Görsel progress ring ve döngü sayacı
- 🔔 Ses ve bildirim uyarıları
- 📈 Tamamlanan döngü istatistikleri

### 📊 İstatistikler
- 📈 Genel görev istatistikleri
- 🎯 Kategori bazında performans analizi
- ⏰ Gecikmiş görev takibi
- 📅 Günlük görev özeti

### 🎨 Kullanıcı Deneyimi
- 🌙 Açık/Koyu tema desteği
- 📱 Responsive tasarım (mobil uyumlu)
- ✨ Smooth animasyonlar ve geçişler
- 🎯 Modern ve temiz arayüz

## 🛠️ Teknolojiler

- **React 19** - Modern React hooks ve functional components
- **Vite** - Hızlı geliştirme ortamı
- **TailwindCSS** - Utility-first CSS framework
- **Context API** - State management
- **LocalStorage** - Veri kalıcılığı
- **Custom Hooks** - Pomodoro timer logic

## 🚀 Kurulum

1. Projeyi klonlayın:
```bash
git clone <repository-url>
cd taskmaster-app
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Geliştirme sunucusunu başlatın:
```bash
npm run dev
```

4. Tarayıcınızda `http://localhost:5173` adresini açın.

## 📁 Proje Yapısı

```
src/
├── components/          # React bileşenleri
│   ├── Header.jsx      # Uygulama başlığı ve tema toggle
│   ├── TaskForm.jsx    # Yeni görev ekleme formu
│   ├── TaskItem.jsx    # Tekil görev öğesi
│   ├── TaskList.jsx    # Görev listesi ve filtreleme
│   ├── PomodoroTimer.jsx # Pomodoro timer bileşeni
│   └── StatsPanel.jsx  # İstatistik paneli
├── context/            # React Context API
│   ├── ThemeContext.jsx # Tema yönetimi
│   └── TaskContext.jsx # Görev yönetimi
├── hooks/              # Custom React hooks
│   └── usePomodoro.js  # Pomodoro timer logic
├── styles/             # CSS dosyaları
└── utils/              # Yardımcı fonksiyonlar
```

## 🎯 Kullanım

### Görev Ekleme
1. "Görevler" sekmesine gidin
2. "Yeni Görev Ekle" butonuna tıklayın
3. Görev başlığı, açıklama, kategori ve bitiş tarihi girin
4. "Görev Ekle" butonuna tıklayın

### Pomodoro Timer
1. "Pomodoro" sekmesine gidin
2. "Başlat" butonuna tıklayın
3. 25 dakika çalışma süresi sonunda otomatik mola
4. 5 dakika mola sonunda otomatik çalışma döngüsü

### İstatistikler
1. "İstatistikler" sekmesine gidin
2. Genel ve kategori bazında performansınızı görün
3. Gecikmiş görevleri takip edin

## 🔧 Geliştirme

### Yeni özellik ekleme
1. İlgili bileşeni `src/components/` klasöründe oluşturun
2. Gerekirse yeni context veya hook ekleyin
3. `App.jsx`'te yeni bileşeni entegre edin

### Stil değişiklikleri
- TailwindCSS utility sınıflarını kullanın
- `src/index.css`'te custom CSS ekleyin
- `tailwind.config.js`'te tema özelleştirmeleri yapın

## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## 🤝 Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📞 İletişim

Proje hakkında sorularınız için issue açabilirsiniz.

---

**TaskMaster App** ile verimliliğinizi artırın! 🚀
