export const Prueba = () => {
 let start, transStar, end
  start= +new Date();
  transStar = start.setHours(0, 0, 0, 0);
  end = new Date();
  end.setHours(23, 59, 59, 999);

  console.log("start", start);
  console.log("trasnsStar", transStar);
  console.log("end",endnd)
  return (
    <>
      <p>start </p>
    <p>transStar</p>
      <p>end</p>
    </>
  );
};
