export const mapOrder = (arraySort: any[], order: any, key: string) => {
  if (!arraySort || !order || !key) return [];
  arraySort?.sort(
    (a: any, b: any) => order.indexOf(a[key]) - order.indexOf(b[key]),
  );
  return arraySort;
};
