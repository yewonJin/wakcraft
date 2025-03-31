export const formatDateToKorean = (dateString: string): string => {
  const [year, month, day] = dateString.split('-')
  return `${year}년 ${parseInt(month, 10)}월 ${parseInt(day, 10)}일`
}

export const getDaysBetween = (startDate: string, endDate: string): number => {
  const start = new Date(startDate)
  const end = new Date(endDate)

  const diffTime = end.getTime() - start.getTime()
  const diffDays = diffTime / (1000 * 60 * 60 * 24)

  return Math.abs(diffDays)
}
