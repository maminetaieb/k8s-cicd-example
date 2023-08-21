import { createConnection } from 'mongoose'

const useConnection = (uri: string | null, name: string) => {
  if (uri === null) {
    console.error(
      `${name} connection was not able to find its database URI string, please check your .env and add it accordingly.`
    )
    process.exit(1)
  }
  const connection = createConnection(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })

  connection.on('open', () => {
    console.log(`${name} database connected`)
  })

  connection.on('error', console.error.bind(console, `${name} database error:`))

  return connection
}

export { useConnection }
