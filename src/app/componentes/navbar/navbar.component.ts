import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/model/Categoria';
import { Pedido } from 'src/app/model/Pedido';
import { CarrinhoService } from 'src/app/servicos/carrinho.service';
import { CategoriaService } from 'src/app/servicos/categoria.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public lista: Categoria[];
  public numItens: number;
  private pedido: Pedido;


  constructor(private service:CategoriaService,
              private carService: CarrinhoService) { 
    this.numItens = 0;
  }

  ngOnInit(): void {
    this.pedido = JSON.parse(localStorage.getItem("ShoppingCart"));
    if (this.pedido) {
      this.numItens = this.pedido.itensPedido.length;
    }

    this.service.getAllCategorias().subscribe((res: Categoria[]) => this.lista = res,
    err => console.log(err));

    this.carService.getNumberOfItens().subscribe(
      (res) => { this.numItens = res}
    );
  }

}
