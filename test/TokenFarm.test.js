const { assert } = require('chai');
const { default: Web3 } = require('web3');

const DappToken = artifacts.require('DappToken');
const DaiToken = artifacts.require('DaiToken');
const TokenFarm = artifacts.require('TokenFarm');

require('chai')
    .use(require('chai-as-promised'))
    .should()

let tokens = (n)=>{
    return Web3.utils.toWei(n, 'ether');
}

contract('TokenFarm', ([owner, investor]) => {
    
    //Write test here
    let daiToken, dappToken, tokenFarm
    before(async ()=>{
        daiToken = await DaiToken.new()
        dappToken = await DappToken.new()
        tokenFarm = await TokenFarm.new(daiToken.address, dappToken.address)

        //Transfer all Dapp tokens to farm(1 million)
        await dappToken.transfer(tokenFarm.address, '1000000000000000000000000')

        // Send tokens to Investors
        await daiToken.transfer(investor, ('100000000000000000000'), { from: owner})
    })

    describe('Mock DAI Deployment', async () => (
        it('has a name', async () => {
            const name = await daiToken.name()
            assert.equal(name, 'Mock DAI Token')
        })
    ))

    describe('Dapp Token Deployment', async () => (
        it('has a name', async () => {
            const name = await dappToken.name()
            assert.equal(name, 'DApp Token')
        })
    ))

    describe('Token Farm Deployment', async () => (
        it('has a name', async () => {
            const name = await tokenFarm.name()
            assert.equal(name, 'Dapp Token Farm')
        }),

        it('contract has tokens', async () => {
            let balance = await dappToken.balanceOf(tokenFarm.address)
            assert.equal(balance.toString(), ('1000000000000000000000000'))
        })
    ))

    describe('Farming tokens', async () => (
        it('rewards investors for staking mDai tokens', async () => {
            let result

            // check investor balance before staking
            result = await daiToken.balanceOf(investor)
            assert.equal(result.toString(), ('100000000000000000000'), 'Investor mock Dai wallet correct before staking')

            // Stake mock Dai tokens
            await daiToken.approve(tokenFarm.address, ('100000000000000000000'), { from: investor })
            await tokenFarm.stakeTokens(('100 000000000000000000'), { from: investor })

            // Check staking result
            result = await daiToken.balanceOf(investor)
            assert.equal(result.toString(), ('0000000000000000000'), 'investor mock Dai wallet balance correct after staking')

            result = await daiToken.balanceOf(tokenFarm.address)
            assert.equal(result.toString(), ('100000000000000000000'), 'Token Farm mock Dai wallet balance correct after staking')

            result = await tokenFarm.stakingBalance(investor)
            assert.equal(result.toString(), ('100000000000000000000'), 'Investor staking balance correct after staking')

            result = await tokenFarm.isStaking(investor)
            assert.equal(result.toString(), 'true', 'Investor staking status correct after staking')
        })
    ))
}) 