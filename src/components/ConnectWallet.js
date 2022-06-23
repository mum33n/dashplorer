import React from 'react'
import { chains } from '../utils/utils.js'

function ConnectWallet() {
  return (
    <div className='absolute top-0 left-0 bg-transparent flex flex-col justify-center w-full h-[100vh]'>
        <div className='container py-20 w-[40%] mx-auto bg-bgColor px-10'>
            <div className='flex flex-col items-center justify-center'>
                <h1 className='mb-5'>New Wallet</h1>
                <label className='mr-auto' for='blockchain'>Blockchain</label>
                <select id='blockchain' name='blockchain' className='w-full h-[40px]'>
                    <option>0x Multichain</option>
                    <option>Ethereum</option>
                    <option>Binance Smartchain</option>
                    <option>Polygon</option>
                    <option>Solana</option>
                </select>

                <button className='bg-btnColor px-8 py-3 mt-5 rounded'>Connect Wallet</button>
                

            </div>
        </div>
    </div>
  )
}

export default ConnectWallet