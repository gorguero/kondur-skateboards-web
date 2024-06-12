import { Component } from '@angular/core';
import { ItemCarrito } from 'src/app/models/itemCarrito.model';
import { VentaServices } from 'src/app/services/venta.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/auth.service';
import Venta from 'src/app/models/venta.model';
@Component({
  selector: 'app-factuacion',
  templateUrl: './facturacion.component.html',
  styleUrls: ['./facturacion.component.css'],
})
export class FacturacionComponent {
  listaItemsCarrito: ItemCarrito[] = [];
  subtotalTotal: number = 0;
  facturacionForm: FormGroup;

  public userLogged: any;
  public token: any = '';
  public user_id: string | undefined = '';

  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private http: HttpClient,
    private _ventaService: VentaServices
  ) {
    this.token = localStorage.getItem('token');
    this.facturacionForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      apellido: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      nro_contacto: ['', [Validators.required, Validators.minLength(10)]],
      tipo_documentacion: ['', Validators.required],
      numero_documentacion: ['', Validators.required, Validators.minLength(7)],
      provincia: ['', Validators.required],
      localidad: ['', Validators.required],
      codPostal: ['', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      direccion: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    //REVISA USUARIO TOKEN DE USUARIO
    this.userLogged = this.auth.getDecodedToken(this.token);
    
    if (this.userLogged) {
      this.user_id = this.userLogged.id;
    }
    // Obtener la lista de productos del localStorage
    const carritoStorage = localStorage.getItem('carrito');
    if (carritoStorage) {
      this.listaItemsCarrito = JSON.parse(carritoStorage);
      console.log(this.listaItemsCarrito);
    } else {
      this.listaItemsCarrito = [];
    }
    // Calcular el subtotal total
    this.calcularSubtotalTotal();
  }

  calcularSubtotalTotal() {
    this.subtotalTotal = this.listaItemsCarrito.reduce((total, producto) => {
      return total + producto.precio * producto.cantidad;
    }, 0);
  }

  registrarFacturacion(): void {
    if (this.facturacionForm.invalid) {
      this.toastr.error(
        'Por favor completa correctamente el formulario',
        'Error en el formulario'
      );
      return;
    }

    // Lógica para registrar la facturación
    // ...

    // Mostrar mensaje de éxito
    this.toastr.success(
      'La facturación se ha registrado correctamente',
      'Éxito'
    );
  }

  isValidField(field: string): boolean | null {
    return (
      this.facturacionForm.controls[field].errors &&
      this.facturacionForm.controls[field].touched
    );
  }

  getFieldError(field: string): string | null {
    if (!this.facturacionForm.controls[field]) return null;

    const errors = this.facturacionForm.controls[field].errors || {};

    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido*';

        case 'minlength':
          return `Mínimo ${errors['minlength']['requiredLength']} caracteres*`;
        case 'email':
          return 'Ingrese un mail valido';
      }
    }
    return null;
  }

  //   FUNCIONES PARA MERCADOPAGO
  iniciarPago() {
    console.log('Datos enviados al backend:', this.listaItemsCarrito); // Agrega este console.log para ver qué está enviando

    this.http
      .post<any>('http://localhost:5000/api/payment/createOrder', {
        productos: this.listaItemsCarrito,
        facturacion: {
          nombre: this.facturacionForm.get('nombre')?.value,
          apellido: this.facturacionForm.get('apellido')?.value,
          email: this.facturacionForm.get('email')?.value,
          nro_contacto: this.facturacionForm.get('nro_contacto')?.value,
          tipo_documentacion:
            this.facturacionForm.get('tipo_documentacion')?.value,
          numero_documentacion: this.facturacionForm.get('numero_documentacion')
            ?.value,
          provincia: this.facturacionForm.get('provincia')?.value,
          localidad: this.facturacionForm.get('localidad')?.value,
          codPostal: this.facturacionForm.get('codPostal')?.value,
          direccion: this.facturacionForm.get('direccion')?.value,
        },
        user: this.user_id
      })
      .subscribe(
        (response) => {
          window.location.href = response; // Redirige a la URL de Mercado Pago
          // this.guardarVenta();
        },
        (error) => {
          console.error('Error al iniciar el pago:', error);
          // Maneja el error según tu necesidad
        }
      );
  }
  guardarVenta(): void {
    let user_id: string | undefined = '';

    if (this.userLogged) {
      user_id = this.userLogged.id;
    }
    const listaItemsCarritoInterface = this.listaItemsCarrito.map((item: ItemCarrito) => ({
      nombreProducto: item.nombreProducto,
      imagen: item.imagen,
      precio: item.precio,
      cantidad: item.cantidad,
      talla: item.talla,
      medida: item.medida,
      _id: item._id
    }));

    const informacionVenta = new Venta( 
      listaItemsCarritoInterface, // Convertir el arreglo a JSON
      this.subtotalTotal,
      this.facturacionForm.get('nombre')?.value,
      this.facturacionForm.get('apellido')?.value,
      this.facturacionForm.get('nro_contacto')?.value,
      this.facturacionForm.get('tipo_documentacion')?.value,
      this.facturacionForm.get('numero_documentacion')?.value,
      this.facturacionForm.get('provincia')?.value,
      this.facturacionForm.get('localidad')?.value,
      this.facturacionForm.get('direccion')?.value,
      this.facturacionForm.get('nro_contacto')?.value,
      this.facturacionForm.get('codPostal')?.value,
      new Date(), // creado_en
      'pendiente', // estado
      user_id,
      this.facturacionForm.get('email')?.value
    );
    console.log('Información de la venta:', informacionVenta);
    // Llamar al servicio para guardar la venta en el backend
    this._ventaService.createVenta(informacionVenta).subscribe(
      (response) => {
        console.log('Venta guardada en el backend:', response);
      },
      (error) => {
        console.error('Error al guardar la venta en el backend:', error);
      }
    );
  }
}
