import { Component, OnInit } from '@angular/core';
 /**
  * Componente loading es para bloquear la ui
  * Cuando se ejecuta un boton guardar en las transacciones
  *
  * {@link https://www.npmjs.com/package/ngx-spinner|Ir a sitio web del paquete de estilo usado }
  * {@link https://napster2210.github.io/ngx-spinner/|Ejemplo y configuración del componente}
  *
  * @example
  * <loading></loading>
  */
@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
