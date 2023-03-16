import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/Models/producto';
import { ProductoService } from 'src/app/Services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {
  productoForm: FormGroup;
  titulo = 'Crear Producto';
  idUrl: string | null;

  constructor(private fb: FormBuilder, private router: Router,
    private _productoService: ProductoService, private toastr: ToastrService,
    private aRouter: ActivatedRoute ) {

    this.productoForm = this.fb.group({
      producto: [ '', Validators.required ],
      categoria: [ '', Validators.required ],
      ubicacion: [ '', Validators.required ],
      precio: [ '', Validators.required ],
    })
    this.idUrl = this.aRouter.snapshot.paramMap.get('id'); //El parametro puede ser null (Cuando la ruta es crear-producto)
  }

  ngOnInit(): void {
    this.verificarIdUrl();
  }

  agregarProducto(){
    console.log( this.productoForm );

    const PRODUCTO: Producto = {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value,
    }
    console.log( PRODUCTO );

    if( this.idUrl !== null ){
      //Editamos Producto
      this._productoService.editarProducto(this.idUrl, PRODUCTO).subscribe( data => {
        this.toastr.info( 'El producto fue actualizado con exito!!', 'Producto actualizado' );
        this.router.navigate(['/']); //Redirigimos a listado
      }, error => {
        this.toastr.error( 'El producto NO pudo ser editado', 'Producto NO editado' );
        console.log( error );
      });
    }else{
      //Agregando Producto
      this._productoService.guardarProducto(PRODUCTO).subscribe( data => {
        this.toastr.success( 'El producto fue agregado con exito!!', 'Producto agregado' );
        this.router.navigate(['/']); //Redirigimos a listado
      }, error => {
        this.toastr.error( 'El producto NO pudo ser agregado', 'Producto NO agregado' );
        console.log( error );
      });
    }
  }

  verificarIdUrl() {
    if( this.idUrl !== null ){ //Cuando idUrl existe (Cuando la ruta es editar-producto/:id)
      this.titulo = 'Editar Producto';

      this._productoService.obtenerProductoId(this.idUrl).subscribe( data => {
        this.productoForm.setValue({
          producto: data.nombre,
          categoria: data.categoria,
          ubicacion: data.ubicacion,
          precio: data.precio,
        });
      });
    }
  }
}
