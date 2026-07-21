/**
 * React 18 chưa hỗ trợ prop camelCase `fetchPriority` — nó cảnh báo rồi bỏ luôn
 * thuộc tính, khiến hint ưu tiên tải ảnh mất tác dụng. Truyền dạng chữ thường
 * để React đưa thẳng vào DOM. Bỏ helper này khi nâng lên React 19.
 */
export function fetchPriorityAttr(priority: boolean): Record<string, string> {
  return priority ? { fetchpriority: 'high' } : {}
}
