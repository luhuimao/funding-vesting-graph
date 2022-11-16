import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address, Bytes } from "@graphprotocol/graph-ts"
import {
  CancelVesting,
  CreateVesting,
  LogUpdateOwner,
  OwnershipTransferred,
  Withdraw
} from "../generated/FuroVesting/FuroVesting"

export function createCancelVestingEvent(
  vestId: BigInt,
  ownerAmount: BigInt,
  recipientAmount: BigInt,
  token: Address,
  toBentoBox: boolean
): CancelVesting {
  let cancelVestingEvent = changetype<CancelVesting>(newMockEvent())

  cancelVestingEvent.parameters = new Array()

  cancelVestingEvent.parameters.push(
    new ethereum.EventParam("vestId", ethereum.Value.fromUnsignedBigInt(vestId))
  )
  cancelVestingEvent.parameters.push(
    new ethereum.EventParam(
      "ownerAmount",
      ethereum.Value.fromUnsignedBigInt(ownerAmount)
    )
  )
  cancelVestingEvent.parameters.push(
    new ethereum.EventParam(
      "recipientAmount",
      ethereum.Value.fromUnsignedBigInt(recipientAmount)
    )
  )
  cancelVestingEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  cancelVestingEvent.parameters.push(
    new ethereum.EventParam(
      "toBentoBox",
      ethereum.Value.fromBoolean(toBentoBox)
    )
  )

  return cancelVestingEvent
}

export function createCreateVestingEvent(
  vestId: BigInt,
  token: Address,
  recipient: Address,
  start: BigInt,
  cliffDuration: BigInt,
  stepDuration: BigInt,
  steps: BigInt,
  cliffShares: BigInt,
  stepShares: BigInt,
  proposalId: Bytes
): CreateVesting {
  let createVestingEvent = changetype<CreateVesting>(newMockEvent())

  createVestingEvent.parameters = new Array()

  createVestingEvent.parameters.push(
    new ethereum.EventParam("vestId", ethereum.Value.fromUnsignedBigInt(vestId))
  )
  createVestingEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  createVestingEvent.parameters.push(
    new ethereum.EventParam("recipient", ethereum.Value.fromAddress(recipient))
  )
  createVestingEvent.parameters.push(
    new ethereum.EventParam("start", ethereum.Value.fromUnsignedBigInt(start))
  )
  createVestingEvent.parameters.push(
    new ethereum.EventParam(
      "cliffDuration",
      ethereum.Value.fromUnsignedBigInt(cliffDuration)
    )
  )
  createVestingEvent.parameters.push(
    new ethereum.EventParam(
      "stepDuration",
      ethereum.Value.fromUnsignedBigInt(stepDuration)
    )
  )
  createVestingEvent.parameters.push(
    new ethereum.EventParam("steps", ethereum.Value.fromUnsignedBigInt(steps))
  )
  createVestingEvent.parameters.push(
    new ethereum.EventParam(
      "cliffShares",
      ethereum.Value.fromUnsignedBigInt(cliffShares)
    )
  )
  createVestingEvent.parameters.push(
    new ethereum.EventParam(
      "stepShares",
      ethereum.Value.fromUnsignedBigInt(stepShares)
    )
  )
  createVestingEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromFixedBytes(proposalId)
    )
  )

  return createVestingEvent
}

export function createLogUpdateOwnerEvent(
  vestId: BigInt,
  newOwner: Address
): LogUpdateOwner {
  let logUpdateOwnerEvent = changetype<LogUpdateOwner>(newMockEvent())

  logUpdateOwnerEvent.parameters = new Array()

  logUpdateOwnerEvent.parameters.push(
    new ethereum.EventParam("vestId", ethereum.Value.fromUnsignedBigInt(vestId))
  )
  logUpdateOwnerEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return logUpdateOwnerEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createWithdrawEvent(
  vestId: BigInt,
  token: Address,
  amount: BigInt,
  toBentoBox: boolean
): Withdraw {
  let withdrawEvent = changetype<Withdraw>(newMockEvent())

  withdrawEvent.parameters = new Array()

  withdrawEvent.parameters.push(
    new ethereum.EventParam("vestId", ethereum.Value.fromUnsignedBigInt(vestId))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("token", ethereum.Value.fromAddress(token))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  withdrawEvent.parameters.push(
    new ethereum.EventParam(
      "toBentoBox",
      ethereum.Value.fromBoolean(toBentoBox)
    )
  )

  return withdrawEvent
}
