export default function TransferYDToken() {
  return (
    <div className='space-y-4'>
      <p className='text-white text-lg'>Balance: 0 YD</p>
      <div>
        <label className='block text-white mb-2'>打赏数量 (YD):</label>
        <input
          type='number'
          placeholder='0.0'
          className='
            w-full p-2
            bg-dark-card text-white
            border border-[rgba(0,243,255,0.1)]
            rounded-md
            focus:outline-none focus:border-cyber-blue
            [appearance:textfield]
            [&::-webkit-outer-spin-button]:appearance-none
            [&::-webkit-inner-spin-button]:appearance-none
          '
        />
      </div>
      <button
        className='
          w-full p-2
          bg-primary-600 text-white
          rounded-md
          hover:bg-primary-500
          shadow-neon
          transition-all duration-300
        '
      >
        确定打赏
      </button>
    </div>
  );
}
