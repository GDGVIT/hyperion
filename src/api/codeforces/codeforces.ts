import axios from 'axios'
import { ContestResponse, ContestResponseSchema } from './interfaces'
import { constants } from '../../constants'
import { redisGet, redisSet } from '../../app'

export async function upcomingContestsCodeforces (): Promise<ContestResponse> {
  const re = await redisGet('cf_upcoming')
  if (re) {
    return {
      result: JSON.parse(re)
    }
  } else {
    const response = await axios.get(constants.codeForcesUrl)
    const res = response.data
    const cf: Array<ContestResponseSchema> = []
    for (const item of res.result) {
      try {
        if (item.phase === 'BEFORE') {
          cf.push(item)
        }
      } catch (err) {
        console.log(constants.codeForcesErr)
      }
    }
    if (cf.length > 0) {
      await redisSet('cf_upcoming', JSON.stringify(cf), 'EX', 60 * 60 * 10)
    }
    return {
      result: cf // .slice(0, 10)
    }
  }
}

export async function runningContestsCodeforces (): Promise<ContestResponse> {
  const re = await redisGet('cf_running')
  if (re) {
    return {
      result: JSON.parse(re)
    }
  } else {
    const response = await axios.get(constants.codeForcesUrl)
    const res = response.data
    const cf: Array<ContestResponseSchema> = []
    for (const item of res.result) {
      try {
        if (item.phase === 'CODING') {
          cf.push(item)
        }
      } catch (err) {
        console.log(constants.codeForcesErr)
      }
    }
    if (cf.length > 0) {
      await redisSet('cf_running', JSON.stringify(cf), 'EX', 60 * 60 * 10)
    }
    return {
      result: cf // .slice(0, 10)
    }
  }
}
