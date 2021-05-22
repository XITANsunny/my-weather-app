import { degToWindDir } from '../utils/wind'


it("degToWindDir transfers degree to direction expectedly", () => {
  expect(degToWindDir(100)).toEqual("ESE");
  
  expect(degToWindDir(200)).toEqual("SSW");
});
