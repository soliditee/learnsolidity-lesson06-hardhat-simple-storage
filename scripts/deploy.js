// Short for: const ethers = require("hardhat").ethers;
const { ethers, run, network } = require("hardhat")

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )

    const simpleStorage = await SimpleStorageFactory.deploy()
    console.log(`Deployed to ${simpleStorage.address}`)

    if (network.config.chainId === 4) {
        //Only verify if network is Rinkeby
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }

    // Using the new contract
    const currentNumber = await simpleStorage.getFavoriteNumber("jon")
    console.log(`Current favorite number of jon: ${currentNumber}`)
    const transactionResponse = await simpleStorage.addPerson("jon", "7")
    await transactionResponse.wait(1)
    const updatedNumber = await simpleStorage.getFavoriteNumber("jon")
    console.log(`Updated favorite number of jon: ${updatedNumber}`)
}

async function verify(contractAddress, args) {
    console.log("Verifying...")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArgsParams: args,
        })
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Contract already verified")
        } else {
            console.log(e)
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
