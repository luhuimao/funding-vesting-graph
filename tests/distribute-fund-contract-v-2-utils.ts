import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ProposalCreated,
  ProposalExecuted
} from "../generated/DistributeFundContractV2/DistributeFundContractV2"

export function createProposalCreatedEvent(
  proposalId: Bytes,
  projectTokenAddress: Address,
  projectTeamAddress: Address,
  tradingOffTokenAmount: BigInt,
  requestedFundAmount: BigInt,
  fullyReleasedDate: BigInt,
  lockupDate: BigInt,
  inQueueTimestamp: BigInt,
  voteStartingTimestamp: BigInt,
  voteEndTimestamp: BigInt,
  proposalExecuteTimestamp: BigInt
): ProposalCreated {
  let proposalCreatedEvent = changetype<ProposalCreated>(newMockEvent())

  proposalCreatedEvent.parameters = new Array()

  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromFixedBytes(proposalId)
    )
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "projectTokenAddress",
      ethereum.Value.fromAddress(projectTokenAddress)
    )
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "projectTeamAddress",
      ethereum.Value.fromAddress(projectTeamAddress)
    )
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "tradingOffTokenAmount",
      ethereum.Value.fromUnsignedBigInt(tradingOffTokenAmount)
    )
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "requestedFundAmount",
      ethereum.Value.fromUnsignedBigInt(requestedFundAmount)
    )
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "fullyReleasedDate",
      ethereum.Value.fromUnsignedBigInt(fullyReleasedDate)
    )
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "lockupDate",
      ethereum.Value.fromUnsignedBigInt(lockupDate)
    )
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "inQueueTimestamp",
      ethereum.Value.fromUnsignedBigInt(inQueueTimestamp)
    )
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "voteStartingTimestamp",
      ethereum.Value.fromUnsignedBigInt(voteStartingTimestamp)
    )
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "voteEndTimestamp",
      ethereum.Value.fromUnsignedBigInt(voteEndTimestamp)
    )
  )
  proposalCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "proposalExecuteTimestamp",
      ethereum.Value.fromUnsignedBigInt(proposalExecuteTimestamp)
    )
  )

  return proposalCreatedEvent
}

export function createProposalExecutedEvent(
  proposalID: Bytes,
  state: BigInt,
  allVotingWeight: BigInt,
  nbYes: BigInt,
  nbNo: BigInt,
  distributeState: BigInt
): ProposalExecuted {
  let proposalExecutedEvent = changetype<ProposalExecuted>(newMockEvent())

  proposalExecutedEvent.parameters = new Array()

  proposalExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "proposalID",
      ethereum.Value.fromFixedBytes(proposalID)
    )
  )
  proposalExecutedEvent.parameters.push(
    new ethereum.EventParam("state", ethereum.Value.fromUnsignedBigInt(state))
  )
  proposalExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "allVotingWeight",
      ethereum.Value.fromUnsignedBigInt(allVotingWeight)
    )
  )
  proposalExecutedEvent.parameters.push(
    new ethereum.EventParam("nbYes", ethereum.Value.fromUnsignedBigInt(nbYes))
  )
  proposalExecutedEvent.parameters.push(
    new ethereum.EventParam("nbNo", ethereum.Value.fromUnsignedBigInt(nbNo))
  )
  proposalExecutedEvent.parameters.push(
    new ethereum.EventParam(
      "distributeState",
      ethereum.Value.fromUnsignedBigInt(distributeState)
    )
  )

  return proposalExecutedEvent
}
