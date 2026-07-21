import type { SiteConfig } from '../types/content'

/**
 * ⚙️ FILE DUY NHẤT CẦN SỬA ĐỂ THAY NỘI DUNG TRANG.
 *
 * - Đổi ảnh: bỏ file mới vào `public/images/...` rồi sửa đường dẫn ở đây.
 * - Đổi chữ: sửa `title`, `eyebrow`, `paragraphs`, `label`.
 * - Thêm/bớt khối nội dung: thêm/xoá phần tử trong mảng `sections`.
 * - Đổi thứ tự: kéo phần tử trong mảng `sections`.
 */
export const siteConfig: SiteConfig = {
  seo: {
    title: 'LỄ VINH DANH SAO HỢP LỰC BÁN CHÉO 2025',
    description:
      'Sự kiện vinh danh các cá nhân, tập thể xuất sắc trong hoạt động hợp lực bán chéo 2025.',
    favicon: '/images/favicon.png',
    ogImage: '/images/favicon.png',
  },

  theme: {
    backgroundImage: '/images/baoviet/Background_BHBV.webp',
    backgroundColor: '#001a8c',
    colors: {
      goldLight: '#F9FB91',
      gold: '#F9E04C',
      goldDeep: '#FEE700',
      textPrimary: '#ffffff',
      textMuted: '#cacaca',
      buttonText: '#001A8C',
    },
    // Bề rộng tối đa trên desktop (bản gốc dùng Bootstrap .container = 1170px).
    // Giảm xuống ví dụ '540px' nếu muốn trang luôn giữ dáng mobile.
    contentMaxWidth: '1170px',
    fonts: {
      body: "'Helvetica', sans-serif",
      heading: "'HelveticaVn', sans-serif",
      title: "'HelveticaNeue-CondensedBlack', 'Arial Narrow', sans-serif",
      button: "'HelveticaVn-bd', sans-serif",
    },
  },

  animation: {
    shutterBars: 12,
    shutterColor: '#ffffff',
    once: true,
  },

  hero: {
    bannerImage: '/images/baoviet/banner-baoviet.png',
    eyebrow: 'Chào mừng Quý Đại biểu đến với chương trình',
    titleImage: '/images/baoviet/title-baoviet.png',
    paragraphs: [
      'Sự kiện vinh danh lớn nhất năm được tổ chức thường niên nhằm ghi nhận và tôn vinh các cá nhân, tập thể xuất sắc trong hoạt động bán chéo, đồng thời lan tỏa tinh thần hợp lực trong toàn hệ thống. Chương trình đánh dấu một chặng đường phát triển quan trọng, hướng tới giai đoạn hợp lực toàn diện và bền vững hơn.',
      'Sự hiện diện của Quý Đại biểu sẽ góp phần tạo nên dấu ấn và thành công của chương trình.\nChúc Quý Đại biểu có những trải nghiệm trọn vẹn tại sự kiện.',
    ],
  },

  sections: [
    {
      id: 'so-do',
      title: 'Sơ đồ chương trình',
      effect: 'shutter',
      media: [
        {
          src: '/images/baoviet/sang-baoviet.png',
          alt: 'Sơ đồ chương trình',
          padding: '0 12px',
        },
      ],
      buttons: [
        {
          label: 'Click để xem thông tin chi tiết',
          variant: 'inline',
          action: { type: 'gdocsViewer', url: '/files/ds-dai-bieu.pdf' },
        },
      ],
    },
    {
      id: 'noi-dung',
      title: 'Nội dung chương trình',
      effect: 'shutter',
      media: [
        { src: '/images/baoviet/lich-trinh.png', alt: 'Lịch trình' },
        { src: '/images/baoviet/chuong-trinh.png', alt: 'Chương trình' },
      ],
    },
    {
      id: 'diem-sang',
      title: 'Những điểm sáng tiêu biểu\nhoạt động Hợp lực bán chéo 2025',
      effect: 'shutter',
      media: [
        {
          src: '/images/baoviet/diemsang-baoviet.png',
          alt: 'Những điểm sáng tiêu biểu',
          action: {
            type: 'link',
            url: 'https://drive.google.com/file/d/1POSuu3dJ7RDHB8UzUvBPBRwhbRTFgYnO/view?usp=sharing',
          },
        },
      ],
    },
    {
      id: 'hinh-anh',
      title: 'Hình ảnh sự kiện Lễ Vinh Danh\nSao Hợp Lực Bán Chéo 2025',
      effect: 'shutter',
      media: [
        {
          src: '/images/baoviet/hoinghi-baoviet.png',
          alt: 'Hình ảnh sự kiện',
          action: {
            type: 'link',
            url: 'https://bibpix.net/Anh-Sao-hop-luc-ban-cheo-2025',
          },
        },
      ],
    },
  ],
}

export default siteConfig
