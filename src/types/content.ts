/**
 * Định nghĩa kiểu cho toàn bộ nội dung VÀ giao diện của trang.
 * Chỉnh sửa ở `src/config/site.config.ts` — KHÔNG sửa component.
 *
 * Mọi thuộc tính style đều là tuỳ chọn: bỏ trống thì lấy giá trị mặc định
 * ở `theme.defaults`, bỏ trống nữa thì lấy mặc định của component.
 */

/* ------------------------------------------------------------------ *
 * Style
 * ------------------------------------------------------------------ */

export type Align = 'left' | 'center' | 'right'

/** Style dùng cho mọi khối chữ (tiêu đề, đoạn văn, dòng chào). */
export interface TextStyle {
  fontFamily?: string
  fontSize?: string
  fontWeight?: string | number
  color?: string
  /**
   * Tô chữ bằng gradient. `true` = dùng gradient vàng của theme,
   * hoặc truyền chuỗi CSS gradient riêng.
   */
  gradient?: boolean | string
  align?: Align
  lineHeight?: string | number
  letterSpacing?: string
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  textShadow?: string
  margin?: string
  padding?: string
  maxWidth?: string
  /**
   * Xử lý chỗ xuống dòng viết trong config:
   * - `'auto'` (mặc định) — giữ ngắt dòng khi màn hình đủ rộng (≥ khung thiết
   *   kế 700px), còn màn hình hẹp thì nối lại cho chữ tự chảy. Tránh cảnh một
   *   dòng cứng lại wrap tiếp thành dòng dài kèm chữ mồ côi.
   * - `true` — luôn ngắt đúng chỗ đã viết.
   * - `false` — bỏ hết ngắt dòng, để chữ tự chảy theo bề ngang.
   *
   * Riêng tiêu đề (`GoldTitle`) coi `'auto'` như `true`, vì tiêu đề ngắn nên
   * ngắt dòng thủ công gần như luôn vừa.
   */
  preserveLineBreaks?: boolean | 'auto'
}

/** Style riêng cho tiêu đề, thêm phần gạch chân gradient. */
export interface TitleStyle extends TextStyle {
  underline?: boolean
  underlineWidth?: string
  underlineHeight?: string
  underlineColor?: string
  /** Khoảng cách từ chữ xuống gạch chân. */
  underlineGap?: string
}

/** Style cho ảnh. */
export interface MediaStyle {
  width?: string
  maxWidth?: string
  margin?: string
  padding?: string
  borderRadius?: string
  border?: string
  boxShadow?: string
  opacity?: number
  aspectRatio?: string
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down'
}

/** Style cho nút. */
export interface ButtonStyle {
  /** Nhận mọi giá trị CSS background, kể cả gradient. */
  background?: string
  color?: string
  fontFamily?: string
  fontSize?: string
  fontWeight?: string | number
  lineHeight?: string | number
  padding?: string
  margin?: string
  borderRadius?: string
  border?: string
  boxShadow?: string
  width?: string
  textTransform?: 'none' | 'uppercase' | 'lowercase' | 'capitalize'
  letterSpacing?: string
  /** Độ phóng to khi rê chuột, ví dụ 1.05. Đặt 1 để tắt. */
  hoverScale?: number
}

/** Style cho cả khối section. */
export interface SectionStyle {
  padding?: string
  margin?: string
  /** Nhận mọi giá trị CSS background, kể cả gradient hoặc màu trong suốt. */
  background?: string
  borderRadius?: string
  border?: string
  boxShadow?: string
  /** Làm mờ nền phía sau, ví dụ '6px'. */
  backdropBlur?: string
  maxWidth?: string
  align?: Align
  /** Khoảng cách dọc giữa các phần tử bên trong section. */
  gap?: string
  /** Khoảng cách giữa các ảnh xếp chồng dọc (không áp dụng cho carousel). */
  mediaGap?: string
}

/** Vị trí của nút nổi đè lên ảnh. */
export interface OverlayPosition {
  top?: string
  right?: string
  bottom?: string
  left?: string
}

/* ------------------------------------------------------------------ *
 * Hành động
 * ------------------------------------------------------------------ */

/** Hành động khi bấm vào ảnh / nút. */
export type Action =
  /** Mở URL bất kỳ. `newTab` mặc định true. */
  | { type: 'link'; url: string; newTab?: boolean }
  /** Mở file PDF trực tiếp (đường dẫn trong /public hoặc URL tuyệt đối). */
  | { type: 'pdf'; url: string; newTab?: boolean }
  /** Mở PDF ngay trong trang bằng lớp phủ có nút quay lại. */
  | { type: 'pdfViewer'; url: string; title?: string }
  /** Mở PDF qua Google Docs Viewer. */
  | { type: 'gdocsViewer'; url: string }
  /** Cuộn mượt tới một section theo `id`. */
  | { type: 'scrollTo'; targetId: string }

/* ------------------------------------------------------------------ *
 * Nội dung
 * ------------------------------------------------------------------ */

/** Hiệu ứng xuất hiện khi cuộn tới. */
export type RevealEffect = 'slide' | 'shutter' | 'none'

/**
 * Một đoạn văn: chuỗi thuần, hoặc kèm style riêng khi cần một đoạn
 * trông khác các đoạn còn lại (ví dụ dòng ghi chú bảo mật).
 */
export type ParagraphItem = string | { text: string; style?: TextStyle }

