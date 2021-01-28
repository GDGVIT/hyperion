import axios from 'axios'
import { UpcomingContestResponse, ContestResponseSchema } from './interfaces'
import { constants } from '../../constants'

export async function upcomingContestsAtcoder (): Promise<UpcomingContestResponse> {
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
  return {
    result: at
  }
}
