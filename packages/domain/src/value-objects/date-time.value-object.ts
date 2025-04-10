import { type Either, failure, success } from '@ecomverzo/utils'

import {
  InvalidAbbreviatedMonthDateTimeError,
  InvalidAbbreviatedMonthDateTimeMotive
} from '../errors/value-objects/date-time/invalid-abbreviated-month-date-time.error'
import {
  InvalidDateTimeError,
  InvalidDateTimeMotive
} from '../errors/value-objects/date-time/invalid-date-time.error'
import { InvalidGenerateDateTimeError } from '../errors/value-objects/date-time/invalid-generate-date-time.error'
import { InvalidMonthDateTimeError } from '../errors/value-objects/date-time/invalid-month-date-time.error'
import { InvalidMonthNumberDateTimeError } from '../errors/value-objects/date-time/invalid-month-number-date-time.error'

export enum AbbreviatedMonth {
  JANUARY = 'JAN',
  FEBRUARY = 'FEB',
  MARCH = 'MAR',
  APRIL = 'APR',
  MAY = 'MAY',
  JUNE = 'JUN',
  JULY = 'JUL',
  AUGUST = 'AUG',
  SEPTEMBER = 'SEP',
  OCTOBER = 'OCT',
  NOVEMBER = 'NOV',
  DECEMBER = 'DEC'
}

export enum AbbreviatedWeekDay {
  SUNDAY = 'SUN',
  MONDAY = 'MON',
  TUESDAY = 'TUE',
  WEDNESDAY = 'WED',
  THURSDAY = 'THU',
  FRIDAY = 'FRI',
  SATURDAY = 'SAT'
}

export enum WeekDay {
  SUNDAY = 'SUNDAY',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY'
}

export enum Month {
  JANUARY = 'JANUARY',
  FEBRUARY = 'FEBRUARY',
  MARCH = 'MARCH',
  APRIL = 'APRIL',
  MAY = 'MAY',
  JUNE = 'JUNE',
  JULY = 'JULY',
  AUGUST = 'AUGUST',
  SEPTEMBER = 'SEPTEMBER',
  OCTOBER = 'OCTOBER',
  NOVEMBER = 'NOVEMBER',
  DECEMBER = 'DECEMBER'
}

/**
 * Maps the AbbreviatedMonth enum to number (0-11) and vice versa.
 */
const abbreviatedMonthToNumberMap: Record<AbbreviatedMonth, number> = {
  [AbbreviatedMonth.JANUARY]: 0,
  [AbbreviatedMonth.FEBRUARY]: 1,
  [AbbreviatedMonth.MARCH]: 2,
  [AbbreviatedMonth.APRIL]: 3,
  [AbbreviatedMonth.MAY]: 4,
  [AbbreviatedMonth.JUNE]: 5,
  [AbbreviatedMonth.JULY]: 6,
  [AbbreviatedMonth.AUGUST]: 7,
  [AbbreviatedMonth.SEPTEMBER]: 8,
  [AbbreviatedMonth.OCTOBER]: 9,
  [AbbreviatedMonth.NOVEMBER]: 10,
  [AbbreviatedMonth.DECEMBER]: 11
}

const numberToAbbreviatedMonthMap = Object.entries(abbreviatedMonthToNumberMap).reduce<
  Record<number, AbbreviatedMonth>
>((acc, [key, val]) => {
  acc[val] = key as AbbreviatedMonth
  return acc
}, {})

/**
 * Maps the Month enum to number (0-11) and vice versa.
 */
const monthToNumberMap: Record<Month, number> = {
  [Month.JANUARY]: 0,
  [Month.FEBRUARY]: 1,
  [Month.MARCH]: 2,
  [Month.APRIL]: 3,
  [Month.MAY]: 4,
  [Month.JUNE]: 5,
  [Month.JULY]: 6,
  [Month.AUGUST]: 7,
  [Month.SEPTEMBER]: 8,
  [Month.OCTOBER]: 9,
  [Month.NOVEMBER]: 10,
  [Month.DECEMBER]: 11
}

const numberToMonthMap = Object.entries(monthToNumberMap).reduce<Record<number, Month>>(
  (acc, [key, val]) => {
    acc[val] = key as Month
    return acc
  },
  {}
)

export class DateTime {
  public readonly value: Date

  constructor(value: Date) {
    this.value = value
    Object.freeze(this)
  }

  /**
   * Creates a valid DateTime instance from a string or Date.
   */
  public static validate(parameters: {
    date: string | Date | number
  }): Either<InvalidDateTimeError, { dateValidated: DateTime }> {
    const { date } = parameters

    let parsedDate: Date

    if (typeof date === 'string') {
      const trimmedDate = date.trim()
      if (trimmedDate === '') {
        return failure(
          new InvalidDateTimeError({
            dateTime: date,
            motive: InvalidDateTimeMotive.DATE_REQUIRED
          })
        )
      }
      parsedDate = new Date(trimmedDate)
    } else if (typeof date === 'number') {
      parsedDate = new Date(date)
    } else {
      parsedDate = date
    }

    if (Number.isNaN(parsedDate.getTime())) {
      return failure(
        new InvalidDateTimeError({
          dateTime: date.toString(),
          motive: InvalidDateTimeMotive.IS_NOT_A_DATE
        })
      )
    }

    return success({ dateValidated: new DateTime(parsedDate) })
  }

  public static validateAbbreviatedMonth(parameters: {
    abbreviatedMonth: string
  }): Either<
    InvalidAbbreviatedMonthDateTimeError,
    { abbreviatedMonthValidated: AbbreviatedMonth }
  > {
    const { abbreviatedMonth } = parameters
    const upper = abbreviatedMonth.toUpperCase() as AbbreviatedMonth

    if (upper in abbreviatedMonthToNumberMap) {
      return success({ abbreviatedMonthValidated: upper })
    }

    return failure(
      new InvalidAbbreviatedMonthDateTimeError({
        abbreviatedMonth,
        motive: InvalidAbbreviatedMonthDateTimeMotive.INVALID_ABBREVIATED_MONTH
      })
    )
  }

