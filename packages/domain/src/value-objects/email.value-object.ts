import type { InvalidGenerateDateTimeError } from '../errors/value-objects/date-time/invalid-generate-date-time.error'
import type { GenerateIDError } from '../errors/value-objects/id/generate-id.error'

import { type Either, failure, success } from '@greenacesso/utils'

import { InvalidEmailError } from '../errors/value-objects/email/invalid-email.error'
import { type DateTime } from '../value-objects/date-time.value-object'

export class Email {
  public readonly value: string

  public readonly isVerified: boolean
  public readonly lastEmailVerificationAt: null | DateTime
  public readonly verificationCode: null | string
  public readonly verificationCodeExpirationAt: null | DateTime
  public readonly verificationAttempts: number

  private constructor(parameters: {
    email: string
    isVerified: boolean
    lastEmailVerificationAt: DateTime | null
    verificationCode: string | null
    verificationCodeExpirationAt: DateTime | null
    verificationAttempts: number
  }) {
    this.value = parameters.email.toLowerCase().trim()
    this.isVerified = parameters.isVerified
    this.lastEmailVerificationAt = parameters.lastEmailVerificationAt
    this.verificationCode = parameters.verificationCode
    this.verificationCodeExpirationAt = parameters.verificationCodeExpirationAt
    this.verificationAttempts = parameters.verificationAttempts
    Object.freeze(this)
  }

  public static validateEmail(parameters: {
    email: string
    isVerified: boolean
    lastEmailVerificationAt: DateTime | null
    verificationCode: string | null
    verificationCodeExpirationAt: DateTime | null
    verificationAttempts: number
  }): Either<InvalidEmailError, { emailValidated: Email }> {
    const resultValidateEmailAddress = Email.validateEmailAddress({ email: parameters.email })
    if (resultValidateEmailAddress.isFailure()) {
      return failure(resultValidateEmailAddress.value)
    }
    const { emailValidated } = resultValidateEmailAddress.value

    const email = new Email({
      email: emailValidated.value,
      isVerified: parameters.isVerified,
      lastEmailVerificationAt: parameters.lastEmailVerificationAt,
      verificationCode: parameters.verificationCode,
      verificationCodeExpirationAt: parameters.verificationCodeExpirationAt,
      verificationAttempts: parameters.verificationAttempts
    })

    return success({ emailValidated: email })
  }

  public static getDomain(parameters: {
    email: Email
  }): Either<InvalidEmailError, { domain: string }> {
    const [, domain] = parameters.email.value.split('@')
    if (!domain || domain.trim() === '') {
      return failure(new InvalidEmailError({ email: parameters.email.value }))
    }
    return success({ domain })
  }

  public static validateEmailAddress(parameters: {
    email: string
  }): Either<InvalidEmailError, { emailValidated: Email }> {
    const emailFormatted = parameters.email.toLowerCase().trim()

    const MAX_EMAIL_SIZE = 320

    if (
      Email.emptyOrTooLarge({
        string: emailFormatted,
        maxSize: MAX_EMAIL_SIZE
      }) ||
      Email.nonConformant(emailFormatted)
    ) {
      return failure(new InvalidEmailError({ email: emailFormatted }))
    }

    const [local, domain] = emailFormatted.split('@')
    const MAX_LOCAL_SIZE = 64
    const MAX_DOMAIN_SIZE = 255

    if (!local || local.trim() === '') {
      return failure(new InvalidEmailError({ email: emailFormatted }))
    }

    if (!domain || domain.trim() === '') {
      return failure(new InvalidEmailError({ email: emailFormatted }))
    }

    if (
      Email.emptyOrTooLarge({
        string: local,
        maxSize: MAX_LOCAL_SIZE
      }) ||
      Email.emptyOrTooLarge({
        string: domain,
        maxSize: MAX_DOMAIN_SIZE
      })
    ) {
      return failure(new InvalidEmailError({ email: emailFormatted }))
    }

    if (Email.somePartIsTooLargeIn(domain)) {
      return failure(new InvalidEmailError({ email: emailFormatted }))
    }

    return success({
      emailValidated: new Email({
        email: emailFormatted,
        isVerified: false,
        lastEmailVerificationAt: null,
        verificationCode: null,
        verificationCodeExpirationAt: null,
        verificationAttempts: 0
      })
    })
  }

  private static emptyOrTooLarge(parameters: { string: string; maxSize: number }): boolean {
    return !parameters.string || parameters.string.length > parameters.maxSize
  }

  private static nonConformant(email: string): boolean {
    // biome-ignore lint/performance/useTopLevelRegex: <explanation>
    const emailRegex =
      /^[\w!#$%&'*+/=?^`{|}~-](\.?[\w!#$%&'*+/=?^`{|}~-])*@[\dA-Za-z](-*\.?[\dA-Za-z])*\.[A-Za-z](-?[\dA-Za-z])+$/
    return !emailRegex.test(email)
  }

  private static somePartIsTooLargeIn(domain: string): boolean {
    const maxPartSize = 63
    const domainParts = domain.split('.')
    return domainParts.some((part) => part.length > maxPartSize)
  }

  public static createNewEmail(parameters: {
    email: string
  }): Either<
    GenerateIDError | InvalidEmailError | InvalidGenerateDateTimeError,
    { emailCreated: Email }
  > {
    const resultValidateEmailAddress = Email.validateEmailAddress({ email: parameters.email })
    if (resultValidateEmailAddress.isFailure()) {
      return failure(resultValidateEmailAddress.value)
    }
    const { emailValidated } = resultValidateEmailAddress.value

    return success({
      emailCreated: new Email({
        email: emailValidated.value,
        isVerified: false,
        lastEmailVerificationAt: null,
        verificationCode: null,
        verificationCodeExpirationAt: null,
        verificationAttempts: 0
      })
    })
  }
}
