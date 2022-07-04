// @ts-nocheck
const { ethers } = require("hardhat")
const { assert } = require("chai")

describe("SimpleStorage", function () {
    let simpleStorageFactory
    let simpleStorage
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })

    it("Favorite number should start with 0", async function () {
        const expectedValue = "0"
        const actualValue = await simpleStorage.getFavoriteNumber("jon")
        assert.equal(actualValue.toString(), expectedValue)
    })

    it("Favorite number should update after addPerson", async function () {
        const personName = "jon"
        const expectedValue = "10"
        const transactionResponse = await simpleStorage.addPerson(
            personName,
            expectedValue
        )
        await transactionResponse.wait(1)
        const actualValue = await simpleStorage.getFavoriteNumber(personName)
        assert.equal(actualValue.toString(), expectedValue)
    })
})
