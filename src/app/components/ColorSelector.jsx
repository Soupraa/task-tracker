const colors = [
  '#F87171', '#FBBF24', '#34D399', '#60A5FA', '#A78BFA', '#F472B6', '#B2ABBF', '#6EE7B7',
  '#FCA5A5', '#FDE68A', '#A7F3D0', '#BFDBFE', '#DDD6FE', '#F9A8D4', '#E879F9', '#9CFC97',
  '#C9ADA1', '#F98948', '#00B295', '#4FB0C6', '#BFC0C0', '#7B5E7B', '#F2A65A', '#8FB339'
]

export default function ColorSelector({selected, setSelected}) {
 

  return (
    <div className='mt-2'>
      <div className="grid grid-cols-8 gap-2">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => setSelected(color)}
            className={`w-8 h-8 rounded-full border-2 transition ${
                selected === color ? 'border-black scale-110' : 'border-transparent'
            }`}
            style={{ backgroundColor: color }}
          />
        ))}
      </div>

      {/* Hidden input to include selected color in form submission */}
      <input type="hidden" name={name} value={selected || ''} />
    </div>
  )
}
