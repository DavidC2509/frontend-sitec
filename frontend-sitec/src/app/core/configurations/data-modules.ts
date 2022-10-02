export const KEY_MODULES: { [key: string]: string } = {
  sitec: 'ST',
};
/**
 * @description
 * Cada icono de módulo debe tener el nombre del módulo como esta la configuracion de core.
 * 
 * @example Se agrega un item
 * {
 *  id: 'AU',
 *  code: 'auth',
 *  icon: 'fas fa-chart-bar', //deprecate los iconos de fuente
 *  title: 'Seguridad',
 * },
 * 
 * @external assets/icons/color/auth.svg
 * En esa carpeta debe estar la imagen en svg y del mismo tamaño que los otros
 */
export const MODULES: ModuleData[] = [
  {
    id: 'ST',
    code: 'sitec',
    icon: 'fas fa-chart-bar',
    title: 'Sitec',
  },
];

export interface ModuleData {
  icon: string;
  title: string;
  code: string;
  baseLink?: string;
  id?: string;
}


export interface Permisions{ 
    [key:string] :{        
                    default: string,
                    transactions: string[]
                  }
};