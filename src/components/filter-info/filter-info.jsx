import React from 'react'

export const FilterInfo = ({filters, filter, description}) => {
  if(filter === "none") return <></>

  return <>
    <div>
      <h2>Filtro: {filters.find((f) => f.cssValue === filter)?.name || "Nenhum"}</h2>
      <p dangerouslySetInnerHTML={{ __html: description }}></p>
    </div>
    {filters.find((f) => f.cssValue === filter)?.example_image && (
      <img
        src={filters.find((f) => f.cssValue === filter).example_image}
        alt={`Exemplo do filtro ${filters.find((f) => f.cssValue === filter)?.name}`}
        style={{ maxWidth: "80%", borderRadius: "8px", minWidth: "400px" }}
      />
    )}
  </>
}


export default 1+1;