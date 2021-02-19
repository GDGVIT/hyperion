import axios, { AxiosRequestConfig } from 'axios'
import { UpcomingContestResponse, ContestResponseSchema, UpcomingRunningSchema, TokenSchema } from './interfaces'
import { constants } from '../../constants'
import { redisGet, redisSet } from '../../app'
import dotenv from 'dotenv'
dotenv.config()

async function tokenHandler (): Promise<TokenSchema> {
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
  return { value: 'token is generated' }
}
async function callCodeChefUpcoming (): Promise<UpcomingRunningSchema> {
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
      error: true,
      response: {}
    }
  }
}
async function callCodeChefRunning (): Promise<UpcomingRunningSchema> {
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
      error: true,
      response: {}
    }
  }
}
export async function upcomingContestsCodeChef (): Promise<UpcomingContestResponse> {
  const re = await redisGet('cc_upcoming')
  if (re) {
    return {
      result: JSON.parse(re)
    }
  } else {
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
    if (cc.length > 0) {
      await redisSet('cc_upcoming', JSON.stringify(cc))
    }
    return {
      result: cc
    }
  }
}
export async function runningContestsCodeChef (): Promise<UpcomingContestResponse> {
  const re = await redisGet('cc_running')
  if (re) {
    return {
      result: JSON.parse(re)
    }
  } else {
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
    if (cc.length > 0) {
      await redisSet('cc_running', JSON.stringify(cc))
    }
    return {
      result: cc
    }
  }
}
