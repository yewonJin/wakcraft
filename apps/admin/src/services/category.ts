// 상수
export const CATEGORY = ['눕프로해커', '예능 눕프핵', '배치고사'] as const

// 타입
export type Category = (typeof CATEGORY)[number]
