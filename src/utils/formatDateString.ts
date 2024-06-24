import { format } from 'date-fns'

type FormatDateString = (dateString: string) => string

export const formatDateString: FormatDateString = (dateString) => {
  const date = new Date(dateString)
  return format(date, 'dd-MM-yyyy - HH:mm:ss')
}
