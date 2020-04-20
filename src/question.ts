 import {
  Address,
  BigInt,
  store,
} from '@graphprotocol/graph-ts'

 import {
  Vote as VoteEvent,
  InitAnswer as InitAnswerEvent,
  DeactivateAnswer as DeactivateAnswerEvent,
} from './types/templates/Question/Question'

import {
  Question,
  Answer,
  Vote,
} from './types/schema'

import {
  Question as QuestionContract,
} from './types/templates/Question/Question'


export function createVoteID(booth: Address, nonce: BigInt): string {
  return booth.toHexString().concat('-').concat(nonce.toString())
}

export function handleVote(event: VoteEvent): void {
  let vote = new Vote(createVoteID(event.params.booth, event.params.nonce))
  vote.booth = event.params.booth.toHexString()
  vote.answer = event.params.answer.toString()
  vote.voteTokens = event.params.voteTokens
  vote.votePower = event.params.votePower
  vote.count = event.params.votes
  vote.save()

  let questionContract = QuestionContract.bind(event.address)

  let answer = Answer.load(event.params.answer.toString())
  let a = questionContract.getAnswer(event.params.answer)
  answer.voteTokens = a.value2
  answer.votePower = a.value1
  answer.votes = a.value3
  answer.save()
}

export function handleInitAnswer(event: InitAnswerEvent): void {
  let answer = new Answer(event.params.answer.toString())
  answer.voteTokens = new BigInt(0)
  answer.votePower = new BigInt(0)
  answer.votes = new BigInt(0)
  answer.active = true
  answer.question = event.address.toHexString()
  answer.save()
}

export function handleDeactivateAnswer(event: DeactivateAnswerEvent): void {
  let answer = Answer.load(event.params.answer.toString())
  answer.active = false
  answer.save()
}
