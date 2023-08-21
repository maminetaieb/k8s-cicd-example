import axios, { AxiosAdapter, AxiosError } from 'axios'
import readline from 'readline'
import chalk from 'chalk'
import { hostname } from 'node:os'

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const getUsername = async () => {
  let username: string | null = null
  let usernameInvalid: boolean | null = null
  do {
    username = await new Promise((res, rej) => {
      reader.question(
        chalk.gray(
          `Admin username${
            usernameInvalid ? chalk.red(' (Invalid username)') : ''
          }: `
        ),
        (answer) => {
          res(answer)
        }
      )
    })
    usernameInvalid = username === null || username.length <= 10
    if (usernameInvalid) {
      readline.moveCursor(process.stdout, 0, -1)
      readline.clearLine(process.stdout, 0)
    }
  } while (usernameInvalid)

  return username!
}

const getDisplayName = async () => {
  let displayName: string | null = null
  displayName = await new Promise((res, rej) => {
    reader.question(chalk.gray(`Admin Full Name (None): `), (answer) => {
      res(answer)
    })
  })

  return displayName
}

const getPassword = async () => {
  let password: string | null = null
  let passwordInvalid: boolean | null = null
  do {
    password = await new Promise((res, rej) => {
      reader.question(
        chalk.gray(
          `Admin password${
            passwordInvalid ? chalk.red(' (Invalid password)') : ''
          }: `
        ),
        (answer) => {
          res(answer)
        }
      )
    })
    passwordInvalid = password === null || password.length <= 10
    if (passwordInvalid) {
      readline.moveCursor(process.stdout, 0, -1)
      readline.clearLine(process.stdout, 0)
    }
  } while (passwordInvalid)

  return password!
}

const signup = async ({
  host,
  username,
  password,
  displayName = 'Temporary display name',
}: {
  host: string
  username: string
  password: string
  displayName?: string | null
}) => {
  try {
    const response = await axios.post(`${host}/auth/signup`, {
      username,
      password,
      displayName,
    })
    return chalk.green(`Admin account ${username} was added successfully`)
  } catch (err: unknown) {
    return chalk.red((err as AxiosError).response?.data.error)
  }
}

const main = async () => {
  readline.cursorTo(process.stdout, 0, 0)
  readline.clearScreenDown(process.stdout)

  const hostName =
    process.argv.length === 3 ? process.argv[2] : 'http://localhost:8000'

  console.log(
    chalk.blueBright(
      `\nCreating a new Admin account\nThe current hostname is: ${chalk.green(
        hostName
      )}\n\r`
    )
  )

  const displayName = await getDisplayName()
  const username = await getUsername()
  const password = await getPassword()

  const response = await signup({
    host: hostName,
    displayName,
    username,
    password,
  })

  console.log(response)
  reader.close()
}

main()
