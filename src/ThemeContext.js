import { createContext } from 'react';

/**
 * @desc themeContext will take in hooks ["green", ()=>{}]
 * ()=>{} is a place holder of setter function
 * NOTE: createContext can take any type of data as an argument
 */
const ThemeContext = createContext(["green", ()=>{}]);

export default ThemeContext;