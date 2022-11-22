/*
 * @Descripttion: 
 * @version: 
 * @Author: huhuimao
 * @Date: 2022-11-16 17:01:41
 * @LastEditors: huhuimao
 * @LastEditTime: 2022-11-22 09:43:37
 */
import {
  AllocateToken as AllocateTokenEvent,
  ConfigureDao as ConfigureDaoEvent
} from "../generated/AllocationAdapterContractV2/AllocationAdapterContractV2"
import { AllocateToken, ConfigureDao, ProposalCreated, UserVestInfo } from "../generated/schema"
import { BigInt, Bytes } from "@graphprotocol/graph-ts"

export function handleAllocateToken(event: AllocateTokenEvent): void {
  let entity = new AllocateToken(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.proposalId = event.params.proposalId
  entity.proposer = event.params.proposer

  let tem: Bytes[] = [];

  if (event.params.lps.length > 0) {
    for (var j = 0; j < event.params.lps.length; j++) {
      tem.push(event.params.lps[j])
    }
  }
  entity.lps = tem;
  entity.save()


  let fundingProposalEntity = ProposalCreated.load(event.params.proposalId.toString())
  if (fundingProposalEntity) {
    const vestingStartTime = fundingProposalEntity!.vestingStartTIme;
    const vestingCliffDuration = fundingProposalEntity!.vestingCliffDuration;
    const vestingStepDuration = fundingProposalEntity!.vestingStepDuration;
    const vestingSteps = fundingProposalEntity!.vestingSteps;

    for (var i = 0; i < entity.lps.length; i++) {
      let userVestInfo = new UserVestInfo(entity.proposalId.toString() + "-" + entity.lps[i].toString());
      userVestInfo.fundingProposalId = event.params.proposalId;
      userVestInfo.recipient = entity.lps[i];
      userVestInfo.vestingStartTime = vestingStartTime;
      userVestInfo.vestingCliffDuration = vestingCliffDuration;
      userVestInfo.vestingStepDuration = vestingStepDuration;
      userVestInfo.vestingSteps = vestingSteps;
      userVestInfo.totalAmount = BigInt.fromI32(0);
      userVestInfo.created = false;

      userVestInfo.save();
    }
  }

  // let allocContract = AllocationAdapterContractV2.bind(event.address);
  // allocContract.vestingInfos()
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.PERCENTAGE_PRECISION(...)
  // - contract.owner(...)
  // - contract.pendingOwner(...)
  // - contract.tokenURIFetcher(...)
  // - contract.vestBalance(...)
  // - contract.vestIds(...)
  // - contract.vests(...)
  // - contract.wETH(...)


}

export function handleConfigureDao(event: ConfigureDaoEvent): void {
  let entity = new ConfigureDao(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.gpAllocationBonusRadio = event.params.gpAllocationBonusRadio
  entity.riceStakeAllocationRadio = event.params.riceStakeAllocationRadio
  entity.save()
}
