import axios from 'axios'
import { UpcomingContestResponse, ContestResponseSchema } from './interfaces'
import { constants } from '../../constants'

export async function upcomingContestsCodeforces (): Promise<UpcomingContestResponse> {
  const response = await axios.get(constants.codeforcesUrl)
  const res = response.data
  const cf: Array<ContestResponseSchema> = []
  for (const item of res.result) {
    try {
      if (item.phase === 'BEFORE') {
        cf.push(item)
      }
    } catch (err) {
      console.log(constants.codeforcesErr)
    }
  }
  return {
    result: cf // .slice(0, 10)
  }
}
