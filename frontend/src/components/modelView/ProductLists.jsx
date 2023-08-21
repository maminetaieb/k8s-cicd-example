const OptionItem = ({ option }) => {
  return (
    <div className="rounded-full text-page-background bg-secondary text-xs p-1 px-2 m-1 uppercase">
      {option.name}
    </div>
  )
}

export const VariantListItem = ({ variant }) => {
  return (
    <div className="bg-table-header border-b border-table-seperator text-table-t-strong p-2 flex flex-center w-full space-x-2">
      <div className="text-secondary w-32 h-14 font-semibold text-center text-base flex items-center justify-center">
        {variant.name}
      </div>
      <div className="flex-1 flex flex-col">
        <div className="text-sm text-table-t-strong">Options:</div>
        <div className="flex flex-nowrap">
          {variant.options?.length !== 0
            ? variant.options.map((option) => (
                <OptionItem key={option._id} option={option} />
              ))
            : 'No Options Available'}
        </div>
      </div>
    </div>
  )
}
