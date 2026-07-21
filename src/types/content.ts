/**
 * Định nghĩa kiểu cho toàn bộ nội dung trang.
 * Chỉnh sửa nội dung ở `src/config/site.config.ts` — KHÔNG sửa component.
 */

/** Hành động khi bấm vào ảnh / nút. */
export type Action =
  /** Mở URL bất kỳ. `newTab` mặc định true. */
  | { type: 'link'; url: string; newTab?: boolean }
  /** Mở file PDF trực tiếp (đường dẫn trong /public hoặc URL tuyệt đối). */
  | { type: 'pdf'; url: string; newTab?: boolean }
  /** Mở PDF qua Google Docs Viewer (giống bản gốc). */
  | { type: 'gdocsViewer'; url: string }
  /** Cuộn mượt tới một section theo `id`. */
  | { type: 'scrollTo'; targetId: string }

/** Hiệu ứng xuất hiện khi cuộn tới. */
export type RevealEffect = 'slide' | 'shutter' | 'none'

export interface MediaItem {
  /** Đường dẫn ảnh, ví dụ '/images/baoviet/lich-trinh.png'. */
  src: string
  alt?: string
  /** Bấm vào ảnh thì làm gì (bỏ trống = ảnh tĩnh). */
  action?: Action
  /** Nút nổi đè lên ảnh (dạng .btn-view1 của bản gốc). */
  overlayButton?: ButtonConfig
  /** Hiệu ứng riêng cho ảnh này; mặc định lấy theo section. */
  effect?: RevealEffect
  /** Padding ngang của ảnh, ví dụ '0 12px'. */
  padding?: string
  /** Ảnh đầu trang nên để false để tải sớm. */
  lazy?: boolean
}

export interface ButtonConfig {
  label: string
  action: Action
  /** 'inline' = nút dưới ảnh, 'overlay' = nút đè lên ảnh. */
  variant?: 'inline' | 'overlay'
}

export interface SectionConfig {
  /** Khoá duy nhất, cũng dùng làm anchor cho `scrollTo`. */
  id: string
  /** Tiêu đề vàng gradient. Dùng '\n' để xuống dòng. */
  title?: string
  /** Hiệu ứng mặc định cho ảnh trong section. */
  effect?: RevealEffect
  media?: MediaItem[]
  /** Các nút nằm dưới nội dung. */
  buttons?: ButtonConfig[]
  /** Ẩn tạm section mà không cần xoá config. */
  hidden?: boolean
}

export interface HeroConfig {
  /** Ảnh banner trên cùng. */
  bannerImage?: string
  /** Dòng chữ nhỏ phía trên tiêu đề. */
  eyebrow?: string
  /** Ảnh tiêu đề (ưu tiên hơn `titleText` nếu có). */
  titleImage?: string
  /** Tiêu đề dạng chữ, dùng khi không có `titleImage`. */
  titleText?: string
  /** Các đoạn mô tả; mỗi phần tử là một khối <p>. */
  paragraphs?: string[]
}

export interface ThemeConfig {
  /** Ảnh nền cố định (fixed). */
  backgroundImage: string
  /** Màu nền dự phòng khi ảnh chưa tải. */
  backgroundColor?: string
  /** Bảng màu — map thẳng vào CSS variables. */
  colors?: Partial<{
    goldLight: string
    gold: string
    goldDeep: string
    textPrimary: string
    textMuted: string
    buttonText: string
  }>
  /** Bề rộng tối đa của nội dung, ví dụ '540px'. */
  contentMaxWidth?: string
  fonts?: Partial<{
    body: string
    heading: string
    title: string
    button: string
  }>
}

export interface SeoConfig {
  title: string
  description?: string
  favicon?: string
  ogImage?: string
}

export interface SiteConfig {
  seo: SeoConfig
  theme: ThemeConfig
  hero: HeroConfig
  sections: SectionConfig[]
  /** Cấu hình hiệu ứng cuộn dùng chung. */
  animation?: Partial<{
    /** Số thanh của hiệu ứng shutter. */
    shutterBars: number
    /** Màu thanh shutter. */
    shutterColor: string
    /** Chạy hiệu ứng lại mỗi lần cuộn qua, hay chỉ một lần. */
    once: boolean
  }>
}
