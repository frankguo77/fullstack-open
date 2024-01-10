
const Filter = (promps) => {
  return  (
      <>
          find countries <input value = {promps.value} onChange={promps.handler} />
      </>
  )
}

export default Filter