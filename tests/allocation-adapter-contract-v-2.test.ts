import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import { AllocateToken } from "../generated/schema"
import { AllocateToken as AllocateTokenEvent } from "../generated/AllocationAdapterContractV2/AllocationAdapterContractV2"
import { handleAllocateToken } from "../src/allocation-adapter-contract-v-2"
import { createAllocateTokenEvent } from "./allocation-adapter-contract-v-2-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let proposalId = Bytes.fromI32(1234567890)
    let proposer = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let lps = [Address.fromString("0x0000000000000000000000000000000000000001")]
    let newAllocateTokenEvent = createAllocateTokenEvent(
      proposalId,
      proposer,
      lps
    )
    handleAllocateToken(newAllocateTokenEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("AllocateToken created and stored", () => {
    assert.entityCount("AllocateToken", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "AllocateToken",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "proposalId",
      "1234567890"
    )
    assert.fieldEquals(
      "AllocateToken",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "proposer",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "AllocateToken",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "lps",
      "[0x0000000000000000000000000000000000000001]"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
