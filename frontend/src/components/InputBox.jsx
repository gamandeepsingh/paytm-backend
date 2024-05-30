export function InputBox({label, placeholder,name,value,change}) {
    return <div>
      <div className="text-sm font-medium text-left py-2">
        {label}
      </div>
      <input onChange={change} placeholder={placeholder} name={name} value={value} className="w-full px-2 py-1 border rounded border-slate-200" />
    </div>
}