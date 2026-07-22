import type { SiteConfig, TextStyle } from "../types/content";

/**
 * Hai kiểu chữ lặp lại nhiều lần trong design, khai báo một lần rồi dùng lại
 * để khỏi chép đi chép lại và khỏi lệch nhau khi chỉnh.
 */

/*
 * Cỡ chữ lấy từ thiết kế mobile (khung Figma rộng 700px) nhưng không viết
 * clamp() tại đây nữa — bốn token `--fs-*` khai báo một chỗ trong
 * `src/styles/global.css`, nội suy giữa 360px và 700px. Đổi thang chữ toàn
 * trang thì sửa token, không phải dò từng style bên dưới.
 *
 * Thiết kế dùng hai mức: khối hero 16px, các đoạn trong section 20px.
 */

/** HERO — dòng chào in đậm nghiêng hoa (thiết kế: Helvetica Neue Bold Italic 16px). */
const heroLeadStyle: TextStyle = {
  color: "var(--color-text-primary)",
  fontFamily: "'HelveticaNeue-BoldItalic', sans-serif",
  fontWeight: 700,
  fontSize: "var(--fs-hero)",
  textTransform: "uppercase",
  lineHeight: 1.35,
};

/** HERO — ghi chú bảo mật in nghiêng (thiết kế: Helvetica Neue Italic 16px). */
const heroNoteStyle: TextStyle = {
  color: "var(--color-text-primary)",
  fontFamily: "'HelveticaNeue-Italic', sans-serif",
  fontWeight: 400,
  fontSize: "var(--fs-hero)",
  lineHeight: 1.55,
};

/** SECTION — dòng dẫn in đậm nghiêng hoa, ví dụ "HƯỚNG DẪN TRA CỨU:" (thiết kế: Helvetica Neue Bold Italic 20px). */
const subheadingStyle: TextStyle = {
  color: "var(--color-text-primary)",
  fontFamily: "'HelveticaNeue-BoldItalic', sans-serif",
  fontWeight: 700,
  fontSize: "var(--fs-body)",
  textTransform: "uppercase",
  lineHeight: 1.35,
};

