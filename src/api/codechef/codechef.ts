import axios, { AxiosRequestConfig } from 'axios'
import redis from 'redis'
import { UpcomingContestResponse, ContestResponseSchema } from './interfaces'
import { constants } from '../../constants'
import dotenv from 'dotenv'
import { promisify } from 'util'
dotenv.config()

const client = redis.createClient()
const redisSet = promisify(client.set).bind(client)
const redisGet = promisify(client.get).bind(client)

client.on('connect', function () {
  console.log('Redis Client Connected...')
})

async function tokenHandler (): Promise<any> {
  const data = (
    {
      // eslint-disable-next-line @typescript-eslint/camelcase
      grant_type: 'client_credentials',
      scope: 'public',
      // eslint-disable-next-line @typescript-eslint/camelcase
      client_id: `${process.env.CLIENT_ID}`,
      // eslint-disable-next-line @typescript-eslint/camelcase
      client_secret: `${process.env.CLIENT_SECRET}`
    })
  const config: AxiosRequestConfig = {
    method: 'post',
    url: constants.codeChefTokenUrl,
    headers: {
      'Content-Type': 'application/json'
    },
    data: data
  }
  const res = await axios(config)
  const ACCESS_TOKEN = res.data.result.data.access_token
  await redisSet('access_token', ACCESS_TOKEN)
}
async function callCodeChefUpcoming (): Promise<any> {
  try {
    const token = await redisGet('access_token')
    const config: AxiosRequestConfig = {
      method: 'get',
      url: constants.codeChefUrlUpcoming,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const response = await axios(config)
    return {
      error: false,
      response: response
    }
  } catch (err) {
    return {
      error: true
    }
  }
}
async function callCodeChefRunning (): Promise<any> {
  try {
    const token = await redisGet('access_token')
    const config: AxiosRequestConfig = {
      method: 'get',
      url: constants.codeChefUrlRunning,
      headers: {
        Authorization: `Bearer ${token}`
      }
    }

    const response = await axios(config)
    return {
      error: false,
      response: response
    }
  } catch (err) {
    return {
      error: true
    }
  }
}
export async function upcomingContestsCodeChef (): Promise<UpcomingContestResponse> {
  let response = await callCodeChefUpcoming()
  if (response.error) {
    await tokenHandler()
    response = await callCodeChefUpcoming()
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const res = response.response.data
  const cc: Array<ContestResponseSchema> = []
  try {
    for (const item of res.result.data.content.contestList) {
      cc.push(item)
    }
  } catch (err) {
    console.log(constants.codeChefErr)
  }
  return {
    result: cc
  }
}
export async function runningContestsCodeChef (): Promise<UpcomingContestResponse> {
  let response = await callCodeChefRunning()
  if (response.error) {
    await tokenHandler()
    response = await callCodeChefRunning()
  }
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const res = response.response.data
  const cc: Array<ContestResponseSchema> = []
  try {
    for (const item of res.result.data.content.contestList) {
      cc.push(item)
    }
  } catch (err) {
    console.log(constants.codeChefErr)
  }
  return {
    result: cc
  }
}
