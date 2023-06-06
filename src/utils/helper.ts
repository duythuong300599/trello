// a little function to help us with reordering the result
export const reOrder = (listSource: any[], listDestination:any[], startIndex: number, endIndex: number) => {
  // const resultSource = Array.from(listSource);
  // const resultDestination = Array.from(listDestination);
  const [removed] = listSource.splice(startIndex, 1);
  listDestination.splice(endIndex, 0, removed);
};