/** SECTION — đoạn giải thích in nghiêng (thiết kế: Helvetica Neue Italic 20px). */
const noteStyle: TextStyle = {
  color: "var(--color-text-primary)",
  fontFamily: "'HelveticaNeue-Italic', sans-serif",
  fontWeight: 400,
  fontSize: "var(--fs-body)",
  lineHeight: 1.55,
};

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
    title: "HỘI NGHỊ SƠ KẾT VÀ TRIỂN KHAI NHIỆM VỤ KINH DOANH 6 THÁNG CUỐI NĂM 2026",
    description:
      "Không gian tài liệu số của Hội nghị sơ kết và triển khai nhiệm vụ kinh doanh 6 tháng cuối năm 2026 — Bảo hiểm Bảo Việt.",
    favicon: "/images/favicon.png",
    ogImage: "/images/favicon.png",
  },

  theme: {
    backgroundImage: "/images/baoviet/Background_BHBV.webp",
    // Màu nền royal-blue khớp ảnh nền thiết kế (mẫu ~#0617CB). Trước đây để
    // #001a8c hơi tối nên lúc ảnh chưa tải sẽ chớp một nền navy sẫm.
    backgroundColor: "#0619CC",
    colors: {
      // Dải vàng chanh đúng token thiết kế (gradient tiêu đề/nút #ffffa4 → #ffff4e).
      goldLight: "#FFFFA4",
      gold: "#FFFF79",
      goldDeep: "#FFFF4E",
      textPrimary: "#ffffff",
      textMuted: "#cacaca",
      // Chữ trên nút vàng — navy đậm để tương phản, đúng như thiết kế.
      buttonText: "#001A8C",
    },
    // Bề rộng tối đa trên desktop (bản gốc dùng Bootstrap .container = 1170px).
    // Giảm xuống ví dụ '540px' nếu muốn trang luôn giữ dáng mobile.
    contentMaxWidth: "1170px",
    fonts: {
      // Chữ thường dùng Helvetica Neue chuẩn (bộ trong public/fonts/helvetica-neue-5).
      body: "'HelveticaNeue', sans-serif",
      // Tiêu đề section giữ font điều kiện (condensed) — bộ Neue mới không có bản
      // condensed nên vẫn dùng HelveticaVn (đậm, hẹp) sát thiết kế nhất.
      heading: "'HelveticaVn', sans-serif",
      title: "'HelveticaNeue-CondensedBlack', 'Arial Narrow', sans-serif",
      button: "'HelveticaVn-bd', sans-serif",
    },

    // Style mặc định cho toàn trang. Từng section / ảnh / nút vẫn ghi đè được
    // bằng thuộc tính `style` của riêng nó.
    defaults: {
      title: {
        gradient: true,
        fontSize: "var(--fs-title)",
        underline: true,
        // Trong design gạch chân rộng cố định ~27% bề ngang trang, không theo độ dài chữ.
        underlineWidth: "min(27vw, 316px)",
        underlineGap: "6px",
        align: "center",
      },
      paragraph: {
        align: "center",
        color: "var(--color-text-primary)",
        fontWeight: 400,
        lineHeight: 1.5,
      },
      button: {
        // Thiết kế: chữ 24px, nút cao ~55px → padding dọc ~13px.
        fontSize: "var(--fs-button)",
        padding: "13px 30px",
        borderRadius: "12px",
        lineHeight: 1.2,
        hoverScale: 1.05,
      },
      section: {
        gap: "18px",
      },
    },
  },

  animation: {
    shutterBars: 12,
    shutterColor: "#ffffff",
    once: true,
  },

  hero: {
    bannerImage: "/images/baoviet/banner-baoviet.webp",
    // eyebrow: "Chào mừng Quý Đại biểu đến với hội nghị",
    titleImage: "/images/baoviet/title-baoviet.webp",
    // Dải huy hiệu "TƯ DUY MỞ / QUẢN TRỊ VỮNG / TĂNG TRƯỞNG BỀN" dưới tiêu đề.
    media: [
      {
        src: "/images/baoviet/group-button-baoviet.webp",
        alt: "Tư duy mở · Quản trị vững · Tăng trưởng bền",
      },
    ],
    paragraphs: [
      {
        text: "Chào mừng Quý Đại biểu đến với không gian tài liệu số của Hội nghị! \nKính chúc Quý Lãnh đạo có một kỳ hội nghị thành công rực rỡ, cùng Bảo hiểm Bảo Việt đồng lòng bứt phá, quản trị vững vàng và tăng trưởng bền vững",
        style: heroLeadStyle,
      },
      {
        // Ghi chú bảo mật — chữ trắng nghiêng, nhỏ hơn đoạn chào mừng.
        text: `Tài liệu Hội nghị dành riêng cho Lãnh đạo cấp cao Bảo hiểm Bảo Việt. 
        Đề nghị bảo mật thông tin và không sao chép, chia sẻ dưới mọi hình thức.`,
        style: { ...heroNoteStyle, margin: "18px 0 0" },
      },
    ],
  },

  sections: [
    {
      id: "so-do",
      title: "Sơ đồ hội nghị",
      effect: "shutter",
      media: [
        {
          src: "/images/baoviet/so-do-chuong-trinh.webp",
          alt: "Sơ đồ hội nghị",
          padding: "0 12px",
          action: { type: "gdocsViewer", url: "/files/ds-dai-bieu.pdf" },
        },
      ],
    },
    {
      id: "noi-dung",
      title: "NỘI DUNG CHI TIẾT HỘI NGHỊ",
      effect: "shutter",
      // Tách hai bảng phiên họp sáng / chiều ra cho dễ đọc.
      style: { mediaGap: "16px" },
      media: [
        { src: "/images/baoviet/phien-hop-sang.webp", alt: "Phiên họp sáng" },
        { src: "/images/baoviet/phien-hop-chieu.webp", alt: "Phiên họp chiều" },
      ],
    },
    {
      id: "ket-qua",
      title: "KẾT QUẢ VÀ MỤC TIÊU KINH DOANH",
      effect: "shutter",
      // Hai tấm thông điệp cuộn ngang, có chấm phân trang như trong design.
      layout: "carousel",
      carousel: {
        dots: true,
        slidesPerView: 1,
        gap: "12px",
      },
      media: [
        {
          src: "/images/baoviet/thong-diep-kd-2026.webp",
          alt: "Kết quả 6 tháng đầu năm 2026",
          action: {
            type: "link",
            url: "https://drive.google.com/file/d/1POSuu3dJ7RDHB8UzUvBPBRwhbRTFgYnO/view?usp=sharing",
          },
        },
        {
          src: "/images/baoviet/thong-diep-kd-2026-2.webp",
          alt: "Mục tiêu kinh doanh 6 tháng cuối năm 2026",
          action: {
            type: "link",
            url: "https://drive.google.com/file/d/1POSuu3dJ7RDHB8UzUvBPBRwhbRTFgYnO/view?usp=sharing",
          },
        },
      ],
    },
    {
      id: "diem-sang",
      title: "NHỮNG ĐIỂM SÁNG TIÊU BIỂU",
      effect: "shutter",
      media: [
        {
          src: "/images/baoviet/diem-sang-tieu-bieu.webp",
          alt: "Điểm sáng tiêu biểu",
        },
      ],
    },
    {
      id: "giai-thuong",
      title: "CÁC GIẢI THƯỞNG ĐẠT ĐƯỢC \n TRONG 6 THÁNG ĐẦU NĂM 2026",
      effect: "shutter",
      media: [
        {
          src: "/images/baoviet/giai-thuong.webp",
          alt: "các giải thưởng",
        },
      ],
    },
    {
      id: "tap-chi-nha-lanh-dao",
      title: "TẠP CHÍ NHÀ LÃNH ĐẠO",
      effect: "shutter",
      media: [
        {
          src: "/images/baoviet/tap-chi-nha-lanh-dao.webp",
          alt: "Tạp chí nhà lãnh đạo",
        },
      ],
      // Đặt đoạn văn sau ảnh (mặc định). Đổi thành 'afterTitle' để đưa lên trên ảnh.
      paragraphsPlacement: "afterMedia",
      paragraphs: [
        {
          text: "Ấn bản đặc biệt dành tặng Đại biểu tham dự Hội nghị",
          style: subheadingStyle,
        },
        {
          text: `Bản tin Nhà lãnh đạo được phát hàng tháng, số đặc biệt hàng quý,
            xuất bản dành riêng cho các Lãnh đạo cấp cao của TCT với các nội dung chính
            về hoạt động kinh doanh của hệ thống, tin tức nổi bật, cùng các tin tiêu điểm
            xoay quanh thị trường bảo hiểm, ưu thế cạnh tranh, xu thế bảo hiểm trong nước
            và thế giới,…`,
          // Đoạn dài nên để tự xuống dòng theo bề rộng thay vì ngắt cứng.
          style: { ...noteStyle, preserveLineBreaks: false, margin: "10px 0 0" },
        },
      ],
    },
    {
      id: "anh-hoi-nghi",
      title: "ẢNH HỘI NGHỊ KINH DOANH",
      effect: "shutter",
      media: [
        {
          src: "/images/baoviet/anh-hoi-nghi.webp",
          alt: "Ảnh hội nghị kinh doanh",
          // Nút nổi đè lên đáy ảnh, đúng như design.
          action: {
            type: "link",
            url: "https://bibpix.net/Anh-So-ket-2026",
          },
          style: { ...noteStyle, margin: "16px 0" },
        },
      ],
      // Đưa phần hướng dẫn lên trên ảnh.
      paragraphsPlacement: "afterTitle",
      paragraphs: [
        { text: "Hướng dẫn tra cứu:", style: { ...subheadingStyle, margin: "0 0" } },
        {
          text: `Đại biểu chỉ cần tải lên một bức ảnh chân dung chính diện.
            Hệ thống sẽ tự động nhận diện và trả về tất cả hình ảnh có đại biểu.`,
          style: { ...noteStyle, margin: "0 0" },
        },
      ],
    },
  ],

  footer: {
    paragraphs: ["Copyright © 2026 TCT Bảo Hiểm Bảo Việt. Tất cả các quyền được bảo hộ."],
    style: {
      color: "var(--color-text-primary)",
      fontFamily: "'HelveticaNeue', sans-serif",
      fontWeight: 400,
      // Thiết kế 16px — cùng mức với chữ hero.
      fontSize: "var(--fs-hero)",
    },
  },
};

export default siteConfig;
