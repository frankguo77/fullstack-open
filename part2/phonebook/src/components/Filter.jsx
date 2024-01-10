
const Filter = (promps) => {
  return  (
      <>
          filter shown with <input value = {promps.value} onChange={promps.handler} />
      </>
  )
}

export default Filter