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
  title: 'Tiêu đề\nxuống dòng', // '\n' = <br />
  effect: 'shutter',            // 'shutter' | 'slide' | 'none'
  media: [{ src: '/images/abc.png', alt: 'Mô tả' }],
  buttons: [{ label: 'Xem chi tiết', action: { type: 'link', url: 'https://...' } }],
}
```

Ẩn tạm một khối: thêm `hidden: true` — không cần xoá config.
Đổi thứ tự: kéo phần tử trong mảng `sections`.

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
  config/site.config.ts   ⚙️ file duy nhất cần sửa để thay nội dung
  types/content.ts        khai báo kiểu cho config
  lib/
    actions.ts            biến action trong config thành handler onClick
    theme.ts              đẩy theme vào CSS variables + cập nhật thẻ meta
  hooks/useInView.ts      IntersectionObserver dùng chung
  components/
    FixedBackground/  lớp nền cố định
    Hero/             khối đầu trang
    Section/          khối nội dung, render theo SectionConfig
    GoldTitle/        tiêu đề chữ vàng gradient
    GoldButton/       nút vàng (inline hoặc overlay)
    MediaImage/       ảnh, có thể bấm / mang nút nổi
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