export interface ButtonConfig {
  label: string
  action: Action
  /** 'inline' = nút dưới nội dung, 'overlay' = nút đè lên ảnh. */
  variant?: 'inline' | 'overlay'
  style?: ButtonStyle
  /** Chỉ dùng cho variant 'overlay'. */
  position?: OverlayPosition
}

export interface MediaItem {
  /** Đường dẫn ảnh, ví dụ '/images/baoviet/lich-trinh.png'. */
  src: string
  alt?: string
  /** Bấm vào ảnh thì làm gì (bỏ trống = ảnh tĩnh). */
  action?: Action
  /** Nút nổi đè lên ảnh. */
  overlayButton?: ButtonConfig
  /** Hiệu ứng riêng cho ảnh này; mặc định lấy theo section. */
  effect?: RevealEffect
  style?: MediaStyle
  /**
   * Viết tắt của `style.padding`, giữ lại cho tương thích ngược.
   * `style.padding` được ưu tiên nếu cả hai cùng có.
   */
  padding?: string
  /** Ảnh đầu trang nên để false để tải sớm. */
  lazy?: boolean
  /** Chú thích hiển thị ngay dưới ảnh. */
  caption?: string
  captionStyle?: TextStyle
}

/** Tuỳ chọn cho khối ảnh cuộn ngang. */
export interface CarouselOptions {
  /** Hiện chấm phân trang bên dưới. Mặc định true. */
  dots?: boolean
  /** Số slide hiện cùng lúc. Mặc định 1. */
  slidesPerView?: number
  /** Khoảng cách giữa các slide, ví dụ '12px'. */
  gap?: string
  /** Ló ra một phần slide kế bên để gợi ý còn cuộn được, ví dụ '28px'. */
  peek?: string
  /** Tự chạy sau mỗi bao nhiêu mili-giây. Bỏ trống hoặc 0 = tắt. */
  autoplayMs?: number
  /** Hiện nút mũi tên trái/phải. Mặc định false. */
  arrows?: boolean
  dotColor?: string
  dotActiveColor?: string
}

export interface SectionConfig {
  /** Khoá duy nhất, cũng dùng làm anchor cho `scrollTo`. */
  id: string
  /** Tiêu đề. Dùng '\n' để xuống dòng. */
  title?: string
  titleStyle?: TitleStyle
  /** Các đoạn văn. Mỗi phần tử là một thẻ <p>. */
  paragraphs?: ParagraphItem[]
  paragraphStyle?: TextStyle
  /** Đặt đoạn văn trước hay sau ảnh. Mặc định 'afterMedia'. */
  paragraphsPlacement?: 'afterTitle' | 'afterMedia'
  /** Hiệu ứng mặc định cho ảnh trong section. */
  effect?: RevealEffect
  media?: MediaItem[]
  /** Xếp ảnh chồng dọc (mặc định) hay cho cuộn ngang. */
  layout?: 'stack' | 'carousel'
  /** Chỉ dùng khi `layout: 'carousel'`. */
  carousel?: CarouselOptions
  /** Các nút nằm dưới nội dung. */
  buttons?: ButtonConfig[]
  /** Xếp nút theo hàng ngang hay cột dọc. Mặc định 'column'. */
  buttonsLayout?: 'row' | 'column'
  style?: SectionStyle
  /** Ẩn tạm section mà không cần xoá config. */
  hidden?: boolean
}

export interface HeroConfig {
  /** Ảnh banner trên cùng. */
  bannerImage?: string
  bannerStyle?: MediaStyle
  /** Dòng chữ nhỏ phía trên tiêu đề. */
  eyebrow?: string
  eyebrowStyle?: TextStyle
  /** Ảnh tiêu đề (ưu tiên hơn `titleText` nếu có). */
  titleImage?: string
  titleImageStyle?: MediaStyle
  /** Tiêu đề dạng chữ, dùng khi không có `titleImage`. */
  titleText?: string
  titleStyle?: TitleStyle
  /** Ảnh phụ đặt ngay dưới tiêu đề, ví dụ dải huy hiệu thông điệp. */
  media?: MediaItem[]
  /** Các đoạn mô tả; mỗi phần tử là một thẻ <p>. */
  paragraphs?: ParagraphItem[]
  paragraphStyle?: TextStyle
  /** Nút đặt dưới phần mô tả. */
  buttons?: ButtonConfig[]
  style?: SectionStyle
}

/* ------------------------------------------------------------------ *
 * Theme
 * ------------------------------------------------------------------ */

/** Style mặc định áp cho mọi thành phần cùng loại. */
export interface StyleDefaults {
  section?: SectionStyle
  title?: TitleStyle
  paragraph?: TextStyle
  button?: ButtonStyle
  media?: MediaStyle
  caption?: TextStyle
}

export interface ThemeConfig {
  /** Ảnh nền cố định (fixed). */
  backgroundImage: string
  /** Màu nền dự phòng khi ảnh chưa tải. */
  backgroundColor?: string
  /** Lớp phủ đè lên ảnh nền, ví dụ 'linear-gradient(...)' hoặc 'rgba(0,0,0,.35)'. */
  backgroundOverlay?: string
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
  /** Style mặc định cho toàn trang; từng section vẫn ghi đè được. */
  defaults?: StyleDefaults
}

export interface FooterConfig {
  paragraphs: ParagraphItem[]
  style?: TextStyle
  /** Style cho cả khối chân trang (nền, padding, viền trên…). */
  sectionStyle?: SectionStyle
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
  footer?: FooterConfig
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
