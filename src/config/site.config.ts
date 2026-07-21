import type { SiteConfig, TextStyle } from "../types/content";

/**
 * Hai kiểu chữ lặp lại nhiều lần trong design, khai báo một lần rồi dùng lại
 * để khỏi chép đi chép lại và khỏi lệch nhau khi chỉnh.
 */

/** Dòng dẫn in đậm, nghiêng, viết hoa — ví dụ "HƯỚNG DẪN TRA CỨU:". */
const subheadingStyle: TextStyle = {
  color: "var(--color-text-primary)",
  fontFamily: "'Helvetica-BoldOblique', sans-serif",
  fontWeight: 700,
  fontSize: "clamp(13px, 3.2vw, 18px)",
  textTransform: "uppercase",
  lineHeight: 1.35,
};

/** Đoạn giải thích chữ trắng in nghiêng, nhỏ hơn. */
const noteStyle: TextStyle = {
  color: "var(--color-text-primary)",
  fontFamily: "'Helvetica-Oblique', sans-serif",
  fontWeight: 400,
  fontSize: "clamp(11px, 2.6vw, 15px)",
  lineHeight: 1.5,
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
      // Dải vàng chanh theo thiết kế (tiêu đề section ~#FFFF57, đáy nút ~#FFFF4E).
      goldLight: "#FEFF9E",
      gold: "#FFF24C",
      goldDeep: "#F5E62E",
      textPrimary: "#ffffff",
      textMuted: "#cacaca",
      // Chữ trên nút vàng — navy đậm để tương phản, đúng như thiết kế.
      buttonText: "#001A8C",
    },
    // Bề rộng tối đa trên desktop (bản gốc dùng Bootstrap .container = 1170px).
    // Giảm xuống ví dụ '540px' nếu muốn trang luôn giữ dáng mobile.
    contentMaxWidth: "1170px",
    fonts: {
      body: "'Helvetica', sans-serif",
      heading: "'HelveticaVn', sans-serif",
      title: "'HelveticaNeue-CondensedBlack', 'Arial Narrow', sans-serif",
      button: "'HelveticaVn-bd', sans-serif",
    },

    // Style mặc định cho toàn trang. Từng section / ảnh / nút vẫn ghi đè được
    // bằng thuộc tính `style` của riêng nó.
    defaults: {
      title: {
        gradient: true,
        fontSize: "clamp(17px, 4.3vw, 27px)",
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
        fontSize: "clamp(12px, 3vw, 16px)",
        padding: "10px 26px",
        borderRadius: "10px",
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
    bannerImage: "/images/baoviet/banner-baoviet.png",
    // eyebrow: "Chào mừng Quý Đại biểu đến với hội nghị",
    titleImage: "/images/baoviet/title-baoviet.png",
    // Dải huy hiệu "TƯ DUY MỞ / QUẢN TRỊ VỮNG / TĂNG TRƯỞNG BỀN" dưới tiêu đề.
    media: [
      {
        src: "/images/baoviet/group-button-baoviet.png",
        alt: "Tư duy mở · Quản trị vững · Tăng trưởng bền",
      },
    ],
    paragraphs: [
      {
        text: "Chào mừng Quý Đại biểu đến với không gian tài liệu số của Hội nghị! Kính chúc Quý Lãnh đạo có một kỳ hội nghị thành công rực rỡ, cùng Bảo hiểm Bảo Việt đồng lòng bứt phá, quản trị vững vàng và tăng trưởng bền vững",
        style: subheadingStyle,
      },
      {
        // Ghi chú bảo mật — chữ trắng nghiêng, nhỏ hơn đoạn chào mừng.
        text: `Tài liệu Hội nghị dành riêng cho Lãnh đạo cấp cao Bảo hiểm Bảo Việt.
        Đề nghị bảo mật thông tin và không sao chép, chia sẻ dưới mọi hình thức.`,
        style: { ...noteStyle, margin: "18px 0 0" },
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
          src: "/images/baoviet/so-do-chuong-trinh.png",
          alt: "Sơ đồ hội nghị",
          padding: "0 12px",
        },
      ],
      buttons: [
        {
          label: "xem chi tiết tại đây",
          variant: "inline",
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
        { src: "/images/baoviet/phien-hop-sang.png", alt: "Phiên họp sáng" },
        { src: "/images/baoviet/phien-hop-chieu.png", alt: "Phiên họp chiều" },
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
          src: "/images/baoviet/thong-diep-kd-2026.png",
          alt: "Kết quả 6 tháng đầu năm 2026",
          action: {
            type: "link",
            url: "https://drive.google.com/file/d/1POSuu3dJ7RDHB8UzUvBPBRwhbRTFgYnO/view?usp=sharing",
          },
        },
        {
          src: "/images/baoviet/thong-diep-kd-2026-2.png",
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
          src: "/images/baoviet/diem-sang-tieu-bieu.png",
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
          src: "/images/baoviet/giai-thuong.png",
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
          src: "/images/baoviet/tap-chi-nha-lanh-dao.png",
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
          src: "/images/baoviet/anh-hoi-nghi.png",
          alt: "Ảnh hội nghị kinh doanh",
          // Nút nổi đè lên đáy ảnh, đúng như design.
          action: {
            type: "link",
            url: "https://bibpix.net/Anh-Sao-hop-luc-ban-cheo-2025",
          },
          style: {...noteStyle, margin: "16px 0"}
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
      fontFamily: "'Helvetica', sans-serif",
      fontWeight: 400,
      fontSize: "clamp(10px, 2.2vw, 13px)",
    },
  },
};

export default siteConfig;
