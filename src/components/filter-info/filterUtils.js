export function handleFilterChangeHelper(
  filterName,
  filters,
  setSelectedFilterName,
  setFilter,
  setDescription,
  setIntensity,
  setExampleImage
) {
  setSelectedFilterName(filterName);

if (filterName === "none") {
    setFilter("none");
    setDescription("Nenhuma descrição disponível.");
    if (setIntensity) setIntensity(100);
    if (setExampleImage) setExampleImage(null); // Corrigido aqui!
} else {
    const selectedFilter = filters.find((f) => f.name === filterName);
    if (selectedFilter) {
      const defaultIntensity = selectedFilter.default ?? selectedFilter.max ?? 100;
      if (setIntensity) setIntensity(defaultIntensity);

      setFilter(`${selectedFilter.cssBase}(${defaultIntensity}${selectedFilter.unit || ""})`);
      setDescription(selectedFilter.description);
      if (setExampleImage) setExampleImage(selectedFilter.example_image || selectedFilter.exampleImage || null);
    } else {
      setFilter("none");
      setDescription("Nenhuma descrição disponível.");
      if (setIntensity) setIntensity(100);
      if (setExampleImage) setExampleImage(null);
    }
}
}

export function handleIntensityChangeHelper(
  value,
  selectedFilterName,
  filters,
  setFilter,
  setIntensity
) {
  setIntensity(value);

  if (selectedFilterName === "none") {
    setFilter("none");
  } else {
    const selectedFilter = filters.find((f) => f.name === selectedFilterName);
    if (selectedFilter) {
      setFilter(`${selectedFilter.cssBase}(${value}${selectedFilter.unit || ""})`);
    }
  }
}