# Bảo Việt — Landing Page (React + Vite)

Bản dựng lại bằng React + Vite của trang sự kiện **"Lễ Vinh Danh Sao Hợp Lực Bán Chéo 2025"**,
thay cho bản HTML tĩnh AngularJS/jQuery gốc trong `baoviet-site-snapshot/`.

Mục tiêu thiết kế: **toàn bộ nội dung nằm trong một file config**, component không hard-code
chữ, ảnh hay đường link nào — nên tái sử dụng được cho landing page sự kiện khác.

## Chạy

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # xuất ra dist/
npm run preview  # xem thử bản build
```

## Đổi nội dung — chỉ sửa `src/config/site.config.ts`

| Muốn đổi | Sửa ở đâu |
| --- | --- |
| Tiêu đề tab, mô tả, favicon | `seo` |
| Ảnh nền, màu vàng, font, bề rộng | `theme` |
| Banner, tiêu đề, đoạn giới thiệu | `hero` |
| Các khối nội dung | mảng `sections` |
| Số thanh hiệu ứng, chạy 1 lần hay lặp | `animation` |

### Thay ảnh

Bỏ file mới vào `public/images/...` rồi sửa đường dẫn trong config:

```ts
media: [{ src: '/images/baoviet/lich-trinh.png', alt: 'Lịch trình' }]
```

### Thêm một khối mới

```ts
{
  id: 'khoi-moi',              // cũng là anchor cho action scrollTo
  title: 'Tiêu đề\nxuống dòng', // '\n' = xuống dòng
  effect: 'shutter',            // 'shutter' | 'slide' | 'none'
  media: [{ src: '/images/abc.png', alt: 'Mô tả' }],
  paragraphs: ['Đoạn văn mô tả thêm.'],
  paragraphsPlacement: 'afterMedia',  // hoặc 'afterTitle'
  buttons: [{ label: 'Xem chi tiết', action: { type: 'link', url: 'https://...' } }],
  buttonsLayout: 'column',      // hoặc 'row'
}
```

Ẩn tạm một khối: thêm `hidden: true` — không cần xoá config.
Đổi thứ tự: kéo phần tử trong mảng `sections`.

### Khối ảnh cuộn ngang

Đặt `layout: 'carousel'` là ảnh trong `media` chuyển từ xếp dọc sang cuộn ngang,
có chấm phân trang và snap từng ảnh:

```ts
{
  id: 'ket-qua',
  title: 'KẾT QUẢ VÀ MỤC TIÊU KINH DOANH',
  layout: 'carousel',
  carousel: {
    dots: true,          // chấm phân trang, mặc định true
    slidesPerView: 1,    // số ảnh hiện cùng lúc
    gap: '12px',
    peek: '24px',        // ló slide kế bên để gợi ý cuộn được
    arrows: false,       // nút mũi tên trái/phải
    autoplayMs: 0,       // > 0 để tự chạy; dừng khi rê chuột vào
  },
  media: [{ src: '/images/a.png' }, { src: '/images/b.png' }],
}
```

Cuộn dựa trên `scroll-snap` của trình duyệt nên vuốt trên điện thoại và cuộn
trackpad mượt sẵn; JS chỉ đồng bộ chấm phân trang. Bấm chấm để nhảy slide,
focus vào dải rồi dùng phím mũi tên cũng được.

### Chân trang

```ts
footer: {
  paragraphs: ['Copyright © 2026 TCT Bảo Hiểm Bảo Việt. Tất cả các quyền được bảo hộ.'],
  style: { fontSize: '12px' },
}
```

## Đổi giao diện — cũng chỉ sửa config

Style theo tầng: **mặc định của component** → `theme.defaults` (áp cho cả trang)
→ `style` của từng phần tử (ghi đè). Không cần đụng vào file CSS nào.

```ts
theme: {
  defaults: {
    title:     { gradient: true, underline: true, underlineWidth: '180px' },
    paragraph: { align: 'center', lineHeight: 1.5 },
    button:    { hoverScale: 1.05 },
    section:   { gap: '18px' },
  },
}
```

Ghi đè cho riêng một khối:

```ts
{
  id: 'noi-bat',
  title: 'Tiêu đề nổi bật',
  titleStyle: { fontSize: '28px', underline: false, gradient: '...' },
  style: { background: 'rgba(0,0,0,.25)', borderRadius: '16px',
           padding: '24px 16px', backdropBlur: '6px', maxWidth: '720px' },
  media: [{ src: '/images/a.png', style: { borderRadius: '12px', maxWidth: '480px' } }],
}
```

| Nhóm style | Thuộc tính chính |
| --- | --- |
| `TextStyle` (đoạn văn, eyebrow, caption) | `fontFamily` `fontSize` `fontWeight` `color` `gradient` `align` `lineHeight` `letterSpacing` `textTransform` `textShadow` `margin` `padding` `maxWidth` `preserveLineBreaks` |
| `TitleStyle` | tất cả của `TextStyle` + `underline` `underlineWidth` `underlineHeight` `underlineColor` `underlineGap` |
| `MediaStyle` | `width` `maxWidth` `margin` `padding` `borderRadius` `border` `boxShadow` `opacity` `aspectRatio` `objectFit` |
| `ButtonStyle` | `background` `color` `fontFamily` `fontSize` `fontWeight` `padding` `margin` `borderRadius` `border` `boxShadow` `width` `textTransform` `letterSpacing` `hoverScale` |
| `SectionStyle` | `padding` `margin` `background` `borderRadius` `border` `boxShadow` `backdropBlur` `maxWidth` `align` `gap` |

Một vài điểm đáng lưu ý:

- `gradient: true` tô chữ bằng gradient vàng của theme; truyền chuỗi CSS gradient
  để dùng màu khác. Luôn có màu `color` dự phòng cho trình duyệt cũ.
- Style một đoạn văn riêng lẻ: dùng dạng object thay cho chuỗi.

  ```ts
  paragraphs: [
    'Đoạn thường.',
    { text: 'Ghi chú bảo mật.', style: { color: 'var(--color-text-muted)', fontSize: 'xx-small' } },
  ]
  ```

- Xuống dòng trong config = xuống dòng trên trang (khoảng trắng thụt lề được cắt bỏ).
  Đặt `preserveLineBreaks: false` nếu muốn đoạn văn tự xuống dòng theo bề rộng.
- Nút nổi đè lên ảnh đặt lại vị trí được: `overlayButton: { ..., position: { bottom: '12px' } }`.
- Ảnh có thể kèm `caption` và `captionStyle`.
- Nền trang phủ thêm lớp màu/gradient qua `theme.backgroundOverlay`.

### Các loại `action`

| Type | Tác dụng |
| --- | --- |
| `{ type: 'link', url, newTab? }` | Mở URL bất kỳ (mặc định tab mới) |
| `{ type: 'pdf', url, newTab? }` | Mở PDF trực tiếp |
| `{ type: 'gdocsViewer', url }` | Mở PDF qua Google Docs Viewer (như bản gốc) |
| `{ type: 'scrollTo', targetId }` | Cuộn mượt tới section theo `id` |

Gắn `action` vào ảnh (`media[].action`), vào nút dưới ảnh (`buttons[]`),
hoặc vào nút nổi đè lên ảnh (`media[].overlayButton`).

## Cấu trúc

```
public/
  images/baoviet/   ảnh lấy từ bản gốc
  fonts/helvetica/  font Helvetica cục bộ
  files/            ds-dai-bieu.pdf
