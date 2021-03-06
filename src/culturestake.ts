import {
  store,
} from '@graphprotocol/graph-ts'

import {
  Address,
  BigInt,
  store,
} from '@graphprotocol/graph-ts'

import {
  InitQuestion as InitQuestionEvent,
  InitFestival as InitFestivalEvent,
  InitVotingBooth as InitVotingBoothEvent,
  DeactivateQuestion as DeactivateQuestionEvent,
  DeactivateFestival as DeactivateFestivalEvent,
  DeactivateVotingBooth as DeactivateVotingBoothEvent,
  AddedOwner as AddedOwnerEvent,
  RemovedOwner as RemovedOwnerEvent,
} from './types/Culturestake/Culturestake'

import {
  Question,
  Festival,
  VotingBooth,
  Admin,
} from './types/schema'

import {
  Question as QuestionContract,
} from './types/templates'

export function handleInitQuestion(event: InitQuestionEvent): void {
  QuestionContract.create(event.params.questionAddress)
  
  let question = new Question(event.params.question.toHexString())
  question.address = event.params.questionAddress.toHexString()
  question.festival = event.params.festival.toHexString()
  question.inited = true
  question.save()
}

export function handleInitFestival(event: InitFestivalEvent): void {
  let festival = new Festival(event.params.festival.toHexString())
  festival.inited = true
  festival.startTime = event.params.startTime
  festival.endTime = event.params.endTime
  festival.save()
}

export function handleInitVotingBooth(event: InitVotingBoothEvent): void {
  let booth = new VotingBooth(event.params.boothAddress.toHexString())
  booth.inited = true
  booth.festival = event.params.festival.toHexString()
  booth.save()
}

export function handleDeactivateQuestion(event: DeactivateQuestionEvent): void { 
  let question = Question.load(event.params.question.toHexString())
  question.deactivated = true
  question.save()
}

export function handleDeactivateFestival(event: DeactivateFestivalEvent): void {
  let fest = Festival.load(event.params.festival.toHexString())
  fest.deactivated = true
  fest.save()
}

export function handleDeactivateVotingBooth(event: DeactivateVotingBoothEvent): void {
  let booth = VotingBooth.load(event.params.boothAddress.toHexString())
  booth.deactivated = true
  booth.save()
}

export function handleAddedOwner(event: AddedOwnerEvent): void {
  let admin = new Admin(event.params.owner.toHexString())
  admin.save()
}

export function handleRemovedOwner(event: RemovedOwnerEvent): void {
  store.remove('Admin', event.params.owner.toHex())
}


