import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../Models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  url = 'http://localhost:4000/api/productos/';

  constructor( private http: HttpClient ) { } //Injectamos clase http para realizar peticiones

  getProductos(): Observable<any> { //El metodo this.get() retorna un observable
    return this.http.get( this.url );
  }

  eliminarProducto(id: string): Observable<any> {
    return this.http.delete( this.url + id );
  }

  guardarProducto(producto: Producto): Observable<any> {
    return this.http.post( this.url, producto );
  }

  obtenerProductoId(id: string): Observable<any> {
    return this.http.get( this.url + id );
  }

  editarProducto(id: string, producto: Producto): Observable<any> {
    return this.http.put( this.url + id, producto );
  }
}
