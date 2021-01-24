import axios from 'axios'
import { UpcomingContestResponse, ContestResponseSchema } from './interfaces'

export async function upcomingContests (): Promise<UpcomingContestResponse> {
  const response = await axios.get('https://codeforces.com/api/contest.list')
  const res = response.data
  const cf: Array<ContestResponseSchema> = []
  for (const item of res.result) {
    if (item.phase === 'BEFORE') {
      cf.push(item)
    } else {
      console.log('Oops, looks like there are no upcoming contests currently.')
    }
  }
  return {
    result: cf // .slice(0, 10)
  }
}
