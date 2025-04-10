import { type Either, failure, success } from '@ecomverzo/utils'

import { InvalidPasswordFormatError } from '../errors/value-objects/password/invalid-password-format.error'
import { InvalidPasswordLengthError } from '../errors/value-objects/password/invalid-password-length.error'
import { type DateTime } from '../value-objects/date-time.value-object'

export class Password {
  public readonly value: string
  public readonly isEncrypted: boolean

  public readonly lastPasswordChangeAt: DateTime | null
  public readonly forgotPasswordToken: string | null
  public readonly forgotPasswordTokenExpirationAt: DateTime | null

  constructor(parameters: {
    password: string
    isEncrypted: boolean
    lastPasswordChangeAt: DateTime | null
    forgotPasswordToken: string | null
    forgotPasswordTokenExpirationAt: DateTime | null
  }) {
    this.value = parameters.password
    this.isEncrypted = parameters.isEncrypted
    this.lastPasswordChangeAt = parameters.lastPasswordChangeAt
    this.forgotPasswordToken = parameters.forgotPasswordToken
    this.forgotPasswordTokenExpirationAt = parameters.forgotPasswordTokenExpirationAt
  }

  public static validateDecryptedPassword(parameters: {
    password: string
  }): Either<
    InvalidPasswordFormatError,
    { passwordValidated: Pick<Password, 'value' | 'isEncrypted'> }
  > {
    const passwordFormatted = parameters.password.trim()
    if (passwordFormatted.split(' ').length > 1) {
      return failure(new InvalidPasswordFormatError({ decryptedPassword: passwordFormatted }))
    }
    if (passwordFormatted.length < 8) {
      return failure(new InvalidPasswordFormatError({ decryptedPassword: passwordFormatted }))
    }
    if (passwordFormatted.length > 32) {
      return failure(new InvalidPasswordFormatError({ decryptedPassword: passwordFormatted }))
    }
    return success({ passwordValidated: { isEncrypted: false, value: passwordFormatted } })
  }

  public static generateRandomPassword(input: {
    length: number
  }): Either<
    InvalidPasswordLengthError,
    { randomPasswordGenerated: Pick<Password, 'value' | 'isEncrypted'> }
  > {
    if (input.length < 8) {
      return failure(new InvalidPasswordLengthError({ passwordLength: input.length }))
    }

    const CHAR_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    const randomPassword = Array.from({ length: input.length }, () =>
      CHAR_SET.charAt(Math.floor(Math.random() * CHAR_SET.length))
    ).join('')

    return success({ randomPasswordGenerated: { isEncrypted: false, value: randomPassword } })
  }

  public static createNewPassword(parameters: {
    password: string | null
  }): Either<
    InvalidPasswordFormatError | InvalidPasswordLengthError,
    { passwordCreated: Password }
  > {
    let password: string | null = null

    if (parameters.password === null || parameters.password.trim() === '') {
      const resultGenerateRandomPassword = Password.generateRandomPassword({
        length: 16
      })
      if (resultGenerateRandomPassword.isFailure()) {
        return failure(resultGenerateRandomPassword.value)
      }
      const { randomPasswordGenerated } = resultGenerateRandomPassword.value
      password = randomPasswordGenerated.value
    } else {
      password = parameters.password
    }

    if (!password) {
      return failure(new InvalidPasswordFormatError({ decryptedPassword: password }))
    }

    const resultValidateDecryptedPassword = Password.validateDecryptedPassword({ password })
    if (resultValidateDecryptedPassword.isFailure()) {
      return failure(resultValidateDecryptedPassword.value)
    }
    const { passwordValidated } = resultValidateDecryptedPassword.value

    return success({
      passwordCreated: new Password({
        isEncrypted: false,
        password: passwordValidated.value,
        lastPasswordChangeAt: null,
        forgotPasswordToken: null,
        forgotPasswordTokenExpirationAt: null
      })
    })
  }
}
