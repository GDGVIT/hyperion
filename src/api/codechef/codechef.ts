import axios from 'axios'
import { UpcomingContestResponse, ContestResponseSchema } from './interfaces'
import { constants } from '../../constants'

export async function upcomingContestsCodeChef (): Promise<UpcomingContestResponse> {
  const response = await axios.get(constants.codeChefUrl)
  const res = response.data
  const cc: Array<ContestResponseSchema> = []
  try {
    for (const item of res.events) {
      cc.push(item)
    }
    console.log(response.status)
  } catch (err) {
    console.log(constants.codeChefErr)
  }
  return {
    result: cc
  }
}
