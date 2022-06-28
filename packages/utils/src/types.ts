type Dict<T = any> = Record<string, T>

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Record<string, any> ? DeepPartial<T[P]> : T[P]
}

export type { Dict, DeepPartial }
