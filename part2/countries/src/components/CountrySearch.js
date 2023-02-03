const CountrySearch = ({ value, onChange}) => {
  return (
    <>
      <p>find countries</p>
      <input type="text" value={value} onChange={onChange} />
    </>
  )
}

export default CountrySearch