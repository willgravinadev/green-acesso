import fs from 'node:fs'
import path from 'node:path'

import { fastifyCors } from '@fastify/cors'
import fastifyMultipart from '@fastify/multipart'
import { fastifyStatic } from '@fastify/static'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import {
  type ISendLogErrorLoggerProvider,
  type ISendLogInfoLoggerProvider
} from '@greenacesso/domain'
import { HttpStatusCode } from '@greenacesso/domain'
import { makeLoggerProvider } from '@greenacesso/logger'
import {
  fastify,
  type FastifyError,
  type FastifyInstance,
  type FastifyReply,
  type FastifyRequest,
  type FastifyServerOptions
} from 'fastify'
import {
  createJsonSchemaTransformObject,
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  type ZodTypeProvider
} from 'fastify-type-provider-zod'
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes'

import pkg from '../../package.json'

import { fastifyRoutes } from './fastify-routes'

export class FastifyFramework {
  public app: FastifyInstance
  // private readonly port: number = Number(env.PORT) || 2223
  private readonly port: number = 2223
  private readonly loggerProvider: ISendLogErrorLoggerProvider & ISendLogInfoLoggerProvider

  constructor(options: FastifyServerOptions = {}) {
    this.loggerProvider = makeLoggerProvider()
    this.app = fastify(options).withTypeProvider<ZodTypeProvider>()
    this.app.register(fastifyMultipart)
    this.setupValidation()
    this.setupCors()
    this.setupSwagger()
    this.setupErrorHandler()
    this.setupStaticFiles()
    this.setupRoutes()
  }

  /**
   * Start the server
   */
  public async execute(): Promise<FastifyInstance> {
    try {
      await this.app.listen({
        port: this.port,
        host: '0.0.0.0'
      })
      this.loggerProvider.sendLogInfo({
        message: `Server is running... 🚀 in port ${this.port}`
      })
      return this.app
    } catch (error) {
      this.loggerProvider.sendLogError({
        message: 'Error starting server',
        value: error
      })
      throw new Error('Failed to start server')
    }
  }

  /**
   * Setup validation compilers
   */
  private setupValidation(): void {
    this.app.setValidatorCompiler(validatorCompiler)
    this.app.setSerializerCompiler(serializerCompiler)
  }

  /**
   * Setup CORS
   */
  private setupCors(): void {
    this.app.register(fastifyCors, {
      origin: ['http://localhost:3000', 'https://ecomverzo.inverzo.com.br']
    })
  }

  private setupStaticFiles(): void {
    this.app.register(fastifyStatic, {
      root: path.resolve(process.cwd(), 'tmp'),
      prefix: '/files'
    })
    this.app.get(
      '/files/:bucket/:filename',
      async (
        request: FastifyRequest<{ Params: { bucket: string; filename: string } }>,
        reply: FastifyReply
      ) => {
        const { filename, bucket } = request.params

        const filePath = path.resolve(process.cwd(), '..', '..', 'tmp', 'pdf', bucket, filename)
        try {
          await fs.promises.access(filePath, fs.constants.R_OK)

          return await reply
            .type('application/pdf')
            .header('Content-Disposition', `attachment; filename="${filename}"`)
            .send(fs.createReadStream(filePath))
        } catch (error) {
          this.loggerProvider.sendLogError({
            message: 'File not found',
            value: error
          })
          return reply.status(404).send({ message: 'File not found' })
        }
      }
    )
  }

  /**
   * Setup Swagger documentation
   */
  private setupSwagger(): void {
    // Register Swagger
    this.app.register(fastifySwagger, {
      openapi: {
        info: {
          title: 'Greenacesso API',
          description: 'Greenacesso API',
          version: pkg.version
        }
      },
      transform: jsonSchemaTransform,
      transformObject: createJsonSchemaTransformObject({
        schemas: {}
      })
    })

    const theme = new SwaggerTheme()
    const content = theme.getBuffer(SwaggerThemeNameEnum.ONE_DARK)

    // Register Swagger UI with dark theme
    this.app.register(fastifySwaggerUi, {
      routePrefix: '/docs',
      uiConfig: {
        docExpansion: 'full',
        deepLinking: true,
        syntaxHighlight: {
          theme: 'nord',
          activate: true
        }
      },
      theme: {
        css: [{ filename: 'theme.css', content }]
      }
    })
  }

  /**
   * Setup global error handler
   */
  private setupErrorHandler(): void {
    this.app.setErrorHandler((error: FastifyError, request, reply) => {
      // Handle validation errors
      if (hasZodFastifySchemaValidationErrors(error)) {
        return reply.status(HttpStatusCode.NOT_ACCEPTABLE).send({
          status: 'error',
          error: {
            message: 'Invalid request data',
            details: {
              issues: error.validation,
              method: request.method,
              url: request.url
            }
          }
        })
      }

      // Log unexpected errors
      if (error.statusCode && error.statusCode >= 500) {
        this.loggerProvider.sendLogError({
          message: `Unhandled error: ${error.message}`,
          value: error
        })
      }

      // Handle general errors
      return reply.status(error.statusCode ?? 500).send({
        status: 'error',
        error: {
          message: error.message || 'Internal Server Error',
          code: error.code
        }
      })
    })
  }

  /**
   * Setup routes
   */
  private setupRoutes(): void {
    this.app.register(fastifyRoutes)
  }
}
