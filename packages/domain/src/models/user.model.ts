import type { InvalidGenerateDateTimeError } from '../errors/value-objects/date-time/invalid-generate-date-time.error'
import type { GenerateIDError } from '../errors/value-objects/id/generate-id.error'
import type { Email } from '../value-objects/email.value-object'
import type { Password } from '../value-objects/password.value-object'

import { type Either, failure, success } from '@greenacesso/utils'

import { DateTime } from '../value-objects/date-time.value-object'
import { ID } from '../value-objects/id.value-object'

import { ModelName } from './_model-name'

export class User {
  name: string
  email: Email
  password: Password

  id: ID
  createdAt: DateTime
  updatedAt: DateTime
  deletedAt: DateTime | null

  private constructor(input: {
    id: ID
    name: string
    email: Email
    password: Password
    createdAt: DateTime
    updatedAt: DateTime
    deletedAt: DateTime | null
  }) {
    this.id = input.id
    this.name = input.name
    this.email = input.email
    this.password = input.password
    this.createdAt = input.createdAt
    this.updatedAt = input.updatedAt
    this.deletedAt = input.deletedAt
  }

  /**
   * Creates a new user instance.
   * @param name - The user's name.
   * @param email - The user's email as a value object.
   * @param password - The user's password as a value object.
   * @returns Either an error (ID or DateTime generation) or a successfully created user.
   */
  static createNewUser(input: {
    name: string
    email: Email
    password: Password
  }): Either<GenerateIDError | InvalidGenerateDateTimeError, { userCreated: User }> {
    const idResult = ID.generate({ modelName: ModelName.USER })
    if (idResult.isFailure()) return failure(idResult.value)
    const { idGenerated: userID } = idResult.value

    const dateTimeResult = DateTime.now()
    if (dateTimeResult.isFailure()) {
      return failure(dateTimeResult.value)
    }
    const { now } = dateTimeResult.value

    return success({
      userCreated: new User({
        id: userID,
        name: input.name,
        email: input.email,
        password: input.password,
        createdAt: now,
        updatedAt: now,
        deletedAt: null
      })
    })
  }
}
