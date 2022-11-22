import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { ProposalCreated } from "../generated/schema"
import { ProposalCreated as ProposalCreatedEvent } from "../generated/DistributeFundContractV2/DistributeFundContractV2"
import { handleProposalCreated } from "../src/distribute-fund-contract-v-2"
import { createProposalCreatedEvent } from "./distribute-fund-contract-v-2-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let proposalId = Bytes.fromI32(1234567890)
    let projectTokenAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let projectTeamAddress = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let tradingOffTokenAmount = BigInt.fromI32(234)
    let requestedFundAmount = BigInt.fromI32(234)
    let fullyReleasedDate = BigInt.fromI32(234)
    let lockupDate = BigInt.fromI32(234)
    let inQueueTimestamp = BigInt.fromI32(234)
    let voteStartingTimestamp = BigInt.fromI32(234)
    let voteEndTimestamp = BigInt.fromI32(234)
    let proposalExecuteTimestamp = BigInt.fromI32(234)
    let newProposalCreatedEvent = createProposalCreatedEvent(
      proposalId,
      projectTokenAddress,
      projectTeamAddress,
      tradingOffTokenAmount,
      requestedFundAmount,
      fullyReleasedDate,
      lockupDate,
      inQueueTimestamp,
      voteStartingTimestamp,
      voteEndTimestamp,
      proposalExecuteTimestamp
    )
    handleProposalCreated(newProposalCreatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("ProposalCreated created and stored", () => {
    assert.entityCount("ProposalCreated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "ProposalCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "proposalId",
      "1234567890"
    )
    assert.fieldEquals(
      "ProposalCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "projectTokenAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ProposalCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "projectTeamAddress",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "ProposalCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tradingOffTokenAmount",
      "234"
    )
    assert.fieldEquals(
      "ProposalCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "requestedFundAmount",
      "234"
    )
    assert.fieldEquals(
      "ProposalCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "fullyReleasedDate",
      "234"
    )
    assert.fieldEquals(
      "ProposalCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "lockupDate",
      "234"
    )
    assert.fieldEquals(
      "ProposalCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "inQueueTimestamp",
      "234"
    )
    assert.fieldEquals(
      "ProposalCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "voteStartingTimestamp",
      "234"
    )
    assert.fieldEquals(
      "ProposalCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "voteEndTimestamp",
      "234"
    )
    assert.fieldEquals(
      "ProposalCreated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "proposalExecuteTimestamp",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