src/
  config/site.config.ts   ⚙️ file duy nhất cần sửa để thay nội dung + giao diện
  types/content.ts        khai báo kiểu cho config
  lib/
    actions.ts            biến action trong config thành handler onClick
    style.ts              chuyển style-config thành CSS inline / CSS variables
    theme.ts              đẩy theme vào CSS variables + cập nhật thẻ meta
    dom.ts                vá thuộc tính DOM React 18 chưa hỗ trợ
  context/StyleDefaults.tsx  cấp `theme.defaults` cho mọi component
  hooks/useInView.ts      IntersectionObserver dùng chung
  components/
    FixedBackground/  lớp nền cố định (+ lớp phủ tuỳ chọn)
    Hero/             khối đầu trang
    Section/          khối nội dung, render theo SectionConfig
    Carousel/         dải ảnh cuộn ngang + chấm phân trang
    Footer/           chân trang
    Paragraphs/       khối văn bản, dùng chung cho Hero và Section
    GoldTitle/        tiêu đề chữ gradient
    GoldButton/       nút vàng (inline hoặc overlay)
    MediaImage/       ảnh, có thể bấm / mang nút nổi / có chú thích
    Reveal/           hiệu ứng trượt vào khi cuộn tới
    ShutterReveal/    hiệu ứng "cửa cuốn" 12 thanh dọc
```

## Khác biệt so với bản gốc

- Bỏ toàn bộ AngularJS, jQuery, SignalR, Bootstrap, metro UI — chúng là code nền tảng
  thừa từ platform cũ, trang này gần như không dùng tới.
- Bỏ đoạn redirect cứng về `baovietsaobancheo2025.qrcvn.com` trong controller gốc,
  vốn khiến không xem được trang khi chạy local.
- Màu, font, bề rộng chuyển thành CSS variables sinh từ config thay vì rải `!important`.
- Ảnh bấm được nay truy cập được bằng bàn phím (Enter / Space).
- Tôn trọng `prefers-reduced-motion`.

Giao diện, hiệu ứng và bố cục giữ nguyên như bản gốc, kể cả các breakpoint
750/970/1170px của Bootstrap `.container`.
