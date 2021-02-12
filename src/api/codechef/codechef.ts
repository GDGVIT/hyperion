import axios, { AxiosRequestConfig } from 'axios'
import { UpcomingContestResponse, ContestResponseSchema } from './interfaces'
import { constants } from '../../constants'
import dotenv from 'dotenv'
dotenv.config()

export async function upcomingContestsCodeChef (): Promise<UpcomingContestResponse> {
  const config: AxiosRequestConfig = {
    method: 'get',
    url: constants.codeChefUrlUpcoming,
    headers: {
      Authorization: `Bearer ${process.env.CODECHEF_TOKEN}`
    }
  }
  const response = await axios(config)
  const res = response.data
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
  const config: AxiosRequestConfig = {
    method: 'get',
    url: (constants.codeChefUrlRunning),
    headers: {
      Authorization: `Bearer ${process.env.CODECHEF_TOKEN}`
    }
  }
  const response = await axios(config)
  const res = response.data
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
