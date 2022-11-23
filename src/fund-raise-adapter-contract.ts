/*
 * @Descripttion: 
 * @version: 
 * @Author: huhuimao
 * @Date: 2022-11-22 15:32:03
 * @LastEditors: huhuimao
 * @LastEditTime: 2022-11-22 15:50:11
 */
import { BigInt } from "@graphprotocol/graph-ts"
import {
  FundRaiseAdapterContract,
  ProposalCreated,
  proposalExecuted
} from "../generated/FundRaiseAdapterContract/FundRaiseAdapterContract"
import { FundRaiseProposal } from "../generated/schema"

export function handleProposalCreated(event: ProposalCreated): void {
  // Entities can be loaded from the store using a string ID; this ID
  // needs to be unique across all entities of the same type
  let entity = FundRaiseProposal.load(event.params.proposalId.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (!entity) {
    entity = new FundRaiseProposal(event.params.proposalId.toHex())
  }

  // BigInt and BigDecimal math are supported
  // entity.count = entity.count + BigInt.fromI32(1)

  // Entity fields can be set based on event parameters
  entity.proposalId = event.params.proposalId
  entity.acceptTokenAddr = event.params.acceptTokenAddr

  entity.fundRaiseTarget = event.params.fundRaiseTarget;
  entity.fundRaiseMaxAmount = event.params.fundRaiseMaxAmount;
  entity.lpMinDepositAmount = event.params.lpMinDepositAmount;
  entity.lpMaxDepositAmount = event.params.lpMaxDepositAmount;
  entity.fundRaiseStartTime = event.params.fundRaiseStartTime;
  entity.fundRaiseEndTime = event.params.fundRaiseEndTime;
  entity.fundEndTime = event.params.fundEndTime;
  entity.redemptPeriod = event.params.redemptPeriod;
  entity.redemptDuration = event.params.redemptDuration;
  entity.state = BigInt.fromI32(0);
  // Entities can be written to the store with `.save()`
  entity.save()

  // Note: If a handler doesn't require existing field values, it is faster
  // _not_ to load the entity from the store. Instead, create it fresh with
  // `new Entity(...)`, set the fields that should be updated and save the
  // entity back to the store. Fields that were not set or unset remain
  // unchanged, allowing for partial updates to be applied.

  // It is also possible to access smart contracts from mappings. For
  // example, the contract that has emitted the event can be connected to
  // with:
  //
  // let contract = Contract.bind(event.address)
  //
  // The following functions can then be called on this contract to access
  // state variables and other data:
  //
  // - contract.Proposals(...)
  // - contract.isActiveGeneralPartner(...)
  // - contract.isActiveMember(...)
  // - contract.latestProposalId(...)
  // - contract.previousProposalId(...)
  // - contract.proposalIds(...)
}

export function handleproposalExecuted(event: proposalExecuted): void {
  let entity = FundRaiseProposal.load(event.params.proposalId.toHex())

  // Entities only exist after they have been saved to the store;
  // `null` checks allow to create entities on demand
  if (entity) {
    entity.state = event.params.state;
    entity.save();
  }
}
