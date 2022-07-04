// Short for: const ethers = require("hardhat").ethers;
const { ethers } = require("hardhat")

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )

    const simpleStorage = await SimpleStorageFactory.deploy()
    console.log(`Deployed to ${simpleStorage.address}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
