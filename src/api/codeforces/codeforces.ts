import axios from 'axios'
import { ContestResponse, ContestResponseSchema } from './interfaces'
import { constants } from '../../constants'

export async function upcomingContestsCodeforces (): Promise<ContestResponse> {
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
  return {
    result: cf // .slice(0, 10)
  }
}

export async function runningContestsCodeforces (): Promise<ContestResponse> {
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
  return {
    result: cf // .slice(0, 10)
  }
}