  /**
   * Returns the first day of a specific month, using year and AbbreviatedMonth.
   */
  public static getFirstDayOfMonth(parameters: {
    date: { year: number; month: AbbreviatedMonth }
  }): Either<InvalidAbbreviatedMonthDateTimeError, { firstDayOfMonth: Date }> {
    const { year, month } = parameters.date

    if (!(month in abbreviatedMonthToNumberMap)) {
      return failure(
        new InvalidAbbreviatedMonthDateTimeError({
          abbreviatedMonth: month,
          motive: InvalidAbbreviatedMonthDateTimeMotive.INVALID_ABBREVIATED_MONTH
        })
      )
    }

    const monthNumber = abbreviatedMonthToNumberMap[month]
    const firstDay = new Date(year, monthNumber, 1)

    return success({ firstDayOfMonth: firstDay })
  }

  /**
   * Returns the current date/time as DateTime.
   */
  public static now(): Either<InvalidGenerateDateTimeError, { now: DateTime }> {
    try {
      return success({ now: new DateTime(new Date()) })
    } catch {
      return failure(new InvalidGenerateDateTimeError())
    }
  }

  /**
   * Returns abbreviated month (e.g. 'JAN', 'FEB') from a number (0-11).
   */
  public static selectMonthAbbreviateByNumber(parameters: {
    monthNumber: number
  }): Either<InvalidMonthNumberDateTimeError, { monthAbbreviated: AbbreviatedMonth }> {
    const { monthNumber } = parameters

    const abbreviatedMonth = numberToAbbreviatedMonthMap[monthNumber]
    if (abbreviatedMonth) {
      return success({ monthAbbreviated: abbreviatedMonth })
    }

    return failure(new InvalidMonthNumberDateTimeError({ monthNumber }))
  }

  /**
   * Returns a Month enum value from a number (0-11).
   */
  public static selectMonthByNumber(parameters: {
    month: number
  }): Either<InvalidMonthNumberDateTimeError, { monthSelected: Month }> {
    const { month } = parameters

    const selectedMonth = numberToMonthMap[month]
    if (selectedMonth) {
      return success({ monthSelected: selectedMonth })
    }

    return failure(new InvalidMonthNumberDateTimeError({ monthNumber: month }))
  }

  /**
   * Returns the number (0-11) corresponding to a Month.
   */
  public static selectMonthNumber(parameters: {
    month: Month
  }): Either<InvalidMonthNumberDateTimeError, { monthNumber: number }> {
    const { month } = parameters

    if (month in monthToNumberMap) {
      return success({ monthNumber: monthToNumberMap[month] })
    }

    return failure(new InvalidMonthNumberDateTimeError({ monthNumber: -1 }))
  }

  /**
   * Retorna o número (0 a 11) referente a um AbbreviatedMonth.
   */
  public static selectAbbreviatedMonthNumber(parameters: {
    month: AbbreviatedMonth
  }): Either<InvalidMonthDateTimeError, { monthNumber: number }> {
    const { month } = parameters

    if (month in abbreviatedMonthToNumberMap) {
      return success({ monthNumber: abbreviatedMonthToNumberMap[month] })
    }

    return failure(new InvalidMonthDateTimeError({ month }))
  }

  /**
   * Validates a Month string (e.g. 'JANUARY', 'FEBRUARY').
   */
  public static validateMonth(parameters: {
    month: string
  }): Either<InvalidMonthDateTimeError, { monthValidated: Month }> {
    const { month } = parameters
    const upper = month.toUpperCase() as Month

    if (upper in monthToNumberMap) {
      return success({ monthValidated: upper })
    }

    return failure(new InvalidMonthDateTimeError({ month }))
  }

  /**
   * Adds `days` days to a DateTime. If `date` is null, uses the current date.
   */
  public static addDays(parameters: {
    date: DateTime | null
    days: number
  }): Either<InvalidGenerateDateTimeError, { dateAdded: DateTime }> {
    const { date, days } = parameters
    const nowResult = DateTime.now()

    if (nowResult.isFailure()) {
      return failure(nowResult.value)
    }

    const time = date?.value.getTime() ?? nowResult.value.now.value.getTime()
    const addedDate = new Date(Number(time) + days * 24 * 60 * 60 * 1000)

    return success({ dateAdded: new DateTime(addedDate) })
  }

  /**
   * Checks if the date is before the current date.
   */
  public static isBeforeNow(parameters: {
    date: DateTime
  }): Either<InvalidGenerateDateTimeError, { isBeforeNow: boolean }> {
    const nowResult = DateTime.now()
    if (nowResult.isFailure()) {
      return failure(nowResult.value)
    }
    const isBefore = parameters.date.value.getTime() < nowResult.value.now.value.getTime()
    return success({ isBeforeNow: isBefore })
  }

  /**
   * Checks if the date is after the current date.
   */
  public static isAfterNow(parameters: {
    date: DateTime
  }): Either<InvalidGenerateDateTimeError, { isAfterNow: boolean }> {
    const nowResult = DateTime.now()
    if (nowResult.isFailure()) {
      return failure(nowResult.value)
    }
    const isAfter = parameters.date.value.getTime() > nowResult.value.now.value.getTime()
    return success({ isAfterNow: isAfter })
  }

  /**
   * Returns the ISO representation of the stored date.
   */
  public toISOString(): string {
    return this.value.toISOString()
  }
}
