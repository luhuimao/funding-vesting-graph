import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  AllocateToken,
  ConfigureDao
} from "../generated/AllocationAdapterContractV2/AllocationAdapterContractV2"

export function createAllocateTokenEvent(
  proposalId: Bytes,
  proposer: Address,
  lps: Array<Address>
): AllocateToken {
  let allocateTokenEvent = changetype<AllocateToken>(newMockEvent())

  allocateTokenEvent.parameters = new Array()

  allocateTokenEvent.parameters.push(
    new ethereum.EventParam(
      "proposalId",
      ethereum.Value.fromFixedBytes(proposalId)
    )
  )
  allocateTokenEvent.parameters.push(
    new ethereum.EventParam("proposer", ethereum.Value.fromAddress(proposer))
  )
  allocateTokenEvent.parameters.push(
    new ethereum.EventParam("lps", ethereum.Value.fromAddressArray(lps))
  )

  return allocateTokenEvent
}

export function createConfigureDaoEvent(
  gpAllocationBonusRadio: BigInt,
  riceStakeAllocationRadio: BigInt
): ConfigureDao {
  let configureDaoEvent = changetype<ConfigureDao>(newMockEvent())

  configureDaoEvent.parameters = new Array()

  configureDaoEvent.parameters.push(
    new ethereum.EventParam(
      "gpAllocationBonusRadio",
      ethereum.Value.fromUnsignedBigInt(gpAllocationBonusRadio)
    )
  )
  configureDaoEvent.parameters.push(
    new ethereum.EventParam(
      "riceStakeAllocationRadio",
      ethereum.Value.fromUnsignedBigInt(riceStakeAllocationRadio)
    )
  )

  return configureDaoEvent
}
