/*
 * @Descripttion: 
 * @version: 
 * @Author: huhuimao
 * @Date: 2022-11-16 17:00:56
 * @LastEditors: huhuimao
 * @LastEditTime: 2022-11-24 14:05:59
 */
import {
  ProposalCreated as ProposalCreatedEvent,
  ProposalExecuted as ProposalExecutedEvent,
  StartVote as handleStartVoteEvent,
  DistributeFundContractV2
} from "../generated/DistributeFundContractV2/DistributeFundContractV2"
import { ProposalCreated, ProposalExecuted } from "../generated/schema"
import { bigInt, BigInt, Bytes, Address } from "@graphprotocol/graph-ts"

export function handleProposalCreated(event: ProposalCreatedEvent): void {

  let entity = ProposalCreated.load(event.params.proposalId.toString())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new ProposalCreated(event.params.proposalId.toString())

    // Entity fields can be set using simple assignments
    // entity.count = BigInt.fromI32(0)
  }

  let distributeV2Contract = DistributeFundContractV2.bind(event.address);
  const vestingCliffLockAmount = distributeV2Contract.distributions(Address.fromBytes(Bytes.fromHexString("0xd0a0582A8e82dC63056056188ED4406E45B84692")),
    event.params.proposalId).getVestInfo().vestingCliffLockAmount;
  entity.proposalId = event.params.proposalId
  entity.projectTokenAddress = event.params.projectTokenAddress
  entity.projectTeamAddress = event.params.projectTeamAddress
  entity.approveOwnerAddress = event.params.approveOwnerAddress;
  entity.tradingOffTokenAmount = event.params.tradingOffTokenAmount
  entity.requestedFundAmount = event.params.requestedFundAmount
  entity.inQueueTimestamp = event.params.inQueueTimestamp
  entity.voteStartingTimestamp = event.params.voteStartingTimestamp
  entity.voteEndTimestamp = event.params.voteEndTimestamp
  entity.proposalExecuteTimestamp = event.params.proposalExecuteTimestamp
  entity.vestingStartTIme = event.params.vestingStartTime;
  entity.vestingCliffDuration = event.params.vestingCliffDuration;
  entity.vestingStepDuration = event.params.vestingStepDuration;
  entity.vestingSteps = event.params.vestingSteps;
  entity.vestingCliffLockAmount = vestingCliffLockAmount;
  entity.state = BigInt.fromI32(0);
  entity.save()
}

export function handleProposalExecuted(event: ProposalExecutedEvent): void {
  let entity = new ProposalExecuted(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.proposalID = event.params.proposalID
  entity.state = event.params.state
  entity.allVotingWeight = event.params.allVotingWeight
  entity.nbYes = event.params.nbYes
  entity.nbNo = event.params.nbNo
  entity.distributeState = event.params.distributeState
  entity.save()
  let proposalEntity = ProposalCreated.load(event.params.proposalID.toString())
  if (proposalEntity) {
    proposalEntity.state = event.params.state;
    proposalEntity.proposalExecuteTimestamp = event.block.timestamp;
    proposalEntity.save();
  }
}

export function handleStartVote(event: handleStartVoteEvent): void {
  let entity = ProposalCreated.load(event.params.proposalID.toString())
  if (entity) {
    entity.state = BigInt.fromI32(event.params.state);
    entity.voteStartingTimestamp = event.params.startVoteTime;
    entity.voteEndTimestamp = event.params.stopVoteTime;
    entity.save();
  }

}