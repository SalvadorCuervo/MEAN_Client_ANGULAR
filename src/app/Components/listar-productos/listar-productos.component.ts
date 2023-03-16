import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { Producto } from 'src/app/Models/producto';
import { ProductoService } from 'src/app/Services/producto.service';

@Component({
  selector: 'app-listar-productos',
  templateUrl: './listar-productos.component.html',
  styleUrls: ['./listar-productos.component.css']
})
export class ListarProductosComponent implements OnInit {
  listProductos: Producto[] = [];

  constructor( private _productoService: ProductoService, private toastr: ToastrService ) { } //Injectamos nuestro service

  ngOnInit(): void {
    this.obtenerProductosApi();
  }

  obtenerProductosApi() {
    this._productoService.getProductos().subscribe( data => { //Se utiliza subscribe cuando un metodo retorna un Observable
      console.log( data );
      this.listProductos = data;
    }, error => {
      console.log( error );
    });
  }

  eliminarProducto(id: any) {
    this._productoService.eliminarProducto( id ).subscribe( data => {
      this.toastr.success( 'El producto fue eliminado con exito!!', 'Producto eliminado' );
      this.obtenerProductosApi();
    }, error => {
      this.toastr.error( 'El producto NO pudo ser eliminado', 'Producto NO eliminado' );
      console.log( error );
    });
  }
}
