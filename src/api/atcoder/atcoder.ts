import axios from 'axios'
import { UpcomingContestResponse, ContestResponseSchema } from './interfaces'
import { constants } from '../../constants'
import { redisGet, redisSet } from '../../app'

export async function upcomingContestsAtcoder (): Promise<UpcomingContestResponse> {
  const re = await redisGet('ac_upcoming')
  if (re) {
    return {
      result: JSON.parse(re)
    }
  } else {
    const response = await axios.get(constants.atCoderUrl)
    const res = response.data
    const at: Array<ContestResponseSchema> = []
    try {
      for (const item of res.events) {
        at.push(item)
      }
    } catch (err) {
      console.log(constants.atCoderErr)
    }
    if (at.length > 0) {
      await redisSet('ac_upcoming', JSON.stringify(at), 'EX', 60 * 60 * 10)
    }
    return {
      result: at
    }
  }
}
